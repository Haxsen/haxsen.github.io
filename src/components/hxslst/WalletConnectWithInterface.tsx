'use client'

import { useState } from 'react'
import HxSLSTInterface from './HxSLSTInterface'

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string }) => Promise<string[]>
    }
  }
}

export default function WalletConnectWithInterface() {
  const [isConnecting, setIsConnecting] = useState(false)
  const [account, setAccount] = useState<string | null>(null)

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      setIsConnecting(true)
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        })
        setAccount(accounts[0])
      } catch (error) {
        console.error('Error connecting wallet:', error)
      } finally {
        setIsConnecting(false)
      }
    } else {
      alert('Please install MetaMask or another Ethereum wallet')
    }
  }

  if (account) {
    return <HxSLSTInterface account={account} />
  }

  return (
    <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
      <h3 className="text-xl font-semibold mb-4">hxSLST Interface</h3>
      <button
        onClick={connectWallet}
        disabled={isConnecting}
        className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50"
      >
        {isConnecting ? 'Connecting...' : 'Connect Wallet'}
      </button>
    </div>
  )
}
