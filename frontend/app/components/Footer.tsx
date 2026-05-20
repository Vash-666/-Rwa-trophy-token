'use client';

import Link from 'next/link';
import { Trophy, Shield, Mail } from 'lucide-react';

const footerLinks = {
  explore: [
    { label: 'Gallery', href: '/gallery' },
    { label: 'Trophy Detail', href: '/trophy-detail' },
    { label: 'About RWA', href: '/about' },
    { label: 'Blog', href: '/blog' },
  ],
  support: [
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Documentation', href: '#' },
    { label: 'Terms of Service', href: '#' },
  ],
  connect: [
    { label: 'Email', href: 'mailto:hello@tennistrophy.rwa', icon: Mail },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-[#2a3142] bg-[#0C0F1A]">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <Trophy className="w-8 h-8 text-[#C9A84C]" />
              <span className="text-xl font-bold text-gradient-gold font-['Playfair_Display']">
                Tennis Trophy
              </span>
            </Link>
            <p className="text-[#F5F1E8]/60 text-sm mb-6 leading-relaxed">
              Tokenizing history, one champion at a time. The 1947 Championship Trophy, 
              now on the blockchain.
            </p>
            <div className="flex items-center gap-2 text-[#10B981] text-sm">
              <Shield className="w-4 h-4" />
              <span>Verified Smart Contract</span>
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h3 className="text-[#F5F1E8] font-semibold mb-4">Explore</h3>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[#F5F1E8]/60 hover:text-[#C9A84C] transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-[#F5F1E8] font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[#F5F1E8]/60 hover:text-[#C9A84C] transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-[#F5F1E8] font-semibold mb-4">Connect</h3>
            <div className="flex flex-wrap gap-3">
              {footerLinks.connect.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className="w-10 h-10 rounded-lg bg-[#141827] border border-[#2a3142] flex items-center justify-center text-[#F5F1E8]/60 hover:text-[#C9A84C] hover:border-[#C9A84C]/50 transition-all"
                    aria-label={link.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
            <div className="mt-6 p-4 rounded-xl bg-[#141827] border border-[#2a3142]">
              <p className="text-xs text-[#F5F1E8]/60 mb-2">Contract Address</p>
              <code className="text-xs text-[#C9A84C] break-all">
                0x1234...5678
              </code>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#2a3142] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#F5F1E8]/40 text-sm">
            © 2024 Tennis Trophy RWA. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-[#F5F1E8]/40">
            <Link href="#" className="hover:text-[#F5F1E8] transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-[#F5F1E8] transition-colors">
              Terms of Use
            </Link>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              Sepolia Testnet
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
