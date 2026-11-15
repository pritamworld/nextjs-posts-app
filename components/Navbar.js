// components/Navbar.js  (Server Component)
// Plain links render on the server; only ThemeToggle ships JavaScript.
import Link from 'next/link'
import ThemeToggle from './ThemeToggle'

const links = [
  { href: '/', label: 'Home' },
  { href: '/posts', label: 'Posts' },
  { href: '/posts/new', label: 'New post' },
  { href: '/manage', label: 'Manage (CRUD)' },
  { href: '/users', label: 'Users' },
]

export default function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <nav className="mx-auto flex max-w-5xl items-center gap-6 px-6 py-4">
        <Link href="/" className="text-lg font-bold">
          PostsApp
        </Link>
        <ul className="flex flex-1 gap-4 text-sm">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="hover:text-blue-600">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <ThemeToggle />
      </nav>
    </header>
  )
}
