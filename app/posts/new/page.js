// app/posts/new/page.js  →  route "/posts/new"  (Server Component)
// A static segment ("new") wins over the dynamic one ("[id]").
import NewPostForm from './NewPostForm'

export const metadata = { title: 'New post' }

export default function NewPostPage() {
  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">New post (Server Action)</h1>
      <NewPostForm />
    </section>
  )
}
