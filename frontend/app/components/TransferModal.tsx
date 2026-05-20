'use client';

import { useState } from 'react';
import { X, Send, Loader2, CheckCircle } from 'lucide-react';
import { useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi';
import { CONTRACT_ADDRESS, TROPHY_NFT_ABI } from '../lib/contract';

interface TransferModalProps {
  tokenId: number;
  onClose: () => void;
}

export default function TransferModal({ tokenId, onClose }: TransferModalProps) {
  const [recipient, setRecipient] = useState('');
  const [error, setError] = useState('');
  const { address } = useAccount();

  const { writeContract, data: hash, isPending } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const handleTransfer = async () => {
    setError('');
    
    if (!recipient || !recipient.startsWith('0x') || recipient.length !== 42) {
      setError('Please enter a valid Ethereum address (0x...)');
      return;
    }

    if (!address) {
      setError('Please connect your wallet first');
      return;
    }

    try {
      writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: TROPHY_NFT_ABI,
        functionName: 'safeTransferFrom',
        args: [address, recipient as `0x${string}`, BigInt(tokenId)],
      });
    } catch {
      setError('Failed to initiate transfer. Please try again.');
    }
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-8 max-w-md w-full text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">Transfer Complete!</h3>
          <p className="text-gray-400 mb-6">
            Trophy #{tokenId} has been successfully transferred.
          </p>
          <div className="space-y-3">
            <a
              href={`https://sepolia.etherscan.io/tx/${hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-xl transition-all"
            >
              View Transaction
            </a>
            <button
              onClick={onClose}
              className="block w-full py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-xl transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Transfer Trophy</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Trophy ID
            </label>
            <p className="text-white font-mono">#{tokenId}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Recipient Address
            </label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="0x..."
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors font-mono"
            />
            <p className="text-xs text-gray-500 mt-2">
              Enter the Ethereum address of the new owner
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {hash && (
            <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <p className="text-green-400 text-sm">Transaction submitted!</p>
              <a
                href={`https://sepolia.etherscan.io/tx/${hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 text-xs underline hover:no-underline"
              >
                View on Etherscan
              </a>
            </div>
          )}

          <button
            onClick={handleTransfer}
            disabled={isPending || isConfirming || !recipient}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all"
          >
            {isPending || isConfirming ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {isConfirming ? 'Confirming...' : 'Sending...'}
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Transfer Trophy
              </>
            )}
          </button>

          <p className="text-xs text-gray-500 text-center">
            This action cannot be undone. Make sure the recipient address is correct.
          </p>
        </div>
      </div>
    </div>
  );
}
