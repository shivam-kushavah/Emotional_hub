"use client";

import { useState, useEffect, useCallback } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { ContentCard } from '@/components/content-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, Gift, Heart, Calendar, Trophy, Sparkles } from 'lucide-react';
import { apiClient } from '@/lib/api';
import { toast } from 'sonner';

export default function WishesPage() {
  const [language, setLanguage] = useState('en');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [wishes, setWishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    pages: 0
  });

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
    fetchWishes();
  }, []);

  const fetchWishes = useCallback(async (params = {}) => {
    setLoading(true);
    try {
      const response = await apiClient.getWishes({
        language,
        category: selectedCategory !== 'all' ? selectedCategory : undefined,
        search: searchQuery || undefined,
        page: pagination.page,
        limit: pagination.limit,
        ...params
      });
      
      setWishes(response.wishes);
      setPagination(response.pagination);
    } catch (error) {
      toast.error('Failed to fetch wishes');
      console.error('Error fetching wishes:', error);
    } finally {
      setLoading(false);
    }
  }, [language, selectedCategory, searchQuery, pagination.page, pagination.limit]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchWishes({ page: 1 });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [selectedCategory, searchQuery]);

  const categoriesData = {
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
    }
  };

  const currentData = categoriesData[language];

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
                ? `Showing ${wishes.length} wish${wishes.length !== 1 ? 'es' : ''} of ${pagination.total}`
                : `${pagination.total} में से ${wishes.length} शुभकामना${wishes.length !== 1 ? 'एं' : ''} दिखाई जा रही हैं`
              }
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-shimmer h-48 rounded-lg"></div>
              ))}
            </div>
          ) : (
            <>
              {/* Wishes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
                {wishes.map((wish, index) => (
                  <div key={wish._id} className={`animate-scale-in stagger-${(index % 5) + 1}`}>
                    <ContentCard
                      content={wish.content}
                      tags={wish.tags}
                      category={wish.category}
                      type="wish"
                      language={language}
                      id={wish._id}
                    />
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {pagination.pages > 1 && (
                <div className="flex justify-center mt-8 space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => fetchWishes({ page: pagination.page - 1 })}
                    disabled={pagination.page === 1}
                  >
                    {language === 'en' ? 'Previous' : 'पिछला'}
                  </Button>
                  <span className="flex items-center px-4 py-2 text-sm text-gray-600 dark:text-gray-400">
                    {pagination.page} of {pagination.pages}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => fetchWishes({ page: pagination.page + 1 })}
                    disabled={pagination.page === pagination.pages}
                  >
                    {language === 'en' ? 'Next' : 'अगला'}
                  </Button>
                </div>
              )}
            </>
          )}

          {/* No Results */}
          {!loading && wishes.length === 0 && (
            <div className="text-center py-12 animate-fade-in-up">
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