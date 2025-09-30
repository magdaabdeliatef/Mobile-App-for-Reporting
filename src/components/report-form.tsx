import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { X, Camera, MapPin } from "lucide-react";

interface ReportFormProps {
  onClose: () => void;
  onSubmit: (report: any) => void;
}

export function ReportForm({ onClose, onSubmit }: ReportFormProps) {
  const [formData, setFormData] = useState({
    type: "",
    description: "",
    location: "",
    urgent: false,
    contactName: "",
    contactPhone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const report = {
      ...formData,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString("ar-SA"),
      status: "pending",
    };
    onSubmit(report);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-xl">تقديم بلاغ جديد</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="type">نوع البلاغ</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر نوع البلاغ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="abuse">إساءة معاملة</SelectItem>
                  <SelectItem value="neglect">إهمال</SelectItem>
                  <SelectItem value="violence">عنف</SelectItem>
                  <SelectItem value="emergency">حالة طوارئ</SelectItem>
                  <SelectItem value="other">أخرى</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description">وصف الحالة</Label>
              <Textarea
                id="description"
                placeholder="اكتب تفاصيل البلاغ هنا..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="min-h-[100px]"
                required
              />
            </div>

            <div>
              <Label htmlFor="location">الموقع</Label>
              <div className="flex gap-2">
                <Input
                  id="location"
                  placeholder="أدخل الموقع أو العنوان"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  required
                />
                <Button type="button" variant="outline" size="sm">
                  <MapPin className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="contactName">اسم المُبلِغ (اختياري)</Label>
              <Input
                id="contactName"
                placeholder="الاسم الكامل"
                value={formData.contactName}
                onChange={(e) => setFormData({...formData, contactName: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="contactPhone">رقم الهاتف (اختياري)</Label>
              <Input
                id="contactPhone"
                placeholder="رقم الهاتف للتواصل"
                value={formData.contactPhone}
                onChange={(e) => setFormData({...formData, contactPhone: e.target.value})}
              />
            </div>

            <div className="flex gap-2 pt-2">
              <Button type="button" variant="outline" className="flex-1">
                <Camera className="h-4 w-4 ml-2" />
                إضافة صورة
              </Button>
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                إلغاء
              </Button>
              <Button type="submit" className="flex-1 bg-red-500 hover:bg-red-600">
                إرسال البلاغ
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}