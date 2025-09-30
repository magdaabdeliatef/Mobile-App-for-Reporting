import { Home, Search, MapPin, Heart, Users } from "lucide-react";

interface NewBottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function NewBottomNavigation({ activeTab, onTabChange }: NewBottomNavigationProps) {
  const tabs = [
    { id: "home", icon: Home, label: "الرئيسية", color: "bg-blue-500" },
    { id: "missing", icon: Search, label: "البلاغ", color: "bg-red-500" },
    { id: "gallery", icon: Users, label: "المفقودين", color: "bg-indigo-500" },
    { id: "homes", icon: MapPin, label: "دور الرعاية", color: "bg-green-500" },
    { id: "donate", icon: Heart, label: "التبرع", color: "bg-yellow-500" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 shadow-xl border-t border-gray-700">
      <div className="flex justify-around items-center py-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center p-2 min-w-[52px] transition-all duration-300 ${
              activeTab === tab.id 
                ? "text-white transform scale-110" 
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 transition-all duration-300 ${
              activeTab === tab.id 
                ? `${tab.color} shadow-lg` 
                : "bg-gray-700 hover:bg-gray-600"
            }`}>
              <tab.icon className="h-4 w-4 text-white" />
            </div>
            <span className={`text-[10px] font-medium leading-tight ${
              activeTab === tab.id ? "text-white" : "text-gray-400"
            }`}>
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}