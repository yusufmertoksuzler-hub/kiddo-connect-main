import { useState } from "react";
import { Calendar, ChevronRight } from "lucide-react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { ActivityCard } from "@/components/activities/ActivityCard";
import { mockActivities } from "@/data/mockData";
import { cn } from "@/lib/utils";

const days = [
  { date: "8", day: "Çrş", isToday: true },
  { date: "9", day: "Prş", isToday: false },
  { date: "10", day: "Cum", isToday: false },
  { date: "11", day: "Cmt", isToday: false },
  { date: "12", day: "Paz", isToday: false },
  { date: "13", day: "Pzt", isToday: false },
  { date: "14", day: "Sal", isToday: false },
];

const TodayPage = () => {
  const [selectedDay, setSelectedDay] = useState("8");
  const [favorites, setFavorites] = useState<string[]>([]);

  const handleFavoriteToggle = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const activitiesWithFavorites = mockActivities.map((a) => ({
    ...a,
    isFavorite: favorites.includes(a.id),
  }));

  return (
    <MobileLayout>
      <header className="bg-card px-4 pt-4 pb-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-muted-foreground">Ocak 2026</p>
            <h1 className="text-xl font-bold font-display text-foreground flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Bugün
            </h1>
          </div>
          <button className="text-primary text-sm font-medium flex items-center">
            Takvim
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Day Selector */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4">
          {days.map((d) => (
            <button
              key={d.date}
              onClick={() => setSelectedDay(d.date)}
              className={cn(
                "flex flex-col items-center min-w-[48px] py-2 px-3 rounded-xl transition-all duration-200",
                selectedDay === d.date
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              <span className="text-[10px] font-medium uppercase">{d.day}</span>
              <span className="text-lg font-bold">{d.date}</span>
              {d.isToday && (
                <span
                  className={cn(
                    "w-1.5 h-1.5 rounded-full mt-0.5",
                    selectedDay === d.date ? "bg-primary-foreground" : "bg-primary"
                  )}
                />
              )}
            </button>
          ))}
        </div>
      </header>

      <section className="px-4 py-4">
        <div className="section-header">
          <h2 className="section-title">
            {selectedDay === "8" ? "Bugünkü" : `${selectedDay} Ocak`} Aktiviteler
          </h2>
          <span className="text-sm text-muted-foreground">
            {activitiesWithFavorites.length} seans
          </span>
        </div>

        <div className="space-y-4">
          {/* Time slots */}
          <div>
            <p className="text-xs text-muted-foreground font-medium mb-2 uppercase tracking-wide">
              Sabah (09:00 - 12:00)
            </p>
            <div className="space-y-2">
              {activitiesWithFavorites.slice(0, 2).map((activity) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  variant="horizontal"
                  onFavoriteToggle={handleFavoriteToggle}
                />
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs text-muted-foreground font-medium mb-2 uppercase tracking-wide">
              Öğleden Sonra (12:00 - 17:00)
            </p>
            <div className="space-y-2">
              {activitiesWithFavorites.slice(2, 5).map((activity) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  variant="horizontal"
                  onFavoriteToggle={handleFavoriteToggle}
                />
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs text-muted-foreground font-medium mb-2 uppercase tracking-wide">
              Akşam (17:00+)
            </p>
            <div className="space-y-2">
              {activitiesWithFavorites.slice(5).map((activity) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  variant="horizontal"
                  onFavoriteToggle={handleFavoriteToggle}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </MobileLayout>
  );
};

export default TodayPage;
