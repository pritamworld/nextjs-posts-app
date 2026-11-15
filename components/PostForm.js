'use client'
// components/PostForm.js  (Client Component)
// A controlled form: React state holds every input value.
// Props: initialValues, onSubmit, onCancel, submitLabel.
import { useState } from 'react'

export default function PostForm({
  initialValues = { title: '', body: '' },
  onSubmit,
  onCancel,
  submitLabel = 'Save',
}) {
  const [values, setValues] = useState(initialValues)
  const [saving, setSaving] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setValues((previous) => ({ ...previous, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (!values.title.trim()) return
    setSaving(true)
    await onSubmit(values) // the parent decides what "save" means
    setSaving(false)
    setValues({ title: '', body: '' })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 rounded-lg border border-slate-200 p-4 dark:border-slate-800">
      <input
        name="title"
        value={values.title}
        onChange={handleChange}
        placeholder="Title"
        className="rounded-md border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900"
      />
      <textarea
        name="body"
        value={values.body}
        onChange={handleChange}
        placeholder="Body"
        rows={3}
        className="rounded-md border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900"
      />
      <div className="flex gap-2">
        <button disabled={saving} className="rounded-md bg-blue-600 px-4 py-2 text-white disabled:opacity-50">
          {saving ? 'Saving…' : submitLabel}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="rounded-md border px-4 py-2">
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
