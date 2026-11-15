'use client'
// app/posts/error.js
// Error boundary for /posts and every route below it.
// Must be a Client Component.
export default function PostsError({ error, reset }) {
  return (
    <div className="rounded-lg border border-red-300 bg-red-50 p-6 text-red-800">
      <h2 className="font-semibold">Could not load posts</h2>
      <p className="text-sm">{error.message}</p>
      <button onClick={() => reset()} className="mt-3 underline">
        Try again
      </button>
    </div>
  )
}
