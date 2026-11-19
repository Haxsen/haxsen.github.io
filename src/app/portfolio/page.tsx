import type { Metadata } from 'next'
import Link from 'next/link'
import Redirect from '@/components/Redirect'

// The portfolio used to live here. Old links and CVs still point at /portfolio, so send them home.
export const metadata: Metadata = {
  title: 'Moved',
  robots: { index: false, follow: true },
  alternates: { canonical: '/' },
}

export default function Portfolio() {
  return (
    <main className="page pb-24 pt-32">
      <meta httpEquiv="refresh" content="0; url=/" />
      <Redirect to="/" />
      <p className="text-ink2">
        This page has moved to{' '}
        <Link href="/" className="link">
          haxsen.github.io
        </Link>
        .
      </p>
    </main>
  )
}
