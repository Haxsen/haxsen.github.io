'use client'

import { useMemo, useState } from 'react'
import type { Trader } from '@/data/hxquant'
import { MONTHS, monthLabel, pct } from './format'

// Diverging scale for the dark surface: blue = gain, red = loss, neutral grey = flat.
const MID = [0x2b, 0x32, 0x3b]
const POS = [0x6d, 0xa7, 0xec]
const NEG = [0xe6, 0x67, 0x67]
const CAP = 0.25 // months beyond ±25% get the full pole colour
const BAR = '#3987e5'

function mix(a: number[], b: number[], t: number) {
  return a.map((x, i) => Math.round(x + (b[i] - x) * t))
}

/** Compact cell label in percent: 1.0 -> "100", 0.12 -> "12", -0.0048 -> "−0.5", -0.13 -> "−13". */
function cellText(v: number) {
  const p = v * 100
  const s = Math.abs(p) < 1 ? Math.abs(p).toFixed(1) : String(Math.round(Math.abs(p)))
  return p < 0 ? `−${s}` : s
}

function cellColor(v: number) {
  const t = Math.sqrt(Math.min(Math.abs(v) / CAP, 1))
  const [r, g, b] = mix(MID, v >= 0 ? POS : NEG, t)
  // relative luminance decides the label ink
  const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
  return { bg: `rgb(${r} ${g} ${b})`, ink: lum > 0.5 ? '#0b0b0b' : '#e8edf2' }
}

export default function MonthlyHeatmap({ traders }: { traders: Trader[] }) {
  const [key, setKey] = useState(traders[0].key)
  const [active, setActive] = useState<string | null>(null)
  const trader = traders.find((t) => t.key === key) ?? traders[0]

  const years = useMemo(() => {
    const ys = new Set(Object.keys(trader.monthly).map((k) => k.slice(0, 4)))
    return Array.from(ys).sort()
  }, [trader])

  const maxRegime = Math.max(...trader.regimes.map((r) => r.avgMonth))
  const activeValue = active != null ? trader.monthly[active] : undefined

  return (
    <div className="card overflow-hidden">
      <div className="flex flex-col gap-4 border-b border-line p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="flex items-center gap-2">
            <span className="rounded border border-warn/50 px-1.5 py-0.5 font-mono text-[10.5px] uppercase tracking-wider text-warn">Simulated</span>
            <span className="font-semibold text-ink">Every month, from a fresh $10,000</span>
          </p>
          <p className="mt-1 text-sm text-muted">Blue months gained, red months lost. Sep 2020 to Sep 2026.</p>
        </div>
        <div role="group" aria-label="Trader" className="inline-flex flex-wrap overflow-hidden rounded-lg border border-line">
          {traders.map((t, i) => (
            <button
              key={t.key}
              type="button"
              aria-pressed={t.key === key}
              onClick={() => {
                setKey(t.key)
                setActive(null)
              }}
              className={`px-3 py-1.5 text-sm transition-colors ${i > 0 ? 'border-l border-line' : ''} ${
                t.key === key ? 'bg-panel2 font-semibold text-ink' : 'text-ink2 hover:text-ink'
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-8 p-5 lg:grid-cols-[1fr_17rem]">
        <div className="min-w-0">
          <p className="mb-3 h-5 font-mono text-[12.5px] text-ink2" aria-live="polite">
            {active && activeValue !== undefined ? (
              <>
                <span className="text-ink">{monthLabel(active)}</span> · {trader.name} ·{' '}
                <span className="text-ink">{pct(activeValue)}</span>
              </>
            ) : (
              <span className="text-muted">Hover or tap a month for its result.</span>
            )}
          </p>

          <div
            role="grid"
            aria-label={`${trader.name} monthly results, simulated`}
            className="grid gap-[2px] font-mono"
            style={{ gridTemplateColumns: '2.6rem repeat(12, minmax(0, 1fr))' }}
          >
            <span role="presentation" />
            {MONTHS.map((m) => (
              <span key={m} role="columnheader" className="pb-1 text-center text-[10.5px] text-muted">
                <span className="sm:hidden">{m[0]}</span>
                <span className="hidden sm:inline">{m}</span>
              </span>
            ))}
            {years.map((y) => (
              <div key={y} role="row" className="contents">
                <span role="rowheader" className="flex items-center text-[11px] text-muted">
                  {y}
                </span>
                {MONTHS.map((_, mi) => {
                  const k = `${y}-${String(mi + 1).padStart(2, '0')}`
                  const v = trader.monthly[k]
                  if (v === undefined) return <span key={k} role="gridcell" aria-label={`${monthLabel(k)}: no data`} className="h-8 rounded-[3px] bg-panel2/40" />
                  const c = cellColor(v)
                  const isActive = active === k
                  return (
                    <button
                      key={k}
                      type="button"
                      role="gridcell"
                      aria-label={`${monthLabel(k)}: ${pct(v)}`}
                      onMouseEnter={() => setActive(k)}
                      onFocus={() => setActive(k)}
                      onClick={() => setActive(k)}
                      className={`flex h-8 items-center justify-center rounded-[3px] text-[10.5px] leading-none outline-offset-1 ${
                        isActive ? 'ring-2 ring-ink' : ''
                      }`}
                      style={{ background: c.bg, color: c.ink }}
                    >
                      <span className="hidden sm:inline">{cellText(v)}</span>
                    </button>
                  )
                })}
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3 font-mono text-[11px] text-muted">
            <span>−25%</span>
            <span
              className="h-2.5 w-44 rounded-sm"
              style={{
                background: `linear-gradient(to right, rgb(${NEG.join(' ')}), rgb(${MID.join(' ')}), rgb(${POS.join(' ')}))`,
              }}
              aria-hidden="true"
            />
            <span>+25% or more</span>
            <span className="hidden sm:inline">· cell numbers are % for the month</span>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-ink">Average month by market</p>
          <p className="mt-0.5 text-xs text-muted">{trader.name}, same simulation</p>
          <ul className="mt-4 space-y-4">
            {trader.regimes.map((r) => (
              <li key={r.label}>
                <div className="flex items-baseline justify-between text-[13px]">
                  <span className="text-ink2">{r.label}</span>
                  <span className="tabular font-mono text-ink">{pct(r.avgMonth)}</span>
                </div>
                <div className="mt-1.5 h-2 w-full rounded-sm bg-panel2">
                  <div className="h-2 rounded-r-[4px] rounded-l-sm" style={{ width: `${Math.max(2, (r.avgMonth / maxRegime) * 100)}%`, background: BAR }} />
                </div>
                <p className="mt-1 text-[11.5px] text-muted">
                  {r.losing} losing of {r.months} months
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
