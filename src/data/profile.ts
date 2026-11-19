// Single source of truth for the home page. CVnew.md mirrors this content in print form.

export const PERSON = {
  name: 'Hassān Ali',
  title: 'Web3 DevSecOps Engineer',
  location: 'Islamabad, Pakistan · Remote (UTC+5)',
  email: 'haxsenmail@gmail.com',
  telegram: 'https://t.me/haxsen',
  linkedin: 'https://www.linkedin.com/in/haxsen/',
  github: 'https://github.com/haxsen',
  site: 'https://haxsen.github.io',
  cvPdf: '/HassanAliWeb3DevSecOpsEngineerCV.pdf',
}

export const HERO_STATS = [
  { value: '6+ yrs', label: 'Production engineering, 3+ of them in Web3' },
  { value: '$5k/mo', label: 'Cloud spend cut by leading an AWS → GCP move in Terraform' },
  { value: '99.9%', label: 'Uptime SLO across 7+ production services at Puffer Finance' },
  { value: '0 keys', label: 'Private keys in my release pipelines: deploys sign inside AWS KMS via OIDC' },
]

export interface SecurityProject {
  id: string
  name: string
  repo: string
  oneLiner: string
  stops: string
  highlights: { title: string; body: string }[]
  verified: string[]
  stack: string[]
}

export const SECURITY_PROJECTS: SecurityProject[] = [
  {
    id: 'pipeline',
    name: 'Automated Web3 DevSecOps Pipeline',
    repo: 'https://github.com/Haxsen/automated-web3-devsecops-pipeline',
    oneLiner:
      'A GitHub Actions security gauntlet for smart contracts and the Terraform that deploys them. One required check, Security gate, blocks every merge and deploy until all gates pass.',
    stops: 'Leaked keys · vulnerable contracts · cloud misconfiguration · poisoned CI',
    highlights: [
      {
        title: 'Scanner canaries',
        body: 'Every run feeds Slither, Mythril and Gitleaks a known-bad input and fails if they miss it. Building them exposed Mythril exiting 0 on a crash: a naive gate would have stayed green while analysing nothing.',
      },
      {
        title: 'Keyless deployments',
        body: 'The deployer’s secp256k1 key is generated inside AWS KMS and can never be exported. CI gets 15-minute credentials through GitHub OIDC and signs inside KMS.',
      },
      {
        title: 'Web3 policy as code',
        body: 'Rego guardrails generic scanners lack: secp256k1 key specs, separation of duties (no principal both administers and signs), exact OIDC subjects with no wildcards.',
      },
      {
        title: 'A pipeline that secures itself',
        body: 'permissions: {} by default, actions pinned to commit SHAs, images by digest, hash-locked Python tooling, harden-runner egress auditing, Dependabot with a cooldown.',
      },
    ],
    verified: [
      '23/23 Foundry tests · 10k-run fuzz · 4 invariants',
      '100% line & branch coverage',
      'Slither 0 findings · canary 3/3',
      'Mythril 0 issues · SWC-107/115 canary',
      'Checkov 80 passed · 0 failed',
      '23/23 OPA policy tests',
    ],
    stack: ['GitHub Actions', 'Foundry', 'Slither', 'Mythril', 'TruffleHog', 'Gitleaks', 'Checkov', 'TFLint', 'OPA / Conftest', 'AWS KMS', 'OIDC', 'zizmor'],
  },
  {
    id: 'node-infra',
    name: 'Hardened Ethereum Node Infrastructure',
    repo: 'https://github.com/Haxsen/secure-eth-node-infra---terraform-and-k8s',
    oneLiner:
      'geth + Lighthouse execution and consensus clients and a validator on AWS EKS, built security-first: a public JSON-RPC behind four layers of DDoS defence, and validator keys that never touch disk in plaintext.',
    stops: 'RPC abuse & DDoS · validator key theft · slashing · lateral movement',
    highlights: [
      {
        title: 'RPC defence in depth',
        body: 'AWS WAF → ALB (TLS 1.3) → an OpenResty/Lua JSON-RPC firewall with hashed API keys, per-IP and per-tenant rate limits, a method allowlist and eth_getLogs range caps → default-deny NetworkPolicies.',
      },
      {
        title: 'Validator key custody',
        body: 'Secrets Manager + KMS → Secrets Store CSI → tmpfs only. The KMS policy denies decrypt to all but the validator’s IRSA role; key custodians can write keys but never read them back.',
      },
      {
        title: 'Slashing protection',
        body: 'Single-replica StatefulSet (a rolling-update surge would double-sign), doppelganger protection, and a validator that fails closed when its slashing database is missing.',
      },
      {
        title: 'Trust zones',
        body: 'Separate system, edge and signing node groups on Bottlerocket with IMDSv2. Signing nodes hold no AWS credentials and have no internet egress.',
      },
    ],
    verified: [
      'Checkov 978 checks · 0 failed',
      '44/44 Rego unit tests',
      'Mutation test: 10/10 misconfigs caught',
      '37/37 RPC gateway tests',
      '24/24 validator key-path tests',
      '74/74 manifests valid (kubeconform)',
    ],
    stack: ['Terraform', 'AWS EKS', 'WAFv2', 'KMS', 'Secrets Manager', 'Kubernetes', 'OpenResty / Lua', 'geth', 'Lighthouse', 'OPA', 'Checkov', 'Bottlerocket'],
  },
  {
    id: 'release-engine',
    name: 'Multi-Chain Release & Key Management Engine',
    repo: 'https://github.com/Haxsen/automated-multi_chain-smartcontract-release-and-key-management-engine',
    oneLiner:
      'Deploys one contract to Ethereum, Arbitrum and Optimism at a single deterministic address, signed inside an AWS KMS HSM, policy-gated before any credential exists, and verified on-chain and on Etherscan.',
    stops: 'Deployer key compromise · wrong-chain signing · tampered releases · silent takeover',
    highlights: [
      {
        title: 'HSM-backed signing',
        body: 'A non-exportable secp256k1 KMS key; Foundry signs through --aws. The key policy denies kms:Sign to everyone except the release role, and key admins cannot sign.',
      },
      {
        title: 'Pre-flight refusal',
        body: 'Chain-id check, gas ceiling, signer pinning, balance check and simulation run before anything is signed. Point an RPC at the wrong chain and the engine refuses to sign.',
      },
      {
        title: 'Tamper-evident releases',
        body: 'Each release writes a manifest + sha256, signed keyless with cosign and stored in an S3 Object Lock (WORM) ledger. Live bytecode is diffed against the build artifact.',
      },
      {
        title: 'Detection & drift',
        body: 'A daily job re-checks bytecode, owner and pause state on every chain and opens an incident on drift. EventBridge → SNS alerts on every kms:Sign and key-policy change.',
      },
    ],
    verified: [
      'Real 3-chain end-to-end release in CI',
      '69 engine tests · 31 OPA tests',
      '28 Solidity tests · 4 stateful invariants',
      'Checkov 114 passed · 0 failed',
      'Idempotent re-runs · drift & wrong-chain tests',
    ],
    stack: ['Foundry', 'Python', 'Terraform', 'AWS KMS', 'IAM OIDC', 'Secrets Manager', 'S3 Object Lock', 'EventBridge', 'OPA', 'cosign / Sigstore', 'Etherscan V2'],
  },
]

