import type { Metadata } from 'next'
import Link from 'next/link'
import {
  CAPABILITIES,
  EDUCATION,
  EXPERIENCE,
  HERO_STATS,
  LANGUAGES,
  OTHER_WORK,
  PERSON,
  PLATFORM,
  SECURITY_PROJECTS,
} from '@/data/profile'
import { ArrowIcon, CheckIcon, DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon, ShieldIcon, TelegramIcon } from '@/components/Icons'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

const GATE = [
  { stage: 'workflows', tool: 'actionlint · zizmor', result: '0 findings' },
  { stage: 'secrets', tool: 'trufflehog · gitleaks', result: '7/7 canaries caught' },
  { stage: 'slither', tool: '100+ detectors', result: '0 findings' },
  { stage: 'mythril', tool: 'symbolic execution', result: '0 issues' },
  { stage: 'foundry', tool: 'fuzz · invariants', result: '23/23 · 100% cov' },
  { stage: 'checkov', tool: 'terraform', result: '80 passed · 0 failed' },
  { stage: 'opa', tool: 'web3 rego policies', result: '23/23 tests' },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: PERSON.name,
  jobTitle: PERSON.title,
  url: PERSON.site,
  email: `mailto:${PERSON.email}`,
  sameAs: [PERSON.github, PERSON.linkedin, PERSON.telegram],
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'National University of Sciences and Technology' },
  knowsAbout: ['DevSecOps', 'Smart contract security', 'Terraform', 'AWS KMS', 'Kubernetes', 'Ethereum', 'CI/CD security'],
}

function SectionHead({ id, eyebrow, title, intro }: { id?: string; eyebrow: string; title: string; intro?: string }) {
  return (
    <div className="mb-10 max-w-3xl" id={id}>
      <p className="eyebrow mb-3">{eyebrow}</p>
      <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{title}</h2>
      {intro && <p className="mt-4 text-base leading-relaxed text-ink2 sm:text-lg">{intro}</p>}
    </div>
  )
}

