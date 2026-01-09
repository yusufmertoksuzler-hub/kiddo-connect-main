import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Heart,
  Share2,
  MapPin,
  Clock,
  Users,
  Star,
  Calendar,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { mockActivities, mockSessions, Session } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { storage } from "@/lib/storage";
import { toast } from "sonner";

const ActivityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  const activity = mockActivities.find((a) => a.id === id);

  if (!activity) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-mesh">
        <p className="text-muted-foreground">Aktivite bulunamadı</p>
      </div>
    );
  }

  const handleBooking = () => {
    if (selectedSession && activity) {
      storage.addBooking({
        activityId: activity.id,
        activityTitle: activity.title,
        date: selectedSession.date,
        time: selectedSession.time.split(' - ')[0],
      });
      toast.success("Rezervasyonunuz başarıyla oluşturuldu! 🎉");
      navigate('/bookings');
    } else {
      toast.error("Lütfen bir seans seçiniz.");
    }
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Hero Image */}
      <div className="relative h-80">
        <motion.img
          src={activity.imageUrl}
          alt={activity.title}
          className="w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Top Actions */}
        <motion.div
          className="absolute top-4 left-4 right-4 flex items-center justify-between z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Button
            variant="glass"
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex gap-2">
            <Button variant="glass" size="icon">
              <Share2 className="w-5 h-5" />
            </Button>
            <motion.div whileTap={{ scale: 0.9 }}>
              <Button
                variant="glass"
                size="icon"
                className={cn(isFavorite && "bg-primary/20 border-primary/30")}
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart
                  className={cn(
                    "w-5 h-5 transition-all",
                    isFavorite ? "fill-primary text-primary" : "text-foreground"
                  )}
                />
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom info on image */}
        <motion.div
          className="absolute bottom-6 left-4 right-4 z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex gap-2 mb-3">
            <Badge className="bg-white/95 text-foreground shadow-lg">
              {activity.category}
            </Badge>
            <Badge variant="age" className="bg-secondary/90 shadow-lg">
              {activity.ageRange}
            </Badge>
            {activity.rating && (
              <Badge className="bg-white/95 text-foreground shadow-lg flex items-center gap-1">
                <Star className="w-3 h-3 fill-warning text-warning" />
                {activity.rating}
              </Badge>
            )}
          </div>
          <h1 className="text-2xl font-bold font-display text-white drop-shadow-xl leading-tight">
            {activity.title}
          </h1>
        </motion.div>
      </div>

      {/* Content */}
      <div className="px-4 -mt-6 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="glass-card border-0 shadow-elevated">
            <CardContent className="p-5">
              {/* Provider */}
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border/50">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-foreground font-display">
                    {activity.providerName}
                  </p>
                  <p className="text-sm text-muted-foreground">Onaylı Sağlayıcı</p>
                </div>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                <div className="text-center p-3 bg-muted/50 rounded-2xl">
                  <MapPin className="w-5 h-5 mx-auto mb-1 text-primary" />
                  <p className="text-xs text-muted-foreground">{activity.location}</p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-2xl">
                  <Clock className="w-5 h-5 mx-auto mb-1 text-secondary" />
                  <p className="text-xs text-muted-foreground">90 dakika</p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-2xl">
                  <Users className="w-5 h-5 mx-auto mb-1 text-accent" />
                  <p className="text-xs text-muted-foreground">Maks 10</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="font-bold text-foreground mb-2 font-display text-lg">
                  Aktivite Hakkında
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Bu atölyede çocuklar yaratıcılıklarını keşfedecek, farklı resim
                  teknikleri öğrenecek ve kendi sanat eserlerini yaratacaklar.
                  Deneyimli eğitmenlerimiz eşliğinde güvenli ve eğlenceli bir ortamda
                  sanatla tanışacaklar.
                </p>
              </div>

              {/* Features */}
              <div className="mt-5 pt-5 border-t border-border/50">
                <h2 className="font-bold text-foreground mb-4 font-display">
                  Dahil Olanlar
                </h2>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Tüm sanat malzemeleri",
                    "Sertifika",
                    "Küçük grup (maks 10)",
                    "Fotoğraf paylaşımı",
                  ].map((feature, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-2 text-sm p-2 rounded-xl bg-success/5"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    >
                      <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                      <span className="text-muted-foreground text-xs">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Sessions */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="font-bold text-foreground mb-4 font-display text-lg flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Seanslar
          </h2>
          <div className="space-y-3">
            <AnimatePresence>
              {mockSessions.map((session, index) => (
                <motion.button
                  key={session.id}
                  onClick={() => setSelectedSession(session)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.05 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "w-full p-4 rounded-2xl border-2 transition-all duration-300 text-left",
                    selectedSession?.id === session.id
                      ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                      : "border-border/50 bg-card hover:border-primary/30 hover:shadow-soft"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-foreground font-display">
                          {session.date}
                        </span>
                        <Badge variant="category" className="text-[10px] py-0.5">
                          {session.dayName}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {session.time}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-xl text-gradient font-display">
                        ₺{session.price}
                      </p>
                      <p
                        className={cn(
                          "text-xs flex items-center gap-1 justify-end",
                          session.spotsLeft <= 3
                            ? "text-destructive"
                            : "text-muted-foreground"
                        )}
                      >
                        <Users className="w-3 h-3" />
                        {session.spotsLeft} yer kaldı
                      </p>
                    </div>
                  </div>
                  {selectedSession?.id === session.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      className="mt-3 pt-3 border-t border-primary/20"
                    >
                      <p className="text-xs text-primary font-medium">
                        ✓ Seans seçildi - Devam etmek için aşağıdaki butona tıklayın
                      </p>
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Bottom CTA */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 glass border-t border-white/30 p-4 z-50"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.8, type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="flex items-center justify-between gap-4 max-w-lg mx-auto">
          <div>
            <p className="text-sm text-muted-foreground">
              {selectedSession ? `${selectedSession.date}, ${selectedSession.time}` : "Seans seçin"}
            </p>
            <p className="text-2xl font-bold text-gradient font-display">
              {selectedSession ? `₺${selectedSession.price}` : `₺${activity.price}'den`}
            </p>
          </div>
          <Button
            size="lg"
            variant="hero"
            disabled={!selectedSession}
            onClick={handleBooking}
            className="min-w-[160px] h-14"
          >
            Rezervasyon Yap
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default ActivityDetail;
