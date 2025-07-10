"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Gift, 
  MessageCircle, 
  Brain, 
  Quote, 
  Palette, 
  Search,
  Heart,
  Download,
  Share,
  Languages,
  Moon,
  Smartphone
} from 'lucide-react';
import Link from 'next/link';

export function Features() {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
  }, []);

  const content = {
    en: {
      title: "Everything You Need",
      subtitle: "to Express Your Emotions",
      description: "Comprehensive tools and content to help you share your feelings with the world",
      sections: [
        {
          icon: Gift,
          title: "Wishes Collection",
          description: "Heartfelt wishes for birthdays, anniversaries, festivals, and special moments",
          features: ["Birthday Wishes", "Festival Greetings", "Anniversary Messages", "Success Wishes"],
          link: "/wishes"
        },
        {
          icon: MessageCircle,
          title: "Shayari Gallery",
          description: "Romantic, emotional, and motivational shayari for every mood",
          features: ["Romantic Shayari", "Sad Shayari", "Motivational Lines", "Friendship Quotes"],
          link: "/shayari"
        },
        {
          icon: Brain,
          title: "Mind Puzzles",
          description: "Challenge your brain with riddles, logic puzzles, and brain teasers",
          features: ["Logic Puzzles", "Riddles", "Brain Teasers", "Math Puzzles"],
          link: "/puzzles"
        },
        {
          icon: Quote,
          title: "Inspiring Quotes",
          description: "Daily dose of motivation and wisdom from life experiences",
          features: ["Life Quotes", "Success Mantras", "Self-Love Quotes", "Deep Thoughts"],
          link: "/quotes"
        },
        {
          icon: Palette,
          title: "Card Creator",
          description: "Create stunning visual cards with quotes, wishes, and custom text using beautiful templates",
          features: ["100+ Templates", "Custom Backgrounds", "Font Styling", "Instant Download"],
          link: "/create-card"
        }
      ],
      globalFeatures: [
        { icon: Languages, title: "Bilingual", description: "English & Hindi" },
        { icon: Search, title: "Smart Search", description: "Find anything" },
        { icon: Heart, title: "Favorites", description: "Save & organize" },
        { icon: Download, title: "Download", description: "Save as images" },
        { icon: Share, title: "Share", description: "Social media" },
        { icon: Moon, title: "Dark Mode", description: "Eye-friendly" },
        { icon: Smartphone, title: "Responsive", description: "All devices" }
      ]
    },
    hi: {
      title: "सब कुछ जो आपको चाहिए",
      subtitle: "अपनी भावनाओं को व्यक्त करने के लिए",
      description: "दुनिया के साथ अपनी भावनाओं को साझा करने के लिए व्यापक उपकरण और सामग्री",
      sections: [
        {
          icon: Gift,
          title: "शुभकामनाओं का संग्रह",
          description: "जन्मदिन, वर्षगांठ, त्योहारों और विशेष क्षणों के लिए दिल से शुभकामनाएं",
          features: ["जन्मदिन की शुभकामनाएं", "त्योहारी बधाई", "वर्षगांठ संदेश", "सफलता की शुभकामनाएं"],
          link: "/wishes"
        },
        {
          icon: MessageCircle,
          title: "शायरी गैलरी",
          description: "हर मूड के लिए रोमांटिक, भावनात्मक और प्रेरणादायक शायरी",
          features: ["रोमांटिक शायरी", "दुखी शायरी", "प्रेरणादायक लाइनें", "दोस्ती के कोट्स"],
          link: "/shayari"
        },
        {
          icon: Brain,
          title: "दिमागी पहेलियां",
          description: "पहेलियों, लॉजिक पज़ल्स और ब्रेन टीज़र के साथ अपने दिमाग को चुनौती दें",
          features: ["लॉजिक पज़ल्स", "पहेलियां", "ब्रेन टीज़र", "गणित की पहेलियां"],
          link: "/puzzles"
        },
        {
          icon: Quote,
          title: "प्रेरणादायक कोट्स",
          description: "जीवन के अनुभवों से प्रेरणा और ज्ञान की दैनिक खुराक",
          features: ["जीवन के कोट्स", "सफलता के मंत्र", "आत्म-प्रेम कोट्स", "गहरे विचार"],
          link: "/quotes"
        },
        {
          icon: Palette,
          title: "कार्ड क्रिएटर",
          description: "सुंदर टेम्प्लेट्स का उपयोग करके कोट्स, शुभकामनाओं और कस्टम टेक्स्ट के साथ शानदार विज़ुअल कार्ड बनाएं",
          features: ["100+ टेम्प्लेट", "कस्टम बैकग्राउंड", "फ़ॉन्ट स्टाइलिंग", "तुरंत डाउनलोड"],
          link: "/create-card"
        }
      ],
      globalFeatures: [
        { icon: Languages, title: "द्विभाषी", description: "अंग्रेजी और हिंदी" },
        { icon: Search, title: "स्मार्ट खोज", description: "कुछ भी खोजें" },
        { icon: Heart, title: "पसंदीदा", description: "सेव करें और व्यवस्थित करें" },
        { icon: Download, title: "डाउनलोड", description: "इमेज के रूप में सेव करें" },
        { icon: Share, title: "साझा करें", description: "सोशल मीडिया पर" },
        { icon: Moon, title: "डार्क मोड", description: "आंखों के लिए आरामदायक" },
        { icon: Smartphone, title: "रिस्पॉन्सिव", description: "सभी डिवाइसेस पर" }
      ]
    }
  };

  const currentContent = content[language];

  return (
    <div className="py-20 bg-gradient-to-b from-transparent to-white/50 dark:to-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {currentContent.title}
            </span>
            <br />
            <span className="text-gray-800 dark:text-gray-200">
              {currentContent.subtitle}
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {currentContent.description}
          </p>
        </div>

        {/* Main Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {currentContent.sections.map((section, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <section.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{section.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {section.description}
                </p>
                <div className="space-y-2 mb-4">
                  {section.features.map((feature, idx) => (
                    <Badge key={idx} variant="secondary" className="mr-2 mb-2">
                      {feature}
                    </Badge>
                  ))}
                </div>
                <Link href={section.link}>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    {language === 'en' ? 'Explore' : 'देखें'}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Global Features */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">
            {language === 'en' ? 'Powerful Features' : 'शक्तिशाली विशेषताएं'}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {currentContent.globalFeatures.map((feature, index) => (
              <div key={index} className="text-center p-4 rounded-lg hover:bg-white/50 transition-colors duration-200">
                <feature.icon className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <h4 className="font-semibold text-sm text-gray-800 dark:text-gray-200">{feature.title}</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}