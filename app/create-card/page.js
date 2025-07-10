"use client";

import { useState, useEffect, useRef } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { 
  Palette, 
  Download, 
  Type, 
  Image as ImageIcon, 
  Upload,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  RotateCcw,
  Smartphone,
  Monitor,
  Tablet,
  Sparkles,
  Wand2,
  Copy,
  Share2,
  Save,
  RefreshCw
} from 'lucide-react';
import { toast } from 'sonner';

export default function CreateCardPage() {
  const [language, setLanguage] = useState('en');
  const [cardText, setCardText] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('minimal');
  const [fontSize, setFontSize] = useState([24]);
  const [fontFamily, setFontFamily] = useState('Inter');
  const [textColor, setTextColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [textAlign, setTextAlign] = useState('center');
  const [fontWeight, setFontWeight] = useState('normal');
  const [fontStyle, setFontStyle] = useState('normal');
  const [backgroundImage, setBackgroundImage] = useState('');
  const [previewMode, setPreviewMode] = useState('mobile');
  const [isGenerating, setIsGenerating] = useState(false);
  const [cardHistory, setCardHistory] = useState([]);
  const canvasRef = useRef(null);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
    
    // Check if there's content from other pages
    const savedContent = localStorage.getItem('cardContent');
    if (savedContent) {
      const content = JSON.parse(savedContent);
      setCardText(content.content);
      localStorage.removeItem('cardContent');
    }

    // Load card history
    const history = JSON.parse(localStorage.getItem('cardHistory') || '[]');
    setCardHistory(history);
  }, []);

  const content = {
    en: {
      title: "Card Creator Studio",
      subtitle: "Design Beautiful Cards with AI Magic",
      description: "Create stunning visual cards with your favorite quotes, wishes, or custom text. Use AI to generate inspiring content or design from scratch.",
      tabs: {
        content: "Content",
        design: "Design",
        preview: "Preview",
        history: "History"
      },
      templates: [
        { id: 'minimal', name: 'Minimal', bg: '#ffffff', color: '#000000' },
        { id: 'gradient-blue', name: 'Ocean', bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#ffffff' },
        { id: 'gradient-purple', name: 'Sunset', bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: '#ffffff' },
        { id: 'romantic', name: 'Romance', bg: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', color: '#8b4513' },
        { id: 'nature', name: 'Nature', bg: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', color: '#2d3748' },
        { id: 'cosmic', name: 'Cosmic', bg: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)', color: '#4a5568' },
        { id: 'dark', name: 'Dark', bg: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)', color: '#ffffff' },
        { id: 'festive', name: 'Gold', bg: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)', color: '#8b4513' }
      ],
      fonts: [
        'Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Poppins', 'Playfair Display', 'Dancing Script', 'Merriweather', 'Nunito'
      ],
      placeholders: {
        text: "Enter your text here or use AI to generate...",
        customText: "Write your custom message..."
      },
      buttons: {
        download: "Download",
        reset: "Reset",
        uploadBg: "Upload",
        generate: "Generate with AI",
        save: "Save to History",
        copy: "Copy Text",
        share: "Share"
      },
      labels: {
        fontFamily: "Font Family",
        fontSize: "Font Size",
        textColor: "Text Color",
        backgroundColor: "Background",
        alignment: "Text Alignment",
        style: "Text Style"
      },
      aiPrompts: [
        "Generate an inspiring quote about success",
        "Create a motivational message for Monday",
        "Write a beautiful love quote",
        "Generate a birthday wish",
        "Create a quote about friendship",
        "Write something about dreams and goals"
      ]
    },
    hi: {
      title: "कार्ड क्रिएटर स्टूडियो",
      subtitle: "AI जादू के साथ सुंदर कार्ड डिज़ाइन करें",
      description: "अपने पसंदीदा कोट्स, शुभकामनाओं या कस्टम टेक्स्ट के साथ शानदार विज़ुअल कार्ड बनाएं। प्रेरणादायक सामग्री बनाने के लिए AI का उपयोग करें या शुरुआत से डिज़ाइन करें।",
      tabs: {
        content: "सामग्री",
        design: "डिज़ाइन",
        preview: "पूर्वावलोकन",
        history: "इतिहास"
      },
      templates: [
        { id: 'minimal', name: 'सरल', bg: '#ffffff', color: '#000000' },
        { id: 'gradient-blue', name: 'समुद्र', bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#ffffff' },
        { id: 'gradient-purple', name: 'सूर्यास्त', bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: '#ffffff' },
        { id: 'romantic', name: 'रोमांस', bg: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', color: '#8b4513' },
        { id: 'nature', name: 'प्रकृति', bg: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', color: '#2d3748' },
        { id: 'cosmic', name: 'ब्रह्मांडीय', bg: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)', color: '#4a5568' },
        { id: 'dark', name: 'डार्क', bg: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)', color: '#ffffff' },
        { id: 'festive', name: 'सुनहरा', bg: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)', color: '#8b4513' }
      ],
      fonts: [
        'Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Poppins', 'Playfair Display', 'Dancing Script', 'Merriweather', 'Nunito'
      ],
      placeholders: {
        text: "यहाँ अपना टेक्स्ट दर्ज करें या AI का उपयोग करें...",
        customText: "अपना कस्टम संदेश लिखें..."
      },
      buttons: {
        download: "डाउनलोड",
        reset: "रीसेट",
        uploadBg: "अपलोड",
        generate: "AI के साथ जेनरेट करें",
        save: "इतिहास में सेव करें",
        copy: "टेक्स्ट कॉपी करें",
        share: "साझा करें"
      },
      labels: {
        fontFamily: "फ़ॉन्ट परिवार",
        fontSize: "फ़ॉन्ट साइज़",
        textColor: "टेक्स्ट रंग",
        backgroundColor: "बैकग्राउंड",
        alignment: "टेक्स्ट संरेखण",
        style: "टेक्स्ट स्टाइल"
      },
      aiPrompts: [
        "सफलता के बारे में एक प्रेरणादायक कोट जेनरेट करें",
        "सोमवार के लिए एक प्रेरणादायक संदेश बनाएं",
        "एक सुंदर प्रेम कोट लिखें",
        "जन्मदिन की शुभकामना जेनरेट करें",
        "दोस्ती के बारे में कोट बनाएं",
        "सपनों और लक्ष्यों के बारे में कुछ लिखें"
      ]
    }
  };

  const currentContent = content[language];

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template.id);
    if (template.bg.includes('gradient')) {
      setBackgroundColor('');
      setBackgroundImage(template.bg);
    } else {
      setBackgroundColor(template.bg);
      setBackgroundImage('');
    }
    setTextColor(template.color);
  };

  const handleBackgroundImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBackgroundImage(e.target.result);
        setBackgroundColor('');
      };
      reader.readAsDataURL(file);
    }
  };

  const generateAIContent = async (prompt) => {
    setIsGenerating(true);
    try {
      // Simulate AI generation with predefined responses
      const responses = {
        en: {
          "Generate an inspiring quote about success": "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.",
          "Create a motivational message for Monday": "Monday is a fresh start. It's never too late to dig in and begin a new journey of success.",
          "Write a beautiful love quote": "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.",
          "Generate a birthday wish": "May your birthday be filled with sunshine, smiles, laughter, love, and all the wonderful things that make you happy!",
          "Create a quote about friendship": "A true friend is someone who knows all your stories, but still loves you anyway.",
          "Write something about dreams and goals": "Dreams don't work unless you do. Set your goals high and don't stop until you get there."
        },
        hi: {
          "सफलता के बारे में एक प्रेरणादायक कोट जेनरेट करें": "सफलता खुशी की चाबी नहीं है। खुशी सफलता की चाबी है। यदि आप जो कर रहे हैं उससे प्रेम करते हैं, तो आप सफल होंगे।",
          "सोमवार के लिए एक प्रेरणादायक संदेश बनाएं": "सोमवार एक नई शुरुआत है। सफलता की नई यात्रा शुरू करने में कभी देर नहीं होती।",
          "एक सुंदर प्रेम कोट लिखें": "पूरी दुनिया में मेरे लिए आपके जैसा कोई दिल नहीं है। पूरी दुनिया में आपके लिए मेरे जैसा कोई प्रेम नहीं है।",
          "जन्मदिन की शुभकामना जेनरेट करें": "आपका जन्मदिन धूप, मुस्कान, हंसी, प्रेम और उन सभी अद्भुत चीजों से भरा हो जो आपको खुश करती हैं!",
          "दोस्ती के बारे में कोट बनाएं": "सच्चा दोस्त वह है जो आपकी सभी कहानियां जानता है, फिर भी आपसे प्रेम करता है।",
          "सपनों और लक्ष्यों के बारे में कुछ लिखें": "सपने तब तक काम नहीं करते जब तक आप काम नहीं करते। अपने लक्ष्य ऊंचे रखें और तब तक न रुकें जब तक वहां न पहुंच जाएं।"
        }
      };

      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
      
      const response = responses[language][prompt] || "This is a beautiful generated quote that will inspire and motivate you every day.";
      setCardText(response);
      
      toast.success(language === 'en' ? 'AI content generated successfully!' : 'AI सामग्री सफलतापूर्वक जेनरेट हुई!');
    } catch (error) {
      toast.error(language === 'en' ? 'Failed to generate content' : 'सामग्री जेनरेट करने में असफल');
    } finally {
      setIsGenerating(false);
    }
  };

  const saveToHistory = () => {
    if (!cardText.trim()) {
      toast.error(language === 'en' ? 'Please add some text first' : 'पहले कुछ टेक्स्ट जोड़ें');
      return;
    }

    const newCard = {
      id: Date.now(),
      text: cardText,
      template: selectedTemplate,
      fontSize: fontSize[0],
      fontFamily,
      textColor,
      backgroundColor,
      backgroundImage,
      textAlign,
      fontWeight,
      fontStyle,
      timestamp: new Date().toISOString()
    };

    const updatedHistory = [newCard, ...cardHistory.slice(0, 9)]; // Keep only 10 recent cards
    setCardHistory(updatedHistory);
    localStorage.setItem('cardHistory', JSON.stringify(updatedHistory));
    
    toast.success(language === 'en' ? 'Card saved to history!' : 'कार्ड इतिहास में सेव हो गया!');
  };

  const loadFromHistory = (card) => {
    setCardText(card.text);
    setSelectedTemplate(card.template);
    setFontSize([card.fontSize]);
    setFontFamily(card.fontFamily);
    setTextColor(card.textColor);
    setBackgroundColor(card.backgroundColor);
    setBackgroundImage(card.backgroundImage);
    setTextAlign(card.textAlign);
    setFontWeight(card.fontWeight);
    setFontStyle(card.fontStyle);
    
    toast.success(language === 'en' ? 'Card loaded from history!' : 'कार्ड इतिहास से लोड हो गया!');
  };

  const wrapText = (ctx, text, x, y, maxWidth, lineHeight) => {
    const words = text.split(' ');
    let line = '';
    let lines = [];

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      
      if (testWidth > maxWidth && n > 0) {
        lines.push(line);
        line = words[n] + ' ';
      } else {
        line = testLine;
      }
    }
    lines.push(line);

    for (let i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], x, y + (i * lineHeight));
    }

    return lines.length * lineHeight;
  };

  const drawCard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    
    switch (previewMode) {
      case 'mobile':
        width = 400;
        height = 600;
        break;
      case 'tablet':
        width = 600;
        height = 800;
        break;
      case 'desktop':
        width = 800;
        height = 600;
        break;
      default:
        width = 400;
        height = 600;
    }
    
    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);

    // Draw background
    if (backgroundImage) {
      if (backgroundImage.startsWith('linear-gradient')) {
        // Handle gradient backgrounds
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        if (backgroundImage.includes('#667eea')) {
          gradient.addColorStop(0, '#667eea');
          gradient.addColorStop(1, '#764ba2');
        } else if (backgroundImage.includes('#f093fb')) {
          gradient.addColorStop(0, '#f093fb');
          gradient.addColorStop(1, '#f5576c');
        } else if (backgroundImage.includes('#ffecd2')) {
          gradient.addColorStop(0, '#ffecd2');
          gradient.addColorStop(1, '#fcb69f');
        } else if (backgroundImage.includes('#a8edea')) {
          gradient.addColorStop(0, '#a8edea');
          gradient.addColorStop(1, '#fed6e3');
        } else if (backgroundImage.includes('#d299c2')) {
          gradient.addColorStop(0, '#d299c2');
          gradient.addColorStop(1, '#fef9d7');
        } else if (backgroundImage.includes('#2c3e50')) {
          gradient.addColorStop(0, '#2c3e50');
          gradient.addColorStop(1, '#34495e');
        } else if (backgroundImage.includes('#f7971e')) {
          gradient.addColorStop(0, '#f7971e');
          gradient.addColorStop(1, '#ffd200');
        }
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        drawText();
        drawWatermark();
      } else {
        // Handle image backgrounds
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0, width, height);
          drawText();
          drawWatermark();
        };
        img.src = backgroundImage;
      }
    } else {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);
      drawText();
      drawWatermark();
    }
  };

  const drawText = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    if (!cardText.trim()) return;

    const fontSizeValue = fontSize[0];
    const fontWeightValue = fontWeight === 'bold' ? 'bold' : 'normal';
    const fontStyleValue = fontStyle === 'italic' ? 'italic' : 'normal';
    
    ctx.font = `${fontStyleValue} ${fontWeightValue} ${fontSizeValue}px ${fontFamily}`;
    ctx.fillStyle = textColor;
    ctx.textAlign = textAlign;

    let x;
    const padding = 40;
    const maxWidth = width - (padding * 2);
    
    switch (textAlign) {
      case 'left':
        x = padding;
        ctx.textAlign = 'left';
        break;
      case 'right':
        x = width - padding;
        ctx.textAlign = 'right';
        break;
      default:
        x = width / 2;
        ctx.textAlign = 'center';
    }

    const paragraphs = cardText.split('\n');
    const lineHeight = fontSizeValue * 1.4;
    let currentY = height / 2 - ((paragraphs.length - 1) * lineHeight * 2) / 2;

    paragraphs.forEach((paragraph, index) => {
      if (paragraph.trim()) {
        const textHeight = wrapText(ctx, paragraph, x, currentY, maxWidth, lineHeight);
        currentY += textHeight + lineHeight;
      } else {
        currentY += lineHeight;
      }
    });
  };

  const drawWatermark = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.save();
    ctx.globalAlpha = 0.3;
    ctx.font = '12px Inter';
    ctx.fillStyle = textColor;
    ctx.textAlign = 'right';
    ctx.fillText('EmotionalHub.com', width - 10, height - 10);
    ctx.restore();
  };

  useEffect(() => {
    drawCard();
  }, [cardText, selectedTemplate, fontSize, fontFamily, textColor, backgroundColor, textAlign, fontWeight, fontStyle, backgroundImage, previewMode]);

  const downloadCard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `emotional-card-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
    
    toast.success(language === 'en' ? 'Card downloaded successfully!' : 'कार्ड सफलतापूर्वक डाउनलोड हो गया!');
  };

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(cardText);
      toast.success(language === 'en' ? 'Text copied to clipboard!' : 'टेक्स्ट क्लिपबोर्ड में कॉपी हो गया!');
    } catch (err) {
      toast.error(language === 'en' ? 'Failed to copy text' : 'टेक्स्ट कॉपी करने में असफल');
    }
  };

  const shareCard = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Beautiful Card from EmotionalHub',
        text: cardText,
        url: window.location.href
      });
    } else {
      copyText();
    }
  };

  const resetCard = () => {
    setCardText('');
    setSelectedTemplate('minimal');
    setFontSize([24]);
    setFontFamily('Inter');
    setTextColor('#000000');
    setBackgroundColor('#ffffff');
    setTextAlign('center');
    setFontWeight('normal');
    setFontStyle('normal');
    setBackgroundImage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      <Navigation />
      
      <div className="pt-4 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8 animate-in slide-in-from-top-4 duration-1000">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {currentContent.title}
              </span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
              {currentContent.subtitle}
            </p>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-sm">
              {currentContent.description}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Controls */}
            <div className="space-y-4 animate-in slide-in-from-left-4 duration-1000 delay-200">
              <Tabs defaultValue="content" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="content" className="text-xs">{currentContent.tabs.content}</TabsTrigger>
                  <TabsTrigger value="design" className="text-xs">{currentContent.tabs.design}</TabsTrigger>
                  <TabsTrigger value="preview" className="text-xs">{currentContent.tabs.preview}</TabsTrigger>
                  <TabsTrigger value="history" className="text-xs">{currentContent.tabs.history}</TabsTrigger>
                </TabsList>

                <TabsContent value="content" className="space-y-4">
                  <Card className="transition-all duration-300 hover:shadow-lg">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center space-x-2 text-lg">
                        <Type className="w-4 h-4" />
                        <span>{language === 'en' ? 'Your Text' : 'आपका टेक्स्ट'}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        placeholder={currentContent.placeholders.text}
                        value={cardText}
                        onChange={(e) => setCardText(e.target.value)}
                        rows={6}
                        className={`w-full transition-all duration-300 focus:scale-105 ${language === 'hi' ? 'hindi-font' : ''}`}
                      />
                      <div className="flex flex-wrap gap-2 mt-4">
                        <Button
                          onClick={copyText}
                          variant="outline"
                          size="sm"
                          className="transition-all duration-300 hover:scale-105"
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          {currentContent.buttons.copy}
                        </Button>
                        <Button
                          onClick={shareCard}
                          variant="outline"
                          size="sm"
                          className="transition-all duration-300 hover:scale-105"
                        >
                          <Share2 className="w-4 h-4 mr-2" />
                          {currentContent.buttons.share}
                        </Button>
                        <Button
                          onClick={saveToHistory}
                          variant="outline"
                          size="sm"
                          className="transition-all duration-300 hover:scale-105"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          {currentContent.buttons.save}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* AI Content Generation */}
                  <Card className="transition-all duration-300 hover:shadow-lg">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center space-x-2 text-lg">
                        <Wand2 className="w-4 h-4" />
                        <span>{language === 'en' ? 'AI Content Generator' : 'AI सामग्री जेनरेटर'}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 gap-2">
                        {currentContent.aiPrompts.map((prompt, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => generateAIContent(prompt)}
                            disabled={isGenerating}
                            className="text-left justify-start transition-all duration-300 hover:scale-105"
                          >
                            {isGenerating ? (
                              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                              <Sparkles className="w-4 h-4 mr-2" />
                            )}
                            {prompt}
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="design" className="space-y-4">
                  {/* Templates */}
                  <Card className="transition-all duration-300 hover:shadow-lg">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center space-x-2 text-lg">
                        <Palette className="w-4 h-4" />
                        <span>{language === 'en' ? 'Templates' : 'टेम्प्लेट्स'}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-4 gap-2">
                        {currentContent.templates.map((template) => (
                          <button
                            key={template.id}
                            onClick={() => handleTemplateSelect(template)}
                            className={`p-2 rounded-lg border-2 transition-all duration-300 text-xs hover:scale-105 ${
                              selectedTemplate === template.id 
                                ? 'border-purple-500 ring-2 ring-purple-200 scale-105' 
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            style={{ 
                              background: template.bg,
                              color: template.color
                            }}
                          >
                            {template.name}
                          </button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Font Settings */}
                  <Card className="transition-all duration-300 hover:shadow-lg">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{currentContent.labels.fontFamily}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <select
                          value={fontFamily}
                          onChange={(e) => setFontFamily(e.target.value)}
                          className="w-full p-2 border rounded-md text-sm transition-all duration-300 focus:scale-105"
                        >
                          {currentContent.fonts.map((font) => (
                            <option key={font} value={font}>{font}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          {currentContent.labels.fontSize}: {fontSize[0]}px
                        </label>
                        <Slider
                          value={fontSize}
                          onValueChange={setFontSize}
                          max={48}
                          min={12}
                          step={1}
                          className="w-full"
                        />
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          variant={fontWeight === 'bold' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setFontWeight(fontWeight === 'bold' ? 'normal' : 'bold')}
                          className="transition-all duration-300 hover:scale-105"
                        >
                          <Bold className="w-4 h-4" />
                        </Button>
                        <Button
                          variant={fontStyle === 'italic' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setFontStyle(fontStyle === 'italic' ? 'normal' : 'italic')}
                          className="transition-all duration-300 hover:scale-105"
                        >
                          <Italic className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          variant={textAlign === 'left' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setTextAlign('left')}
                          className="transition-all duration-300 hover:scale-105"
                        >
                          <AlignLeft className="w-4 h-4" />
                        </Button>
                        <Button
                          variant={textAlign === 'center' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setTextAlign('center')}
                          className="transition-all duration-300 hover:scale-105"
                        >
                          <AlignCenter className="w-4 h-4" />
                        </Button>
                        <Button
                          variant={textAlign === 'right' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setTextAlign('right')}
                          className="transition-all duration-300 hover:scale-105"
                        >
                          <AlignRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Colors */}
                  <Card className="transition-all duration-300 hover:shadow-lg">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{language === 'en' ? 'Colors' : 'रंग'}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          {currentContent.labels.textColor}
                        </label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="color"
                            value={textColor}
                            onChange={(e) => setTextColor(e.target.value)}
                            className="w-12 h-8 rounded border cursor-pointer transition-all duration-300 hover:scale-110"
                          />
                          <Input
                            type="text"
                            value={textColor}
                            onChange={(e) => setTextColor(e.target.value)}
                            className="flex-1 text-sm"
                            placeholder="#000000"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          {currentContent.labels.backgroundColor}
                        </label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="color"
                            value={backgroundColor}
                            onChange={(e) => setBackgroundColor(e.target.value)}
                            className="w-12 h-8 rounded border cursor-pointer transition-all duration-300 hover:scale-110"
                          />
                          <Input
                            type="text"
                            value={backgroundColor}
                            onChange={(e) => setBackgroundColor(e.target.value)}
                            className="flex-1 text-sm"
                            placeholder="#ffffff"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Background Image */}
                  <Card className="transition-all duration-300 hover:shadow-lg">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center space-x-2 text-lg">
                        <ImageIcon className="w-4 h-4" />
                        <span>{language === 'en' ? 'Background' : 'बैकग्राउंड'}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleBackgroundImageUpload}
                          className="hidden"
                          id="bg-upload"
                        />
                        <label htmlFor="bg-upload">
                          <Button variant="outline" className="w-full cursor-pointer transition-all duration-300 hover:scale-105" asChild>
                            <span>
                              <Upload className="w-4 h-4 mr-2" />
                              {currentContent.buttons.uploadBg}
                            </span>
                          </Button>
                        </label>
                        {backgroundImage && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setBackgroundImage('')}
                            className="w-full transition-all duration-300 hover:scale-105"
                          >
                            {language === 'en' ? 'Remove' : 'हटाएं'}
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="preview">
                  <Card className="transition-all duration-300 hover:shadow-lg">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{language === 'en' ? 'Preview Mode' : 'पूर्वावलोकन मोड'}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex space-x-2 mb-4">
                        <Button
                          variant={previewMode === 'mobile' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setPreviewMode('mobile')}
                          className="transition-all duration-300 hover:scale-105"
                        >
                          <Smartphone className="w-4 h-4" />
                        </Button>
                        <Button
                          variant={previewMode === 'tablet' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setPreviewMode('tablet')}
                          className="transition-all duration-300 hover:scale-105"
                        >
                          <Tablet className="w-4 h-4" />
                        </Button>
                        <Button
                          variant={previewMode === 'desktop' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setPreviewMode('desktop')}
                          className="transition-all duration-300 hover:scale-105"
                        >
                          <Monitor className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex space-x-2">
                        <Button onClick={downloadCard} className="flex-1 transition-all duration-300 hover:scale-105">
                          <Download className="w-4 h-4 mr-2" />
                          {currentContent.buttons.download}
                        </Button>
                        <Button variant="outline" onClick={resetCard} className="transition-all duration-300 hover:scale-105">
                          <RotateCcw className="w-4 h-4 mr-2" />
                          {currentContent.buttons.reset}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="history">
                  <Card className="transition-all duration-300 hover:shadow-lg">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{language === 'en' ? 'Card History' : 'कार्ड इतिहास'}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {cardHistory.length === 0 ? (
                        <p className="text-gray-500 text-center py-4">
                          {language === 'en' ? 'No saved cards yet' : 'अभी तक कोई सेव किया गया कार्ड नहीं'}
                        </p>
                      ) : (
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                          {cardHistory.map((card) => (
                            <div
                              key={card.id}
                              className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-105"
                              onClick={() => loadFromHistory(card)}
                            >
                              <p className="text-sm font-medium truncate">{card.text}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                {new Date(card.timestamp).toLocaleDateString()}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Preview */}
            <div className="lg:sticky lg:top-8 animate-in slide-in-from-right-4 duration-1000 delay-400">
              <Card className="transition-all duration-300 hover:shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{language === 'en' ? 'Live Preview' : 'लाइव पूर्वावलोकन'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg flex justify-center">
                    <canvas
                      ref={canvasRef}
                      className="border rounded shadow-lg max-w-full h-auto transition-all duration-300 hover:scale-105"
                      style={{ maxWidth: '100%', height: 'auto' }}
                    />
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <Button onClick={downloadCard} className="flex-1 transition-all duration-300 hover:scale-105">
                      <Download className="w-4 h-4 mr-2" />
                      {currentContent.buttons.download}
                    </Button>
                    <Button variant="outline" onClick={resetCard} className="transition-all duration-300 hover:scale-105">
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}