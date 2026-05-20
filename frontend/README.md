# 🏆 Tennis Trophy NFT Frontend

A Next.js 14 dApp for browsing and managing the 1947 Tennis Trophy NFT collection on Sepolia testnet.

## Features

- **Gallery Grid** — Browse all tokenized trophies in a marketplace-style layout
- **Detail View** — Full trophy information with provenance, winners, and custody details
- **Wallet Connection** — RainbowKit integration supporting MetaMask, WalletConnect, and Coinbase Wallet
- **Transfer Functionality** — Transfer trophy ownership to other addresses
- **Ownership History** — View current owner and contract details
- **Custodian Info** — Display physical trophy custody location
- **Mobile Responsive** — Optimized for all screen sizes
- **Dark Theme** — Modern dark UI with tennis-green accents

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Web3:** RainbowKit + wagmi + viem
- **Network:** Sepolia Testnet
- **Icons:** Lucide React

## Quick Start

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Configure Environment Variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your values:

```env
# Get from https://cloud.walletconnect.com
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here

# Your deployed TrophyNFT contract address on Sepolia
NEXT_PUBLIC_CONTRACT_ADDRESS=0xYourContractAddressHere
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Connect Wallet

1. Install MetaMask or another supported wallet
2. Switch to Sepolia Testnet
3. Get test ETH from [Sepolia Faucet](https://sepoliafaucet.com/)
4. Connect your wallet via the "Connect Wallet" button

## Building for Production

```bash
npm run build
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repo to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed to any platform supporting Next.js:
- Netlify
- Railway
- Self-hosted

## Project Structure

```
frontend/
├── app/
│   ├── components/       # React components
│   │   ├── TrophyCard.tsx
│   │   └── TransferModal.tsx
│   ├── lib/
│   │   └── contract.ts   # Contract ABI and config
│   ├── gallery/
│   │   └── page.tsx      # Gallery page
│   ├── trophy/
│   │   └── [id]/
│   │       └── page.tsx  # Trophy detail page
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx          # Home page
│   └── providers.tsx     # RainbowKit/wagmi providers
├── public/               # Static assets
├── .env.local.example
├── next.config.mjs
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Contract Details

The frontend connects to the `TrophyNFT` contract with these key functions:

- `totalSupply()` — Get number of minted trophies
- `ownerOf(tokenId)` — Get current owner
- `getTrophyData(tokenId)` — Get trophy metadata
- `getWinners(tokenId)` — Get winner history
- `safeTransferFrom(to, tokenId)` — Transfer ownership

## Testnet Only

⚠️ **This dApp runs on Sepolia Testnet only.** No real ETH is used. All transactions use testnet ETH which has no monetary value.

## Troubleshooting

### "Contract not found" error
- Make sure you've deployed the contract to Sepolia
- Verify `NEXT_PUBLIC_CONTRACT_ADDRESS` is set correctly
- Check that you're connected to Sepolia network in your wallet

### Wallet won't connect
- Ensure you have a compatible wallet installed
- Check that you're on Sepolia Testnet
- Try refreshing the page

### Transactions failing
- Make sure you have testnet ETH in your wallet
- Get more from [Sepolia Faucet](https://sepoliafaucet.com/)

## Next Steps

1. Deploy the TrophyNFT contract to Sepolia
2. Update the contract address in `.env.local`
3. Mint your first trophy NFT
4. View it in the gallery!

## License

MIT
