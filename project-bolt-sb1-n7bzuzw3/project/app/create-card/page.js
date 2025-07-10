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
  Tablet
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
  const [previewMode, setPreviewMode] = useState('mobile'); // mobile, tablet, desktop
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
  }, []);

  const content = {
    en: {
      title: "Card Creator",
      subtitle: "Design Beautiful Cards",
      description: "Create stunning visual cards with your favorite quotes, wishes, or custom text. Choose from beautiful templates and customize every detail.",
      tabs: {
        content: "Content",
        design: "Design",
        preview: "Preview"
      },
      templates: [
        { id: 'minimal', name: 'Minimal', bg: '#ffffff', color: '#000000' },
        { id: 'gradient-blue', name: 'Blue', bg: '#667eea', color: '#ffffff' },
        { id: 'gradient-purple', name: 'Purple', bg: '#764ba2', color: '#ffffff' },
        { id: 'romantic', name: 'Pink', bg: '#f093fb', color: '#ffffff' },
        { id: 'nature', name: 'Green', bg: '#4facfe', color: '#ffffff' },
        { id: 'sunset', name: 'Orange', bg: '#fa709a', color: '#000000' },
        { id: 'dark', name: 'Dark', bg: '#1a1a1a', color: '#ffffff' },
        { id: 'festive', name: 'Gold', bg: '#ffecd2', color: '#8b4513' }
      ],
      fonts: [
        'Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Poppins', 'Playfair Display', 'Dancing Script'
      ],
      placeholders: {
        text: "Enter your text here...",
        customText: "Write your custom message..."
      },
      buttons: {
        download: "Download",
        reset: "Reset",
        uploadBg: "Upload"
      },
      labels: {
        fontFamily: "Font",
        fontSize: "Size",
        textColor: "Text Color",
        backgroundColor: "Background",
        alignment: "Align",
        style: "Style"
      }
    },
    hi: {
      title: "कार्ड क्रिएटर",
      subtitle: "सुंदर कार्ड डिज़ाइन करें",
      description: "अपने पसंदीदा कोट्स, शुभकामनाओं या कस्टम टेक्स्ट के साथ शानदार विज़ुअल कार्ड बनाएं। सुंदर टेम्प्लेट्स में से चुनें और हर विवरण को कस्टमाइज़ करें।",
      tabs: {
        content: "सामग्री",
        design: "डिज़ाइन",
        preview: "पूर्वावलोकन"
      },
      templates: [
        { id: 'minimal', name: 'सरल', bg: '#ffffff', color: '#000000' },
        { id: 'gradient-blue', name: 'नीला', bg: '#667eea', color: '#ffffff' },
        { id: 'gradient-purple', name: 'बैंगनी', bg: '#764ba2', color: '#ffffff' },
        { id: 'romantic', name: 'गुलाबी', bg: '#f093fb', color: '#ffffff' },
        { id: 'nature', name: 'हरा', bg: '#4facfe', color: '#ffffff' },
        { id: 'sunset', name: 'नारंगी', bg: '#fa709a', color: '#000000' },
        { id: 'dark', name: 'डार्क', bg: '#1a1a1a', color: '#ffffff' },
        { id: 'festive', name: 'सुनहरा', bg: '#ffecd2', color: '#8b4513' }
      ],
      fonts: [
        'Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Poppins', 'Playfair Display', 'Dancing Script'
      ],
      placeholders: {
        text: "यहाँ अपना टेक्स्ट दर्ज करें...",
        customText: "अपना कस्टम संदेश लिखें..."
      },
      buttons: {
        download: "डाउनलोड",
        reset: "रीसेट",
        uploadBg: "अपलोड"
      },
      labels: {
        fontFamily: "फ़ॉन्ट",
        fontSize: "साइज़",
        textColor: "टेक्स्ट रंग",
        backgroundColor: "बैकग्राउंड",
        alignment: "संरेखण",
        style: "स्टाइल"
      }
    }
  };

  const currentContent = content[language];

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template.id);
    setBackgroundColor(template.bg);
    setTextColor(template.color);
    setBackgroundImage('');
  };

  const handleBackgroundImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBackgroundImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
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

    // Draw each line
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
    
    // Set canvas size based on preview mode
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

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw background
    if (backgroundImage) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, width, height);
        drawText();
        drawWatermark();
      };
      img.src = backgroundImage;
    } else {
      // Draw solid color background
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

    // Set font properties
    const fontSizeValue = fontSize[0];
    const fontWeightValue = fontWeight === 'bold' ? 'bold' : 'normal';
    const fontStyleValue = fontStyle === 'italic' ? 'italic' : 'normal';
    
    ctx.font = `${fontStyleValue} ${fontWeightValue} ${fontSizeValue}px ${fontFamily}`;
    ctx.fillStyle = textColor;
    ctx.textAlign = textAlign;

    // Calculate text position
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

    // Split text into paragraphs and wrap each
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

    // Draw watermark
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
    link.download = 'emotional-card.png';
    link.href = canvas.toDataURL();
    link.click();
    
    toast.success(language === 'en' ? 'Card downloaded successfully!' : 'कार्ड सफलतापूर्वक डाउनलोड हो गया!');
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
          <div className="text-center mb-8">
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
            <div className="space-y-4">
              <Tabs defaultValue="content" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="content" className="text-xs">{currentContent.tabs.content}</TabsTrigger>
                  <TabsTrigger value="design" className="text-xs">{currentContent.tabs.design}</TabsTrigger>
                  <TabsTrigger value="preview" className="text-xs">{currentContent.tabs.preview}</TabsTrigger>
                </TabsList>

                <TabsContent value="content" className="space-y-4">
                  <Card>
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
                        className={`w-full ${language === 'hi' ? 'hindi-font' : ''}`}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="design" className="space-y-4">
                  {/* Templates */}
                  <Card>
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
                            className={`p-2 rounded-lg border-2 transition-all text-xs ${
                              selectedTemplate === template.id 
                                ? 'border-purple-500 ring-2 ring-purple-200' 
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            style={{ 
                              backgroundColor: template.bg,
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
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{currentContent.labels.fontFamily}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <select
                          value={fontFamily}
                          onChange={(e) => setFontFamily(e.target.value)}
                          className="w-full p-2 border rounded-md text-sm"
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
                        >
                          <Bold className="w-4 h-4" />
                        </Button>
                        <Button
                          variant={fontStyle === 'italic' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setFontStyle(fontStyle === 'italic' ? 'normal' : 'italic')}
                        >
                          <Italic className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          variant={textAlign === 'left' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setTextAlign('left')}
                        >
                          <AlignLeft className="w-4 h-4" />
                        </Button>
                        <Button
                          variant={textAlign === 'center' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setTextAlign('center')}
                        >
                          <AlignCenter className="w-4 h-4" />
                        </Button>
                        <Button
                          variant={textAlign === 'right' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setTextAlign('right')}
                        >
                          <AlignRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Colors */}
                  <Card>
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
                            className="w-12 h-8 rounded border cursor-pointer"
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
                            className="w-12 h-8 rounded border cursor-pointer"
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
                  <Card>
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
                          <Button variant="outline" className="w-full cursor-pointer" asChild>
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
                            className="w-full"
                          >
                            {language === 'en' ? 'Remove' : 'हटाएं'}
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="preview">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{language === 'en' ? 'Preview Mode' : 'पूर्वावलोकन मोड'}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex space-x-2 mb-4">
                        <Button
                          variant={previewMode === 'mobile' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setPreviewMode('mobile')}
                        >
                          <Smartphone className="w-4 h-4" />
                        </Button>
                        <Button
                          variant={previewMode === 'tablet' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setPreviewMode('tablet')}
                        >
                          <Tablet className="w-4 h-4" />
                        </Button>
                        <Button
                          variant={previewMode === 'desktop' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setPreviewMode('desktop')}
                        >
                          <Monitor className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex space-x-2">
                        <Button onClick={downloadCard} className="flex-1">
                          <Download className="w-4 h-4 mr-2" />
                          {currentContent.buttons.download}
                        </Button>
                        <Button variant="outline" onClick={resetCard}>
                          <RotateCcw className="w-4 h-4 mr-2" />
                          {currentContent.buttons.reset}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Preview */}
            <div className="lg:sticky lg:top-8">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{language === 'en' ? 'Live Preview' : 'लाइव पूर्वावलोकन'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg flex justify-center">
                    <canvas
                      ref={canvasRef}
                      className="border rounded shadow-lg max-w-full h-auto"
                      style={{ maxWidth: '100%', height: 'auto' }}
                    />
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <Button onClick={downloadCard} className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      {currentContent.buttons.download}
                    </Button>
                    <Button variant="outline" onClick={resetCard}>
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