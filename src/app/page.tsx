'use client'

import { useState } from 'react'
import Image from 'next/image'
import WalletConnect from '@/components/WalletConnect'
import HxSLSTInterface from '@/components/HxSLSTInterface'

export default function Home() {
  const [account, setAccount] = useState<string | null>(null)
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="mb-4 mt-12 relative flex justify-center">
            <Image 
              src="https://raw.githubusercontent.com/Haxsen/haxsen.github.io/refs/heads/master/hxSLST.svg" 
              alt="hxSLST Logo" 
              width={80}
              height={80}
              className="rounded-md"
            />
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            HaxsensSmartLST
          </h1>
          
          <h2 className="text-xl sm:text-2xl text-gray-300 mb-8">
            One token. The best staking yields. Zero effort.
          </h2>
          
          <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Invest your ETH into our secure vault system and earn optimized yields through 
            strategic DeFi protocols. Built with security, transparency, and efficiency at its core.
          </p>
          
          <div className="bg-slate-800/50 backdrop-blur-sm p-4 rounded-xl border border-slate-700 mb-8 max-w-2xl mx-auto">
            <p className="text-sm text-gray-500 mb-2">Contract Address</p>
            <p className="text-xs text-gray-400 font-mono break-all">0xac5b65150c6265b300f231036f684921deaa95d2</p>
            <p className="text-sm text-blue-400 mt-2">HaxsensSmartLST (hxSLST)</p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
            <WalletConnect onConnect={setAccount} account={account} />
            <a
              href="https://eth-staking-analytics-frontend.onrender.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border-2 border-blue-500 text-blue-400 rounded-xl hover:bg-blue-500/10 transition-all transform hover:scale-105 font-semibold text-lg"
            >
              View Dashboard
            </a>
          </div>
          
          {account && (
            <div className="max-w-md mx-auto mb-8">
              <HxSLSTInterface account={account} />
            </div>
          )}
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700">
              <div className="text-3xl font-bold text-green-400 mb-2">APY: 4%+</div>
              <div className="text-gray-400">Annual Percentage Yield</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700">
              <div className="text-3xl font-bold text-blue-400 mb-2">tETH + ankrETH</div>
              <div className="text-gray-400">Underlying Assets</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700">
              <div className="text-3xl font-bold text-purple-400 mb-2">ERC-4626</div>
              <div className="text-gray-400">Vault Standard</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">1. Deposit ETH</h3>
              <p className="text-gray-400">Connect your wallet and deposit Ether into the vault</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">2. Receive smartLST</h3>
              <p className="text-gray-400">Get smartLST shares representing your deposit</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">3. Auto-Optimized</h3>
              <p className="text-gray-400">Brain service optimizes yields through rebalancing</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">4. Withdraw Anytime</h3>
              <p className="text-gray-400">Withdraw your funds plus earnings at any time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Why Choose SmartLST?</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate-900/50 p-8 rounded-xl border border-slate-700 hover:border-blue-500 transition-colors">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Dual Strategy</h3>
              <p className="text-sm text-gray-400">Don&apos;t have ETH? Get started with just 0.01 ETH.</p>
              <p className="text-gray-400">tETH stability + ankrETH alpha for optimized returns</p>
            </div>
            
            <div className="bg-slate-900/50 p-8 rounded-xl border border-slate-700 hover:border-blue-500 transition-colors">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Auto-Rebalancing</h3>
              <p className="text-gray-400">Brain service optimizes yields through strategic rebalancing</p>
            </div>
            
            <div className="bg-slate-900/50 p-8 rounded-xl border border-slate-700 hover:border-blue-500 transition-colors">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">MEV Protection</h3>
              <p className="text-gray-400">Milkman integration protects against front-running attacks</p>
            </div>
            
            <div className="bg-slate-900/50 p-8 rounded-xl border border-slate-700 hover:border-blue-500 transition-colors">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Gas Optimized</h3>
              <p className="text-gray-400">Low gas fees through batch operations and efficient design</p>
            </div>
            
            <div className="bg-slate-900/50 p-8 rounded-xl border border-slate-700 hover:border-blue-500 transition-colors">
              <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-time Analytics</h3>
              <p className="text-gray-400">Track your investments with comprehensive dashboard</p>
            </div>
            
            <div className="bg-slate-900/50 p-8 rounded-xl border border-slate-700 hover:border-blue-500 transition-colors">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Transparent</h3>
              <p className="text-gray-400">All transactions on-chain with full visibility</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect Wallet</h3>
              <p className="text-gray-400">Connect your Ethereum wallet using MetaMask or WalletConnect</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Deposit ETH</h3>
              <p className="text-gray-400">Deposit Ether into the vault with one simple transaction</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Earn Rewards</h3>
              <p className="text-gray-400">Your ETH is automatically deployed to earn yield</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                4
              </div>
              <h3 className="text-xl font-semibold mb-2">Withdraw Anytime</h3>
              <p className="text-gray-400">Withdraw your funds plus earnings at any time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Token Details */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Token Details</h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700">
              <h3 className="text-xl font-semibold mb-4">hxSLST Token</h3>
              <p className="text-gray-400 mb-4">ERC-4626 vault shares representing your deposit</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Name:</span>
                  <span className="text-blue-400">HaxsensSmartLST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Symbol:</span>
                  <span className="text-green-400">hxSLST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Standard:</span>
                  <span className="text-purple-400">ERC-4626</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Asset:</span>
                  <span className="text-yellow-400">ETH</span>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700">
              <h3 className="text-xl font-semibold mb-4">Underlying Assets</h3>
              <p className="text-gray-400 mb-4">Strategic mix of liquid staking tokens</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">tETH:</span>
                  <span className="text-blue-400">100% (start)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">ankrETH:</span>
                  <span className="text-purple-400">Max 60% TVL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Get Started */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Get Started</h2>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Step-by-Step Guide</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Connect Wallet</h4>
                    <p className="text-gray-400">Click &quot;Connect Wallet&quot; and choose MetaMask or WalletConnect</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Deposit ETH</h4>
                    <p className="text-gray-400">Enter amount and confirm transaction. No minimum deposit.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Receive smartLST</h4>
                    <p className="text-gray-400">Get smartLST shares representing your deposit</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Track & Withdraw</h4>
                    <p className="text-gray-400">Monitor growth on dashboard, withdraw anytime</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-6">Wallet Requirements</h3>
              <div className="space-y-4">
                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                  <h4 className="font-semibold mb-2 text-blue-400">Supported Wallets</h4>
                  <ul className="text-gray-400 space-y-1">
                    <li>• MetaMask</li>
                    <li>• WalletConnect</li>
                    <li>• Any ERC-20 compatible wallet</li>
                  </ul>
                </div>
                
                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                  <h4 className="font-semibold mb-2 text-green-400">Requirements</h4>
                  <ul className="text-gray-400 space-y-1">
                    <li>• Ethereum wallet</li>
                    <li>• ETH for gas fees</li>
                    <li>• No minimum deposit</li>
                  </ul>
                </div>
                
                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                  <h4 className="font-semibold mb-2 text-purple-400">Security Tips</h4>
                  <ul className="text-gray-400 space-y-1">
                    <li>• Verify contract address</li>
                    <li>• Never share private keys</li>
                    <li>• Use official website only</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <h3 className="text-xl font-semibold mb-3">What is hxSLST?</h3>
              <p className="text-gray-400">hxSLST is an ERC-4626 vault that optimizes Ethereum staking yields through strategic allocation to tETH and ankrETH tokens.</p>
            </div>
            
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <h3 className="text-xl font-semibold mb-3">How does 4%+ APY work?</h3>
              <p className="text-gray-400">Yield comes from LST appreciation (tETH/ankrETH staking rewards) plus arbitrage opportunities captured by our Brain service.</p>
            </div>
            
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <h3 className="text-xl font-semibold mb-3">Is my ETH safe?</h3>
              <p className="text-gray-400">Yes. hxSLST uses audited contracts, MEV protection via Milkman, and multi-signature controls. Underlying LSTs are from established protocols.</p>
            </div>
            
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <h3 className="text-xl font-semibold mb-3">Can I withdraw anytime?</h3>
              <p className="text-gray-400">Yes. You can withdraw your funds plus earned yields at any time without lockup periods.</p>
            </div>
            
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <h3 className="text-xl font-semibold mb-3">What are the risks?</h3>
              <p className="text-gray-400">Main risks come from underlying LST protocols (tETH and ankrETH). hxSLST adds rebalancing and MEV protection to optimize returns.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Earning?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join hxSLST and earn optimized yields on your ETH.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-8">
            <a
              href="/portfolio"
              className="px-8 py-4 border-2 border-white text-white rounded-xl hover:bg-white/10 transition-all transform hover:scale-105 font-semibold text-lg"
            >
              Built by Hassān Ali
            </a>
          </div>
          <p className="text-sm text-blue-200">
            &quot;<b>hxSLST</b>&quot; is a DeFi protocol. You are trusting the protocol to manage your funds. DYOR/NFA.
          </p>
        </div>
      </section>
    </main>
  )
}