export default function Home() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line pt-16">
        <div className="bg-grid-pattern pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" aria-hidden="true" />
        <div className="page relative grid gap-12 py-16 sm:py-24 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <div>
            <p className="eyebrow mb-5 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="inline-flex items-center gap-1.5 text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                Open to remote roles
              </span>
              <span>{PERSON.location}</span>
            </p>
            <h1 className="text-[2.6rem] font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl">
              {PERSON.name}
              <span className="mt-2 block text-ink2">{PERSON.title}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink sm:text-xl">
              I secure the pipelines, keys and nodes that move money on-chain.
            </p>
            <p className="mt-4 max-w-xl leading-relaxed text-ink2">
              6+ years building and running production infrastructure, most recently two years as an SRE at Puffer Finance, an
              EigenLayer liquid-restaking protocol. I build CI/CD security gates for smart contracts, keyless KMS-signed
              deployments, and hardened Ethereum node infrastructure on Terraform and Kubernetes.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={PERSON.cvPdf} download className="btn-primary">
                <DownloadIcon /> Download CV
              </a>
              <a href="#work" className="btn-ghost">
                See the security work <ArrowIcon />
              </a>
            </div>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink2">
              <li>
                <a href={PERSON.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-ink">
                  <GitHubIcon /> GitHub
                </a>
              </li>
              <li>
                <a href={PERSON.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-ink">
                  <LinkedInIcon /> LinkedIn
                </a>
              </li>
              <li>
                <a href={PERSON.telegram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-ink">
                  <TelegramIcon /> Telegram
                </a>
              </li>
              <li>
                <a href={`mailto:${PERSON.email}`} className="inline-flex items-center gap-1.5 hover:text-ink">
                  <MailIcon /> {PERSON.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Security gate terminal: real results from the pipeline repo */}
          <figure className="card overflow-hidden shadow-2xl shadow-black/40">
            <div className="flex items-center justify-between gap-3 border-b border-line bg-panel2 px-4 py-2.5">
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-line" />
                <span className="h-2.5 w-2.5 rounded-full bg-line" />
                <span className="h-2.5 w-2.5 rounded-full bg-line" />
              </div>
              <span className="truncate font-mono text-[11px] text-muted">automated-web3-devsecops-pipeline · main</span>
            </div>
            <div className="px-4 py-4 font-mono text-[12.5px] leading-7 sm:px-5">
              <p className="text-ink2">
                <span className="text-muted">$</span> make security-gate
              </p>
              <ul>
                {GATE.map((g) => (
                  <li key={g.stage} className="grid grid-cols-[1.1rem_5.5rem_1fr] items-baseline sm:grid-cols-[1.1rem_5.5rem_10.5rem_1fr]">
                    <CheckIcon className="h-3.5 w-3.5 translate-y-[2px] text-accent" />
                    <span className="text-ink">{g.stage}</span>
                    <span className="hidden truncate text-muted sm:inline">{g.tool}</span>
                    <span className="truncate text-ink2">{g.result}</span>
                  </li>
                ))}
                <li className="grid grid-cols-[1.1rem_5.5rem_1fr] items-baseline sm:grid-cols-[1.1rem_5.5rem_10.5rem_1fr]">
                  <span className="text-accent">→</span>
                  <span className="text-ink">deploy</span>
                  <span className="hidden truncate text-muted sm:inline">OIDC → AWS KMS</span>
                  <span className="truncate text-accent">no private key exists</span>
                </li>
              </ul>
            </div>
            <figcaption className="border-t border-line px-4 py-2.5 text-xs text-muted sm:px-5">
              Verified results from the{' '}
              <a href={SECURITY_PROJECTS[0].repo} target="_blank" rel="noopener noreferrer" className="link">
                pipeline repo
              </a>
              , run in the same pinned containers CI uses.
            </figcaption>
          </figure>
        </div>

        <div className="page relative pb-16">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line lg:grid-cols-4">
            {HERO_STATS.map((s) => (
              <div key={s.value} className="bg-panel p-5">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{s.value}</span>
                  <span className="mt-1.5 block text-[13px] leading-snug text-ink2">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Security work */}
      <section className="border-b border-line py-20 sm:py-28">
        <div className="page">
          <SectionHead
            id="work"
            eyebrow="Security engineering, in public"
            title="Three builds that cover where protocols actually lose money"
            intro="Leaked deployer keys, poisoned pipelines, exposed RPC endpoints and silent contract takeovers. Each repository is open source, runs its own checks in CI, and documents its threat model, including the risks it accepts."
          />

          <div className="space-y-6">
            {SECURITY_PROJECTS.map((p, i) => (
              <article key={p.id} className="card overflow-hidden">
                <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_20rem]">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-xs text-accent">0{i + 1}</span>
                      <h3 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">{p.name}</h3>
                    </div>
                    <p className="mt-3 max-w-2xl leading-relaxed text-ink2">{p.oneLiner}</p>
                    <p className="mt-4 flex items-start gap-2 text-sm text-ink">
                      <ShieldIcon className="mt-0.5 h-4 w-4 flex-none text-accent" />
                      <span>
                        <span className="text-muted">Stops: </span>
                        {p.stops}
                      </span>
                    </p>
                    <div className="mt-6 grid gap-5 sm:grid-cols-2">
                      {p.highlights.map((h) => (
                        <div key={h.title}>
                          <h4 className="text-sm font-semibold text-ink">{h.title}</h4>
                          <p className="mt-1.5 text-sm leading-relaxed text-ink2">{h.body}</p>
                        </div>
                      ))}
                    </div>
                    <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Stack">
                      {p.stack.map((s) => (
                        <li key={s} className="chip">
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <aside className="flex flex-col justify-between gap-6 rounded-lg border border-line bg-bg/60 p-5">
                    <div>
                      <p className="eyebrow mb-3">Verified in CI</p>
                      <ul className="space-y-2.5">
                        {p.verified.map((v) => (
                          <li key={v} className="flex gap-2.5 text-[13px] leading-snug text-ink">
                            <CheckIcon className="mt-0.5 h-3.5 w-3.5 flex-none text-accent" />
                            {v}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <a href={p.repo} target="_blank" rel="noopener noreferrer" className="btn-ghost w-full">
                      <GitHubIcon /> View repository
                    </a>
                  </aside>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="border-b border-line py-20 sm:py-28">
        <div className="page">
          <SectionHead
            id="skills"
            eyebrow="What I bring to a security team"
            title="DevOps automation with Web3 security built in"
            intro="I sit between protocol engineers and infrastructure: I make the secure path the default path, and I prove the controls work instead of assuming they do."
          />
          <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {CAPABILITIES.map((c) => (
              <div key={c.area} className="bg-panel p-6">
                <h3 className="text-base font-semibold text-ink">{c.area}</h3>
                <ul className="mt-4 space-y-2">
                  {c.items.map((it) => (
                    <li key={it} className="flex gap-2 text-sm leading-snug text-ink2">
                      <span className="mt-[7px] h-1 w-1 flex-none rounded-full bg-accent" aria-hidden="true" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
            <p className="text-ink2">
              <span className="eyebrow mr-2">Languages</span>
              {LANGUAGES.join(' · ')}
            </p>
            <p className="text-ink2">
              <span className="eyebrow mr-2">Platform</span>
              {PLATFORM.join(' · ')}
            </p>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="border-b border-line py-20 sm:py-28">
        <div className="page">
          <SectionHead id="experience" eyebrow="Experience" title="Shipping and running production systems since 2020" />
          <ol className="relative space-y-10 border-l border-line pl-6 sm:pl-8">
            {EXPERIENCE.map((r) => (
              <li key={r.company + r.period} className="relative">
                <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-bg bg-accent sm:-left-[37px]" aria-hidden="true" />
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <h3 className="text-lg font-semibold text-ink">
                    {r.title}
                    <span className="text-ink2"> · </span>
                    {r.url ? (
                      <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-ink2 hover:text-ink">
                        {r.company}
                      </a>
                    ) : (
                      <span className="text-ink2">{r.company}</span>
                    )}
                  </h3>
                  <p className="flex-none font-mono text-xs text-muted">
                    {r.period} · {r.mode}
                  </p>
                </div>
                <ul className="mt-3 max-w-3xl space-y-2">
                  {r.bullets.map((b) => (
                    <li key={b} className="flex gap-2.5 text-[15px] leading-relaxed text-ink2">
                      <span className="mt-[11px] h-1 w-1 flex-none rounded-full bg-muted" aria-hidden="true" />
                      {b}
                    </li>
                  ))}
                </ul>
                {r.tech && <p className="mt-3 font-mono text-xs text-muted">{r.tech}</p>}
              </li>
            ))}
          </ol>
          <p className="mt-12 text-sm text-ink2">
            <span className="eyebrow mr-2">Education</span>
            {EDUCATION.degree} · {EDUCATION.school}
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="border-b border-line py-20 sm:py-28">
        <div className="page">
          <SectionHead
            id="products"
            eyebrow="Products I build and run"
            title="Two products, engineered with the same discipline"
            intro="Alongside client and employer work I build my own financial products under Haxsen Capital. Both put custody and risk first."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            <Link href="/hxquant" className="card group flex flex-col p-6 transition-colors hover:border-ink2/50 sm:p-8">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-2xl font-semibold tracking-tight text-ink">hxQuant</h3>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/50 px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider text-accent">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                  Live pilot
                </span>
              </div>
              <p className="mt-3 leading-relaxed text-ink2">
                An ML trading engine that buys sudden crypto crashes and sells the rebound, inside the client&apos;s own exchange
                account with a trade-only key that cannot withdraw.
              </p>
              <dl className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-line bg-line text-center">
                {[
                  ['7 yrs', 'minute-level backtest'],
                  ['300+', 'coins scanned hourly'],
                  ['Spot', 'no leverage, no futures'],
                ].map(([v, l]) => (
                  <div key={l} className="bg-bg/60 px-2 py-3">
                    <dt className="sr-only">{l}</dt>
                    <dd>
                      <span className="block whitespace-nowrap text-[15px] font-semibold text-ink sm:text-lg">{v}</span>
                      <span className="block text-[11.5px] leading-tight text-muted">{l}</span>
                    </dd>
                  </div>
                ))}
              </dl>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                Performance, custody and risks <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>

            <Link href="/hxslst" className="card group flex flex-col p-6 transition-colors hover:border-ink2/50 sm:p-8">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-2xl font-semibold tracking-tight text-ink">hxSLST</h3>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-warn/50 px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider text-warn">
                  In development
                </span>
              </div>
              <p className="mt-3 leading-relaxed text-ink2">
                HaxsensSmartLST: one token for the best ETH staking yield. An ERC-4626 vault that allocates across liquid-staking
                tokens and rebalances through MEV-protected swaps.
              </p>
              <dl className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-line bg-line text-center">
                {[
                  ['ERC-4626', 'vault standard'],
                  ['tETH', '+ ankrETH underlying'],
                  ['Milkman', 'MEV-protected swaps'],
                ].map(([v, l]) => (
                  <div key={l} className="bg-bg/60 px-2 py-3">
                    <dt className="sr-only">{l}</dt>
                    <dd>
                      <span className="block whitespace-nowrap text-[15px] font-semibold text-ink sm:text-lg">{v}</span>
                      <span className="block text-[11.5px] leading-tight text-muted">{l}</span>
                    </dd>
                  </div>
                ))}
              </dl>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                How the vault works <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Other work */}
      <section className="border-b border-line py-20 sm:py-24">
        <div className="page">
          <SectionHead eyebrow="More work" title="Other things I have shipped" />
          <ul className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {OTHER_WORK.map((w) => (
              <li key={w.name} className="flex flex-col bg-panel p-5">
                <h3 className="font-semibold text-ink">{w.name}</h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink2">{w.desc}</p>
                <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                  {w.links.map((l) => (
                    <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="link">
                      {l.label}
                    </a>
                  ))}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 sm:py-28">
        <div className="page">
          <div id="contact" className="card relative overflow-hidden p-8 sm:p-12">
            <div className="bg-grid-pattern pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_right,black_10%,transparent_70%)]" aria-hidden="true" />
            <div className="relative max-w-2xl">
              <p className="eyebrow mb-3">Contact</p>
              <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Hiring for Web3 security or platform engineering?</h2>
              <p className="mt-4 text-lg leading-relaxed text-ink2">
                I&apos;m open to remote DevSecOps, SRE and platform roles at protocols, exchanges and infrastructure teams.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={`mailto:${PERSON.email}?subject=Role%20at%20`} className="btn-primary">
                  <MailIcon /> Email me
                </a>
                <a href={PERSON.telegram} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                  <TelegramIcon /> Telegram
                </a>
                <a href={PERSON.linkedin} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                  <LinkedInIcon /> LinkedIn
                </a>
                <a href={PERSON.cvPdf} download className="btn-ghost">
                  <DownloadIcon /> CV (PDF)
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
