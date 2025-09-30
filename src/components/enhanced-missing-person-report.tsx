import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { 
  User, 
  Users, 
  Baby, 
  Calendar, 
  MapPin, 
  Phone, 
  Camera,
  AlertCircle,
  ArrowRight,
  Clock,
  Shield,
  Brain,
  CheckCircle,
  XCircle,
  RefreshCw,
  Sparkles,
  Lock,
  Crosshair,
  Navigation,
  Puzzle,
  Eye,
  RotateCcw,
  Target,
  Zap,
  Activity,
  TrendingUp,
  Star,
  Award,
  MapIcon,
  Satellite
} from "lucide-react";

interface EnhancedMissingPersonReportProps {
  onSubmit: (report: any) => void;
}

export function EnhancedMissingPersonReport({ onSubmit }: EnhancedMissingPersonReportProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [formData, setFormData] = useState({
    age: "",
    lastSeen: "",
    location: "",
    description: "",
    contactPhone: "",
    reporterName: "",
    coordinates: null as { lat: number, lng: number } | null,
    locationAccuracy: 0
  });

  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [verificationScore, setVerificationScore] = useState(0);
  
  // CAPTCHA States
  const [captchaType, setCaptchaType] = useState<"math" | "puzzle" | "sequence" | "pattern">("math");
  const [captchaData, setCaptchaData] = useState<any>({});
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [captchaAttempts, setCaptchaAttempts] = useState(0);
  const [captchaPassed, setCaptchaPassed] = useState(false);
  
  // AI Analysis States
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisStage, setAnalysisStage] = useState("");
  const [verificationResult, setVerificationResult] = useState<null | {
    status: "valid" | "suspicious" | "invalid",
    score: number,
    details: string[],
    recommendations: string[]
  }>(null);

  const categories = [
    {
      id: "young",
      label: "شاب",
      icon: User,
      color: "bg-blue-500 hover:bg-blue-600",
      description: "الإبلاغ عن شاب مفقود (16-30 سنة)"
    },
    {
      id: "child", 
      label: "طفل",
      icon: Baby,
      color: "bg-green-500 hover:bg-green-600",
      description: "الإبلاغ عن طفل مفقود (أقل من 16 سنة)"
    },
    {
      id: "elderly",
      label: "مسن",
      icon: Users,
      color: "bg-orange-500 hover:bg-orange-600",
      description: "الإبلاغ عن مسن مفقود (أكبر من 60 سنة)"
    }
  ];

  // Advanced CAPTCHA Generation
  const generateAdvancedCaptcha = () => {
    const types = ["math", "puzzle", "sequence", "pattern"];
    const randomType = types[Math.floor(Math.random() * types.length)];
    setCaptchaType(randomType as any);
    
    switch (randomType) {
      case "math":
        const operations = [
          { a: Math.floor(Math.random() * 20) + 1, b: Math.floor(Math.random() * 10) + 1, op: "+" },
          { a: Math.floor(Math.random() * 20) + 10, b: Math.floor(Math.random() * 10) + 1, op: "-" },
          { a: Math.floor(Math.random() * 10) + 1, b: Math.floor(Math.random() * 10) + 1, op: "×" }
        ];
        const mathOp = operations[Math.floor(Math.random() * operations.length)];
        let answer = 0;
        if (mathOp.op === "+") answer = mathOp.a + mathOp.b;
        else if (mathOp.op === "-") answer = mathOp.a - mathOp.b;
        else if (mathOp.op === "×") answer = mathOp.a * mathOp.b;
        
        setCaptchaData({
          question: `${mathOp.a} ${mathOp.op} ${mathOp.b} = ؟`,
          answer: answer.toString()
        });
        break;
        
      case "sequence":
        const sequences = [
          { seq: [2, 4, 6, 8, "؟"], answer: "10" },
          { seq: [5, 10, 15, 20, "؟"], answer: "25" },
          { seq: [1, 3, 5, 7, "؟"], answer: "9" },
          { seq: [10, 20, 30, 40, "؟"], answer: "50" }
        ];
        const randomSeq = sequences[Math.floor(Math.random() * sequences.length)];
        setCaptchaData({
          question: `أكمل التسلسل: ${randomSeq.seq.join(", ")}`,
          answer: randomSeq.answer
        });
        break;
        
      case "pattern":
        const patterns = [
          { pattern: "🔴🔵🔴🔵🔴؟", options: ["🔵", "🔴", "🟡"], answer: "🔵" },
          { pattern: "⭐⭐🌙⭐⭐🌙⭐⭐؟", options: ["🌙", "⭐", "🌟"], answer: "🌙" },
          { pattern: "🔺🔻🔺🔻🔺؟", options: ["🔻", "🔺", "🔶"], answer: "🔻" }
        ];
        const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];
        setCaptchaData({
          question: `اختر الرمز الصحيح: ${randomPattern.pattern}`,
          options: randomPattern.options,
          answer: randomPattern.answer
        });
        break;
        
      case "puzzle":
        const colors = ["أحمر", "أزرق", "أخضر", "أصفر"];
        const shapes = ["دائرة", "مربع", "مثلث"];
        const targetColor = colors[Math.floor(Math.random() * colors.length)];
        const targetShape = shapes[Math.floor(Math.random() * shapes.length)];
        setCaptchaData({
          question: `اختر ${targetColor} ${targetShape}`,
          target: `${targetColor}_${targetShape}`,
          options: [
            { color: targetColor, shape: targetShape, id: `${targetColor}_${targetShape}` },
            { color: colors[Math.floor(Math.random() * colors.length)], shape: shapes[Math.floor(Math.random() * shapes.length)], id: "wrong1" },
            { color: colors[Math.floor(Math.random() * colors.length)], shape: shapes[Math.floor(Math.random() * shapes.length)], id: "wrong2" },
            { color: colors[Math.floor(Math.random() * colors.length)], shape: shapes[Math.floor(Math.random() * shapes.length)], id: "wrong3" }
          ].sort(() => Math.random() - 0.5)
        });
        break;
    }
  };

  // Enhanced Location Detection
  const handleAdvancedLocationDetection = () => {
    setIsLocationLoading(true);
    
    // Check if geolocation is supported
    if (!navigator.geolocation) {
      console.error("Geolocation not supported");
      alert("متصفحك لا يدعم تحديد الموقع الجغرافي");
      setIsLocationLoading(false);
      return;
    }

    // Check if we're in a secure context (HTTPS or localhost)
    if (!window.isSecureContext && location.hostname !== 'localhost') {
      console.error("Geolocation requires secure context");
      alert("تحديد الموقع يتطلب اتصال آمن (HTTPS)");
      setIsLocationLoading(false);
      return;
    }

    // Options for high accuracy GPS
    const options = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        
        try {
          // Get address from coordinates using reverse geocoding simulation
          const address = await getAddressFromCoordinates(latitude, longitude);
          
          setFormData(prev => ({ 
            ...prev, 
            location: address,
            coordinates: { lat: latitude, lng: longitude },
            locationAccuracy: accuracy || 50
          }));
          
          alert(`تم تحديد موقعك بدقة ${Math.round(accuracy || 50)} متر`);
          
        } catch (addressError) {
          console.error("Address error:", addressError?.message || addressError);
          // Fallback to coordinates only
          setFormData(prev => ({ 
            ...prev, 
            location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
            coordinates: { lat: latitude, lng: longitude },
            locationAccuracy: accuracy || 50
          }));
          alert(`تم تحديد الموقع بنجاح (بإحداثيات GPS)`);
        }
        
        setIsLocationLoading(false);
      },
      (error) => {
        console.error("Location error:", error.message || error);
        setIsLocationLoading(false);
        
        let errorMessage = "حدث خطأ في تحديد الموقع";
        
        if (error && typeof error === 'object' && 'code' in error) {
          switch (error.code) {
            case 1: // PERMISSION_DENIED
              errorMessage = "يرجى السماح بالوصول للموقع من إعدادات المتصفح";
              break;
            case 2: // POSITION_UNAVAILABLE
              errorMessage = "لا يمكن تحديد الموقع. تأكد من تفعيل GPS أو اتصال الإنترنت";
              break;
            case 3: // TIMEOUT
              errorMessage = "انتهت مهلة تحديد الموقع. حاول مرة أخرى";
              break;
            default:
              errorMessage = `خطأ في تحديد الموقع: ${error.message || 'خطأ غير محدد'}`;
          }
        } else {
          errorMessage = `خطأ في تحديد الموقع: ${String(error)}`;
        }
        
        alert(errorMessage);
      },
      options
    );
  };

  // Simulate reverse geocoding
  const getAddressFromCoordinates = async (lat: number, lng: number): Promise<string> => {
    try {
      // Validate coordinates
      if (!lat || !lng || isNaN(lat) || isNaN(lng)) {
        throw new Error("Invalid coordinates");
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock address based on approximate Cairo coordinates
      const addresses = [
        "شارع التحرير، وسط البلد، القاهرة",
        "شارع الهرم، الجيزة، محافظة الجيزة", 
        "شارع النصر، مدينة نصر، القاهرة",
        "كورنيش النيل، الزمالك، القاهرة",
        "شارع فيصل، الهرم، الجيزة"
      ];
      
      const selectedAddress = addresses[Math.floor(Math.random() * addresses.length)];
      return `${lat.toFixed(6)}, ${lng.toFixed(6)} - ${selectedAddress}`;
    } catch (error) {
      console.error("Geocoding error:", error);
      // Fallback to coordinates only
      return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    }
  };

  // Advanced AI Analysis
  const performAdvancedAIAnalysis = async () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setCurrentStep(3);
    
    const analysisStages = [
      "فحص محتوى النص...",
      "تحليل المنطقية الزمنية...",
      "فحص الموقع الجغرافي...",
      "تقييم مصداقية البيانات...",
      "تحليل أنماط السلوك...",
      "إنشاء التقرير النهائي..."
    ];
    
    let score = 100;
    const details: string[] = [];
    const recommendations: string[] = [];
    
    for (let i = 0; i < analysisStages.length; i++) {
      setAnalysisStage(analysisStages[i]);
      setAnalysisProgress((i + 1) / analysisStages.length * 100);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Perform specific checks for each stage
      switch (i) {
        case 0: // Text content analysis
          const suspiciousWords = ['test', 'تجربة', 'اختبار', 'fake', 'false', 'joke'];
          const content = `${formData.description} ${formData.reporterName}`.toLowerCase();
          if (suspiciousWords.some(word => content.includes(word))) {
            score -= 30;
            details.push("❌ تم اكتشاف كلمات مشبوهة في النص");
            recommendations.push("تأكد من جدية البلاغ وتجنب الكلمات المشبوهة");
          } else {
            details.push("✅ النص يبدو صحيحاً");
          }
          break;
          
        case 1: // Time logic analysis
          if (formData.lastSeen && formData.lastSeen.length > 5) {
            details.push("✅ معلومات زمنية مفصلة");
          } else {
            score -= 15;
            details.push("⚠️ معلومات زمنية غير كافية");
            recommendations.push("أضف تفاصيل أكثر عن آخر مرة شوهد فيها المفقود");
          }
          break;
          
        case 2: // Location analysis
          if (formData.coordinates) {
            details.push(`✅ تم تحديد الموقع بدقة ${Math.round(formData.locationAccuracy)} متر`);
            if (formData.locationAccuracy > 100) {
              score -= 10;
              details.push("⚠️ دقة الموقع منخفضة");
            }
          } else {
            score -= 20;
            details.push("❌ لم يتم تحديد الموقع بشكل دقيق");
            recommendations.push("استخدم تحديد الموقع GPS للحصول على إحداثيات دقيقة");
          }
          break;
          
        case 3: // Data credibility
          const age = parseInt(formData.age);
          if (age < 1 || age > 120) {
            score -= 25;
            details.push("❌ العمر غير منطقي");
            recommendations.push("تأكد م�� صحة العمر المدخل");
          } else {
            details.push("✅ العمر منطقي");
          }
          
          if (formData.description.length < 20) {
            score -= 15;
            details.push("⚠️ الوصف قصير جداً");
            recommendations.push("أضف المزيد من التفاصيل في الوصف");
          } else {
            details.push("✅ الوصف مفصل ومفيد");
          }
          break;
          
        case 4: // Behavioral patterns
          if (!formData.reporterName || formData.reporterName.length < 3) {
            score -= 10;
            details.push("⚠️ اسم مقدم البلاغ غير واضح");
            recommendations.push("أدخل اسم واضح لمقدم البلاغ");
          } else {
            details.push("✅ معلومات مقدم البلاغ واضحة");
          }
          
          if (!formData.contactPhone || formData.contactPhone.length < 10) {
            score -= 20;
            details.push("❌ رقم الهاتف غير صحيح");
            recommendations.push("أدخل رقم هاتف صحيح للتواصل");
          } else {
            details.push("✅ رقم الهاتف صحيح");
          }
          break;
          
        case 5: // Final report
          // Additional checks based on category
          if (selectedCategory === "child" && age > 16) {
            score -= 15;
            details.push("⚠️ العمر لا يتطابق مع فئة الطفل");
            recommendations.push("تأكد من اختيار الفئة المناسبة للعمر");
          }
          break;
      }
    }
    
    // Determine final status
    let status: "valid" | "suspicious" | "invalid";
    if (score >= 80) {
      status = "valid";
    } else if (score >= 60) {
      status = "suspicious";
    } else {
      status = "invalid";
    }
    
    setVerificationResult({
      status,
      score,
      details,
      recommendations
    });
    
    setVerificationScore(score);
    setIsAnalyzing(false);
  };

  const handleCaptchaSubmit = (answer: string) => {
    const isCorrect = captchaType === "pattern" || captchaType === "puzzle" 
      ? answer === captchaData.answer || answer === captchaData.target
      : answer === captchaData.answer;

    if (isCorrect) {
      setCaptchaPassed(true);
      setCurrentStep(2); // Go to location step first
    } else {
      setCaptchaAttempts(prev => prev + 1);
      if (captchaAttempts >= 2) {
        alert("تم تجاوز عدد المحاولات المسموحة. يرجى المحاولة لاحقاً.");
        setShowVerification(false);
        return;
      }
      alert(`الإجابة غير صحيحة. المحاولة ${captchaAttempts + 1} من 3`);
      generateAdvancedCaptcha();
      setCaptchaAnswer("");
    }
  };

  const handleSubmit = () => {
    if (!selectedCategory) {
      alert("يرجى اختيار فئة المفقود");
      return;
    }

    if (!formData.age || !formData.contactPhone || !formData.description) {
      alert("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    setShowVerification(true);
    setCurrentStep(1);
    generateAdvancedCaptcha();
  };

  const handleFinalSubmit = () => {
    if (verificationResult?.status === "invalid") {
      alert("لا يمكن إرسال البلاغ. يرجى مراجعة التوصيات والمحاولة مرة أخرى.");
      return;
    }

    const report = {
      ...formData,
      category: selectedCategory,
      timestamp: new Date().toISOString(),
      id: Date.now(),
      verificationStatus: verificationResult?.status,
      verificationScore: verificationScore,
      analysisDetails: verificationResult?.details,
      captchaAttempts: captchaAttempts
    };

    onSubmit(report);
    
    // Reset form
    setShowVerification(false);
    setCaptchaPassed(false);
    setVerificationResult(null);
    setCurrentStep(1);
    setCaptchaAttempts(0);
    setVerificationScore(0);
    setFormData({
      age: "",
      lastSeen: "",
      location: "",
      description: "",
      contactPhone: "",
      reporterName: "",
      coordinates: null,
      locationAccuracy: 0
    });
    setSelectedCategory("");
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (showVerification) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
        {/* Advanced Header */}
        <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div className="text-center flex-1 mx-4">
              <h1 className="text-lg font-bold">نظام التحقق المتطور</h1>
              <p className="text-white/90 text-sm">حماية متعددة الطبقات</p>
            </div>
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Brain className="h-6 w-6 text-white" />
            </div>
          </div>
          
          {/* Progress Steps */}
          <div className="flex justify-center items-center gap-4">
            {[
              { step: 1, label: "CAPTCHA", icon: Lock },
              { step: 2, label: "موقع", icon: MapPin },
              { step: 3, label: "تحليل AI", icon: Brain }
            ].map(({ step, label, icon: Icon }) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  currentStep >= step 
                    ? "bg-white text-blue-600 border-white" 
                    : "border-white/50 text-white/50"
                }`}>
                  {currentStep > step ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <Icon className="h-4 w-4" />
                  )}
                </div>
                <span className="text-xs mr-1">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 space-y-6 -mt-4">

          {/* CAPTCHA Section */}
          {currentStep === 1 && !captchaPassed && (
            <Card className="bg-white shadow-xl border-2 border-purple-200">
              <CardHeader>
                <CardTitle className="text-purple-800 flex items-center gap-2">
                  <Puzzle className="h-5 w-5" />
                  تحدي الأمان - هل أنت إنسان؟
                </CardTitle>
                <div className="flex items-center gap-2 text-sm text-purple-600">
                  <Target className="h-4 w-4" />
                  <span>المحاولة {captchaAttempts + 1} من 3</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {captchaType === "math" && (
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl text-center">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Zap className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-bold text-blue-800 mb-3 text-xl">
                      {captchaData.question}
                    </h3>
                    <Input
                      type="number"
                      placeholder="أدخل الإجابة"
                      value={captchaAnswer}
                      onChange={(e) => setCaptchaAnswer(e.target.value)}
                      className="text-center text-lg font-bold max-w-32 mx-auto"
                      onKeyPress={(e) => e.key === 'Enter' && handleCaptchaSubmit(captchaAnswer)}
                    />
                  </div>
                )}

                {captchaType === "sequence" && (
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl text-center">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-bold text-green-800 mb-3 text-lg">
                      {captchaData.question}
                    </h3>
                    <Input
                      type="number"
                      placeholder="الرقم التالي"
                      value={captchaAnswer}
                      onChange={(e) => setCaptchaAnswer(e.target.value)}
                      className="text-center text-lg font-bold max-w-32 mx-auto"
                      onKeyPress={(e) => e.key === 'Enter' && handleCaptchaSubmit(captchaAnswer)}
                    />
                  </div>
                )}

                {captchaType === "pattern" && (
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl text-center">
                    <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Eye className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-bold text-yellow-800 mb-4 text-lg">
                      {captchaData.question}
                    </h3>
                    <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
                      {captchaData.options?.map((option: string, index: number) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="h-12 text-2xl"
                          onClick={() => handleCaptchaSubmit(option)}
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {captchaType === "puzzle" && (
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl text-center">
                    <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-bold text-purple-800 mb-4 text-lg">
                      {captchaData.question}
                    </h3>
                    <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
                      {captchaData.options?.map((option: any, index: number) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="h-16 flex flex-col gap-1"
                          onClick={() => handleCaptchaSubmit(option.id)}
                        >
                          <div className={`w-6 h-6 rounded ${
                            option.color === "أحمر" ? "bg-red-500" :
                            option.color === "أزرق" ? "bg-blue-500" :
                            option.color === "أخضر" ? "bg-green-500" :
                            "bg-yellow-500"
                          } ${
                            option.shape === "مربع" ? "rounded-none" :
                            option.shape === "مثلث" ? "clip-path-triangle" : ""
                          }`}></div>
                          <span className="text-xs">{option.color} {option.shape}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {(captchaType === "math" || captchaType === "sequence") && (
                  <div className="flex gap-3">
                    <Button 
                      onClick={() => handleCaptchaSubmit(captchaAnswer)}
                      className="flex-1 bg-purple-500 hover:bg-purple-600"
                    >
                      <CheckCircle className="h-4 w-4 ml-2" />
                      تأكيد
                    </Button>
                    <Button 
                      onClick={generateAdvancedCaptcha}
                      variant="outline"
                      className="px-4"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Location Verification */}
          {currentStep >= 2 && (
            <Card className="bg-white shadow-xl border-2 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center gap-2">
                  <Satellite className="h-5 w-5" />
                  التحقق من الموقع الجغرافي
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.coordinates ? (
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-green-800">تم تحديد الموقع بنجاح</h4>
                        <p className="text-green-600 text-sm">دقة: {Math.round(formData.locationAccuracy)} متر</p>
                      </div>
                    </div>
                    
                    <div className="bg-white p-3 rounded border border-green-200">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-600">خط العرض:</span>
                          <span className="font-mono mr-2">{formData.coordinates.lat.toFixed(6)}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">خط الطول:</span>
                          <span className="font-mono mr-2">{formData.coordinates.lng.toFixed(6)}</span>
                        </div>
                      </div>
                      <div className="mt-2">
                        <span className="text-gray-600">العنوان:</span>
                        <p className="text-sm mt-1">{formData.location}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <Button 
                      onClick={handleAdvancedLocationDetection}
                      disabled={isLocationLoading}
                      className="bg-green-500 hover:bg-green-600"
                    >
                      {isLocationLoading ? (
                        <>
                          <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full ml-2"></div>
                          جاري تحديد الموقع...
                        </>
                      ) : (
                        <>
                          <Crosshair className="h-4 w-4 ml-2" />
                          تحديد موقعي الحالي
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* AI Analysis */}
          {currentStep >= 3 && (
            <Card className="bg-white shadow-xl border-2 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800 flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  تحليل متطور بالذكاء الاصطناعي
                </CardTitle>
                {verificationScore > 0 && (
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">درجة المصداقية: {verificationScore}/100</span>
                  </div>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                
                {isAnalyzing && (
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <h4 className="font-medium text-blue-800 mb-2">{analysisStage}</h4>
                      <Progress value={analysisProgress} className="w-full" />
                      <p className="text-blue-600 text-sm mt-2">
                        {Math.round(analysisProgress)}% مكتمل
                      </p>
                    </div>
                  </div>
                )}

                {verificationResult && !isAnalyzing && (
                  <div className="space-y-4">
                    {/* Score Display */}
                    <div className="text-center">
                      <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-lg font-bold ${
                        verificationResult.status === "valid" 
                          ? "bg-green-100 text-green-800 border-2 border-green-300"
                          : verificationResult.status === "suspicious"
                          ? "bg-yellow-100 text-yellow-800 border-2 border-yellow-300"
                          : "bg-red-100 text-red-800 border-2 border-red-300"
                      }`}>
                        {verificationResult.status === "valid" && (
                          <>
                            <CheckCircle className="h-6 w-6" />
                            بلاغ موثوق ({verificationResult.score}/100)
                          </>
                        )}
                        {verificationResult.status === "suspicious" && (
                          <>
                            <AlertCircle className="h-6 w-6" />
                            يحتاج مراجعة ({verificationResult.score}/100)
                          </>
                        )}
                        {verificationResult.status === "invalid" && (
                          <>
                            <XCircle className="h-6 w-6" />
                            بلاغ مشبوه ({verificationResult.score}/100)
                          </>
                        )}
                      </div>
                    </div>

                    {/* Detailed Analysis */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-800 flex items-center gap-2">
                        <Brain className="h-4 w-4" />
                        تفاصيل التحليل:
                      </h4>
                      <div className="space-y-2">
                        {verificationResult.details.map((detail, index) => (
                          <div key={index} className="flex items-start gap-2 p-2 bg-gray-50 rounded text-sm">
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recommendations */}
                    {verificationResult.recommendations.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-800 flex items-center gap-2">
                          <Sparkles className="h-4 w-4" />
                          توصيات للتحسين:
                        </h4>
                        <div className="space-y-2">
                          {verificationResult.recommendations.map((rec, index) => (
                            <div key={index} className="flex items-start gap-2 p-2 bg-blue-50 rounded text-sm border-r-2 border-blue-400">
                              <span>{rec}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="space-y-3 pt-4">
                      {verificationResult.status === "valid" && (
                        <Button 
                          onClick={handleFinalSubmit}
                          className="w-full bg-green-500 hover:bg-green-600 text-white h-12 text-lg"
                        >
                          <CheckCircle className="h-5 w-5 ml-2" />
                          إرسال البلاغ الموثوق
                        </Button>
                      )}
                      
                      {verificationResult.status === "suspicious" && (
                        <div className="space-y-2">
                          <Button 
                            onClick={handleFinalSubmit}
                            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white h-12"
                          >
                            <AlertCircle className="h-5 w-5 ml-2" />
                            إرسال للمراجعة اليدوية
                          </Button>
                          <p className="text-center text-sm text-yellow-700">
                            سيتم مراجعة البلاغ من قبل فريق متخصص
                          </p>
                        </div>
                      )}
                      
                      {verificationResult.status === "invalid" && (
                        <div className="space-y-2">
                          <Button 
                            onClick={() => {
                              setShowVerification(false);
                              setCurrentStep(1);
                              setCaptchaPassed(false);
                              setVerificationResult(null);
                            }}
                            variant="outline"
                            className="w-full border-red-300 text-red-700 h-12"
                          >
                            <RotateCcw className="h-5 w-5 ml-2" />
                            تحسين البلاغ وإعادة المحاولة
                          </Button>
                          <p className="text-center text-sm text-red-700">
                            يرجى اتباع التوصيات وإعادة تقديم البلاغ
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Back Button */}
          <Button 
            onClick={() => {
              setShowVerification(false);
              setCurrentStep(1);
              setCaptchaPassed(false);
              setVerificationResult(null);
              setCaptchaAttempts(0);
            }}
            variant="outline"
            className="w-full"
          >
            <ArrowRight className="h-4 w-4 ml-2" />
            العودة للتعديل
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white p-6 text-center">
        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold mb-2">ساعدنا في العثور عليهم</h1>
        <p className="text-white/90 text-sm mb-4">
          نظام متطور للبلاغات محمي بالذكاء الاصطناعي
        </p>
        <div className="flex items-center justify-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Shield className="h-4 w-4" />
            <span>آمان متقدم</span>
          </div>
          <div className="flex items-center gap-1">
            <Brain className="h-4 w-4" />
            <span>تحليل ذكي</span>
          </div>
          <div className="flex items-center gap-1">
            <MapIcon className="h-4 w-4" />
            <span>موقع دقيق</span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6 -mt-8">
        
        {/* Category Selection */}
        <Card className="bg-white shadow-xl border border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900 text-center">اختر الفئة المناسبة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-6 rounded-xl transition-all duration-300 transform hover:scale-105 border-2 ${
                    selectedCategory === category.id 
                      ? `${category.color} border-white shadow-xl text-white` 
                      : "bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                      selectedCategory === category.id 
                        ? "bg-white/20" 
                        : "bg-gray-300"
                    }`}>
                      <category.icon className={`h-8 w-8 ${
                        selectedCategory === category.id 
                          ? "text-white" 
                          : "text-gray-600"
                      }`} />
                    </div>
                    <div className="text-right flex-1">
                      <h3 className={`font-bold text-lg ${
                        selectedCategory === category.id ? "text-white" : "text-gray-800"
                      }`}>
                        {category.label}
                      </h3>
                      <p className={`text-sm ${
                        selectedCategory === category.id ? "text-white/90" : "text-gray-600"
                      }`}>
                        {category.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Personal Information Form */}
        {selectedCategory && (
          <Card className="bg-white shadow-xl border border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900 flex items-center gap-2">
                <User className="h-5 w-5" />
                معلومات مفصلة ودقيقة
              </CardTitle>
              <p className="text-blue-600 text-sm">كلما زادت التفاصيل، زادت فرص العثور على المفقود</p>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Age with validation */}
              <div className="space-y-2">
                <Label htmlFor="age" className="text-blue-800 font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  العمر التقريبي *
                </Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="العمر بالسنوات"
                  value={formData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                  className="border-2 border-blue-200 focus:border-blue-400 h-12"
                  min="0"
                  max="120"
                />
                {formData.age && (parseInt(formData.age) < 1 || parseInt(formData.age) > 120) && (
                  <p className="text-red-600 text-sm">يرجى إدخال عمر منطقي (1-120 سنة)</p>
                )}
              </div>

              {/* Enhanced Time Input */}
              <div className="space-y-2">
                <Label htmlFor="lastSeen" className="text-blue-800 font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  آخر مرة شوهد فيها *
                </Label>
                <Textarea
                  id="lastSeen"
                  placeholder="مثال: صباح اليوم الساعة 9 صباحاً عند المدرسة، أو أمس مساء أمام المسجد..."
                  value={formData.lastSeen}
                  onChange={(e) => handleInputChange("lastSeen", e.target.value)}
                  className="border-2 border-blue-200 focus:border-blue-400 min-h-[60px]"
                />
              </div>

              {/* Advanced Location Input */}
              <div className="space-y-2">
                <Label htmlFor="location" className="text-blue-800 font-medium flex items-center gap-2">
                  <Navigation className="h-4 w-4" />
                  الموقع الجغرافي *
                </Label>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Input
                      id="location"
                      placeholder="اكتب العنوان أو استخدم GPS للدقة"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      className="border-2 border-blue-200 focus:border-blue-400 flex-1 h-12"
                    />
                    <Button
                      type="button"
                      onClick={handleAdvancedLocationDetection}
                      disabled={isLocationLoading}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6"
                    >
                      {isLocationLoading ? (
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                      ) : (
                        <Satellite className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  
                  {formData.coordinates && (
                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                      <div className="flex items-center gap-2 text-green-800 text-sm">
                        <CheckCircle className="h-4 w-4" />
                        <span>تم تحديد الموقع بدقة {Math.round(formData.locationAccuracy)} متر</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Enhanced Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-blue-800 font-medium flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  وصف شامل ومفصل *
                </Label>
                <Textarea
                  id="description"
                  placeholder="اكتب وصفاً مفصلاً: الشكل، الطول، الوزن، لون البشرة، الشعر، الملابس، العلامات المميزة، السلوك، الحالة النفسية، أي معلومات أخرى مفيدة..."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className="border-2 border-blue-200 focus:border-blue-400 min-h-[120px]"
                />
                <div className="flex justify-between text-sm">
                  <span className={`${formData.description.length >= 20 ? "text-green-600" : "text-red-600"}`}>
                    {formData.description.length} حرف (الحد الأدنى: 20)
                  </span>
                  <span className="text-gray-500">
                    نصيحة: التفاصيل تزيد فرص العثور عليه
                  </span>
                </div>
              </div>

              {/* Reporter Information */}
              <div className="space-y-4">
                <h4 className="font-medium text-blue-800 border-b border-blue-200 pb-2">
                  معلومات مقدم البلاغ
                </h4>
                
                <div className="space-y-2">
                  <Label htmlFor="reporterName" className="text-blue-800 font-medium">
                    الاسم الكامل *
                  </Label>
                  <Input
                    id="reporterName"
                    placeholder="اسمك الثلاثي أو الرباعي"
                    value={formData.reporterName}
                    onChange={(e) => handleInputChange("reporterName", e.target.value)}
                    className="border-2 border-blue-200 focus:border-blue-400 h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactPhone" className="text-blue-800 font-medium flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    رقم الهاتف للتواصل *
                  </Label>
                  <Input
                    id="contactPhone"
                    type="tel"
                    placeholder="01xxxxxxxxx"
                    value={formData.contactPhone}
                    onChange={(e) => handleInputChange("contactPhone", e.target.value)}
                    className="border-2 border-blue-200 focus:border-blue-400 h-12"
                  />
                  {formData.contactPhone && formData.contactPhone.length < 10 && (
                    <p className="text-red-600 text-sm">يرجى إدخال رقم هاتف صحيح (10 أرقام على الأقل)</p>
                  )}
                </div>
              </div>

              {/* Photo Upload */}
              <div className="space-y-2">
                <Label className="text-blue-800 font-medium flex items-center gap-2">
                  <Camera className="h-4 w-4" />
                  إضافة صورة (مهم جداً)
                </Label>
                <Button 
                  variant="outline" 
                  className="w-full h-24 border-2 border-dashed border-blue-300 hover:border-blue-500 bg-blue-50"
                >
                  <div className="flex flex-col items-center gap-2">
                    <Camera className="h-8 w-8 text-blue-500" />
                    <span className="text-blue-700 font-medium">اضغط لإضافة صورة واضحة</span>
                    <span className="text-blue-600 text-sm">الصورة تزيد فرص النجاح بنسبة 80%</span>
                  </div>
                </Button>
              </div>

            </CardContent>
          </Card>
        )}

        {/* Enhanced Submit Button */}
        {selectedCategory && (
          <div className="space-y-4">
            <Button 
              onClick={handleSubmit}
              className="w-full h-16 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white text-lg font-bold rounded-xl shadow-xl"
            >
              <div className="flex items-center justify-center gap-3">
                <Shield className="h-6 w-6" />
                <span>بدء التحقق المتطور وإرسال البلاغ</span>
                <ArrowRight className="h-6 w-6" />
              </div>
            </Button>
            
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-200">
              <h4 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
                <Award className="h-4 w-4" />
                ما يميز نظامنا المتطور:
              </h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-600" />
                  <span className="text-gray-700">CAPTCHA إبداعي</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-600" />
                  <span className="text-gray-700">GPS دقيق</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-600" />
                  <span className="text-gray-700">تحليل AI متقدم</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-600" />
                  <span className="text-gray-700">حماية متعددة</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom spacing */}
        <div className="h-20"></div>

      </div>
    </div>
  );
}