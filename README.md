# This is still a work in progress

<p align="center">
	<h1 align="center"><b>Create z1</b></h1>
<p align="center">
    An open-source starter kit with Tanstack Start, Supabase, Tailwind and Bun.
    <br/>
    Based on <a href="https://v1.run">Midday's v1</a>.
    <br />
    <br />
    <!-- <a href="https://v1.run"><strong>Website</strong></a> · 
    <a href="https://github.com/midday-ai/v1/issues"><strong>Issues</strong></a> ·--> 
    <a href="#whats-included"><strong>What's included</strong></a> ·
    <a href="#prerequisites"><strong>Prerequisites</strong></a> ·
    <a href="#getting-started"><strong>Getting Started</strong></a> ·
  </p>
</p>

## What's included

[Tanstack Start](https://tanstack.com/start/) - Framework<br>
[Turborepo](https://turbo.build) - Build system<br>
[Biome](https://biomejs.dev) - Linter, formatter<br>
[TailwindCSS v4](https://tailwindcss.com/) - Styling<br>
[Tanstack Query](https://tanstack.com/query) - Data fetching<br>
[Shadcn](https://ui.shadcn.com/) - UI components<br>
[TypeScript](https://www.typescriptlang.org/) - Type safety<br>
[Supabase](https://supabase.com/) - Authentication, database, storage<br>
[React Email](https://react.email/) - Email templates <code>(coming soon)</code><br>
[Resend](https://resend.com/) - Email delivery <code>(coming soon)</code><br>
[Trigger.dev](https://trigger.dev/) - Background jobs <code>(coming soon)</code><br>

## Directory Structure

```
.
├── apps                         # App workspace
│    ├── api                     # Supabase (API, Auth, Storage, Realtime, Edge Functions)
│    ├── web                     # Your landing page
│    ├── app                     # Your app
│    └── ...
├── packages                     # Shared packages between apps
│    ├── email                   # React email library
│    ├── jobs                    # Trigger.dev background jobs
│    ├── logger                  # Logger library
│    ├── supabase                # Supabase - Queries, Mutations, Clients
│    └── ui                      # Shared UI components (Shadcn)
├── tooling                      # are the shared configuration that are used by the apps and packages
│    └── typescript              # Shared TypeScript configuration
├── .cursorrules                 # Cursor rules specific to this project
├── biome.json                   # Biome configuration
├── turbo.json                   # Turbo configuration
├── LICENSE
└── README.md
```

## Prerequisites

Bun<br>
Docker<br>
Supabase<br>

## Getting Started

Clone this repo locally with the following command:

```bash
bunx degit guidovizoso/z1 z1
```

1. Install dependencies using bun:

```sh
bun i
```

2. Copy `.env.example` to `.env` and update the variables.

```sh
# Copy .env.example to .env for each app
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
cp apps/app/.env.example apps/app/.env
```

4. Start the development server from either bun or turbo:

```ts
bun dev // starts everything in development mode (web, app, api, email)
bun dev:web // starts the website in development mode
bun dev:app // starts the app in development mode
bun dev:api // starts the api in development mode

// Database
bun sb:dev // starts the supabase database in development mode
bun sb:migrate // run migrations
bun sb:seed // run seed
bun sb:types // generate TS types
bun sb:reset // reset the database and apply migrations
```

## Caveats

### Tanstack Start

Tanstack Start is currently in beta and being a new project some best practices and patterns may change with time.
This is a good project to experiment with ways to use the framework so feel free to contribute.

### Installing a new Shadcn component

1. Install from Shadcn CLI

```bash
cd packages/ui
bunx --bun shadcn@canary add COMPONENT_NAME
```

2. Update the exports in `packages/ui/package.json`

```json
"exports": {
  "./COMPONENT_NAME": "./src/components/COMPONENT_NAME.tsx"
}
```

3. Update the imports in the components

```tsx
// Replace
import { cn } from "/lib/utils";

// With
import { cn } from "../lib/utils";
```
