import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  Upload, 
  Search, 
  Camera, 
  User, 
  Calendar,
  MapPin,
  Phone,
  Scan,
  Sparkles,
  AlertCircle,
  CheckCircle,
  X,
  Eye,
  Download,
  Share2
} from "lucide-react";

export function MissingPersonsGallery() {
  const [searchMode, setSearchMode] = useState<"browse" | "ai-search">("browse");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResults, setAiResults] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // بيانات وهمية للأطفال المفقودين في الدور
  const missingPersons = [
    {
      id: 1,
      name: "أحمد محمد",
      age: 8,
      imageUrl: "https://images.unsplash.com/photo-1491013438744-0aa52aff4020?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaXNzaW5nJTIwY2hpbGRyZW4lMjBjYXJlJTIwaG9tZSUyMGtpZHN8ZW58MXx8fHwxNzU4NDk1OTEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "دار الرعاية - المعادي",
      foundDate: "2024-01-15",
      category: "child",
      status: "safe",
      description: "طفل هادئ، يحب الرسم واللعب",
      contactInfo: "01234567890"
    },
    {
      id: 2,
      name: "سارة علي",
      age: 6,
      imageUrl: "https://images.unsplash.com/photo-1491013438744-0aa52aff4020?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaXNzaW5nJTIwY2hpbGRyZW4lMjBjYXJlJTIwaG9tZSUyMGtpZHN8ZW58MXx8fHwxNzU4NDk1OTEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "دار الرعاية - النزهة",
      foundDate: "2024-01-20",
      category: "child",
      status: "safe",
      description: "تحب الغناء والأنشطة الجماعية",
      contactInfo: "01234567891"
    },
    {
      id: 3,
      name: "محمود حسن",
      age: 17,
      imageUrl: "https://images.unsplash.com/photo-1491013438744-0aa52aff4020?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaXNzaW5nJTIwY2hpbGRyZW4lMjBjYXJlJTIwaG9tZSUyMGtpZHN8ZW58MXx8fHwxNzU4NDk1OTEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "دار الرعاية - مدينة نصر",
      foundDate: "2024-01-10",
      category: "young",
      status: "safe",
      description: "يدرس في الثانوية، يحب كرة القدم",
      contactInfo: "01234567892"
    },
    {
      id: 4,
      name: "فاطمة أحمد",
      age: 12,
      imageUrl: "https://images.unsplash.com/photo-1491013438744-0aa52aff4020?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaXNzaW5nJTIwY2hpbGRyZW4lMjBjYXJlJTIwaG9tZSUyMGtpZHN8ZW58MXx8fHwxNzU4NDk1OTEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "دار الرعاية - الزمالك",
      foundDate: "2024-01-25",
      category: "child",
      status: "safe",
      description: "تحب القراءة والدراسة",
      contactInfo: "01234567893"
    }
  ];

  const categories = [
    { id: "all", label: "الكل", count: missingPersons.length },
    { id: "child", label: "أطفال", count: missingPersons.filter(p => p.category === "child").length },
    { id: "young", label: "شباب", count: missingPersons.filter(p => p.category === "young").length }
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setSearchMode("ai-search");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAISearch = async () => {
    if (!uploadedImage) return;

    setIsAnalyzing(true);
    
    // محاكاة تحليل الذكاء الاصطناعي
    setTimeout(() => {
      // محاكاة النتائج مع درجات التطابق
      const simulatedResults = missingPersons.map(person => ({
        ...person,
        similarity: Math.random() * 40 + 60, // درجة تطابق من 60-100%
      })).sort((a, b) => b.similarity - a.similarity);

      setAiResults(simulatedResults);
      setIsAnalyzing(false);
    }, 3000);
  };

  const resetSearch = () => {
    setUploadedImage(null);
    setAiResults([]);
    setSearchMode("browse");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const filteredPersons = selectedCategory === "all" 
    ? missingPersons 
    : missingPersons.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Search className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">البحث عن المفقودين</h1>
            <p className="text-white/90 text-sm">استخدم الذكاء الاصطناعي للبحث بالصور</p>
          </div>
        </div>

        {/* Search Mode Toggle */}
        <div className="flex gap-3">
          <Button
            variant={searchMode === "browse" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setSearchMode("browse")}
            className={searchMode === "browse" ? "bg-white text-blue-600" : "text-white hover:bg-white/10"}
          >
            <Eye className="h-4 w-4 ml-1" />
            تصفح الكل
          </Button>
          <Button
            variant={searchMode === "ai-search" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setSearchMode("ai-search")}
            className={searchMode === "ai-search" ? "bg-white text-blue-600" : "text-white hover:bg-white/10"}
          >
            <Sparkles className="h-4 w-4 ml-1" />
            بحث ذكي
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6 -mt-4">

        {/* AI Search Section */}
        {searchMode === "ai-search" && (
          <Card className="bg-white shadow-lg border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-800 flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                البحث بالذكاء الاصطناعي
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              
              {!uploadedImage ? (
                <div className="text-center">
                  <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 bg-blue-50">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Camera className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-medium text-blue-800 mb-2">ارفع صورة للبحث</h3>
                    <p className="text-blue-600 text-sm mb-4">
                      الذكاء الاصطناعي سيحلل الصورة ويجد أقرب النتائج المطابقة
                    </p>
                    
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    
                    <Button 
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-blue-500 hover:bg-blue-600"
                    >
                      <Upload className="h-4 w-4 ml-2" />
                      اختر صورة
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                    <ImageWithFallback
                      src={uploadedImage}
                      alt="الصورة المرفوعة"
                      className="w-20 h-20 object-cover rounded-lg border-2 border-blue-200"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-blue-800">الصورة المرفوعة</h4>
                      <p className="text-blue-600 text-sm">جاهز للتحليل بالذكاء الاصطناعي</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={resetSearch}
                      className="text-red-600 hover:bg-red-50"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  {!isAnalyzing && aiResults.length === 0 && (
                    <Button 
                      onClick={handleAISearch}
                      className="w-full bg-blue-500 hover:bg-blue-600"
                    >
                      <Scan className="h-4 w-4 ml-2" />
                      ابدأ التحليل
                    </Button>
                  )}

                  {isAnalyzing && (
                    <div className="text-center p-6">
                      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <h4 className="font-medium text-blue-800 mb-2">جاري التحليل...</h4>
                      <p className="text-blue-600 text-sm">الذكاء الاصطناعي يحلل الصورة ويبحث عن التطابقات</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Categories */}
        {searchMode === "browse" && (
          <Card className="bg-white shadow-md">
            <CardContent className="p-4">
              <div className="flex gap-3 overflow-x-auto">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="whitespace-nowrap"
                  >
                    {category.label}
                    <Badge className="mr-2 bg-gray-200 text-gray-700">
                      {category.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* AI Results */}
        {aiResults.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <h3 className="font-bold text-gray-800">نتائج البحث بالذكاء الاصطناعي</h3>
            </div>
            
            {aiResults.map((person) => (
              <Card key={person.id} className="bg-white shadow-md border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <ImageWithFallback
                      src={person.imageUrl}
                      alt={person.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-gray-800">{person.name}</h4>
                        <Badge 
                          className={`${
                            person.similarity > 80 
                              ? "bg-green-500" 
                              : person.similarity > 70 
                              ? "bg-yellow-500" 
                              : "bg-red-500"
                          } text-white`}
                        >
                          {person.similarity.toFixed(0)}% تطابق
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span>{person.age} سنة</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{person.location}</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600">{person.description}</p>
                      
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="bg-blue-500 hover:bg-blue-600"
                          onClick={() => window.open(`tel:${person.contactInfo}`, '_self')}
                        >
                          <Phone className="h-3 w-3 ml-1" />
                          اتصل
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => alert("تم إرسال المعلومات")}
                        >
                          <Share2 className="h-3 w-3 ml-1" />
                          شارك
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Browse Mode - Regular Gallery */}
        {searchMode === "browse" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-800">
                المفقودين في دور الرعاية ({filteredPersons.length})
              </h3>
              <Button size="sm" variant="outline">
                <Download className="h-4 w-4 ml-1" />
                تحميل التقرير
              </Button>
            </div>
            
            {filteredPersons.map((person) => (
              <Card key={person.id} className="bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <ImageWithFallback
                      src={person.imageUrl}
                      alt={person.name}
                      className="w-24 h-24 object-cover rounded-lg border-2 border-gray-200"
                    />
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-gray-800">{person.name}</h4>
                        <Badge className="bg-green-500 text-white">
                          آمن
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span>{person.age} سنة</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{person.foundDate}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <MapPin className="h-3 w-3" />
                        <span>{person.location}</span>
                      </div>
                      
                      <p className="text-sm text-gray-600">{person.description}</p>
                      
                      <div className="flex gap-2 pt-2">
                        <Button 
                          size="sm" 
                          className="bg-blue-500 hover:bg-blue-600"
                          onClick={() => window.open(`tel:${person.contactInfo}`, '_self')}
                        >
                          <Phone className="h-3 w-3 ml-1" />
                          اتصل
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => alert("تم إرسال المعلومات")}
                        >
                          <Share2 className="h-3 w-3 ml-1" />
                          شارك
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Help Section */}
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-6 w-6 text-yellow-600" />
              <div>
                <h4 className="font-medium text-yellow-800">هل تحتاج مساعدة؟</h4>
                <p className="text-yellow-700 text-sm">
                  إذا لم تجد من تبحث عنه، يمكنك التواصل معنا مباشرة
                </p>
              </div>
              <Button 
                size="sm" 
                className="bg-yellow-500 hover:bg-yellow-600"
                onClick={() => window.open('tel:911', '_self')}
              >
                اتصل بنا
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Bottom spacing for navigation */}
        <div className="h-20"></div>
      </div>
    </div>
  );
}