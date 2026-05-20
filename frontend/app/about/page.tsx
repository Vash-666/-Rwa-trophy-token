'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Trophy, Shield, Lock, Globe, Zap, FileCheck, Wallet, ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const rwaFeatures = [
  {
    icon: Lock,
    title: 'Tokenization',
    description: 'Physical assets are represented as digital tokens on the blockchain, enabling fractional ownership and seamless transfer.',
  },
  {
    icon: Shield,
    title: 'Verified Provenance',
    description: 'Every asset\'s history is immutably recorded, from creation through each transfer, ensuring authenticity.',
  },
  {
    icon: Globe,
    title: 'Global Accessibility',
    description: 'Investors worldwide can own a piece of history without geographical or logistical barriers.',
  },
  {
    icon: Zap,
    title: 'Instant Settlement',
    description: 'Blockchain transactions settle in minutes, not days, with 24/7 market availability.',
  },
];

const authenticationSteps = [
  {
    step: 1,
    title: 'Physical Inspection',
    description: 'Expert appraisers examine the trophy for authenticity, condition, and provenance.',
  },
  {
    step: 2,
    title: 'Documentation Review',
    description: 'Historical records, photographs, and certificates are verified and digitized.',
  },
  {
    step: 3,
    title: 'Smart Contract Deployment',
    description: 'An ERC-721 NFT is created with embedded metadata linking to the physical asset.',
  },
  {
    step: 4,
    title: 'Secure Custody',
    description: 'The physical trophy is stored in insured, climate-controlled facilities.',
  },
];

const custodyFeatures = [
  'Climate-controlled storage environment',
  '24/7 security monitoring',
  'Comprehensive insurance coverage',
  'Regular condition audits',
  'Chain of custody documentation',
  'Emergency response protocols',
];

const legalFramework = [
  {
    title: 'Ownership Rights',
    content: 'The NFT represents legal ownership of the physical trophy. Token holders have the right to display, sell, or transfer the asset.',
  },
  {
    title: 'Transfer of Title',
    content: 'When the NFT is sold or transferred, legal title to the physical trophy automatically transfers to the new owner.',
  },
  {
    title: 'Custody Agreement',
    content: 'A legal framework governs the custody, insurance, and maintenance of the physical asset on behalf of token holders.',
  },
  {
    title: 'Dispute Resolution',
    content: 'Clear procedures for handling disputes, claims, or challenges to ownership.',
  },
];