export const CAPABILITIES = [
  {
    area: 'Smart contract security',
    items: ['Slither static analysis', 'Mythril symbolic execution', 'Foundry fuzz & invariant testing', 'Coverage gates & inline triage', 'Reentrancy / access-control review'],
  },
  {
    area: 'CI/CD & supply chain',
    items: ['GitHub Actions hardening', 'OIDC, no stored cloud keys', 'TruffleHog & Gitleaks (custom Web3 rules)', 'cosign / Sigstore signing', 'SHA pinning, zizmor, harden-runner'],
  },
  {
    area: 'Cloud & IaC security',
    items: ['Terraform (AWS, GCP)', 'IAM least privilege, KMS, Secrets Manager', 'OPA / Conftest policy as code', 'Checkov, TFLint', 'WAF, private EKS, VPC design'],
  },
  {
    area: 'Web3 infrastructure',
    items: ['Execution & consensus clients, validators', 'RPC gateways & rate limiting', 'Kubernetes NetworkPolicies', 'OP Stack L2 rollups, Blockscout', 'Multisig, EigenLayer, liquid staking'],
  },
]

export const LANGUAGES = ['TypeScript', 'Python', 'Go', 'Solidity', 'Rust', 'Bash', 'C#', 'Java', 'PHP', 'SQL']
export const PLATFORM = ['Docker', 'Kubernetes', 'AWS', 'GCP', 'Azure', 'Nginx', 'PostgreSQL', 'Redis', 'Grafana', 'Promtail', 'Jenkins', 'GitLab CI']

export interface Role {
  company: string
  url?: string
  title: string
  period: string
  mode: string
  bullets: string[]
  tech?: string
}

