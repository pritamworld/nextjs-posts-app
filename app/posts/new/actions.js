'use server'
// app/posts/new/actions.js
// A Server Action: a function that runs on the server but can be
// called straight from a <form> in the browser. No API route needed.
import { updateTag } from 'next/cache'
import api from '@/lib/axios'

export async function createPostAction(previousState, formData) {
  const title = String(formData.get('title') ?? '').trim()
  const body = String(formData.get('body') ?? '').trim()

  // Validate on the server: never trust the browser
  if (title.length < 3) {
    return { ok: false, error: 'Title must be at least 3 characters.', title, body }
  }
  if (body.length === 0) {
    return { ok: false, error: 'Body is required.', title, body }
  }

  const { data } = await api.post('/posts', { title, body, userId: 1 })

  // Expire the cached post list so the next visit to /posts refetches it.
  // (JSONPlaceholder does not really store the post, so the list won't change.)
  updateTag('posts')

  return { ok: true, message: `Created on the server with id ${data.id}`, post: data }
}
