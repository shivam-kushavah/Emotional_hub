"use client";

import { useState, useEffect } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { ContentCard } from '@/components/content-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Filter, Quote, Zap, Heart, Sun, Moon, Target, Lightbulb } from 'lucide-react';

export default function QuotesPage() {
  const [language, setLanguage] = useState('en');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredQuotes, setFilteredQuotes] = useState([]);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
  }, []);

  const quotesData = {
    en: {
      title: "Inspiring Quotes",
      subtitle: "Words That Change Lives",
      description: "Discover powerful quotes that motivate, inspire, and transform your perspective on life, success, and happiness.",
      categories: [
        { id: 'all', label: 'All Quotes', icon: Quote },
        { id: 'motivational', label: 'Motivational', icon: Zap },
        { id: 'life', label: 'Life', icon: Heart },
        { id: 'success', label: 'Success', icon: Target },
        { id: 'morning', label: 'Morning', icon: Sun },
        { id: 'night', label: 'Night', icon: Moon },
        { id: 'wisdom', label: 'Wisdom', icon: Lightbulb }
      ],
      quotes: [
        {
          id: 1,
          category: 'motivational',
          text: "The only impossible journey is the one you never begin.\nStart today, start now, start with what you have.\nEvery expert was once a beginner.",
          tags: ['journey', 'begin', 'start', 'expert']
        },
        {
          id: 2,
          category: 'life',
          text: "Life is not about waiting for the storm to pass.\nIt's about learning to dance in the rain.\nEmbrace every moment, good or bad.",
          tags: ['life', 'storm', 'dance', 'embrace']
        },
        {
          id: 3,
          category: 'success',
          text: "Success is not final, failure is not fatal.\nIt is the courage to continue that counts.\nKeep moving forward, always.",
          tags: ['success', 'failure', 'courage', 'forward']
        },
        {
          id: 4,
          category: 'morning',
          text: "Every morning brings new potential.\nEvery sunrise brings new hope.\nToday is your day to shine bright.",
          tags: ['morning', 'potential', 'sunrise', 'shine']
        },
        {
          id: 5,
          category: 'night',
          text: "The night is not the end of the day.\nIt's the beginning of tomorrow's dreams.\nRest well, dream big.",
          tags: ['night', 'dreams', 'tomorrow', 'rest']
        },
        {
          id: 6,
          category: 'wisdom',
          text: "Wisdom comes from experience.\nExperience comes from mistakes.\nMistakes come from trying.",
          tags: ['wisdom', 'experience', 'mistakes', 'trying']
        },
        {
          id: 7,
          category: 'motivational',
          text: "Your limitation—it's only your imagination.\nPush yourself because no one else will.\nGreat things never come from comfort zones.",
          tags: ['limitation', 'imagination', 'push', 'comfort']
        },
        {
          id: 8,
          category: 'life',
          text: "Life is 10% what happens to you.\nAnd 90% how you react to it.\nChoose your reactions wisely.",
          tags: ['life', 'happens', 'react', 'choose']
        }
      ]
    },
    hi: {
      title: "प्रेरणादायक कोट्स",
      subtitle: "वे शब्द जो जिंदगी बदल देते हैं",
      description: "शक्तिशाली कोट्स खोजें जो प्रेरणा देते हैं, उत्साहित करते हैं और जीवन, सफलता और खुशी पर आपका नजरिया बदल देते हैं।",
      categories: [
        { id: 'all', label: 'सभी कोट्स', icon: Quote },
        { id: 'motivational', label: 'प्रेरणादायक', icon: Zap },
        { id: 'life', label: 'जिंदगी', icon: Heart },
        { id: 'success', label: 'सफलता', icon: Target },
        { id: 'morning', label: 'सुबह', icon: Sun },
        { id: 'night', label: 'रात', icon: Moon },
        { id: 'wisdom', label: 'ज्ञान', icon: Lightbulb }
      ],
      quotes: [
        {
          id: 1,
          category: 'motivational',
          text: "केवल वही यात्रा असंभव है जिसकी शुरुआत आप कभी नहीं करते।\nआज शुरू करें, अभी शुरू करें, जो है उसी से शुरू करें।\nहर विशेषज्ञ कभी शुरुआती था।",
          tags: ['यात्रा', 'शुरुआत', 'आज', 'विशेषज्ञ']
        },
        {
          id: 2,
          category: 'life',
          text: "जिंदगी तूफान के गुजरने का इंतजार करने का नाम नहीं।\nबल्कि बारिश में नाचना सीखने का है।\nहर पल को अपनाएं, अच्छा हो या बुरा।",
          tags: ['जिंदगी', 'तूफान', 'नाचना', 'अपनाना']
        },
        {
          id: 3,
          category: 'success',
          text: "सफलता अंतिम नहीं, असफलता घातक नहीं।\nजारी रखने का साहस ही मायने रखता है।\nहमेशा आगे बढ़ते रहें।",
          tags: ['सफलता', 'असफलता', 'साहस', 'आगे']
        },
        {
          id: 4,
          category: 'morning',
          text: "हर सुबह नई संभावना लाती है।\nहर सूर्योदय नई उम्मीद लाता है।\nआज आपका दिन है चमकने का।",
          tags: ['सुबह', 'संभावना', 'सूर्योदय', 'चमकना']
        },
        {
          id: 5,
          category: 'night',
          text: "रात दिन का अंत नहीं है।\nबल्कि कल के सपनों की शुरुआत है।\nअच्छा आराम करें, बड़े सपने देखें।",
          tags: ['रात', 'सपने', 'कल', 'आराम']
        },
        {
          id: 6,
          category: 'wisdom',
          text: "ज्ञान अनुभव से आता है।\nअनुभव गलतियों से आता है।\nगलतियां कोशिश करने से आती हैं।",
          tags: ['ज्ञान', 'अनुभव', 'गलतियां', 'कोशिश']
        },
        {
          id: 7,
          category: 'motivational',
          text: "आपकी सीमा—केवल आपकी कल्पना है।\nखुद को आगे बढ़ाएं क्योंकि कोई और नहीं करेगा।\nमहान चीजें कभी आराम क्षेत्र से नहीं आतीं।",
          tags: ['सीमा', 'कल्पना', 'आगे', 'आराम']
        },
        {
          id: 8,
          category: 'life',
          text: "जिंदगी 10% वो है जो आपके साथ होता है।\nऔर 90% वो है कि आप उस पर कैसे प्रतिक्रिया देते हैं।\nअपनी प्रतिक्रियाएं समझदारी से चुनें।",
          tags: ['जिंदगी', 'होना', 'प्रतिक्रिया', 'चुनना']
        }
      ]
    }
  };

  const currentData = quotesData[language];

  useEffect(() => {
    let filtered = currentData.quotes;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter(item => 
        item.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredQuotes(filtered);
  }, [selectedCategory, searchQuery, currentData.quotes]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-yellow-900 dark:to-orange-900">
      <Navigation />
      
      <div className="pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text text-transparent">
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
                    placeholder={language === 'en' ? 'Search quotes...' : 'कोट्स खोजें...'}
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
                ? `Showing ${filteredQuotes.length} quote${filteredQuotes.length !== 1 ? 's' : ''}`
                : `${filteredQuotes.length} कोट्स दिखाए जा रहे हैं`
              }
            </p>
          </div>

          {/* Quotes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuotes.map((item) => (
              <ContentCard
                key={item.id}
                content={item.text}
                tags={item.tags}
                category={item.category}
                type="quote"
                language={language}
              />
            ))}
          </div>

          {/* No Results */}
          {filteredQuotes.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {language === 'en' ? 'No quotes found' : 'कोई कोट्स नहीं मिले'}
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