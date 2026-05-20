# 🏆 Phase 7 — Frontend dApp Requirements Checklist

**Project:** 1947 Tennis Trophy Tokenization
**Current Status:** Phase 7 — Frontend dApp (In Progress)
**Contract:** TrophyNFT.sol (ERC-721) — deployed and tested
**Handoff Target:** @scaffolder (frontend scaffolding)

---

## Overview

This document captures all decisions needed from the project owner before frontend development can proceed. The smart contract is complete — the frontend will be a Next.js dApp that interacts with TrophyNFT.sol via wagmi/ethers.

---

## 🅰️ FEATURE SCOPE — What do you want in the first cut?

> **Recommendation:** Ship a v1 with the core features first, avoid scope creep from later phases.

| # | Feature | Required for v1? | Notes |
|---|---------|-----------------|-------|
| 1 | **Trophy Gallery** — Browse all minted trophies, view metadata, winner lists | ☐ Yes / ☐ No | Core feature — shows the asset |
| 2 | **Trophy Detail Page** — Full view of a single trophy (metadata, winners, custodian, provenance history) | ☐ Yes / ☐ No | Recommended as part of gallery |
| 3 | **Mint Interface** — A form (owner-only) to mint a new trophy NFT via the dApp | ☐ Yes / ☐ No | Already have CLI scripts; dApp makes it accessible |
| 4 | **Custodian Management** — Update the physical custodian from the UI (owner-only) | ☐ Yes / ☐ No | Key RWA feature — ties digital to physical |
| 5 | **Transfer Interface** — A user-friendly way to transfer trophy NFTs between wallets | ☐ Yes / ☐ No | Standard NFT transfer, but for RWAs should be deliberate |
| 6 | **Provenance Timeline** — Visual timeline showing mint, transfers, custodian changes | ☐ Yes / ☐ No | Nice-to-have v1, stronger for RWA trust |
| 7 | **Winner History Viewer** — Browse/scroll the full 77-year winner list on-chain | ☐ Yes / ☐ No | The trophy's story — museum-like UX opportunity |

### Default v1 recommendation (if unsure):

| Feature | Priority |
|---------|----------|
| Trophy Gallery + Detail Page | **🏆 Must-have** |
| Transfer Interface | **🏆 Must-have** |
| Custodian Management | **✅ Recommended** |
| Mint Interface | **⏩ Defer** (CLI works for owner-only action) |
| Provenance Timeline | **⏩ Defer** to v1.5 |
| Winner History Viewer | **✅ Bundle** with detail page |

---

## 🅱️ NETWORK TARGET — Where does the frontend connect?

| Option | Description | Advice |
|--------|-------------|--------|
| **Sepolia Testnet (recommended)** | Live testnet, free ETH from faucets, safe for development/QA | ✅ Best for Phase 7 — allows real testing without risk |
| **Local Hardhat Node** | `npx hardhat node` + local deployment | Good for dev iteration, not for sharing/demoing |
| **Mainnet-ready** | Support configurable RPC, switch between networks easily | Build this regardless — just default to Sepolia |

> **Question:** Should the frontend target Sepolia as default, with a network switcher for future mainnet?

**Default recommendation:** Sepolia testnet default + network switcher widget.

---

## 🅲 WALLET INTEGRATION — Which wallets to support?

| Wallet | Effort | Recommendation |
|--------|--------|---------------|
| **MetaMask** | Standard (wagmi built-in) | ✅ **Yes — baseline** |
| **WalletConnect** | Medium (modal libraries) | ✅ Recommended — covers all mobile wallets |
| **Coinbase Wallet** | Low (wagmi built-in) | ✅ Nice-to-have, zero additional code with RainbowKit |
| **RainbowKit / ConnectKit** | Framework choice | ✅ Use RainbowKit — handles all three above automatically |

> **Question:** MetaMask-only for fastest delivery, or use RainbowKit/WalletConnect for broader wallet support?

**Default recommendation:** RainbowKit with MetaMask + WalletConnect + Coinbase Wallet.

---

## 🅳 DESIGN & BRANDING — How should it look?

| # | Question | Options |
|---|----------|---------|
| 1 | **Any brand guidelines?** | Logo files, color palette, fonts? |
| 2 | **Preferred design style?** | Modern/dark/minimalist, classic/heritage/timeline, sporty/youthful |
| 3 | **Reference sites?** | Any dApps or museum sites you like the look of? |
| 4 | **Trophy imagery?** | Do you have high-res photos of the physical trophy to use in the UI? |
| 5 | **Should the dApp feel "museum-like" or "DeFi-dashboard-like"?** | Museum = rich imagery, timeline, narrative. Dashboard = tables, actions, efficiency. |

