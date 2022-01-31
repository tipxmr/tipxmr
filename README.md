This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

1. npm install
2. npx prisma generate
3. npm run migrate -- dev
4. npm run seed
5. npm run dev

### Redux

UseSelector to get stuff (read)
UseDispatch for actions (update)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Things to do

### Alex

- [x] Header
- [ ] Navigation
  - [ ] Sidebar when click in the navigation
- [ ] sign up Page
- [ ] Sign in Page

### Grischi

### Jonas

### Funktionsbloecke (Milestones)

- Login (DB + Frontend)
  - DB look up on Truncated hash
    - return streamer Object
    - jwt? + refresh token
  - Next steps:
    - Invalid tokens behavior
    - Iron-session
- Wallet Sync
- logic for workflow
  - request subaddress
  - generate sub address
  - subaddress to donator
  - msg to streamer
  - display the animation
- UI elements
  - Dashboard
  - Donation Mask
- Security concers
  - protection against bots
    - PoW?
  - one step of removal for requesting subaddress
- Animation
