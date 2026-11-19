import Link from 'next/link'
import { PERSON } from '@/data/profile'
import { DownloadIcon } from './Icons'

const LINKS = [
  { href: '/#work', label: 'Security work' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#products', label: 'Products' },
  { href: '/#contact', label: 'Contact' },
]

export default function SiteNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/80 bg-bg/80 backdrop-blur-md">
      <nav className="page flex h-16 items-center justify-between gap-4" aria-label="Main">
        <Link href="/" className="flex items-center gap-2 font-mono text-sm font-semibold tracking-tight text-ink">
          <span className="inline-block h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
          haxsen
        </Link>
        <div className="flex items-center gap-1 sm:gap-2">
          <ul className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="rounded-md px-3 py-2 text-sm text-ink2 transition-colors hover:text-ink">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/hxquant" className="rounded-md px-2.5 py-2 text-sm text-ink2 transition-colors hover:text-ink md:hidden">
            hxQuant
          </Link>
          <Link href="/hxslst" className="rounded-md px-2.5 py-2 text-sm text-ink2 transition-colors hover:text-ink md:hidden">
            hxSLST
          </Link>
          <a
            href={PERSON.cvPdf}
            download
            className="ml-1 inline-flex items-center gap-1.5 rounded-md border border-line px-3 py-1.5 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
          >
            <DownloadIcon className="h-3.5 w-3.5" />
            CV
          </a>
        </div>
      </nav>
    </header>
  )
}
