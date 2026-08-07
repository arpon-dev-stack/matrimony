# Metrimony

Metrimony is a modern matrimonial web application built with Next.js, React, TypeScript, and Tailwind CSS. It provides a polished experience for discovering profiles, signing in, managing a personal profile, and uploading photos.

The app is branded around the EternalUnion experience and combines a marketing landing page with authenticated user flows for profile discovery and editing.

## Features

- Landing page with featured profiles and success stories
- Profile search and filtering based on location, age, religion, education, and interests
- Secure sign-in and sign-up experience
- Protected user dashboard and profile management
- Profile photo and gallery uploads with Cloudinary
- Supabase-backed user data and token-based authentication flow

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Supabase
- Cloudinary / UploadThing
- JWT-based authentication helpers

## Project Structure

- app/ - route groups, pages, and server actions
- components/ - reusable UI components such as navbar, sidebar, profile cards, and auth forms
- actions/ - server actions for authentication and profile updates
- lib/ - shared helpers for auth, tokens, Supabase, profiles, and uploads
- types/ - TypeScript definitions for auth and related data

## Prerequisites

Make sure you have the following installed:

- Node.js 20+
- pnpm

## Installation

1. Clone the repository
2. Install dependencies

```bash
pnpm install
```

3. Create a local environment file

```bash
cp .env.example .env.local
```

If you already have a local .env file, update it with the needed values.

## Environment Variables

The application expects the following environment variables:

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
JWT_SECRET= # optional fallback for local auth helpers
```

> Keep secrets out of version control. Use a local .env file for development.

## Running the App

Start the development server:

```bash
pnpm dev
```

Open http://localhost:3000 in your browser.

## Available Scripts

```bash
pnpm dev      # start development server
pnpm build    # create production build
pnpm start    # run production build locally
pnpm lint     # run ESLint checks
```

## Main User Flows

### Public Experience

- Browse the home page
- Explore featured profiles and success stories
- Search for compatible matches

### Authenticated Experience

- Sign in or sign up
- View and manage your own profile
- Update personal details, interests, and images

## Deployment

This project is ready to be deployed on Vercel or any platform that supports Next.js. Make sure all environment variables are configured in the deployment environment.

## Notes

- The app uses route groups under app/ for separate public and authenticated sections.
- Image uploads are handled through Cloudinary and UploadThing-based integrations.
- Profile filtering is implemented server-side through the Supabase-backed profile helper.
