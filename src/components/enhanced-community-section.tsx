import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Plus,
  Users,
  Star,
  CheckCircle,
  TrendingUp,
  Award,
  Clock,
  User
} from "lucide-react";

export function EnhancedCommunitySection() {
  const [showStoryForm, setShowStoryForm] = useState(false);
  const [newStory, setNewStory] = useState({
    title: "",
    content: "",
    name: ""
  });

  const communityStats = [
    { 
      label: "قصص نجاح", 
      value: "892", 
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50"
    },
    { 
      label: "أعضاء المجتمع", 
      value: "156", 
      icon: Users,
      color: "text-blue-600", 
      bgColor: "bg-blue-50"
    },
    { 
      label: "معدل النجاح", 
      value: "98%", 
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    { 
      label: "تفاعل ا��مجتمع", 
      value: "2.4k", 
      icon: Heart,
      color: "text-red-600",
      bgColor: "bg-red-50"
    }
  ];

  const successStories = [
    {
      id: 1,
      title: "تم العثور على الطفل أحمد بأمان",
      content: "بفضل تعاون المجتمع والاستجابة السريعة، تم العثور على الطفل أحمد وإعادته لأهله سالماً. شكراً لكل من ساعد في نشر البلاغ.",
      author: "عائلة أحمد",
      timeAgo: "قبل يومين",
      likes: 24,
      comments: 8,
      shares: 5,
      category: "عثور على مفقود"
    },
    {
      id: 2,
      title: "نجاح حملة التبرع لدار الأيتام",
      content: "تمكنا من جمع 50,000 جنيه لدعم دار الأيتام. كان التفاعل رائعاً من جميع أفراد المجتمع.",
      author: "محمد عبدالرحمن",
      timeAgo: "قبل 3 أيام",
      likes: 45,
      comments: 12,
      shares: 18,
      category: "تبرع ناجح"
    },
    {
      id: 3,
      title: "تم إنقاذ عائلة من وضع صعب",
      content: "استطعنا مساعدة عائلة في وضع صعب من خلال توفير المأوى والطعام. المجتمع قوي عندما نتعاون.",
      author: "جمعية الخير",
      timeAgo: "قبل أسبوع",
      likes: 67,
      comments: 20,
      shares: 25,
      category: "مساعدة اجتماعية"
    }
  ];

  const handleSubmitStory = () => {
    if (!newStory.title || !newStory.content) {
      alert("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    // Here you would typically submit to backend
    alert("تم إرسال قصتك بنجاح! سيتم مراجعتها ونشرها قريباً.");
    setNewStory({ title: "", content: "", name: "" });
    setShowStoryForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 text-center">
        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
          <Users className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold mb-2">مجتمعنا</h1>
        <p className="text-white/90 text-sm">
          قصص نجاح ملهمة من مجتمعنا المتعاون
        </p>
      </div>

      <div className="p-4 space-y-6 -mt-8">

        {/* Share Your Story Section */}
        <Card className="bg-white shadow-lg border-0">
          <div className="relative overflow-hidden">
            <div className="aspect-[2/1] relative">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1687563100680-6b763a90da45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBzaGFyaW5nJTIwc3RvcmllcyUyMHBlb3BsZSUyMGhlbHBpbmd8ZW58MXx8fHwxNzU4NDk1NjAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="شارك قصتك"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Plus className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">شارك قصتك</h3>
                    <p className="text-white/90 text-sm">احك لنا عن تجربة إيجابية حدثت معك</p>
                  </div>
                </div>
                
                <Button 
                  onClick={() => setShowStoryForm(true)}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg"
                >
                  <Plus className="h-5 w-5 ml-2" />
                  إضافة قصة
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Story Form Modal */}
        {showStoryForm && (
          <Card className="bg-white shadow-xl border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-800 flex items-center gap-2">
                <Plus className="h-5 w-5" />
                شارك قصة نجاح
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="storyTitle">عنوان القصة *</Label>
                <Input
                  id="storyTitle"
                  placeholder="اكتب عنوان مناسب لقصتك"
                  value={newStory.title}
                  onChange={(e) => setNewStory({...newStory, title: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="storyContent">تفاصيل القصة *</Label>
                <Textarea
                  id="storyContent"
                  placeholder="احك لنا تجربتك بالتفصيل..."
                  value={newStory.content}
                  onChange={(e) => setNewStory({...newStory, content: e.target.value})}
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="authorName">اسمك (اختياري)</Label>
                <Input
                  id="authorName"
                  placeholder="يمكنك ترك هذا فارغاً للنشر مجهول الهوية"
                  value={newStory.name}
                  onChange={(e) => setNewStory({...newStory, name: e.target.value})}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  onClick={handleSubmitStory}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
                >
                  نشر القصة
                </Button>
                <Button 
                  onClick={() => setShowStoryForm(false)}
                  variant="outline"
                  className="flex-1"
                >
                  إلغاء
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Community Statistics */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-purple-800 flex items-center gap-2">
              <Award className="h-5 w-5" />
              إحصائيات المجتمع
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {communityStats.map((stat, index) => (
                <div 
                  key={index}
                  className={`${stat.bgColor} border border-gray-200 rounded-lg p-4 text-center`}
                >
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-full flex items-center justify-center mx-auto mb-2`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                    {stat.value}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Success Stories */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            قصص النجاح
          </h2>

          {successStories.map((story) => (
            <Card key={story.id} className="bg-white shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-800">{story.author}</span>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span>{story.timeAgo}</span>
                      <Badge variant="secondary" className="text-xs">
                        {story.category}
                      </Badge>
                    </div>
                  </div>
                </div>

                <h3 className="font-bold text-gray-800 mb-2">{story.title}</h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{story.content}</p>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors">
                      <Heart className="h-4 w-4" />
                      <span className="text-sm">{story.likes}</span>
                    </button>
                    <button className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors">
                      <MessageCircle className="h-4 w-4" />
                      <span className="text-sm">{story.comments}</span>
                    </button>
                    <button className="flex items-center gap-1 text-gray-500 hover:text-green-500 transition-colors">
                      <Share2 className="h-4 w-4" />
                      <span className="text-sm">{story.shares}</span>
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom spacing for navigation */}
        <div className="h-20"></div>
      </div>
    </div>
  );
}