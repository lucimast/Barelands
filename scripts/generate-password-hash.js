#!/usr/bin/env node

/**
 * Utility script to generate a bcrypt hash for admin passwords
 * Usage: node scripts/generate-password-hash.js mySecurePassword
 */

const bcrypt = require('bcrypt');

async function generateHash() {
  if (process.argv.length < 3) {
    console.error('Please provide a password to hash');
    console.error('Usage: node scripts/generate-password-hash.js yourSecurePassword');
    process.exit(1);
  }

  const password = process.argv[2];
  const saltRounds = 10;

  try {
    const hash = await bcrypt.hash(password, saltRounds);
    console.log('\nPassword Hash (add to your .env.local file):');
    console.log('\nADMIN_PASSWORD_HASH="' + hash + '"\n');
  } catch (error) {
    console.error('Error generating hash:', error);
    process.exit(1);
  }
}

generateHash(); 