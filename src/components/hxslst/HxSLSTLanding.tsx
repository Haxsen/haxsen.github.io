'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import WalletConnect from './WalletConnect'
import HxSLSTInterface from './HxSLSTInterface'

const CONTRACT = '0xac5b65150c6265b300f231036f684921deaa95d2'

const STEPS = [
  { n: '1', title: 'Deposit ETH', body: 'Connect your wallet and deposit Ether into the vault.' },
  { n: '2', title: 'Receive hxSLST', body: 'Get hxSLST shares representing your deposit.' },
  { n: '3', title: 'Auto-optimised', body: 'The Brain service rebalances between liquid-staking tokens for yield.' },
  { n: '4', title: 'Withdraw anytime', body: 'Redeem your shares for the underlying LSTs plus earnings.' },
]

const FEATURES = [
  { title: 'Dual strategy', body: 'tETH stability plus ankrETH upside, with ankrETH capped at 60% of TVL. Start with as little as 0.01 ETH.' },
  { title: 'Auto-rebalancing', body: 'An off-chain Brain service watches LST yields and rebalances the vault toward the better one.' },
  { title: 'MEV protection', body: 'Rebalancing swaps route through Milkman to protect against front-running and sandwich attacks.' },
  { title: 'Gas-efficient', body: 'Batched operations keep the cost of deposits and rebalancing low.' },
  { title: 'Real-time analytics', body: 'Track LST performance on the companion analytics dashboard.' },
  { title: 'Transparent', body: 'Standard ERC-4626 accounting, with every deposit, withdrawal and rebalance on-chain.' },
]

const FAQ = [
  {
    q: 'What is hxSLST?',
    a: 'hxSLST is an ERC-4626 vault that aims to optimise Ethereum staking yield by allocating between the tETH and ankrETH liquid-staking tokens.',
  },
  {
    q: 'Where does the yield come from?',
    a: 'From staking rewards accrued by the underlying LSTs, plus rebalancing toward whichever LST is performing better. The 4%+ APY is a target, not a promise.',
  },
  {
    q: 'Is it safe to deposit?',
    a: 'hxSLST is in development and its contracts have not had an independent audit yet. Treat any deposit as experimental and only use money you can afford to lose.',
  },
  {
    q: 'Can I withdraw anytime?',
    a: 'Yes. There is no lockup: withdrawing redeems your hxSLST for the underlying tETH and ankrETH.',
  },
  {
    q: 'What are the risks?',
    a: 'Smart-contract risk in the vault itself, the risks of the underlying LST protocols (tETH and ankrETH), and liquidity or depeg risk when swapping between them.',
  },
]

