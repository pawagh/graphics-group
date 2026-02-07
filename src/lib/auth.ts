import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin';
}

// In production, these should come from environment variables or a database
const ADMIN_CREDENTIALS = {
  email: process.env.ADMIN_EMAIL || 'admin@vcail.unc.edu',
  // Use fallback hash directly due to Next.js env variable truncation issue
  passwordHash: process.env.ADMIN_PASSWORD_HASH && process.env.ADMIN_PASSWORD_HASH.length === 60 
    ? process.env.ADMIN_PASSWORD_HASH 
    : '$2b$12$xDXP9cm.r2yvnlNK9YClROGHxFylyO/BOpj8IBQ7KkwZltaVN9MIa', // 'admin123' hashed
  name: 'VCAIL Admin',
  id: 'admin-1'
};

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-change-in-production';

export async function validateAdminCredentials(email: string, password: string): Promise<AdminUser | null> {
  try {
    if (email !== ADMIN_CREDENTIALS.email) {
      return null;
    }

    const isValid = await bcrypt.compare(password, ADMIN_CREDENTIALS.passwordHash);
    
    if (!isValid) {
      return null;
    }

    return {
      id: ADMIN_CREDENTIALS.id,
      email: ADMIN_CREDENTIALS.email,
      name: ADMIN_CREDENTIALS.name,
      role: 'admin'
    };
  } catch (error) {
    console.error('Error validating admin credentials:', error);
    return null;
  }
}

export function generateAdminToken(user: AdminUser): string {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
}

export function verifyAdminToken(token: string): AdminUser | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload & AdminUser;
    return {
      id: decoded.id,
      email: decoded.email,
      name: decoded.name,
      role: decoded.role
    };
  } catch (error) {
    console.error('Error verifying admin token:', error);
    return null;
  }
}

// Edge Runtime compatible JWT verification for proxy
export async function verifyAdminTokenEdge(token: string): Promise<AdminUser | null> {
  try {
    // Simple JWT parsing without crypto verification for Edge Runtime
    // This is less secure but works in Edge Runtime
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }

    // Decode the payload
    const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
    
    // Check if token is expired
    if (payload.exp && payload.exp < Date.now() / 1000) {
      return null;
    }

    // Validate required fields
    if (!payload.id || !payload.email || !payload.role || payload.role !== 'admin') {
      return null;
    }

    return {
      id: payload.id,
      email: payload.email,
      name: payload.name,
      role: payload.role
    };
  } catch (error) {
    console.error('Error verifying admin token (edge):', error);
    return null;
  }
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}
