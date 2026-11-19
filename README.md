# haxsen.github.io

Personal site of Hassān Ali, Web3 DevSecOps engineer. Static Next.js export deployed to GitHub Pages.

| Route | What it is |
| --- | --- |
| `/` | Profile: security projects, experience, products, contact |
| `/hxquant` | hxQuant, ML crypto trading engine (simulated results, growth chart, monthly heatmap) |
| `/hxslst` | hxSLST, ERC-4626 liquid-staking vault (in development) |
| `/portfolio` | Redirects to `/` for old links |

## Updating content

- Profile, experience and projects: [`src/data/profile.ts`](src/data/profile.ts). Keep [`CVnew.md`](CVnew.md) in step.
- hxQuant live record: the section is commented out in [`src/app/hxquant/page.tsx`](src/app/hxquant/page.tsx). To show it, uncomment it, re-add the import, and keep `LIVE_RECORD` / `LIVE_AS_OF` in [`src/data/hxquant.ts`](src/data/hxquant.ts) current.
- CV download: [`public/HassanAliWeb3DevSecOpsEngineerCV.pdf`](public/HassanAliWeb3DevSecOpsEngineerCV.pdf).

## Develop

```bash
npm ci
npm run dev      # http://localhost:3000
npm run build    # static export to ./out
```

## Contact

[haxsenmail@gmail.com](mailto:haxsenmail@gmail.com) · [t.me/haxsen](https://t.me/haxsen) · [linkedin.com/in/haxsen](https://www.linkedin.com/in/haxsen/)
