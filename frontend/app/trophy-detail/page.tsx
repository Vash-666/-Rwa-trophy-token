'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Trophy, Calendar, Users, MapPin, Shield, Clock, ExternalLink, ChevronRight, Award, History, Package, ZoomIn, Sparkles } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import WinnerMapping from '../components/WinnerMapping';
import ImageLightbox from '../components/ImageLightbox';
import TrophyRegionOverlay, { TROPHY_REGIONS } from '../components/TrophyRegionOverlay';
import PointerLine from '../components/PointerLine';
import { useTrophyInteraction } from '../hooks/useTrophyInteraction';
import { getTrophyStats, TROPHY_ERAS, Winner } from '../lib/winners';

const stats = getTrophyStats();

const trophyDetails = {
  name: "Ladies Doubles Championship Shield",
  yearEstablished: 1947,
  material: "Hardwood, Silverplate, Brass accents",
  dimensions: "18\" × 24\" × 2\" (estimated)",
  weight: "Approximately 5-7 lbs",
  condition: "Excellent - Minor tarnish on plaques",
  currentCustodian: "Secure Vault Storage",
  insurance: "$50,000 USD",
  authentication: "Professional appraisal completed 2024",
};

const provenanceHistory = [
  { date: "1947", event: "Trophy commissioned and first awarded", type: "creation" },
  { date: "1973", event: "Final engraving completed", type: "milestone" },
  { date: "2024", event: "Tokenized as Real World Asset", type: "tokenization" },
  { date: "Present", event: "Held in secure custody", type: "custody" },
];

