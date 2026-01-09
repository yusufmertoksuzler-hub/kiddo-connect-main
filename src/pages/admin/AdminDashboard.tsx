import {
  TrendingUp,
  Users,
  Calendar,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const stats = [
  {
    title: "Toplam Gelir",
    value: "₺45,230",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    title: "Rezervasyonlar",
    value: "128",
    change: "+8.2%",
    trend: "up",
    icon: Calendar,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Aktif Kullanıcılar",
    value: "1,234",
    change: "+23.1%",
    trend: "up",
    icon: Users,
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    title: "Dönüşüm Oranı",
    value: "%4.2",
    change: "-1.3%",
    trend: "down",
    icon: TrendingUp,
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
];

const recentBookings = [
  {
    id: "1",
    customerName: "Ayşe Yılmaz",
    activityName: "Yaratıcı Resim Atölyesi",
    date: "8 Oca 2026",
    amount: "₺350",
    status: "confirmed",
  },
  {
    id: "2",
    customerName: "Mehmet Kaya",
    activityName: "Yüzme Dersleri",
    date: "8 Oca 2026",
    amount: "₺600",
    status: "pending",
  },
  {
    id: "3",
    customerName: "Zeynep Demir",
    activityName: "Robotik Atölyesi",
    date: "7 Oca 2026",
    amount: "₺550",
    status: "confirmed",
  },
  {
    id: "4",
    customerName: "Ali Yıldız",
    activityName: "Bale Kursu",
    date: "7 Oca 2026",
    amount: "₺450",
    status: "cancelled",
  },
];

const topActivities = [
  { name: "Yaratıcı Resim Atölyesi", bookings: 42, revenue: "₺14,700" },
  { name: "Yüzme Dersleri", bookings: 38, revenue: "₺22,800" },
  { name: "Robotik ve Kodlama", bookings: 29, revenue: "₺15,950" },
  { name: "Bale Kursu", bookings: 25, revenue: "₺11,250" },
];

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold font-display text-foreground">
            Dashboard
          </h1>
          <p className="text-muted-foreground">
            Hoş geldiniz! İşte platformun genel durumu.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title} className="border-0 shadow-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className={cn("p-2 rounded-lg", stat.bgColor)}>
                    <stat.icon className={cn("w-5 h-5", stat.color)} />
                  </div>
                  <div
                    className={cn(
                      "flex items-center text-xs font-medium",
                      stat.trend === "up" ? "text-success" : "text-destructive"
                    )}
                  >
                    {stat.change}
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="w-3 h-3 ml-0.5" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3 ml-0.5" />
                    )}
                  </div>
                </div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Bookings */}
          <Card className="lg:col-span-2 border-0 shadow-card">
            <CardHeader>
              <CardTitle className="font-display">Son Rezervasyonlar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between p-3 bg-muted rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-bold text-primary">
                          {booking.customerName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-sm text-foreground">
                          {booking.customerName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {booking.activityName}
                        </p>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-3">
                      <div>
                        <p className="font-medium text-sm text-foreground">
                          {booking.amount}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {booking.date}
                        </p>
                      </div>
                      <Badge
                        variant={
                          booking.status === "confirmed"
                            ? "success"
                            : booking.status === "pending"
                            ? "warning"
                            : "destructive"
                        }
                        className="text-[10px]"
                      >
                        {booking.status === "confirmed"
                          ? "Onaylandı"
                          : booking.status === "pending"
                          ? "Bekliyor"
                          : "İptal"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Activities */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="font-display">Popüler Aktiviteler</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topActivities.map((activity, index) => (
                  <div key={activity.name} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">
                        {index + 1}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-foreground truncate">
                        {activity.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.bookings} rezervasyon
                      </p>
                    </div>
                    <p className="font-bold text-sm text-primary">
                      {activity.revenue}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
