"use client";

import { useState, useEffect } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { ContentCard } from '@/components/content-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Heart, Trash2, Filter } from 'lucide-react';

export default function FavoritesPage() {
  const [language, setLanguage] = useState('en');
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [filteredFavorites, setFilteredFavorites] = useState([]);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
    
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(savedFavorites);
  }, []);

  const content = {
    en: {
      title: "Your Favorites",
      subtitle: "Saved Content Collection",
      description: "All your favorite wishes, shayari, quotes, and puzzles in one place.",
      types: [
        { id: 'all', label: 'All Types' },
        { id: 'wish', label: 'Wishes' },
        { id: 'shayari', label: 'Shayari' },
        { id: 'quote', label: 'Quotes' },
        { id: 'puzzle', label: 'Puzzles' }
      ],
      empty: {
        title: "No favorites yet",
        description: "Start adding content to your favorites by clicking the heart icon on any wish, shayari, or quote.",
        button: "Explore Content"
      },
      buttons: {
        clearAll: "Clear All",
        confirmClear: "Are you sure you want to clear all favorites?"
      }
    },
    hi: {
      title: "आपके पसंदीदा",
      subtitle: "सेव की गई सामग्री संग्रह",
      description: "आपकी सभी पसंदीदा शुभकामनाएं, शायरी, कोट्स और पहेलियां एक जगह।",
      types: [
        { id: 'all', label: 'सभी प्रकार' },
        { id: 'wish', label: 'शुभकामनाएं' },
        { id: 'shayari', label: 'शायरी' },
        { id: 'quote', label: 'कोट्स' },
        { id: 'puzzle', label: 'पहेलियां' }
      ],
      empty: {
        title: "अभी तक कोई पसंदीदा नहीं",
        description: "किसी भी शुभकामना, शायरी या कोट पर हार्ट आइकन पर क्लिक करके अपने पसंदीदा में सामग्री जोड़ना शुरू करें।",
        button: "सामग्री देखें"
      },
      buttons: {
        clearAll: "सभी साफ़ करें",
        confirmClear: "क्या आप वाकई सभी पसंदीदा साफ़ करना चाहते हैं?"
      }
    }
  };

  const currentContent = content[language];

  useEffect(() => {
    let filtered = favorites;

    if (selectedType !== 'all') {
      filtered = filtered.filter(item => item.type === selectedType);
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter(item => 
        item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
      );
    }

    setFilteredFavorites(filtered);
  }, [favorites, selectedType, searchQuery]);

  const clearAllFavorites = () => {
    if (window.confirm(currentContent.buttons.confirmClear)) {
      localStorage.removeItem('favorites');
      setFavorites([]);
      setFilteredFavorites([]);
    }
  };

  const removeFavorite = (favoriteId) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== favoriteId);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-rose-50 dark:from-gray-900 dark:via-red-900 dark:to-pink-900">
      <Navigation />
      
      <div className="pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                {currentContent.title}
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
              {currentContent.subtitle}
            </p>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              {currentContent.description}
            </p>
          </div>

          {favorites.length > 0 ? (
            <>
              {/* Search and Filter */}
              <Card className="mb-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4 items-center">
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder={language === 'en' ? 'Search favorites...' : 'पसंदीदा खोजें...'}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {currentContent.types.map((type) => (
                        <Button
                          key={type.id}
                          variant={selectedType === type.id ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedType(type.id)}
                        >
                          {type.label}
                        </Button>
                      ))}
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={clearAllFavorites}
                      className="flex items-center space-x-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>{currentContent.buttons.clearAll}</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Results Count */}
              <div className="mb-6">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {language === 'en' 
                    ? `Showing ${filteredFavorites.length} favorite${filteredFavorites.length !== 1 ? 's' : ''}`
                    : `${filteredFavorites.length} पसंदीदा दिखाए जा रहे हैं`
                  }
                </p>
              </div>

              {/* Favorites Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFavorites.map((favorite) => (
                  <div key={favorite.id} className="relative">
                    <ContentCard
                      content={favorite.content}
                      tags={favorite.tags || []}
                      category={favorite.category}
                      type={favorite.type}
                      language={favorite.language || language}
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeFavorite(favorite.id)}
                      className="absolute top-2 right-2 w-8 h-8 p-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>

              {/* No Results */}
              {filteredFavorites.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {language === 'en' ? 'No favorites found' : 'कोई पसंदीदा नहीं मिला'}
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
                      setSelectedType('all');
                    }}
                  >
                    {language === 'en' ? 'Clear filters' : 'फिल्टर साफ़ करें'}
                  </Button>
                </div>
              )}
            </>
          ) : (
            /* Empty State */
            <div className="text-center py-16">
              <div className="w-32 h-32 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-16 h-16 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                {currentContent.empty.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
                {currentContent.empty.description}
              </p>
              <Button asChild>
                <a href="/wishes">
                  {currentContent.empty.button}
                </a>
              </Button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}