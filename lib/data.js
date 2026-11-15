// lib/data.js
// Data functions for Server Components only.
// Cache Components is on by default in Next.js 16, so data must either be
// cached with 'use cache' or read inside a <Suspense> boundary.
import { cacheLife, cacheTag } from 'next/cache'
import api from './axios'

// Cached: prerendered into the static shell, refreshed every hour.
export async function getPosts() {
  'use cache'
  cacheLife('hours')
  cacheTag('posts')
  const { data } = await api.get('/posts')
  return data
}

export async function getPost(id) {
  'use cache'
  cacheLife('hours')
  cacheTag('posts', `post-${id}`)
  try {
    const { data } = await api.get(`/posts/${id}`)
    return data
  } catch (error) {
    if (error.response?.status === 404) return null
    throw error
  }
}

export async function getUsers() {
  'use cache'
  cacheLife('days')
  const { data } = await api.get('/users')
  return data
}

export async function getUser(id) {
  'use cache'
  cacheLife('days')
  const { data } = await api.get(`/users/${id}`)
  return data
}

// NOT cached: read fresh on every request.
// Any component that awaits this must sit inside <Suspense>.
export async function getComments(postId) {
  const { data } = await api.get(`/posts/${postId}/comments`)
  return data
}
