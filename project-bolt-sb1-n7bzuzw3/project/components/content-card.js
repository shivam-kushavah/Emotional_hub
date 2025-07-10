"use client";

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { 
  Copy, 
  Share, 
  Heart, 
  HeartHandshake, 
  Palette, 
  Download,
  Facebook,
  Twitter,
  MessageCircle,
  Instagram
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function ContentCard({ content, tags = [], category, type, language = 'en' }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success(language === 'en' ? 'Copied to clipboard!' : 'क्लिपबोर्ड में कॉपी हो गया!');
    } catch (err) {
      toast.error(language === 'en' ? 'Failed to copy' : 'कॉपी करने में असफल');
    }
  };

  const handleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const contentId = `${type}-${content.slice(0, 50)}`;
    
    if (isFavorite) {
      const updated = favorites.filter(fav => fav.id !== contentId);
      localStorage.setItem('favorites', JSON.stringify(updated));
      setIsFavorite(false);
      toast.success(language === 'en' ? 'Removed from favorites' : 'पसंदीदा से हटा दिया गया');
    } else {
      const newFavorite = {
        id: contentId,
        content,
        tags,
        category,
        type,
        language,
        timestamp: new Date().toISOString()
      };
      favorites.push(newFavorite);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(true);
      toast.success(language === 'en' ? 'Added to favorites' : 'पसंदीदा में जोड़ा गया');
    }
  };

  const handleShare = (platform) => {
    const text = encodeURIComponent(content);
    const url = encodeURIComponent(window.location.href);
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`,
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
      instagram: `https://www.instagram.com/`, // Instagram doesn't support direct sharing
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  const handleCreateCard = () => {
    // Store content in localStorage for card creator
    localStorage.setItem('cardContent', JSON.stringify({
      content,
      category,
      type,
      language
    }));
    window.location.href = '/create-card';
  };

  const getCategoryColor = (category) => {
    const colors = {
      birthday: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
      anniversary: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      festival: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      love: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      friendship: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      romantic: 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200',
      sad: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
      motivational: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      life: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
      default: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    };
    return colors[category] || colors.default;
  };

  return (
    <Card className="group bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 card-hover">
      <CardContent className="p-6">
        {/* Category Badge */}
        <div className="flex items-center justify-between mb-4">
          <Badge variant="secondary" className={getCategoryColor(category)}>
            {category}
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleFavorite}
            className={`p-2 ${isFavorite ? 'text-red-500' : 'text-gray-400'}`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </Button>
        </div>

        {/* Content */}
        <div className="mb-4">
          <p className={`text-gray-800 dark:text-gray-200 leading-relaxed ${language === 'hi' ? 'hindi-font' : ''}`}>
            {content}
          </p>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="flex items-center space-x-1"
            >
              <Copy className="w-4 h-4" />
              <span className="hidden sm:inline">
                {language === 'en' ? 'Copy' : 'कॉपी'}
              </span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Share className="w-4 h-4" />
                  <span className="hidden sm:inline ml-1">
                    {language === 'en' ? 'Share' : 'साझा करें'}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleShare('whatsapp')}>
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleShare('facebook')}>
                  <Facebook className="w-4 h-4 mr-2" />
                  Facebook
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleShare('twitter')}>
                  <Twitter className="w-4 h-4 mr-2" />
                  Twitter
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleShare('instagram')}>
                  <Instagram className="w-4 h-4 mr-2" />
                  Instagram
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

        </div>
      </CardContent>
    </Card>
  );
}