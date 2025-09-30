import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Camera, MapPin, User, Users, UserCheck } from "lucide-react";

interface MissingPersonReportProps {
  onSubmit: (report: any) => void;
}

export function MissingPersonReport({ onSubmit }: MissingPersonReportProps) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [formData, setFormData] = useState({
    category: "",
    name: "",
    age: "",
    description: "",
    lastSeenLocation: "",
    contactPhone: "",
    reporterName: "",
  });

  const categories = [
    { id: "child", label: "طفل", icon: User, color: "bg-blue-500" },
    { id: "youth", label: "شاب/شابة", icon: Users, color: "bg-green-500" },
    { id: "elderly", label: "مسن/مسنة", icon: UserCheck, color: "bg-purple-500" },
  ];

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setFormData({ ...formData, category: categoryId });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const report = {
      ...formData,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString("ar-SA"),
      status: "active",
    };
    onSubmit(report);
  };

  return (
    <div className="p-4 space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl text-blue-900 mb-2">الإبلاغ عن مفقود</h2>
        <p className="text-blue-700">ساعدنا في العثور على المفقودين</p>
      </div>

      {/* Category Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-blue-900">اختر فئة المفقود</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                className={`p-4 rounded-full border-2 transition-all ${
                  selectedCategory === category.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-2`}>
                  <category.icon className="h-8 w-8 text-white" />
                </div>
                <p className="text-sm text-center">{category.label}</p>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Form */}
      {selectedCategory && (
        <Card>
          <CardHeader>
            <CardTitle className="text-blue-900">معلومات المفقود</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">الاسم الكامل</Label>
                <Input
                  id="name"
                  placeholder="أدخل اسم المفقود"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>

              <div>
                <Label htmlFor="age">العمر</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="العمر بالسنوات"
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">الوصف</Label>
                <Textarea
                  id="description"
                  placeholder="وصف المفقود (الطول، الوزن، الملابس، علامات مميزة...)"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="min-h-[100px]"
                  required
                />
              </div>

              <div>
                <Label htmlFor="lastSeenLocation">آخر مكان شوهد فيه</Label>
                <div className="flex gap-2">
                  <Input
                    id="lastSeenLocation"
                    placeholder="المدينة، الحي، الشارع..."
                    value={formData.lastSeenLocation}
                    onChange={(e) => setFormData({...formData, lastSeenLocation: e.target.value})}
                    required
                  />
                  <Button type="button" variant="outline" size="sm">
                    <MapPin className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="reporterName">اسم المُبلِغ</Label>
                <Input
                  id="reporterName"
                  placeholder="اسمك الكامل"
                  value={formData.reporterName}
                  onChange={(e) => setFormData({...formData, reporterName: e.target.value})}
                  required
                />
              </div>

              <div>
                <Label htmlFor="contactPhone">رقم الهاتف</Label>
                <Input
                  id="contactPhone"
                  placeholder="رقم للتواصل"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({...formData, contactPhone: e.target.value})}
                  required
                />
              </div>

              <div className="flex gap-2 pt-2">
                <Button type="button" variant="outline" className="flex-1">
                  <Camera className="h-4 w-4 ml-2" />
                  إضافة صورة
                </Button>
              </div>

              <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-white">
                إرسال البلاغ
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}