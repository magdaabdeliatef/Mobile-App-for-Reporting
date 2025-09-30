import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { User, Building2, Shield, Heart } from "lucide-react";

interface LoginSelectionProps {
  onUserTypeSelect: (userType: "normal" | "care-home") => void;
}

export function LoginSelection({ onUserTypeSelect }: LoginSelectionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6 flex flex-col justify-center">
      <div className="max-w-md mx-auto w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
            <Shield className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl text-blue-900 font-medium">خط نجاة</h1>
          <p className="text-blue-700">اختر نوع الحساب للمتابعة</p>
        </div>

        {/* User Type Selection */}
        <div className="space-y-4">
          {/* Normal User Option */}
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all border-2 border-blue-200 hover:border-blue-400"
            onClick={() => onUserTypeSelect("normal")}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-medium text-blue-900 mb-2">للمستخدم العادي</h3>
                  <p className="text-blue-700 text-sm mb-3">الإبلاغ عن مفقود</p>
                  <div className="flex items-center gap-2 text-green-600 text-sm">
                    <Heart className="h-4 w-4" />
                    <span>دخول سريع - بدون تسجيل</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Care Home Option */}
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all border-2 border-blue-200 hover:border-blue-400"
            onClick={() => onUserTypeSelect("care-home")}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                  <Building2 className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-medium text-blue-900 mb-2">لدور الرعاية</h3>
                  <p className="text-blue-700 text-sm mb-3">تسجيل الدخول للوحة التحكم</p>
                  <div className="flex items-center gap-2 text-blue-600 text-sm">
                    <Shield className="h-4 w-4" />
                    <span>حساب مسجل - تسجيل دخول آمن</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-blue-600">
          <p>نحن هنا لخدمتكم على مدار الساعة</p>
        </div>
      </div>
    </div>
  );
}