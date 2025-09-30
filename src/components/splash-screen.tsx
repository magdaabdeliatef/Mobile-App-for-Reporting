import { Heart, Shield, Users } from "lucide-react";
import { Button } from "./ui/button";

interface SplashScreenProps {
  onContinue: () => void;
}

export function SplashScreen({ onContinue }: SplashScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col items-center justify-center p-6 text-center">
      {/* Logo */}
      <div className="mb-8">
        <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg">
          <Heart className="h-12 w-12 text-white" />
        </div>
        <h1 className="text-3xl text-blue-900 mb-2">دار الرعاية</h1>
        <p className="text-blue-700 text-lg">معًا لحماية ورعاية المفقودين والمهمشين</p>
      </div>

      {/* Features */}
      <div className="space-y-6 mb-8">
        <div className="flex items-center gap-4 bg-white/70 p-4 rounded-2xl">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div className="text-right">
            <h3 className="text-blue-900 font-medium">حماية وأمان</h3>
            <p className="text-blue-700 text-sm">نوفر بيئة آمنة للجميع</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white/70 p-4 rounded-2xl">
          <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
            <Users className="h-6 w-6 text-white" />
          </div>
          <div className="text-right">
            <h3 className="text-blue-900 font-medium">مجتمع متعاون</h3>
            <p className="text-blue-700 text-sm">نعمل معًا لمساعدة المحتاجين</p>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <Button 
        onClick={onContinue}
        className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-full text-lg w-full max-w-xs"
      >
        ابدأ الآن
      </Button>

      <p className="text-blue-600 text-sm mt-4">خدمة مجانية للجميع</p>
    </div>
  );
}