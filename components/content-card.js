@@ .. @@
   return (
-    <Card className="group bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 card-hover">
+    <Card className="group bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 card-hover hover-glow">
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
-            className={`p-2 ${isFavorite ? 'text-red-500' : 'text-gray-400'}`}
+            className={`p-2 transition-all duration-300 hover:scale-110 ${isFavorite ? 'text-red-500 animate-pulse' : 'text-gray-400'}`}
           >
             <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
           </Button>
         </div>
@@ .. @@
         {/* Action Buttons */}
         <div className="flex items-center justify-between">
           <div className="flex items-center space-x-2">
             <Button
               variant="outline"
               size="sm"
               onClick={handleCopy}
-              className="flex items-center space-x-1"
+              className="flex items-center space-x-1 transition-all duration-300 hover:scale-105"
             >
               <Copy className="w-4 h-4" />
               <span className="hidden sm:inline">
                 {language === 'en' ? 'Copy' : 'कॉपी'}
               </span>
             </Button>
 
             <DropdownMenu>
               <DropdownMenuTrigger asChild>
-                <Button variant="outline" size="sm">
+                <Button variant="outline" size="sm" className="transition-all duration-300 hover:scale-105">
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
 
+          <Button
+            variant="outline"
+            size="sm"
+            onClick={handleCreateCard}
+            className="transition-all duration-300 hover:scale-105 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100"
+          >
+            <Palette className="w-4 h-4 mr-1" />
+            <span className="hidden sm:inline">
+              {language === 'en' ? 'Create Card' : 'कार्ड बनाएं'}
+            </span>
+          </Button>
         </div>
       </CardContent>
     </Card>
   );
 }