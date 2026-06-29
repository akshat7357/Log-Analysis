# Formedics AI - Next.js

A modern enterprise analytics dashboard built with Next.js 15, featuring the Obsidian Flux Light design system.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **UI Library:** Material-UI v9
- **State Management:** Redux Toolkit
- **Styling:** Emotion + Tailwind CSS
- **Typography:** Inter font
- **Language:** TypeScript

## Design System - Obsidian Flux Light

This application implements a premium, high-clarity light mode aesthetic with:

- **Color Palette:** 
  - Primary: #0058c3 (Flux Blue)
  - Surface: #faf8ff (Off-white background)
  - Text: #131b2e (Deep Charcoal)
  
- **Typography:** Inter font family with systematic hierarchy
- **Layout:** Fluid 8px base grid system
- **Components:** Clean cards with subtle shadows and 8-16px border radius

## Getting Started

### Quick Start with Mock Data

The application comes with dummy data pre-configured, so you can start developing immediately without a backend:

\`\`\`bash
npm install
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

**The app will automatically use mock data for all API calls.**

### Using Real API

To connect to your backend API:

1. Edit `.env.local`:
   ```env
   NEXT_PUBLIC_USE_MOCK_DATA=false
   NEXT_PUBLIC_API_BASE_URL=http://your-api-url/api
   ```

2. Start your backend server

3. Restart the Next.js dev server

See [DUMMY_DATA_GUIDE.md](./DUMMY_DATA_GUIDE.md) for detailed instructions.

### Build

\`\`\`bash
npm run build
npm start
\`\`\`

## Features

- 📊 Real-time KPI metrics dashboard
- 📈 Interactive charts and visualizations
- 🎨 Modern, clean UI with Obsidian Flux Light design
- 📱 Fully responsive layout
- ⚡ Server-side rendering with Next.js
- 🔄 Redux state management
- 🎯 TypeScript for type safety
- 🎭 Mock data support for development without backend
- 🔌 Easy toggle between mock and real API

## Documentation

- **[API_INTEGRATION.md](./API_INTEGRATION.md)** - Complete API integration guide
- **[DUMMY_DATA_GUIDE.md](./DUMMY_DATA_GUIDE.md)** - How to use and customize mock data
- **[MIGRATION_SUMMARY.md](./MIGRATION_SUMMARY.md)** - Migration details from React/Vite

## Migration from React/Vite

This project was migrated from a React/Vite setup to Next.js 15 with improvements in routing, SSR, and design.

## Design Reference

The UI design is based on the "Obsidian Flux Light" design system from the provided reference.

## License

Private - Formedics AI
