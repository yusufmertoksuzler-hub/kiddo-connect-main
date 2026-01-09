import { useState, useEffect } from "react";
import { Plus, Search, MoreVertical, Edit, Trash2, Eye } from "lucide-react";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { storage } from "@/lib/storage";
import { Activity } from "@/components/activities/ActivityCard";
import { toast } from "sonner";

const AdminActivities = () => {
  const [searchValue, setSearchValue] = useState("");
  const [activities, setActivities] = useState<Activity[]>([]);

  // New Activity State
  const [newActivity, setNewActivity] = useState({
    title: "",
    category: "Sanat",
    price: "",
    location: "İstanbul",
    imageUrl: "https://images.unsplash.com/photo-1544776193-adeb74701485?w=500&q=80", // Default placeholder
    ageRange: "4-10 yaş",
    providerName: "Kiddo Center"
  });

  useEffect(() => {
    const loadData = () => setActivities(storage.getActivities());
    loadData();
    window.addEventListener('storage-update-activities', loadData);
    return () => window.removeEventListener('storage-update-activities', loadData);
  }, []);

  const handleAddActivity = () => {
    if (!newActivity.title || !newActivity.price) {
      toast.error("Lütfen gerekli alanları doldurun");
      return;
    }

    storage.addActivity({
      title: newActivity.title,
      category: newActivity.category,
      price: parseInt(newActivity.price),
      location: newActivity.location,
      imageUrl: newActivity.imageUrl,
      ageRange: newActivity.ageRange,
      providerName: newActivity.providerName,
      distance: "2.0 km",
      rating: 5.0
    });

    toast.success("Aktivite başarıyla eklendi");
    // Reset form (optional)
  };

  const handleDelete = (id: string) => {
    if (confirm("Bu aktiviteyi silmek istediğinize emin misiniz?")) {
      storage.deleteActivity(id);
      toast.success("Aktivite silindi");
    }
  };

  const filteredActivities = activities.filter(a =>
    a.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold font-display text-foreground">
              Aktiviteler
            </h1>
            <p className="text-muted-foreground">
              Tüm aktiviteleri yönetin ve düzenleyin.
            </p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="hero">
                <Plus className="w-4 h-4 mr-2" />
                Yeni Aktivite
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Yeni Aktivite Ekle</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Aktivite Başlığı</Label>
                  <Input id="title" value={newActivity.title} onChange={e => setNewActivity({ ...newActivity, title: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="category">Kategori</Label>
                    <Input id="category" value={newActivity.category} onChange={e => setNewActivity({ ...newActivity, category: e.target.value })} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="price">Fiyat (₺)</Label>
                    <Input id="price" type="number" value={newActivity.price} onChange={e => setNewActivity({ ...newActivity, price: e.target.value })} />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="image">Resim URL</Label>
                  <Input id="image" value={newActivity.imageUrl} onChange={e => setNewActivity({ ...newActivity, imageUrl: e.target.value })} />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddActivity}>Kaydet</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search & Filter */}
        <Card className="mb-6 border-0 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Aktivite ara..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">Filtrele</Button>
            </div>
          </CardContent>
        </Card>

        {/* Activities Table */}
        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle className="font-display">
              Tüm Aktiviteler ({filteredActivities.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Aktivite
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Kategori
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Fiyat
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                      İşlemler
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredActivities.map((activity) => (
                    <tr
                      key={activity.id}
                      className="border-b last:border-0 hover:bg-muted/50 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={activity.imageUrl}
                            alt={activity.title}
                            className="w-12 h-12 rounded-lg object-cover bg-muted"
                            onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/150")}
                          />
                          <div>
                            <p className="font-medium text-sm text-foreground">
                              {activity.title}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {activity.providerName}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="category">{activity.category}</Badge>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-foreground">
                          ₺{activity.price}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="text-destructive hover:bg-destructive/10"
                          onClick={() => handleDelete(activity.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
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

export default AdminActivities;
