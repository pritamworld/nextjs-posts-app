'use client'
// app/posts/new/NewPostForm.js  (Client Component)
// useActionState (React 19) wires a form to a Server Action and gives us
// the action's last result plus a pending flag.
import { useActionState } from 'react'
import { createPostAction } from './actions'

const initialState = { ok: false, error: '', title: '', body: '' }

export default function NewPostForm() {
  const [state, formAction, isPending] = useActionState(createPostAction, initialState)

  return (
    <form action={formAction} className="flex max-w-xl flex-col gap-4">
      <label className="flex flex-col gap-1">
        Title
        <input
          name="title"
          defaultValue={state.title}
          className="rounded-md border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900"
        />
      </label>
      <label className="flex flex-col gap-1">
        Body
        <textarea
          name="body"
          rows={4}
          defaultValue={state.body}
          className="rounded-md border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900"
        />
      </label>

      {state.error && <p role="alert" className="text-red-600">{state.error}</p>}
      {state.ok && (
        <pre className="rounded-md bg-green-50 p-3 text-sm text-green-800">
          {state.message}
          {'\n'}
          {JSON.stringify(state.post, null, 2)}
        </pre>
      )}

      <button
        disabled={isPending}
        className="w-fit rounded-md bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
      >
        {isPending ? 'Saving…' : 'Create post'}
      </button>
    </form>
  )
}
