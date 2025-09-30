import { useState } from "react";
import { EnhancedWelcomeScreen } from "./components/enhanced-welcome-screen";
import { LoginSelection } from "./components/login-selection";
import { CareHomeLogin } from "./components/care-home-login";
import { CareHomeDashboard } from "./components/care-home-dashboard";
import { SplashScreen } from "./components/splash-screen";
import { EnhancedHomeDashboard } from "./components/enhanced-home-dashboard";
import { EnhancedMissingPersonReport } from "./components/enhanced-missing-person-report";
import { CreativeCareHomes } from "./components/creative-care-homes";
import { EnhancedDonationSection } from "./components/enhanced-donation-section";
import { EnhancedCommunitySection } from "./components/enhanced-community-section";
import { EnhancedProfileSection } from "./components/enhanced-profile-section";
import { MissingPersonsGallery } from "./components/missing-persons-gallery";
import { NewBottomNavigation } from "./components/new-bottom-navigation";
import { NotificationSystem, createNotification } from "./components/notification-system";

export default function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showLoginSelection, setShowLoginSelection] = useState(false);
  const [showCareHomeLogin, setShowCareHomeLogin] = useState(false);
  const [showCareHomeDashboard, setShowCareHomeDashboard] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [missingPersons, setMissingPersons] = useState([]);
  const [careHomeRequests, setCareHomeRequests] = useState([]);
  const [acceptedReports, setAcceptedReports] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
    setShowLoginSelection(true);
  };

  const handleUserTypeSelect = (userType: "normal" | "care-home") => {
    setShowLoginSelection(false);
    
    if (userType === "normal") {
      // المستخدم العادي يذهب مباشرة لصفحة الإبلاغ
      setShowSplash(true);
    } else {
      // دور الرعاية تذهب لصفحة تسجيل الدخول
      setShowCareHomeLogin(true);
    }
  };

  const handleCareHomeLogin = () => {
    setShowCareHomeLogin(false);
    setShowCareHomeDashboard(true);
  };

  const handleCareHomeLogout = () => {
    setShowCareHomeDashboard(false);
    setShowLoginSelection(true);
  };

  const handleBackToSelection = () => {
    setShowCareHomeLogin(false);
    setShowLoginSelection(true);
  };

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleMissingPersonSubmit = (report: any) => {
    setMissingPersons([report, ...missingPersons]);
    
    // إرسال طلب تلقائي لجميع دور الرعاية إذا كان البلاغ عن طفل
    if (report.category === "child" && report.verificationStatus !== "invalid") {
      const request = {
        id: Date.now(),
        reportId: report.id,
        report: report,
        requestedAt: new Date().toISOString(),
        status: "pending", // pending, accepted, rejected
        priority: calculatePriority(report),
        acceptedBy: null
      };
      
      setCareHomeRequests(prev => [request, ...prev]);
      
      alert("تم إرسال البلاغ بنجاح! تم إرسال طلبات لجميع دور الرعاية المسجلة.");
    } else {
      alert("تم إرسال البلاغ بنجاح! سيتم مراجعته والتعامل معه في أقرب وقت.");
    }
  };

  const calculatePriority = (report: any) => {
    // حساب الأولوية بناءً على الموقع والعمر وعوامل أخرى
    let priority = 5; // متوسط
    
    if (report.coordinates) priority += 2; // موقع دقيق
    if (parseInt(report.age) < 10) priority += 3; // طفل صغير
    if (report.verificationScore > 80) priority += 2; // بلاغ موثوق
    
    return Math.min(priority, 10); // الحد الأقصى 10
  };

  const handleRequestAccept = (requestId: number, careHomeName: string) => {
    setCareHomeRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status: "accepted", acceptedBy: careHomeName, acceptedAt: new Date().toISOString() }
          : req.reportId === prev.find(r => r.id === requestId)?.reportId 
            ? { ...req, status: "rejected_auto" } // رفض تلقائي للطلبات الأخرى لنفس البلاغ
            : req
      )
    );

    const acceptedRequest = careHomeRequests.find(req => req.id === requestId);
    if (acceptedRequest) {
      setAcceptedReports(prev => [...prev, {
        ...acceptedRequest,
        status: "accepted",
        acceptedBy: careHomeName,
        acceptedAt: new Date().toISOString()
      }]);

      // إضافة إشعار للمُبلغ
      const notification = createNotification(
        "report_accepted",
        "تم قبول البلاغ! 🎉",
        `تم قبول بلاغكم من قبل ${careHomeName}. سيتم التواصل معكم قريباً لترتيب الخطوات التالية.`,
        {
          careHomeName,
          reportId: acceptedRequest.reportId,
          contactPhone: "01234567890" // رقم دار الرعاية
        }
      );

      setNotifications(prev => [notification, ...prev]);

      alert(`تم قبول الطلب من قبل ${careHomeName}. تم إعلام المُبلغ.`);
    }
  };

  const handleRequestReject = (requestId: number) => {
    setCareHomeRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status: "rejected", rejectedAt: new Date().toISOString() }
          : req
      )
    );
  };

  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
  };

  const handleMarkNotificationAsRead = (notificationId: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const handleDismissNotification = (notificationId: number) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== notificationId)
    );
  };

  const handleDonationSuccess = (donationType: string, amount?: number, careHomeName?: string) => {
    const notification = createNotification(
      "donation_received",
      "شكراً لك على التبرع! ❤️",
      `تم استلام ${donationType === "financial" ? `تبرعك المالي بقيمة ${amount} ج.م` : 
          donationType === "inkind" ? "تبرعك العيني" : "طلب التطوع"} ${
        careHomeName ? `لدار ${careHomeName}` : ""
      } بنجاح. سيتم التواصل معك قريباً.`,
      {
        donationType,
        amount,
        careHomeName
      }
    );

    setNotifications(prev => [notification, ...prev]);
  };

  if (showWelcome) {
    return <EnhancedWelcomeScreen onContinue={handleWelcomeComplete} />;
  }

  if (showLoginSelection) {
    return <LoginSelection onUserTypeSelect={handleUserTypeSelect} />;
  }

  if (showCareHomeLogin) {
    return <CareHomeLogin onLogin={handleCareHomeLogin} onBack={handleBackToSelection} />;
  }

  if (showCareHomeDashboard) {
    return (
      <CareHomeDashboard 
        onLogout={handleCareHomeLogout}
        requests={careHomeRequests.filter(req => req.status === "pending")}
        onAcceptRequest={handleRequestAccept}
        onRejectRequest={handleRequestReject}
      />
    );
  }

  if (showSplash) {
    return <SplashScreen onContinue={handleSplashComplete} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div className="relative">
            <EnhancedHomeDashboard onNavigate={handleNavigate} />
            <div className="absolute top-4 right-4 z-40">
              <NotificationSystem
                notifications={notifications}
                onMarkAsRead={handleMarkNotificationAsRead}
                onDismiss={handleDismissNotification}
              />
            </div>
          </div>
        );
      
      case "missing":
        return <EnhancedMissingPersonReport onSubmit={handleMissingPersonSubmit} />;
      
      case "gallery":
        return <MissingPersonsGallery />;
      
      case "homes":
        return <CreativeCareHomes />;
      
      case "donate":
        return <EnhancedDonationSection onDonationSuccess={handleDonationSuccess} />;
      
      case "community":
        return <EnhancedCommunitySection />;
      
      default:
        return (
          <div className="relative">
            <EnhancedHomeDashboard onNavigate={handleNavigate} />
            <div className="absolute top-4 right-4 z-40">
              <NotificationSystem
                notifications={notifications}
                onMarkAsRead={handleMarkNotificationAsRead}
                onDismiss={handleDismissNotification}
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto relative" dir="rtl">
      <div className="flex-1 overflow-y-auto">
        {renderContent()}
      </div>
      
      <NewBottomNavigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />
    </div>
  );
}