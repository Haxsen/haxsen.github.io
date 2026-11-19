import Link from 'next/link'
import { PERSON } from '@/data/profile'
import { GitHubIcon, LinkedInIcon, MailIcon, TelegramIcon } from './Icons'

export default function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="page flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm text-ink">
            {PERSON.name} · {PERSON.title}
          </p>
          <p className="text-xs text-muted">
            Static site built with Next.js and deployed to GitHub Pages by GitHub Actions.{' '}
            <Link href="/hxquant" className="hover:text-ink2">
              hxQuant
            </Link>{' '}
            ·{' '}
            <Link href="/hxslst" className="hover:text-ink2">
              hxSLST
            </Link>
          </p>
        </div>
        <ul className="flex items-center gap-2">
          {[
            { href: `mailto:${PERSON.email}`, label: 'Email', Icon: MailIcon },
            { href: PERSON.github, label: 'GitHub', Icon: GitHubIcon },
            { href: PERSON.linkedin, label: 'LinkedIn', Icon: LinkedInIcon },
            { href: PERSON.telegram, label: 'Telegram', Icon: TelegramIcon },
          ].map(({ href, label, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-md border border-line text-ink2 transition-colors hover:border-ink2 hover:text-ink"
                aria-label={label}
              >
                <Icon />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
