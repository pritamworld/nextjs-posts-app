# Posts App: React + Next.js 16 (JavaScript)

A teaching example that covers Server and Client Components, state, props,
`useEffect`, the Context API, axios CRUD against JSONPlaceholder, a Server
Action, and App Router navigation. Written for **Next.js 16.4** (latest stable,
November 2026) with the `create-next-app` recommended defaults, including
**Cache Components**.

## 1. Create the app

```bash
npx create-next-app@latest nextjs-posts-app --js --tailwind --eslint --app --use-npm
cd nextjs-posts-app
npm install axios
```

`--js` picks JavaScript (TypeScript is the default). App Router, Turbopack,
Cache Components and AGENTS.md are on by default.

## 2. Copy these files in

Copy the `app/`, `components/`, `context/` and `lib/` folders and
`next.config.mjs` from this folder over the generated project, replacing
`app/page.js`, `app/layout.js` and `app/globals.css`.

## 3. Run

```bash
npm run dev      # http://localhost:3000
npm run build    # production build, prints the route table
npm start        # serve the production build
```

## Routes

| URL            | File                          | Rendering                          |
| -------------- | ----------------------------- | ---------------------------------- |
| `/`            | `app/page.js`                 | Server, prerendered (`use cache`)  |
| `/posts`       | `app/posts/page.js`           | Server, prerendered (`use cache`)  |
| `/posts/[id]`  | `app/posts/[id]/page.js`      | Server; post cached, comments streamed in `<Suspense>` |
| `/posts/new`   | `app/posts/new/page.js`       | Server page + Server Action form   |
| `/manage`      | `app/manage/page.js`          | Server shell + client CRUD (axios) |
| `/users`       | `app/users/page.js`           | Client-side rendering (`useEffect`) |

## Folder structure

```
app/
  layout.js            root layout, ThemeProvider, Navbar
  page.js              home (server)
  globals.css          Tailwind + class-based dark mode
  not-found.js         404 page
  posts/
    page.js            post list (server)
    error.js           error boundary (client)
    [id]/page.js       post detail (server, generateStaticParams)
    [id]/Comments.js   streamed comments (server)
    new/page.js        new post page
    new/actions.js     Server Action ('use server')
    new/NewPostForm.js useActionState form (client)
  manage/page.js       CRUD page shell
  users/page.js        client-rendered users list
components/
  Navbar.js            server
  ThemeToggle.js       client (context)
  PostCard.js          server (props)
  LikeButton.js        client (state)
  PostForm.js          client (controlled form, props)
  PostManager.js       client (axios CRUD, useEffect, useRouter)
context/
  ThemeContext.js      createContext + Provider + useTheme hook
lib/
  axios.js             shared axios instance
  posts-api.js         CRUD helpers for the browser
  data.js              cached server data functions
next.config.mjs        cacheComponents: true
```

## About JSONPlaceholder

JSONPlaceholder accepts POST, PUT, PATCH and DELETE but **does not save
anything**. POST always returns `id: 101`. The app therefore updates React
state with each response so the UI behaves like a real CRUD app.
