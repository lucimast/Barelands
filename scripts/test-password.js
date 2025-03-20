#!/usr/bin/env node

/**
 * Utility script to test password hash comparison
 * Usage: node scripts/test-password.js yourPassword yourPasswordHash
 */

const bcrypt = require('bcrypt');

async function testPassword() {
  if (process.argv.length < 4) {
    console.error('Please provide a password and hash to test');
    console.error('Usage: node scripts/test-password.js yourPassword yourPasswordHash');
    process.exit(1);
  }

  const password = process.argv[2];
  const hash = process.argv[3];

  try {
    const passwordMatch = await bcrypt.compare(password, hash);
    console.log('\nPassword match result:', passwordMatch);
    
    // Let's also create a fresh hash to compare
    const newHash = await bcrypt.hash(password, 10);
    console.log('\nNew hash for the same password:', newHash);
    
    // Compare with the new hash to verify bcrypt is working correctly
    const newPasswordMatch = await bcrypt.compare(password, newHash);
    console.log('New password match result:', newPasswordMatch);
  } catch (error) {
    console.error('Error testing password:', error);
    process.exit(1);
  }
}

testPassword(); 