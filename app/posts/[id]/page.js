// app/posts/[id]/page.js  →  route "/posts/1", "/posts/2", …  (Server Component)
import { Suspense } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPost, getPosts, getUser } from '@/lib/data'
import Comments from './Comments'

// Prerender the first 10 posts at build time.
// Other ids (11–100) are rendered on their first request, then cached.
export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.slice(0, 10).map((post) => ({ id: String(post.id) }))
}

// Per-page <title>
export async function generateMetadata({ params }) {
  const { id } = await params
  const post = await getPost(id)
  return { title: post ? post.title : 'Post not found' }
}

export default async function PostPage({ params }) {
  const { id } = await params // params is a Promise in Next.js 15+
  const post = await getPost(id)
  if (!post) notFound() // shows app/not-found.js

  const author = await getUser(post.userId)

  return (
    <article className="flex flex-col gap-6">
      <Link href="/posts" className="text-sm text-blue-600">
        ← All posts
      </Link>
      <h1 className="text-3xl font-bold capitalize">{post.title}</h1>
      <p className="text-sm text-slate-500">
        By {author.name} · {author.email}
      </p>
      <p className="leading-relaxed">{post.body}</p>

      {/* Comments are NOT cached: they stream in on every request */}
      <Suspense fallback={<p className="text-slate-500">Loading comments…</p>}>
        <Comments postId={id} />
      </Suspense>
    </article>
  )
}
