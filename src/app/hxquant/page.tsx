import type { Metadata } from 'next'
import Link from 'next/link'
import { LIVE_AS_OF, LIVE_RECORD, PRE_YEAR, SIM_WINDOW, TRADERS, type TraderStatus } from '@/data/hxquant'
import { PERSON } from '@/data/profile'
import MonthlyHeatmap from '@/components/hxquant/MonthlyHeatmap'
import { pct } from '@/components/hxquant/format'
import { ArrowIcon, CheckIcon, CrossIcon, MailIcon, TelegramIcon } from '@/components/Icons'

export const metadata: Metadata = {
  title: 'hxQuant · ML crypto trading engine',
  description:
    'hxQuant buys sudden crypto crashes and sells the rebound, inside your own Bybit account with a trade-only key that cannot withdraw. Seven years of minute-level simulation, a live real-money record, and the risks stated plainly.',
  alternates: { canonical: '/hxquant' },
}

const MAIN = TRADERS.find((t) => t.key === 'acam4') ?? TRADERS[0]
const BEAR = MAIN.regimes.find((r) => r.label.startsWith('2022'))
const LAST12 = Object.keys(MAIN.monthly).sort().slice(-12)
const LAST12_LOSING = LAST12.filter((k) => MAIN.monthly[k] < 0).length
const INTEREST = `mailto:${PERSON.email}?subject=hxQuant%20private%20beta`

const STATUS: Record<TraderStatus, { label: string; cls: string }> = {
  live: { label: 'Live', cls: 'border-accent/50 text-accent' },
  paper: { label: 'Paper', cls: 'border-[#6da7ec]/50 text-[#6da7ec]' },
  research: { label: 'Research', cls: 'border-line text-muted' },
}

function H2({ id, eyebrow, children }: { id?: string; eyebrow: string; children: React.ReactNode }) {
  return (
    <div id={id} className="mb-8 max-w-3xl">
      <p className="eyebrow mb-3">{eyebrow}</p>
      <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{children}</h2>
    </div>
  )
}

function Pill({ status }: { status: TraderStatus }) {
  const s = STATUS[status]
  return <span className={`inline-flex rounded-full border px-2 py-0.5 font-mono text-[10.5px] uppercase tracking-wider ${s.cls}`}>{s.label}</span>
}

