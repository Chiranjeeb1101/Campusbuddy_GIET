# CampusBuddy Frontend Setup Guide

## 📋 Complete Setup Instructions

### Step 1: Download and Extract
1. Download the frontend package
2. Extract to your desired directory
3. Open terminal in the project folder

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Environment Configuration
1. Copy the environment template:
```bash
cp .env.example .env
```

2. Edit `.env` file with your credentials:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### Step 4: Start Development
```bash
npm run dev
```

Your app will be available at `http://localhost:5173`

## 🔧 Backend Setup (Optional)

To enable full functionality, you'll need:

1. **Supabase Project**
   - Create account at https://supabase.com
   - Create new project
   - Get URL and anon key from Settings > API

2. **Database Schema**
   - Run the migration SQL in your Supabase SQL editor
   - Enable Row Level Security
   - Create storage bucket named "resources"

3. **Gemini API**
   - Get API key from Google AI Studio
   - Add to Supabase Edge Functions environment

## 📦 Production Build

```bash
npm run build
```

The `dist` folder contains your production-ready files.

## 🚀 Deployment Options

### Netlify (Recommended)
1. Build the project: `npm run build`
2. Drag `dist` folder to Netlify
3. Set environment variables in Netlify dashboard

### Vercel
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variables

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## 🎯 Key Features

- ✅ Modern React 18 with TypeScript
- ✅ Responsive Tailwind CSS design
- ✅ Authentication ready (Supabase)
- ✅ AI chat interface (Gemini API)
- ✅ Peer matching system
- ✅ Resource sharing platform
- ✅ Real-time updates
- ✅ Mobile-optimized

## 📞 Support

If you encounter issues:
1. Check Node.js version (18+)
2. Clear npm cache: `npm cache clean --force`
3. Delete node_modules and reinstall
4. Verify environment variables

Happy coding! 🎉