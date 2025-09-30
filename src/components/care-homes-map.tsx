import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { MapPin, Phone, Clock, Users, Star } from "lucide-react";

export function CareHomesMap() {
  const [selectedHome, setSelectedHome] = useState<string | null>(null);

  const careHomes = [
    {
      id: "1",
      name: "دار الرعاية الأولى",
      address: "حي الملك فهد، الرياض",
      phone: "011-123-4567",
      hours: "24 ساعة",
      capacity: "50 شخص",
      rating: 4.8,
      services: ["إقامة", "طعام", "رعاية طبية"],
      coordinates: { lat: 24.7136, lng: 46.6753 }
    },
    {
      id: "2", 
      name: "دار الأمان",
      address: "حي العليا، الرياض",
      phone: "011-234-5678",
      hours: "24 ساعة",
      capacity: "35 شخص",
      rating: 4.6,
      services: ["إقامة", "تأهيل", "دعم نفسي"],
      coordinates: { lat: 24.6877, lng: 46.7219 }
    },
    {
      id: "3",
      name: "دار الضيافة",
      address: "حي المروج، جدة",
      phone: "012-345-6789",
      hours: "24 ساعة",
      capacity: "40 شخص",
      rating: 4.7,
      services: ["إقامة مؤقتة", "وجبات", "خدمات اجتماعية"],
      coordinates: { lat: 21.4858, lng: 39.1925 }
    }
  ];

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  return (
    <div className="p-4 space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl text-blue-900 mb-2">دور الرعاية</h2>
        <p className="text-blue-700">اعثر على أقرب دار رعاية إليك</p>
      </div>

      {/* Interactive Map Placeholder */}
      <Card className="mb-6">
        <CardContent className="p-0">
          <div className="h-64 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-600/10"></div>
            <div className="text-center z-10">
              <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-2" />
              <p className="text-blue-800">خريطة تفاعلية</p>
              <p className="text-blue-600 text-sm">اضغط على العلامات لعرض التفاصيل</p>
            </div>
            
            {/* Map markers */}
            <div className="absolute top-1/4 left-1/3 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center cursor-pointer" 
                 onClick={() => setSelectedHome("1")}>
              <MapPin className="h-4 w-4 text-white" />
            </div>
            <div className="absolute top-1/2 right-1/4 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center cursor-pointer"
                 onClick={() => setSelectedHome("2")}>
              <MapPin className="h-4 w-4 text-white" />
            </div>
            <div className="absolute bottom-1/4 left-1/2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center cursor-pointer"
                 onClick={() => setSelectedHome("3")}>
              <MapPin className="h-4 w-4 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Care Homes List */}
      <div className="space-y-4">
        {careHomes.map((home) => (
          <Card key={home.id} className={`border-2 transition-all ${
            selectedHome === home.id ? "border-blue-500 bg-blue-50" : "border-gray-200"
          }`}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg text-blue-900">{home.name}</CardTitle>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-600">{home.rating}</span>
                  </div>
                </div>
                <Button 
                  onClick={() => handleCall(home.phone)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white"
                  size="sm"
                >
                  <Phone className="h-4 w-4 ml-1" />
                  اتصال مباشر
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{home.address}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="h-4 w-4" />
                <span>{home.phone}</span>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{home.hours}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{home.capacity}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                {home.services.map((service, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {service}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}