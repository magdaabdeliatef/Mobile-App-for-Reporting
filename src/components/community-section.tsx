import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  Heart, 
  MessageCircle, 
  Star, 
  Share, 
  TrendingUp,
  Users,
  Award,
  Calendar,
  ChevronLeft,
  Plus
} from "lucide-react";
import { useState } from "react";

export function CommunitySection() {
  const [newMessage, setNewMessage] = useState("");
  const [selectedStory, setSelectedStory] = useState<number | null>(null);

  const featuredStory = {
    id: 1,
    title: "عودة الطفل أحمد لأهله",
    description: "قصة مؤثرة عن عودة طفل لأسرته بعد البحث المكثف",
    fullStory: "في قصة مؤثرة تظهر قوة التضامن المجتمعي، تمكنت الجهود المشتركة بين دور الرعاية والمتطوعين من إعادة الطفل أحمد (8 سنوات) إلى أحضان عائلته بعد فترة بحث استمرت لأسابيع. بدأت القصة عندما فُقد أحمد أثناء رحلة عائلية، مما أدخل الأسرة في حالة من القلق والخوف الشديد.",
    additionalDetails: "بفضل التقنيات الحديثة ونظام الإبلاغ السريع، تم تنسيق جهود البحث بشكل فعال. شارك في البحث أكثر من 50 متطوعاً من مختلف أنحاء المدينة، واستخدمت دور الرعاية شبكتها الواسعة للمساعدة في العثور على الطفل.",
    outcome: "تم العثور على أحمد في أحد الأحياء المجاورة، وهو بصحة جيدة. لحظة اللقاء بين أحمد وعائلته كانت مليئة بالفرح والامتنان لكل من ساهم في عملية البحث.",
    date: "2024-01-15",
    readTime: "3 دقائق قراءة",
    likes: 342,
    shares: 89,
    comments: 67,
    image: "https://images.unsplash.com/photo-1659352786973-82ae3af461a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGZhbWlseSUyMHJldW5pb24lMjBjaGlsZHJlbiUyMHNhZmV0eXxlbnwxfHx8fDE3NTg0MjE1ODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  };

  const communityStats = {
    members: 892,
    successStories: 156,
    successRate: "98%",
    interactions: "2.4k"
  };

  const successStories = [
    {
      id: 2,
      title: "قصة نجاح سارة",
      summary: "تخرجت من برنامج إعادة التأهيل وحصلت على وظيفة",
      date: "2024-01-10",
      likes: 78,
      category: "إعادة تأهيل"
    },
    {
      id: 3,
      title: "لم شمل عائلة محمد",
      summary: "عودة الأب بعد انقطاع تواصل لمدة عام",
      date: "2024-01-08",
      likes: 125,
      category: "لم شمل"
    }
  ];

  const handleSubmitMessage = () => {
    if (newMessage.trim()) {
      setNewMessage("");
      alert("تم إرسال رسالتك بنجاح!");
    }
  };

  if (selectedStory === featuredStory.id) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b sticky top-0 z-10">
          <div className="flex items-center justify-between p-4">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedStory(null)}
              className="flex items-center gap-2 text-blue-600"
            >
              <ChevronLeft className="h-5 w-5" />
              العودة
            </Button>
            <div className="text-center">
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                قصة مميزة
              </Badge>
            </div>
            <Button variant="ghost" size="sm">
              <Share className="h-5 w-5 text-blue-600" />
            </Button>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Story Content */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              <span>{featuredStory.date}</span>
              <span>•</span>
              <span>{featuredStory.readTime}</span>
            </div>

            <h1 className="text-2xl font-medium text-blue-900">{featuredStory.title}</h1>
            
            <div className="aspect-video rounded-lg overflow-hidden">
              <ImageWithFallback 
                src={featuredStory.image}
                alt="صورة قصة النجاح"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>{featuredStory.fullStory}</p>
              <p>{featuredStory.additionalDetails}</p>
              <div className="bg-green-50 border-r-4 border-green-400 p-4 rounded-lg">
                <p className="text-green-800 font-medium">النتيجة:</p>
                <p className="text-green-700">{featuredStory.outcome}</p>
              </div>
            </div>

            {/* Interaction Stats */}
            <div className="flex items-center justify-between py-4 border-t border-gray-200">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  <span className="text-gray-600">{featuredStory.likes}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Share className="h-5 w-5 text-blue-500" />
                  <span className="text-gray-600">{featuredStory.shares}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-600">{featuredStory.comments}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                <Heart className="h-4 w-4 ml-2" />
                إعجاب
              </Button>
              <Button variant="outline" className="flex-1">
                <MessageCircle className="h-4 w-4 ml-2" />
                تعليق
              </Button>
              <Button variant="outline" className="flex-1">
                <Share className="h-4 w-4 ml-2" />
                مشاركة
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 text-center">
        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
          <Users className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-2xl font-medium mb-2">مجتمعنا الكريم</h2>
        <p className="text-white/90">مشاركة قصص النجاح والإلهام</p>
        <p className="text-white/80 text-sm mt-2">
          نؤمن بقوة المجتمع في تحقيق المعجزات وإعادة الأمل لمن يحتاجه
        </p>
      </div>

      <div className="p-4 space-y-6 -mt-8">
        {/* Featured Story Card */}
        <Card 
          className="cursor-pointer hover:shadow-lg transition-all bg-white"
          onClick={() => setSelectedStory(featuredStory.id)}
        >
          <div className="aspect-video relative rounded-t-lg overflow-hidden">
            <ImageWithFallback 
              src={featuredStory.image}
              alt="قصة النجاح المميزة"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4">
              <Badge className="bg-purple-600 text-white">
                <Star className="h-3 w-3 ml-1" />
                مميزة
              </Badge>
            </div>
          </div>
          
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              <span>{featuredStory.date}</span>
            </div>
            
            <h3 className="text-lg font-medium text-blue-900">{featuredStory.title}</h3>
            <p className="text-gray-700 text-sm">{featuredStory.description}</p>
            
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span>{featuredStory.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="h-4 w-4 text-blue-500" />
                  <span>{featuredStory.comments}</span>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-blue-600">
                اقرأ المزيد
                <ChevronLeft className="h-4 w-4 mr-1" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Share Your Story */}
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Plus className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-medium text-yellow-800 mb-2">شارك قصتك</h3>
            <p className="text-yellow-700 text-sm mb-4">
              هل لديك قصة نجاح ملهمة؟ شاركها مع مجتمعنا
            </p>
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">
              إضافة قصة جديدة
            </Button>
          </CardContent>
        </Card>

        {/* Community Statistics */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-blue-900 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              إحصائيات المجتمع
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-medium text-blue-600">{communityStats.members}</div>
                <div className="text-sm text-blue-800">عضو</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-medium text-green-600">{communityStats.successStories}</div>
                <div className="text-sm text-green-800">قصة نجاح</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-medium text-purple-600">{communityStats.successRate}</div>
                <div className="text-sm text-purple-800">معدل النجاح</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-medium text-orange-600">{communityStats.interactions}</div>
                <div className="text-sm text-orange-800">تفاعل</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* More Success Stories */}
        <div className="space-y-4">
          <h3 className="text-xl text-blue-900 font-medium">قصص نجاح أخرى</h3>
          
          {successStories.map((story) => (
            <Card key={story.id} className="bg-white">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium text-blue-900">{story.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {story.category}
                      </Badge>
                    </div>
                    <p className="text-gray-700 text-sm mb-2">{story.summary}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{story.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="h-3 w-3 text-red-500" />
                        <span>{story.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add Support Message */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900 flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              شارك رسالة دعم
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="اكتب رسالة دعم وتشجيع للمجتمع..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="min-h-[80px] bg-white"
            />
            
            <Button 
              onClick={handleSubmitMessage}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={!newMessage.trim()}
            >
              إرسال الرسالة
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}