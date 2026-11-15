// lib/posts-api.js
// CRUD helpers for the browser (used by Client Components).
// JSONPlaceholder accepts every request but does not save anything:
// POST always answers with id 101 and changes are never persisted.
import api from './axios'

// READ    GET    /posts?_limit=5
export async function getPosts(params = {}) {
  const { data } = await api.get('/posts', { params })
  return data
}

// CREATE  POST   /posts
export async function createPost(post) {
  const { data } = await api.post('/posts', post)
  return data
}

// UPDATE  PUT    /posts/:id   (replaces the whole post)
export async function updatePost(id, post) {
  const { data } = await api.put(`/posts/${id}`, post)
  return data
}

// UPDATE  PATCH  /posts/:id   (changes only the fields you send)
export async function patchPost(id, fields) {
  const { data } = await api.patch(`/posts/${id}`, fields)
  return data
}

// DELETE  DELETE /posts/:id
export async function deletePost(id) {
  await api.delete(`/posts/${id}`)
}
