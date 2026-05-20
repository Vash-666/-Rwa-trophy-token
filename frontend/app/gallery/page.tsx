'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { Trophy, Search, Filter, Grid3X3, List, Loader2, ExternalLink } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import TrophyCard from '../components/TrophyCard';
import { useReadContract } from 'wagmi';
import { CONTRACT_ADDRESS, TROPHY_NFT_ABI, IS_DEMO_MODE, DEMO_TROPHY } from '../lib/contract';

// Filter options
const filterOptions = [
  { label: 'All Trophies', value: 'all' },
  { label: 'Available', value: 'available' },
  { label: 'Recently Added', value: 'recent' },
];

const sortOptions = [
  { label: 'Newest First', value: 'newest' },
  { label: 'Oldest First', value: 'oldest' },
  { label: 'Name A-Z', value: 'name' },
];

export default function Gallery() {
  const [mounted, setMounted] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeSort, setActiveSort] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: totalSupply, isLoading: isLoadingSupply } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: TROPHY_NFT_ABI,
    functionName: 'totalSupply',
  });

  // Generate token IDs array
  const tokenIds = IS_DEMO_MODE 
    ? [1]
    : (totalSupply ? Array.from({ length: Number(totalSupply) }, (_, i) => i + 1) : []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0C0F1A] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#C9A84C] animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0C0F1A]">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 border-b border-[#2a3142]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-[#C9A84C]/10 text-[#C9A84C] text-sm font-medium mb-4">
              Collection
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold text-[#F5F1E8] font-['Playfair_Display'] mb-4">
              Trophy Gallery
            </h1>
            <p className="text-[#F5F1E8]/60 text-lg">
              Browse our collection of tokenized tennis trophies. Each NFT represents 
              authenticated ownership of a historic physical trophy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="py-6 border-b border-[#2a3142] bg-[#141827]/50 sticky top-16 lg:top-20 z-40">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#F5F1E8]/40" />
              <input
                type="text"
                placeholder="Search trophies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#0C0F1A] border border-[#2a3142] text-[#F5F1E8] placeholder-[#F5F1E8]/40 focus:outline-none focus:border-[#C9A84C]/50 transition-colors"
              />
            </div>

            {/* Filters & View Toggle */}
            <div className="flex items-center gap-3 w-full lg:w-auto">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#0C0F1A] border border-[#2a3142] text-[#F5F1E8]/70 hover:text-[#F5F1E8] hover:border-[#C9A84C]/50 transition-all"
              >
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filters</span>
              </button>

              <div className="flex items-center bg-[#0C0F1A] rounded-xl border border-[#2a3142] p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'grid' 
                      ? 'bg-[#C9A84C]/20 text-[#C9A84C]' 
                      : 'text-[#F5F1E8]/50 hover:text-[#F5F1E8]'
                  }`}
                  aria-label="Grid view"
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'list' 
                      ? 'bg-[#C9A84C]/20 text-[#C9A84C]' 
                      : 'text-[#F5F1E8]/50 hover:text-[#F5F1E8]'
                  }`}
                  aria-label="List view"
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-[#2a3142]"
            >
              <div className="flex flex-wrap gap-6">
                {/* Filter Options */}
                <div>
                  <span className="text-sm text-[#F5F1E8]/50 block mb-2">Filter By</span>
                  <div className="flex flex-wrap gap-2">
                    {filterOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setActiveFilter(option.value)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          activeFilter === option.value
                            ? 'bg-[#C9A84C]/20 text-[#C9A84C] border border-[#C9A84C]/50'
                            : 'bg-[#0C0F1A] text-[#F5F1E8]/70 border border-[#2a3142] hover:border-[#C9A84C]/30'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort Options */}
                <div>
                  <span className="text-sm text-[#F5F1E8]/50 block mb-2">Sort By</span>
                  <div className="flex flex-wrap gap-2">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setActiveSort(option.value)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          activeSort === option.value
                            ? 'bg-[#C9A84C]/20 text-[#C9A84C] border border-[#C9A84C]/50'
                            : 'bg-[#0C0F1A] text-[#F5F1E8]/70 border border-[#2a3142] hover:border-[#C9A84C]/30'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Gallery Content */}
      <section className="section-padding">
        <div className="container-custom">
          {isLoadingSupply && !IS_DEMO_MODE ? (
            <div className="flex flex-col items-center justify-center py-24">
              <Loader2 className="w-12 h-12 text-[#C9A84C] animate-spin mb-4" />
              <span className="text-[#F5F1E8]/60">Loading trophies...</span>
            </div>
          ) : tokenIds.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-24 bg-[#141827]/50 rounded-2xl border border-[#2a3142]"
            >
              <Trophy className="w-20 h-20 text-[#F5F1E8]/20 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-[#F5F1E8] mb-3 font-['Playfair_Display']">
                No Trophies Found
              </h3>
              <p className="text-[#F5F1E8]/60 max-w-md mx-auto mb-6">
                No trophies have been minted yet, or the contract address needs to be configured.
              </p>
              <div className="text-sm text-[#F5F1E8]/40 font-mono">
                Contract: {CONTRACT_ADDRESS}
              </div>
            </motion.div>
          ) : (
            <>
              {/* Results Count */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-[#F5F1E8]/60">
                  Showing <span className="text-[#F5F1E8] font-semibold">{tokenIds.length}</span> trophy{tokenIds.length !== 1 ? 's' : ''}
                </span>
                {IS_DEMO_MODE && (
                  <span className="px-3 py-1 rounded-full bg-[#10B981]/10 text-[#10B981] text-sm">
                    Demo Mode
                  </span>
                )}
              </div>

              {/* Grid/List View */}
              <div className={viewMode === 'grid' 
                ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' 
                : 'space-y-4'
              }>
                {tokenIds.map((tokenId, index) => (
                  <motion.div
                    key={tokenId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <TrophyCard 
                      tokenId={tokenId} 
                      demoTrophy={IS_DEMO_MODE ? DEMO_TROPHY : undefined}
                      viewMode={viewMode}
                    />
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="section-padding border-t border-[#2a3142] bg-[#141827]/30">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-14 h-14 rounded-xl bg-[#C9A84C]/10 flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-7 h-7 text-[#C9A84C]" />
              </div>
              <h3 className="text-lg font-semibold text-[#F5F1E8] mb-2 font-['Playfair_Display']">
                Authenticated Assets
              </h3>
              <p className="text-[#F5F1E8]/60 text-sm">
                Each trophy is verified and authenticated before tokenization.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 rounded-xl bg-[#10B981]/10 flex items-center justify-center mx-auto mb-4">
                <ExternalLink className="w-7 h-7 text-[#10B981]" />
              </div>
              <h3 className="text-lg font-semibold text-[#F5F1E8] mb-2 font-['Playfair_Display']">
                On-Chain Provenance
              </h3>
              <p className="text-[#F5F1E8]/60 text-sm">
                Complete ownership history recorded on the blockchain.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 rounded-xl bg-[#60A5FA]/10 flex items-center justify-center mx-auto mb-4">
                <Grid3X3 className="w-7 h-7 text-[#60A5FA]" />
              </div>
              <h3 className="text-lg font-semibold text-[#F5F1E8] mb-2 font-['Playfair_Display']">
                Easy Trading
              </h3>
              <p className="text-[#F5F1E8]/60 text-sm">
                Buy, sell, and transfer ownership seamlessly on the blockchain.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
