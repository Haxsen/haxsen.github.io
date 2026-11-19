'use client'

import { useState } from 'react'

export default function WalletConnect({ onConnect, account }: { onConnect: (account: string) => void, account: string | null }) {
  const [isConnecting, setIsConnecting] = useState(false)

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      setIsConnecting(true)
      try {
        const accounts = await (window.ethereum?.request as (args: { method: string }) => Promise<string[]>)({
          method: 'eth_requestAccounts'
        }) as string[]
        onConnect(accounts[0])
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
    return (
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-accent rounded-full"></div>
        <span className="text-sm text-ink2">
          {account.slice(0, 6)}...{account.slice(-4)}
        </span>
        <button 
          onClick={() => onConnect('')}
          className="text-sm text-accent hover:underline"
        >
          Disconnect
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={connectWallet}
      disabled={isConnecting}
      className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isConnecting ? 'Connecting...' : 'Connect Wallet'}
    </button>
  )
}
