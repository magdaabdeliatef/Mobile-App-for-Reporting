import { Bell, Home, Shield } from "lucide-react";

export function MobileHeader() {
  return (
    <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 bg-transparent">
      <div className="flex items-center gap-2">
        <Shield className="h-6 w-6 text-white" />
        <span className="text-white font-medium">خط نجاة</span>
      </div>
      <div className="flex items-center gap-3">
        <Bell className="h-5 w-5 text-white/80" />
        <Home className="h-5 w-5 text-white/80" />
      </div>
    </div>
  );
}