### Default design direction (if unsure):

```
Style:     Dark theme with tennis-green accents (#2E7D32 / #4CAF50)
Font:      Inter (clean, modern)
Vibe:      "Digital museum" — the trophy is the hero, winner list is storytelling
Layout:    Centered max-width, card-based gallery, full-width trophy detail
```

---

## 🅴 TIMELINE — How fast do you need this?

> Helps decide if we build from scratch, use a template, or scaffold minimal.

| Timeline | Approach |
|----------|----------|
| **ASAP (this week)** | Minimal scaffold: gallery + transfer only. Use Tailwind starter template. Skip animations, polish. |
| **2-3 weeks** | Full features: gallery, detail, transfer, custodian UI. Some polish. |
| **1 month+** | Everything: animations, Provenance timeline, mobile-responsive, responsive design, QA testing. |

> **Question:** What's the target delivery date for Phase 7?

---

## 🅵 RWA INTEGRATION (Phase 8) — Include now or later?

> Phase 8 includes: physical custody docs, QR code generation, legal wrapper research.

| Approach | Pro | Con |
|----------|-----|-----|
| **Include now** | Everything ready at once | Slows Phase 7 delivery; some deliverables (legal) may block |
| **Defer to Phase 8** | Fast frontend launch | Need to refactor frontend later to add QR/link features |

> **Question:** Should Phase 8 features (QR generation, custody certificate download) be part of this frontend build, or kept separate?

**Default recommendation:** Defer to Phase 8. Build Phase 7 clean and modular so Phase 8 slots in easily.

---

## 🅶 HOSTING — Where will the dApp live?

| Option | Effort | Cost | Notes |
|--------|--------|------|-------|
| **Vercel** | Zero config | Free tier | Best for Next.js, automatic deploys from GitHub |
| **Netlify** | Low config | Free tier | Good alternative, needs manual Next.js config |
| **IPFS (Fleek/Filecoin)** | Medium config | Low cost | Fully decentralized, but slower iteration |
| **Self-hosted** | High effort | Server cost | Not recommended for Phase 7 |

> **Question:** Preferred hosting provider?

**Default recommendation:** **Vercel** — zero-config deployment, automatic HTTPS, ideal for Next.js.

---

## 🅷 ADDITIONAL QUESTIONS

1. **Need a custom domain** (e.g., `trophy1947.xyz`) or fine with `vercel.app` subdomain?
2. **Analytics** — Want basic page views or privacy-focused tracking (Plausible/Umami)?
3. **SEO** — Should the site be crawlable/indexable for search engines (for RWA discoverability)?
4. **Mobile-first or desktop-first?** Given the trophy gallery, mobile-friendly is probably important.
5. **Language support?** Single language (English) or multi-language?
6. **Admin panel?** Should there be a separate admin view for owner actions (mint, custodian update)?

---

## ✅ Final Decision Checklist (for you to fill out)

```markdown
### FEATURES (v1)
- [ ] Gallery + Detail Page
- [ ] Transfer Interface
- [ ] Custodian Management
- [ ] Mint Interface
- [ ] Provenance Timeline
- [ ] Winner History Viewer

### NETWORK
- [ ] Sepolia default / Network switcher
- [ ] Local Hardhat node dev support

### WALLETS
- [ ] MetaMask
- [ ] WalletConnect
- [ ] Coinbase Wallet
- [ ] RainbowKit (all three)

### DESIGN
- [ ] Dark theme with tennis green accents
- [ ] Other: _________________

### TIMELINE
- [ ] ASAP (this week)
- [ ] 2-3 weeks
- [ ] 1 month+

### RWA INTEGRATION
- [ ] Include in Phase 7
- [ ] Defer to Phase 8

### HOSTING
- [ ] Vercel
- [ ] Netlify
- [ ] IPFS
- [ ] Other: _________________
```

---

## Summary of decisions needed (4 quick choices):

1. **Features** — Which 3-4 features make v1?
2. **Wallets** — MetaMask only, or full RainbowKit?
3. **Design** — Tennis-dark-museum vibe, or something else?
4. **Timeline** — ASAP, 2 weeks, or 1 month?

Once these are answered, hand off to @scaffolder with full spec.
