import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'

const sans = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' })

const description =
  'Hassān Ali, Web3 DevSecOps engineer. I secure the CI/CD pipelines, signing keys and Ethereum node infrastructure that DeFi protocols run on: Slither, Mythril, Foundry, Terraform, AWS KMS, OPA and Kubernetes.'

export const metadata: Metadata = {
  metadataBase: new URL('https://haxsen.github.io'),
  title: {
    default: 'Hassān Ali · Web3 DevSecOps Engineer',
    template: '%s · Hassān Ali',
  },
  description,
  authors: [{ name: 'Hassān Ali', url: 'https://haxsen.github.io' }],
  keywords: [
    'Web3 DevSecOps',
    'DevSecOps engineer',
    'smart contract security',
    'Slither',
    'Mythril',
    'Foundry',
    'Terraform',
    'AWS KMS',
    'Ethereum node infrastructure',
    'Kubernetes',
    'site reliability engineer',
  ],
  openGraph: {
    type: 'website',
    siteName: 'Hassān Ali',
    title: 'Hassān Ali · Web3 DevSecOps Engineer',
    description,
    url: '/',
  },
  twitter: {
    card: 'summary',
    title: 'Hassān Ali · Web3 DevSecOps Engineer',
    description,
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0d12',
  colorScheme: 'dark',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="min-h-screen font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-ink"
        >
          Skip to content
        </a>
        <SiteNav />
        <div id="main">{children}</div>
        <SiteFooter />
      </body>
    </html>
  )
}
