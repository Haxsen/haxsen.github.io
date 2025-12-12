export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade-in">
          {/* <div className="mb-8">
            <div className="w-40 h-40 mx-auto rounded-full bg-gradient-to-r from-primary-500 to-primary-700 p-1">
              <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
                <span className="text-4xl font-bold text-primary-600 dark:text-primary-400">Haxsen</span>
              </div>
            </div>
          </div> */}
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6 animate-slide-up">
            Hassān Ali
          </h1>
          <h2 className="text-2xl sm:text-3xl text-gray-600 dark:text-gray-300 mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Software Engineer
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          Computer & Software Engineer with over 6 years of experience in developing backend web services, scalable infrastructure, and cross-platform apps, working in B2B/B2C/Web3 organizations. An individual who values teamwork and fosters a positive environment. Well-versed in code best practices, software architecture, operations, and production.
          </p>
          <div className="flex justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <a
              href="#contact"
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-primary-500/25"
            >
              Contact Me
          </a>
          <a
              href="#experience"
              className="px-6 py-3 border-2 border-primary-200 dark:border-primary-800 text-primary-600 dark:text-primary-400 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all transform hover:scale-105"
            >
              View Experience
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      {/* <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 relative">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            About Me
          </h2>
          <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            ● Computer & Software Engineer with over 5 years of experience in developing web services, scalable infrastructure 
and cross-platform apps, who has worked in B2B/B2C/Web3 organizations actively transitioning to Blockchain. 
● An individual who owns the company, values and assists the team providing a wonderful environment. 
● Well experienced at code best practices, software architecture, operations and production.
            </p>
          </div>
        </div>
      </section> */}

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Technical Skills
          </h2>
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Programming</h3>
              <p className="text-gray-600 dark:text-gray-300">C#, Python, TypeScript, Java, JavaScript, Go, Rust, Solidity, Move, PHP, Bash/Shell</p>
            </div>

            <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Databases</h3>
              <p className="text-gray-600 dark:text-gray-300">PostgreSQL, MySQL, MongoDB, SQLite</p>
            </div>

            <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Blockchain</h3>
              <p className="text-gray-600 dark:text-gray-300">Wallets, RPC, Webhooks, Tenderly, Execution/Consensus</p>
            </div>

            <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Technologies</h3>
              <p className="text-gray-600 dark:text-gray-300">Agile, Git, Vim/Nano, JetBrains, Postman/HTTPie, REST APIs, Next.js, React, Node.js, .NET, Jira, Unity, Redis</p>
            </div>

            <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">DevOps</h3>
              <p className="text-gray-600 dark:text-gray-300">Docker, AWS, GCP, Terraform, Nginx, GitHub Actions, Rancher, Kubernetes, GitLab/Jenkins CI/CD, Azure</p>
            </div>

            <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Best Practices</h3>
              <p className="text-gray-600 dark:text-gray-300">SOLID Principles, Event-Driven Architecture, Observer, Builder, State Machine Patterns</p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Experience
          </h2>
          <div className="space-y-8">
            {[
              {
                title: 'Software Engineer - Backend/DevOps',
                company: 'Puffer Finance',
                companyUrl: 'https://puffer.fi',
                period: 'Mar 2024 - Present',
                description: 'Designed and implemented full-stack solutions to automate ETH withdrawals, resolving critical liquidity issues.\nSaved over $5,000 monthly by optimizing AWS infrastructure and migrating backend to GCP using Terraform IaC.\nDeveloped a DB access management Slack app for employee approvals.\nManaged 7+ deployments across staging and production (ECS, EC2, Lambda).\nDeployed UniFi Testnet using Optimism L2 rollup, Blockscout, and Docker Compose.',
                tech: 'Python, TypeScript, Node.js, Next.js, Express, PostgreSQL, Docker, AWS (ECS, EC2, Lambda), GCP, Terraform, GitHub Actions CI/CD, Ethers.js, Web3.js, Ethereum, DeFi, EigenLayer, Liquid Staking, Oracles, Multisig, Rollups, Smart Contracts'
              },
              {
                title: 'Software Engineer - Backend/DevOps',
                company: 'Curfluffle',
                companyUrl: 'https://www.worldwar0x.com/',
                period: 'Jan 2023 - Mar 2024',
                description: 'Developed and released World War 0x for PC, WebGL, iOS, and Android platforms.\nLed a team of artists, designers, and developers.\nImproved performance by 135% through runtime optimization.\nEnhanced security with PHP backend and MySQL database.',
                tech: 'Solana Blockchain, Helius RPC, NFTs, PHP, C#, Unity3D, Git, SourceTree, Photon Networking, MySQL, Smart Contracts, Web3 Wallets, DAO, IPFS, Metaplex Core'
              },
              {
                title: 'Computer Engineer - Fullstack',
                company: 'Govt of Pakistan',
                companyUrl: 'https://www.rde.gov.pk/Detail/YzljOTdlZTgtOTUwYi00OGNiLWEzMjgtNDBjN2VhMTExNTU4',
                period: 'Oct 2020 - Jan 2023',
                description: 'Designed 2 simulators (ATGM & Sniper Rifle) with custom Arduino hardware and sensors.\nAchieved 95%+ user satisfaction, saving over $1M.\nIntegrated SQLite database for user stats and leaderboards.',
                tech: 'C++, Arduino IDE, C#, Unity3D, Git, SQL, .NET Framework'
              },
              {
                title: 'Freelance Engineer - Fullstack/Games',
                company: 'Colto SRL',
                companyUrl: 'https://www.colto.com/',
                period: 'Oct 2021 - Jan 2023',
                description: 'Assisted on Love Diana Dressup and CKN Toys CarHero.\nDeveloped Scooby Doo Funfair Scare for Cartoon Network UK.\nReduced loading times by 5x using Addressables, achieving 93% client satisfaction.',
                tech: 'C#, Unity3D, JSLib, Git, SourceTree, Addressables'
              },
              {
                title: 'Intern',
                company: 'Google Summer of Code with XWiki',
                companyUrl: 'https://summerofcode.withgoogle.com/archive/2020/projects/4840319801098240/',
                period: 'May 2020 - Sep 2020',
                description: 'Built GitHub Importer extension for XWiki to import GitHub pages and wikis.\nSupported Markdown with 3 syntax conversions (XWiki, MediaWiki, Creole).\nEnsured backward compatibility with 87% test coverage.',
                tech: 'Java, Git, Jira, Jenkins CI/CD, jQuery, Apache Velocity'
              }
            ].map((exp, index) => (
              <div 
                key={index} 
                className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{exp.title}</h3>
                <p className="text-primary-600 dark:text-primary-400 font-medium">
                  {exp.companyUrl ? (
                    <a
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {exp.company}
                    </a>
                  ) : (
                    exp.company
                  )}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{exp.period}</p>
                <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">{exp.description}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">Technologies: {exp.tech}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: '[Sample] LST Analytics Dashboard',
                description: 'Go backend + Next.js frontend + Terraform infra for Ethereum staking analytics.',
                tech: ['Go', 'Next.js', 'Terraform', 'PostgreSQL', 'AWS'],
                links: [
                  { label: 'Live Website', url: 'https://eth-staking-analytics-frontend.onrender.com/' },
                  { label: 'Source Code', url: 'https://github.com/Haxsen/HxnETHstakingAnalyticsApp' }
                ]
              },
              {
                title: '[Sample] Simple ETH Bank',
                description: 'Solidity contracts with Python/Rust backends for secure blockchain transactions.',
                tech: ['Solidity', 'Python', 'Rust', 'Web3.js', 'Ethereum'],
                links: [
                  { label: 'Contracts', url: 'https://github.com/Haxsen/solidity_blockchain_contracts' },
                  { label: 'Python Backend', url: 'https://github.com/Haxsen/python_rest_api' },
                  { label: 'Rust Backend', url: 'https://github.com/Haxsen/rust_blockchain_service' }
                ]
              },
              {
                title: '[Sample] Trivia Game',
                description: 'Full-stack trivia game with Unity, React frontend, and .NET backend.',
                tech: ['Unity', 'C#', 'React', '.NET', 'SQL'],
                links: [
                  { label: 'Unity + C#', url: 'https://github.com/Haxsen/TriviaGameSampleUnityCSharpDotnet' },
                  { label: 'Frontend ReactJS', url: 'https://github.com/Haxsen/TriviaWebGameFrontend' },
                  { label: 'Backend .NET', url: 'https://github.com/Haxsen/TriviaWebGameBackend' }
                ]
              },
              {
                title: 'Puffer Withdrawal Service',
                description: 'Automated service for calling smart contracts on schedules for secure transactions.',
                tech: ['TypeScript', 'Express', 'Swagger', 'Web3.js', 'AWS ECR + ECS', 'AWS Secrets Manager', 'AWS Load Balancer', 'AWS CloudWatch'],
                links: [
                  { label: 'Documentation', url: 'https://docs.puffer.fi/protocol/overview#puffer-walkthrough-' }
                ]
              },
              {
                title: 'Puffer UniFi',
                description: 'L2 rollup blockchain for scaling Ethereum with focus on security and performance.',
                tech: ['AWS EC2', 'AWS ACM', 'Nginx', 'Docker', 'Optimism L2', 'Blockscout'],
                links: [
                  { label: 'Explorer', url: 'https://testnet-unifi-explorer.puffer.fi/' },
                  { label: 'Website', url: 'https://www.puffer.fi/unifi' }
                ]
              },
              {
                title: 'GitHub Importer',
                description: 'XWiki extension for importing GitHub pages and wikis with multi-syntax support.',
                tech: ['Java', 'Git', 'Jira', 'Jenkins CI/CD', 'jQuery', 'Apache Velocity'],
                links: [
                  { label: 'Source Code', url: 'https://github.com/xwiki-contrib/application-github-importer' }
                ]
              },
              {
                title: 'World War 0x',
                description: 'Cross-platform shooter game with Solana blockchain features and NFTs.',
                tech: ['Solana Blockchain', 'Helius RPC', 'NFTs', 'PHP', 'C#', 'Unity Engine', 'Git', 'SourceTree', 'Photon Networking', 'MySQL', 'Smart Contracts', 'Web3 Wallets', 'DAO', 'IPFS', 'Metaplex Core'],
                links: [
                  { label: 'Website', url: 'https://www.worldwar0x.com/' }
                ]
              },
              {
                title: 'Scooby Doo Funfair Scare',
                description: 'WebGL adventure game developed for Cartoon Network UK.',
                tech: ['C#', 'Unity3D', 'JSLib', 'Git', 'SourceTree', 'Addressables'],
                links: [
                  { label: 'Play Game', url: 'https://www.boomerangtv.co.uk/games/scooby-doo-funfair-scare' }
                ]
              }
            ].map((project, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {project.links && (
                  <div className="mt-4 flex flex-wrap gap-4">
                    {project.links.map((link, i) => (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 underline transition-colors"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Education
          </h2>
          <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Bachelor of Science - Computer Engineering</h3>
            <p className="text-primary-600 dark:text-primary-400 font-medium">National University of Sciences and Technology (NUST), Islamabad, Pakistan</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Contact Me
          </h2>
          <div className="flex justify-center gap-8">
            <a
              href="mailto:haxsenmail@gmail.com"
              className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors transform hover:scale-110"
            >
              <span className="sr-only">Email</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
        </a>
        <a
              href="https://www.linkedin.com/in/haxsen/"
          target="_blank"
          rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors transform hover:scale-110"
            >
              <span className="sr-only">LinkedIn</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3v9zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/>
              </svg>
        </a>
        <a
              href="https://t.me/haxsen"
          target="_blank"
          rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors transform hover:scale-110"
            >
              <span className="sr-only">Telegram</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
            </a>
          </div>
    </div>
      </section>
    </main>
  )
}