export default function HxQuant() {
  const pre = PRE_YEAR[MAIN.key]

  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="bg-grid-pattern pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_left,black_25%,transparent_70%)]" aria-hidden="true" />
        <div className="page relative py-16 sm:py-24">
          <p className="eyebrow mb-5 flex flex-wrap items-center gap-x-3 gap-y-2">
            <span>hxQuant · by Haxsen Capital</span>
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-accent/50 px-2.5 py-0.5 text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              Live pilot · private beta
            </span>
          </p>
          <h1 className="max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-[3.4rem]">
            A trading bot that buys crypto panics and sells the rebound, inside your own exchange account.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink2">
            hxQuant watches more than 300 coins on Bybit around the clock. When a coin suddenly crashes, it buys at the panic
            price and sells into the bounce. Your money never leaves your account, and the bot has no permission to withdraw it.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={INTEREST} className="btn-primary">
              Join the private beta <ArrowIcon />
            </a>
            <a href="#live" className="btn-ghost">
              See the live record
            </a>
          </div>

          <ul className="mt-14 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
            {[
              ['Your account, your money', 'You give a trade-only key. It cannot withdraw or transfer a single coin.'],
              ['Seven years of minute-by-minute testing', 'Sep 2019 to Sep 2026, including the 2020 COVID crash and the 2022 bear market.'],
              ['Spot only', 'No leverage, no futures, no borrowing. The worst case is a losing trade, never a debt.'],
            ].map(([t, b]) => (
              <li key={t} className="bg-panel p-6">
                <h2 className="font-semibold text-ink">{t}</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink2">{b}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How it works */}
      <section className="border-b border-line py-20 sm:py-24">
        <div className="page">
          <H2 eyebrow="How it works">The bot waits for panic, buys it, and sells the rebound</H2>
          <p className="max-w-3xl leading-relaxed text-ink2">
            Crypto coins often drop 10% or more within minutes when sellers rush out, then bounce back within hours. That is the
            moment it trades.
          </p>
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ['Scan', 'At the start of every hour it checks every coin on its list of 300+ Bybit coins: price, volume, and how the whole market is moving.'],
              ['Pick', 'A machine-learning model trained on years of 1-minute price data rates each coin: if it suddenly crashes in the next hour, how likely is a bounce?'],
              ['Set the traps', 'For coins it rates well, it places buy orders well below today’s price, typically about 200 orders across 100+ coins. They fill only if the price really falls that far.'],
              ['Wait', 'In a calm market most orders never fill and the money stays in cash. No panic, no trade: that is by design.'],
              ['Buy the panic, sell the bounce', 'When a crash hits an order, the bot owns the coin at the panic price and sells on the rebound. Every trade has a stop-loss and a time limit of about two days.'],
              ['Market-wide crashes', 'When most of the market falls at once, separate rules buy the deepest hours of the panic, including Bitcoin and Ethereum.'],
            ].map(([t, b], i) => (
              <li key={t} className="card p-5">
                <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-2 font-semibold text-ink">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink2">{b}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <p className="text-sm leading-relaxed text-ink2">
              <span className="font-semibold text-ink">Between trades,</span> part of the cash can be held in Bitcoin, Ethereum or
              tokenised gold while their trends are up. Otherwise it stays in USDT.
            </p>
            <p className="text-sm leading-relaxed text-ink2">
              <span className="font-semibold text-ink">What the AI does, and does not do.</span> Machine learning chooses which dips
              are worth buying. Fixed, tested rules set trade size, exits and risk limits. The bot does not predict prices and
              never uses leverage. Every model was trained only on data from before the months it traded.
            </p>
          </div>
        </div>
      </section>

      {/* Custody */}
      <section className="border-b border-line py-20 sm:py-24">
        <div className="page">
          <H2 id="custody" eyebrow="Custody, by design">Your money never leaves your account</H2>
          <p className="max-w-3xl leading-relaxed text-ink2">
            Your money stays in your own Bybit account, in your name. The bot gets a key that can place spot trades and read
            balances, and nothing else. This is the same least-privilege design I build for protocol signing keys.
          </p>

          <figure className="mt-10">
            <div className="grid items-stretch gap-3 md:grid-cols-[1fr_auto_1.15fr_auto_1fr]">
              <div className="card flex flex-col justify-center p-5">
                <p className="eyebrow">Runs the strategy</p>
                <p className="mt-2 font-semibold text-ink">hxQuant server</p>
                <p className="mt-1 text-sm text-ink2">Places and cancels orders through your trade key, and nothing more.</p>
              </div>
              <div className="flex items-center justify-center font-mono text-muted" aria-hidden="true">
                <span className="hidden md:inline">→</span>
                <span className="md:hidden">↓</span>
              </div>
              <div className="card border-accent/40 p-5">
                <p className="eyebrow">Your API key</p>
                <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
                  {[
                    ['Spot trade', true],
                    ['Read balances', true],
                    ['Withdraw', false],
                    ['Transfer', false],
                    ['Futures', false],
                    ['Margin', false],
                  ].map(([l, ok]) => (
                    <li key={l as string} className={`flex items-center gap-2 ${ok ? 'text-ink' : 'text-muted'}`}>
                      {ok ? <CheckIcon className="h-3.5 w-3.5 text-accent" /> : <CrossIcon className="h-3.5 w-3.5 text-danger" />}
                      {l as string}
                      <span className="sr-only">{ok ? 'allowed' : 'not allowed'}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 border-t border-line pt-3 text-xs text-ink2">IP-locked: a stolen copy of the key does not work anywhere else.</p>
              </div>
              <div className="flex items-center justify-center font-mono text-muted" aria-hidden="true">
                <span className="hidden md:inline">→</span>
                <span className="md:hidden">↓</span>
              </div>
              <div className="card flex flex-col justify-center p-5">
                <p className="eyebrow">Holds your money</p>
                <p className="mt-2 font-semibold text-ink">Your Bybit sub-account</p>
                <p className="mt-1 text-sm text-ink2">Only the amount you choose to trade. The rest of your money stays out of reach.</p>
              </div>
            </div>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <div className="card flex items-start gap-3 p-5">
                <CheckIcon className="mt-0.5 h-4 w-4 flex-none text-accent" />
                <p className="text-sm text-ink2">
                  <span className="font-semibold text-ink">You keep full control.</span> Every order shows in your Bybit app as it
                  happens. Delete the key and trading stops at once: no notice period, no exit fee.
                </p>
              </div>
              <div className="card flex items-start gap-3 p-5">
                <CrossIcon className="mt-0.5 h-4 w-4 flex-none text-danger" />
                <p className="text-sm text-ink2">
                  <span className="font-semibold text-ink">No path out to any wallet,</span> including ours. Without withdrawal
                  permission the key cannot send funds anywhere.
                </p>
              </div>
            </div>
            <figcaption className="mt-4 text-sm text-muted">
              What this does not protect against: trading losses. The key cannot take your money out, but a losing trade still
              costs money, which is why the results below show the bad numbers as well as the good ones.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Traders */}
      <section className="border-b border-line py-20 sm:py-24">
        <div className="page">
          <H2 id="traders" eyebrow="The traders">One engine, four tested versions</H2>
          <p className="max-w-3xl leading-relaxed text-ink2">
            Each version survived hundreds of tested rule changes. All buy crashes and sell rebounds; they differ in what they do
            between trades and in a market-wide crash. Paper bots trade live prices with simulated orders, so their record can be
            compared with the real-money accounts.
          </p>
          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {TRADERS.map((t) => (
              <li key={t.key} className="card p-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-lg font-semibold text-ink">
                    {t.name} <span className="font-normal text-muted">· {t.role}</span>
                  </h3>
                  <Pill status={t.status} />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink2">{t.summary}</p>
                <p className="mt-4 font-mono text-xs text-muted">{t.statusNote}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Results */}
      <section className="border-b border-line py-20 sm:py-24">
        <div className="page">
          <H2 id="results" eyebrow="Results">Seven years of simulation, with the bad months shown</H2>
          <p className="max-w-3xl leading-relaxed text-ink2">
            In simulation the engine made money in bull markets, through the 2022 bear market and in the most recent year. It also
            had deep falls, and its real-money record is only weeks old. Every figure here starts a fresh $10,000 each month, so
            nothing compounds into sizes the market could not absorb.
          </p>

          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line lg:grid-cols-4">
            {[
              [pct(MAIN.stats.last12), 'average month over the last 12 months'],
              [BEAR ? pct(BEAR.avgMonth) : '', `average month in the 2022 bear market, ${BEAR?.losing ?? 0} losing months`],
              [`${MAIN.stats.losingMonths} of ${MAIN.stats.months}`, 'losing months, 2020 to 2026'],
              [pct(MAIN.stats.largestFall), 'largest fall from a peak, 2020 to 2026'],
            ].map(([v, l]) => (
              <div key={l} className="bg-panel p-5">
                <dt className="sr-only">{l}</dt>
                <dd>
                  <span className="block text-3xl font-semibold tracking-tight text-ink">{v}</span>
                  <span className="mt-1.5 block text-[13px] leading-snug text-ink2">{l}</span>
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-xs text-muted">
            {MAIN.name}, simulated on the coin list the Bybit bot trades, {SIM_WINDOW}. Fees, slippage and volume limits included.
          </p>

          <div className="card mt-10 overflow-hidden">
            <div className="flex flex-wrap items-center gap-2 border-b border-line px-5 py-3">
              <span className="rounded border border-warn/50 px-1.5 py-0.5 font-mono text-[10.5px] uppercase tracking-wider text-warn">Simulated</span>
              <span className="text-sm text-ink2">Fresh $10,000 each month · Bybit coin list · {SIM_WINDOW}</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-sm">
                <thead>
                  <tr className="border-b border-line text-left text-[11px] uppercase tracking-wider text-muted">
                    <th scope="col" className="px-5 py-3 font-medium">Trader</th>
                    <th scope="col" className="px-3 py-3 text-right font-medium">Avg month</th>
                    <th scope="col" className="px-3 py-3 text-right font-medium">Last 12 mo</th>
                    <th scope="col" className="px-3 py-3 text-right font-medium">Since 2023</th>
                    <th scope="col" className="px-3 py-3 text-right font-medium">2022 bear</th>
                    <th scope="col" className="px-3 py-3 text-right font-medium">Losing months</th>
                    <th scope="col" className="px-3 py-3 text-right font-medium">Worst month</th>
                    <th scope="col" className="px-5 py-3 text-right font-medium">Largest fall</th>
                  </tr>
                </thead>
                <tbody className="tabular font-mono text-[13px]">
                  {TRADERS.map((t) => {
                    const bear = t.regimes.find((r) => r.label.startsWith('2022'))
                    return (
                      <tr key={t.key} className="border-b border-line/60 last:border-0">
                        <th scope="row" className="px-5 py-3 text-left font-sans font-normal">
                          <span className="flex items-center gap-2">
                            <span className="font-semibold text-ink">{t.name}</span>
                            <Pill status={t.status} />
                          </span>
                        </th>
                        <td className="px-3 py-3 text-right text-ink">{pct(t.stats.avgMonth)}</td>
                        <td className="px-3 py-3 text-right text-ink">{pct(t.stats.last12)}</td>
                        <td className="px-3 py-3 text-right text-ink">{pct(t.stats.since2023)}</td>
                        <td className="px-3 py-3 text-right text-ink">{bear ? pct(bear.avgMonth) : '–'}</td>
                        <td className="px-3 py-3 text-right text-ink">
                          {t.stats.losingMonths} <span className="text-muted">/ {t.stats.months}</span>
                        </td>
                        <td className="px-3 py-3 text-right text-danger">{pct(t.stats.worstMonth)}</td>
                        <td className="px-5 py-3 text-right text-danger">{pct(t.stats.largestFall)}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <p className="border-t border-line px-5 py-3 text-xs text-muted">
              Avg month is the geometric mean of the monthly results. Largest fall is the deepest peak-to-trough drop of one account.
              The {pct(MAIN.stats.avgMonth, 0)} six-year average is lifted by the 2020 to 2021 bull market; the last 12 months are the
              better guide.
            </p>
          </div>

          <div className="mt-10">
            <MonthlyHeatmap traders={TRADERS} />
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="card p-6">
              <h3 className="font-semibold text-ink">How it was tested</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-ink2">
                {[
                  'Every coin as it was listed at the time, including coins that later collapsed or were delisted.',
                  'Trading fees, slippage, and a cap on how much of each minute’s volume an order may take.',
                  'A buy order fills only when the price trades through it, as a real order would.',
                  'Every model trained only on data from before the months it traded (walk-forward).',
                  'Each simulated trade checked against 1-minute prices by a separate 20-check audit.',
                ].map((x) => (
                  <li key={x} className="flex gap-2.5">
                    <CheckIcon className="mt-0.5 h-3.5 w-3.5 flex-none text-accent" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card p-6">
              <h3 className="font-semibold text-ink">Why real results will be lower</h3>
              <p className="mt-4 text-sm leading-relaxed text-ink2">
                The rules were chosen by looking at these same years, which flatters any simulation. Most tests use Binance prices;
                on Bybit&apos;s own prices the engine earns about one point a month less. Treat the figures as the best the engine
                has done, not a forecast.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink2">
                In a separate rebuilt test of Sep 2019 to Aug 2020, {MAIN.name} fell {pct(pre?.covid ?? -0.46, 0)} in three days of the
                March 2020 COVID crash and recovered its high within about a month.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Live record */}
      <section className="border-b border-line py-20 sm:py-24">
        <div className="page">
          <H2 id="live" eyebrow="Live record · real money">The real-money accounts, updated monthly</H2>
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] text-sm">
                <thead>
                  <tr className="border-b border-line text-left text-[11px] uppercase tracking-wider text-muted">
                    <th scope="col" className="px-5 py-3 font-medium">Account</th>
                    <th scope="col" className="px-3 py-3 font-medium">Trader</th>
                    <th scope="col" className="px-3 py-3 font-medium">Since</th>
                    <th scope="col" className="px-3 py-3 text-right font-medium">Start</th>
                    <th scope="col" className="px-3 py-3 text-right font-medium">Now</th>
                    <th scope="col" className="px-3 py-3 text-right font-medium">Change</th>
                    <th scope="col" className="px-5 py-3 font-medium">Closed trades</th>
                  </tr>
                </thead>
                <tbody>
                  {LIVE_RECORD.map((a) => {
                    const ch = a.now / a.start - 1
                    return (
                      <tr key={a.account} className="border-b border-line/60 last:border-0">
                        <th scope="row" className="px-5 py-3 text-left font-semibold text-ink">{a.account}</th>
                        <td className="px-3 py-3 text-ink2">{a.trader}</td>
                        <td className="whitespace-nowrap px-3 py-3 text-ink2">{a.since}</td>
                        <td className="tabular px-3 py-3 text-right font-mono text-ink2">{a.start.toFixed(2)}</td>
                        <td className="tabular px-3 py-3 text-right font-mono text-ink">{a.now.toFixed(2)}</td>
                        <td className={`tabular px-3 py-3 text-right font-mono ${ch < 0 ? 'text-danger' : 'text-accent'}`}>{pct(ch)}</td>
                        <td className="px-5 py-3 text-ink2">{a.closedTrades}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <p className="border-t border-line px-5 py-3 text-xs text-muted">Balances in USDT, as of {LIVE_AS_OF}.</p>
          </div>
          <p className="mt-6 max-w-3xl leading-relaxed text-ink2">
            Both live accounts are down so far. Most of the loss came from one coin, ASTER, which kept falling after the bots
            bought it. A few weeks is far too short to judge either way: in the simulation, {LAST12_LOSING} of the last 12 months
            lost money.
            Judge hxQuant on this table as it grows.
          </p>
        </div>
      </section>

      {/* Risks */}
      <section className="border-b border-line py-20 sm:py-24">
        <div className="page">
          <H2 id="risks" eyebrow="Risks, said plainly">You can lose money, including a large part of your account</H2>
          <p className="max-w-3xl leading-relaxed text-ink2">Only use money you can leave alone through a fall of half its value.</p>
          <ul className="mt-8 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-2">
            {[
              ['Fast crashes', 'In the March 2020 COVID crash every version fell 43% to 49% in three days. A crash like that tomorrow could do the same.'],
              ['One coin going wrong', 'In Dec 2019 one coin halved within an hour after the engine bought it. The live losses so far also came mostly from one coin. acam5’s per-coin limit is the fix being tested.'],
              ['Losing months', `In the simulation ${LAST12_LOSING} of the last 12 months lost money, the worst ${pct(Math.min(...LAST12.map((k) => MAIN.monthly[k])))}. Expect losing weeks and months, sometimes several in a row.`],
              ['The edge has shrunk', 'Recent months average far less than 2020 to 2021. Markets change, and past results, simulated or real, do not promise future ones.'],
              ['Exchange risk', 'Your money sits on Bybit. If Bybit froze withdrawals, failed or was hacked, your money would be at risk, and we cannot prevent that.'],
              ['Size and technical risk', 'The dips are in smaller coins, so larger accounts earn less. An internet or exchange outage can delay an order or an exit.'],
            ].map(([t, b]) => (
              <li key={t} className="bg-panel p-6">
                <h3 className="font-semibold text-ink">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink2">{b}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted">You are responsible for taxes on trading profits in your country. Nothing on this page is a guarantee or a promise of profit.</p>
        </div>
      </section>

      {/* Beta & fees */}
      <section className="border-b border-line py-20 sm:py-24">
        <div className="page grid gap-10 lg:grid-cols-2">
          <div>
            <H2 id="beta" eyebrow="Private beta">Not yet open to client funds</H2>
            <p className="leading-relaxed text-ink2">
              hxQuant runs on my own money first. Client onboarding opens only when everything on this list is done. Register
              interest and you will hear first.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                ['Live pilot with real money', true],
                ['A paper bot beside every live bot', true],
                ['Trade-only, no-withdrawal key design', true],
                ['Dedicated server with a fixed IP for IP-locked keys', false],
                ['One sub-account and encrypted key per client', false],
                ['3 to 6 months of live record', false],
                ['Legal review for managing client accounts', false],
              ].map(([l, done]) => (
                <li key={l as string} className="flex items-center gap-3 text-sm">
                  <span
                    className={`flex h-5 w-5 flex-none items-center justify-center rounded border ${
                      done ? 'border-accent/60 bg-accent-dim text-accent' : 'border-line text-transparent'
                    }`}
                  >
                    <CheckIcon className="h-3 w-3" />
                  </span>
                  <span className={done ? 'text-ink' : 'text-ink2'}>{l as string}</span>
                  <span className="sr-only">{done ? 'done' : 'to do'}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={INTEREST} className="btn-primary">
                <MailIcon /> Register interest
              </a>
              <a href={PERSON.telegram} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <TelegramIcon /> Ask on Telegram
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <div className="card p-6">
              <h3 className="font-semibold text-ink">How onboarding will work</h3>
              <ol className="mt-4 space-y-2.5 text-sm text-ink2">
                {[
                  'Open a Bybit account and complete Bybit’s own identity check.',
                  'Create a sub-account and move in only the USDT you want traded.',
                  'Create an API key on that sub-account: Spot Trade and Read only, locked to the hxQuant server IP.',
                  'Share the key through an encrypted channel, never email or chat.',
                  'Watch every order in your Bybit app, with a monthly statement from us.',
                ].map((s, i) => (
                  <li key={s} className="flex gap-3">
                    <span className="font-mono text-xs text-muted">{i + 1}.</span>
                    {s}
                  </li>
                ))}
              </ol>
            </div>
            <div className="card p-6">
              <h3 className="font-semibold text-ink">Fees</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-ink2">
                <li>A performance fee on new profit only, charged above your account&apos;s previous high (high-water mark).</li>
                <li>No sign-up, deposit or exit fees.</li>
                <li>The key cannot withdraw, so fees are never taken from your account. You pay a monthly invoice in USDT.</li>
                <li>Bybit&apos;s own trading fees are already counted in the results above.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-line py-20 sm:py-24">
        <div className="page max-w-3xl">
          <H2 eyebrow="FAQ">Questions people ask</H2>
          <div className="space-y-3">
            {[
              ['Can you take my money?', 'No. The key has no withdrawal or transfer permission, so it cannot send funds anywhere. In theory, someone holding a trade key could buy a thin coin at a bad price to move value elsewhere. hxQuant trades only a published list of coins against USDT, and every order shows in your Bybit app, so you would see it at once.'],
              ['How much will I make?', 'Nobody can know. The last 12 simulated months averaged about +6% a month with losing months among them, and the real-money accounts are down in their first weeks. Judge it on the live record as it grows.'],
              ['Why has it not traded for days?', 'It only buys sudden crashes. In a calm market its orders sit below the price and do not fill, and your money stays in cash or in Bitcoin, Ethereum or gold. That is normal.'],
              ['Can I take my money out?', 'Yes, at any time: it is your account. Delete the key first so the bot stops, then sell any coins and withdraw as usual.'],
              ['What happens if the server goes down?', 'Trading pauses until it is back, which can delay a sale. You can always close any position yourself in the Bybit app.'],
              ['Does it use leverage or futures?', 'No. It buys and sells coins on the spot market only, so you can never owe more than you put in.'],
            ].map(([q, a]) => (
              <details key={q} className="card group p-5 open:border-ink2/40">
                <summary className="cursor-pointer list-none font-semibold text-ink marker:hidden">
                  <span className="flex items-center justify-between gap-4">
                    {q}
                    <span className="font-mono text-muted transition-transform group-open:rotate-45" aria-hidden="true">
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-ink2">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-14">
        <div className="page space-y-4">
          <p className="max-w-4xl text-xs leading-relaxed text-muted">
            Simulated results are hypothetical, based on past prices, and do not represent real trading. Crypto trading carries a
            high risk of loss, including most of the money traded. Nothing on this page is investment advice or a promise of
            profit. Bybit is named as the exchange hxQuant trades on; there is no partnership with or endorsement by Bybit.
          </p>
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-ink2 hover:text-ink">
            Built by {PERSON.name}, Web3 DevSecOps engineer <ArrowIcon />
          </Link>
        </div>
      </section>
    </main>
  )
}
