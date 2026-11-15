// app/not-found.js
// Shown for unknown URLs and whenever a page calls notFound().
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl font-bold">404 · Page not found</h1>
      <Link href="/posts" className="text-blue-600">
        Back to posts
      </Link>
    </div>
  )
}
