# CampusBuddy Frontend

A modern React-based frontend for the CampusBuddy smart peer support platform.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Supabase account (for backend integration)
- Google Gemini API key (for AI features)

### Installation

1. **Install dependencies**
```bash
npm install
```

2. **Environment Setup**
```bash
cp .env.example .env
```

Fill in your environment variables:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. **Start Development Server**
```bash
npm run dev
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Navigation header
│   ├── LandingPage.tsx # Landing page
│   ├── Dashboard.tsx   # Main dashboard
│   ├── AskDoubt.tsx    # AI chat interface
│   ├── PeerConnect.tsx # Mentor matching
│   ├── ResourceHub.tsx # Resource sharing
│   └── AuthModal.tsx   # Authentication modal
├── hooks/              # Custom React hooks
│   └── useAuth.ts      # Authentication hook
├── lib/                # Utility libraries
│   └── supabase.ts     # Supabase client & helpers
├── App.tsx             # Main app component
├── main.tsx           # App entry point
└── index.css          # Global styles
```

## 🎨 Features

### Core Components
- **Landing Page**: Compelling introduction with feature highlights
- **Dashboard**: Central hub with quick actions and activity overview
- **AI Chat**: Gemini-powered doubt resolution interface
- **Peer Connect**: Smart mentor matching with filters
- **Resource Hub**: Academic resource sharing platform
- **Authentication**: Secure user registration and login

### Design System
- **Colors**: Blue (#3B82F6), Purple (#8B5CF6), Green (#10B981)
- **Typography**: Clean hierarchy with proper spacing
- **Components**: Card-based layout with hover effects
- **Responsive**: Mobile-first design approach
- **Animations**: Smooth transitions and micro-interactions

## 🔧 Technology Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Vite** - Fast build tool and dev server
- **Lucide React** - Beautiful icon library
- **Supabase** - Backend integration

## 🛠️ Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Organization
- Components are modular and reusable
- TypeScript interfaces for type safety
- Custom hooks for state management
- Utility functions in lib directory

## 🔌 Backend Integration

The frontend is designed to work with:
- **Supabase** for authentication and database
- **Gemini API** for AI-powered features
- **Edge Functions** for serverless logic

### Key Integration Points
- Authentication via Supabase Auth
- Real-time data with Supabase subscriptions
- File uploads to Supabase Storage
- AI chat via Gemini API edge functions

## 📱 Responsive Design

- **Mobile**: Optimized touch interface
- **Tablet**: Balanced layout for medium screens
- **Desktop**: Full-featured experience
- **Accessibility**: WCAG compliant design

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy Options
- **Netlify**: Drag and drop `dist` folder
- **Vercel**: Connect GitHub repository
- **Firebase Hosting**: Use Firebase CLI
- **Static Hosting**: Any static file server

## 🔐 Environment Variables

Required environment variables:
- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key

## 📄 License

MIT License - feel free to use for educational purposes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

Built with ❤️ for the college community