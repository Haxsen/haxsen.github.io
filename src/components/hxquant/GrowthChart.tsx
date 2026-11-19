'use client'

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import type { Trader } from '@/data/hxquant'
import { MONTHS, monthLabel, pct, usd, usdShort } from './format'

// One highlighted trader in the series blue, the others as recessive context lines.
// Four lines in four hues fail the all-pairs colour checks once lines cross, so
// identity comes from the selector, end labels and the tooltip instead.
const FOCUS = '#3987e5'
const CTX = '#4a5562'
const SURFACE = '#10151c'
const STAKE = 10_000

type PeriodKey = 'all' | 'since2023' | 'last12'
const PERIODS: { key: PeriodKey; label: string }[] = [
  { key: 'all', label: 'Since Sep 2020' },
  { key: 'since2023', label: 'Since 2023' },
  { key: 'last12', label: 'Last 12 months' },
]

function niceStep(range: number, target: number) {
  const raw = range / target
  const mag = Math.pow(10, Math.floor(Math.log10(raw)))
  return [1, 2, 2.5, 5, 10].map((x) => x * mag).find((x) => x >= raw) ?? 10 * mag
}

function Seg<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: T
  options: { key: T; label: string }[]
  onChange: (v: T) => void
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-1.5">
      {options.map((o) => (
        <button
          key={o.key}
          type="button"
          aria-pressed={o.key === value}
          onClick={() => onChange(o.key)}
          className={`whitespace-nowrap rounded-md border px-3 py-1.5 text-sm transition-colors ${
            o.key === value ? 'border-ink2/50 bg-panel2 font-semibold text-ink' : 'border-line text-ink2 hover:text-ink'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

export default function GrowthChart({ traders, defaultKey }: { traders: Trader[]; defaultKey?: string }) {
  const [focus, setFocus] = useState(defaultKey ?? traders[0].key)
  const [period, setPeriod] = useState<PeriodKey>('all')
  const [idx, setIdx] = useState<number | null>(null)
  const boxRef = useRef<HTMLDivElement>(null)
  const tipRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ w: 0, h: 0 })
  const [tipW, setTipW] = useState(240)

  useLayoutEffect(() => {
    if (tipRef.current) setTipW(tipRef.current.offsetWidth)
  }, [idx, focus, period])

  useEffect(() => {
    const el = boxRef.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setSize({ w: Math.round(e.contentRect.width), h: Math.round(e.contentRect.height) }))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const months = useMemo(() => Object.keys(traders[0].monthly).sort(), [traders])
  const keys = useMemo(() => {
    if (period === 'last12') return months.slice(-12)
    if (period === 'since2023') return months.filter((k) => k >= '2023-01')
    return months
  }, [months, period])

  // Point j is the boundary after j months: 0 = start ($0), j = end of keys[j - 1].
  const series = useMemo(
    () =>
      traders.map((t) => {
        const vals = keys.map((k) => t.monthly[k] ?? 0)
        let acc = 0
        const pts = [0, ...vals.map((v) => (acc += STAKE * v))]
        const losses = vals.filter((v) => v < 0)
        return {
          t,
          pts,
          total: acc,
          avg: acc / vals.length,
          profitable: vals.filter((v) => v > 0).length,
          worst: STAKE * Math.min(...vals),
          lossSum: STAKE * losses.reduce((a, v) => a + v, 0),
        }
      }),
    [traders, keys],
  )

  const focused = series.find((s) => s.t.key === focus) ?? series[0]
  const others = series.filter((s) => s !== focused)
  const n = keys.length
  const first = monthLabel(keys[0])
  const last = monthLabel(keys[n - 1])

  // ---- geometry
  const { w, h } = size
  const wide = w >= 640
  const m = { l: 50, r: wide ? 156 : 12, t: 12, b: 26 }
  const all = series.flatMap((s) => s.pts)
  const lo = Math.min(0, ...all)
  const hi0 = Math.max(...all)
  const step = niceStep(hi0 - lo || 1, h < 300 ? 3 : 4)
  const hi = Math.ceil((hi0 * 1.04) / step) * step
  const pw = Math.max(1, w - m.l - m.r)
  const ph = Math.max(1, h - m.t - m.b)
  const X = (j: number) => m.l + (pw * j) / n
  const Y = (v: number) => m.t + ph * (1 - (v - lo) / (hi - lo || 1))
  const path = (pts: number[]) => pts.map((v, j) => `${j ? 'L' : 'M'}${X(j).toFixed(1)} ${Y(v).toFixed(1)}`).join('')

  const yTicks: number[] = []
  for (let v = Math.ceil(lo / step) * step; v <= hi + 1e-6; v += step) yTicks.push(v)

  const xCandidates: { j: number; text: string }[] = []
  keys.forEach((k, j) => {
    const mo = Number(k.slice(5, 7))
    if (n > 13) {
      if (mo === 1) xCandidates.push({ j, text: k.slice(0, 4) })
    } else if ((mo - 1) % 3 === 0 || j === 0) {
      xCandidates.push({ j, text: `${MONTHS[mo - 1]} ’${k.slice(2, 4)}` })
    }
  })
  // drop any label that would overlap the one before it (~6.4px per mono character at 10.5px)
  const xTicks: typeof xCandidates = []
  let prevRight = -Infinity
  for (const c of xCandidates) {
    const tw = c.text.length * 6.4
    const left = c.j === 0 ? X(0) : X(c.j) - tw / 2
    if (left < prevRight + 8) continue
    xTicks.push(c)
    prevRight = left + tw
  }

  // end labels, pushed apart so they never overlap
  const ends = series
    .map((s) => ({ s, y: Y(s.total) }))
    .sort((a, b) => a.y - b.y)
    .map((e) => ({ ...e, ly: e.y }))
  for (let i = 1; i < ends.length; i++) if (ends[i].ly - ends[i - 1].ly < 15) ends[i].ly = ends[i - 1].ly + 15

  const jFromX = (clientX: number, rect: DOMRect) => Math.max(0, Math.min(n, Math.round(((clientX - rect.left - m.l) / pw) * n)))

  const tipRows = idx == null ? [] : [...series].sort((a, b) => b.pts[idx] - a.pts[idx])
  // tooltip sits beside the crosshair, flips to the left past mid-chart, and is clamped inside the box
  const cx = idx == null ? 0 : X(idx)
  const tipX = Math.max(4, Math.min(cx > w * 0.55 ? cx - 12 - tipW : cx + 12, w - tipW - 4))

  return (
    <div className="card overflow-hidden">
      <div className="flex flex-col gap-4 border-b border-line p-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-xl">
          <p className="flex items-center gap-2">
            <span className="rounded border border-warn/50 px-1.5 py-0.5 font-mono text-[10.5px] uppercase tracking-wider text-warn">Simulated</span>
            <span className="font-semibold text-ink">Profit from a fresh $10,000 every month</span>
          </p>
          <p className="mt-1 text-sm text-muted">
            Each month starts with $10,000 and the profit is taken out, so nothing compounds. The line adds up those monthly
            profits.
          </p>
        </div>
        <div className="flex flex-col gap-2 lg:items-end">
          <Seg label="Period" value={period} options={PERIODS} onChange={(v) => { setPeriod(v); setIdx(null) }} />
          <Seg
            label="Highlighted trader"
            value={focus}
            options={traders.map((t) => ({ key: t.key, label: t.name }))}
            onChange={setFocus}
          />
        </div>
      </div>

      <div className="p-5">
        <div className="mb-3 flex flex-wrap items-baseline gap-x-5 gap-y-1">
          <p className="text-sm text-ink2">
            <span className="mr-2 inline-block h-[3px] w-4 rounded-sm align-middle" style={{ background: FOCUS }} aria-hidden="true" />
            <span className="font-semibold text-ink">{focused.t.name}</span>{' '}
            <span className="tabular font-mono text-ink">{usd(focused.total)}</span>{' '}
            <span className="text-muted">
              profit, {first} to {last}
            </span>
          </p>
          <p className="text-sm text-muted">
            <span className="mr-2 inline-block h-[3px] w-4 rounded-sm align-middle" style={{ background: CTX }} aria-hidden="true" />
            Other traders
          </p>
        </div>

        <div ref={boxRef} className="relative h-[260px] sm:h-[340px]">
          {w > 0 && h > 0 && (
            <svg
              width={w}
              height={h}
              role="img"
              aria-label={`Cumulative simulated profit from a fresh $10,000 each month, ${first} to ${last}. ${focused.t.name} reaches ${usd(focused.total)}. Totals for every trader are in the table below.`}
              tabIndex={0}
              className="block touch-pan-y select-none rounded outline-offset-2"
              onPointerMove={(e) => setIdx(jFromX(e.clientX, e.currentTarget.getBoundingClientRect()))}
              onPointerDown={(e) => setIdx(jFromX(e.clientX, e.currentTarget.getBoundingClientRect()))}
              onPointerLeave={(e) => {
                // touch fires pointerleave right after a tap; keep the reading until focus moves away
                if (e.pointerType === 'mouse') setIdx(null)
              }}
              onBlur={() => setIdx(null)}
              onKeyDown={(e) => {
                const next =
                  e.key === 'ArrowRight' ? Math.min(n, (idx ?? -1) + 1)
                  : e.key === 'ArrowLeft' ? Math.max(0, (idx ?? n + 1) - 1)
                  : e.key === 'Home' ? 0
                  : e.key === 'End' ? n
                  : null
                if (next != null) {
                  e.preventDefault()
                  setIdx(next)
                }
              }}
            >
              <g className="font-mono" fontSize="10.5" fill="#7a8794">
                {yTicks.map((v) => (
                  <g key={v}>
                    <line x1={m.l} x2={w - m.r} y1={Y(v)} y2={Y(v)} stroke={v === 0 ? '#2c3744' : '#1f2833'} strokeWidth="1" />
                    <text x={m.l - 8} y={Y(v) + 3.5} textAnchor="end">
                      {usdShort(v)}
                    </text>
                  </g>
                ))}
                {xTicks.map(({ j, text }) => (
                  <text key={j} x={X(j)} y={h - 8} textAnchor={j === 0 ? 'start' : 'middle'}>
                    {text}
                  </text>
                ))}
              </g>

              {others.map((s) => (
                <path key={s.t.key} d={path(s.pts)} fill="none" stroke={CTX} strokeWidth="1.5" strokeLinejoin="round" />
              ))}
              <path d={path(focused.pts)} fill="none" stroke={SURFACE} strokeWidth="5" strokeLinejoin="round" />
              <path d={path(focused.pts)} fill="none" stroke={FOCUS} strokeWidth="2" strokeLinejoin="round" />

              {wide &&
                ends.map(({ s, y, ly }) => {
                  const isF = s === focused
                  return (
                    <g key={s.t.key}>
                      <circle cx={X(n)} cy={y} r="3.5" fill={isF ? FOCUS : CTX} stroke={SURFACE} strokeWidth="2" />
                      <text x={X(n) + 9} y={ly + 4} fontSize="11.5" fill={isF ? '#e8edf2' : '#a6b2be'} fontWeight={isF ? 600 : 400}>
                        {s.t.name} <tspan className="font-mono">{usdShort(s.total)}</tspan>
                      </text>
                    </g>
                  )
                })}

              {idx != null && (
                <g pointerEvents="none">
                  <line x1={X(idx)} x2={X(idx)} y1={m.t} y2={h - m.b} stroke="#7a8794" strokeDasharray="3 3" />
                  {others.map((s) => (
                    <circle key={s.t.key} cx={X(idx)} cy={Y(s.pts[idx])} r="3" fill={CTX} stroke={SURFACE} strokeWidth="2" />
                  ))}
                  <circle cx={X(idx)} cy={Y(focused.pts[idx])} r="4.5" fill={FOCUS} stroke={SURFACE} strokeWidth="2" />
                </g>
              )}
            </svg>
          )}

          {idx != null && w > 0 && (
            <div
              ref={tipRef}
              className="pointer-events-none absolute top-2 z-10 w-max max-w-[calc(100%-0.5rem)] rounded-md border border-line bg-panel2/95 px-3 py-2 font-mono text-[11.5px] leading-relaxed text-ink shadow-lg shadow-black/40"
              style={{ left: tipX }}
            >
              <p className="font-sans font-semibold">
                {idx === 0 ? `Start of ${first}` : `End of ${monthLabel(keys[idx - 1])}`}
              </p>
              {tipRows.map((s) => (
                <p key={s.t.key} className="flex items-center gap-2 whitespace-nowrap">
                  <span className="inline-block h-2 w-2 rounded-full" style={{ background: s === focused ? FOCUS : CTX }} aria-hidden="true" />
                  <span className={s === focused ? 'text-ink' : 'text-ink2'}>{s.t.name}</span>
                  <span className="ml-auto pl-3">{usd(s.pts[idx])}</span>
                  {idx > 0 && <span className="w-14 text-right text-muted">{pct(s.t.monthly[keys[idx - 1]] ?? 0)}</span>}
                </p>
              ))}
            </div>
          )}
        </div>
        <p className="sr-only" aria-live="polite">
          {idx != null && idx > 0 ? `End of ${monthLabel(keys[idx - 1])}: ${focused.t.name} ${usd(focused.pts[idx])} profit to date.` : ''}
        </p>
        <p className="mt-2 text-xs text-muted">Hover, tap or use the arrow keys on the chart for each month. Figures in USDT.</p>
      </div>

      <div className="overflow-x-auto border-t border-line">
        <table className="w-full min-w-[720px] text-sm">
          <caption className="sr-only">
            Simulated profit from a fresh $10,000 each month, {first} to {last}
          </caption>
          <thead>
            <tr className="border-b border-line text-left text-[11px] uppercase tracking-wider text-muted">
              <th scope="col" className="px-5 py-3 font-medium">Trader</th>
              <th scope="col" className="px-3 py-3 text-right font-medium">Total profit</th>
              <th scope="col" className="px-3 py-3 text-right font-medium">Average month</th>
              <th scope="col" className="px-3 py-3 text-right font-medium">Profitable months</th>
              <th scope="col" className="px-3 py-3 text-right font-medium">Worst month</th>
              <th scope="col" className="px-5 py-3 text-right font-medium">All losing months</th>
            </tr>
          </thead>
          <tbody className="tabular font-mono text-[13px]">
            {[...series]
              .sort((a, b) => b.total - a.total)
              .map((s) => (
                <tr key={s.t.key} className={`border-b border-line/60 last:border-0 ${s === focused ? 'bg-panel2/60' : ''}`}>
                  <th scope="row" className="px-5 py-3 text-left font-sans font-normal">
                    <span className="flex items-center gap-2">
                      <span className="inline-block h-[3px] w-4 rounded-sm" style={{ background: s === focused ? FOCUS : CTX }} aria-hidden="true" />
                      <span className={`whitespace-nowrap text-ink ${s === focused ? 'font-semibold' : ''}`}>{s.t.name}</span>
                    </span>
                  </th>
                  <td className="px-3 py-3 text-right text-ink">{usd(s.total)}</td>
                  <td className="px-3 py-3 text-right text-ink">{usd(s.avg)}</td>
                  <td className="px-3 py-3 text-right text-ink">
                    {s.profitable} <span className="text-muted">/ {n}</span>
                  </td>
                  <td className="px-3 py-3 text-right text-ink2">{usd(s.worst)}</td>
                  <td className="px-5 py-3 text-right text-ink2">{usd(s.lossSum)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
