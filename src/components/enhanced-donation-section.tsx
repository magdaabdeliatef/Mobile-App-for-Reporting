import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  Heart, 
  Banknote, 
  Gift, 
  Users, 
  ArrowRight,
  CheckCircle,
  Star,
  Truck,
  CreditCard,
  Phone,
  MapPin,
  Building,
  ShieldCheck,
  Target,
  Clock,
  DollarSign
} from "lucide-react";

interface EnhancedDonationSectionProps {
  onDonationSuccess?: (donationType: string, amount?: number, careHomeName?: string) => void;
}

export function EnhancedDonationSection({ onDonationSuccess }: EnhancedDonationSectionProps) {
  const [selectedDonationType, setSelectedDonationType] = useState<string>("");
  const [selectedAmount, setSelectedAmount] = useState<number>(0);
  const [selectedCareHome, setSelectedCareHome] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [donationPurpose, setDonationPurpose] = useState<string>("");
  const [showDonationForm, setShowDonationForm] = useState(false);
  
  const [donorInfo, setDonorInfo] = useState({
    name: "",
    phone: "",
    email: "",
    address: ""
  });

  const careHomes = [
    {
      id: "care1",
      name: "دار الرعاية الأمان",
      location: "المعادي، القاهرة",
      children: 45,
      needs: "عالية",
      rating: 4.8
    },
    {
      id: "care2", 
      name: "دار الأمل للأطفال",
      location: "الإسكندرية",
      children: 32,
      needs: "متوسطة",
      rating: 4.6
    },
    {
      id: "care3",
      name: "دار الرحمة",
      location: "الجيزة",
      children: 38,
      needs: "عالية",
      rating: 4.9
    }
  ];

  const donationTypes = [
    {
      id: "financial",
      title: "تبرع مالي",
      description: "ادعم بالمساعدة المالية لدعم العمليات والبرامج",
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25leSUyMGRvbmF0aW9ufGVufDF8fHx8MTc1ODQ5NzI5Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      icon: Banknote,
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      id: "inkind",
      title: "تبرع عيني",
      description: "تبرع بالطعام والملابس والمواد الضرورية",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwZG9uYXRpb258ZW58MXx8fHwxNzU4NDk3MzEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      icon: Gift,
      color: "from-orange-500 to-red-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200"
    },
    {
      id: "volunteer",
      title: "تبرع بالوقت",
      description: "ساهم بوقتك وخبرتك كمتطوع",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2x1bnRlZXJ8ZW58MXx8fHwxNzU4NDk3MzI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      icon: Users,
      color: "from-blue-500 to-purple-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    }
  ];

  const donationAmounts = [50, 100, 250, 500, 1000, 2000];

  const paymentMethods = [
    { id: "card", name: "بطاقة ائتمان/خصم", icon: CreditCard },
    { id: "vodafone", name: "فودافون كاش", icon: Phone },
    { id: "bank", name: "تحويل بنكي", icon: Building }
  ];

  const donationPurposes = [
    { id: "general", name: "تبرع عام" },
    { id: "food", name: "طعام وتغذية" },
    { id: "clothes", name: "ملابس وأحذية" },
    { id: "education", name: "تعليم ومواد دراسية" },
    { id: "healthcare", name: "رعاية صحية" },
    { id: "activities", name: "أنشطة ترفيهية" }
  ];

  const handleDonationTypeSelect = (type: string) => {
    setSelectedDonationType(type);
    if (type !== "financial") {
      setSelectedAmount(0);
    }
  };

  const handleContinueToDonation = () => {
    if (!selectedDonationType) {
      alert("يرجى اختيار نوع التبرع");
      return;
    }
    if (!selectedCareHome) {
      alert("يرجى اختيار دار الرعاية");
      return;
    }
    if (selectedDonationType === "financial" && !selectedAmount) {
      alert("يرجى اختيار مبلغ التبرع");
      return;
    }
    
    setShowDonationForm(true);
  };

  const handleSubmitDonation = () => {
    if (selectedDonationType === "financial" && !paymentMethod) {
      alert("يرجى اختيار وسيلة الدفع");
      return;
    }
    if (!donationPurpose) {
      alert("يرجى اختيار الغرض من التبرع");
      return;
    }

    const selectedCare = careHomes.find(h => h.id === selectedCareHome);
    
    // Process donation
    alert(`
      تم تسجيل التبرع بنجاح! 🎉
      
      النوع: ${selectedDonationType === "financial" ? "مالي" : selectedDonationType === "inkind" ? "عيني" : "تطوع"}
      ${selectedDonationType === "financial" ? `المبلغ: ${selectedAmount} ج.م` : ""}
      دار الرعاية: ${selectedCare?.name}
      الغرض: ${donationPurposes.find(p => p.id === donationPurpose)?.name}
      
      شكراً لك على دعمك! ❤️
    `);

    // Trigger notification callback
    if (onDonationSuccess) {
      onDonationSuccess(
        selectedDonationType,
        selectedDonationType === "financial" ? selectedAmount : undefined,
        selectedCare?.name
      );
    }

    // Reset form
    setShowDonationForm(false);
    setSelectedDonationType("");
    setSelectedAmount(0);
    setSelectedCareHome("");
    setPaymentMethod("");
    setDonationPurpose("");
    setDonorInfo({ name: "", phone: "", email: "", address: "" });
  };

  if (showDonationForm) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowDonationForm(false)}
              className="text-white hover:bg-white/20"
            >
              ← العودة
            </Button>
            <div>
              <h1 className="text-xl font-bold">إتمام التبرع</h1>
              <p className="text-green-100 text-sm">املأ البيانات لإتمام عملية التبرع</p>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Donation Summary */}
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                ملخص التبرع
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">نوع التبرع:</span>
                  <Badge className="bg-green-500 text-white">
                    {selectedDonationType === "financial" ? "مالي" : 
                     selectedDonationType === "inkind" ? "عيني" : "تطوع"}
                  </Badge>
                </div>
                
                {selectedDonationType === "financial" && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">المبلغ:</span>
                    <span className="font-bold text-green-600">{selectedAmount} ج.م</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-gray-600">دار الرعاية:</span>
                  <span className="font-medium text-blue-600">
                    {careHomes.find(h => h.id === selectedCareHome)?.name}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Donation Purpose */}
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-800 flex items-center gap-2">
                <Target className="h-5 w-5" />
                الغرض من التبرع
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={donationPurpose} onValueChange={setDonationPurpose}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="اختر الغرض من التبرع" />
                </SelectTrigger>
                <SelectContent>
                  {donationPurposes.map(purpose => (
                    <SelectItem key={purpose.id} value={purpose.id}>
                      {purpose.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Payment Method - Financial Only */}
          {selectedDonationType === "financial" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-800 flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  وسيلة الدفع
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {paymentMethods.map(method => (
                    <Button
                      key={method.id}
                      variant={paymentMethod === method.id ? "default" : "outline"}
                      className={`h-14 justify-start ${
                        paymentMethod === method.id 
                          ? "bg-blue-500 text-white" 
                          : "border-2 hover:border-blue-400"
                      }`}
                      onClick={() => setPaymentMethod(method.id)}
                    >
                      <method.icon className="h-5 w-5 ml-3" />
                      {method.name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Donor Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-800 flex items-center gap-2">
                <Users className="h-5 w-5" />
                معلومات المتبرع (اختياري)
              </CardTitle>
              <p className="text-sm text-gray-600">
                هذه المعلومات اختيارية ولكنها تساعدنا في التواصل معك
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">الاسم الكامل</Label>
                <Input
                  id="name"
                  placeholder="اسمك الكامل"
                  value={donorInfo.name}
                  onChange={(e) => setDonorInfo(prev => ({...prev, name: e.target.value}))}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">رقم الهاتف</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="01xxxxxxxxx"
                  value={donorInfo.phone}
                  onChange={(e) => setDonorInfo(prev => ({...prev, phone: e.target.value}))}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={donorInfo.email}
                  onChange={(e) => setDonorInfo(prev => ({...prev, email: e.target.value}))}
                  className="h-12"
                />
              </div>

              {selectedDonationType === "inkind" && (
                <div className="space-y-2">
                  <Label htmlFor="address">العنوان (للتبرع العيني)</Label>
                  <Textarea
                    id="address"
                    placeholder="عنوانك لاستلام التبرع العيني"
                    value={donorInfo.address}
                    onChange={(e) => setDonorInfo(prev => ({...prev, address: e.target.value}))}
                    className="min-h-[80px]"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Button
            onClick={handleSubmitDonation}
            className="w-full h-14 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white text-lg font-bold"
          >
            <Heart className="h-5 w-5 ml-2" />
            إتمام التبرع
          </Button>

          {/* Security Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-800 mb-1">الأمان والشفافية</h4>
                <p className="text-blue-700 text-sm">
                  جميع التبرعات آمنة ومشفرة. سيتم إرسال تأكيد بالتبرع وتقرير عن كيفية استخدامه.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 text-center">
        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
          <Heart className="h-8 w-8 text-white" fill="currentColor" />
        </div>
        <h1 className="text-2xl font-bold mb-2">كن جزءاً من التغيير</h1>
        <p className="text-white/90 text-sm">
          اختر طريقتك المفضلة للمساعدة وادعم من يحتاج الرعاية
        </p>
      </div>

      <div className="p-4 space-y-6 -mt-8">

        {/* Donation Types */}
        <div className="grid gap-4">
          {donationTypes.map((type) => (
            <Card 
              key={type.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${ 
                selectedDonationType === type.id 
                  ? `ring-2 ring-blue-400 ${type.bgColor} ${type.borderColor}` 
                  : "bg-white border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => handleDonationTypeSelect(type.id)}
            >
              <div className="relative overflow-hidden">
                <div className="aspect-[16/9] relative">
                  <ImageWithFallback 
                    src={type.image}
                    alt={type.title}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${type.color} opacity-80`}></div>
                  
                  {/* Selection Indicator */}
                  {selectedDonationType === type.id && (
                    <div className="absolute top-4 right-4">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                    </div>
                  )}
                  
                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <type.icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-xl font-bold">{type.title}</h3>
                    </div>
                    <p className="text-white/90 text-sm">{type.description}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Financial Donation Amounts */}
        {selectedDonationType === "financial" && (
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                اختر مبلغ التبرع (جنيه مصري)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {donationAmounts.map((amount) => (
                  <Button
                    key={amount}
                    variant={selectedAmount === amount ? "default" : "outline"}
                    onClick={() => setSelectedAmount(amount)}
                    className={`h-16 text-lg font-medium ${
                      selectedAmount === amount 
                        ? "bg-green-500 hover:bg-green-600 text-white" 
                        : "border-2 border-green-200 hover:border-green-400 text-green-700"
                    }`}
                  >
                    {amount} ج.م
                  </Button>
                ))}
              </div>
              
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full h-12 border-2 border-dashed border-green-300 hover:border-green-400 text-green-700"
                  onClick={() => {
                    const custom = prompt("أدخل المبلغ المرغوب:");
                    if (custom && !isNaN(Number(custom)) && Number(custom) > 0) {
                      setSelectedAmount(Number(custom));
                    }
                  }}
                >
                  مبلغ آخر
                </Button>

                {selectedAmount > 0 && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-green-800 font-medium">المبلغ المحدد:</span>
                      <Badge className="bg-green-500 text-white text-lg px-3 py-1">
                        {selectedAmount} ج.م
                      </Badge>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Care Home Selection */}
        {selectedDonationType && (
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-blue-800 flex items-center gap-2">
                <Building className="h-5 w-5" />
                اختر دار الرعاية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {careHomes.map((home) => (
                  <div
                    key={home.id}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      selectedCareHome === home.id
                        ? "border-blue-400 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                    onClick={() => setSelectedCareHome(home.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium text-blue-900">{home.name}</h3>
                          {selectedCareHome === home.id && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                        
                        <div className="flex items-center gap-1 text-gray-600 text-sm mb-1">
                          <MapPin className="h-3 w-3" />
                          <span>{home.location}</span>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3 text-blue-600" />
                            <span>{home.children} طفل</span>
                          </div>
                          
                          <Badge 
                            variant={home.needs === "عالية" ? "destructive" : "secondary"}
                            className="text-xs"
                          >
                            احتياج {home.needs}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="text-left">
                        <div className="flex items-center gap-1 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-3 w-3 ${
                                i < Math.floor(home.rating) 
                                  ? "text-yellow-400 fill-current" 
                                  : "text-gray-300"
                              }`} 
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">{home.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* In-Kind Donation Details */}
        {selectedDonationType === "inkind" && (
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-orange-800 flex items-center gap-2">
                <Gift className="h-5 w-5" />
                أنواع التبرعات العينية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                
                {/* Categories */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
                    <Gift className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                    <h4 className="font-medium text-orange-800 mb-1">طعام وشراب</h4>
                    <p className="text-orange-600 text-sm">وجبات، معلبات، مياه</p>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                    <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                    <h4 className="font-medium text-blue-800 mb-1">ملابس</h4>
                    <p className="text-blue-600 text-sm">ملابس نظيفة، أحذية</p>
                  </div>
                </div>

                {/* Pickup Info */}
                <div className="bg-blue-50 border-r-4 border-blue-400 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Truck className="h-5 w-5 text-blue-500 mt-1" />
                    <div>
                      <h4 className="font-medium text-blue-800 mb-1">خدمة الاستلام</h4>
                      <p className="text-blue-700 text-sm">
                        سيتم التواصل معك لترتيب موعد استلام التبرعات من منزلك
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Volunteer Information */}
        {selectedDonationType === "volunteer" && (
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-blue-800 flex items-center gap-2">
                <Clock className="h-5 w-5" />
                فرص التطوع المتاحة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 mb-2">الأنشطة التطوعية</h4>
                  <ul className="space-y-1 text-blue-700 text-sm">
                    <li>• تدريس ومساعدة في الواجبات المدرسية</li>
                    <li>• تنظيم أنشطة ترفيهية وثقافية</li>
                    <li>• المساعدة في الأعمال الإدارية</li>
                    <li>• تقديم الاستشارات النفسية والاجتماعية</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-medium text-green-800 mb-2">المتطلبات</h4>
                  <ul className="space-y-1 text-green-700 text-sm">
                    <li>• عمر 18 سنة فأكثر</li>
                    <li>• التزام بساعات التطوع المحددة</li>
                    <li>• اجتياز فترة تدريبية مبسطة</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Impact Statistics */}
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardContent className="p-6">
            <div className="text-center mb-4">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-purple-800 font-medium mb-2">أثر التبرعات</h3>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-purple-600">1,245</div>
                <div className="text-sm text-purple-800">عائلة استفادت</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">89%</div>
                <div className="text-sm text-blue-800">معدل الوصول</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">24/7</div>
                <div className="text-sm text-green-800">خدمة مستمرة</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Continue Button */}
        {selectedDonationType && selectedCareHome && (
          (selectedDonationType !== "financial" || selectedAmount > 0) && (
            <Button 
              onClick={handleContinueToDonation}
              className="w-full h-14 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white text-lg font-bold rounded-lg shadow-lg"
            >
              متابعة إتمام التبرع
              <ArrowRight className="h-5 w-5 mr-2" />
            </Button>
          )
        )}

        {/* Bottom Note */}
        <div className="text-center text-sm text-gray-600 bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-center gap-2 mb-2">
            <ShieldCheck className="h-4 w-4 text-green-600" />
            <span className="font-medium">الشفافية والأمان مضمونان</span>
          </div>
          <p>جميع التبرعات تخضع للمراجعة والشفافية الكاملة</p>
          <p>شكراً لكم على دعمكم المستمر لمجتمعنا</p>
        </div>

      </div>
    </div>
  );
}