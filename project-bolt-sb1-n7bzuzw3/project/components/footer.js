"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { 
  Heart, 
  Mail, 
  Github, 
  Twitter, 
  Instagram, 
  Facebook,
  Gift,
  MessageCircle,
  Brain,
  Quote,
  Palette,
  Star
} from 'lucide-react';

export function Footer() {
  const [language, setLanguage] = useState('en');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
  }, []);

  const content = {
    en: {
      tagline: "Express Your Heart with Beautiful Words",
      newsletter: {
        title: "Daily Inspiration",
        description: "Get beautiful quotes and wishes delivered to your inbox",
        placeholder: "Enter your email",
        button: "Subscribe"
      },
      links: {
        content: "Content",
        tools: "Tools",
        support: "Support",
        legal: "Legal"
      },
      contentLinks: [
        { href: "/wishes", label: "Wishes", icon: Gift },
        { href: "/shayari", label: "Shayari", icon: MessageCircle },
        { href: "/puzzles", label: "Puzzles", icon: Brain },
        { href: "/quotes", label: "Quotes", icon: Quote }
      ],
      toolLinks: [
        { href: "/create-card", label: "Card Creator", icon: Palette },
        { href: "/favorites", label: "Favorites", icon: Heart },
        { href: "/search", label: "Search", icon: Star }
      ],
      supportLinks: [
        { href: "/help", label: "Help Center" },
        { href: "/contact", label: "Contact Us" },
        { href: "/feedback", label: "Feedback" }
      ],
      legalLinks: [
        { href: "/privacy", label: "Privacy Policy" },
        { href: "/terms", label: "Terms of Service" },
        { href: "/cookies", label: "Cookie Policy" }
      ],
      copyright: "© 2024 Emotional Hub. Made with ❤️ for spreading emotions.",
      madeWith: "Made with"
    },
    hi: {
      tagline: "खूबसूरत शब्दों के साथ अपने दिल की बात कहें",
      newsletter: {
        title: "दैनिक प्रेरणा",
        description: "अपने इनबॉक्स में सुंदर कोट्स और शुभकामनाएं प्राप्त करें",
        placeholder: "अपना ईमेल दर्ज करें",
        button: "सब्स्क्राइब करें"
      },
      links: {
        content: "सामग्री",
        tools: "उपकरण",
        support: "सहायता",
        legal: "कानूनी"
      },
      contentLinks: [
        { href: "/wishes", label: "शुभकामनाएं", icon: Gift },
        { href: "/shayari", label: "शायरी", icon: MessageCircle },
        { href: "/puzzles", label: "पहेलियां", icon: Brain },
        { href: "/quotes", label: "कोट्स", icon: Quote }
      ],
      toolLinks: [
        { href: "/create-card", label: "कार्ड क्रिएटर", icon: Palette },
        { href: "/favorites", label: "पसंदीदा", icon: Heart },
        { href: "/search", label: "खोजें", icon: Star }
      ],
      supportLinks: [
        { href: "/help", label: "सहायता केंद्र" },
        { href: "/contact", label: "संपर्क करें" },
        { href: "/feedback", label: "प्रतिक्रिया" }
      ],
      legalLinks: [
        { href: "/privacy", label: "गोपनीयता नीति" },
        { href: "/terms", label: "सेवा की शर्तें" },
        { href: "/cookies", label: "कुकी नीति" }
      ],
      copyright: "© 2024 इमोशनल हब। भावनाओं को फैलाने के लिए ❤️ के साथ बनाया गया।",
      madeWith: "के साथ बनाया गया"
    }
  };

  const currentContent = content[language];

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      // Handle newsletter subscription
      console.log('Newsletter subscription:', email);
      setEmail('');
      // Show success message
    }
  };

  return (
    <footer className="bg-gradient-to-b from-white/50 to-gray-50 dark:from-gray-900/50 dark:to-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                EmotionalHub
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md">
              {currentContent.tagline}
            </p>
            
            {/* Newsletter Signup */}
            <div className="mb-6">
              <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">
                {currentContent.newsletter.title}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {currentContent.newsletter.description}
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex space-x-2">
                <Input
                  type="email"
                  placeholder={currentContent.newsletter.placeholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                  required
                />
                <Button type="submit" size="sm">
                  {currentContent.newsletter.button}
                </Button>
              </form>
            </div>

            {/* Social Links */}
            <div className="flex space-x-3">
              <Button variant="outline" size="sm" className="w-10 h-10 p-0">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="w-10 h-10 p-0">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="w-10 h-10 p-0">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="w-10 h-10 p-0">
                <Github className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Content Links */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-800 dark:text-gray-200">
              {currentContent.links.content}
            </h4>
            <ul className="space-y-2">
              {currentContent.contentLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors duration-200 flex items-center space-x-2">
                    <link.icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools Links */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-800 dark:text-gray-200">
              {currentContent.links.tools}
            </h4>
            <ul className="space-y-2">
              {currentContent.toolLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors duration-200 flex items-center space-x-2">
                    <link.icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-800 dark:text-gray-200">
              {currentContent.links.support}
            </h4>
            <ul className="space-y-2 mb-6">
              {currentContent.supportLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            
            <h4 className="font-semibold mb-4 text-gray-800 dark:text-gray-200">
              {currentContent.links.legal}
            </h4>
            <ul className="space-y-2">
              {currentContent.legalLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {currentContent.copyright}
          </p>
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <span>{currentContent.madeWith}</span>
            <Heart className="w-4 h-4 text-red-500" />
            <span>{language === 'en' ? 'in India' : 'भारत में'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}