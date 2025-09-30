import { Button } from "./ui/button";
import { Heart, Shield, Users } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface EnhancedWelcomeScreenProps {
  onContinue: () => void;
}

export function EnhancedWelcomeScreen({ onContinue }: EnhancedWelcomeScreenProps) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-blue-900 to-black">
        <ImageWithFallback 
          src="https://images.unsplash.com/photo-1677082342589-4619b499ae89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwYmFja2dyb3VuZCUyMGhlYXJ0cyUyMGFic3RyYWN0JTIwY2FyaW5nfGVufDF8fHx8MTc1ODQyMTgxNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="خلفية ترحيبية"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Floating hearts animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-red-400/20 animate-pulse">
          <Heart className="h-8 w-8" fill="currentColor" />
        </div>
        <div className="absolute top-40 right-16 text-pink-400/30 animate-bounce">
          <Heart className="h-6 w-6" fill="currentColor" />
        </div>
        <div className="absolute bottom-40 left-20 text-red-300/20 animate-pulse delay-500">
          <Heart className="h-10 w-10" fill="currentColor" />
        </div>
        <div className="absolute top-60 right-8 text-pink-300/25 animate-bounce delay-1000">
          <Heart className="h-5 w-5" fill="currentColor" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center p-6 text-center text-white">
        
        {/* Main Heart Icon */}
        <div className="w-24 h-24 mb-8 relative">
          <div className="w-full h-full bg-red-500 rounded-full flex items-center justify-center animate-pulse shadow-lg shadow-red-500/50">
            <Heart className="h-12 w-12 text-white" fill="currentColor" />
          </div>
          <div className="absolute inset-0 bg-red-400/30 rounded-full animate-ping"></div>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          أهلاً بكم يا أبطال المستقبل
        </h1>

        {/* App Name */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-yellow-400 mb-2">خط نجاة</h2>
          <div className="w-16 h-1 bg-yellow-400 mx-auto rounded-full"></div>
        </div>

        {/* Description */}
        <div className="space-y-3 mb-8 max-w-xs">
          <p className="text-lg text-gray-200 leading-relaxed">
            نحن نصنع الأمل
          </p>
          <p className="text-base text-gray-300 leading-relaxed">
            وأنت اليد التي تنقذ حياة
          </p>
          <p className="text-sm text-gray-400 leading-relaxed">
            إبلاغك عن حالة يصنع لها مستقبل جديد
          </p>
        </div>

        {/* Features Icons */}
        <div className="flex items-center justify-center gap-8 mb-8 opacity-70">
          <div className="flex flex-col items-center">
            <Users className="h-6 w-6 text-blue-300 mb-1" />
            <span className="text-xs text-gray-300">مجتمع</span>
          </div>
          <div className="flex flex-col items-center">
            <Shield className="h-6 w-6 text-green-300 mb-1" />
            <span className="text-xs text-gray-300">حماية</span>
          </div>
          <div className="flex flex-col items-center">
            <Heart className="h-6 w-6 text-red-300 mb-1" />
            <span className="text-xs text-gray-300">رعاية</span>
          </div>
        </div>

        {/* CTA Button */}
        <Button 
          onClick={onContinue}
          className="w-64 h-14 bg-red-500 hover:bg-red-600 text-white text-lg font-bold rounded-full shadow-lg shadow-red-500/30 transform hover:scale-105 transition-all duration-300"
        >
          هيا اضغط هنا
        </Button>

        {/* Bottom decorative element */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
}