import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Heart, DollarSign, Gift, Clock } from "lucide-react";

export function DonationSection() {
  const [selectedDonationType, setSelectedDonationType] = useState("");
  const [donationAmount, setDonationAmount] = useState("");

  const donationTypes = [
    {
      id: "money",
      title: "تبرع مالي",
      description: "ساهم بالمال لدعم دور الرعاية",
      icon: DollarSign,
      color: "bg-green-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-500"
    },
    {
      id: "items",
      title: "تبرع عيني", 
      description: "تبرع بالملابس والطعام والأدوية",
      icon: Gift,
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-500"
    },
    {
      id: "volunteer",
      title: "تطوع",
      description: "ساهم بوقتك ومهاراتك",
      icon: Clock,
      color: "bg-purple-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-500"
    }
  ];

  const quickAmounts = ["20", "50", "100", "250"];

  const handleDonationSelect = (type: string) => {
    setSelectedDonationType(type);
  };

  const handleDonate = () => {
    // Handle donation logic here
    const typeText = selectedDonationType === "money" ? "التبرع المالي" : 
                     selectedDonationType === "items" ? "التبرع العيني" : "التطوع";
    const amountText = selectedDonationType === "money" && donationAmount ? 
                       `بمبلغ ${donationAmount} جنيه مصري` : "";
    alert(`تم اختيار ${typeText} ${amountText}. شكراً لك على كرمك!`);
  };

  return (
    <div className="p-4 space-y-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Heart className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-2xl text-blue-900 mb-2">التبرع والمساهمة</h2>
        <p className="text-blue-700">كل مساهمة تصنع فرقًا في حياة الآخرين</p>
      </div>

      {/* Donation Types */}
      <div className="space-y-4">
        {donationTypes.map((type) => (
          <Card 
            key={type.id}
            className={`cursor-pointer transition-all border-2 ${
              selectedDonationType === type.id 
                ? `${type.borderColor} ${type.bgColor}` 
                : "border-gray-200 bg-white"
            }`}
            onClick={() => handleDonationSelect(type.id)}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 ${type.color} rounded-full flex items-center justify-center`}>
                  <type.icon className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-blue-900">{type.title}</h3>
                  <p className="text-blue-700 text-sm">{type.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Donation Amount (for money donations) */}
      {selectedDonationType === "money" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-blue-900">اختر مبلغ التبرع</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {quickAmounts.map((amount) => (
                <Button
                  key={amount}
                  variant={donationAmount === amount ? "default" : "outline"}
                  onClick={() => setDonationAmount(amount)}
                  className="h-12"
                >
                  {amount} جنيه
                </Button>
              ))}
            </div>
            
            <div>
              <div className="relative">
                <Input
                  placeholder="أدخل مبلغ آخر"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  type="number"
                  className="pl-12"
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">ج.م</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Item Donation Details */}
      {selectedDonationType === "items" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-blue-900">الأصناف المطلوبة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">👕</div>
                <p className="text-sm text-blue-800">ملابس</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">🍞</div>
                <p className="text-sm text-green-800">طعام</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">💊</div>
                <p className="text-sm text-red-800">أدوية</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">📚</div>
                <p className="text-sm text-purple-800">كتب وأدوات</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Volunteer Details */}
      {selectedDonationType === "volunteer" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-blue-900">فرص التطوع</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">👨‍⚕️</span>
                </div>
                <div>
                  <p className="font-medium text-purple-900">مساعدة طبية</p>
                  <p className="text-purple-700 text-sm">دعم طبي وتمريضي</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">👨‍🏫</span>
                </div>
                <div>
                  <p className="font-medium text-blue-900">تعليم ودعم</p>
                  <p className="text-blue-700 text-sm">تعليم القراءة والكتابة</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">🍽️</span>
                </div>
                <div>
                  <p className="font-medium text-green-900">خدمة الطعام</p>
                  <p className="text-green-700 text-sm">إعداد وتوزيع الوجبات</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Button */}
      {selectedDonationType && (
        <Button 
          onClick={handleDonate}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 text-lg"
        >
          {selectedDonationType === "money" && "تبرع الآن"}
          {selectedDonationType === "items" && "تحديد موعد التسليم"}
          {selectedDonationType === "volunteer" && "سجل كمتطوع"}
        </Button>
      )}
    </div>
  );
}