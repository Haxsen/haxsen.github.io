# Hassān Ali — Web3 DevSecOps Engineer

📞 [(+92) 317 505 2069](tel:+923175052069) | ✉️ [haxsenmail@gmail.com](mailto:haxsenmail@gmail.com) | 🌐 [haxsen.github.io](https://haxsen.github.io) | 🐙 [github.com/haxsen](https://github.com/haxsen) | 🔗 [LinkedIn](https://www.linkedin.com/in/haxsen/) | 💬 [Telegram](https://t.me/haxsen)
Islamabad, Pakistan · Remote (UTC+5)

## Summary

Web3 DevSecOps engineer with 6+ years building and running production infrastructure, including two years as an SRE at Puffer Finance (EigenLayer liquid restaking). I secure the path from commit to chain: CI/CD security gates for smart contracts (Slither, Mythril, Foundry fuzzing), keyless deployments signed in AWS KMS via GitHub OIDC, policy as code (OPA, Checkov), and hardened Ethereum node infrastructure on Terraform and Kubernetes. I prove controls work with canaries and tests rather than assuming they do.

## Core Skills

- **Smart contract security:** Slither, Mythril, Foundry (fuzz and stateful invariant testing), coverage gates, reentrancy and access-control review, Solidity.
- **CI/CD & supply chain security:** GitHub Actions hardening (`permissions: {}`, SHA pinning, OIDC), TruffleHog, Gitleaks (custom Web3 rules), cosign / Sigstore, zizmor, actionlint, harden-runner, Dependabot / Renovate.
- **Cloud & IaC security:** Terraform, AWS (IAM, KMS, Secrets Manager, WAF, EKS, ECS, EC2, Lambda, S3 Object Lock, EventBridge), GCP, OPA / Conftest, Checkov, TFLint.
- **Web3 infrastructure:** Ethereum execution and consensus clients (geth, Lighthouse), validators and key custody, RPC gateways and rate limiting, Kubernetes NetworkPolicies, OP Stack L2 rollups, Blockscout, multisig, EigenLayer, liquid staking.
- **Languages & platform:** TypeScript, Python, Go, Solidity, Rust, Bash, C#, Java, PHP, SQL · Docker, Kubernetes, Nginx, PostgreSQL, Redis, Grafana, Promtail, Jenkins, GitLab CI.

## Security Engineering Projects (open source)

### [Automated Web3 DevSecOps Pipeline](https://github.com/Haxsen/automated-web3-devsecops-pipeline)
*GitHub Actions, Foundry, Slither, Mythril, TruffleHog, Gitleaks, Checkov, OPA, AWS KMS, OIDC*
- Built a security gauntlet that blocks merges and deploys behind one required check: secret scanning across full git history, Slither and Mythril, 10k-run Foundry fuzzing and invariants, and Checkov, TFLint and OPA on the Terraform.
- Added scanner canaries that feed each tool a known-bad input every run; this exposed Mythril exiting 0 on a crash, which would have left a naive gate green while analysing nothing.
- Made deployments keyless: a non-exportable secp256k1 key in AWS KMS, 15-minute OIDC credentials, and Rego policies enforcing separation of duties between key administration and `kms:Sign`.
- Results: 23/23 Foundry tests at 100% line and branch coverage; 0 Slither and 0 Mythril findings; Checkov 80 passed / 0 failed; 23/23 OPA policy tests.

### [Hardened Ethereum Node Infrastructure (Terraform + EKS)](https://github.com/Haxsen/secure-eth-node-infra---terraform-and-k8s)
*Terraform, AWS EKS, WAFv2, KMS, Secrets Manager, Kubernetes, OpenResty/Lua, geth, Lighthouse, OPA*
- Put a public JSON-RPC behind four layers of defence: AWS WAF, ALB with TLS 1.3, an OpenResty/Lua JSON-RPC firewall (hashed API keys, per-IP and per-tenant rate limits, method allowlist, `eth_getLogs` range caps) and default-deny NetworkPolicies.
- Kept validator keys out of etcd, Terraform state and disk: Secrets Manager + KMS → Secrets Store CSI → tmpfs, with a KMS policy that denies decrypt to all but the validator's IRSA role.
- Prevented slashing with a single-replica StatefulSet, doppelganger protection and a validator that fails closed without its slashing database; isolated signing nodes with no internet egress.
- Results: Checkov 978 checks / 0 failed; 44/44 Rego tests; a mutation test caught 10/10 injected misconfigurations; testing against the real clients caught two bugs that review had missed.

### [Multi-Chain Smart Contract Release & Key Management Engine](https://github.com/Haxsen/automated-multi_chain-smartcontract-release-and-key-management-engine)
*Foundry, Python, Terraform, AWS KMS, IAM OIDC, Secrets Manager, S3 Object Lock, EventBridge, OPA, cosign*
- Deploys one contract to Ethereum, Arbitrum and Optimism at a single CREATE2 address, signed inside an AWS KMS HSM, with an OPA gate on the release plan that runs before any credential is issued.
- Refuses to sign on a wrong chain ID, gas above ceiling or an unpinned signer; verifies live bytecode and owner on-chain and source on Etherscan V2.
- Writes a cosign-signed manifest to an S3 Object Lock (WORM) ledger; a daily drift audit opens incidents, and EventBridge alerts fire on every `kms:Sign` and key-policy change.
- Results: real 3-chain end-to-end release in CI; 69 engine tests, 31 OPA tests, 28 Solidity tests and 4 stateful invariants; Checkov 114 passed / 0 failed.

## Experience

### Haxsen Capital — Founder & Platform Engineer
**Independent | Feb 2026 – Present**
- Open-sourced the three Web3 DevSecOps reference builds above.
- Built hxQuant, an ML crypto trading engine: a research pipeline on seven years of 1-minute market data with walk-forward model training and a 20-check audit of every simulated trade. Live with real money on isolated Bybit sub-accounts since Nov 2026, with paper bots alongside for comparison.
- Designing hxSLST, an ERC-4626 vault that allocates ETH across liquid-staking tokens, and built an LST performance dashboard (Go, Next.js, Terraform).

### [Puffer Finance](https://puffer.fi) — Site Reliability Engineer (Backend / DevOps)
**Remote | Mar 2024 – Feb 2026**
- Designed and shipped the automated ETH withdrawal service that calls protocol contracts on schedule (TypeScript, AWS ECS, Secrets Manager, CloudWatch), resolving a liquidity bottleneck.
- Cut infrastructure cost by $5,000/month by leading the backend migration from AWS to GCP with Terraform.
- Built a Slack app for database access requests with approvals, tightening production access control and audit.
- Ran 7+ services across staging and production (ECS, EC2, Lambda) against 99.9% uptime SLOs.
- Deployed the UniFi testnet: an OP Stack L2 rollup with a Blockscout explorer, on EC2 with Nginx, ACM TLS and Docker Compose.

*Tech: TypeScript, Python, Node.js, PostgreSQL, Docker, AWS, GCP, Terraform, GitHub Actions, Ethers.js, EigenLayer, multisig.*

### [Curfluffle — World War 0x](https://www.worldwar0x.com/) — Software Engineer (Backend / DevOps)
**Remote | Jan 2023 – Mar 2024**
- Built the backend and release infrastructure for World War 0x, a multiplayer shooter with Solana wallet and NFT features, shipped on PC, WebGL, iOS and Android.
- Improved game security by moving logic to a PHP + MySQL backend server.
- Raised runtime performance 135% through profiling and optimisation; led a team of four.

### Government of Pakistan (R&D) — Computer Engineer (Full-stack)
**Hybrid | Oct 2020 – Jan 2023**
- Designed two weapon-training simulators (ATGM and sniper rifle) with custom Arduino and MPU6050 sensor hardware; inducted into service, saving over $1M, with 95%+ user satisfaction.

### [Colto SRL](https://www.colto.com/) — Freelance Engineer
**Remote, part-time | Oct 2021 – Jan 2023**
- Developed Scooby-Doo Funfair Scare for Cartoon Network UK; cut load times about 5x with Addressables.

### [Google Summer of Code — XWiki](https://summerofcode.withgoogle.com/archive/2020/projects/4840319801098240/) — Open-source Contributor
**Remote | May – Sep 2020**
- Built the GitHub Importer extension (Java) with Jenkins CI and 87% test coverage.

## Other Projects

- **[LST Analytics Dashboard](https://eth-staking-analytics-frontend.onrender.com/)**: Ethereum liquid-staking token tracker. Go, Next.js, Terraform. [Source](https://github.com/Haxsen/HxnETHstakingAnalyticsApp)
- **[Puffer UniFi testnet](https://testnet-unifi-explorer.puffer.fi/)**: OP Stack L2 rollup and Blockscout explorer, deployed and operated.
- **[hxQuant](https://haxsen.github.io/hxquant)** and **[hxSLST](https://haxsen.github.io/hxslst)**: my trading and liquid-staking products.
- **Simple Bank**: Solidity contracts with Python and Rust backends. [Contracts](https://github.com/Haxsen/solidity_blockchain_contracts) · [Python](https://github.com/Haxsen/python_rest_api) · [Rust](https://github.com/Haxsen/rust_blockchain_service)

## Education

**BSc Computer Engineering** — National University of Sciences and Technology (NUST), Islamabad, Pakistan
