# EduAI Hub - Production-Ready EdTech Platform

A modern, AI-powered learning platform built with React, Node.js, and PostgreSQL. Features include AI tutoring, smart notes, interactive quizzes, and comprehensive learning analytics.

![EduAI Hub](https://img.shields.io/badge/status-production--ready-brightgreen)
![Node.js](https://img.shields.io/badge/Node.js-v18+-green)
![React](https://img.shields.io/badge/React-19+-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 🚀 Features

### For Students
- **AI Chat Tutor** - Ask unlimited questions and get instant AI-powered answers
- **Smart Notes** - Access, search, and download study materials
- **Interactive Quizzes** - Practice with MCQ tests and track progress
- **Study Planner** - Schedule tasks with Pomodoro timer
- **Progress Analytics** - Detailed statistics and performance tracking
- **Badges & Achievements** - Gamified learning experience
- **Study Streak** - Track consistent learning habits

### Platform Features
- **Dark Mode** - Eye-friendly interface optimized for studying
- **Responsive Design** - Works seamlessly on all devices
- **Real-time Updates** - Instant feedback and notifications
- **Secure Authentication** - JWT-based auth with password hashing
- **Premium Subscriptions** - Flexible pricing plans with Razorpay integration
- **Admin Dashboard** - Manage users, quizzes, and analytics

## 📋 Tech Stack

### Frontend
- **React 19** - Modern UI library
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client

### Backend
- **Node.js & Express.js** - Server framework
- **PostgreSQL** - Relational database
- **Supabase** - Backend-as-a-Service
- **JWT** - Secure authentication
- **bcryptjs** - Password hashing
- **OpenAI API** - AI capabilities

### DevOps
- **Vercel** - Frontend hosting
- **Render** - Backend hosting
- **GitHub** - Version control

## 🛠️ Installation

### Prerequisites
- Node.js v18 or higher
- npm or yarn
- PostgreSQL database (or Supabase account)
- OpenAI API key

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/eduai-hub.git
   cd eduai-hub
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Setup Environment Variables**

   Create `.env` in root server folder:
   ```bash
   cp server/.env.example server/.env
   ```

   Create `.env.local` in client folder:
   ```bash
   cp client/.env.example client/.env.local
   ```

4. **Configure Supabase**
   - Create a project at [supabase.com](https://supabase.com)
   - Run the schema from `server/src/database/schema.sql` in Supabase SQL editor
   - Add credentials to `.env`

5. **Setup Environment Variables**

   **Backend (`server/.env`)**:
   ```env
   NODE_ENV=development
   PORT=5000
   JWT_SECRET=your-super-secret-jwt-key
   CORS_ORIGIN=http://localhost:5173
   
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_KEY=your-anon-key
   
   OPENAI_API_KEY=sk-your-openai-key
   ```

   **Frontend (`client/.env.local`)**:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

6. **Run Development Servers**
   ```bash
   npm run dev
   ```

   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

## 📁 Project Structure

```
eduai-hub/
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── pages/            # Page components
│   │   ├── context/          # Auth context
│   │   ├── App.jsx           # Main app
│   │   └── main.jsx          # Entry point
│   └── package.json
│
├── server/                    # Express backend
│   ├── src/
│   │   ├── routes/           # API routes
│   │   ├── middleware/       # Auth middleware
│   │   ├── config/           # Configuration
│   │   ├── database/         # Database schema
│   │   └── index.js          # Server entry
│   └── package.json
│
└── package.json               # Root workspace config
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/verify` - Verify JWT token

### Chat (AI Tutor)
- `GET /api/chat/history` - Get chat history
- `POST /api/chat/new` - Create new chat
- `POST /api/chat/message` - Send message to AI
- `GET /api/chat/:chatId` - Get chat messages
- `DELETE /api/chat/:chatId` - Delete chat

### Notes
- `GET /api/notes` - Get all notes (with filters)
- `GET /api/notes/:id` - Get single note
- `POST /api/notes` - Upload note (Admin only)
- `POST /api/notes/:id/bookmark` - Bookmark note
- `GET /api/notes/user/bookmarks` - Get user bookmarks

### Quiz
- `GET /api/quiz` - Get all quizzes
- `GET /api/quiz/:id` - Get quiz with questions
- `POST /api/quiz/:id/answer` - Submit answer
- `GET /api/quiz/user/results` - Get user results
- `GET /api/quiz/leaderboard` - Get top scores

### User
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update profile
- `GET /api/user/stats` - Get user statistics
- `GET /api/user/badges` - Get earned badges
- `GET /api/user/streak` - Get study streak

### Admin
- `GET /api/admin/dashboard` - Dashboard stats
- `GET /api/admin/users` - List all users
- `GET /api/admin/quizzes` - List all quizzes
- `POST /api/admin/quizzes` - Create quiz
- `GET /api/admin/analytics` - Analytics data

## 🗄️ Database Schema

Key tables:
- `users` - User accounts and profiles
- `chat_sessions` - AI chat conversations
- `messages` - Chat messages
- `notes` - Study materials
- `quizzes` - Quiz definitions
- `questions` - Quiz questions
- `quiz_results` - User quiz performance
- `badges` - Achievement badges
- `subscriptions` - Premium subscriptions

See `server/src/database/schema.sql` for complete schema.

## 🔐 Security Features

- ✅ JWT-based authentication
- ✅ bcryptjs password hashing
- ✅ CORS protection
- ✅ Rate limiting (100 req/15min)
- ✅ Input validation with Joi
- ✅ Helmet security headers
- ✅ XSS protection
- ✅ SQL injection prevention

## 📦 Deployment

### Frontend (Vercel)

1. Push to GitHub
2. Connect repository to Vercel
3. Set environment variables
4. Deploy automatically on push

### Backend (Render)

1. Create Render account
2. Connect GitHub repository
3. Set environment variables
4. Auto-deploy on push

## 📊 Database Setup

### Using Supabase (Recommended)

1. Create project at supabase.com
2. In SQL Editor, run `server/src/database/schema.sql`
3. Add connection credentials to `.env`

### Using Local PostgreSQL

```bash
createdb eduai_hub
psql eduai_hub < server/src/database/schema.sql
```

## 🚀 Production Checklist

- [ ] Set strong `JWT_SECRET`
- [ ] Configure CORS for production domain
- [ ] Enable HTTPS
- [ ] Setup rate limiting
- [ ] Configure email notifications
- [ ] Setup logging
- [ ] Enable database backups
- [ ] Setup monitoring/alerts
- [ ] Add error tracking (Sentry)
- [ ] Configure CDN for static files

## 📝 API Documentation

Full API documentation is available at `/docs` when running the server in development mode.

### Example: Send Chat Message

```bash
curl -X POST http://localhost:5000/api/chat/message \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "chatId": "uuid",
    "message": "What is photosynthesis?"
  }'
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 📧 Support

- Email: support@eduaihub.com
- Discord: [Join Community](https://discord.gg/eduaihub)
- Issues: [GitHub Issues](https://github.com/yourusername/eduai-hub/issues)

## 🎯 Roadmap

- [ ] Mobile app (React Native)
- [ ] Video tutorials
- [ ] Live sessions
- [ ] Community features
- [ ] Marketplace (sell notes/courses)
- [ ] AI-generated personalized study plans
- [ ] Multi-language support
- [ ] Offline mode

---

**Made with ❤️ for students worldwide**
