# Welcome to Profee

[![Preview](https://img.shields.io/badge/preview-000?style=for-the-badge&logo=download&logoColor=white)](https://nasikin.web.id)

Profee is a lightweight single-page portfolio starter built with Next.js (App Router), TypeScript, and Tailwind CSS. It features a hybrid data system that automatically falls back to static data when the database is unavailable, making it perfect for quick deployments and development. Includes REST-style API routes, optional SMTP email notifications, and easy theming through `.env`.

## What's included
- Next.js (App Router) + TypeScript for a modern developer experience
- Tailwind CSS with environment-driven theming
- Hybrid data system: automatic fallback to static data when database unavailable
- Prisma ORM + SQLite storage seeded from `src/lib/fallback-data.ts`
- REST APIs for personal info, experience, projects, skills, and contact
- Contact form ready to send email notifications via SMTP

## Why Profee?
- Zero setup required: works immediately with fallback data, no database needed
- Production resilient: graceful degradation if database issues occur
- Easy to personalize: update fallback data and `.env` to make it yours
- Flexible theming: toggle light/dark mode and colors via environment variables
- Database ready: run `npm run db:push` and `npm run postbuild` to seed SQLite
- Production friendly: Next.js best practices with a clean, modular codebase

## Tech highlights
- Next.js, TypeScript 5
- Tailwind CSS 4
- Prisma + SQLite
- Zero-dependency client state (React built-in hooks)

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
# seeds with fallback content
npm run db:push
npm run postbuild

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
│  └─ ui/               # Minimal UI components
├─ hooks/              # Custom React hooks
├─ lib/                # Utility functions and configurations
```

## Next steps
1. Clone the repo and run `npm install`
2. Start immediately with `npm run dev` (uses fallback data)
3. (Optional) Set up database with `npm run db:push && npm run postbuild`
4. Customize `.env` and `src/lib/fallback-data.ts` to make it yours
5. Deploy when you're ready!

Built for developers who want to ship a polished portfolio fast.
