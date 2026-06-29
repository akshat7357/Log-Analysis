# Quick Start Guide

Get the application running with dummy data in under 1 minute!

## 🚀 One-Command Start

```bash
npm run dev
```

That's it! Open [http://localhost:3000](http://localhost:3000) in your browser.

## ✅ What You'll See

The dashboard will load with:
- **4 KPI Cards** showing metrics like Total Users (1.24M), Active Sessions (45K), etc.
- **Service Health Section** displaying 4 services with status indicators
- **Chart Placeholders** for future visualizations

All data is automatically loaded from the built-in dummy data service.

## 🎯 First Time Setup

If this is your first time running the project:

```bash
# 1. Install dependencies (one time only)
npm install

# 2. Start the development server
npm run dev

# 3. Open in browser
# Navigate to http://localhost:3000
```

## 🔧 Configuration

### Using Mock Data (Default - Already Configured)

The `.env.local` file is already set up for you:

```env
NEXT_PUBLIC_USE_MOCK_DATA=true
NEXT_PUBLIC_API_BASE_URL=http://localhost:5173/api
```

**No changes needed!** Just run `npm run dev`.

### Switch to Real API

If you want to connect to your backend API:

1. **Edit `.env.local`:**
   ```env
   NEXT_PUBLIC_USE_MOCK_DATA=false
   NEXT_PUBLIC_API_BASE_URL=http://your-api-url/api
   ```

2. **Make sure your backend is running**

3. **Restart the dev server:**
   ```bash
   # Stop the current server (Ctrl+C)
   npm run dev
   ```

## 📊 Available Mock Data

### Dashboard KPIs
- Total Users: 1,240,000 (+12.5%)
- Active Sessions: 45,280 (+8.2%)
- API Requests: 8,920,000 (-3.1%)
- Revenue: $392,000 (+15.8%)

### Service Health
- Monthly API-12: 100% healthy
- Payment Gateway: 100% healthy
- User Support: 100% healthy
- Link Aggregator: 100% healthy

### Additional Data
- Line chart data (6 time points)
- Bar chart data (4 service categories)
- Pie chart data (4 status types)
- 50 table rows with pagination/search/sort

## 🧪 Verify It's Working

### Browser Console Check

Open Developer Tools (F12) → Console. You should see:

```
[API Request] GET /dashboard/cards
[API Response] /dashboard/cards [Array(4)]
```

This confirms the mock data service is working.

### Visual Check

The dashboard should display:
- ✅ 4 KPI cards with numbers and trends
- ✅ "Enterprise Overview" heading
- ✅ Service Health section with 4 services
- ✅ No loading spinners (or brief spinner then data)
- ✅ No error messages

## 📖 Next Steps

### Learn More

- **[DUMMY_DATA_GUIDE.md](./DUMMY_DATA_GUIDE.md)** - Full guide to mock data
- **[API_INTEGRATION.md](./API_INTEGRATION.md)** - API integration details
- **[README.md](./README.md)** - Project overview

### Customize Mock Data

Edit `src/services/mock-data.service.ts` to:
- Add more KPI cards
- Modify chart data
- Change table content
- Adjust API delays

### Build for Production

```bash
npm run build
npm start
```

## ❓ Troubleshooting

### Port Already in Use

If port 3000 is busy:

```bash
# Use a different port
PORT=3001 npm run dev
```

### Data Not Loading

1. Check `.env.local` has `NEXT_PUBLIC_USE_MOCK_DATA=true`
2. Restart dev server (Ctrl+C, then `npm run dev`)
3. Clear browser cache (Ctrl+Shift+R)

### Build Errors

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm run dev
```

## 🎉 You're All Set!

The application is now running with comprehensive dummy data. No backend required!

**Happy coding!** 🚀
