'use client'

import { useState, useEffect } from 'react'

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>
    }
  }
}

const CONTRACT_ADDRESS = '0xac5b65150c6265b300f231036f684921deaa95d2'

export default function HxSLSTInterface({ account }: { account: string }) {
  const [balance, setBalance] = useState<string>('0')
  const [depositAmount, setDepositAmount] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [txStatus, setTxStatus] = useState<string>('')

  useEffect(() => {
    if (account) {
      fetchBalance()
    }
  }, [account])

  const fetchBalance = async () => {
    if (!account) return
    
    try {
      const result = await window.ethereum?.request({
        method: 'eth_call',
        params: [
          {
            to: CONTRACT_ADDRESS,
            data: '0x70a08231' + account.slice(2).padStart(64, '0') // balanceOf(address)
          },
          'latest'
        ]
      })
      
      if (result) {
        const balanceWei = parseInt(result, 16)
        setBalance((balanceWei / 1e18).toFixed(6))
      }
    } catch (error) {
      console.error('Error fetching balance:', error)
    }
  }

  const deposit = async () => {
    if (!account || !depositAmount) return
    
    setIsLoading(true)
    setTxStatus('Depositing...')
    
    try {
      const amountWei = (parseFloat(depositAmount) * 1e18).toString(16).padStart(64, '0')
      const minShares = '0' // Accept any amount of shares
      
      const txHash = await window.ethereum?.request({
        method: 'eth_sendTransaction',
        params: [
          {
            to: CONTRACT_ADDRESS,
            from: account,
            value: '0x' + amountWei,
            data: '0xa0b3d800' + account.slice(2).padStart(64, '0') + minShares.padStart(64, '0') // depositETH(address,uint256)
          }
        ]
      })
      
      setTxStatus(`Transaction sent: ${txHash}`)
      
      // Wait for confirmation
      let receipt = null
      while (!receipt) {
        receipt = await window.ethereum?.request({
          method: 'eth_getTransactionReceipt',
          params: [txHash]
        })
        await new Promise(resolve => setTimeout(resolve, 2000))
      }
      
      if (receipt && receipt.status === '0x1') {
        setTxStatus('Deposit confirmed!')
        fetchBalance()
        setDepositAmount('')
      } else {
        setTxStatus('Transaction failed')
      }
    } catch (error) {
      console.error('Deposit error:', error)
      setTxStatus('Deposit failed')
    } finally {
      setIsLoading(false)
    }
  }

  const withdrawAll = async () => {
    if (!account) return
    
    setIsLoading(true)
    setTxStatus('Withdrawing...')
    
    try {
      const balanceResult = await window.ethereum?.request({
        method: 'eth_call',
        params: [
          {
            to: CONTRACT_ADDRESS,
            data: '0x70a08231' + account.slice(2).padStart(64, '0')
          },
          'latest'
        ]
      })
      
      const balanceWei = balanceResult ? parseInt(balanceResult, 16) : 0
      if (balanceWei === 0) {
        setTxStatus('No hxSLST to withdraw')
        setIsLoading(false)
        return
      }
      
      const amountHex = balanceWei.toString(16).padStart(64, '0')
      
      const txHash = await window.ethereum?.request({
        method: 'eth_sendTransaction',
        params: [
          {
            to: CONTRACT_ADDRESS,
            from: account,
            data: '0x2e1a7d4d' + amountHex // withdrawLSTs(uint256)
          }
        ]
      })
      
      setTxStatus(`Withdrawal sent: ${txHash}`)
      
      // Wait for confirmation
      let receipt = null
      while (!receipt) {
        receipt = await window.ethereum?.request({
          method: 'eth_getTransactionReceipt',
          params: [txHash]
        })
        await new Promise(resolve => setTimeout(resolve, 2000))
      }
      
      if (receipt && receipt.status === '0x1') {
        setTxStatus('Withdrawal confirmed! You received tETH + ankrETH tokens')
        fetchBalance()
      } else {
        setTxStatus('Transaction failed')
      }
    } catch (error) {
      console.error('Withdraw error:', error)
      setTxStatus('Withdrawal failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
      <h3 className="text-xl font-semibold mb-4">hxSLST Interface</h3>
      
      <div className="mb-4">
        <p className="text-sm text-gray-400">Your hxSLST Balance</p>
        <p className="text-2xl font-bold text-blue-400">{balance} hxSLST</p>
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-400 mb-2">Deposit ETH</label>
        <input
          type="number"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
          placeholder="0.0"
          step="0.001"
          className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={deposit}
          disabled={isLoading || !depositAmount}
          className="w-full mt-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all disabled:opacity-50"
        >
          {isLoading ? 'Processing...' : 'Deposit ETH'}
        </button>
      </div>

      <div className="mb-4">
        <button
          onClick={withdrawAll}
          disabled={isLoading || balance === '0'}
          className="w-full px-4 py-2 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg hover:from-red-700 hover:to-orange-700 transition-all disabled:opacity-50"
        >
          {isLoading ? 'Processing...' : 'Withdraw All hxSLST'}
        </button>
        <p className="text-xs text-gray-500 mt-1">Receives tETH + ankrETH tokens</p>
      </div>

      {txStatus && (
        <div className="mt-4 p-3 bg-slate-900 rounded-lg border border-slate-600">
          <p className="text-sm text-gray-300">{txStatus}</p>
        </div>
      )}
    </div>
  )
}
