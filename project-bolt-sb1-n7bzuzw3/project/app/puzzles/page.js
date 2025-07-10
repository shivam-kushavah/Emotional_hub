"use client";

import { useState, useEffect } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Brain, Eye, EyeOff, Lightbulb, Target, Zap, Calculator } from 'lucide-react';

export default function PuzzlesPage() {
  const [language, setLanguage] = useState('en');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [filteredPuzzles, setFilteredPuzzles] = useState([]);
  const [showAnswers, setShowAnswers] = useState({});

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
  }, []);

  const puzzlesData = {
    en: {
      title: "Brain Puzzles",
      subtitle: "Challenge Your Mind",
      description: "Test your intelligence with riddles, logic puzzles, and brain teasers that will make you think outside the box.",
      categories: [
        { id: 'all', label: 'All Puzzles', icon: Brain },
        { id: 'riddles', label: 'Riddles', icon: Lightbulb },
        { id: 'logic', label: 'Logic', icon: Target },
        { id: 'math', label: 'Math', icon: Calculator },
        { id: 'wordplay', label: 'Word Play', icon: Zap }
      ],
      difficulties: [
        { id: 'all', label: 'All Levels' },
        { id: 'easy', label: 'Easy' },
        { id: 'medium', label: 'Medium' },
        { id: 'hard', label: 'Hard' }
      ],
      puzzles: [
        {
          id: 1,
          category: 'riddles',
          difficulty: 'easy',
          question: "I have keys but no locks. I have space but no room. You can enter, but you can't go outside. What am I?",
          answer: "A keyboard",
          tags: ['keys', 'space', 'enter', 'technology']
        },
        {
          id: 2,
          category: 'logic',
          difficulty: 'medium',
          question: "A man lives on the 20th floor of an apartment building. Every morning he takes the elevator down to the ground floor. When he comes home, he takes the elevator to the 10th floor and walks the rest of the way... except on rainy days, when he takes the elevator all the way to the 20th floor. Why?",
          answer: "The man is too short to reach the button for the 20th floor. He can only reach the 10th floor button. On rainy days, he has an umbrella which he uses to press the 20th floor button.",
          tags: ['elevator', 'height', 'umbrella', 'logic']
        },
        {
          id: 3,
          category: 'math',
          difficulty: 'easy',
          question: "If you have 3 apples and you take away 2, how many do you have?",
          answer: "2 apples (the ones you took)",
          tags: ['apples', 'subtraction', 'trick', 'simple']
        },
        {
          id: 4,
          category: 'wordplay',
          difficulty: 'medium',
          question: "What word becomes shorter when you add two letters to it?",
          answer: "Short (add 'er' to make 'shorter')",
          tags: ['word', 'letters', 'shorter', 'clever']
        },
        {
          id: 5,
          category: 'riddles',
          difficulty: 'hard',
          question: "I am not alive, but I grow; I don't have lungs, but I need air; I don't have a mouth, but water kills me. What am I?",
          answer: "Fire",
          tags: ['alive', 'grow', 'air', 'water']
        },
        {
          id: 6,
          category: 'logic',
          difficulty: 'hard',
          question: "You are in a room with 3 light switches. Each switch controls a light bulb in another room. You can only visit the other room once. How do you determine which switch controls which bulb?",
          answer: "Turn on the first switch for a few minutes, then turn it off. Turn on the second switch and leave it on. Go to the room: the bulb that's on is controlled by the second switch, the bulb that's off but warm is controlled by the first switch, and the bulb that's off and cool is controlled by the third switch.",
          tags: ['switches', 'bulbs', 'temperature', 'strategy']
        }
      ]
    },
    hi: {
      title: "दिमागी पहेलियां",
      subtitle: "अपने दिमाग को चुनौती दें",
      description: "पहेलियों, तर्क पज़ल्स और ब्रेन टीज़र के साथ अपनी बुद्धि का परीक्षण करें जो आपको अलग तरीके से सोचने पर मजबूर करेंगे।",
      categories: [
        { id: 'all', label: 'सभी पहेलियां', icon: Brain },
        { id: 'riddles', label: 'पहेलियां', icon: Lightbulb },
        { id: 'logic', label: 'तर्क', icon: Target },
        { id: 'math', label: 'गणित', icon: Calculator },
        { id: 'wordplay', label: 'शब्द खेल', icon: Zap }
      ],
      difficulties: [
        { id: 'all', label: 'सभी स्तर' },
        { id: 'easy', label: 'आसान' },
        { id: 'medium', label: 'मध्यम' },
        { id: 'hard', label: 'कठिन' }
      ],
      puzzles: [
        {
          id: 1,
          category: 'riddles',
          difficulty: 'easy',
          question: "मेरे पास चाबियां हैं लेकिन ताले नहीं। मेरे पास जगह है लेकिन कमरा नहीं। आप प्रवेश कर सकते हैं, लेकिन बाहर नहीं जा सकते। मैं क्या हूं?",
          answer: "कीबोर्ड",
          tags: ['चाबियां', 'जगह', 'प्रवेश', 'तकनीक']
        },
        {
          id: 2,
          category: 'logic',
          difficulty: 'medium',
          question: "एक आदमी अपार्टमेंट बिल्डिंग की 20वीं मंजिल पर रहता है। हर सुबह वह लिफ्ट से नीचे जमीनी तल पर जाता है। जब वह घर आता है, तो वह लिफ्ट से 10वीं मंजिल तक जाता है और बाकी रास्ता पैदल चलता है... सिवाय बारिश के दिनों के, जब वह लिफ्ट से सीधे 20वीं मंजिल तक जाता है। क्यों?",
          answer: "आदमी बहुत छोटा है और 20वीं मंजिल का बटन नहीं दबा सकता। वह केवल 10वीं मंजिल का बटन दबा सकता है। बारिश के दिनों में, उसके पास छाता होता है जिससे वह 20वीं मंजिल का बटन दबाता है।",
          tags: ['लिफ्ट', 'ऊंचाई', 'छाता', 'तर्क']
        },
        {
          id: 3,
          category: 'math',
          difficulty: 'easy',
          question: "अगर आपके पास 3 सेब हैं और आप 2 ले लेते हैं, तो आपके पास कितने हैं?",
          answer: "2 सेब (जो आपने लिए हैं)",
          tags: ['सेब', 'घटाना', 'चाल', 'सरल']
        },
        {
          id: 4,
          category: 'wordplay',
          difficulty: 'medium',
          question: "कौन सा शब्द छोटा हो जाता है जब आप उसमें दो अक्षर जोड़ते हैं?",
          answer: "छोटा (जब 'सा' जोड़कर 'छोटासा' बनाते हैं)",
          tags: ['शब्द', 'अक्षर', 'छोटा', 'चतुर']
        },
        {
          id: 5,
          category: 'riddles',
          difficulty: 'hard',
          question: "मैं जीवित नहीं हूं, लेकिन बढ़ता हूं; मेरे पास फेफड़े नहीं हैं, लेकिन मुझे हवा चाहिए; मेरे पास मुंह नहीं है, लेकिन पानी मुझे मार देता है। मैं क्या हूं?",
          answer: "आग",
          tags: ['जीवित', 'बढ़ना', 'हवा', 'पानी']
        },
        {
          id: 6,
          category: 'logic',
          difficulty: 'hard',
          question: "आप एक कमरे में हैं जिसमें 3 लाइट स्विच हैं। हर स्विच दूसरे कमरे में एक बल्ब को नियंत्रित करता है। आप दूसरे कमरे में केवल एक बार जा सकते हैं। आप कैसे पता करेंगे कि कौन सा स्विच कौन सा बल्ब नियंत्रित करता है?",
          answer: "पहले स्विच को कुछ मिनट के लिए चालू करें, फिर बंद कर दें। दूसरे स्विच को चालू करें और चालू छोड़ दें। कमरे में जाएं: जो बल्ब जल रहा है वह दूसरे स्विच से नियंत्रित है, जो बल्ब बंद है लेकिन गर्म है वह पहले स्विच से नियंत्रित है, और जो बल्ब बंद और ठंडा है वह तीसरे स्विच से नियंत्रित है।",
          tags: ['स्विच', 'बल्ब', 'तापमान', 'रणनीति']
        }
      ]
    }
  };

  const currentData = puzzlesData[language];

  useEffect(() => {
    let filtered = currentData.puzzles;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(item => item.difficulty === selectedDifficulty);
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter(item => 
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredPuzzles(filtered);
  }, [selectedCategory, selectedDifficulty, searchQuery, currentData.puzzles]);

  const toggleAnswer = (puzzleId) => {
    setShowAnswers(prev => ({
      ...prev,
      [puzzleId]: !prev[puzzleId]
    }));
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      easy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      hard: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    };
    return colors[difficulty] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-green-900 dark:to-blue-900">
      <Navigation />
      
      <div className="pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
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
              <div className="flex flex-col gap-4">
                <div className="relative max-w-md mx-auto">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder={language === 'en' ? 'Search puzzles...' : 'पहेलियां खोजें...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
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
                  
                  <div className="flex flex-wrap gap-2">
                    {currentData.difficulties.map((difficulty) => (
                      <Button
                        key={difficulty.id}
                        variant={selectedDifficulty === difficulty.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedDifficulty(difficulty.id)}
                      >
                        {difficulty.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {language === 'en' 
                ? `Showing ${filteredPuzzles.length} puzzle${filteredPuzzles.length !== 1 ? 's' : ''}`
                : `${filteredPuzzles.length} पहेलियां दिखाई जा रही हैं`
              }
            </p>
          </div>

          {/* Puzzles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPuzzles.map((puzzle) => (
              <Card key={puzzle.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className={getDifficultyColor(puzzle.difficulty)}>
                      {language === 'en' ? puzzle.difficulty : 
                        puzzle.difficulty === 'easy' ? 'आसान' : 
                        puzzle.difficulty === 'medium' ? 'मध्यम' : 'कठिन'}
                    </Badge>
                    <Badge variant="outline">
                      {puzzle.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">
                    {language === 'en' ? 'Puzzle' : 'पहेली'} #{puzzle.id}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className={`text-gray-800 dark:text-gray-200 leading-relaxed ${language === 'hi' ? 'hindi-font' : ''}`}>
                      {puzzle.question}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {puzzle.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="border-t pt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleAnswer(puzzle.id)}
                        className="flex items-center space-x-2 mb-3"
                      >
                        {showAnswers[puzzle.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        <span>
                          {showAnswers[puzzle.id] 
                            ? (language === 'en' ? 'Hide Answer' : 'उत्तर छुपाएं')
                            : (language === 'en' ? 'Show Answer' : 'उत्तर दिखाएं')
                          }
                        </span>
                      </Button>
                      
                      {showAnswers[puzzle.id] && (
                        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                          <p className={`text-green-800 dark:text-green-200 font-medium ${language === 'hi' ? 'hindi-font' : ''}`}>
                            <strong>{language === 'en' ? 'Answer:' : 'उत्तर:'}</strong> {puzzle.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredPuzzles.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {language === 'en' ? 'No puzzles found' : 'कोई पहेली नहीं मिली'}
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
                  setSelectedDifficulty('all');
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