export const EXPERIENCE: Role[] = [
  {
    company: 'Haxsen Capital',
    title: 'Founder & Platform Engineer',
    period: 'Feb 2026 – Present',
    mode: 'Independent',
    bullets: [
      'Open-sourced three Web3 DevSecOps reference builds: a smart-contract security pipeline, hardened Ethereum node infrastructure on EKS, and a multi-chain KMS release engine.',
      'Built hxQuant, an ML trading engine: a research pipeline on seven years of 1-minute market data with walk-forward training and a 20-check audit of every simulated trade. Live with real money on isolated Bybit sub-accounts since Nov 2026.',
      'Designing hxSLST, an ERC-4626 vault that allocates ETH across liquid-staking tokens, and an LST performance dashboard (Go, Next.js, Terraform).',
    ],
    tech: 'Terraform, AWS, GitHub Actions, Foundry, Solidity, Python, Go, Next.js',
  },
  {
    company: 'Puffer Finance',
    url: 'https://puffer.fi',
    title: 'Site Reliability Engineer · Backend / DevOps',
    period: 'Mar 2024 – Feb 2026',
    mode: 'Remote',
    bullets: [
      'Designed and shipped the automated ETH withdrawal service that calls protocol contracts on schedule (TypeScript, AWS ECS, Secrets Manager, CloudWatch), resolving a liquidity bottleneck.',
      'Cut infrastructure cost by $5,000/month by leading the backend migration from AWS to GCP in Terraform.',
      'Built a Slack app for database access requests with approvals, tightening production access control and audit.',
      'Ran 7+ services across staging and production (ECS, EC2, Lambda) against 99.9% uptime SLOs.',
      'Deployed the UniFi testnet: an OP Stack L2 rollup with a Blockscout explorer, on EC2 with Nginx, ACM TLS and Docker Compose.',
    ],
    tech: 'TypeScript, Python, Node.js, PostgreSQL, Docker, AWS, GCP, Terraform, GitHub Actions, Ethers.js, EigenLayer, multisig',
  },
  {
    company: 'Curfluffle · World War 0x',
    url: 'https://www.worldwar0x.com/',
    title: 'Software Engineer · Backend / DevOps',
    period: 'Jan 2023 – Mar 2024',
    mode: 'Remote',
    bullets: [
      'Built the backend and release infrastructure for World War 0x, a multiplayer shooter with Solana wallet and NFT features, shipped on PC, WebGL, iOS and Android.',
      'Improved game security by moving logic to a PHP + MySQL backend server.',
      'Raised runtime performance 135% through profiling and optimisation; led a team of four.',
    ],
    tech: 'Solana, Helius RPC, Metaplex, IPFS, PHP, MySQL, C#, Unity',
  },
  {
    company: 'Government of Pakistan (R&D)',
    title: 'Computer Engineer · Full-stack',
    period: 'Oct 2020 – Jan 2023',
    mode: 'Hybrid',
    bullets: [
      'Designed two weapon-training simulators (ATGM and sniper rifle) with custom Arduino and MPU6050 sensor hardware; inducted into service, saving over $1M, with 95%+ user satisfaction.',
    ],
    tech: 'C++, C#, Unity, SQLite, Arduino',
  },
  {
    company: 'Colto SRL',
    url: 'https://www.colto.com/',
    title: 'Freelance Engineer',
    period: 'Oct 2021 – Jan 2023',
    mode: 'Remote · Part-time',
    bullets: ['Developed Scooby-Doo Funfair Scare for Cartoon Network UK; cut load times about 5x with Addressables.'],
  },
  {
    company: 'Google Summer of Code · XWiki',
    url: 'https://summerofcode.withgoogle.com/archive/2020/projects/4840319801098240/',
    title: 'Open-source Contributor',
    period: 'May – Sep 2020',
    mode: 'Remote',
    bullets: ['Built the GitHub Importer extension (Java) with Jenkins CI and 87% test coverage.'],
  },
]

export const OTHER_WORK = [
  {
    name: 'LST Analytics Dashboard',
    desc: 'Ethereum liquid-staking token performance tracker. Go backend, Next.js frontend, Terraform infra.',
    links: [
      { label: 'Live', url: 'https://eth-staking-analytics-frontend.onrender.com/' },
      { label: 'Source', url: 'https://github.com/Haxsen/HxnETHstakingAnalyticsApp' },
    ],
  },
  {
    name: 'Puffer UniFi testnet',
    desc: 'OP Stack L2 rollup with a Blockscout explorer, deployed and operated at Puffer Finance.',
    links: [
      { label: 'Explorer', url: 'https://testnet-unifi-explorer.puffer.fi/' },
      { label: 'About', url: 'https://www.puffer.fi/unifi' },
    ],
  },
  {
    name: 'Puffer withdrawal service',
    desc: 'Scheduled smart-contract callers that automate ETH withdrawals for the protocol.',
    links: [{ label: 'Docs', url: 'https://docs.puffer.fi/protocol/overview#puffer-walkthrough-' }],
  },
  {
    name: 'Simple Bank',
    desc: 'Solidity contracts with Python and Rust backend services.',
    links: [
      { label: 'Contracts', url: 'https://github.com/Haxsen/solidity_blockchain_contracts' },
      { label: 'Python', url: 'https://github.com/Haxsen/python_rest_api' },
      { label: 'Rust', url: 'https://github.com/Haxsen/rust_blockchain_service' },
    ],
  },
  {
    name: 'XWiki GitHub Importer',
    desc: 'Google Summer of Code extension that imports GitHub pages and wikis.',
    links: [{ label: 'Source', url: 'https://github.com/xwiki-contrib/application-github-importer' }],
  },
  {
    name: 'World War 0x',
    desc: 'Cross-platform multiplayer shooter with Solana blockchain features.',
    links: [{ label: 'Website', url: 'https://www.worldwar0x.com/' }],
  },
]

export const EDUCATION = {
  degree: 'BSc Computer Engineering',
  school: 'National University of Sciences and Technology (NUST), Islamabad',
}
