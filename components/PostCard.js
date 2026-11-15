// components/PostCard.js  (Server Component)
// Receives data through props and passes a prop down to a Client Component.
import Link from 'next/link'
import LikeButton from './LikeButton'

export default function PostCard({ post }) {
  return (
    <article className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <p className="text-xs text-slate-500">Post #{post.id}</p>
      <h2 className="font-semibold capitalize">{post.title}</h2>
      <p className="line-clamp-2 text-sm text-slate-600 dark:text-slate-400">
        {post.body}
      </p>
      <div className="mt-auto flex items-center justify-between">
        <Link href={`/posts/${post.id}`} className="text-sm text-blue-600">
          Read more →
        </Link>
        <LikeButton postId={post.id} />
      </div>
    </article>
  )
}
