# Welcome to Profee

[![Preview](https://img.shields.io/badge/preview-000?style=for-the-badge&logo=download&logoColor=white)](https://nasikin.web.id)

Profee is a full-stack portfolio starter built with Next.js 15 (App Router), TypeScript, and Tailwind + shadcn/ui on the front-end, backed by Prisma and SQLite. It features a hybrid data system that automatically falls back to static data when the database is unavailable, making it perfect for quick deployments and development. Includes REST-style API routes, optional SMTP email notifications, and easy theming through `.env`.

## What's included
- Next.js 15 (App Router) + TypeScript for a modern developer experience
- Tailwind CSS + shadcn/ui components with environment-driven theming
- Hybrid data system: automatic fallback to static data when database unavailable
- Prisma ORM + SQLite storage seeded from `src/lib/fallback-data.ts`
- REST APIs for personal info, experience, projects, skills, and contact
- Contact form ready to send email notifications via SMTP
- Server entry ready for WebSocket integrations and future realtime features

## Why Profee?
- Zero setup required: works immediately with fallback data, no database needed
- Production resilient: graceful degradation if database issues occur
- Easy to personalize: update fallback data and `.env` to make it yours
- Flexible theming: toggle light/dark mode and colors via environment variables
- Database ready: run `npm run db:push` and `npm run postbuild` to seed SQLite
- Production friendly: Next.js best practices with a clean, modular codebase

## Tech highlights
- Next.js 15, TypeScript 5
- Tailwind CSS 4, shadcn/ui component suite
- Prisma + SQLite, optional NextAuth integration
- TanStack Query & Zustand for data/state management
- React Hook Form + Zod validation

## Installation
```bash
git clone https://github.com/mnasikin/Profee profee
cd profee
```

## Quick start
```bash
# install dependencies
npm install

# run immediately with fallback data (no database needed!)
npm run dev

# OR set up SQLite database (optional)
npm run db:generate
npm run db:push
npm run postbuild    # seed with fallback content

# build for production
npm run build

# start production server
npm start
```

## Hybrid data system
Profee features an intelligent hybrid data system that automatically handles database unavailability:

**How it works:**
- If SQLite database is available → uses database (full CRUD operations)
- If database is unavailable → automatically uses data from `src/lib/fallback-data.ts` (read-only)

**Benefits:**
- Instant start: Clone and run without database setup
- Zero downtime: Website stays functional even if database fails
- Developer friendly: No database required for initial development
- Production ready: Graceful degradation in production environments

**Logging:**
- Development mode: Shows detailed logs and warnings
- Production mode: Silent operation, no console output

## Customize fallback data
The build step seeds SQLite using the fallback content in `src/lib/fallback-data.ts`. Update those arrays before `npm run build` so production matches your data. During development you can reseed any time:
```bash
npm run db:push
npm run postbuild    # or send GET /api/init-db
```

## Contact form email notifications
Configure SMTP in `.env` to send notifications when someone submits the contact form:
```env
CONTACT_EMAIL_RECIPIENT=owner@example.com
SMTP_HOST=smtp.yourprovider.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey_or_username
SMTP_PASSWORD=super-secret
```

## Project structure
```
src/
├─ app/                 # Next.js App Router pages
├─ components/          # Reusable React components
│  └─ ui/               # shadcn/ui components
├─ hooks/              # Custom React hooks
└─ lib/                # Utility functions and configurations
```

## Core feature checklist
### UI components
- Layout primitives: Card, Separator, Aspect Ratio, Resizable Panels
- Form inputs: Input, Textarea, Select, Checkbox, Radio Group, Switch
- Feedback: Alert, Toast (Sonner), Progress, Skeleton
- Navigation overlays: Breadcrumb, Menubar, Navigation Menu, Pagination
- Dialogs and drawers: Dialog, Sheet, Popover, Tooltip, Hover Card
- Data display: Badge, Avatar, Calendar

### Data and interactivity
- Sortable tables with TanStack Table
- Charts via Recharts
- Drag and drop powered by DND Kit
- Smooth animations via Framer Motion
- Theme switching ready to go

### Backend integration
- Hybrid data system with automatic fallback to static data
- Prisma ORM + SQLite database seeded from fallback JSON
- REST APIs for personal info, experience, projects, skills, contact
- Optional NextAuth.js integration (hooks ready)
- Axios + TanStack Query for client data fetching
- Zustand for lightweight client state

### Production ready toolbox
- Internationalization via Next Intl
- Image processing with Sharp
- End-to-end type safety with TypeScript + Zod
- Utility hooks from ReactUse

## Next steps
1. Clone the repo and run `npm install`
2. Start immediately with `npm run dev` (uses fallback data)
3. (Optional) Set up database with `npm run db:push && npm run postbuild`
4. Customize `.env` and `src/lib/fallback-data.ts` to make it yours
5. Deploy when you're ready!

Built for developers who want to ship a polished portfolio fast.
