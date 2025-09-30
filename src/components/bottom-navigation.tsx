import { Home, FileText, MessageCircle, User, Phone } from "lucide-react";

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const tabs = [
    { id: "home", icon: Home, label: "الرئيسية" },
    { id: "reports", icon: FileText, label: "بلاغاتي" },
    { id: "chat", icon: MessageCircle, label: "الدردشة" },
    { id: "emergency", icon: Phone, label: "طوارئ" },
    { id: "profile", icon: User, label: "الملف" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white">
      <div className="flex justify-around items-center py-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center p-2 min-w-[60px] ${
              activeTab === tab.id ? "text-red-400" : "text-gray-400"
            }`}
          >
            <tab.icon className="h-5 w-5 mb-1" />
            <span className="text-xs">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}