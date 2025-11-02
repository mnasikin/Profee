# Welcome to Profee

Profee is a full-stack portfolio starter built with Next.js 15 (App Router), TypeScript, and Tailwind + shadcn/ui on the front-end, backed by Prisma and SQLite. It comes with REST-style API routes, fallback seeding, optional SMTP email notifications, and easy theming through `.env`. Use it to publish experience, projects, and skills while keeping everything in sync between JSON fallback data and the database.

## What's included
- Next.js 15 (App Router) + TypeScript for a modern developer experience
- Tailwind CSS + shadcn/ui components with environment-driven theming
- Prisma ORM + SQLite storage seeded from `src/lib/fallback-data.ts`
- REST APIs for personal info, experience, projects, skills, and contact
- Contact form ready to send email notifications via SMTP
- Server entry ready for WebSocket integrations and future realtime features

## Why build on Profee?
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

# set up the SQLite database
npm run db:push

# (optional) seed with fallback content
npm run postbuild

# run the dev server
npm run dev

# build for production
npm run build

# start production server
npm start
```

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
1. Clone the repo and update `.env` plus fallback data.
2. Run `npm run db:push` and `npm run postbuild` to initialize the SQLite database.
3. Start building with `npm run dev` and deploy when you’re ready.

Built for developers who want to ship a polished portfolio fast.
