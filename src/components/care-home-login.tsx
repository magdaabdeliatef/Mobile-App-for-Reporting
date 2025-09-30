import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Building2, ArrowRight, Mail, Lock, Eye, EyeOff } from "lucide-react";

interface CareHomeLoginProps {
  onLogin: () => void;
  onBack: () => void;
}

export function CareHomeLogin({ onLogin, onBack }: CareHomeLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("يرجى إدخال البريد الإلكتروني وكلمة المرور");
      return;
    }

    setIsLoading(true);
    // محاكاة عملية تسجيل الدخول
    setTimeout(() => {
      setIsLoading(false);
      alert("تم تسجيل الدخول بنجاح!");
      onLogin();
    }, 1500);
  };

  const handleGoogleLogin = () => {
    // محاكاة تسجيل الدخول عبر Google
    alert("سيتم توجيهك إلى Google لإتمام تسجيل الدخول");
    setTimeout(() => {
      onLogin();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6 flex flex-col justify-center">
      <div className="max-w-md mx-auto w-full space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <Button
            variant="ghost"
            onClick={onBack}
            className="absolute top-6 right-6 text-blue-600"
          >
            <ArrowRight className="h-5 w-5" />
          </Button>
          
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
            <Building2 className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl text-blue-900 font-medium">تسجيل دخول دار الرعاية</h1>
          <p className="text-blue-700">أدخل بياناتك للوصول إلى لوحة التحكم</p>
        </div>

        {/* Login Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-blue-900 text-center">تسجيل الدخول</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-blue-800">البريد الإلكتروني / اسم المستخدم</Label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 h-4 w-4" />
                <Input
                  id="email"
                  type="email"
                  placeholder="أدخل البريد الإلكتروني"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-blue-800">كلمة المرور</Label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 h-4 w-4" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="أدخل كلمة المرور"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10 pl-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute left-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-blue-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-blue-400" />
                  )}
                </Button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-left">
              <Button variant="link" className="text-blue-600 text-sm p-0">
                نسيت كلمة المرور؟
              </Button>
            </div>

            {/* Login Button */}
            <Button 
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
            >
              {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
            </Button>

            {/* Separator */}
            <div className="relative">
              <Separator />
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-gray-500">
                أو
              </span>
            </div>

            {/* Google Login Button */}
            <Button 
              onClick={handleGoogleLogin}
              variant="outline"
              className="w-full border-2 border-red-200 hover:border-red-300 hover:bg-red-50 py-3"
            >
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-red-500 rounded-sm flex items-center justify-center">
                  <span className="text-white text-xs font-medium">G</span>
                </div>
                <span className="text-red-600 font-medium">تسجيل الدخول باستخدام Google</span>
              </div>
            </Button>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-blue-600">
          <p>لا تملك حساب؟ <Button variant="link" className="text-blue-600 p-0">تواصل معنا</Button></p>
        </div>
      </div>
    </div>
  );
}