# Threadist

**AI-Powered Reddit Story Narration Platform**

Threadist is a web application that transforms Reddit stories into immersive audio experiences using cutting-edge AI text-to-speech technology. Discover captivating stories from popular subreddits and listen to them with amazing AI-powered voices.

## 🎧 Features

- **Reddit Story Discovery**: Browse and search stories from popular subreddits like r/nosleep, r/tifu, r/WritingPrompts
- **AI Narration**: Convert Reddit stories to high-quality audio using AI text-to-speech
- **Reddit-Style UI**: Familiar interface inspired by Reddit's design with modern enhancements
- **User Authentication**: Secure signup/login with Supabase
- **Waitlist System**: Early access program for beta features
- **Personalized Experience**: Interest-based story recommendations
- **Responsive Design**: Optimized for desktop and mobile devices
- **Dark/Light Mode**: Toggle between themes for comfortable viewing

## 🚀 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Chakra UI** for component library and styling
- **React Router** for navigation
- **Vite** for fast development and building

### Backend & Services
- **Supabase** for database, authentication, and real-time features
- **Reddit API** for story content (planned)
- **ElevenLabs API** for AI text-to-speech (planned)

### Database
- **PostgreSQL** (via Supabase)
- Row Level Security (RLS) enabled
- User profiles and waitlist management

## 📋 Prerequisites

- **Node.js 16+**
- **npm or yarn**
- **Supabase account**

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd threadist
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 4. Database Setup

Run these SQL commands in your Supabase SQL Editor:

#### Waitlist Table
```sql
-- Create waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  interests TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  notified BOOLEAN DEFAULT FALSE
);

-- Enable RLS
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can join waitlist" ON waitlist
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Only authenticated users can read waitlist" ON waitlist
  FOR SELECT USING (auth.role() = 'authenticated');
```

#### User Profiles Table
```sql
-- Create user profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  username TEXT,
  full_name TEXT,
  avatar_url TEXT,
  interests TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

#### Auto-create Profile Function
```sql
-- Function to automatically create user profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (user_id, full_name, username)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'username'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call function on new user signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### 5. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
threadist/
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   └── AuthModal.tsx          # Authentication modal
│   │   ├── waitlist/
│   │   │   └── WaitlistModal.tsx      # Waitlist signup modal
│   │   ├── ui/                        # Reusable UI components
│   │   ├── Navbar.tsx                 # Navigation component
│   │   ├── Sidebar.tsx                # Sidebar with communities
│   │   └── StoryCard.tsx              # Story display component
│   ├── context/
│   │   └── AuthContext.tsx            # Authentication context
│   ├── lib/
│   │   └── supabase.ts                # Supabase client setup
│   ├── pages/
│   │   ├── Landing.tsx                # Landing page
│   │   ├── Home.tsx                   # Main stories feed
│   │   ├── Story.tsx                  # Individual story view
│   │   ├── Subreddit.tsx              # Subreddit-specific stories
│   │   └── Profile.tsx                # User profile page
│   ├── App.tsx                        # Main app component
│   └── index.tsx                      # App entry point
├── public/                            # Static assets
├── package.json
└── README.md
```

## 🎯 Key Features

### Landing Page
- Hero section with compelling value proposition
- Feature showcase with icons and descriptions
- Popular communities preview
- Call-to-action buttons for signup/waitlist

### Authentication System
- Email/password signup and login
- User profile auto-creation
- Protected routes
- Session management

### Waitlist System
- Interest selection (12 categories)
- Email validation and duplicate prevention
- Success confirmation with early access benefits
- Database storage with RLS policies

### Story Interface
- Reddit-style voting system
- AI narration badges and controls
- Expandable story content
- Comments section (UI ready)
- Share and save functionality

## 🔮 Planned Features

### Phase 1 (Current)
- ✅ Landing page and authentication
- ✅ Waitlist system
- ✅ Basic story UI components
- ✅ User profiles

### Phase 2 (Next)
- [ ] Reddit API integration
- [ ] AI text-to-speech integration
- [ ] Audio player component
- [ ] Story recommendations

### Phase 3 (Future)
- [ ] Real-time comments
- [ ] User-generated content
- [ ] Mobile app (React Native)
- [ ] Premium features

## 🎨 Design System

### Colors
- **Primary**: Orange (#dd6b20) - Reddit-inspired
- **Secondary**: Red (#e53e3e) - Accent color
- **Background**: Light (#dae0e6) / Dark (#0b1426)
- **Cards**: White / Dark gray (#1a1a1b)

### Typography
- **Headings**: Bold, clear hierarchy
- **Body**: Readable line height (1.6)
- **UI Text**: Consistent sizing and spacing

### Components
- **Cards**: Subtle borders, hover effects
- **Buttons**: Orange primary, ghost variants
- **Forms**: Validation states, error handling
- **Modals**: Centered, responsive design

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Netlify/Vercel

1. Connect your repository
2. Set environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Deploy with build command: `npm run build`
4. Set publish directory: `dist`

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style

- TypeScript for type safety
- Functional components with hooks
- Chakra UI for consistent styling
- ESLint for code quality

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Check the [Issues](https://github.com/your-repo/threadist/issues) page
2. Review the setup instructions
3. Verify your environment variables
4. Check Supabase dashboard for database issues

## 🙏 Acknowledgments

- **Reddit** for providing the content platform
- **Supabase** for backend infrastructure
- **Chakra UI** for the component library
- **ElevenLabs** for AI voice technology (planned)

---

**Built with ❤️ for the Reddit community**