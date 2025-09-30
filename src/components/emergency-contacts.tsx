import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Phone, Shield, Heart, Users } from "lucide-react";

export function EmergencyContacts() {
  const contacts = [
    {
      name: "الخط الساخن للطوارئ",
      number: "911",
      icon: Phone,
      color: "bg-red-500",
      description: "للحالات الطارئة"
    },
    {
      name: "دار الرعاية الرئيسية",
      number: "800-123-4567",
      icon: Shield,
      color: "bg-blue-500",
      description: "دعم ومساعدة على مدار الساعة"
    },
    {
      name: "الدعم النفسي",
      number: "800-987-6543",
      icon: Heart,
      color: "bg-green-500",
      description: "مساعدة نفسية واجتماعية"
    },
    {
      name: "خدمات الأطفال",
      number: "800-555-0123",
      icon: Users,
      color: "bg-purple-500",
      description: "حماية ورعاية الأطفال"
    }
  ];

  const handleCall = (number: string) => {
    window.open(`tel:${number}`, '_self');
  };

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-xl mb-4 text-center">أرقام الطوارئ</h2>
      
      {contacts.map((contact, index) => (
        <Card key={index} className="w-full">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className={`${contact.color} p-3 rounded-full`}>
                <contact.icon className="h-6 w-6 text-white" />
              </div>
              
              <div className="flex-1">
                <h3 className="font-medium text-lg">{contact.name}</h3>
                <p className="text-sm text-gray-600">{contact.description}</p>
                <p className="text-lg font-mono text-blue-600">{contact.number}</p>
              </div>
              
              <Button 
                onClick={() => handleCall(contact.number)}
                className="bg-green-500 hover:bg-green-600 text-white"
                size="sm"
              >
                اتصال
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      
      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="p-4 text-center">
          <p className="text-sm text-yellow-800">
            💡 <strong>نصيحة:</strong> في حالات الطوارئ الفورية، اتصل بـ 911 مباشرة
          </p>
        </CardContent>
      </Card>
    </div>
  );
}