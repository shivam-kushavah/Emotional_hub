"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles, Heart, Brain, Gift } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
  const [language, setLanguage] = useState('en');
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
  }, []);

  const featuredQuotes = {
    en: [
      "Dreams don't work unless you do.",
      "Be yourself; everyone else is already taken.",
      "Life is what happens when you're busy making other plans.",
      "The only way to do great work is to love what you do."
    ],
    hi: [
      "सपने तब तक काम नहीं करते जब तक आप काम नहीं करते।",
      "खुद बनो, बाकी सब तो पहले से ही हैं।",
      "जिंदगी वो है जो तब होती है जब आप अन्य योजनाएं बनाने में व्यस्त होते हैं।",
      "महान काम करने का एकमात्र तरीका यह है कि आप जो करते हैं उससे प्रेम करें।"
    ]
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % featuredQuotes[language].length);
    }, 4000);
    return () => clearInterval(interval);
  }, [language]);

  const content = {
    en: {
      title: "Express Your Heart",
      subtitle: "with Beautiful Words",
      description: "Discover thousands of heartfelt wishes, inspiring quotes, romantic shayari, and brain puzzles. Create stunning cards to share your emotions.",
      cta: "Start Exploring",
      features: [
        { icon: Gift, title: "Wishes", desc: "For every occasion" },
        { icon: Heart, title: "Shayari", desc: "From the heart" },
        { icon: Brain, title: "Puzzles", desc: "Challenge yourself" },
        { icon: Sparkles, title: "Quotes", desc: "Inspire daily" }
      ]
    },
    hi: {
      title: "अपने दिल की बात कहें",
      subtitle: "खूबसूरत शब्दों के साथ",
      description: "हज़ारों दिल को छूने वाली शुभकामनाएं, प्रेरणादायक कोट्स, रोमांटिक शायरी और दिमागी पहेलियां खोजें। अपनी भावनाओं को साझा करने के लिए शानदार कार्ड बनाएं।",
      cta: "शुरुआत करें",
      features: [
        { icon: Gift, title: "शुभकामनाएं", desc: "हर मौके के लिए" },
        { icon: Heart, title: "शायरी", desc: "दिल से" },
        { icon: Brain, title: "पहेलियां", desc: "खुद को चुनौती दें" },
        { icon: Sparkles, title: "कोट्स", desc: "रोज़ाना प्रेरणा" }
      ]
    }
  };

  const currentContent = content[language];

  return (
    <div className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 animate-pulse"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400/30 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-400/30 rounded-full blur-xl animate-float-delay"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8">
          {/* Main Heading */}
          <div className="space-y-4">
            <Badge variant="outline" className="bg-white/50 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              New: Card Creator Tool
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {currentContent.title}
              </span>
              <br />
              <span className="text-gray-800 dark:text-gray-200">
                {currentContent.subtitle}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {currentContent.description}
            </p>
          </div>

          {/* Featured Quote */}
          <Card className="max-w-2xl mx-auto bg-white/70 backdrop-blur-sm border-0 shadow-2xl">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-2 h-16 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                <div className="text-left">
                  <p className="text-lg md:text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">
                    {featuredQuotes[language][currentQuote]}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {language === 'en' ? 'Quote of the moment' : 'इस पल का कोट'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/wishes">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                {currentContent.cta}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/create-card">
              <Button variant="outline" size="lg" className="px-8 py-6 text-lg rounded-full hover:bg-white/80 backdrop-blur-sm">
                <Sparkles className="w-5 h-5 mr-2" />
                {language === 'en' ? 'Create Card' : 'कार्ड बनाएं'}
              </Button>
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            {currentContent.features.map((feature, index) => (
              <Card key={index} className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <feature.icon className="w-8 h-8 mx-auto mb-3 text-blue-600" />
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200">{feature.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}