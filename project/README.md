# CampusBuddy - Smart Peer Support Platform

A comprehensive web application that connects college students with AI-powered academic assistance, peer mentoring, and collaborative resource sharing.

## 🚀 Features

### Core Functionality
- **AI-Powered Doubt Resolution**: Get instant academic help using Google Gemini API
- **Smart Peer Matching**: Connect with mentors based on subjects and expertise
- **Resource Hub**: Share and discover academic materials, notes, and projects
- **Real-time Chat**: Seamless communication between students and mentors
- **User Profiles**: Comprehensive academic profiles with ratings and expertise

### Technical Features
- **Authentication**: Secure user authentication with Supabase Auth
- **Database**: PostgreSQL with Row Level Security (RLS)
- **File Storage**: Secure file uploads with Supabase Storage
- **Edge Functions**: Serverless functions for AI integration and business logic
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Real-time Updates**: Live data synchronization

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage, Edge Functions)
- **AI Integration**: Google Gemini API
- **Deployment**: Netlify (Frontend), Supabase (Backend)
- **Development**: Vite, ESLint, PostCSS

## 📋 Prerequisites

- Node.js 18+ and npm
- Supabase account
- Google Cloud account (for Gemini API)

## 🚀 Quick Start

### 1. Clone and Install
```bash
git clone <repository-url>
cd campus-buddy
npm install
```

### 2. Environment Setup
```bash
cp .env.example .env
```

Fill in your environment variables:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_gemini_api_key
```

### 3. Database Setup
1. Create a new Supabase project
2. Run the migration file in Supabase SQL Editor:
   ```sql
   -- Copy and paste contents of supabase/migrations/create_initial_schema.sql
   ```
3. Create a storage bucket named "resources" with public access

### 4. Deploy Edge Functions
```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref your-project-ref

# Deploy functions
supabase functions deploy gemini-chat
supabase functions deploy match-mentors
supabase functions deploy upload-resource
```

### 5. Set Environment Variables in Supabase
In your Supabase dashboard, go to Settings > Edge Functions and add:
- `GEMINI_API_KEY`: Your Google Gemini API key

### 6. Run Development Server
```bash
npm run dev
```

## 📊 Database Schema

### Core Tables
- **profiles**: User profiles with academic information
- **subjects**: Available subjects/courses
- **mentors**: Mentor profiles and availability
- **resources**: Academic resources shared by users
- **chat_sessions**: AI chat sessions
- **mentor_requests**: Connection requests between students and mentors

### Security
- Row Level Security (RLS) enabled on all tables
- User-based access control
- Secure file upload policies

## 🔧 API Endpoints

### Edge Functions
- `/functions/v1/gemini-chat`: AI-powered chat responses
- `/functions/v1/match-mentors`: Smart mentor matching algorithm
- `/functions/v1/upload-resource`: Secure file upload handling

### Database Operations
- Authentication via Supabase Auth
- Real-time subscriptions for live updates
- Optimized queries with proper indexing

## 🎨 UI/UX Features

- **Modern Design**: Clean, professional interface with gradient accents
- **Responsive Layout**: Optimized for desktop, tablet, and mobile
- **Interactive Elements**: Smooth animations and hover effects
- **Accessibility**: WCAG compliant with proper contrast ratios
- **Performance**: Optimized loading and caching strategies

## 🔐 Security Features

- **Authentication**: Secure email/password authentication
- **Authorization**: Role-based access control
- **Data Protection**: Encrypted data transmission
- **File Security**: Secure file upload with validation
- **Privacy**: User data protection and GDPR compliance

## 📱 Mobile Support

- Progressive Web App (PWA) ready
- Touch-optimized interface
- Offline capability for cached content
- Mobile-first responsive design

## 🚀 Deployment

### Frontend (Netlify)
```bash
npm run build
# Deploy dist/ folder to Netlify
```

### Backend (Supabase)
- Database and Auth automatically managed
- Edge Functions deployed via Supabase CLI
- Storage configured through Supabase dashboard

## 🧪 Testing

```bash
# Run tests
npm test

# Run linting
npm run lint

# Type checking
npm run type-check
```

## 📈 Performance Optimization

- **Code Splitting**: Lazy loading of components
- **Image Optimization**: Responsive images with proper sizing
- **Caching**: Strategic caching of API responses
- **Bundle Optimization**: Tree shaking and minification

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Contact the development team

## 🔮 Future Enhancements

- **Video Chat**: Integrated video calling for mentoring sessions
- **Study Groups**: Create and join study groups
- **Calendar Integration**: Schedule mentoring sessions
- **Mobile App**: Native mobile applications
- **Analytics Dashboard**: Detailed usage analytics
- **Gamification**: Points and badges system
- **Multi-language Support**: Internationalization

---

Built with ❤️ for the college community