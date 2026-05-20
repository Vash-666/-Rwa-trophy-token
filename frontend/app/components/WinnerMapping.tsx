'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, ChevronLeft, ChevronRight, Play, Pause, Search, Info } from 'lucide-react';
import { TROPHY_ERAS, Winner, searchWinners } from '../lib/winners';

interface WinnerMappingProps {
  className?: string;
}

// SVG coordinates for winner regions on the trophy
// These are approximate positions for the 4 quadrants
const REGION_COORDS = {
  genesis: { x: 25, y: 25, width: 40, height: 40, labelX: 15, labelY: 15 },
  golden: { x: 65, y: 25, width: 40, height: 40, labelX: 85, labelY: 15 },
  modern: { x: 25, y: 65, width: 40, height: 40, labelX: 15, labelY: 85 },
  contemporary: { x: 65, y: 65, width: 40, height: 40, labelX: 85, labelY: 85 },
};

export default function WinnerMapping({ className = '' }: WinnerMappingProps) {
  const [activeEra, setActiveEra] = useState<string>('genesis');
  const [selectedWinner, setSelectedWinner] = useState<Winner | null>(null);
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredEra, setHoveredEra] = useState<string | null>(null);

  const currentEra = TROPHY_ERAS.find(e => e.id === activeEra) || TROPHY_ERAS[0];
  const searchResults = searchQuery ? searchWinners(searchQuery) : [];

  // Auto-rotate through eras
  useEffect(() => {
    if (!isAutoRotating) return;
    
    const interval = setInterval(() => {
      setActiveEra(prev => {
        const currentIndex = TROPHY_ERAS.findIndex(e => e.id === prev);
        const nextIndex = (currentIndex + 1) % TROPHY_ERAS.length;
        return TROPHY_ERAS[nextIndex].id;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoRotating]);

  const handleEraClick = useCallback((eraId: string) => {
    setActiveEra(eraId);
    setSelectedWinner(null);
    setIsAutoRotating(false);
  }, []);

  const handleWinnerClick = useCallback((winner: Winner) => {
    setSelectedWinner(winner);
    const era = TROPHY_ERAS.find(e => winner.year >= e.yearStart && winner.year <= e.yearEnd);
    if (era) setActiveEra(era.id);
  }, []);

  const navigateEra = (direction: 'prev' | 'next') => {
    const currentIndex = TROPHY_ERAS.findIndex(e => e.id === activeEra);
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % TROPHY_ERAS.length
      : (currentIndex - 1 + TROPHY_ERAS.length) % TROPHY_ERAS.length;
    setActiveEra(TROPHY_ERAS[newIndex].id);
    setSelectedWinner(null);
  };

  return (
    <div className={`${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl lg:text-4xl font-bold text-gradient-gold font-['Playfair_Display'] mb-4">
          Interactive Winner History
        </h2>
        <p className="text-[#F5F1E8]/70 max-w-2xl mx-auto">
          Explore 77+ years of champions. Click on any era to see the winners, 
          or search for a specific year or champion name.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-8 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#F5F1E8]/40" />
        <input
          type="text"
          placeholder="Search by year or champion name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#141827] border border-[#2a3142] text-[#F5F1E8] placeholder-[#F5F1E8]/40 focus:outline-none focus:border-[#C9A84C]/50 transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#F5F1E8]/40 hover:text-[#F5F1E8]"
          >
            ×
          </button>
        )}
      </div>

      {/* Search Results */}
      <AnimatePresence>
        {searchQuery && searchResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="max-w-2xl mx-auto mb-8"
          >
            <div className="bg-[#141827] rounded-xl border border-[#2a3142] p-4 max-h-64 overflow-y-auto">
              <p className="text-sm text-[#F5F1E8]/60 mb-3">
                Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
              </p>
              <div className="space-y-2">
                {searchResults.map((winner) => (
                  <button
                    key={winner.year}
                    onClick={() => handleWinnerClick(winner)}
                    className="w-full text-left p-3 rounded-lg bg-[#0C0F1A] hover:bg-[#C9A84C]/10 border border-[#2a3142] hover:border-[#C9A84C]/30 transition-all"
                  >
                    <span className="text-[#C9A84C] font-semibold">{winner.year}</span>
                    <span className="text-[#F5F1E8] ml-3">{winner.names.join(' & ')}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Trophy Visualization */}
        <div className="relative">
          <div className="aspect-square max-w-lg mx-auto relative">
            {/* Trophy Base/Image */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#141827] to-[#0C0F1A] border border-[#2a3142] overflow-hidden">
              {/* Trophy Image Placeholder with SVG Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Trophy className="w-48 h-48 text-[#C9A84C]/20" />
              </div>
              
              {/* SVG Overlay for Winner Regions */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                {/* Grid Lines */}
                <line x1="50" y1="10" x2="50" y2="90" stroke="#2a3142" strokeWidth="0.5" strokeDasharray="2" />
                <line x1="10" y1="50" x2="90" y2="50" stroke="#2a3142" strokeWidth="0.5" strokeDasharray="2" />
                
                {/* Era Regions */}
                {TROPHY_ERAS.map((era) => {
                  const coords = REGION_COORDS[era.id as keyof typeof REGION_COORDS];
                  const isActive = activeEra === era.id;
                  const isHovered = hoveredEra === era.id;
                  
                  return (
                    <g key={era.id}>
                      {/* Region Rectangle */}
                      <rect
                        x={coords.x}
                        y={coords.y}
                        width={coords.width}
                        height={coords.height}
                        fill={isActive ? `${era.color}20` : `${era.color}05`}
                        stroke={isActive ? era.color : isHovered ? `${era.color}80` : '#2a3142'}
                        strokeWidth={isActive ? 2 : 1}
                        className="cursor-pointer transition-all duration-300"
                        onClick={() => handleEraClick(era.id)}
                        onMouseEnter={() => setHoveredEra(era.id)}
                        onMouseLeave={() => setHoveredEra(null)}
                        rx="4"
                      />
                      
                      {/* Era Label */}
                      <text
                        x={coords.labelX}
                        y={coords.labelY}
                        textAnchor="middle"
                        fill={isActive ? era.color : '#F5F1E8'}
                        fontSize="4"
                        fontWeight={isActive ? 'bold' : 'normal'}
                        className="pointer-events-none"
                      >
                        {era.yearStart}-{era.yearEnd}
                      </text>
                      
                      {/* Era Name */}
                      <text
                        x={coords.x + coords.width / 2}
                        y={coords.y + coords.height / 2}
                        textAnchor="middle"
                        fill={isActive ? '#F5F1E8' : '#F5F1E880'}
                        fontSize="3"
                        className="pointer-events-none"
                      >
                        {era.name}
                      </text>
                      
                      {/* Active Indicator */}
                      {isActive && (
                        <motion.circle
                          layoutId="activeIndicator"
                          cx={coords.x + coords.width - 5}
                          cy={coords.y + 5}
                          r="2"
                          fill={era.color}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      )}
                    </g>
                  );
                })}
                
                {/* Center Decoration */}
                <circle cx="50" cy="50" r="8" fill="#C9A84C20" stroke="#C9A84C" strokeWidth="1" />
                <text x="50" y="51" textAnchor="middle" fill="#C9A84C" fontSize="4" fontWeight="bold">
                  77+
                </text>
              </svg>
            </div>
            
            {/* Auto-rotate Control */}
            <button
              onClick={() => setIsAutoRotating(!isAutoRotating)}
              className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-[#141827] border border-[#2a3142] flex items-center justify-center text-[#C9A84C] hover:bg-[#C9A84C]/10 transition-all"
              aria-label={isAutoRotating ? 'Pause rotation' : 'Auto-rotate'}
            >
              {isAutoRotating ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
          </div>
          
          {/* Era Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={() => navigateEra('prev')}
              className="p-2 rounded-lg bg-[#141827] border border-[#2a3142] text-[#F5F1E8]/60 hover:text-[#C9A84C] hover:border-[#C9A84C]/50 transition-all"
              aria-label="Previous era"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex gap-2">
              {TROPHY_ERAS.map((era) => (
                <button
                  key={era.id}
                  onClick={() => handleEraClick(era.id)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    activeEra === era.id 
                      ? 'bg-[#C9A84C] scale-125' 
                      : 'bg-[#2a3142] hover:bg-[#F5F1E8]/30'
                  }`}
                  aria-label={`Select ${era.name}`}
                />
              ))}
            </div>
            
            <button
              onClick={() => navigateEra('next')}
              className="p-2 rounded-lg bg-[#141827] border border-[#2a3142] text-[#F5F1E8]/60 hover:text-[#C9A84C] hover:border-[#C9A84C]/50 transition-all"
              aria-label="Next era"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Era Details Panel */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentEra.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-[#141827] rounded-2xl border border-[#2a3142] p-6"
            >
              {/* Era Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div 
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-3"
                    style={{ backgroundColor: `${currentEra.color}20`, color: currentEra.color }}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: currentEra.color }} />
                    {currentEra.yearStart}-{currentEra.yearEnd}
                  </div>
                  <h3 className="text-2xl font-bold text-[#F5F1E8] font-['Playfair_Display']">
                    {currentEra.name}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-bold text-gradient-gold">
                    {currentEra.winners.length}
                  </span>
                  <p className="text-sm text-[#F5F1E8]/60">Champions</p>
                </div>
              </div>
              
              <p className="text-[#F5F1E8]/70 mb-6">
                {currentEra.description}
              </p>

              {/* Winners List */}
              <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
                {currentEra.winners.map((winner, index) => (
                  <motion.button
                    key={winner.year}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    onClick={() => handleWinnerClick(winner)}
                    className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all text-left ${
                      selectedWinner?.year === winner.year
                        ? 'bg-[#C9A84C]/20 border border-[#C9A84C]/50'
                        : 'bg-[#0C0F1A] border border-[#2a3142] hover:border-[#C9A84C]/30'
                    }`}
                  >
                    <span 
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-sm font-bold shrink-0"
                      style={{ backgroundColor: `${currentEra.color}20`, color: currentEra.color }}
                    >
                      {winner.year}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[#F5F1E8] font-medium truncate">
                        {winner.names.join(' & ')}
                      </p>
                      {winner.notes && (
                        <p className="text-xs text-[#F5F1E8]/50 truncate">
                          {winner.notes}
                        </p>
                      )}
                    </div>
                    {winner.notes && (
                      <Info className="w-4 h-4 text-[#F5F1E8]/30 shrink-0" />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Selected Winner Detail */}
          <AnimatePresence>
            {selectedWinner && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="bg-gradient-to-br from-[#C9A84C]/20 to-[#C9A84C]/5 rounded-2xl border border-[#C9A84C]/30 p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Trophy className="w-6 h-6 text-[#C9A84C]" />
                  <h4 className="text-lg font-semibold text-[#F5F1E8]">
                    Champion Details
                  </h4>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[#F5F1E8]/60">Year</span>
                    <span className="text-[#C9A84C] font-bold text-xl">{selectedWinner.year}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#F5F1E8]/60">Champions</span>
                    <span className="text-[#F5F1E8] font-medium text-right">
                      {selectedWinner.names.join(' & ')}
                    </span>
                  </div>
                  {selectedWinner.event && (
                    <div className="flex items-center justify-between">
                      <span className="text-[#F5F1E8]/60">Event</span>
                      <span className="text-[#F5F1E8]/80">{selectedWinner.event}</span>
                    </div>
                  )}
                  {selectedWinner.notes && (
                    <div className="pt-3 border-t border-[#C9A84C]/20">
                      <span className="text-[#F5F1E8]/60 text-sm block mb-1">Notes</span>
                      <span className="text-[#F5F1E8]/80 text-sm">{selectedWinner.notes}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