export default function About() {
  return (
    <main className="min-h-screen bg-[#0C0F1A]">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#C9A84C]/10 via-transparent to-transparent" />
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-[#C9A84C]/10 text-[#C9A84C] text-sm font-medium mb-6">
              Real World Assets
            </span>
            <h1 className="text-4xl lg:text-6xl font-bold text-[#F5F1E8] font-['Playfair_Display'] mb-6">
              What is <span className="text-gradient-gold">RWA Tokenization?</span>
            </h1>
            <p className="text-xl text-[#F5F1E8]/70 max-w-2xl mx-auto leading-relaxed">
              Real World Assets (RWAs) are physical items represented as digital tokens on the blockchain. 
              This technology brings transparency, liquidity, and accessibility to traditional assets.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What is RWA Section */}
      <section className="section-padding border-t border-[#2a3142]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-[#F5F1E8] font-['Playfair_Display'] mb-6">
                Bridging Physical and Digital
              </h2>
              <div className="space-y-4 text-[#F5F1E8]/70 leading-relaxed">
                <p>
                  Real World Asset tokenization is the process of creating a digital representation 
                  of a physical asset on the blockchain. For collectibles like our 1947 Tennis Trophy, 
                  this means:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#10B981] mt-0.5 shrink-0" />
                    <span>Immutable proof of ownership recorded on-chain</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#10B981] mt-0.5 shrink-0" />
                    <span>Complete provenance history from creation to present</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#10B981] mt-0.5 shrink-0" />
                    <span>Global marketplace accessibility 24/7</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#10B981] mt-0.5 shrink-0" />
                    <span>Fractional ownership possibilities</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {rwaFeatures.map((feature) => (
                <div
                  key={feature.title}
                  className="p-6 rounded-2xl bg-[#141827] border border-[#2a3142] hover:border-[#C9A84C]/30 transition-all"
                >
                  <feature.icon className="w-8 h-8 text-[#C9A84C] mb-4" />
                  <h3 className="text-lg font-semibold text-[#F5F1E8] mb-2 font-['Playfair_Display']">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[#F5F1E8]/60">
                    {feature.description}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Authentication Process */}
      <section className="section-padding border-t border-[#2a3142] bg-[#141827]/30">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-[#10B981]/10 text-[#10B981] text-sm font-medium mb-4">
              Authentication
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#F5F1E8] font-['Playfair_Display'] mb-4">
              How We Verify Authenticity
            </h2>
            <p className="text-[#F5F1E8]/60 max-w-2xl mx-auto">
              Every trophy in our collection undergoes a rigorous authentication process 
              before being tokenized on the blockchain.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {authenticationSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="text-6xl font-bold text-[#C9A84C]/10 mb-4 font-['Playfair_Display']">
                  0{step.step}
                </div>
                <h3 className="text-xl font-semibold text-[#F5F1E8] mb-3 font-['Playfair_Display']">
                  {step.title}
                </h3>
                <p className="text-[#F5F1E8]/60">
                  {step.description}
                </p>
                {index < authenticationSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-[#2a3142] to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Custody Section */}
      <section className="section-padding border-t border-[#2a3142]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="relative">
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-[#141827] to-[#0C0F1A] border border-[#2a3142] flex items-center justify-center">
                  <Shield className="w-32 h-32 text-[#C9A84C]/30" />
                </div>
                <div className="absolute -bottom-6 -right-6 p-6 rounded-2xl bg-[#141827] border border-[#2a3142]">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-8 h-8 text-[#10B981]" />
                    <div>
                      <div className="text-2xl font-bold text-[#F5F1E8]">$50K</div>
                      <div className="text-sm text-[#F5F1E8]/60">Insured Value</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-[#60A5FA]/10 text-[#60A5FA] text-sm font-medium mb-4">
                Secure Storage
              </span>
              <h2 className="text-3xl font-bold text-[#F5F1E8] font-['Playfair_Display'] mb-6">
                Professional Custody
              </h2>
              <p className="text-[#F5F1E8]/70 mb-6 leading-relaxed">
                The physical trophy is stored in a secure, climate-controlled facility with 
                comprehensive insurance coverage. Our custody partner specializes in high-value 
                collectibles and art, ensuring your asset is protected.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {custodyFeatures.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#10B981] shrink-0" />
                    <span className="text-[#F5F1E8]/80 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Legal Framework */}
      <section className="section-padding border-t border-[#2a3142] bg-[#141827]/30">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-[#C9A84C]/10 text-[#C9A84C] text-sm font-medium mb-4">
              Legal Structure
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#F5F1E8] font-['Playfair_Display'] mb-4">
              Legal Framework
            </h2>
            <p className="text-[#F5F1E8]/60 max-w-2xl mx-auto">
              Our RWA tokenization follows established legal frameworks to ensure 
              clear ownership rights and regulatory compliance.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {legalFramework.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-[#0C0F1A] border border-[#2a3142] hover:border-[#C9A84C]/30 transition-all"
              >
                <FileCheck className="w-8 h-8 text-[#C9A84C] mb-4" />
                <h3 className="text-lg font-semibold text-[#F5F1E8] mb-2 font-['Playfair_Display']">
                  {item.title}
                </h3>
                <p className="text-[#F5F1E8]/60 text-sm leading-relaxed">
                  {item.content}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Risks & Disclosures */}
      <section className="section-padding border-t border-[#2a3142]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-6 h-6 text-[#C9A84C]" />
              <h2 className="text-2xl font-bold text-[#F5F1E8] font-['Playfair_Display']">
                Risk Disclosures
              </h2>
            </div>
            <div className="p-6 rounded-2xl bg-[#141827] border border-[#2a3142] space-y-4">
              <p className="text-[#F5F1E8]/70 text-sm leading-relaxed">
                <strong className="text-[#F5F1E8]">Market Risk:</strong> The value of NFTs and tokenized 
                assets can be volatile. Past performance does not guarantee future results.
              </p>
              <p className="text-[#F5F1E8]/70 text-sm leading-relaxed">
                <strong className="text-[#F5F1E8]">Technology Risk:</strong> Blockchain technology is 
                still evolving. Smart contracts, while audited, may contain undiscovered vulnerabilities.
              </p>
              <p className="text-[#F5F1E8]/70 text-sm leading-relaxed">
                <strong className="text-[#F5F1E8]">Regulatory Risk:</strong> The regulatory landscape 
                for NFTs and tokenized assets is uncertain and subject to change.
              </p>
              <p className="text-[#F5F1E8]/70 text-sm leading-relaxed">
                <strong className="text-[#F5F1E8]">Liquidity Risk:</strong> Secondary markets for 
                tokenized assets may have limited liquidity compared to traditional markets.
              </p>
            </div>
          </motion.div>
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
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A84C]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#10B981]/10 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <Wallet className="w-16 h-16 text-[#C9A84C] mx-auto mb-6" />
              <h2 className="text-3xl lg:text-4xl font-bold text-[#F5F1E8] font-['Playfair_Display'] mb-6">
                Ready to Explore RWA?
              </h2>
              <p className="text-[#F5F1E8]/70 max-w-2xl mx-auto mb-8">
                Browse our collection of tokenized tennis trophies and experience the 
                future of collectible ownership.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/gallery" className="btn-primary">
                  <Trophy className="w-5 h-5" />
                  View Collection
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/faq" className="btn-outline">
                  Learn More
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
