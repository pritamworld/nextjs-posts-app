// app/manage/page.js  →  route "/manage"  (Server Component shell)
// The page itself renders on the server; the interactive CRUD table is a
// Client Component that calls the API from the browser with axios.
import PostManager from '@/components/PostManager'

export const metadata = { title: 'Manage posts' }

export default function ManagePage() {
  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Manage posts (client-side CRUD)</h1>
      <PostManager />
    </section>
  )
}
