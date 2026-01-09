import { useState, useEffect } from "react";
import { MapPin, Bell, ChevronRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { SearchBar } from "@/components/activities/SearchBar";
import { CategoryChips } from "@/components/activities/CategoryChips";
import { ActivityCard, Activity } from "@/components/activities/ActivityCard";
import { categories } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { storage } from "@/lib/storage";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

const districts = [
  "Kadıköy", "Beşiktaş", "Şişli", "Üsküdar", "Maltepe", "Ataşehir",
  "Bakırköy", "Beykoz", "Beyoğlu", "Sarıyer", "Fatih", "Kartal"
];

const Index = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [location, setLocation] = useState("Kadıköy, İstanbul");
  const [openLocation, setOpenLocation] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const loadData = () => {
      const allActivities = storage.getActivities();
      setActivities(allActivities);
      setFavorites(allActivities.filter(a => a.isFavorite).map(a => a.id));
    };
    loadData();
    window.addEventListener('storage-update-activities', loadData);
    return () => window.removeEventListener('storage-update-activities', loadData);
  }, []);

  const handleFavoriteToggle = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };


  const handleLocationSelect = (district: string) => {
    setLocation(`${district}, İstanbul`);
    setOpenLocation(false);
  };

  const activitiesWithFavorites = activities.map((a) => ({
    ...a,
    isFavorite: favorites.includes(a.id),
  }));

  const filteredActivities = activitiesWithFavorites.filter((a) => {
    const matchesCategory =
      selectedCategory === "all" ||
      a.category.toLowerCase() ===
      categories.find((c) => c.id === selectedCategory)?.name.toLowerCase();

    const matchesSearch =
      a.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      a.location.toLowerCase().includes(searchValue.toLowerCase()) ||
      a.category.toLowerCase().includes(searchValue.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const featuredActivities = activitiesWithFavorites.slice(0, 3);
  const todayActivities = activitiesWithFavorites.filter((a) =>
    a.nextSession?.includes("Bugün")
  );

  return (
    <MobileLayout>
      {/* Gradient Mesh Background */}
      <div className="gradient-mesh fixed inset-0 -z-10" />

      {/* Floating Orbs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="orb orb-primary w-96 h-96 -top-48 -right-48" />
        <div className="orb orb-secondary w-64 h-64 top-1/2 -left-32" />
        <div className="orb orb-accent w-48 h-48 bottom-32 right-0" />
      </div>

      {/* Header */}
      <header className="relative px-4 pt-6 pb-8">
        <motion.div
          className="flex items-center justify-between mb-5"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div>
            <motion.p
              className="text-sm text-muted-foreground flex items-center gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Merhaba 👋
            </motion.p>
            <h1 className="text-2xl font-bold font-display text-foreground">
              Aktivite <span className="text-gradient">Keşfet</span>
            </h1>
          </div>
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <Button variant="ghost" size="icon" className="relative bg-white/80 backdrop-blur-md shadow-soft rounded-2xl h-11 w-11">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-primary rounded-full animate-pulse ring-2 ring-white" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Location */}
        <Dialog open={openLocation} onOpenChange={setOpenLocation}>
          <DialogTrigger asChild>
            <motion.button
              className="flex items-center gap-2 text-sm text-muted-foreground mb-5 hover:text-foreground transition-colors bg-white/60 backdrop-blur-md px-4 py-2 rounded-full shadow-sm"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              whileTap={{ scale: 0.98 }}
            >
              <MapPin className="w-4 h-4 text-primary" />
              <span className="font-medium">{location}</span>
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Konum Seçin</DialogTitle>
            </DialogHeader>
            <ScrollArea className="h-[300px] w-full rounded-md border p-4">
              <div className="flex flex-col gap-2">
                {districts.map((district) => (
                  <Button
                    key={district}
                    variant="ghost"
                    className="justify-start text-left font-normal"
                    onClick={() => handleLocationSelect(district)}
                  >
                    <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                    {district}, İstanbul
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>

        {/* Search */}
        <SearchBar
          value={searchValue}
          onChange={setSearchValue}
          onFilterClick={() => { }}
        />
      </header>

      {/* Categories */}
      <section className="px-4 py-3">
        <CategoryChips
          categories={categories}
          selectedId={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </section>

      {/* Featured Activities Horizontal Slider */}
      <section className="px-4 mb-8">
        <motion.div
          className="section-header"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="section-title flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Öne Çıkanlar
          </h2>
          <Button variant="ghost" size="sm" className="text-primary font-semibold">
            Tümü
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </motion.div>

        <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 snap-x hide-scrollbar">
          {featuredActivities.map((activity, index) => (
            <div key={activity.id} className="min-w-[300px] snap-center">
              <ActivityCard
                activity={activity}
                variant="featured"
                onFavoriteToggle={handleFavoriteToggle}
                index={index}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Today's Activities */}
      {todayActivities.length > 0 && (
        <section className="px-4 mb-8">
          <div className="section-header">
            <h2 className="section-title">🔥 Bugün</h2>
            <Button variant="ghost" size="sm" className="text-primary font-semibold">
              Tümü
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="space-y-3">
            {todayActivities.map((activity, index) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                variant="horizontal"
                onFavoriteToggle={handleFavoriteToggle}
                index={index}
              />
            ))}
          </div>
        </section>
      )}

      {/* All Activities Grid */}
      <section className="px-4 pb-8">
        <div className="section-header">
          <h2 className="section-title">Keşfet</h2>
          <span className="text-sm text-muted-foreground font-medium bg-muted px-3 py-1 rounded-full">
            {filteredActivities.length} aktivite
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {filteredActivities.slice(1).map((activity, index) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              onFavoriteToggle={handleFavoriteToggle}
              index={index}
            />
          ))}
        </div>
      </section>
    </MobileLayout>
  );
};

export default Index;
