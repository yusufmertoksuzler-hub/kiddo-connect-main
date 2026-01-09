import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Search } from "lucide-react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { ActivityCard } from "@/components/activities/ActivityCard";
import { mockActivities } from "@/data/mockData";
import { Input } from "@/components/ui/input";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<string[]>(
    mockActivities.filter((a) => a.isFavorite).map((a) => a.id)
  );
  const [searchValue, setSearchValue] = useState("");

  const handleFavoriteToggle = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const favoriteActivities = mockActivities
    .filter((a) => favorites.includes(a.id))
    .map((a) => ({ ...a, isFavorite: true }));

  return (
    <MobileLayout>
      {/* Gradient Background */}
      <div className="gradient-mesh fixed inset-0 -z-10" />

      <header className="px-4 pt-6 pb-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold font-display text-foreground flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-lg shadow-primary/30">
              <Heart className="w-5 h-5 text-primary-foreground fill-primary-foreground" />
            </div>
            Favorilerim
          </h1>
          <p className="text-sm text-muted-foreground ml-13">
            {favoriteActivities.length} aktivite kayıtlı
          </p>
        </motion.div>

        {favoriteActivities.length > 0 && (
          <motion.div 
            className="mt-4 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Favorilerde ara..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="pl-12 h-14 bg-white/80 backdrop-blur-md border-white/50 rounded-2xl shadow-soft"
            />
          </motion.div>
        )}
      </header>

      <section className="px-4 py-4">
        {favoriteActivities.length === 0 ? (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <motion.div 
              className="w-24 h-24 bg-gradient-to-br from-muted to-muted/50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-soft"
              animate={{ 
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 3,
                ease: "easeInOut"
              }}
            >
              <Heart className="w-12 h-12 text-muted-foreground" />
            </motion.div>
            <h2 className="text-xl font-bold text-foreground mb-3 font-display">
              Henüz favoriniz yok
            </h2>
            <p className="text-sm text-muted-foreground max-w-[280px] mx-auto leading-relaxed">
              Beğendiğiniz aktiviteleri kalp ikonuna tıklayarak favorilerinize
              ekleyebilirsiniz.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {favoriteActivities.map((activity, index) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                onFavoriteToggle={handleFavoriteToggle}
                index={index}
              />
            ))}
          </div>
        )}
      </section>
    </MobileLayout>
  );
};

export default FavoritesPage;
