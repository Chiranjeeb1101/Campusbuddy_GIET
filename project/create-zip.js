const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Files and directories to include in the ZIP
const includePatterns = [
  'src/',
  'public/',
  'index.html',
  'package.json',
  'package-lock.json',
  'vite.config.ts',
  'tsconfig.json',
  'tsconfig.app.json',
  'tsconfig.node.json',
  'tailwind.config.js',
  'postcss.config.js',
  'eslint.config.js',
  '.env.example'
];

// Files and directories to exclude
const excludePatterns = [
  'node_modules/',
  'dist/',
  '.git/',
  'supabase/',
  'campus-buddy-frontend/',
  'create-zip.js',
  'frontend.zip'
];

console.log('Creating ZIP file of CampusBuddy frontend...');

try {
  // Create a temporary directory structure
  const tempDir = 'temp-frontend';
  
  if (fs.existsSync(tempDir)) {
    execSync(`rm -rf ${tempDir}`);
  }
  
  fs.mkdirSync(tempDir, { recursive: true });
  
  // Copy files to temp directory
  includePatterns.forEach(pattern => {
    const sourcePath = pattern;
    const destPath = path.join(tempDir, pattern);
    
    if (fs.existsSync(sourcePath)) {
      const stats = fs.statSync(sourcePath);
      
      if (stats.isDirectory()) {
        // Copy directory recursively
        execSync(`cp -r "${sourcePath}" "${path.dirname(destPath)}"`);
        console.log(`✓ Copied directory: ${sourcePath}`);
      } else {
        // Copy file
        const destDir = path.dirname(destPath);
        if (!fs.existsSync(destDir)) {
          fs.mkdirSync(destDir, { recursive: true });
        }
        fs.copyFileSync(sourcePath, destPath);
        console.log(`✓ Copied file: ${sourcePath}`);
      }
    } else {
      console.log(`⚠ File not found: ${sourcePath}`);
    }
  });
  
  // Create README for the frontend package
  const readmeContent = `# CampusBuddy Frontend

A modern React-based frontend for the CampusBuddy smart peer support platform.

## 🚀 Quick Start

1. **Install dependencies**
\`\`\`bash
npm install
\`\`\`

2. **Environment Setup**
\`\`\`bash
cp .env.example .env
\`\`\`

Fill in your environment variables:
\`\`\`env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
\`\`\`

3. **Start Development Server**
\`\`\`bash
npm run dev
\`\`\`

## 📦 Build for Production

\`\`\`bash
npm run build
\`\`\`

## 🚀 Deploy

The \`dist\` folder can be deployed to any static hosting service:
- Netlify (drag & drop)
- Vercel (connect GitHub)
- Firebase Hosting
- Any static file server

## 🎯 Features

- ✅ Modern React 18 with TypeScript
- ✅ Responsive Tailwind CSS design
- ✅ Authentication ready (Supabase)
- ✅ AI chat interface (Gemini API)
- ✅ Peer matching system
- ✅ Resource sharing platform
- ✅ Real-time updates
- ✅ Mobile-optimized

Built with ❤️ for the college community
`;

  fs.writeFileSync(path.join(tempDir, 'README.md'), readmeContent);
  console.log('✓ Created README.md');
  
  // Create the ZIP file using Node.js (since zip command might not be available)
  console.log('Creating ZIP archive...');
  
  // Use tar as an alternative to zip (more likely to be available)
  try {
    execSync(`cd ${tempDir} && tar -czf ../campus-buddy-frontend.tar.gz .`);
    console.log('✅ Created campus-buddy-frontend.tar.gz');
  } catch (tarError) {
    // If tar fails, try creating a simple archive structure
    console.log('Creating file list for manual download...');
    
    const createFileList = (dir, prefix = '') => {
      const items = fs.readdirSync(dir);
      let fileList = [];
      
      items.forEach(item => {
        const fullPath = path.join(dir, item);
        const relativePath = path.join(prefix, item);
        const stats = fs.statSync(fullPath);
        
        if (stats.isDirectory()) {
          fileList.push(`📁 ${relativePath}/`);
          fileList = fileList.concat(createFileList(fullPath, relativePath));
        } else {
          const size = (stats.size / 1024).toFixed(1);
          fileList.push(`📄 ${relativePath} (${size} KB)`);
        }
      });
      
      return fileList;
    };
    
    const fileList = createFileList(tempDir);
    const fileListContent = `# CampusBuddy Frontend Files

Total files: ${fileList.length}

## File Structure:
${fileList.join('\n')}

## Manual Download Instructions:
1. Copy each file from the project to your local machine
2. Maintain the same directory structure
3. Run 'npm install' after copying all files
4. Follow the README.md instructions
`;
    
    fs.writeFileSync('frontend-files-list.txt', fileListContent);
    console.log('✅ Created frontend-files-list.txt with file listing');
  }
  
  // Clean up temp directory
  execSync(`rm -rf ${tempDir}`);
  
  console.log('\n🎉 Frontend package ready!');
  console.log('📦 Files: campus-buddy-frontend.tar.gz (if created)');
  console.log('📋 List: frontend-files-list.txt');
  
} catch (error) {
  console.error('❌ Error creating ZIP:', error.message);
  
  // Fallback: create a simple file list
  console.log('\n📋 Creating file list as fallback...');
  
  const listFiles = (dir, prefix = '') => {
    try {
      const items = fs.readdirSync(dir);
      let files = [];
      
      items.forEach(item => {
        if (excludePatterns.some(pattern => item.includes(pattern.replace('/', '')))) {
          return;
        }
        
        const fullPath = path.join(dir, item);
        const relativePath = path.join(prefix, item);
        
        try {
          const stats = fs.statSync(fullPath);
          if (stats.isDirectory()) {
            files.push(`📁 ${relativePath}/`);
            files = files.concat(listFiles(fullPath, relativePath));
          } else {
            files.push(`📄 ${relativePath}`);
          }
        } catch (e) {
          // Skip files that can't be accessed
        }
      });
      
      return files;
    } catch (e) {
      return [];
    }
  };
  
  const allFiles = listFiles('.');
  const frontendFiles = allFiles.filter(file => 
    includePatterns.some(pattern => 
      file.includes(pattern.replace('/', '')) || 
      file.includes('src/') || 
      file.includes('package.json') ||
      file.includes('index.html') ||
      file.includes('.config.')
    )
  );
  
  const fileListContent = `# CampusBuddy Frontend Files

## Files to download:
${frontendFiles.join('\n')}

## Setup Instructions:
1. Create a new folder for your project
2. Copy all the files listed above maintaining the directory structure
3. Run: npm install
4. Copy .env.example to .env and fill in your credentials
5. Run: npm run dev

## Key Files:
- src/ - All React components and logic
- package.json - Dependencies and scripts
- vite.config.ts - Build configuration
- tailwind.config.js - Styling configuration
- index.html - Main HTML template
`;
  
  fs.writeFileSync('frontend-download-guide.txt', fileListContent);
  console.log('✅ Created frontend-download-guide.txt');
}