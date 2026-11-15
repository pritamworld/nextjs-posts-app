// app/posts/page.js  →  route "/posts"  (Server Component)
import { getPosts } from '@/lib/data'
import PostCard from '@/components/PostCard'

export const metadata = { title: 'Posts' }

export default async function PostsPage() {
  const posts = await getPosts() // cached on the server
  const latest = posts.slice(0, 12)

  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Posts</h1>
      <p className="text-sm text-slate-500">
        Rendered on the server · showing {latest.length} of {posts.length}
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {latest.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  )
}
