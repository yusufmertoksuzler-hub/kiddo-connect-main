import { useState, useEffect } from "react";
import { MapPin } from "lucide-react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { SearchBar } from "@/components/activities/SearchBar";
import { ActivityCard, Activity } from "@/components/activities/ActivityCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { storage } from "@/lib/storage";

const NearbyPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const loadData = () => {
      const all = storage.getActivities();
      setActivities(all);
      setFavorites(all.filter(a => a.isFavorite).map(a => a.id));
    }
    loadData();
    window.addEventListener('storage-update-activities', loadData);
    return () => window.removeEventListener('storage-update-activities', loadData);
  }, []);

  const handleFavoriteToggle = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const activitiesWithDistance = activities
    .map((a) => ({
      ...a,
      isFavorite: favorites.includes(a.id),
    }))
    .sort((a, b) => {
      const distA = parseFloat(a.distance?.replace(" km", "") || "0");
      const distB = parseFloat(b.distance?.replace(" km", "") || "0");
      return distA - distB;
    });

  return (
    <MobileLayout>
      <header className="bg-card px-4 pt-4 pb-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold font-display text-foreground">
            Yakınımdaki Aktiviteler
          </h1>
          <Badge variant="soft" className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            5 km
          </Badge>
        </div>
        <SearchBar
          value={searchValue}
          onChange={setSearchValue}
          placeholder="Aktivite ara..."
        />
      </header>

      {/* Map view */}
      <div className="h-64 bg-muted relative w-full overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d192698.61474938638!2d28.8717548!3d41.0054637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab5ef7c320515%3A0xd6e5b4b12c75f0a7!2zİstanbul!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full filter grayscale-[0.2]"
        ></iframe>
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur p-2 rounded-lg shadow-lg text-xs font-semibold text-primary">
          📍 Sizin Konumunuz
        </div>
      </div>

      <section className="px-4 py-4">
        <div className="section-header">
          <h2 className="section-title">En Yakın Aktiviteler</h2>
          <span className="text-sm text-muted-foreground">
            {activitiesWithDistance.length} sonuç
          </span>
        </div>
        <div className="space-y-3">
          {activitiesWithDistance.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              variant="horizontal"
              onFavoriteToggle={handleFavoriteToggle}
            />
          ))}
        </div>
      </section>
    </MobileLayout>
  );
};

export default NearbyPage;
