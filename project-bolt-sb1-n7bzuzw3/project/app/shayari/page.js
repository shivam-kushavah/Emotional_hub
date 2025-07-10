"use client";

import { useState, useEffect } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { ContentCard } from '@/components/content-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Filter, Heart, MessageCircle, Smile, Frown, Zap, Users } from 'lucide-react';

export default function ShayariPage() {
  const [language, setLanguage] = useState('en');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredShayari, setFilteredShayari] = useState([]);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
  }, []);

  const shayariData = {
    en: {
      title: "Beautiful Shayari",
      subtitle: "Express Your Heart Feelings",
      description: "Discover romantic, emotional, and motivational shayari that speaks to your soul and touches hearts.",
      categories: [
        { id: 'all', label: 'All Shayari', icon: MessageCircle },
        { id: 'romantic', label: 'Romantic', icon: Heart },
        { id: 'sad', label: 'Sad', icon: Frown },
        { id: 'motivational', label: 'Motivational', icon: Zap },
        { id: 'friendship', label: 'Friendship', icon: Users },
        { id: 'funny', label: 'Funny', icon: Smile },
        { id: 'life', label: 'Life', icon: MessageCircle }
      ],
      shayari: [
        {
          id: 1,
          category: 'romantic',
          text: "In your eyes I found my home,\nIn your heart I found my love,\nIn your soul I found my mate,\nForever yours, my heart will roam.",
          tags: ['love', 'romance', 'heart', 'soul']
        },
        {
          id: 2,
          category: 'romantic',
          text: "Your smile is my sunrise,\nYour laugh is my melody,\nYour love is my strength,\nYou are my everything, truly.",
          tags: ['smile', 'love', 'strength', 'everything']
        },
        {
          id: 3,
          category: 'sad',
          text: "Silent tears speak the loudest,\nBroken hearts feel the deepest,\nLonely nights teach us strength,\nPain makes us the strongest.",
          tags: ['tears', 'broken', 'lonely', 'pain']
        },
        {
          id: 4,
          category: 'motivational',
          text: "Rise like the sun each morning,\nShine through every storm,\nBelieve in your dreams,\nSuccess will take its form.",
          tags: ['rise', 'shine', 'dreams', 'success']
        },
        {
          id: 5,
          category: 'friendship',
          text: "True friends are like stars,\nYou don't always see them,\nBut you know they're there,\nShining bright in life's rhythm.",
          tags: ['friends', 'stars', 'shining', 'life']
        },
        {
          id: 6,
          category: 'funny',
          text: "Life is too short to be serious,\nLaugh at your mistakes,\nSmile at your failures,\nJoy is what happiness makes.",
          tags: ['life', 'laugh', 'smile', 'joy']
        },
        {
          id: 7,
          category: 'life',
          text: "Every sunset brings promise,\nEvery sunrise brings hope,\nEvery moment brings choice,\nEvery breath helps us cope.",
          tags: ['sunset', 'sunrise', 'hope', 'choice']
        },
        {
          id: 8,
          category: 'romantic',
          text: "Distance means nothing,\nWhen someone means everything,\nLove knows no boundaries,\nHearts have their own wings.",
          tags: ['distance', 'love', 'boundaries', 'hearts']
        }
      ]
    },
    hi: {
      title: "खूबसूरत शायरी",
      subtitle: "अपने दिल की बात कहें",
      description: "रोमांटिक, भावनात्मक और प्रेरणादायक शायरी खोजें जो आपकी आत्मा से बात करती है और दिलों को छूती है।",
      categories: [
        { id: 'all', label: 'सभी शायरी', icon: MessageCircle },
        { id: 'romantic', label: 'रोमांटिक', icon: Heart },
        { id: 'sad', label: 'दुखी', icon: Frown },
        { id: 'motivational', label: 'प्रेरणादायक', icon: Zap },
        { id: 'friendship', label: 'दोस्ती', icon: Users },
        { id: 'funny', label: 'मज़ेदार', icon: Smile },
        { id: 'life', label: 'जिंदगी', icon: MessageCircle }
      ],
      shayari: [
        {
          id: 1,
          category: 'romantic',
          text: "तेरी आंखों में मिला मुझे मेरा घर,\nतेरे दिल में मिला मुझे मेरा प्यार,\nतेरी रूह में मिला मुझे मेरा साथी,\nहमेशा तेरा रहेगा ये दिल बेकरार।",
          tags: ['प्यार', 'आंखें', 'दिल', 'रूह']
        },
        {
          id: 2,
          category: 'romantic',
          text: "तेरी मुस्कान है मेरी सुबह,\nतेरी हंसी है मेरा गाना,\nतेरा प्यार है मेरी ताकत,\nतू है मेरा सब कुछ, मेरा दीवाना।",
          tags: ['मुस्कान', 'हंसी', 'प्यार', 'ताकत']
        },
        {
          id: 3,
          category: 'sad',
          text: "खामोश आंसू सबसे ज्यादा बोलते हैं,\nटूटे दिल सबसे गहरा महसूस करते हैं,\nअकेली रातें हमें मजबूती सिखाती हैं,\nदर्द हमें सबसे मजबूत बनाता है।",
          tags: ['आंसू', 'टूटे दिल', 'अकेली', 'दर्द']
        },
        {
          id: 4,
          category: 'motivational',
          text: "हर सुबह सूरज की तरह उठो,\nहर तूफान में चमको,\nअपने सपनों पर भरोसा रखो,\nसफलता अपना रूप लेगी।",
          tags: ['सुबह', 'सूरज', 'सपने', 'सफलता']
        },
        {
          id: 5,
          category: 'friendship',
          text: "सच्चे दोस्त सितारों की तरह हैं,\nहमेशा दिखाई नहीं देते,\nलेकिन पता है वे वहां हैं,\nजिंदगी की लय में चमकते रहते हैं।",
          tags: ['दोस्त', 'सितारे', 'चमकना', 'जिंदगी']
        },
        {
          id: 6,
          category: 'funny',
          text: "जिंदगी गंभीर होने के लिए बहुत छोटी है,\nअपनी गलतियों पर हंसो,\nअपनी असफलताओं पर मुस्कराओ,\nखुशी वही है जो खुशी बनाती है।",
          tags: ['जिंदगी', 'हंसना', 'मुस्कराना', 'खुशी']
        },
        {
          id: 7,
          category: 'life',
          text: "हर सूर्यास्त वादा लाता है,\nहर सूर्योदय उम्मीद लाता है,\nहर पल विकल्प लाता है,\nहर सांस हमें जीने में मदद करती है।",
          tags: ['सूर्यास्त', 'सूर्योदय', 'उम्मीद', 'विकल्प']
        },
        {
          id: 8,
          category: 'romantic',
          text: "दूरी का कोई मतलब नहीं,\nजब कोई सब कुछ हो,\nप्यार कोई सीमा नहीं जानता,\nदिलों के अपने पंख होते हैं।",
          tags: ['दूरी', 'प्यार', 'सीमा', 'दिल']
        }
      ]
    }
  };

  const currentData = shayariData[language];

  useEffect(() => {
    let filtered = currentData.shayari;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter(item => 
        item.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredShayari(filtered);
  }, [selectedCategory, searchQuery, currentData.shayari]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 dark:from-gray-900 dark:via-rose-900 dark:to-purple-900">
      <Navigation />
      
      <div className="pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
                {currentData.title}
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
              {currentData.subtitle}
            </p>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              {currentData.description}
            </p>
          </div>

          {/* Search and Filter */}
          <Card className="mb-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder={language === 'en' ? 'Search shayari...' : 'शायरी खोजें...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentData.categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                      className="flex items-center space-x-2"
                    >
                      <category.icon className="w-4 h-4" />
                      <span>{category.label}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {language === 'en' 
                ? `Showing ${filteredShayari.length} shayari`
                : `${filteredShayari.length} शायरी दिखाई जा रही हैं`
              }
            </p>
          </div>

          {/* Shayari Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredShayari.map((item) => (
              <ContentCard
                key={item.id}
                content={item.text}
                tags={item.tags}
                category={item.category}
                type="shayari"
                language={language}
              />
            ))}
          </div>

          {/* No Results */}
          {filteredShayari.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {language === 'en' ? 'No shayari found' : 'कोई शायरी नहीं मिली'}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                {language === 'en' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'अपनी खोज या फिल्टर मानदंड को समायोजित करने का प्रयास करें'
                }
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
              >
                {language === 'en' ? 'Clear filters' : 'फिल्टर साफ़ करें'}
              </Button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}