# Deployment Guide

Complete guide to deploy EduAI Hub to production.

## Frontend Deployment (Vercel)

### 1. Prepare for Deployment

```bash
# Build the frontend
cd client
npm run build
```

### 2. Connect to Vercel

1. Visit [vercel.com](https://vercel.com)
2. Sign up/login with GitHub
3. Click "New Project"
4. Select the `eduai-hub` repository
5. Import the project

### 3. Configure Environment Variables

In Vercel dashboard:
- Click "Settings" → "Environment Variables"
- Add `VITE_API_URL` with your production backend URL

Example:
```
VITE_API_URL=https://eduai-api.render.com/api
```

### 4. Deploy

- Vercel automatically deploys on every push to main
- Production URL: `https://eduai-hub.vercel.app`

## Backend Deployment (Render)

### 1. Prepare Backend

```bash
# Ensure package.json has proper start script
npm run build  # If applicable
```

### 2. Create Render Service

1. Visit [render.com](https://render.com)
2. Sign up/login with GitHub
3. Click "New +" → "Web Service"
4. Select repository
5. Configure:
   - **Name**: `eduai-hub-api`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Region**: Choose nearest to users

### 3. Add Environment Variables

In Render dashboard → Environment:

```env
NODE_ENV=production
PORT=5000
JWT_SECRET=your-very-secure-random-secret-key
CORS_ORIGIN=https://eduai-hub.vercel.app

SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key

OPENAI_API_KEY=sk-your-openai-key

RAZORPAY_KEY_ID=your-razorpay-key
RAZORPAY_KEY_SECRET=your-razorpay-secret
```

### 4. Deploy

- Render automatically deploys on push
- Production URL: `https://eduai-hub-api.render.com`

## Database Setup (Supabase)

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Enter project name and password
4. Choose region closest to you
5. Wait for provisioning

### 2. Run Database Schema

1. Go to SQL Editor
2. Click "New Query"
3. Copy-paste content from `server/src/database/schema.sql`
4. Execute

### 3. Get Connection Credentials

- Go to Settings → API
- Copy `URL` → `SUPABASE_URL`
- Copy `anon public` key → `SUPABASE_KEY`

### 4. Set Up Backups

- Go to Settings → Backups
- Enable daily backups
- Configure backup retention

## Environment Variables Checklist

### Production (.env files)

**Backend** (`server/.env`):
- ✅ `NODE_ENV=production`
- ✅ `JWT_SECRET` - Strong random key (min 32 chars)
- ✅ `CORS_ORIGIN` - Your frontend URL
- ✅ `SUPABASE_URL` & `SUPABASE_KEY`
- ✅ `OPENAI_API_KEY`
- ✅ `RAZORPAY_KEY_ID` & `RAZORPAY_KEY_SECRET`

**Frontend** (`.env.local`):
- ✅ `VITE_API_URL` - Your backend API URL

## SSL/HTTPS

Both Vercel and Render provide free HTTPS automatically. No additional configuration needed.

## Domain Setup

### Custom Domain for Frontend

1. In Vercel → Settings → Domains
2. Add your custom domain (e.g., `eduai-hub.com`)
3. Update DNS records as instructed
4. Wait for verification (usually 24 hours)

### Custom Domain for Backend

1. In Render → Settings → Custom Domains
2. Add your custom domain (e.g., `api.eduai-hub.com`)
3. Update DNS CNAME record
4. Verify

## Monitoring & Logs

### Vercel
- Deployment logs: Dashboard → Deployments
- Runtime logs: Logs tab
- Analytics: Analytics section

### Render
- Deployment logs: Dashboard → Events
- Runtime logs: Logs tab
- Metrics: Logs & Metrics

## Scaling

### Vercel
- Auto-scaling with serverless functions
- CDN in 300+ cities worldwide
- No configuration needed

### Render
- For high traffic, upgrade plan:
  1. Dashboard → Settings → Plan
  2. Choose "Standard" or "Premium"
  3. Auto-scales based on traffic

## Backup & Recovery

### Database Backups
- Supabase: Daily automated backups (30 days)
- Manual backup: Export SQL via Supabase dashboard

### Source Code
- GitHub: All code backed up automatically
- Set up branch protection rules

## Performance Optimization

### Frontend
```bash
# Analyze bundle size
npm run build --report
```

### Backend
- Enable GZIP compression (enabled by default in Express)
- Use database indexes (already configured)
- Implement caching strategy
- Monitor with tools like New Relic

## Security Checklist

- ✅ HTTPS enabled
- ✅ JWT_SECRET is strong
- ✅ CORS properly configured
- ✅ Environment variables secured
- ✅ Database backups enabled
- ✅ API rate limiting active
- ✅ Input validation enabled
- ✅ CSRF protection (if needed)
- ✅ Dependencies updated
- ✅ Secrets not in code

## Post-Deployment Verification

1. **Frontend loads** - Visit your Vercel URL
2. **API responds** - Test `/health` endpoint
3. **Database connected** - Try login/signup
4. **AI works** - Send chat message
5. **Emails sent** - Check spam folder
6. **SSL valid** - Check browser URL bar
7. **Performance** - Check Lighthouse score

## Troubleshooting

### Frontend Issues
- Check Vercel logs: Dashboard → Deployments
- Verify env vars are set
- Clear browser cache
- Try incognito mode

### Backend Issues
- Check Render logs: Dashboard → Logs
- Verify Supabase connection
- Check API key permissions
- Review error messages

### Database Issues
- Check Supabase status: Status page
- Verify connection string
- Check user permissions
- Review backup logs

## Emergency Recovery

### Quick Rollback
```bash
# Frontend (Vercel)
Dashboard → Deployments → Select previous version → Redeploy

# Backend (Render)
Dashboard → Events → Select previous deployment → Redeploy
```

### Database Recovery
1. Go to Supabase → Backups
2. Select restore point
3. Click restore
4. Verify data integrity

## Costs

### Vercel (Frontend)
- Free tier: Perfect for small projects
- Hobby: $20/month
- Production: Pay as you go ($0.50/GB)

### Render (Backend)
- Free: $0 (note: auto-spins down)
- Starter: $7/month
- Standard: $12/month+

### Supabase (Database)
- Free: 2GB storage
- Pro: $25/month (4GB storage, backups)
- Team: $99/month

## Support & Documentation

- Vercel Docs: https://vercel.com/docs
- Render Docs: https://render.com/docs
- Supabase Docs: https://supabase.com/docs
- GitHub Issues: Your repo issues page

---

For questions, refer to individual platform documentation or open an issue.
