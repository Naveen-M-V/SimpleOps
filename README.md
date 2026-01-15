# SimpleOps

A Next.js 14 application with Supabase authentication, built with App Router and Tailwind CSS.

## Features

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS for styling
- Supabase authentication
- Protected routes
- Login and Dashboard pages

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase account and project

### Installation

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

Copy `.env.example` to `.env.local` and update with your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
├── app/
│   ├── dashboard/
│   │   └── page.tsx
│   ├── login/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── LogoutButton.tsx
├── utils/
│   └── supabase/
│       ├── client.ts
│       ├── server.ts
│       └── middleware.ts
└── middleware.ts
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key from Settings > API
3. Update your `.env.local` file with these credentials

## Authentication

The app includes:
- Email/password authentication
- Protected dashboard route
- Automatic session management
- Logout functionality

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
