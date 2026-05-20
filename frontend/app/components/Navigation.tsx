'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Trophy, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/trophy-detail', label: 'Trophy Detail' },
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQ' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#2a3142] bg-[#0C0F1A]/80 backdrop-blur-xl">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative">
              <Trophy className="w-8 h-8 text-[#C9A84C]" />
              <div className="absolute inset-0 bg-[#C9A84C]/20 blur-xl rounded-full" />
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-bold text-gradient-gold font-['Playfair_Display']">
                Tennis Trophy
              </span>
              <span className="block text-xs text-[#F5F1E8]/60 tracking-wider">RWA COLLECTION</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  pathname === link.href
                    ? 'text-[#C9A84C] bg-[#C9A84C]/10'
                    : 'text-[#F5F1E8]/70 hover:text-[#F5F1E8] hover:bg-[#F5F1E8]/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Connect Button & Mobile Menu */}
          <div className="flex items-center gap-4">
            <ConnectButton 
              showBalance={false}
              accountStatus="address"
              chainStatus="icon"
            />
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-[#F5F1E8]/70 hover:text-[#F5F1E8] hover:bg-[#F5F1E8]/5 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden border-t border-[#2a3142] bg-[#0C0F1A]/95 backdrop-blur-xl"
          >
            <div className="container-custom py-4 space-y-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                      pathname === link.href
                        ? 'text-[#C9A84C] bg-[#C9A84C]/10'
                        : 'text-[#F5F1E8]/70 hover:text-[#F5F1E8] hover:bg-[#F5F1E8]/5'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
