// app/page.js  →  route "/"  (Server Component)
// Runs only on the server. Its HTML is prerendered because the data
// functions it calls are cached with 'use cache'.
import Link from 'next/link'
import { getPosts, getUsers } from '@/lib/data'

export default async function HomePage() {
  // Fetch in parallel, not one after the other
  const [posts, users] = await Promise.all([getPosts(), getUsers()])

  const stats = [
    { label: 'Posts', value: posts.length },
    { label: 'Users', value: users.length },
    { label: 'Avg posts per user', value: posts.length / users.length },
  ]

  return (
    <section className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold">React + Next.js 16 Posts App</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Data from JSONPlaceholder, rendered on the server.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
          >
            <p className="text-sm text-slate-500">{stat.label}</p>
            <p className="text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      <Link
        href="/posts"
        className="w-fit rounded-md bg-blue-600 px-4 py-2 text-white"
      >
        Browse posts
      </Link>
    </section>
  )
}
