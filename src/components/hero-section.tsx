import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HeroSectionProps {
  onReportClick: () => void;
}

export function HeroSection({ onReportClick }: HeroSectionProps) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 text-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <ImageWithFallback 
          src="https://images.unsplash.com/photo-1586739050530-2fddeb1770d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHNhZmV0eSUyMHByb3RlY3Rpb24lMjBjYXJlJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3NTgzMjEzNTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Children safety background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 space-y-8 max-w-sm">
        {/* Main Title */}
        <div className="space-y-4">
          <h1 className="text-4xl text-white font-medium">أهلاً بكم</h1>
          <h2 className="text-4xl text-white font-medium">يا أبطال المستقبل</h2>
        </div>
        
        {/* App Name and Description */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl text-yellow-400 font-medium">خط نجاة</h3>
            <p className="text-white text-xl">نحن هنا لحمايتكم</p>
          </div>
          
          <div className="space-y-3">
            <p className="text-white/90 text-base">
              بلاغ أمني هام نجمع
            </p>
            <p className="text-white/80 text-sm">
              للإبلاغ عن أي وضع غير آمن أو مطحيل جديد
            </p>
          </div>
        </div>
        
        {/* Action Button */}
        <div className="pt-8">
          <Button 
            onClick={onReportClick}
            className="bg-red-500 hover:bg-red-600 text-white px-10 py-4 rounded-full text-lg font-medium w-full max-w-xs"
          >
            كيفية التبليغ الآن
          </Button>
        </div>
      </div>
    </div>
  );
}