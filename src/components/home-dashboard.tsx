import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Search, MapPin, Heart, Users, TrendingUp, Clock, Phone } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HomeDashboardProps {
  onNavigate: (tab: string) => void;
}

export function HomeDashboard({ onNavigate }: HomeDashboardProps) {
  const quickActions = [
    {
      id: "missing",
      title: "إبلاغ عن مفقود",
      description: "ساعد في العثور على المفقودين",
      icon: Search,
      color: "bg-red-500",
      bgColor: "bg-red-50"
    },
    {
      id: "homes",
      title: "دور الرعاية",
      description: "اعثر على أقرب دار رعاية",
      icon: MapPin,
      color: "bg-blue-500",
      bgColor: "bg-blue-50"
    },
    {
      id: "donate",
      title: "تبرع الآن",
      description: "ساهم في مساعدة المحتاجين",
      icon: Heart,
      color: "bg-green-500",
      bgColor: "bg-green-50"
    }
  ];

  const stats = [
    { label: "حالة نشطة", value: "23", icon: Clock, color: "text-blue-600" },
    { label: "تم حلها", value: "156", icon: TrendingUp, color: "text-green-600" },
    { label: "دار رعاية", value: "12", icon: MapPin, color: "text-purple-600" },
    { label: "متطوع", value: "89", icon: Users, color: "text-orange-600" }
  ];

  return (
    <div className="p-4 space-y-6 pb-20">
      {/* Header with Hero Image */}
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1581579439134-50af06bb2dd0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJlJTIwaG9tZSUyMGVsZGVybHklMjBjaGlsZHJlbiUyMGZhbWlseSUyMHN1cHBvcnR8ZW58MXx8fHwxNzU4MzIxNzQwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Care home background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-900/70"></div>
        </div>
        
        <CardContent className="relative z-10 p-6 text-center text-white">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl mb-2">دار الرعاية</h1>
          <p className="text-blue-100">معًا لحماية ورعاية المفقودين والمهمشين</p>
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4 text-center">
              <stat.icon className={`h-6 w-6 ${stat.color} mx-auto mb-2`} />
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h3 className="text-xl text-blue-900">الإجراءات السريعة</h3>
        
        {quickActions.map((action) => (
          <Card 
            key={action.id}
            className={`cursor-pointer hover:shadow-md transition-all border-l-4 border-l-${action.color.replace('bg-', '')}`}
            onClick={() => onNavigate(action.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${action.color} rounded-full flex items-center justify-center`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-blue-900">{action.title}</h4>
                  <p className="text-blue-700 text-sm">{action.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Emergency Contact */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
              <Phone className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-yellow-800">الخط الساخن للطوارئ</h4>
              <p className="text-yellow-700 text-sm">متاح 24 ساعة طوال الأسبوع</p>
            </div>
            <Button 
              className="bg-yellow-500 hover:bg-yellow-600 text-white"
              onClick={() => window.open('tel:911', '_self')}
            >
              911
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-blue-900">النشاط الأخير</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium">تم العثور على أحمد محمد</p>
              <p className="text-xs text-gray-500">منذ ساعتين</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <Users className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium">متطوع جديد انضم للفريق</p>
              <p className="text-xs text-gray-500">منذ 4 ساعات</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
              <Heart className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium">تبرع جديد تم استلامه</p>
              <p className="text-xs text-gray-500">منذ 6 ساعات</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}