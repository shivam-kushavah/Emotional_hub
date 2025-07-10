@@ .. @@
   return (
     <div className="relative overflow-hidden">
       {/* Background Elements */}
-      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 animate-pulse"></div>
+      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 animate-pulse-custom"></div>
       <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400/30 rounded-full blur-xl animate-float"></div>
       <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-400/30 rounded-full blur-xl animate-float-delay"></div>
 
       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
-        <div className="text-center space-y-8">
+        <div className="text-center space-y-8 animate-fade-in-up">
           {/* Main Heading */}
-          <div className="space-y-4">
-            <Badge variant="outline" className="bg-white/50 backdrop-blur-sm">
+          <div className="space-y-4 animate-slide-in-top">
+            <Badge variant="outline" className="bg-white/50 backdrop-blur-sm animate-bounce-custom">
               <Sparkles className="w-4 h-4 mr-2" />
               New: Card Creator Tool
             </Badge>
             
-            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
+            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold animate-scale-in">
               <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                 {currentContent.title}
               </span>
               <br />
               <span className="text-gray-800 dark:text-gray-200">
                 {currentContent.subtitle}
               </span>
             </h1>
             
-            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
+            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fade-in-up stagger-2">
               {currentContent.description}
             </p>
           </div>
 
           {/* Featured Quote */}
-          <Card className="max-w-2xl mx-auto bg-white/70 backdrop-blur-sm border-0 shadow-2xl">
+          <Card className="max-w-2xl mx-auto bg-white/70 backdrop-blur-sm border-0 shadow-2xl hover-lift animate-scale-in stagger-3">
             <CardContent className="p-6">
               <div className="flex items-start space-x-4">
                 <div className="w-2 h-16 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                 <div className="text-left">
                   <p className="text-lg md:text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">
                     {featuredQuotes[language][currentQuote]}
                   </p>
                   <p className="text-sm text-gray-500 dark:text-gray-400">
                     {language === 'en' ? 'Quote of the moment' : 'इस पल का कोट'}
                   </p>
                 </div>
               </div>
             </CardContent>
           </Card>
 
           {/* CTA Button */}
-          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
+          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up stagger-4">
             <Link href="/wishes">
-              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
+              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover-glow">
                 {currentContent.cta}
                 <ArrowRight className="w-5 h-5 ml-2" />
               </Button>
             </Link>
             <Link href="/create-card">
-              <Button variant="outline" size="lg" className="px-8 py-6 text-lg rounded-full hover:bg-white/80 backdrop-blur-sm">
+              <Button variant="outline" size="lg" className="px-8 py-6 text-lg rounded-full hover:bg-white/80 backdrop-blur-sm transition-all duration-300 hover:scale-110">
                 <Sparkles className="w-5 h-5 mr-2" />
                 {language === 'en' ? 'Create Card' : 'कार्ड बनाएं'}
               </Button>
             </Link>
           </div>
 
           {/* Feature Cards */}
-          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
+          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 animate-fade-in-up stagger-5">
             {currentContent.features.map((feature, index) => (
-              <Card key={index} className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
+              <Card key={index} className={`bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover-glow animate-scale-in stagger-${index + 1}`}>
                 <CardContent className="p-6 text-center">
-                  <feature.icon className="w-8 h-8 mx-auto mb-3 text-blue-600" />
+                  <feature.icon className="w-8 h-8 mx-auto mb-3 text-blue-600 animate-bounce-custom" />
                   <h3 className="font-semibold text-gray-800 dark:text-gray-200">{feature.title}</h3>
                   <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{feature.desc}</p>
                 </CardContent>
               </Card>
             ))}
           </div>
         </div>
       </div>
     </div>
   );
 }