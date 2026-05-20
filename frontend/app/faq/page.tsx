'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Search, ChevronDown, HelpCircle, MessageCircle, ArrowRight } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const faqCategories = [
  { id: 'general', label: 'General' },
  { id: 'technical', label: 'Technical' },
  { id: 'ownership', label: 'Ownership' },
  { id: 'legal', label: 'Legal' },
];

const faqs = [
  // General
  {
    id: 1,
    category: 'general',
    question: 'What is the Tennis Trophy RWA project?',
    answer: 'The Tennis Trophy RWA (Real World Asset) project tokenizes a historic 1947 Ladies Doubles Championship Trophy on the blockchain. The NFT represents authenticated ownership of the physical trophy, which features 77+ years of engraved champions on a hardwood shield with crossed silver rackets.',
  },
  {
    id: 2,
    category: 'general',
    question: 'What makes this trophy special?',
    answer: 'This perpetual trophy was established in 1947 and awarded annually through 1973, featuring champions from four distinct eras of tennis history. The trophy represents a unique piece of sports memorabilia with complete provenance documentation and historical significance.',
  },
  {
    id: 3,
    category: 'general',
    question: 'How do I view the trophy?',
    answer: 'You can view detailed information about the trophy on our Gallery and Trophy Detail pages. The physical trophy is held in secure custody, but high-resolution photographs, provenance history, and interactive winner mapping are available online.',
  },
  {
    id: 4,
    category: 'general',
    question: 'What is RWA tokenization?',
    answer: 'Real World Asset (RWA) tokenization is the process of creating a digital representation of a physical asset on the blockchain. This enables fractional ownership, transparent provenance tracking, and global accessibility while maintaining the security and authenticity of the physical item.',
  },
  // Technical
  {
    id: 5,
    category: 'technical',
    question: 'Which blockchain is used?',
    answer: 'The Tennis Trophy NFT is deployed on Ethereum using the ERC-721 standard. Currently, the project is live on the Sepolia testnet for validation and testing before mainnet deployment.',
  },
  {
    id: 6,
    category: 'technical',
    question: 'What wallet do I need?',
    answer: 'You can use any Ethereum-compatible wallet such as MetaMask, Coinbase Wallet, or WalletConnect-compatible wallets. Simply connect your wallet using the button in the navigation bar to interact with the dApp.',
  },
  {
    id: 7,
    category: 'technical',
    question: 'How is the NFT metadata stored?',
    answer: 'NFT metadata, including trophy details and winner history, is stored on IPFS (InterPlanetary File System) for permanence and decentralization. The IPFS hash is recorded on-chain, ensuring the metadata cannot be altered.',
  },
  {
    id: 8,
    category: 'technical',
    question: 'What are gas fees?',
    answer: 'Gas fees are transaction costs paid to the Ethereum network for processing operations like minting, transferring, or interacting with smart contracts. On testnet, gas is free (using test ETH). On mainnet, gas fees vary based on network congestion.',
  },
  // Ownership
  {
    id: 9,
    category: 'ownership',
    question: 'What does owning the NFT mean?',
    answer: 'Owning the NFT represents legal ownership of the physical tennis trophy. The token holder has the right to display, sell, or transfer the asset. The physical trophy remains in secure custody until the owner requests physical delivery (subject to terms).',
  },
  {
    id: 10,
    category: 'ownership',
    question: 'Can I sell my NFT?',
    answer: 'Yes, the NFT can be sold or transferred on any compatible marketplace (like OpenSea) or peer-to-peer. When the NFT is transferred, ownership of the physical trophy automatically transfers to the new token holder.',
  },
  {
    id: 11,
    category: 'ownership',
    question: 'Can I see the physical trophy?',
    answer: 'Physical viewing may be arranged under specific circumstances and custody agreements. Contact us for more information about viewing arrangements and physical redemption options.',
  },
  {
    id: 12,
    category: 'ownership',
    question: 'What happens if I lose access to my wallet?',
    answer: 'As with any blockchain asset, losing access to your wallet means losing access to your NFT. We strongly recommend using hardware wallets, secure backups, and following best practices for key management. The project team cannot recover lost private keys.',
  },
  // Legal
  {
    id: 13,
    category: 'legal',
    question: 'Is this a security?',
    answer: 'The Tennis Trophy NFT represents ownership of a collectible physical asset. It is not intended to be a security or investment contract. Purchasers should acquire the NFT for its collectible and historical value, not for speculative investment purposes.',
  },
  {
    id: 14,
    category: 'legal',
    question: 'What are the tax implications?',
    answer: 'Tax treatment of NFTs varies by jurisdiction. We recommend consulting with a tax professional in your area to understand the implications of buying, selling, or holding NFTs and tokenized assets.',
  },
  {
    id: 15,
    category: 'legal',
    question: 'What is the custody arrangement?',
    answer: 'The physical trophy is stored in a secure, climate-controlled facility with comprehensive insurance coverage. A legal custody agreement governs the storage, maintenance, and insurance of the asset on behalf of token holders.',
  },
  {
    id: 16,
    category: 'legal',
    question: 'What if there is a dispute about ownership?',
    answer: 'Ownership is determined by the blockchain record. The smart contract maintains an immutable record of all transfers. Any disputes would be resolved based on this on-chain evidence and the legal framework established in the custody agreement.',
  },
];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState<number[]>([1]);

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = faq.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <main className="min-h-screen bg-[#0C0F1A]">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 border-b border-[#2a3142]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#C9A84C]/10 flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="w-8 h-8 text-[#C9A84C]" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-[#F5F1E8] font-['Playfair_Display'] mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-[#F5F1E8]/60 text-lg">
              Find answers to common questions about the Tennis Trophy RWA project, 
              tokenization, and ownership.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 border-b border-[#2a3142] bg-[#141827]/50 sticky top-16 lg:top-20 z-40">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#F5F1E8]/40" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#0C0F1A] border border-[#2a3142] text-[#F5F1E8] placeholder-[#F5F1E8]/40 focus:outline-none focus:border-[#C9A84C]/50 transition-colors"
              />
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 w-full lg:w-auto">
              {faqCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    activeCategory === category.id
                      ? 'bg-[#C9A84C]/20 text-[#C9A84C] border border-[#C9A84C]/50'
                      : 'bg-[#0C0F1A] text-[#F5F1E8]/70 border border-[#2a3142] hover:border-[#C9A84C]/30'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          {filteredFaqs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <HelpCircle className="w-16 h-16 text-[#F5F1E8]/20 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#F5F1E8] mb-2">
                No questions found
              </h3>
              <p className="text-[#F5F1E8]/60">
                Try adjusting your search or category filter.
              </p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-2xl bg-[#141827] border border-[#2a3142] overflow-hidden"
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-[#1a1f2e] transition-colors"
                  >
                    <span className="text-[#F5F1E8] font-medium pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown 
                      className={`w-5 h-5 text-[#C9A84C] shrink-0 transition-transform ${
                        openItems.includes(faq.id) ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openItems.includes(faq.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-6 pb-6 pt-0">
                          <div className="pt-4 border-t border-[#2a3142]">
                            <p className="text-[#F5F1E8]/70 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-padding border-t border-[#2a3142] bg-[#141827]/30">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <MessageCircle className="w-12 h-12 text-[#C9A84C] mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-[#F5F1E8] font-['Playfair_Display'] mb-4">
              Still have questions?
            </h2>
            <p className="text-[#F5F1E8]/60 mb-8">
              Can&apos;t find the answer you&apos;re looking for? Please reach out to our team 
              and we&apos;ll get back to you as soon as possible.
            </p>
            <Link href="/contact" className="btn-primary">
              Contact Us
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
