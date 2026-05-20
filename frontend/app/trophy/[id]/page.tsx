'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { Trophy, ArrowLeft, MapPin, Calendar, User, Shield, Loader2, ExternalLink, Send } from 'lucide-react';
import { useReadContract, useAccount } from 'wagmi';
import { CONTRACT_ADDRESS, TROPHY_NFT_ABI, TrophyData, IS_DEMO_MODE, DEMO_TROPHY } from '../../lib/contract';
import TransferModal from '../../components/TransferModal';

export default function TrophyDetail() {
  const params = useParams();
  const tokenId = Number(params.id);
  const { address, isConnected } = useAccount();
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: owner } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: TROPHY_NFT_ABI,
    functionName: 'ownerOf',
    args: [BigInt(tokenId)],
  });

  const { data: trophyData } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: TROPHY_NFT_ABI,
    functionName: 'getTrophyData',
    args: [BigInt(tokenId)],
  }) as { data: TrophyData | undefined };

  const { data: winners } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: TROPHY_NFT_ABI,
    functionName: 'getWinners',
    args: [BigInt(tokenId)],
  });

  // Use demo data if in demo mode
  const displayOwner = IS_DEMO_MODE ? DEMO_TROPHY.owner : owner;
  const displayData = IS_DEMO_MODE ? DEMO_TROPHY.data : trophyData;
  const displayWinners = IS_DEMO_MODE ? DEMO_TROPHY.data.winners : winners;

  const isOwner = address && displayOwner && address.toLowerCase() === (displayOwner as string).toLowerCase();
  const isLoading = !IS_DEMO_MODE && !trophyData;

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-green-500 animate-spin" />
      </div>
    );
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-950">
        <nav className="border-b border-gray-800 bg-gray-950/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center gap-2">
                <Trophy className="w-8 h-8 text-green-500" />
                <span className="text-xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                  Tennis Trophy NFT
                </span>
              </Link>
              <ConnectButton />
            </div>
          </div>
        </nav>
        <div className="flex items-center justify-center py-24">
          <Loader2 className="w-8 h-8 text-green-500 animate-spin" />
          <span className="ml-3 text-gray-400">Loading trophy details...</span>
        </div>
      </main>
    );
  }

  const data = displayData;
  const truncatedOwner = displayOwner ? `${(displayOwner as string).slice(0, 6)}...${(displayOwner as string).slice(-4)}` : 'Unknown';

  return (
    <main className="min-h-screen bg-gray-950">
      {/* Navigation */}
      <nav className="border-b border-gray-800 bg-gray-950/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <Trophy className="w-8 h-8 text-green-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                Tennis Trophy NFT
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <Link 
                href="/gallery" 
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Gallery</span>
              </Link>
              <ConnectButton />
            </div>
          </div>
        </div>
      </nav>

      {/* Trophy Detail Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Image */}
          <div className="space-y-6">
            <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl flex items-center justify-center relative overflow-hidden border border-gray-800">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-900/20 via-transparent to-transparent z-10" />
              <Trophy className="w-40 h-40 text-yellow-500/50 relative z-20" />
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-900/50 rounded-xl p-4 text-center border border-gray-800">
                <Calendar className="w-5 h-5 text-green-500 mx-auto mb-2" />
                <p className="text-xs text-gray-500 mb-1">Year</p>
                <p className="text-white font-semibold">{data?.year?.toString()}</p>
              </div>
              <div className="bg-gray-900/50 rounded-xl p-4 text-center border border-gray-800">
                <Trophy className="w-5 h-5 text-green-500 mx-auto mb-2" />
                <p className="text-xs text-gray-500 mb-1">Material</p>
                <p className="text-white font-semibold text-sm">{data?.material?.split(',')[0]}</p>
              </div>
              <div className="bg-gray-900/50 rounded-xl p-4 text-center border border-gray-800">
                <User className="w-5 h-5 text-green-500 mx-auto mb-2" />
                <p className="text-xs text-gray-500 mb-1">Winners</p>
                <p className="text-white font-semibold">{displayWinners?.length || 0}</p>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-sm font-medium border border-green-500/20">
                  #{tokenId.toString().padStart(3, '0')}
                </span>
                <span className="px-3 py-1 rounded-full bg-gray-800 text-gray-400 text-sm font-medium border border-gray-700">
                  Sepolia Testnet
                </span>
              </div>
              <h1 className="text-4xl font-bold text-white mb-4">{data?.name}</h1>
              <p className="text-gray-400 text-lg leading-relaxed">{data?.description}</p>
            </div>

            {/* Ownership Card */}
            <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-500" />
                Ownership
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Current Owner</span>
                  <a 
                    href={`https://sepolia.etherscan.io/address/${displayOwner}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-green-400 hover:text-green-300 font-mono"
                  >
                    {truncatedOwner}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Token ID</span>
                  <span className="text-white font-mono">{tokenId}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Contract</span>
                  <a 
                    href={`https://sepolia.etherscan.io/address/${CONTRACT_ADDRESS}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-green-400 hover:text-green-300 font-mono text-sm"
                  >
                    {CONTRACT_ADDRESS.slice(0, 6)}...{CONTRACT_ADDRESS.slice(-4)}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Custodian Info */}
            <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-green-500" />
                Physical Custody
              </h3>
              <p className="text-gray-400 mb-2">Current custodian of the physical trophy:</p>
              <p className="text-white font-medium text-lg">{data?.currentCustodian}</p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4">
              {isOwner ? (
                <button
                  onClick={() => setShowTransferModal(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-xl transition-all"
                >
                  <Send className="w-5 h-5" />
                  Transfer Trophy
                </button>
              ) : (
                <div className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-gray-400 font-semibold rounded-xl cursor-not-allowed">
                  <Shield className="w-5 h-5" />
                  Connect owner wallet to transfer
                </div>
              )}
              <a
                href={`https://sepolia.etherscan.io/token/${CONTRACT_ADDRESS}?a=${tokenId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-xl transition-all border border-gray-700"
              >
                <ExternalLink className="w-5 h-5" />
                View on Etherscan
              </a>
            </div>

            {!isConnected && (
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                <p className="text-yellow-400 text-sm">
                  Connect your wallet to see transfer options and ownership details.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Winners Section */}
        {displayWinners && displayWinners.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-6">Winner History</h2>
            <div className="bg-gray-900/50 rounded-2xl border border-gray-800 overflow-hidden">
              <div className="max-h-96 overflow-y-auto">
                <table className="w-full">
                  <thead className="bg-gray-800 sticky top-0">
                    <tr>
                      <th className="text-left text-gray-400 font-medium py-3 px-6">#</th>
                      <th className="text-left text-gray-400 font-medium py-3 px-6">Champion</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {displayWinners.slice(0, 10).map((winner, index) => (
                      <tr key={index} className="hover:bg-gray-800/50">
                        <td className="py-3 px-6 text-gray-500 font-mono">{index + 1}</td>
                        <td className="py-3 px-6 text-white">{winner}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {displayWinners.length > 10 && (
                  <div className="p-4 text-center text-gray-500 text-sm">
                    + {displayWinners.length - 10} more champions
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Transfer Modal */}
      {showTransferModal && (
        <TransferModal 
          tokenId={tokenId} 
          onClose={() => setShowTransferModal(false)} 
        />
      )}
    </main>
  );
}
