"use client";

import { useState, useEffect } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { ContentCard } from '@/components/content-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, Gift, Heart, Calendar, Trophy, Sparkles } from 'lucide-react';

export default function WishesPage() {
  const [language, setLanguage] = useState('en');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredWishes, setFilteredWishes] = useState([]);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
  }, []);

  const wishesData = {
    en: {
      title: "Beautiful Wishes",
      subtitle: "For Every Special Occasion",
      description: "Express your heart with our collection of heartfelt wishes for birthdays, anniversaries, festivals, and life's precious moments.",
      categories: [
        { id: 'all', label: 'All Wishes', icon: Gift },
        { id: 'birthday', label: 'Birthday', icon: Calendar },
        { id: 'anniversary', label: 'Anniversary', icon: Heart },
        { id: 'festival', label: 'Festivals', icon: Sparkles },
        { id: 'success', label: 'Success', icon: Trophy },
        { id: 'love', label: 'Love', icon: Heart },
        { id: 'friendship', label: 'Friendship', icon: Heart }
      ],
      wishes: [
        {
          id: 1,
          category: 'birthday',
          text: "May your birthday be filled with sunshine, smiles, laughter, love, and all the wonderful things that make you happy!",
          tags: ['birthday', 'celebration', 'joy']
        },
        {
          id: 2,
          category: 'birthday',
          text: "Another year older, another year wiser, and another year more amazing! Happy Birthday!",
          tags: ['birthday', 'wisdom', 'celebration']
        },
        {
          id: 3,
          category: 'anniversary',
          text: "Your love story continues to inspire us all. Wishing you both a lifetime of happiness and togetherness!",
          tags: ['anniversary', 'love', 'togetherness']
        },
        {
          id: 4,
          category: 'festival',
          text: "May this festival bring you endless joy, prosperity, and beautiful moments with your loved ones!",
          tags: ['festival', 'joy', 'prosperity']
        },
        {
          id: 5,
          category: 'success',
          text: "Your hard work and dedication have paid off! Congratulations on your amazing achievement!",
          tags: ['success', 'achievement', 'congratulations']
        },
        {
          id: 6,
          category: 'love',
          text: "In your eyes, I found my home. In your heart, I found my love. In your soul, I found my mate.",
          tags: ['love', 'romance', 'soulmate']
        },
        {
          id: 7,
          category: 'friendship',
          text: "A true friend is someone who knows all your stories, but still loves you anyway. Thank you for being that friend!",
          tags: ['friendship', 'gratitude', 'love']
        },
        {
          id: 8,
          category: 'birthday',
          text: "Count your age by friends, not years. Count your life by smiles, not tears. Happy Birthday!",
          tags: ['birthday', 'friends', 'happiness']
        },
        {
          id: 9,
          category: 'anniversary',
          text: "Two hearts, one love, endless memories. Congratulations on another year of beautiful togetherness!",
          tags: ['anniversary', 'love', 'memories']
        },
        {
          id: 10,
          category: 'festival',
          text: "May the lights of this festival illuminate your path to happiness and success throughout the year!",
          tags: ['festival', 'happiness', 'success']
        },
        {
          id: 11,
          category: 'success',
          text: "Success is not just about reaching your destination, but enjoying the journey. Well done!",
          tags: ['success', 'journey', 'achievement']
        },
        {
          id: 12,
          category: 'love',
          text: "Love is not about finding the perfect person, but about seeing an imperfect person perfectly.",
          tags: ['love', 'perfection', 'understanding']
        }
      ]
    },
    hi: {
      title: "सुंदर शुभकामनाएं",
      subtitle: "हर विशेष अवसर के लिए",
      description: "जन्मदिन, वर्षगांठ, त्योहारों और जीवन के कीमती पलों के लिए दिल से शुभकामनाओं के हमारे संग्रह के साथ अपना दिल व्यक्त करें।",
      categories: [
        { id: 'all', label: 'सभी शुभकामनाएं', icon: Gift },
        { id: 'birthday', label: 'जन्मदिन', icon: Calendar },
        { id: 'anniversary', label: 'वर्षगांठ', icon: Heart },
        { id: 'festival', label: 'त्योहार', icon: Sparkles },
        { id: 'success', label: 'सफलता', icon: Trophy },
        { id: 'love', label: 'प्रेम', icon: Heart },
        { id: 'friendship', label: 'दोस्ती', icon: Heart }
      ],
      wishes: [
        {
          id: 1,
          category: 'birthday',
          text: "आपका जन्मदिन धूप, मुस्कान, हंसी, प्यार और उन सभी अद्भुत चीजों से भरा हो जो आपको खुश करती हैं!",
          tags: ['जन्मदिन', 'जश्न', 'खुशी']
        },
        {
          id: 2,
          category: 'birthday',
          text: "एक साल और बड़े, एक साल और बुद्धिमान, और एक साल और भी शानदार! जन्मदिन मुबारक!",
          tags: ['जन्मदिन', 'बुद्धि', 'जश्न']
        },
        {
          id: 3,
          category: 'anniversary',
          text: "आपकी प्रेम कहानी हम सभी को प्रेरणा देती रहती है। आप दोनों को खुशी और साथ की जिंदगी की शुभकामनाएं!",
          tags: ['वर्षगांठ', 'प्रेम', 'साथ']
        },
        {
          id: 4,
          category: 'festival',
          text: "यह त्योहार आपके लिए अनगिनत खुशी, समृद्धि और अपनों के साथ सुंदर पल लेकर आए!",
          tags: ['त्योहार', 'खुशी', 'समृद्धि']
        },
        {
          id: 5,
          category: 'success',
          text: "आपकी मेहनत और समर्पण का फल मिल गया है! आपकी शानदार उपलब्धि के लिए बधाई!",
          tags: ['सफलता', 'उपलब्धि', 'बधाई']
        },
        {
          id: 6,
          category: 'love',
          text: "आपकी आंखों में मुझे मेरा घर मिला। आपके दिल में मुझे मेरा प्रेम मिला। आपकी आत्मा में मुझे मेरा साथी मिला।",
          tags: ['प्रेम', 'रोमांस', 'आत्मा']
        },
        {
          id: 7,
          category: 'friendship',
          text: "सच्चा दोस्त वह है जो आपकी सभी कहानियां जानता है, फिर भी आपसे प्यार करता है। ऐसा दोस्त होने के लिए धन्यवाद!",
          tags: ['दोस्ती', 'कृतज्ञता', 'प्रेम']
        },
        {
          id: 8,
          category: 'birthday',
          text: "अपनी उम्र दोस्तों से गिनें, सालों से नहीं। अपनी जिंदगी मुस्कान से गिनें, आंसुओं से नहीं। जन्मदिन मुबारक!",
          tags: ['जन्मदिन', 'दोस्त', 'खुशी']
        },
        {
          id: 9,
          category: 'anniversary',
          text: "दो दिल, एक प्रेम, अनगिनत यादें। सुंदर साथ के एक और साल की बधाई!",
          tags: ['वर्षगांठ', 'प्रेम', 'यादें']
        },
        {
          id: 10,
          category: 'festival',
          text: "इस त्योहार की रोशनी आपके खुशी और सफलता के रास्ते को साल भर रोशन करती रहे!",
          tags: ['त्योहार', 'खुशी', 'सफलता']
        },
        {
          id: 11,
          category: 'success',
          text: "सफलता सिर्फ मंजिल तक पहुंचने का नाम नहीं, बल्कि यात्रा का आनंद लेने का भी है। शाबाश!",
          tags: ['सफलता', 'यात्रा', 'उपलब्धि']
        },
        {
          id: 12,
          category: 'love',
          text: "प्रेम परफेक्ट इंसान ढूंढने का नाम नहीं, बल्कि अपूर्ण इंसान को पूर्ण रूप से देखने का है।",
          tags: ['प्रेम', 'पूर्णता', 'समझ']
        }
      ]
    }
  };

  const currentData = wishesData[language];

  useEffect(() => {
    let filtered = currentData.wishes;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(wish => wish.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter(wish => 
        wish.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        wish.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredWishes(filtered);
  }, [selectedCategory, searchQuery, currentData.wishes]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
      <Navigation />
      
      <div className="pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
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
                    placeholder={language === 'en' ? 'Search wishes...' : 'शुभकामनाएं खोजें...'}
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
                ? `Showing ${filteredWishes.length} wish${filteredWishes.length !== 1 ? 'es' : ''}`
                : `${filteredWishes.length} शुभकामना${filteredWishes.length !== 1 ? 'एं' : ''} दिखाई जा रही हैं`
              }
            </p>
          </div>

          {/* Wishes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWishes.map((wish) => (
              <ContentCard
                key={wish.id}
                content={wish.text}
                tags={wish.tags}
                category={wish.category}
                type="wish"
                language={language}
              />
            ))}
          </div>

          {/* No Results */}
          {filteredWishes.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {language === 'en' ? 'No wishes found' : 'कोई शुभकामना नहीं मिली'}
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