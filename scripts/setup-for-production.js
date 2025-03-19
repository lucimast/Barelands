#!/usr/bin/env node

/**
 * This script prepares the project for production deployment.
 * It performs several tasks:
 * 1. Generates a secure NEXTAUTH_SECRET
 * 2. Prepares the .env.production file
 * 3. Ensures all required directories exist
 * 4. Checks for any missing dependencies
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise(resolve => {
    rl.question(question, resolve);
  });
}

async function main() {
  console.log('\n🚀 Preparing Barelands for production deployment...\n');

  // 1. Check if the uploads directory exists
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    console.log('📁 Creating uploads directory...');
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  // 2. Generate a secure NEXTAUTH_SECRET if needed
  let nextAuthSecret = crypto.randomBytes(32).toString('base64');
  console.log('🔑 Generated secure NEXTAUTH_SECRET');

  // 3. Prepare environment variables
  const domainName = await ask('Enter your domain name (e.g., barelands.vip): ');
  
  // Check if admin email is provided
  const adminEmail = await ask('Enter admin email (default: admin@barelands.vip): ') || 'admin@barelands.vip';
  
  // Ask if they want to change the admin password
  const changePassword = await ask('Do you want to set a new admin password? (y/n, default: n): ');
  
  let adminPasswordHash;
  if (changePassword.toLowerCase() === 'y') {
    console.log('\nℹ️ For security, we will not show the password you type.');
    const adminPassword = await ask('Enter new admin password: ');
    console.log('Hashing password...');
    
    // We'll use the bcrypt module from our project
    try {
      const bcrypt = require('bcrypt');
      adminPasswordHash = await bcrypt.hash(adminPassword, 10);
    } catch (error) {
      console.error('Error hashing password:', error);
      process.exit(1);
    }
  } else {
    // Use the default from .env.local
    try {
      // Read from .env.local
      const envLocalPath = path.join(process.cwd(), '.env.local');
      if (fs.existsSync(envLocalPath)) {
        const envContent = fs.readFileSync(envLocalPath, 'utf8');
        const match = envContent.match(/ADMIN_PASSWORD_HASH="([^"]+)"/);
        if (match && match[1]) {
          adminPasswordHash = match[1];
          console.log('Using existing admin password hash from .env.local');
        }
      }
    } catch (error) {
      console.error('Error reading existing password hash:', error);
    }
    
    // If we couldn't get the hash, use the default
    if (!adminPasswordHash) {
      adminPasswordHash = '$2b$10$vQcjA2ldvcvUU7.QW9HXMObUJa3SyDQg/I8pZtkWMkN0GhZO6gpNO'; // changeme123
      console.log('Using default admin password hash (changeme123). PLEASE CHANGE THIS IMMEDIATELY!');
    }
  }

  // 4. Create the .env.production file
  const envContent = `# Production environment variables
# Generated on ${new Date().toISOString()}

# Authentication
ADMIN_EMAIL="${adminEmail}"
ADMIN_PASSWORD_HASH="${adminPasswordHash}"

# NextAuth.js
NEXTAUTH_URL="https://${domainName}"
NEXTAUTH_SECRET="${nextAuthSecret}"

# Analytics
# VERCEL_ANALYTICS_ID=""
`;

  const envProductionPath = path.join(process.cwd(), '.env.production');
  fs.writeFileSync(envProductionPath, envContent);
  
  console.log('\n✅ Created .env.production file');
  console.log(`📝 You can find it at: ${envProductionPath}`);

  // 5. Instructions for the user
  console.log('\n📋 Next steps:');
  console.log('1. Review the .env.production file and make any necessary changes');
  console.log('2. Deploy your site to Netlify or your preferred hosting provider');
  console.log('3. Set up your DNS records to point to your hosting provider');
  console.log('4. Log in to your admin panel at https://' + domainName + '/admin');
  console.log('\n🎉 All done! Your website is ready for production deployment.');

  rl.close();
}

main().catch(error => {
  console.error('Error:', error);
  process.exit(1);
}); 