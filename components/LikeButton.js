'use client'
// components/LikeButton.js  (Client Component)
// A small interactive "island" inside a server-rendered card.
import { useState } from 'react'

export default function LikeButton({ postId }) {
  const [likes, setLikes] = useState(0)

  return (
    <button
      onClick={() => setLikes(likes + 1)}
      aria-label={`Like post ${postId}`}
      className="rounded-full bg-pink-50 px-3 py-1 text-sm text-pink-700 dark:bg-pink-950 dark:text-pink-300"
    >
      ♥ {likes}
    </button>
  )
}
