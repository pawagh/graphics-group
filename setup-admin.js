#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

console.log('🔧 Setting up VCAIL Admin System...\n');

// Generate secure secrets
const nextAuthSecret = crypto.randomBytes(32).toString('hex');
const jwtSecret = crypto.randomBytes(32).toString('hex');

// Default admin credentials
const adminEmail = 'admin@vcail.unc.edu';
const adminPasswordHash = '$2b$12$xDXP9cm.r2yvnlNK9YClROGHxFylyO/BOpj8IBQ7KkwZltaVN9MIa'; // admin123

const envContent = `# VCAIL Admin System Environment Variables
# Generated on ${new Date().toISOString()}

# Admin Authentication
NEXTAUTH_SECRET=${nextAuthSecret}
NEXTAUTH_URL=http://localhost:3000

# Admin Credentials
ADMIN_EMAIL=${adminEmail}
ADMIN_PASSWORD_HASH=${adminPasswordHash}

# JWT Secret for additional security
JWT_SECRET=${jwtSecret}
`;

const envPath = path.join(process.cwd(), '.env.local');

try {
  // Check if .env.local already exists
  if (fs.existsSync(envPath)) {
    console.log('⚠️  .env.local already exists. Backing up to .env.local.backup');
    fs.copyFileSync(envPath, path.join(process.cwd(), '.env.local.backup'));
  }

  // Write new .env.local file
  fs.writeFileSync(envPath, envContent);
  
  console.log('✅ Created .env.local file with secure credentials');
  console.log('\n📋 Admin Login Credentials:');
  console.log(`   Email: ${adminEmail}`);
  console.log(`   Password: admin123`);
  console.log('\n🌐 Access the admin panel at: http://localhost:3000/admin');
  console.log('\n⚠️  IMPORTANT: Change the default password in production!');
  console.log('\n🚀 Run "npm run dev" to start the development server');
  
} catch (error) {
  console.error('❌ Error setting up admin system:', error.message);
  process.exit(1);
}
