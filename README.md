# Muslim Match

Muslim Match is a halal-first marriage platform for meeting compatible partners in a respectful, faith-centered environment.

## Features

- Secure registration and login with Supabase Auth
- Detailed profiles and preference management
- Match recommendations based on values and preferences
- Private messaging between matches
- Community events and event registration
- Prayer-time information
- Progressive Web App (PWA) install support

## Tech Stack

- [Next.js](https://nextjs.org/) 16 with the App Router
- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/) for authentication and data
- [Zod](https://zod.dev/) for validation

## Getting Started

### Prerequisites

- Node.js 20 or newer
- A Supabase project

### Installation

1. Install dependencies:

	```bash
	npm install
	```

2. Create `.env.local` in the project root:

	```env
	NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
	NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
	SUPABASE_SECRET_KEY=your_supabase_secret_key
	```

	Find these values in your Supabase project under **Project Settings > API**. Never commit real credentials.

3. Apply the database schema from [`supabase/schema.sql`](supabase/schema.sql) in the Supabase SQL Editor.

4. Start the development server:

	```bash
	npm run dev
	```

5. Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |

## Production

```bash
npm run build
npm run start
```

The application requires the same Supabase environment variables at runtime.

## Project Structure

```text
app/          Pages and API route handlers
components/   Reusable React components
lib/          Authentication, matching, prayer, and validation helpers
public/       Static assets and PWA manifest
supabase/     Database schema
```

## Status

Muslim Match is under active development. Contributions, feedback, and thoughtful product suggestions are welcome.