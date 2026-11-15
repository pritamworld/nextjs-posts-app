'use client'
// app/users/page.js  →  route "/users"  (Client Component page)
// Client-side rendering: the server sends the "Loading…" shell, then the
// browser fetches users with axios inside useEffect.
import { useEffect, useState } from 'react'
import axios from 'axios'
import api from '@/lib/axios'

export default function UsersPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    api
      .get('/users', { signal: controller.signal })
      .then((response) => setUsers(response.data))
      .catch((err) => {
        if (!axios.isCancel(err)) setError(err.message)
      })
      .finally(() => !controller.signal.aborted && setLoading(false))

    // Cleanup: cancel the request if the user leaves the page
    return () => controller.abort()
  }, []) // [] = run once after the first render

  // Derived state: computed on every render, never stored
  const visible = users.filter((user) =>
    user.name.toLowerCase().includes(query.toLowerCase())
  )

  if (loading) return <p>Loading users…</p>
  if (error) return <p className="text-red-600">Error: {error}</p>

  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Users (client-side rendered)</h1>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name…"
        className="max-w-sm rounded-md border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900"
      />
      <p className="text-sm text-slate-500">
        {visible.length} of {users.length} users
      </p>
      <ul className="grid gap-3 sm:grid-cols-2">
        {visible.map((user) => (
          <li key={user.id} className="rounded-md border border-slate-200 p-4 dark:border-slate-800">
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-slate-500">
              {user.email} · {user.company.name}
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}
