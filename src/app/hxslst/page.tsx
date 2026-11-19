import type { Metadata } from 'next'
import HxSLSTLanding from '@/components/hxslst/HxSLSTLanding'

export const metadata: Metadata = {
  title: 'hxSLST · HaxsensSmartLST vault',
  description:
    'HaxsensSmartLST (hxSLST): an ERC-4626 vault that allocates ETH across liquid-staking tokens (tETH, ankrETH) with MEV-protected rebalancing. In development.',
  alternates: { canonical: '/hxslst' },
}

export default function Page() {
  return <HxSLSTLanding />
}
