'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, ChevronLeft, ChevronRight, Play, Pause, Search, Info, Sparkles } from 'lucide-react';
import { TROPHY_ERAS, Winner, searchWinners } from '../lib/winners';
import TrophyRegionOverlay, { TROPHY_REGIONS } from './TrophyRegionOverlay';
import PointerLine from './PointerLine';
import { useTrophyInteraction } from '../hooks/useTrophyInteraction';

interface WinnerMappingProps {
  className?: string;
}

export default function WinnerMapping({ className = '' }: WinnerMappingProps) {
  const [activeEra, setActiveEra] = useState<string>('genesis');
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const winnerListRef = useRef<HTMLDivElement>(null);
  const eraTabsRef = useRef<HTMLDivElement>(null);

  const {
    activeRegion,
    highlightedRegion,
    selectedWinner,
    pointerLine,
    trophyImageRef,
    handleRegionClick,
    handleRegionHover,
    handleWinnerClick,
    handleEraClick,
    getRegionByEra
  } = useTrophyInteraction({ highlightDuration: 3000 });

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

  const onEraClick = useCallback((eraId: string, e?: React.MouseEvent) => {
    setActiveEra(eraId);
    setIsAutoRotating(false);
    
    // Trigger trophy region highlight
    const element = e?.currentTarget as HTMLElement;
    handleEraClick(eraId, element || null);
  }, [handleEraClick]);

  const onWinnerClick = useCallback((winner: Winner, e: React.MouseEvent) => {
    const era = TROPHY_ERAS.find(e => winner.year >= e.yearStart && winner.year <= e.yearEnd);
    if (era) {
      setActiveEra(era.id);
      const element = e.currentTarget as HTMLElement;
      handleWinnerClick(winner.year, era.id, element);
    }
  }, [handleWinnerClick]);

  const navigateEra = (direction: 'prev' | 'next') => {
    const currentIndex = TROPHY_ERAS.findIndex(e => e.id === activeEra);
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % TROPHY_ERAS.length
      : (currentIndex - 1 + TROPHY_ERAS.length) % TROPHY_ERAS.length;
    const newEraId = TROPHY_ERAS[newIndex].id;
    setActiveEra(newEraId);
    setIsAutoRotating(false);
    
    // Trigger highlight
    const eraTab = eraTabsRef.current?.querySelector(`[data-era="${newEraId}"]`) as HTMLElement;
    if (eraTab) {
      handleEraClick(newEraId, eraTab);
    }
  };

  const getEraColor = (eraId: string) => {
    const region = TROPHY_REGIONS.find(r => r.era === eraId);
    return region?.highlight.color || '#C9A84C';
  };

  return (
    <div className={`${className}`}>
      {/* Pointer Line Animation */}
      <PointerLine
        startElement={pointerLine.startElement}
        endElement={trophyImageRef.current}
        color={pointerLine.color}
        isVisible={pointerLine.isVisible}
      />

      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/30 mb-4"
        >
          <Sparkles className="w-4 h-4 text-[#C9A84C]" />
          <span className="text-[#C9A84C] text-sm font-medium">Interactive Experience</span>
        </motion.div>
        
        <h2 className="text-3xl lg:text-4xl font-bold text-gradient-gold font-['Playfair_Display'] mb-4">
          Interactive Winner History
        </h2>
        <p className="text-[#F5F1E8]/70 max-w-2xl mx-auto">
          Explore 77+ years of champions. Click on any era or winner to see the corresponding 
          section highlighted on the trophy. The connection between history and artifact comes alive.
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
                {searchResults.map((winner) => {
                  const era = TROPHY_ERAS.find(e => winner.year >= e.yearStart && winner.year <= e.yearEnd);
                  const region = getRegionByEra(era?.id || '');
                  return (
                    <button
                      key={winner.year}
                      onClick={(e) => onWinnerClick(winner, e)}
                      className="w-full text-left p-3 rounded-lg bg-[#0C0F1A] hover:bg-[#C9A84C]/10 border border-[#2a3142] hover:border-[#C9A84C]/30 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <span 
                          className="text-sm font-bold w-12"
                          style={{ color: region?.highlight.color || '#C9A84C' }}
                        >
                          {winner.year}
                        </span>
                        <span className="text-[#F5F1E8] flex-1">{winner.names.join(' & ')}</span>
                        <Sparkles className="w-4 h-4 text-[#C9A84C] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Trophy Visualization */}
        <div className="relative" ref={trophyImageRef}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="aspect-square max-w-lg mx-auto relative"
          >
            {/* Trophy Base/Image */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#141827] to-[#0C0F1A] border border-[#2a3142] overflow-hidden">
              {/* Trophy Image */}
              <img
                src="/trophy-photo.jpg"
                alt="Ladies Doubles Championship Trophy"
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              />
              
              {/* Region Overlay */}
              <TrophyRegionOverlay
                activeRegion={activeRegion}
                highlightedRegion={highlightedRegion}
                onRegionClick={handleRegionClick}
                onRegionHover={handleRegionHover}
                className="absolute inset-0"
              />
            </div>
            
            {/* Auto-rotate Control */}
            <button
              onClick={() => setIsAutoRotating(!isAutoRotating)}
              className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-[#141827] border border-[#2a3142] flex items-center justify-center text-[#C9A84C] hover:bg-[#C9A84C]/10 transition-all"
              aria-label={isAutoRotating ? 'Pause rotation' : 'Auto-rotate'}
            >
              {isAutoRotating ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>

            {/* Legend */}
            <div className="absolute top-4 left-4 space-y-2">
              {TROPHY_REGIONS.map((region) => (
                <motion.button
                  key={region.id}
                  onClick={() => onEraClick(region.era)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    activeRegion === region.id || highlightedRegion === region.id
                      ? 'bg-[#141827] shadow-lg'
                      : 'bg-[#141827]/50 hover:bg-[#141827]'
                  }`}
                  style={{
                    borderColor: region.highlight.color,
                    borderWidth: activeRegion === region.id ? '2px' : '1px',
                    color: activeRegion === region.id ? region.highlight.color : '#F5F1E8'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: region.highlight.color }}
                  />
                  {region.years}
                </motion.button>
              ))}
            </div>
          </motion.div>
          
          {/* Era Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={() => navigateEra('prev')}
              className="p-2 rounded-lg bg-[#141827] border border-[#2a3142] text-[#F5F1E8]/60 hover:text-[#C9A84C] hover:border-[#C9A84C]/50 transition-all"
              aria-label="Previous era"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex gap-2" ref={eraTabsRef}>
              {TROPHY_ERAS.map((era) => (
                <button
                  key={era.id}
                  data-era={era.id}
                  onClick={(e) => onEraClick(era.id, e)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    activeEra === era.id 
                      ? 'scale-125' 
                      : 'bg-[#2a3142] hover:bg-[#F5F1E8]/30'
                  }`}
                  style={{
                    backgroundColor: activeEra === era.id ? getEraColor(era.id) : undefined
                  }}
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
        <div className="space-y-6" ref={winnerListRef}>
          {/* Era Tabs */}
          <div className="flex flex-wrap gap-2">
            {TROPHY_ERAS.map((era) => {
              const region = getRegionByEra(era.id);
              const isActive = activeEra === era.id;
              return (
                <button
                  key={era.id}
                  data-era={era.id}
                  onClick={(e) => onEraClick(era.id, e)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'text-[#0C0F1A]'
                      : 'bg-[#141827] text-[#F5F1E8]/70 hover:text-[#F5F1E8] border border-[#2a3142]'
                  }`}
                  style={{
                    backgroundColor: isActive ? region?.highlight.color : undefined,
                    borderColor: isActive ? region?.highlight.color : undefined
                  }}
                >
                  {era.name}
                </button>
              );
            })}
          </div>

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
                    style={{ 
                      backgroundColor: `${getEraColor(currentEra.id)}20`, 
                      color: getEraColor(currentEra.id) 
                    }}
                  >
                    <span 
                      className="w-2 h-2 rounded-full" 
                      style={{ backgroundColor: getEraColor(currentEra.id) }} 
                    />
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
                    onClick={(e) => onWinnerClick(winner, e)}
                    className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all text-left group ${
                      selectedWinner?.year === winner.year
                        ? 'border-2'
                        : 'bg-[#0C0F1A] border border-[#2a3142] hover:border-[#C9A84C]/30'
                    }`}
                    style={{
                      backgroundColor: selectedWinner?.year === winner.year 
                        ? `${getEraColor(currentEra.id)}15` 
                        : undefined,
                      borderColor: selectedWinner?.year === winner.year 
                        ? getEraColor(currentEra.id) 
                        : undefined
                    }}
                  >
                    <span 
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-sm font-bold shrink-0"
                      style={{ 
                        backgroundColor: `${getEraColor(currentEra.id)}20`, 
                        color: getEraColor(currentEra.id) 
                      }}
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
                    <Sparkles 
                      className="w-4 h-4 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: getEraColor(currentEra.id) }}
                    />
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
                className="bg-gradient-to-br rounded-2xl border p-6"
                style={{
                  background: `linear-gradient(135deg, ${getEraColor(currentEra.id)}20 0%, ${getEraColor(currentEra.id)}05 100%)`,
                  borderColor: `${getEraColor(currentEra.id)}40`
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${getEraColor(currentEra.id)}30` }}
                  >
                    <Trophy className="w-5 h-5" style={{ color: getEraColor(currentEra.id) }} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-[#F5F1E8]">
                      Champion Details
                    </h4>
                    <p className="text-sm text-[#F5F1E8]/60">
                      View highlighted on trophy
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[#F5F1E8]/60">Year</span>
                    <span 
                      className="font-bold text-xl"
                      style={{ color: getEraColor(currentEra.id) }}
                    >
                      {selectedWinner.year}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#F5F1E8]/60">Champions</span>
                    <span className="text-[#F5F1E8] font-medium text-right">
                      {selectedWinner.names.join(' & ')}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
