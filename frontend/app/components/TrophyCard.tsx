'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Trophy, ExternalLink, Loader2, Users, Calendar, Shield } from 'lucide-react';
import { useReadContract } from 'wagmi';
import { TROPHY_NFT_ABI, TrophyNFT } from '../lib/contract';

interface TrophyCardProps {
  tokenId: number;
  demoTrophy?: TrophyNFT;
  viewMode?: 'grid' | 'list';
}

export default function TrophyCard({ tokenId, demoTrophy, viewMode = 'grid' }: TrophyCardProps) {
  const [,] = useState(false);

  // Use demo data if provided, otherwise fetch from contract
  const { data: trophyData, isLoading: isLoadingData } = useReadContract({
    address: demoTrophy ? undefined : process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: TROPHY_NFT_ABI,
    functionName: 'getTrophyData',
    args: [BigInt(tokenId)],
  });

  const { data: owner, isLoading: isLoadingOwner } = useReadContract({
    address: demoTrophy ? undefined : process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: TROPHY_NFT_ABI,
    functionName: 'ownerOf',
    args: [BigInt(tokenId)],
  });

  const isLoading = isLoadingData || isLoadingOwner;

  // Use demo data or contract data
  const trophy = demoTrophy || (trophyData ? (() => {
    const data = trophyData as unknown as [string, string, bigint, readonly string[], string, string, bigint];
    return {
      tokenId,
      tokenURI: '',
      owner: owner || '0x0000000000000000000000000000000000000000',
      data: {
        name: data[0],
        description: data[1],
        year: data[2],
        winners: data[3],
        material: data[4],
        currentCustodian: data[5],
        mintedAt: data[6],
      }
    };
  })() : null);

  if (isLoading && !demoTrophy) {
    return (
      <div className={`card p-6 flex items-center justify-center ${viewMode === 'list' ? 'h-32' : 'aspect-square'}`}>
        <Loader2 className="w-8 h-8 text-[#C9A84C] animate-spin" />
      </div>
    );
  }

  if (!trophy) {
    return (
      <div className={`card p-6 ${viewMode === 'list' ? 'h-32' : ''}`}>
        <p className="text-[#F5F1E8]/60 text-center">Trophy not found</p>
      </div>
    );
  }

  const truncatedOwner = `${trophy.owner.slice(0, 6)}...${trophy.owner.slice(-4)}`;

  if (viewMode === 'list') {
    return (
      <Link href={`/trophy-detail`}>
        <div className="card card-hover p-4 flex items-center gap-6 group">
          {/* Trophy Image */}
          <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0">
            <img 
              src="/trophy-photo.jpg" 
              alt={trophy.data.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-full bg-[#C9A84C]/10 text-[#C9A84C] text-xs">
                RWA
              </span>
              <span className="text-xs text-[#F5F1E8]/40">
                #{tokenId.toString().padStart(4, '0')}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-[#F5F1E8] group-hover:text-[#C9A84C] transition-colors truncate">
              {trophy.data.name}
            </h3>
            <p className="text-sm text-[#F5F1E8]/60 truncate">
              {trophy.data.description.slice(0, 80)}...
            </p>
          </div>

          {/* Stats */}
          <div className="hidden sm:flex items-center gap-6 text-sm text-[#F5F1E8]/60 shrink-0">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{trophy.data.year.toString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{trophy.data.winners.length} champions</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#10B981]" />
              <span className="text-[#10B981]">Verified</span>
            </div>
          </div>

          {/* Arrow */}
          <ExternalLink className="w-5 h-5 text-[#F5F1E8]/30 group-hover:text-[#C9A84C] transition-colors shrink-0" />
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/trophy-detail`}>
      <div className="card card-hover group h-full flex flex-col">
        {/* Trophy Image */}
        <div className="aspect-square relative overflow-hidden">
          <img 
            src="/trophy-photo.jpg" 
            alt={trophy.data.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0F1A] via-transparent to-transparent opacity-60" />
          
          {/* Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C]/50 text-[#C9A84C] text-xs font-medium">
              RWA
            </span>
          </div>
          
          {/* Token ID */}
          <div className="absolute top-4 right-4">
            <span className="text-xs text-[#F5F1E8]/40 font-mono">
              #{tokenId.toString().padStart(4, '0')}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-lg font-semibold text-[#F5F1E8] group-hover:text-[#C9A84C] transition-colors mb-2 font-['Playfair_Display']">
            {trophy.data.name}
          </h3>
          
          <p className="text-sm text-[#F5F1E8]/60 line-clamp-2 mb-4 flex-1">
            {trophy.data.description}
          </p>

          {/* Stats */}
          <div className="space-y-2 pt-4 border-t border-[#2a3142]">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#F5F1E8]/50">Year</span>
              <span className="text-[#F5F1E8]">{trophy.data.year.toString()}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#F5F1E8]/50">Champions</span>
              <span className="text-[#F5F1E8]">{trophy.data.winners.length}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#F5F1E8]/50">Owner</span>
              <span className="text-[#F5F1E8]/70 font-mono text-xs">{truncatedOwner}</span>
            </div>
          </div>

          {/* Action */}
          <div className="mt-4 pt-4 border-t border-[#2a3142]">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#10B981] flex items-center gap-1">
                <Shield className="w-3 h-3" />
                Verified
              </span>
              <span className="text-[#C9A84C] text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                View Details
                <ExternalLink className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
