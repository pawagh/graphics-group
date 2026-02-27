import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-secret-change-in-production'
);

const TOKEN_EXPIRY = '7d';

export async function validateAdminCredentials(
  email: string,
  password: string
): Promise<AdminUser | null> {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!adminEmail || !adminPasswordHash) {
    console.error('ADMIN_EMAIL or ADMIN_PASSWORD_HASH not configured');
    return null;
  }

  if (email !== adminEmail) {
    return null;
  }

  const isValid = await bcrypt.compare(password, adminPasswordHash);
  if (!isValid) {
    return null;
  }

  return {
    id: 'admin',
    email: adminEmail,
    name: 'Admin',
    role: 'admin',
  };
}

export async function generateAdminToken(user: AdminUser): Promise<string> {
  return new SignJWT({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(TOKEN_EXPIRY)
    .setIssuedAt()
    .sign(JWT_SECRET);
}

export async function verifyAdminToken(token: string): Promise<AdminUser | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return {
      id: payload.id as string,
      email: payload.email as string,
      name: payload.name as string,
      role: payload.role as string,
    };
  } catch {
    return null;
  }
}
