'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Trophy, Calendar, Users, MapPin, Shield, Clock, ExternalLink, ChevronRight, Award, History, Package } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import WinnerMapping from '../components/WinnerMapping';
import { getTrophyStats, TROPHY_ERAS } from '../lib/winners';

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

  useEffect(() => {
    setMounted(true);
  }, []);

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
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-[#141827] to-[#0C0F1A] border border-[#2a3142]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Trophy className="w-48 h-48 text-[#C9A84C]/30" />
                </div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#C9A84C]/10 to-transparent" />
                
                {/* Badge */}
                <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-[#10B981]/20 border border-[#10B981]/50">
                  <span className="text-[#10B981] text-sm font-medium flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Verified Authentic
                  </span>
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <button
                    key={i}
                    className="aspect-square rounded-xl bg-[#141827] border border-[#2a3142] hover:border-[#C9A84C]/50 transition-all flex items-center justify-center"
                  >
                    <Trophy className="w-8 h-8 text-[#C9A84C]/30" />
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
                  >
                    <p className="text-[#F5F1E8]/70 mb-4">
                      This trophy spans four distinct eras of tennis history, each with its own 
                      character and legendary champions.
                    </p>
                    <div className="space-y-3">
                      {TROPHY_ERAS.map((era) => (
                        <div
                          key={era.id}
                          className="p-4 rounded-xl bg-[#141827] border border-[#2a3142] hover:border-[#C9A84C]/30 transition-all"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-[#F5F1E8]">{era.name}</h4>
                            <span className="text-sm text-[#C9A84C]">{era.yearStart}-{era.yearEnd}</span>
                          </div>
                          <p className="text-sm text-[#F5F1E8]/60">{era.description}</p>
                          <div className="mt-2 text-xs text-[#F5F1E8]/40">
                            {era.winners.length} champions
                          </div>
                        </div>
                      ))}
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
