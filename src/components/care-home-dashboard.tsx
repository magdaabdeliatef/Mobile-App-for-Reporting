import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  Building2, 
  Users, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  Settings,
  LogOut,
  Bell,
  MapPin,
  Phone,
  Mail,
  UserCheck,
  XCircle,
  Star,
  Shield,
  Heart
} from "lucide-react";

interface CareHomeRequest {
  id: number;
  reportId: number;
  report: any;
  requestedAt: string;
  status: string;
  priority: number;
  acceptedBy?: string;
}

interface CareHomeDashboardProps {
  onLogout: () => void;
  requests: CareHomeRequest[];
  onAcceptRequest: (requestId: number, careHomeName: string) => void;
  onRejectRequest: (requestId: number) => void;
}

export function CareHomeDashboard({ 
  onLogout, 
  requests = [], 
  onAcceptRequest, 
  onRejectRequest 
}: CareHomeDashboardProps) {
  const [activeTab, setActiveTab] = useState("requests");
  const careHomeName = "دار الرعاية الأمان";

  const [existingReports] = useState([
    {
      id: 1,
      type: "مفقود",
      name: "أحمد محمد",
      age: 8,
      location: "المعادي، القاهرة",
      time: "منذ ساعتين",
      status: "جديد",
      priority: "عالي"
    },
    {
      id: 2,
      type: "طفل ضائع",
      name: "فاطمة علي",
      age: 5,
      location: "الزمالك، القاهرة",
      time: "منذ 4 ساعات",
      status: "قيد المراجعة",
      priority: "متوسط"
    }
  ]);

  const [stats] = useState({
    totalReports: 45,
    activeReports: 12,
    resolvedReports: 33,
    totalChildren: 120,
    pendingRequests: requests.length,
    availableSpaces: 8
  });

  const getPriorityColor = (priority: number) => {
    if (priority >= 8) return "bg-red-500";
    if (priority >= 6) return "bg-orange-500";
    return "bg-blue-500";
  };

  const getPriorityText = (priority: number) => {
    if (priority >= 8) return "عاجل جداً";
    if (priority >= 6) return "مهم";
    return "عادي";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffMinutes < 60) {
      return `منذ ${diffMinutes} دقيقة`;
    } else if (diffMinutes < 1440) {
      return `منذ ${Math.floor(diffMinutes / 60)} ساعة`;
    } else {
      return `منذ ${Math.floor(diffMinutes / 1440)} يوم`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto p-4 space-y-6">
        
        {/* Enhanced Header */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-blue-900">{careHomeName}</h1>
                <p className="text-blue-600">لوحة التحكم المتطورة</p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1 text-green-600 text-sm">
                    <CheckCircle className="h-4 w-4" />
                    <span>{stats.availableSpaces} أماكن متاحة</span>
                  </div>
                  {requests.length > 0 && (
                    <div className="flex items-center gap-1 text-orange-600 text-sm">
                      <Bell className="h-4 w-4" />
                      <span>{requests.length} طلب جديد</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                {requests.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {requests.length}
                  </span>
                )}
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" onClick={onLogout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-4 text-center">
              <AlertCircle className="h-8 w-8 mx-auto mb-2 opacity-80" />
              <div className="text-2xl font-bold">{stats.totalReports}</div>
              <div className="text-blue-100 text-sm">إجمالي البلاغات</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0">
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 mx-auto mb-2 opacity-80" />
              <div className="text-2xl font-bold">{stats.activeReports}</div>
              <div className="text-orange-100 text-sm">بلاغات نشطة</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-8 w-8 mx-auto mb-2 opacity-80" />
              <div className="text-2xl font-bold">{stats.resolvedReports}</div>
              <div className="text-green-100 text-sm">بلاغات محلولة</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 mx-auto mb-2 opacity-80" />
              <div className="text-2xl font-bold">{stats.totalChildren}</div>
              <div className="text-purple-100 text-sm">الأطفال المسجلين</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white border-0">
            <CardContent className="p-4 text-center">
              <Bell className="h-8 w-8 mx-auto mb-2 opacity-80" />
              <div className="text-2xl font-bold">{stats.pendingRequests}</div>
              <div className="text-yellow-100 text-sm">طلبات معلقة</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-teal-500 to-teal-600 text-white border-0">
            <CardContent className="p-4 text-center">
              <Heart className="h-8 w-8 mx-auto mb-2 opacity-80" />
              <div className="text-2xl font-bold">{stats.availableSpaces}</div>
              <div className="text-teal-100 text-sm">أماكن متاحة</div>
            </CardContent>
          </Card>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg p-1 shadow-sm border border-gray-200">
          <div className="flex gap-1">
            <Button
              variant={activeTab === "requests" ? "default" : "ghost"}
              className={`flex-1 ${activeTab === "requests" ? "bg-blue-600" : ""}`}
              onClick={() => setActiveTab("requests")}
            >
              <Bell className="h-4 w-4 ml-2" />
              طلبات جديدة ({requests.length})
            </Button>
            <Button
              variant={activeTab === "active" ? "default" : "ghost"}
              className={`flex-1 ${activeTab === "active" ? "bg-blue-600" : ""}`}
              onClick={() => setActiveTab("active")}
            >
              <AlertCircle className="h-4 w-4 ml-2" />
              البلاغات النشطة
            </Button>
          </div>
        </div>

        {/* Incoming Requests Section */}
        {activeTab === "requests" && (
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
              <CardTitle className="text-blue-900 flex items-center gap-2">
                <Bell className="h-6 w-6" />
                طلبات الرعاية الواردة
                {requests.length > 0 && (
                  <Badge className="bg-red-500 text-white">
                    {requests.length} طلب جديد
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {requests.length === 0 ? (
                <div className="text-center py-12">
                  <Bell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-gray-500 text-lg mb-2">لا توجد طلبات جديدة</h3>
                  <p className="text-gray-400">ستظهر الطلبات الجديدة هنا عند وصولها</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {requests.map((request) => (
                    <div key={request.id} className="border-2 border-blue-100 rounded-xl p-6 bg-gradient-to-r from-blue-50 to-white">
                      {/* Priority and Status */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full ${getPriorityColor(request.priority)}`}></div>
                          <Badge className={`${getPriorityColor(request.priority)} text-white`}>
                            أولوية: {getPriorityText(request.priority)}
                          </Badge>
                          <Badge variant="outline" className="bg-white">
                            درجة التحقق: {request.report.verificationScore}/100
                          </Badge>
                        </div>
                        <div className="text-gray-500 text-sm">
                          {formatDate(request.requestedAt)}
                        </div>
                      </div>

                      {/* Child Information */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <h3 className="font-bold text-xl text-blue-900 mb-3">معلومات الطفل</h3>
                          
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-blue-600" />
                            <span className="font-medium">العمر:</span>
                            <span>{request.report.age} سنة</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-blue-600" />
                            <span className="font-medium">آخر موقع معروف:</span>
                            <span className="text-sm">{request.report.location}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-blue-600" />
                            <span className="font-medium">آخر مرة شوهد:</span>
                            <span>{request.report.lastSeen}</span>
                          </div>

                          {request.report.coordinates && (
                            <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                              <div className="flex items-center gap-2 text-green-800">
                                <Shield className="h-4 w-4" />
                                <span className="font-medium">تم تحديد الموقع بدقة GPS</span>
                              </div>
                              <div className="text-sm text-green-600 mt-1">
                                دقة: {Math.round(request.report.locationAccuracy)} متر
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="space-y-3">
                          <h4 className="font-bold text-lg text-blue-900 mb-3">الوصف التفصيلي</h4>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-700 leading-relaxed">
                              {request.report.description}
                            </p>
                          </div>

                          <h4 className="font-bold text-lg text-blue-900 mb-2">معلومات مقدم البلاغ</h4>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">الاسم:</span>
                              <span>{request.report.reporterName}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-blue-600" />
                              <span className="font-medium">الهاتف:</span>
                              <span>{request.report.contactPhone}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Verification Status */}
                      {request.report.verificationStatus && (
                        <div className="mt-4 p-3 rounded-lg border-r-4 border-blue-500 bg-blue-50">
                          <div className="flex items-center gap-2">
                            <Shield className="h-4 w-4 text-blue-600" />
                            <span className="font-medium text-blue-800">
                              حالة التحقق: 
                              {request.report.verificationStatus === "valid" && " تم التحقق بنجاح"}
                              {request.report.verificationStatus === "suspicious" && " يحتاج مراجعة"}
                              {request.report.verificationStatus === "invalid" && " مشبوه"}
                            </span>
                          </div>
                          {request.report.analysisDetails && (
                            <div className="mt-2 text-sm text-blue-700">
                              <p>تحليل الذكاء الاصطناعي متاح للمراجعة</p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
                        <Button 
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white h-12"
                          onClick={() => onAcceptRequest(request.id, careHomeName)}
                        >
                          <UserCheck className="h-5 w-5 ml-2" />
                          قبول الطفل في دارنا
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          className="px-6 border-red-200 text-red-600 hover:bg-red-50 h-12"
                          onClick={() => onRejectRequest(request.id)}
                        >
                          <XCircle className="h-5 w-5 ml-2" />
                          عذراً، غير متاح
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          className="px-6 h-12"
                        >
                          <Phone className="h-5 w-5 ml-2" />
                          اتصال
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Active Reports Section */}
        {activeTab === "active" && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-blue-900 flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                البلاغات النشطة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {existingReports.map((report) => (
                  <div key={report.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium text-blue-900">{report.name}</h3>
                          <Badge variant={report.priority === "عالي" ? "destructive" : "secondary"}>
                            {report.priority}
                          </Badge>
                        </div>
                        <p className="text-blue-600 text-sm mb-1">نوع البلاغ: {report.type}</p>
                        <p className="text-gray-600 text-sm mb-1">العمر: {report.age} سنوات</p>
                        <div className="flex items-center gap-1 text-gray-600 text-sm">
                          <MapPin className="h-3 w-3" />
                          <span>{report.location}</span>
                        </div>
                      </div>
                      
                      <div className="text-left">
                        <Badge variant="outline" className="mb-2">
                          {report.status}
                        </Badge>
                        <p className="text-gray-500 text-xs">{report.time}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 pt-2 border-t">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        عرض التفاصيل
                      </Button>
                      <Button size="sm" variant="outline">
                        تحديث الحالة
                      </Button>
                      <Button size="sm" variant="outline">
                        <Phone className="h-3 w-3 ml-1" />
                        اتصال
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-blue-900">الإجراءات السريعة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button className="h-20 flex-col bg-green-500 hover:bg-green-600">
                <CheckCircle className="h-6 w-6 mb-2" />
                <span>إضافة طفل جديد</span>
              </Button>
              
              <Button className="h-20 flex-col bg-orange-500 hover:bg-orange-600">
                <AlertCircle className="h-6 w-6 mb-2" />
                <span>بلاغ طارئ</span>
              </Button>
              
              <Button className="h-20 flex-col bg-blue-500 hover:bg-blue-600">
                <Mail className="h-6 w-6 mb-2" />
                <span>التقارير الشهرية</span>
              </Button>

              <Button className="h-20 flex-col bg-purple-500 hover:bg-purple-600">
                <Star className="h-6 w-6 mb-2" />
                <span>تقييم الأداء</span>
              </Button>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}