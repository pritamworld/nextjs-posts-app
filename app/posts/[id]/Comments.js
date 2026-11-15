// app/posts/[id]/Comments.js  (async Server Component)
// Fetches fresh data per request; its parent wraps it in <Suspense>.
import { getComments } from '@/lib/data'

export default async function Comments({ postId }) {
  const comments = await getComments(postId)

  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-xl font-semibold">Comments ({comments.length})</h2>
      <ul className="flex flex-col gap-3">
        {comments.map((comment) => (
          <li
            key={comment.id}
            className="rounded-md border border-slate-200 p-4 dark:border-slate-800"
          >
            <p className="text-sm font-medium">{comment.email}</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {comment.body}
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}
