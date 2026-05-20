# 🚀 Frontend Setup Guide

## Prerequisites

- Node.js 18+ 
- A deployed TrophyNFT contract on Sepolia testnet
- Wallet with Sepolia testnet ETH

## Step-by-Step Setup

### 1. Get WalletConnect Project ID

1. Go to https://cloud.walletconnect.com
2. Sign up / Sign in
3. Create a new project
4. Copy the Project ID

### 2. Deploy Contract (if not done)

```bash
cd /Users/rohitvashist/.openclaw/workspace/TENNIS-TROPHY-TOKENIZATION

# Set up environment
cp .env.example .env
# Edit .env with your private key and Sepolia RPC

# Deploy to Sepolia
npx hardhat run scripts/deploy.js --network sepolia
```

The deployment will create a `deployment-info.json` file with the contract address.

### 3. Configure Frontend Environment

```bash
cd /Users/rohitvashist/.openclaw/workspace/TENNIS-TROPHY-TOKENIZATION/frontend
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
NEXT_PUBLIC_CONTRACT_ADDRESS=0xYourDeployedContractAddress
```

### 4. Install & Run

```bash
npm install
npm run dev
```

Open http://localhost:3000

### 5. Connect Wallet

1. Install MetaMask (or use Rainbow, Coinbase Wallet, etc.)
2. Switch to Sepolia Testnet
3. Get test ETH: https://sepoliafaucet.com/
4. Click "Connect Wallet" in the app

## Minting a Test Trophy

```bash
cd /Users/rohitvashist/.openclaw/workspace/TENNIS-TROPHY-TOKENIZATION

# Update mint-trophy.js with your contract address if needed
npx hardhat run scripts/mint-trophy.js --network sepolia
```

## Testing Transfer

1. Go to Gallery page
2. Click on a trophy
3. Click "Transfer Trophy" (only visible to owner)
4. Enter recipient address
5. Confirm transaction

## Deployment to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables:
   - `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
   - `NEXT_PUBLIC_CONTRACT_ADDRESS`
4. Deploy!

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Contract not found" | Check contract address in .env.local |
| "Wallet won't connect" | Ensure you're on Sepolia testnet |
| "Transaction failed" | Get more testnet ETH from faucet |
| "Build errors" | Run `npm install` again |

## File Structure

```
frontend/
├── app/
│   ├── components/       # Reusable components
│   ├── gallery/          # Gallery page
│   ├── trophy/[id]/      # Trophy detail page
│   ├── lib/contract.ts   # Contract ABI & config
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── providers.tsx     # Web3 providers
├── .env.local            # Environment variables (gitignored)
├── next.config.mjs       # Next.js config
└── package.json          # Dependencies
```
