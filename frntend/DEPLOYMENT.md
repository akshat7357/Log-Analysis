# Deployment Guide

## Vercel Deployment Fix

### Problem
The dashboard cards and graphs were not loading on Vercel with the error "Failed to fetch dashboard cards".

### Root Cause
1. The app was configured to use `http://localhost:5173/api` which doesn't work on Vercel
2. Mock data flag (`NEXT_PUBLIC_USE_MOCK_DATA`) was not properly configured
3. No backend API routes existed in the Next.js app

### Solution
Created Next.js API routes to serve data directly from the same app:

- `/api/dashboard/cards` - KPI cards data
- `/api/dashboard/charts` - Chart data (line, bar, pie)
- `/api/dashboard/table` - Table data with pagination
- `/api/logs/[id]` - Log details

### Environment Variables

For **Vercel deployment**, set these environment variables in your Vercel project:

```bash
NEXT_PUBLIC_API_BASE_URL=/api
NEXT_PUBLIC_USE_MOCK_DATA=false
```

### How to Deploy

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Add Next.js API routes for Vercel deployment"
   git push
   ```

2. **Vercel will auto-deploy** (if connected)
   - Or manually redeploy from Vercel dashboard

3. **Verify Environment Variables** in Vercel:
   - Go to Project Settings > Environment Variables
   - Ensure `NEXT_PUBLIC_USE_MOCK_DATA=false`
   - Ensure `NEXT_PUBLIC_API_BASE_URL=/api`

### Local Development

The `.env.local` file has been updated:

```env
NEXT_PUBLIC_API_BASE_URL=/api
NEXT_PUBLIC_USE_MOCK_DATA=false
```

To test locally:
```bash
cd frntend
npm run dev
```

Visit http://localhost:3000 - the dashboard should load with data.

### Architecture

```
Frontend (Next.js) → Next.js API Routes → Mock Data
```

The API routes are serverless functions that run on Vercel's edge network, so they work perfectly in production.

### Future: Connect to Real Backend

When you have a real backend API:

1. Set `NEXT_PUBLIC_API_BASE_URL` to your backend URL in Vercel
2. The axios config will automatically use that URL instead of `/api`
3. Remove or modify the Next.js API routes as needed
