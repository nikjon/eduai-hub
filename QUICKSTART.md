# Quick Start Guide

Get EduAI Hub up and running in 5 minutes!

## Prerequisites Checklist

- ✅ Node.js v18+ installed
- ✅ Git installed
- ✅ Supabase account (free at supabase.com)
- ✅ OpenAI API key (get at openai.com)

## Step 1: Clone & Install (1 minute)

```bash
# Clone repository
git clone https://github.com/yourusername/eduai-hub.git
cd eduai-hub

# Install all dependencies
npm run install-all
```

## Step 2: Setup Supabase (2 minutes)

1. **Create Project**
   - Go to [supabase.com](https://supabase.com)
   - Click "New Project"
   - Fill in project name and password
   - Save password safely!

2. **Create Database Tables**
   - Open SQL Editor
   - Create new query
   - Copy-paste all content from `server/src/database/schema.sql`
   - Execute

3. **Get Credentials**
   - Go to Settings → API
   - Copy Project URL
   - Copy anon public key

## Step 3: Setup Environment Variables (1 minute)

**Backend** - Create `server/.env`:
```env
NODE_ENV=development
PORT=5000
JWT_SECRET=your-random-secret-key-min-32-chars
CORS_ORIGIN=http://localhost:5173

SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key

OPENAI_API_KEY=sk-your-openai-api-key
```

**Frontend** - Create `client/.env.local`:
```env
VITE_API_URL=http://localhost:5000/api
```

> **Note**: Never commit `.env` files! They contain secrets.

## Step 4: Start Development Servers (1 minute)

```bash
# From root directory
npm run dev
```

You'll see:
```
🚀 Server running on port 5000
✅ Frontend running on http://localhost:5173
```

## Step 5: Test the Application

1. **Frontend**: Open http://localhost:5173
2. **Create Account**: Click "Sign Up"
3. **Login**: Enter credentials
4. **Try AI Chat**: Go to Dashboard → Chat
5. **Check Backend**: Visit http://localhost:5000/health

## 🎉 You're Ready!

### Common Next Steps

- Edit pages in `client/src/pages/`
- Add routes in `server/src/routes/`
- Modify database in Supabase
- Deploy to production (see DEPLOYMENT.md)

### Quick Commands

```bash
# Development
npm run dev           # Start both servers
npm run dev --prefix client  # Frontend only
npm run dev --prefix server  # Backend only

# Build
npm run build         # Build for production

# Linting
npm run lint          # Check code style
```

## 📚 Project Structure

```
eduai-hub/
├── client/            # React frontend
│   ├── src/pages/    # Page components
│   ├── src/components/ # Reusable components
│   └── package.json
├── server/           # Express backend
│   ├── src/routes/   # API endpoints
│   └── package.json
└── README.md         # Full documentation
```

## 🔑 Key Features to Explore

1. **AI Chat** - Ask the AI anything
2. **Notes** - Download study materials
3. **Quiz** - Practice with tests
4. **Dashboard** - View your stats
5. **Profile** - Manage your account

## ⚠️ Common Issues

### "Cannot find module 'dotenv'"
```bash
npm install --save-dev dotenv
```

### "Supabase connection failed"
- Verify URL and key in `.env`
- Check Supabase project is active
- Ensure database schema is created

### "Port 5000 already in use"
```bash
# Find process using port 5000
lsof -i :5000  # macOS/Linux
netstat -ano | findstr :5000  # Windows

# Kill the process or use different port
PORT=5001 npm run dev
```

### "CORS errors"
- Check `CORS_ORIGIN` in `server/.env`
- Should match your frontend URL
- Default: `http://localhost:5173`

## 📖 Full Documentation

- **README.md** - Project overview
- **API.md** - API endpoints documentation
- **DEPLOYMENT.md** - Production deployment guide
- **CONTRIBUTING.md** - How to contribute

## 🚀 Next: Deploy to Production

When ready to deploy:

1. Read [DEPLOYMENT.md](DEPLOYMENT.md)
2. Setup Vercel (frontend)
3. Setup Render (backend)
4. Configure custom domain
5. Enable monitoring

## 💬 Need Help?

- **Issues**: [GitHub Issues](https://github.com/yourusername/eduai-hub/issues)
- **Discord**: [Join Community](https://discord.gg/eduaihub)
- **Email**: support@eduaihub.com

## ✅ Verification Checklist

After setup, verify:

- [ ] Frontend loads at localhost:5173
- [ ] Backend responds at localhost:5000/health
- [ ] Can create account
- [ ] Can login
- [ ] Can send AI message
- [ ] No console errors
- [ ] No error logs in terminal

## 🎓 Learning Path

1. Explore the UI
2. Read the code structure
3. Try modifying a component
4. Add a new route
5. Make your first PR!

---

**🎉 Congratulations! You're now running EduAI Hub locally!**

Start with the frontend at http://localhost:5173 and explore!

Happy learning! 🚀