export default function HxSLSTLanding() {
  const [account, setAccount] = useState<string | null>(null)

  return (
    <main className="pt-16">
      <div className="border-b border-warn/30 bg-warn/10">
        <p className="page py-3 text-center text-sm text-warn">
          <strong className="font-semibold">In development.</strong> hxSLST&apos;s contracts have not had an independent audit
          yet. Only deposit what you can afford to lose.
        </p>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="bg-grid-pattern pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" aria-hidden="true" />
        <div className="page relative py-16 text-center sm:py-24">
          <Image src="/hxSLST.svg" alt="hxSLST logo" width={72} height={72} className="mx-auto mb-6 rounded-lg" priority />
          <p className="eyebrow mb-3">HaxsensSmartLST · by Haxsen Capital</p>
          <h1 className="text-4xl font-semibold tracking-tight text-ink sm:text-6xl">One token. The best staking yield.</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink2">
            Deposit ETH into one vault and hold one token, while the vault allocates across liquid-staking tokens for yield.
            Built around transparent ERC-4626 accounting and MEV-protected rebalancing.
          </p>

          <div className="card mx-auto mt-8 max-w-xl px-4 py-3">
            <p className="text-xs text-muted">Contract address</p>
            <p className="mt-1 break-all font-mono text-xs text-ink2">{CONTRACT}</p>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <WalletConnect onConnect={(a) => setAccount(a || null)} account={account} />
            <a href="https://eth-staking-analytics-frontend.onrender.com/" target="_blank" rel="noopener noreferrer" className="btn-ghost">
              View LST dashboard
            </a>
          </div>

          {account && (
            <div className="mx-auto mt-8 max-w-md text-left">
              <HxSLSTInterface account={account} />
            </div>
          )}

          <dl className="mx-auto mt-12 grid max-w-3xl gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
            {[
              ['4%+', 'Target APY'],
              ['tETH + ankrETH', 'Underlying assets'],
              ['ERC-4626', 'Vault standard'],
            ].map(([v, l]) => (
              <div key={l} className="bg-panel p-5">
                <dt className="sr-only">{l}</dt>
                <dd>
                  <span className="block text-2xl font-semibold text-ink">{v}</span>
                  <span className="mt-1 block text-sm text-muted">{l}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* How it works */}
      <section className="border-b border-line py-20" id="how-it-works">
        <div className="page">
          <h2 className="mb-12 text-center text-3xl font-semibold tracking-tight text-ink">How it works</h2>
          <ol className="grid gap-6 md:grid-cols-4">
            {STEPS.map((s) => (
              <li key={s.n} className="card p-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-accent/50 font-mono text-sm text-accent">{s.n}</span>
                <h3 className="mt-4 font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink2">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-line py-20" id="features">
        <div className="page">
          <h2 className="mb-12 text-center text-3xl font-semibold tracking-tight text-ink">Why hxSLST</h2>
          <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-panel p-6">
                <h3 className="font-semibold text-ink">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink2">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Token details */}
      <section className="border-b border-line py-20">
        <div className="page">
          <h2 className="mb-12 text-center text-3xl font-semibold tracking-tight text-ink">Token details</h2>
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            <div className="card p-6">
              <h3 className="font-semibold text-ink">hxSLST token</h3>
              <p className="mt-1 text-sm text-ink2">ERC-4626 vault shares representing your deposit.</p>
              <dl className="mt-4 space-y-2 text-sm">
                {[
                  ['Name', 'HaxsensSmartLST'],
                  ['Symbol', 'hxSLST'],
                  ['Standard', 'ERC-4626'],
                  ['Asset', 'ETH'],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between border-b border-line/60 pb-2 last:border-0">
                    <dt className="text-muted">{k}</dt>
                    <dd className="font-mono text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="card p-6">
              <h3 className="font-semibold text-ink">Underlying assets</h3>
              <p className="mt-1 text-sm text-ink2">A strategic mix of liquid-staking tokens.</p>
              <dl className="mt-4 space-y-2 text-sm">
                {[
                  ['tETH', '100% at start'],
                  ['ankrETH', 'Max 60% of TVL'],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between border-b border-line/60 pb-2 last:border-0">
                    <dt className="text-muted">{k}</dt>
                    <dd className="font-mono text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Get started */}
      <section className="border-b border-line py-20">
        <div className="page grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-ink">Getting started</h2>
            <ol className="mt-6 space-y-5">
              {[
                ['Connect wallet', 'Click “Connect Wallet” and approve in MetaMask or another injected wallet.'],
                ['Deposit ETH', 'Enter an amount and confirm the transaction.'],
                ['Receive hxSLST', 'Shares representing your deposit arrive in your wallet.'],
                ['Track and withdraw', 'Follow LST performance on the dashboard and withdraw at any time.'],
              ].map(([t, b], i) => (
                <li key={t} className="flex gap-4">
                  <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full border border-line font-mono text-xs text-ink2">{i + 1}</span>
                  <div>
                    <h3 className="font-semibold text-ink">{t}</h3>
                    <p className="mt-1 text-sm text-ink2">{b}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-ink">Before you deposit</h2>
            {[
              ['Supported wallets', ['MetaMask', 'Any injected EIP-1193 wallet']],
              ['Requirements', ['An Ethereum wallet', 'ETH for gas fees']],
              ['Security tips', ['Verify the contract address above', 'Never share your seed phrase or private keys', 'Use only this official page']],
            ].map(([title, items]) => (
              <div key={title as string} className="card p-5">
                <h3 className="font-semibold text-ink">{title as string}</h3>
                <ul className="mt-2 space-y-1 text-sm text-ink2">
                  {(items as string[]).map((it) => (
                    <li key={it}>· {it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-line py-20">
        <div className="page max-w-3xl">
          <h2 className="mb-10 text-center text-3xl font-semibold tracking-tight text-ink">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQ.map((f) => (
              <details key={f.q} className="card group p-5 open:border-ink2/40">
                <summary className="cursor-pointer list-none font-semibold text-ink marker:hidden">
                  <span className="flex items-center justify-between gap-4">
                    {f.q}
                    <span className="font-mono text-muted transition-transform group-open:rotate-45" aria-hidden="true">
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-ink2">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="page text-center">
          <p className="mx-auto max-w-2xl text-sm text-muted">
            hxSLST is a DeFi protocol in development. Depositing means trusting its smart contracts with your funds. Do your own
            research; nothing here is financial advice.
          </p>
          <Link href="/" className="btn-ghost mt-6">
            Built by Hassān Ali, Web3 DevSecOps engineer
          </Link>
        </div>
      </section>
    </main>
  )
}
