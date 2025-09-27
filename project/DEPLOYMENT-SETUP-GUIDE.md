# CampusBuddy - Complete Deployment Setup Guide

## 🚀 Quick Start Checklist

### ✅ Required API Keys & Services

1. **Supabase Account** (Free tier available)
   - Database, Authentication, Storage
   - [Sign up at supabase.com](https://supabase.com)

2. **Google Cloud Console** (For Gemini AI)
   - Gemini API access
   - [Get API key at Google AI Studio](https://aistudio.google.com/app/apikey)

3. **Google OAuth** (Optional - for Google sign-in)
   - OAuth 2.0 credentials
   - [Setup in Google Cloud Console](https://console.cloud.google.com/apis/credentials)

---

## 📋 Step-by-Step Setup

### 1. Supabase Setup

#### Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and create account
2. Click "New Project"
3. Choose organization and enter project details
4. Wait for project to be ready (2-3 minutes)

#### Get Supabase Credentials
1. Go to **Settings** → **API**
2. Copy your **Project URL** and **anon public** key
3. Save these for environment variables

#### Setup Database
1. Go to **SQL Editor** in Supabase dashboard
2. Copy the entire content from `supabase/migrations/20250908183122_red_shore.sql`
3. Paste and run the SQL script
4. Verify tables are created in **Table Editor**

#### Setup Storage
1. Go to **Storage** in Supabase dashboard
2. Create a new bucket named `resources`
3. Set bucket to **Public**
4. Add policy for authenticated users

#### Setup Authentication
1. Go to **Authentication** → **Settings**
2. Enable **Email** provider
3. For Google OAuth (optional):
   - Go to **Authentication** → **Providers**
   - Enable **Google**
   - Add your Google OAuth credentials

### 2. Google Gemini API Setup

#### Get Gemini API Key
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with Google account
3. Click "Create API Key"
4. Copy the API key

#### Setup Supabase Edge Functions
1. Install Supabase CLI:
   ```bash
   npm install -g supabase
   ```

2. Login to Supabase:
   ```bash
   supabase login
   ```

3. Link your project:
   ```bash
   supabase link --project-ref YOUR_PROJECT_REF
   ```

4. Deploy edge functions:
   ```bash
   supabase functions deploy gemini-chat
   supabase functions deploy match-mentors
   supabase functions deploy upload-resource
   ```

5. Set environment variables in Supabase:
   - Go to **Edge Functions** → **Settings**
   - Add `GEMINI_API_KEY` with your API key

### 3. Frontend Environment Setup

#### Create Environment File
1. Copy `env.example` to `.env` in `campus-buddy-frontend/`:
   ```bash
   cp env.example .env
   ```

2. Fill in your credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   VITE_GOOGLE_CLIENT_ID=your-google-client-id (optional)
   VITE_API_URL=http://localhost:4000
   ```

### 4. Backend Setup (Optional)

The project uses Supabase as the primary backend, but you can also run the Express.js backend:

```bash
cd backend
npm install
npm run dev
```

---

## 🚀 Deployment Options

### Frontend Deployment

#### Option 1: Netlify (Recommended)
1. Build the project:
   ```bash
   cd campus-buddy-frontend
   npm run build
   ```

2. Deploy to Netlify:
   - Drag `dist` folder to [netlify.com/drop](https://netlify.com/drop)
   - Or connect GitHub repository

3. Set environment variables in Netlify:
   - Go to **Site settings** → **Environment variables**
   - Add all `VITE_*` variables

#### Option 2: Vercel
1. Connect GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variables in Vercel dashboard

#### Option 3: Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

### Backend Deployment

Supabase handles the backend automatically, but if you want to deploy the Express.js backend:

#### Option 1: Railway
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set start command: `npm start`
4. Add environment variables

#### Option 2: Render
1. Create new Web Service
2. Connect GitHub repository
3. Set build and start commands
4. Add environment variables

---

## 🔧 Configuration Files

### Required Environment Variables

#### Frontend (.env)
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_GOOGLE_CLIENT_ID=your-google-client-id (optional)
VITE_API_URL=http://localhost:4000
```

#### Supabase Edge Functions
```env
GEMINI_API_KEY=your-gemini-api-key
```

### Database Configuration
- All database setup is handled by the SQL migration file
- Row Level Security (RLS) is enabled
- Proper policies are set for data access

---

## 🧪 Testing Your Setup

### 1. Test Authentication
1. Start frontend: `npm run dev`
2. Click "Get Started" on landing page
3. Try both email/password and Google sign-in
4. Verify you can access dashboard

### 2. Test AI Chat
1. Navigate to "Ask AI" section
2. Send a test message
3. Verify AI response is received

### 3. Test Database
1. Check if user profile is created
2. Verify data is saved in Supabase dashboard

---

## 🚨 Troubleshooting

### Common Issues

#### 1. "Missing Supabase environment variables"
- Check `.env` file exists and has correct values
- Restart development server after adding env vars

#### 2. "Failed to fetch" errors
- Check Supabase URL and API key
- Verify CORS settings in Supabase

#### 3. Google OAuth not working
- Check Google OAuth credentials
- Verify redirect URLs in Google Console
- Ensure OAuth is enabled in Supabase

#### 4. AI chat not responding
- Verify Gemini API key is set in Supabase
- Check edge function deployment
- Review function logs in Supabase dashboard

#### 5. Database connection issues
- Run the SQL migration script
- Check RLS policies
- Verify user permissions

### Getting Help
1. Check Supabase logs in dashboard
2. Review browser console for errors
3. Check network tab for failed requests
4. Verify all environment variables are set

---

## 📊 Production Checklist

### Before Going Live
- [ ] All environment variables set
- [ ] Database migration completed
- [ ] Edge functions deployed
- [ ] Storage bucket configured
- [ ] Authentication providers enabled
- [ ] CORS settings configured
- [ ] Domain added to allowed origins
- [ ] SSL certificate active
- [ ] Error monitoring setup
- [ ] Analytics configured

### Performance Optimization
- [ ] Enable CDN for static assets
- [ ] Optimize images and assets
- [ ] Enable gzip compression
- [ ] Set up caching headers
- [ ] Monitor database performance
- [ ] Set up error tracking

---

## 🎯 Next Steps

After successful deployment:
1. **Monitor Usage**: Check Supabase dashboard for usage metrics
2. **User Feedback**: Collect feedback and iterate
3. **Feature Updates**: Deploy new features using the same process
4. **Scale**: Upgrade Supabase plan if needed
5. **Backup**: Set up automated database backups

---

## 📞 Support

If you encounter issues:
1. Check this guide first
2. Review Supabase documentation
3. Check GitHub issues
4. Contact the development team

**Happy Deploying! 🚀**
