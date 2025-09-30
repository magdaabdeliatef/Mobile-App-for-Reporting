import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  User,
  Settings,
  Bell,
  Shield,
  Heart,
  Search,
  MapPin,
  Phone,
  Mail,
  Edit,
  LogOut,
  ChevronRight,
  Award,
  Calendar,
  Users,
  MessageSquare,
  Download,
  Share2
} from "lucide-react";

interface EnhancedProfileSectionProps {
  onNavigate?: (tab: string) => void;
}

export function EnhancedProfileSection({ onNavigate }: EnhancedProfileSectionProps) {
  const [userInfo] = useState({
    name: "أحمد محمد الأمين",
    id: "944521-145-571",
    joinDate: "يونيو 2023",
    avatar: "https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VyJTIwcHJvZmlsZSUyMHBlcnNvbiUyMGF2YXRhcnxlbnwxfHx8fDE3NTg0OTU2MDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  });

  const mainServices = [
    {
      id: "report",
      title: "إبلاغ عن حالة",
      description: "إبلاغ سريع عن حالة تحتاج مساعدة",
      icon: Search,
      color: "from-red-500 to-red-600",
      textColor: "text-red-600",
      bgColor: "bg-red-50",
      action: () => onNavigate?.("missing")
    },
    {
      id: "missing", 
      title: "المفقودين",
      description: "عرض البلاغات والمساعدة في البحث",
      icon: Users,
      color: "from-blue-500 to-blue-600", 
      textColor: "text-blue-600",
      bgColor: "bg-blue-50",
      action: () => onNavigate?.("missing")
    },
    {
      id: "smart",
      title: "التطبيقات الذكية",
      description: "خدمات متقدمة وأدوات مساعدة",
      icon: Shield,
      color: "from-green-500 to-green-600",
      textColor: "text-green-600", 
      bgColor: "bg-green-50",
      action: () => onNavigate?.("homes")
    }
  ];

  const quickActions = [
    {
      title: "الإعدادات",
      icon: Settings,
      color: "text-gray-600",
      action: () => alert("صفحة الإعدادات قريباً")
    },
    {
      title: "الإشعارات", 
      icon: Bell,
      color: "text-blue-600",
      badge: "3",
      action: () => alert("صفحة الإشعارات قريباً")
    },
    {
      title: "مشاركة التطبيق",
      icon: Share2,
      color: "text-green-600", 
      action: () => {
        if (navigator.share) {
          navigator.share({
            title: 'خط نجاة - دار الرعاية',
            text: 'تطبيق خط نجاة لربط دور الرعاية ومساعدة المحتاجين',
            url: window.location.href
          });
        } else {
          alert("تم نسخ رابط التطبيق");
        }
      }
    },
    {
      title: "تحميل التقارير",
      icon: Download,
      color: "text-purple-600",
      action: () => alert("تحميل التقارير قريباً")
    }
  ];

  const userStats = [
    { label: "البلاغات المرسلة", value: "12", icon: MessageSquare },
    { label: "التبرعات", value: "5", icon: Heart },
    { label: "المساهمات", value: "28", icon: Award },
    { label: "أيام العضوية", value: "245", icon: Calendar }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">خط نجاة</h1>
          <Button
            size="sm"
            variant="ghost"
            className="text-white hover:bg-white/10"
            onClick={() => alert("تسجيل خروج")}
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>

        {/* User Profile Card */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <ImageWithFallback
                  src={userInfo.avatar}
                  alt="صورة المستخدم"
                  className="w-16 h-16 rounded-full object-cover border-2 border-white/30"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="font-bold text-lg text-white">{userInfo.name}</h3>
                <p className="text-white/80 text-sm">{userInfo.id}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Calendar className="h-3 w-3 text-white/60" />
                  <span className="text-white/60 text-xs">عضو منذ {userInfo.joinDate}</span>
                </div>
              </div>

              <Button
                size="sm"
                variant="ghost"
                className="text-white hover:bg-white/10"
                onClick={() => alert("تعديل الملف الشخصي")}
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="p-4 space-y-6 -mt-4">

        {/* Main Services */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-indigo-800">الخدمات الرئيسية</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mainServices.map((service) => (
              <button
                key={service.id}
                onClick={service.action}
                className="w-full text-right"
              >
                <div className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all">
                  <div className={`w-12 h-12 ${service.bgColor} rounded-full flex items-center justify-center`}>
                    <service.icon className={`h-6 w-6 ${service.textColor}`} />
                  </div>
                  
                  <div className="flex-1 text-right">
                    <h4 className="font-medium text-gray-800">{service.title}</h4>
                    <p className="text-sm text-gray-600">{service.description}</p>
                  </div>
                  
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        {/* User Statistics */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-indigo-800">إحصائياتك</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {userStats.map((stat, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 text-center border border-gray-200"
                >
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <stat.icon className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div className="text-xl font-bold text-indigo-600 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 text-xs">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-indigo-800">إجراءات سريعة</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <action.icon className={`h-5 w-5 ${action.color}`} />
                  <span className="text-gray-800">{action.title}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  {action.badge && (
                    <Badge className="bg-red-500 text-white text-xs">
                      {action.badge}
                    </Badge>
                  )}
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Contact Info */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-medium text-blue-800 mb-2">هل تحتاج مساعدة؟</h3>
              <p className="text-blue-700 text-sm mb-3">
                تواصل معنا على مدار 24 ساعة
              </p>
              <div className="flex justify-center gap-3">
                <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                  <Phone className="h-4 w-4 ml-1" />
                  اتصل بنا
                </Button>
                <Button size="sm" variant="outline" className="border-blue-300 text-blue-700">
                  <Mail className="h-4 w-4 ml-1" />
                  راسلنا
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