'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Trophy, Shield, Clock, ArrowRight, CheckCircle, Lock, Globe, Award } from 'lucide-react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import WinnerMapping from './components/WinnerMapping';
import { getTrophyStats } from './lib/winners';

const stats = getTrophyStats();

const features = [
  {
    icon: Shield,
    title: 'Verified Provenance',
    description: 'Every transfer and custodian change is permanently recorded on the blockchain, creating an immutable history of ownership.',
  },
  {
    icon: Clock,
    title: '77+ Years of History',
    description: 'From 1947 to today, explore the complete winner history engraved on this perpetual trophy. A living piece of tennis heritage.',
  },
  {
    icon: Lock,
    title: 'Secure Custody',
    description: 'The physical trophy is held in secure, insured storage with documented chain of custody linked to the digital token.',
  },
  {
    icon: Globe,
    title: 'Global Accessibility',
    description: 'Own a piece of history from anywhere in the world. Trade, transfer, or showcase your trophy NFT 24/7.',
  },
];

const processSteps = [
  {
    number: '01',
    title: 'Connect Wallet',
    description: 'Link your Web3 wallet to browse the trophy gallery and verify ownership on-chain.',
  },
  {
    number: '02',
    title: 'Explore History',
    description: 'Dive into 77+ years of champions with our interactive winner-trophy mapping feature.',
  },
  {
    number: '03',
    title: 'Own History',
    description: 'Acquire the NFT representing authenticated ownership of this historic tennis trophy.',
  },
];

const trustSignals = [
  { label: 'Years of Champions', value: stats.totalYears.toString() },
  { label: 'Total Champions', value: stats.totalChampions.toString() },
  { label: 'Unique Families', value: stats.uniqueFamilies.toString() },
  { label: 'Historical Eras', value: stats.totalEras.toString() },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0C0F1A]">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#C9A84C]/10 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C9A84C]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#10B981]/5 rounded-full blur-3xl" />
        
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/30"
              >
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                <span className="text-[#C9A84C] text-sm font-medium">Live on Sepolia Testnet</span>
              </motion.div>
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight font-['Playfair_Display']">
                <span className="text-[#F5F1E8]">Own a Piece of</span>
                <br />
                <span className="text-gradient-gold">Tennis History</span>
              </h1>
              
              <p className="text-xl text-[#F5F1E8]/70 max-w-lg leading-relaxed">
                The 1947 Championship Trophy, awarded to tennis legends for over 77 years. 
                Now tokenized as a Real World Asset on the blockchain.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/gallery" className="btn-primary">
                  <Trophy className="w-5 h-5" />
                  View Trophy
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/about" className="btn-secondary">
                  Learn About RWA
                </Link>
              </div>

              {/* Trust Signals */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-[#2a3142]">
                {trustSignals.map((signal, index) => (
                  <motion.div
                    key={signal.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-2xl lg:text-3xl font-bold text-gradient-gold">
                      {signal.value}
                    </div>
                    <div className="text-xs text-[#F5F1E8]/50 mt-1">{signal.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Content - Real Trophy Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-[#C9A84C]/20 blur-3xl rounded-full scale-75" />
              <div className="relative card card-hover overflow-hidden">
                {/* Trophy Image */}
                <div className="aspect-[4/5] relative overflow-hidden">
                  <img 
                    src="/trophy-photo.jpg" 
                    alt="1947 Ladies Doubles Championship Shield - 77 years of engraved champions"
                    className="w-full h-full object-cover"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C0F1A] via-transparent to-transparent opacity-80" />
                  
                  {/* Est. Badge */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-4 right-4 bg-[#C9A84C] text-[#0C0F1A] px-4 py-2 rounded-full font-bold text-sm"
                  >
                    Est. 1947
                  </motion.div>
                </div>
                
                {/* Trophy Info */}
                <div className="p-6 space-y-4 bg-[#0C0F1A]">
                  <div className="flex items-center justify-between">
                    <span className="text-[#F5F1E8]/60">Year Established</span>
                    <span className="text-[#F5F1E8] font-semibold">1947</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#F5F1E8]/60">Material</span>
                    <span className="text-[#F5F1E8] font-semibold">Silverplate & Hardwood</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#F5F1E8]/60">Total Winners</span>
                    <span className="text-[#F5F1E8] font-semibold">77+ Champions</span>
                  </div>
                  <div className="pt-4 border-t border-[#2a3142]">
                    <div className="flex items-center gap-2 text-[#10B981]">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm">Authenticated & Verified</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding border-t border-[#2a3142] bg-[#0C0F1A]/50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-[#C9A84C]/10 text-[#C9A84C] text-sm font-medium mb-4">
              Why Tokenize?
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#F5F1E8] font-['Playfair_Display'] mb-4">
              The Future of Collectibles
            </h2>
            <p className="text-[#F5F1E8]/60 max-w-2xl mx-auto">
              Blockchain technology brings transparency, provenance, and accessibility to historic sports memorabilia.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card card-hover p-8"
              >
                <div className="w-14 h-14 rounded-xl bg-[#C9A84C]/10 flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-[#C9A84C]" />
                </div>
                <h3 className="text-xl font-semibold text-[#F5F1E8] mb-3 font-['Playfair_Display']">
                  {feature.title}
                </h3>
                <p className="text-[#F5F1E8]/60 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Winner Mapping Section */}
      <section className="section-padding border-t border-[#2a3142]">
        <div className="container-custom">
          <WinnerMapping />
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding border-t border-[#2a3142] bg-[#0C0F1A]/50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-[#10B981]/10 text-[#10B981] text-sm font-medium mb-4">
              How It Works
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#F5F1E8] font-['Playfair_Display'] mb-4">
              Three Steps to Ownership
            </h2>
            <p className="text-[#F5F1E8]/60 max-w-2xl mx-auto">
              Getting started is simple. Connect, explore, and own a piece of tennis history.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                <div className="text-6xl font-bold text-[#C9A84C]/10 mb-4 font-['Playfair_Display']">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-[#F5F1E8] mb-3 font-['Playfair_Display']">
                  {step.title}
                </h3>
                <p className="text-[#F5F1E8]/60 leading-relaxed">
                  {step.description}
                </p>
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-[#2a3142] to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding border-t border-[#2a3142]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#141827] to-[#0C0F1A] border border-[#2a3142] p-12 lg:p-16 text-center"
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A84C]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#10B981]/10 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <Award className="w-16 h-16 text-[#C9A84C] mx-auto mb-6" />
              <h2 className="text-3xl lg:text-5xl font-bold text-[#F5F1E8] font-['Playfair_Display'] mb-6">
                Ready to Make History?
              </h2>
              <p className="text-xl text-[#F5F1E8]/70 max-w-2xl mx-auto mb-8">
                Join the future of sports memorabilia. Connect your wallet and explore 
                the gallery today.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/gallery" className="btn-primary">
                  <Trophy className="w-5 h-5" />
                  Browse Gallery
                </Link>
                <Link href="/contact" className="btn-outline">
                  Contact Us
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
