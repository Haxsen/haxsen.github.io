/** Signed percent with a true minus sign: 0.064 -> "+6.4%", -0.1257 -> "−12.6%". */
export function pct(v: number, digits = 1): string {
  const s = Math.abs(v * 100).toFixed(digits)
  if (Number(s) === 0) return `${s}%`
  return `${v > 0 ? '+' : '−'}${s}%`
}

/** Whole dollars with a true minus sign: 8135.4 -> "$8,135", -1257 -> "−$1,257". */
export function usd(v: number): string {
  const s = `$${Math.round(Math.abs(v)).toLocaleString('en-US')}`
  return v < 0 && Math.round(Math.abs(v)) !== 0 ? `−${s}` : s
}

/** Axis-style dollars: 0 -> "$0", 2500 -> "$2.5k", 150000 -> "$150k". */
export function usdShort(v: number): string {
  const a = Math.abs(v)
  const s = a >= 1000 ? `$${Number((a / 1000).toFixed(a >= 100_000 ? 0 : 1))}k` : `$${Math.round(a)}`
  return v < 0 && a >= 0.5 ? `−${s}` : s
}

export const MONTHS =['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** "2024-03" -> "Mar 2024" */
export function monthLabel(key: string): string {
  const [y, m] = key.split('-')
  return `${MONTHS[Number(m) - 1]} ${y}`
}
