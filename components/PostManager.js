'use client'
// components/PostManager.js  (Client Component)
// Full CRUD from the browser with axios + React state.
// JSONPlaceholder fakes writes, so we update local state with each response.
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getPosts, createPost, updatePost, deletePost } from '@/lib/posts-api'
import PostForm from './PostForm'

// Posts we create get a local id above 100; the server has never heard of them.
const isLocalOnly = (post) => post.id > 100

export default function PostManager() {
  const router = useRouter()
  const [posts, setPosts] = useState([])
  const [status, setStatus] = useState('loading') // 'loading' | 'ready' | 'error'
  const [editing, setEditing] = useState(null) // the post being edited, or null
  const [log, setLog] = useState('')

  // READ: load posts once, after the component first renders in the browser
  useEffect(() => {
    let ignore = false // ignore late responses if the component unmounts
    getPosts({ _limit: 5 })
      .then((data) => {
        if (!ignore) {
          setPosts(data)
          setStatus('ready')
        }
      })
      .catch(() => !ignore && setStatus('error'))
    return () => {
      ignore = true
    }
  }, [])

  // CREATE
  async function handleCreate(values) {
    const created = await createPost({ ...values, userId: 1 })
    setLog(`POST /posts → 201, id ${created.id}`)
    // the server always answers id 101, so give each new post its own id
    setPosts((prev) => [{ ...created, id: Date.now() }, ...prev])
  }

  // UPDATE
  async function handleUpdate(values) {
    const changed = { ...editing, ...values }
    if (!isLocalOnly(editing)) {
      const updated = await updatePost(editing.id, changed)
      setLog(`PUT /posts/${editing.id} → 200, title "${updated.title}"`)
    }
    setPosts((prev) => prev.map((p) => (p.id === editing.id ? changed : p)))
    setEditing(null)
  }

  // DELETE
  async function handleDelete(id) {
    if (!isLocalOnly({ id })) {
      await deletePost(id)
      setLog(`DELETE /posts/${id} → 200`)
    }
    setPosts((prev) => prev.filter((p) => p.id !== id))
  }

  if (status === 'loading') return <p>Loading posts…</p>
  if (status === 'error') return <p className="text-red-600">Could not load posts.</p>

  return (
    <div className="flex flex-col gap-6">
      {/* key: a new key gives a fresh form with new initial values */}
      <PostForm
        key={editing?.id ?? 'new'}
        initialValues={editing ? { title: editing.title, body: editing.body } : undefined}
        onSubmit={editing ? handleUpdate : handleCreate}
        onCancel={editing ? () => setEditing(null) : undefined}
        submitLabel={editing ? `Update post ${editing.id}` : 'Add post'}
      />

      {log && <p className="font-mono text-sm text-green-700 dark:text-green-400">{log}</p>}

      <ul className="flex flex-col gap-2">
        {posts.map((post) => (
          <li key={post.id} className="flex items-center gap-3 rounded-md border border-slate-200 p-3 dark:border-slate-800">
            <span className="w-14 text-xs text-slate-500">#{isLocalOnly(post) ? 'new' : post.id}</span>
            <span className="flex-1 truncate capitalize">{post.title}</span>
            {!isLocalOnly(post) && (
              <button onClick={() => router.push(`/posts/${post.id}`)} className="text-sm text-blue-600">
                View
              </button>
            )}
            <button onClick={() => setEditing(post)} className="text-sm text-amber-600">
              Edit
            </button>
            <button onClick={() => handleDelete(post.id)} className="text-sm text-red-600">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
