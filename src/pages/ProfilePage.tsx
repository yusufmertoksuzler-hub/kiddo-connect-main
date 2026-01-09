import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  ChevronRight,
  Settings,
  CreditCard,
  Bell,
  HelpCircle,
  LogOut,
  Plus,
  Calendar,
  Crown,
  Trash2,
} from "lucide-react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { storage, UserProfile, Child, Booking } from "@/lib/storage";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const ProfilePage = () => {
  const [user, setUser] = useState<UserProfile>(storage.getUser());
  const [children, setChildren] = useState<Child[]>(storage.getChildren());
  const [bookings, setBookings] = useState<Booking[]>(storage.getBookings());

  // Add Child Form State
  const [newChildName, setNewChildName] = useState("");
  const [newChildAge, setNewChildAge] = useState("");
  const [newChildGender, setNewChildGender] = useState<'boy' | 'girl' | 'other'>('girl');

  useEffect(() => {
    const handleUserUpdate = () => setUser(storage.getUser());
    const handleChildrenUpdate = () => setChildren(storage.getChildren());
    const handleBookingsUpdate = () => setBookings(storage.getBookings());

    window.addEventListener('storage-update-user', handleUserUpdate);
    window.addEventListener('storage-update-children', handleChildrenUpdate);
    window.addEventListener('storage-update-bookings', handleBookingsUpdate);

    return () => {
      window.removeEventListener('storage-update-user', handleUserUpdate);
      window.removeEventListener('storage-update-children', handleChildrenUpdate);
      window.removeEventListener('storage-update-bookings', handleBookingsUpdate);
    };
  }, []);

  const handleAddChild = () => {
    if (!newChildName || !newChildAge) {
      toast.error("Lütfen tüm alanları doldurun");
      return;
    }

    const avatar = newChildGender === 'girl' ? '👧' : newChildGender === 'boy' ? '👦' : '🧑';

    storage.addChild({
      name: newChildName,
      age: parseInt(newChildAge),
      gender: newChildGender,
      avatar
    });

    setNewChildName("");
    setNewChildAge("");
    toast.success("Çocuk başarıyla eklendi");
  };

  const handleDeleteChild = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click if any
    storage.deleteChild(id);
    toast.success("Çocuk silindi");
  };

  const menuItems = [
    { icon: Calendar, label: "Rezervasyonlarım", path: "/bookings", count: bookings.length },
    { icon: CreditCard, label: "Ödeme Yöntemleri", path: "/payment" },
    { icon: Bell, label: "Bildirimler", path: "/notifications", count: 2 },
    { icon: Settings, label: "Ayarlar", path: "/settings" },
    { icon: HelpCircle, label: "Yardım & Destek", path: "/help" },
  ];

  const upcomingBookings = bookings.filter(b => b.status === "confirmed").slice(0, 3); // Show max 3

  return (
    <MobileLayout>
      {/* Gradient Background */}
      <div className="gradient-mesh fixed inset-0 -z-10" />

      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-95" />
        <div className="absolute inset-0">
          <div className="orb orb-secondary w-64 h-64 -top-32 -right-32 opacity-30" />
        </div>

        <div className="relative px-4 pt-6 pb-12 text-primary-foreground">
          <motion.div
            className="flex items-center justify-between mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-xl font-bold font-display">Profilim</h1>
            <Link to="/admin">
              <Button variant="ghost" size="sm" className="text-primary-foreground/90 hover:bg-white/20">
                <Crown className="w-4 h-4 mr-1" />
                Admin
              </Button>
            </Link>
          </motion.div>

          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg border border-white/30">
              <User className="w-10 h-10" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-display">{user.name}</h2>
              <p className="text-sm opacity-90">{user.email}</p>
              {user.isPremium && (
                <Badge className="mt-2 bg-white/20 text-primary-foreground border-white/30">
                  Premium Üye ✨
                </Badge>
              )}
            </div>
          </motion.div>
        </div>
      </header>

      <div className="px-4 -mt-6 relative z-10">
        {/* Children */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-card mb-4 border-0 shadow-elevated">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-foreground font-display text-lg">Çocuklarım</h3>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="soft" size="sm" className="rounded-xl">
                      <Plus className="w-4 h-4 mr-1" />
                      Ekle
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Çocuk Ekle</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">İsim</Label>
                        <Input
                          id="name"
                          placeholder="Çocuğunuzun ismi"
                          value={newChildName}
                          onChange={(e) => setNewChildName(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="age">Yaş</Label>
                        <Input
                          id="age"
                          type="number"
                          placeholder="Yaş"
                          value={newChildAge}
                          onChange={(e) => setNewChildAge(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Cinsiyet</Label>
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            variant={newChildGender === 'girl' ? 'default' : 'outline'}
                            onClick={() => setNewChildGender('girl')}
                            className="flex-1"
                          >
                            Kız 👧
                          </Button>
                          <Button
                            type="button"
                            variant={newChildGender === 'boy' ? 'default' : 'outline'}
                            onClick={() => setNewChildGender('boy')}
                            className="flex-1"
                          >
                            Erkek 👦
                          </Button>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="ghost">İptal</Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button onClick={handleAddChild}>Kaydet</Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

              </div>
              <div className="flex gap-3 overflow-x-auto pb-2">
                <AnimatePresence>
                  {children.map((child, index) => (
                    <motion.div
                      key={child.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ delay: index * 0.1 }}
                      className="min-w-[120px] relative group"
                    >
                      <div className="p-4 bg-gradient-to-br from-muted/80 to-muted/40 rounded-2xl border border-border/50 text-center relative">
                        <button
                          onClick={(e) => handleDeleteChild(child.id, e)}
                          className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                        <div className="text-3xl mb-2">{child.avatar}</div>
                        <p className="font-bold text-foreground font-display truncate">{child.name}</p>
                        <p className="text-xs text-muted-foreground">{child.age} yaşında</p>
                      </div>
                    </motion.div>
                  ))}
                  {children.length === 0 && (
                    <p className="text-sm text-muted-foreground w-full text-center py-2">
                      Henüz çocuk eklenmemiş.
                    </p>
                  )}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Upcoming Bookings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="glass-card mb-4 border-0 shadow-soft">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-foreground font-display text-lg">
                  Yaklaşan Rezervasyonlar
                </h3>
                <Link to="/bookings">
                  <Button variant="ghost" size="sm" className="text-primary font-semibold">
                    Tümü
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
              <div className="space-y-3">
                {upcomingBookings.map((booking, index) => (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-muted/50 rounded-2xl border border-border/30"
                  >
                    <div>
                      <p className="font-medium text-sm text-foreground">
                        {booking.activityTitle}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {booking.date} • {booking.time}
                      </p>
                    </div>
                    <Badge variant="success" className="text-[10px]">
                      Onaylandı
                    </Badge>
                  </motion.div>
                ))}
                {upcomingBookings.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-2">
                    Henüz yaklaşan rezervasyonunuz yok.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Menu */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="glass-card mb-4 border-0 shadow-soft">
            <CardContent className="p-2">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                >
                  <Link
                    to={item.path}
                    className="flex items-center justify-between p-4 rounded-2xl hover:bg-muted/50 transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-2xl bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                        <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <span className="font-medium text-foreground">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.count ? (
                        <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-bold rounded-full">
                          {item.count}
                        </span>
                      ) : null}
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Logout */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Button
            variant="ghost"
            className="w-full text-destructive hover:text-destructive hover:bg-destructive/10 mb-6 h-14 rounded-2xl"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Çıkış Yap
          </Button>
        </motion.div>
      </div>
    </MobileLayout>
  );
};

export default ProfilePage;
