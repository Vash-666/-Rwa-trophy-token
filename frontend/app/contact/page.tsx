'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send, CheckCircle, Loader2, MapPin, Phone, Clock, AlertCircle } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const contactMethods = [
  {
    icon: Mail,
    title: 'Email',
    value: 'hello@tennistrophy.rwa',
    description: 'For general inquiries and support',
  },
  {
    icon: MessageSquare,
    title: 'Discord',
    value: 'Join our server',
    description: 'Community discussions and updates',
  },
  {
    icon: MapPin,
    title: 'Location',
    value: 'Secure Vault Facility',
    description: 'Physical trophy storage location',
  },
];

const inquiryTypes = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'purchase', label: 'Purchase Interest' },
  { value: 'partnership', label: 'Partnership Opportunity' },
  { value: 'press', label: 'Press & Media' },
  { value: 'technical', label: 'Technical Support' },
  { value: 'other', label: 'Other' },
];

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    type: 'general',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock success
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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
              <MessageSquare className="w-8 h-8 text-[#C9A84C]" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-[#F5F1E8] font-['Playfair_Display'] mb-4">
              Get in Touch
            </h1>
            <p className="text-[#F5F1E8]/60 text-lg">
              Have questions about the Tennis Trophy RWA? We&apos;d love to hear from you. 
              Send us a message and we&apos;ll respond as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12 border-b border-[#2a3142] bg-[#141827]/30">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-[#0C0F1A] border border-[#2a3142] text-center hover:border-[#C9A84C]/30 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-[#C9A84C]/10 flex items-center justify-center mx-auto mb-4">
                  <method.icon className="w-6 h-6 text-[#C9A84C]" />
                </div>
                <h3 className="text-lg font-semibold text-[#F5F1E8] mb-1">{method.title}</h3>
                <p className="text-[#C9A84C] font-medium mb-2">{method.value}</p>
                <p className="text-sm text-[#F5F1E8]/50">{method.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {isSubmitted ? (
                <div className="p-8 rounded-2xl bg-[#10B981]/10 border border-[#10B981]/30 text-center">
                  <CheckCircle className="w-16 h-16 text-[#10B981] mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-[#F5F1E8] mb-2 font-['Playfair_Display']">
                    Message Sent!
                  </h2>
                  <p className="text-[#F5F1E8]/70 mb-6">
                    Thank you for reaching out. We&apos;ll get back to you within 24-48 hours.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormState({ name: '', email: '', type: 'general', message: '' });
                    }}
                    className="btn-outline"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#F5F1E8] mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[#141827] border border-[#2a3142] text-[#F5F1E8] placeholder-[#F5F1E8]/40 focus:outline-none focus:border-[#C9A84C]/50 transition-colors"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#F5F1E8] mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[#141827] border border-[#2a3142] text-[#F5F1E8] placeholder-[#F5F1E8]/40 focus:outline-none focus:border-[#C9A84C]/50 transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-[#F5F1E8] mb-2">
                      Inquiry Type
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={formState.type}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#141827] border border-[#2a3142] text-[#F5F1E8] focus:outline-none focus:border-[#C9A84C]/50 transition-colors appearance-none cursor-pointer"
                    >
                      {inquiryTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-[#F5F1E8] mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-xl bg-[#141827] border border-[#2a3142] text-[#F5F1E8] placeholder-[#F5F1E8]/40 focus:outline-none focus:border-[#C9A84C]/50 transition-colors resize-none"
                      placeholder="Tell us how we can help..."
                    />
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Info Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="p-8 rounded-2xl bg-gradient-to-br from-[#141827] to-[#0C0F1A] border border-[#2a3142]">
                <h2 className="text-2xl font-bold text-[#F5F1E8] mb-6 font-['Playfair_Display']">
                  What to Expect
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#C9A84C]/10 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-[#C9A84C]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#F5F1E8] mb-1">Response Time</h3>
                      <p className="text-[#F5F1E8]/60 text-sm">
                        We aim to respond to all inquiries within 24-48 hours during business days.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#10B981]/10 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-[#10B981]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#F5F1E8] mb-1">Email Confirmation</h3>
                      <p className="text-[#F5F1E8]/60 text-sm">
                        You&apos;ll receive an automated confirmation email after submitting your message.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#60A5FA]/10 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-[#60A5FA]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#F5F1E8] mb-1">Priority Support</h3>
                      <p className="text-[#F5F1E8]/60 text-sm">
                        For urgent matters regarding active purchases, please indicate in your message.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 rounded-2xl bg-[#141827] border border-[#2a3142]">
                <h3 className="text-lg font-semibold text-[#F5F1E8] mb-4 font-['Playfair_Display']">
                  Before You Contact Us
                </h3>
                <ul className="space-y-3 text-[#F5F1E8]/60 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-[#C9A84C]">•</span>
                    Check our <a href="/faq" className="text-[#C9A84C] hover:underline">FAQ page</a> for common questions
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C9A84C]">•</span>
                    Review the <a href="/about" className="text-[#C9A84C] hover:underline">About RWA</a> section for tokenization details
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C9A84C]">•</span>
                    Browse the <a href="/gallery" className="text-[#C9A84C] hover:underline">Gallery</a> to see available trophies
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C9A84C]">•</span>
                    Join our Discord community for real-time discussions
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
