import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  MapPin, 
  Phone, 
  Clock, 
  Users, 
  Star, 
  Heart, 
  Shield, 
  Navigation,
  Award,
  Sparkles,
  Home
} from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function CreativeCareHomes() {
  const [selectedHome, setSelectedHome] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const careHomes = [
    {
      id: "1",
      name: "دار الرعاية الأولى",
      address: "حي الملك فهد، الرياض",
      phone: "011-123-4567",
      hours: "24 ساعة",
      capacity: "50 شخص",
      rating: 4.8,
      verified: true,
      image: "care home modern building",
      services: ["إقامة", "طعام", "رعاية طبية"],
      specialties: ["رعاية الأطفال", "التأهيل النفسي"],
      coordinates: { lat: 24.7136, lng: 46.6753 },
      color: "blue"
    },
    {
      id: "2", 
      name: "دار الأمان",
      address: "حي العليا، الرياض",
      phone: "011-234-5678",
      hours: "24 ساعة",
      capacity: "35 شخص",
      rating: 4.6,
      verified: true,
      image: "children care facility",
      services: ["إقامة", "تأهيل", "دعم نفسي"],
      specialties: ["برامج تعليمية", "أنشطة ترفيهية"],
      coordinates: { lat: 24.6877, lng: 46.7219 },
      color: "green"
    },
    {
      id: "3",
      name: "دار الضيافة",
      address: "حي المروج، جدة",
      phone: "012-345-6789",
      hours: "24 ساعة",
      capacity: "40 شخص",
      rating: 4.7,
      verified: true,
      image: "family care center",
      services: ["إقامة مؤقتة", "وجبات", "خدمات اجتماعية"],
      specialties: ["الدعم الأسري", "الرعاية الطارئة"],
      coordinates: { lat: 21.4858, lng: 39.1925 },
      color: "purple"
    }
  ];

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const handleNavigation = (coordinates: { lat: number; lng: number }) => {
    window.open(`https://maps.google.com/?q=${coordinates.lat},${coordinates.lng}`, '_blank');
  };

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        gradient: "from-blue-500 to-blue-700",
        bg: "bg-blue-500",
        border: "border-blue-200",
        text: "text-blue-600",
        lightBg: "bg-blue-50"
      },
      green: {
        gradient: "from-emerald-500 to-emerald-700",
        bg: "bg-emerald-500",
        border: "border-emerald-200",
        text: "text-emerald-600",
        lightBg: "bg-emerald-50"
      },
      purple: {
        gradient: "from-purple-500 to-purple-700",
        bg: "bg-purple-500",
        border: "border-purple-200",
        text: "text-purple-600",
        lightBg: "bg-purple-50"
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 p-4">
      {/* Creative Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="relative inline-block">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center"
          >
            <Sparkles className="h-4 w-4 text-white" />
          </motion.div>
          
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            بيوت الأمان والرعاية
          </h1>
        </div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600 text-lg mb-4"
        >
          حيث نبني مستقبلاً آمناً للجميع ✨
        </motion.p>

        {/* Stats Cards */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center gap-4 mb-6"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg border border-white/20">
            <div className="flex items-center gap-2">
              <Home className="h-5 w-5 text-blue-500" />
              <span className="text-sm font-semibold text-gray-700">٣ دور رعاية</span>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg border border-white/20">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-green-500" />
              <span className="text-sm font-semibold text-gray-700">١٢٥ مقعد</span>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg border border-white/20">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="text-sm font-semibold text-gray-700">٤.٧ تقييم</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Interactive 3D Map */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-8"
      >
        <Card className="overflow-hidden border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
          <CardContent className="p-0">
            <div className="h-80 bg-gradient-to-br from-indigo-400 via-blue-500 to-cyan-500 relative overflow-hidden">
              {/* Animated background elements */}
              <motion.div
                animate={{ 
                  x: [0, 100, 0],
                  y: [0, -50, 0]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"
              />
              
              <motion.div
                animate={{ 
                  x: [0, -80, 0],
                  y: [0, 30, 0]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute bottom-20 right-20 w-32 h-32 bg-purple-300/20 rounded-full blur-2xl"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              
              <div className="relative z-10 h-full flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-center text-white"
                >
                  <MapPin className="h-16 w-16 mx-auto mb-4 drop-shadow-lg" />
                  <h3 className="text-xl font-bold mb-2">اختر دار الرعاية الأقرب إليك</h3>
                  <p className="text-blue-100">اضغط على العلامات لرؤية التفاصيل</p>
                </motion.div>
              </div>
              
              {/* Interactive map markers with animation */}
              {careHomes.map((home, index) => {
                const colors = getColorClasses(home.color);
                return (
                  <motion.div
                    key={home.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.8 + index * 0.2 }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`absolute w-12 h-12 ${colors.bg} rounded-full flex items-center justify-center cursor-pointer shadow-lg border-4 border-white transform hover:shadow-2xl transition-all duration-300`}
                    style={{
                      top: `${30 + index * 25}%`,
                      left: `${25 + index * 20}%`
                    }}
                    onClick={() => setSelectedHome(selectedHome === home.id ? null : home.id)}
                  >
                    <Home className="h-6 w-6 text-white" />
                    
                    {/* Pulsing effect */}
                    <motion.div
                      animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className={`absolute inset-0 ${colors.bg} rounded-full`}
                    />
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Care Homes Creative Cards */}
      <div className="space-y-6">
        {careHomes.map((home, index) => {
          const colors = getColorClasses(home.color);
          const isSelected = selectedHome === home.id;
          const isHovered = hoveredCard === home.id;
          
          return (
            <motion.div
              key={home.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + index * 0.2 }}
              whileHover={{ y: -8 }}
              onHoverStart={() => setHoveredCard(home.id)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <Card className={`overflow-hidden border-0 shadow-xl transition-all duration-500 ${
                isSelected ? 'ring-4 ring-blue-300 shadow-2xl' : 'shadow-lg'
              } ${isHovered ? 'shadow-2xl' : ''} bg-white/95 backdrop-blur-sm`}>
                <div className="relative">
                  {/* Header with gradient */}
                  <div className={`h-24 bg-gradient-to-r ${colors.gradient} relative overflow-hidden`}>
                    <motion.div
                      animate={{ 
                        x: isHovered ? [0, 100, -100, 0] : 0,
                        opacity: isHovered ? [0.3, 0.6, 0.3] : 0.3
                      }}
                      transition={{ duration: 3, repeat: isHovered ? Infinity : 0 }}
                      className="absolute inset-0 bg-white/20 transform skew-x-12"
                    />
                    
                    <div className="absolute top-4 right-4">
                      {home.verified && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 1.5 + index * 0.2 }}
                        >
                          <Badge className="bg-white/20 text-white border-white/30">
                            <Shield className="h-3 w-3 ml-1" />
                            موثقة
                          </Badge>
                        </motion.div>
                      )}
                    </div>

                    <div className="absolute bottom-4 right-4">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"
                      >
                        <Heart className="h-6 w-6 text-white" />
                      </motion.div>
                    </div>
                  </div>

                  <CardContent className="p-6 space-y-4">
                    {/* Home info */}
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{home.name}</h3>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${
                                  i < Math.floor(home.rating) 
                                    ? 'text-yellow-400 fill-current' 
                                    : 'text-gray-300'
                                }`} 
                              />
                            ))}
                          </div>
                          <span className="text-sm font-semibold text-gray-600">
                            {home.rating}
                          </span>
                          <Award className="h-4 w-4 text-yellow-500" />
                        </div>
                      </div>
                      
                      <ImageWithFallback
                        src={`https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwke2hvbWUuaW1hZ2V9fGVufDF8fHx8MTc1ODQyMTgxNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral`}
                        alt={home.name}
                        className="w-16 h-16 rounded-2xl object-cover shadow-md border-2 border-white"
                      />
                    </div>

                    {/* Location and contact */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-gray-600">
                        <div className={`w-10 h-10 ${colors.lightBg} rounded-xl flex items-center justify-center`}>
                          <MapPin className={`h-5 w-5 ${colors.text}`} />
                        </div>
                        <span className="text-sm">{home.address}</span>
                      </div>

                      <div className="flex items-center gap-3 text-gray-600">
                        <div className={`w-10 h-10 ${colors.lightBg} rounded-xl flex items-center justify-center`}>
                          <Clock className={`h-5 w-5 ${colors.text}`} />
                        </div>
                        <span className="text-sm">{home.hours}</span>
                        <div className="flex items-center gap-2 mr-auto">
                          <Users className={`h-4 w-4 ${colors.text}`} />
                          <span className="text-sm">{home.capacity}</span>
                        </div>
                      </div>
                    </div>

                    {/* Services */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-gray-700">الخدمات الأساسية:</h4>
                      <div className="flex flex-wrap gap-2">
                        {home.services.map((service, idx) => (
                          <motion.span
                            key={idx}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 1.8 + index * 0.2 + idx * 0.1 }}
                            className={`${colors.lightBg} ${colors.text} text-xs px-3 py-1 rounded-full font-medium`}
                          >
                            {service}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Specialties */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-gray-700">التخصصات:</h4>
                      <div className="flex flex-wrap gap-2">
                        {home.specialties.map((specialty, idx) => (
                          <motion.span
                            key={idx}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 2 + index * 0.2 + idx * 0.1 }}
                            className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs px-3 py-1 rounded-full font-medium shadow-sm"
                          >
                            ⭐ {specialty}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-3 pt-4">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1"
                      >
                        <Button 
                          onClick={() => handleCall(home.phone)}
                          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg border-0"
                        >
                          <Phone className="h-4 w-4 ml-2" />
                          اتصال فوري
                        </Button>
                      </motion.div>
                      
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          onClick={() => handleNavigation(home.coordinates)}
                          variant="outline"
                          className={`${colors.border} ${colors.text} hover:${colors.lightBg} border-2`}
                        >
                          <Navigation className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Floating action button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="fixed bottom-24 left-4 z-50"
      >
        <motion.button
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full shadow-2xl flex items-center justify-center text-white"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <Heart className="h-6 w-6" />
        </motion.button>
      </motion.div>
    </div>
  );
}