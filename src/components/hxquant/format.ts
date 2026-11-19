/** Signed percent with a true minus sign: 0.064 -> "+6.4%", -0.1257 -> "−12.6%". */
export function pct(v: number, digits = 1): string {
  const s = Math.abs(v * 100).toFixed(digits)
  if (Number(s) === 0) return `${s}%`
  return `${v > 0 ? '+' : '−'}${s}%`
}

export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** "2024-03" -> "Mar 2024" */
export function monthLabel(key: string): string {
  const [y, m] = key.split('-')
  return `${MONTHS[Number(m) - 1]} ${y}`
}