export default function TrophyDetail() {
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'provenance'>('overview');
  const [mounted, setMounted] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const winnerListRef = useRef<HTMLDivElement>(null);

  const {
    activeRegion,
    highlightedRegion,
    pointerLine,
    trophyImageRef,
    handleRegionClick,
    handleRegionHover,
    handleWinnerClick,
    handleEraClick
  } = useTrophyInteraction({ highlightDuration: 3000 });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleWinnerListClick = useCallback((winner: Winner, e: React.MouseEvent) => {
    const element = e.currentTarget as HTMLElement;
    handleWinnerClick(winner.year, '', element);
    
    // Switch to history tab if not already there
    if (activeTab !== 'history') {
      setActiveTab('history');
    }
  }, [handleWinnerClick, activeTab]);

  const handleEraTabClick = useCallback((eraId: string, e: React.MouseEvent) => {
    const element = e.currentTarget as HTMLElement;
    handleEraClick(eraId, element);
  }, [handleEraClick]);

  const getEraColor = (eraId: string) => {
    const region = TROPHY_REGIONS.find(r => r.era === eraId);
    return region?.highlight.color || '#C9A84C';
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0C0F1A] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0C0F1A]">
      <Navigation />
      
      {/* Lightbox */}
      <ImageLightbox
        src="/trophy-photo.jpg"
        alt="1947 Ladies Doubles Championship Shield"
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />

      {/* Pointer Line Animation */}
      <PointerLine
        startElement={pointerLine.startElement}
        endElement={trophyImageRef.current}
        color={pointerLine.color}
        isVisible={pointerLine.isVisible}
      />

      {/* Breadcrumb & Back */}
      <section className="pt-28 pb-6 border-b border-[#2a3142]">
        <div className="container-custom">
          <div className="flex items-center gap-2 text-sm text-[#F5F1E8]/60">
            <Link href="/" className="hover:text-[#C9A84C] transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/gallery" className="hover:text-[#C9A84C] transition-colors">Gallery</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#F5F1E8]">Trophy Detail</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left - Trophy Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Main Image with Region Overlay */}
              <div 
                ref={trophyImageRef as React.RefObject<HTMLDivElement>}
                className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-br from-[#141827] to-[#0C0F1A] border border-[#2a3142] group cursor-zoom-in"
                onClick={() => setLightboxOpen(true)}
              >
                {/* Real Trophy Image */}
                <img 
                  src="/trophy-photo.jpg" 
                  alt="1947 Ladies Doubles Championship Shield"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Region Overlay */}
                <TrophyRegionOverlay
                  activeRegion={activeRegion}
                  highlightedRegion={highlightedRegion}
                  onRegionClick={handleRegionClick}
                  onRegionHover={handleRegionHover}
                  className="absolute inset-0"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C0F1A]/80 via-transparent to-transparent pointer-events-none" />
                
                {/* Zoom Hint */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                >
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#141827]/90 border border-[#2a3142] text-[#F5F1E8]">
                    <ZoomIn className="w-5 h-5" />
                    <span className="text-sm font-medium">Click to zoom</span>
                  </div>
                </motion.div>
                
                {/* Badge */}
                <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-[#10B981]/20 border border-[#10B981]/50">
                  <span className="text-[#10B981] text-sm font-medium flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Verified Authentic
                  </span>
                </div>
                
                {/* Year Badge */}
                <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-[#C9A84C] text-[#0C0F1A] font-bold text-sm">
                  Est. 1947
                </div>

                {/* Interactive Hint */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-2 text-xs text-[#F5F1E8]/60 pointer-events-none">
                  <Sparkles className="w-3 h-3" />
                  <span>Click regions to explore eras</span>
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <button
                    key={i}
                    onClick={() => setLightboxOpen(true)}
                    className="aspect-square rounded-xl overflow-hidden bg-[#141827] border border-[#2a3142] hover:border-[#C9A84C]/50 transition-all group cursor-pointer"
                  >
                    <img 
                      src="/trophy-photo.jpg" 
                      alt={`Trophy view ${i}`}
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                    />
                  </button>
                ))}
              </div>

              {/* Era Legend */}
              <div className="flex flex-wrap gap-2 justify-center">
                {TROPHY_REGIONS.map((region) => (
                  <button
                    key={region.id}
                    onClick={(e) => handleEraTabClick(region.era, e)}
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
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: region.highlight.color }}
                    />
                    {region.name}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Right - Trophy Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-[#C9A84C]/10 text-[#C9A84C] text-sm font-medium mb-4">
                  Real World Asset
                </span>
                <h1 className="text-3xl lg:text-4xl font-bold text-[#F5F1E8] font-['Playfair_Display'] mb-4">
                  {trophyDetails.name}
                </h1>
                <p className="text-[#F5F1E8]/70 leading-relaxed">
                  A perpetual trophy established in 1947, awarded to ladies doubles champions 
                  for over 77 years. This historic piece features a hardwood shield with 
                  crossed silver rackets and engraved plaques commemorating each champion.
                </p>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-[#141827] border border-[#2a3142]">
                  <Calendar className="w-5 h-5 text-[#C9A84C] mb-2" />
                  <div className="text-2xl font-bold text-[#F5F1E8]">{stats.totalYears}</div>
                  <div className="text-xs text-[#F5F1E8]/50">Years</div>
                </div>
                <div className="p-4 rounded-xl bg-[#141827] border border-[#2a3142]">
                  <Users className="w-5 h-5 text-[#C9A84C] mb-2" />
                  <div className="text-2xl font-bold text-[#F5F1E8]">{stats.totalChampions}</div>
                  <div className="text-xs text-[#F5F1E8]/50">Champions</div>
                </div>
                <div className="p-4 rounded-xl bg-[#141827] border border-[#2a3142]">
                  <Award className="w-5 h-5 text-[#C9A84C] mb-2" />
                  <div className="text-2xl font-bold text-[#F5F1E8]">{stats.uniqueFamilies}</div>
                  <div className="text-xs text-[#F5F1E8]/50">Families</div>
                </div>
                <div className="p-4 rounded-xl bg-[#141827] border border-[#2a3142]">
                  <History className="w-5 h-5 text-[#C9A84C] mb-2" />
                  <div className="text-2xl font-bold text-[#F5F1E8]">{stats.totalEras}</div>
                  <div className="text-xs text-[#F5F1E8]/50">Eras</div>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-[#2a3142]">
                <div className="flex gap-6">
                  {(['overview', 'history', 'provenance'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-4 text-sm font-medium capitalize transition-colors relative ${
                        activeTab === tab
                          ? 'text-[#C9A84C]'
                          : 'text-[#F5F1E8]/60 hover:text-[#F5F1E8]'
                      }`}
                    >
                      {tab}
                      {activeTab === tab && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C9A84C]"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="min-h-[300px]">
                {activeTab === 'overview' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <Package className="w-5 h-5 text-[#C9A84C] mt-0.5" />
                        <div>
                          <span className="text-[#F5F1E8]/50 text-sm block">Material</span>
                          <span className="text-[#F5F1E8]">{trophyDetails.material}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-[#C9A84C] mt-0.5" />
                        <div>
                          <span className="text-[#F5F1E8]/50 text-sm block">Current Location</span>
                          <span className="text-[#F5F1E8]">{trophyDetails.currentCustodian}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-[#C9A84C] mt-0.5" />
                        <div>
                          <span className="text-[#F5F1E8]/50 text-sm block">Insurance Value</span>
                          <span className="text-[#F5F1E8]">{trophyDetails.insurance}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-[#C9A84C] mt-0.5" />
                        <div>
                          <span className="text-[#F5F1E8]/50 text-sm block">Condition</span>
                          <span className="text-[#F5F1E8]">{trophyDetails.condition}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'history' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                    ref={winnerListRef}
                  >
                    <p className="text-[#F5F1E8]/70 mb-4">
                      This trophy spans four distinct eras of tennis history. 
                      <span className="text-[#C9A84C]"> Click any era or winner</span> to see 
                      the corresponding section highlighted on the trophy image.
                    </p>
                    
                    {/* Era Tabs */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {TROPHY_ERAS.map((era) => {
                        const isActive = activeRegion === era.id || highlightedRegion === era.id;
                        return (
                          <button
                            key={era.id}
                            onClick={(e) => handleEraTabClick(era.id, e)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                              isActive
                                ? 'text-[#0C0F1A]'
                                : 'bg-[#141827] text-[#F5F1E8]/70 hover:text-[#F5F1E8] border border-[#2a3142]'
                            }`}
                            style={{
                              backgroundColor: isActive ? getEraColor(era.id) : undefined,
                              borderColor: isActive ? getEraColor(era.id) : undefined
                            }}
                          >
                            {era.name}
                          </button>
                        );
                      })}
                    </div>

                    {/* Winners by Era */}
                    <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                      {TROPHY_ERAS.map((era) => {
                        const isHighlighted = activeRegion === era.id || highlightedRegion === era.id;
                        return (
                          <motion.div
                            key={era.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`p-4 rounded-xl border transition-all ${
                              isHighlighted
                                ? 'bg-[#141827]'
                                : 'bg-[#0C0F1A]/50 border-[#2a3142]/50'
                            }`}
                            style={{
                              borderColor: isHighlighted ? getEraColor(era.id) : undefined,
                              borderWidth: isHighlighted ? '2px' : '1px'
                            }}
                          >
                            <div 
                              className="flex items-center justify-between mb-3 cursor-pointer"
                              onClick={(e) => handleEraTabClick(era.id, e)}
                            >
                              <div className="flex items-center gap-2">
                                <span 
                                  className="w-3 h-3 rounded-full"
                                  style={{ backgroundColor: getEraColor(era.id) }}
                                />
                                <h4 className="font-semibold text-[#F5F1E8]">{era.name}</h4>
                              </div>
                              <span 
                                className="text-sm font-medium"
                                style={{ color: getEraColor(era.id) }}
                              >
                                {era.yearStart}-{era.yearEnd}
                              </span>
                            </div>
                            
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                              {era.winners.slice(0, 6).map((winner) => (
                                <button
                                  key={winner.year}
                                  onClick={(e) => handleWinnerListClick(winner, e)}
                                  className="text-left p-2 rounded-lg bg-[#0C0F1A] hover:bg-[#C9A84C]/10 border border-[#2a3142] hover:border-[#C9A84C]/30 transition-all text-xs"
                                >
                                  <span 
                                    className="font-bold block"
                                    style={{ color: getEraColor(era.id) }}
                                  >
                                    {winner.year}
                                  </span>
                                  <span className="text-[#F5F1E8]/70 truncate block">
                                    {winner.names[0].split(' ').pop()}
                                  </span>
                                </button>
                              ))}
                              {era.winners.length > 6 && (
                                <div className="flex items-center justify-center p-2 rounded-lg bg-[#0C0F1A] border border-[#2a3142] text-xs text-[#F5F1E8]/50">
                                  +{era.winners.length - 6} more
                                </div>
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'provenance' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <p className="text-[#F5F1E8]/70 mb-4">
                      Complete provenance history from creation to present day, 
                      verified on the blockchain.
                    </p>
                    <div className="relative">
                      <div className="absolute left-4 top-0 bottom-0 w-px bg-[#2a3142]" />
                      <div className="space-y-6">
                        {provenanceHistory.map((item, index) => (
                          <div key={index} className="relative pl-12">
                            <div className={`absolute left-2 w-5 h-5 rounded-full border-2 ${
                              index === 0 
                                ? 'bg-[#C9A84C] border-[#C9A84C]' 
                                : 'bg-[#0C0F1A] border-[#2a3142]'
                            }`} />
                            <div>
                              <span className="text-[#C9A84C] text-sm font-medium">{item.date}</span>
                              <p className="text-[#F5F1E8]">{item.event}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-6 border-t border-[#2a3142]">
                <Link
                  href="/gallery"
                  className="btn-primary"
                >
                  <Trophy className="w-5 h-5" />
                  View in Gallery
                </Link>
                <button
                  onClick={() => setLightboxOpen(true)}
                  className="btn-outline"
                >
                  <ZoomIn className="w-5 h-5" />
                  Full Screen
                </button>
                <a
                  href="#"
                  className="btn-outline"
                >
                  <ExternalLink className="w-5 h-5" />
                  View on Explorer
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Winner Mapping */}
      <section className="section-padding border-t border-[#2a3142] bg-[#141827]/30">
        <div className="container-custom">
          <WinnerMapping />
        </div>
      </section>

      <Footer />
    </main>
  );
}
