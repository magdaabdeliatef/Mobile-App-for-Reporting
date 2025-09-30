import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Clock, MapPin, Phone } from "lucide-react";

interface Report {
  id: string;
  type: string;
  description: string;
  location: string;
  date: string;
  status: string;
  contactName?: string;
  contactPhone?: string;
}

interface ReportsListProps {
  reports: Report[];
}

export function ReportsList({ reports }: ReportsListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-500";
      case "inProgress": return "bg-blue-500";
      case "resolved": return "bg-green-500";
      case "rejected": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending": return "قيد المراجعة";
      case "inProgress": return "قيد المعالجة";
      case "resolved": return "تم الحل";
      case "rejected": return "مرفوض";
      default: return "غير محدد";
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case "abuse": return "إساءة معاملة";
      case "neglect": return "إهمال";
      case "violence": return "عنف";
      case "emergency": return "حالة طوارئ";
      case "other": return "أخرى";
      default: return type;
    }
  };

  if (reports.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">لا توجد بلاغات حتى الآن</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reports.map((report) => (
        <Card key={report.id} className="w-full">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{getTypeText(report.type)}</CardTitle>
              <Badge className={`${getStatusColor(report.status)} text-white`}>
                {getStatusText(report.status)}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-3">
            <p className="text-gray-700 text-sm">{report.description}</p>
            
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <MapPin className="h-3 w-3" />
              <span>{report.location}</span>
            </div>
            
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Clock className="h-3 w-3" />
              <span>{report.date}</span>
            </div>

            {report.contactPhone && (
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Phone className="h-3 w-3" />
                <span>{report.contactPhone}</span>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}