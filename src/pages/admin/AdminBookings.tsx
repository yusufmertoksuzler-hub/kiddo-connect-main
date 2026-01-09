import { useState } from "react";
import { Search, Download, MoreVertical, Eye, XCircle, RefreshCcw } from "lucide-react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const bookings = [
  {
    id: "RZV-001",
    customerName: "Ayşe Yılmaz",
    customerEmail: "ayse@email.com",
    activityName: "Yaratıcı Resim Atölyesi",
    childName: "Elif (6 yaş)",
    date: "8 Ocak 2026",
    time: "14:00",
    amount: 350,
    status: "confirmed",
    paymentStatus: "paid",
    createdAt: "7 Oca 2026, 10:23",
  },
  {
    id: "RZV-002",
    customerName: "Mehmet Kaya",
    customerEmail: "mehmet@email.com",
    activityName: "Yüzme Dersleri",
    childName: "Ali (8 yaş)",
    date: "10 Ocak 2026",
    time: "16:00",
    amount: 600,
    status: "pending",
    paymentStatus: "pending",
    createdAt: "7 Oca 2026, 14:45",
  },
  {
    id: "RZV-003",
    customerName: "Zeynep Demir",
    customerEmail: "zeynep@email.com",
    activityName: "Robotik ve Kodlama",
    childName: "Can (10 yaş)",
    date: "12 Ocak 2026",
    time: "15:00",
    amount: 550,
    status: "confirmed",
    paymentStatus: "paid",
    createdAt: "6 Oca 2026, 09:12",
  },
  {
    id: "RZV-004",
    customerName: "Fatma Özkan",
    customerEmail: "fatma@email.com",
    activityName: "Bale Kursu",
    childName: "Selin (5 yaş)",
    date: "15 Ocak 2026",
    time: "17:00",
    amount: 450,
    status: "cancelled",
    paymentStatus: "refunded",
    createdAt: "5 Oca 2026, 16:30",
  },
];

const AdminBookings = () => {
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredBookings =
    statusFilter === "all"
      ? bookings
      : bookings.filter((b) => b.status === statusFilter);

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold font-display text-foreground">
              Rezervasyonlar
            </h1>
            <p className="text-muted-foreground">
              Tüm rezervasyonları görüntüleyin ve yönetin.
            </p>
          </div>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            CSV İndir
          </Button>
        </div>

        {/* Search & Filter */}
        <Card className="mb-6 border-0 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Müşteri adı, e-posta veya rezervasyon no..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Durum" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tüm Durumlar</SelectItem>
                  <SelectItem value="confirmed">Onaylandı</SelectItem>
                  <SelectItem value="pending">Bekliyor</SelectItem>
                  <SelectItem value="cancelled">İptal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Bookings Table */}
        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle className="font-display">
              Rezervasyonlar ({filteredBookings.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Rezervasyon No
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Müşteri
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Aktivite
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Tarih/Saat
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Tutar
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Durum
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                      İşlemler
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className="border-b last:border-0 hover:bg-muted/50 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <span className="font-mono text-sm font-medium text-foreground">
                          {booking.id}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium text-sm text-foreground">
                            {booking.customerName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {booking.childName}
                          </p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-sm text-foreground">
                          {booking.activityName}
                        </p>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="text-sm text-foreground">{booking.date}</p>
                          <p className="text-xs text-muted-foreground">
                            {booking.time}
                          </p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-foreground">
                          ₺{booking.amount}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-col gap-1">
                          <Badge
                            variant={
                              booking.status === "confirmed"
                                ? "success"
                                : booking.status === "pending"
                                ? "warning"
                                : "destructive"
                            }
                          >
                            {booking.status === "confirmed"
                              ? "Onaylandı"
                              : booking.status === "pending"
                              ? "Bekliyor"
                              : "İptal"}
                          </Badge>
                          {booking.paymentStatus === "refunded" && (
                            <Badge variant="secondary" className="text-[10px]">
                              İade edildi
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon-sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              Detaylar
                            </DropdownMenuItem>
                            {booking.status !== "cancelled" && (
                              <>
                                <DropdownMenuItem className="text-destructive">
                                  <XCircle className="w-4 h-4 mr-2" />
                                  İptal Et
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <RefreshCcw className="w-4 h-4 mr-2" />
                                  İade Yap
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminBookings;
