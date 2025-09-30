import { Clock, Users, TrendingUp } from "lucide-react";

export function StatsSection() {
  return (
    <div className="flex justify-center items-center gap-8 p-6 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl mx-4 mt-6">
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-1 text-yellow-400">
          <Clock className="h-4 w-4" />
          <span className="text-2xl">24/7</span>
        </div>
        <span className="text-white/80 text-xs">متاح</span>
      </div>
      
      <div className="w-px h-8 bg-white/20"></div>
      
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-1 text-blue-400">
          <Users className="h-4 w-4" />
          <span className="text-2xl">3</span>
        </div>
        <span className="text-white/80 text-xs">دور رعاية</span>
      </div>
      
      <div className="w-px h-8 bg-white/20"></div>
      
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-1 text-green-400">
          <TrendingUp className="h-4 w-4" />
          <span className="text-2xl">+156</span>
        </div>
        <span className="text-white/80 text-xs">بلاغ تم حله</span>
      </div>
    </div>
  );
}