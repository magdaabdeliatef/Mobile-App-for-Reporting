import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Search, MapPin, Heart, Users, TrendingUp, Clock, Phone, Bell, User, ChevronRight, Star, Shield } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface EnhancedHomeDashboardProps {
  onNavigate: (tab: string) => void;
}

export function EnhancedHomeDashboard({ onNavigate }: EnhancedHomeDashboardProps) {
  const quickActions = [
    {
      id: "missing",
      title: "إبلاغ عن حالة",
      description: "ساعد في العثور على المفقودين",
      icon: Search,
      color: "from-red-500 to-red-600",
      textColor: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      id: "homes",
      title: "المفقودين",
      description: "عرض البلاغات والمساعدة في البحث",
      icon: Users,
      color: "from-blue-500 to-blue-600",
      textColor: "text-blue-600", 
      bgColor: "bg-blue-50"
    },
    {
      id: "donate",
      title: "التطبيقات الذكية",
      description: "خدمات متقدمة وأدوات مساعدة",
      icon: Shield,
      color: "from-green-500 to-green-600",
      textColor: "text-green-600",
      bgColor: "bg-green-50"
    }
  ];

  const stats = [
    { 
      label: "حالة نشطة", 
      value: "23", 
      icon: Clock, 
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      change: "+5%"
    },
    { 
      label: "تم حلها", 
      value: "156", 
      icon: TrendingUp, 
      color: "text-green-600",
      bgColor: "bg-green-50",
      change: "+12%"
    },
    { 
      label: "دار رعاية", 
      value: "12", 
      icon: MapPin, 
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      change: "+2"
    },
    { 
      label: "متطوع", 
      value: "89", 
      icon: Users, 
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      change: "+8"
    }
  ];

  const recentActivity = [
    {
      type: "success",
      title: "تم العثور على أحمد محمد بأمان",
      description: "تم العثور عليه في منطقة المعادي",
      time: "منذ ساعتين",
      icon: TrendingUp,
      color: "bg-green-500",
      bgColor: "bg-green-50"
    },
    {
      type: "volunteer",
      title: "متطوع جديد انضم للفريق",
      description: "د. سارة أحمد - طبيبة أطفال",
      time: "منذ 4 ساعات", 
      icon: Users,
      color: "bg-blue-500",
      bgColor: "bg-blue-50"
    },
    {
      type: "donation",
      title: "تبرع جديد تم استلامه",
      description: "5000 جنيه لدعم العمليات",
      time: "منذ 6 ساعات",
      icon: Heart,
      color: "bg-yellow-500", 
      bgColor: "bg-yellow-50"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">خط نجاة</h1>
              <p className="text-white/80 text-sm">معًا لحماية المجتمع</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-white/10 relative"
            >
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs">
                3
              </Badge>
            </Button>
            
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-white/10"
              onClick={() => alert("الملف الشخصي قريباً")}
            >
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Hero Card */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">مرحباً بك أحمد</h3>
                <p className="text-white/80 text-sm">كيف يمكننا مساعدتك اليوم؟</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="p-4 space-y-6 -mt-4">

        {/* Enhanced Stats */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-indigo-800">إحصائيات اليوم</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className={`${stat.bgColor} border border-gray-200 rounded-lg p-4 text-center`}
                >
                  <div className={`w-10 h-10 ${stat.bgColor} rounded-full flex items-center justify-center mx-auto mb-2`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <div className={`text-xl font-bold ${stat.color} mb-1`}>
                    {stat.value}
                  </div>
                  <div className="text-gray-600 text-xs mb-1">
                    {stat.label}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {stat.change}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Quick Actions */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-indigo-800">الخدمات الرئيسية</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action) => (
              <button
                key={action.id}
                onClick={() => onNavigate(action.id)}
                className="w-full text-right"
              >
                <div className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all">
                  <div className={`w-12 h-12 ${action.bgColor} rounded-full flex items-center justify-center`}>
                    <action.icon className={`h-6 w-6 ${action.textColor}`} />
                  </div>
                  
                  <div className="flex-1 text-right">
                    <h4 className="font-medium text-gray-800">{action.title}</h4>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                  
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Emergency Contact - Enhanced */}
        <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                <Phone className="h-7 w-7 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-red-800">الخط الساخن للطوارئ</h4>
                <p className="text-red-700 text-sm">متاح 24 ساعة - استجابة فورية</p>
              </div>
              <Button 
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 font-bold"
                onClick={() => window.open('tel:911', '_self')}
              >
                911
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Recent Activity */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-indigo-800 flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              النشاط الأخير
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className={`flex items-center gap-3 p-3 ${activity.bgColor} rounded-lg border border-gray-200`}>
                <div className={`w-10 h-10 ${activity.color} rounded-full flex items-center justify-center`}>
                  <activity.icon className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800 text-sm">{activity.title}</p>
                  <p className="text-gray-600 text-xs">{activity.description}</p>
                  <p className="text-gray-500 text-xs mt-1">{activity.time}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Links */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-4">
            <div className="text-center">
              <h3 className="font-medium text-blue-800 mb-3">روابط سريعة</h3>
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  size="sm" 
                  onClick={() => onNavigate("community")}
                  className="bg-purple-500 hover:bg-purple-600"
                >
                  <Users className="h-4 w-4 ml-1" />
                  المجتمع
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => onNavigate("gallery")}
                  className="bg-indigo-500 hover:bg-indigo-600"
                >
                  <Search className="h-4 w-4 ml-1" />
                  المفقودين
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => onNavigate("donate")}
                  className="border-blue-300 text-blue-700"
                >
                  <Heart className="h-4 w-4 ml-1" />
                  تبرع
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => onNavigate("homes")}
                  className="border-blue-300 text-blue-700"
                >
                  <MapPin className="h-4 w-4 ml-1" />
                  خريطة
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom spacing for navigation */}
        <div className="h-20"></div>
      </div>
    </div>
  );
}