## LinkVault

LinkVault is een simpele bookmark manager.

### Features
- Bookmarks toevoegen (URL + titel + tags)
- Bookmarks weergeven in een lijst
- Filteren op tags
- Bookmarks verwijderen
- Bookmarks wijzigen
- In-memory opslag (geen database)

### Belangrijk: in-memory opslag
Bookmarks worden **in server memory** bewaard (module-level singleton). Dat betekent:
- Data kan verdwijnen bij **server restart** of **redeploy**
- Bij serverless/scale-out kan data per instance verschillen

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

De app gebruikt de App Router onder `src/app/`. Startpunt: `src/app/page.tsx`.

### Gebruik
- Lijst: `http://localhost:3000/bookmarks`
- Nieuwe bookmark: `http://localhost:3000/bookmarks/new`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
