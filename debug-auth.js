const bcrypt = require('bcryptjs');

async function testAuth() {
  const email = 'admin@vcail.unc.edu';
  const password = 'admin123';
  const storedHash = '$2b$12$xDXP9cm.r2yvnlNK9YClROGHxFylyO/BOpj8IBQ7KkwZltaVN9MIa';
  
  console.log('Testing authentication...');
  console.log('Email:', email);
  console.log('Password:', password);
  console.log('Stored hash:', storedHash);
  
  try {
    const isValid = await bcrypt.compare(password, storedHash);
    console.log('Password validation result:', isValid);
    
    if (isValid) {
      console.log('✅ Authentication should work!');
    } else {
      console.log('❌ Authentication failed - hash mismatch');
    }
  } catch (error) {
    console.error('❌ Error during validation:', error);
  }
}

testAuth();

