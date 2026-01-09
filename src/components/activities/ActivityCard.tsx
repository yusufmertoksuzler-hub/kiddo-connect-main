import { Heart, MapPin, Clock, Users, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface Activity {
  id: string;
  title: string;
  category: string;
  ageRange: string;
  price: number;
  location: string;
  distance?: string;
  imageUrl: string;
  nextSession?: string;
  spotsLeft?: number;
  isFavorite?: boolean;
  rating?: number;
  providerName: string;
}

interface ActivityCardProps {
  activity: Activity;
  variant?: "default" | "horizontal" | "featured";
  onFavoriteToggle?: (id: string) => void;
  index?: number;
}

export const ActivityCard = ({ activity, variant = "default", onFavoriteToggle, index = 0 }: ActivityCardProps) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onFavoriteToggle?.(activity.id);
  };

  if (variant === "horizontal") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
      >
        <Link to={`/activity/${activity.id}`} className="block">
          <div className="activity-card flex gap-4 p-3">
            <div className="relative w-28 h-28 flex-shrink-0 rounded-2xl overflow-hidden">
              <img
                src={activity.imageUrl}
                alt={activity.title}
                className="w-full h-full object-cover img-zoom"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <Badge variant="age" className="absolute bottom-2 left-2 text-[10px] px-2 py-0.5 backdrop-blur-md bg-white/90">
                {activity.ageRange}
              </Badge>
            </div>
            <div className="flex-1 min-w-0 py-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] text-primary uppercase tracking-wider font-bold">
                    {activity.category}
                  </span>
                  {activity.rating && (
                    <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
                      <Star className="w-3 h-3 fill-warning text-warning" />
                      {activity.rating}
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-sm text-foreground line-clamp-2 font-display leading-tight">
                  {activity.title}
                </h3>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  <span className="truncate">{activity.distance || activity.location}</span>
                </div>
                <span className="text-primary font-bold text-lg">₺{activity.price}</span>
              </div>
            </div>
            <motion.button
              onClick={handleFavoriteClick}
              className="flex-shrink-0 self-start p-2"
              whileTap={{ scale: 0.8 }}
            >
              <Heart
                className={cn(
                  "w-5 h-5 transition-all duration-300",
                  activity.isFavorite
                    ? "fill-primary text-primary scale-110"
                    : "text-muted-foreground hover:text-primary"
                )}
              />
            </motion.button>
          </div>
        </Link>
      </motion.div>
    );
  }

  if (variant === "featured") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Link to={`/activity/${activity.id}`} className="block">
          <div className="activity-card relative overflow-hidden group">
            <div className="aspect-[16/10] relative overflow-hidden">
              <motion.img
                src={activity.imageUrl}
                alt={activity.title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {/* Floating favorite button */}
              <motion.button
                onClick={handleFavoriteClick}
                className={cn(
                  "absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md shadow-lg transition-colors",
                  activity.isFavorite ? "bg-primary/20" : "bg-white/90"
                )}
                whileTap={{ scale: 0.85 }}
                whileHover={{ scale: 1.1 }}
              >
                <Heart
                  className={cn(
                    "w-5 h-5 transition-all",
                    activity.isFavorite
                      ? "fill-primary text-primary"
                      : "text-foreground"
                  )}
                />
              </motion.button>

              {/* Tags */}
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge className="bg-white/95 text-foreground backdrop-blur-md shadow-sm font-semibold">
                  {activity.category}
                </Badge>
                <Badge variant="age" className="backdrop-blur-md bg-secondary/90 shadow-sm">
                  {activity.ageRange}
                </Badge>
              </div>

              {/* Bottom content */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-center gap-2 mb-2">
                  {activity.rating && (
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/20 backdrop-blur-md">
                      <Star className="w-3.5 h-3.5 fill-warning text-warning" />
                      <span className="text-white text-xs font-bold">{activity.rating}</span>
                    </div>
                  )}
                  {activity.spotsLeft && activity.spotsLeft <= 5 && (
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-destructive/80 backdrop-blur-md">
                      <Users className="w-3 h-3 text-white" />
                      <span className="text-white text-xs font-bold">Son {activity.spotsLeft} yer!</span>
                    </div>
                  )}
                </div>
                <h3 className="font-bold text-xl text-white line-clamp-2 font-display drop-shadow-lg mb-1">
                  {activity.title}
                </h3>
                <div className="flex items-center gap-2 text-white/90 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>{activity.location}</span>
                </div>
              </div>
            </div>

            {/* Info bar */}
            <div className="p-4 flex items-center justify-between bg-gradient-to-r from-muted/50 to-muted/30">
              <div>
                <p className="text-xs text-muted-foreground font-medium">{activity.providerName}</p>
                {activity.nextSession && (
                  <p className="text-sm text-foreground font-semibold flex items-center gap-1.5 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-secondary" />
                    {activity.nextSession}
                  </p>
                )}
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-gradient font-display">₺{activity.price}</span>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  // Default card variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link to={`/activity/${activity.id}`} className="block group">
        <div className="activity-card">
          <div className="aspect-[4/3] relative overflow-hidden rounded-t-3xl">
            <motion.img
              src={activity.imageUrl}
              alt={activity.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.5 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <motion.button
              onClick={handleFavoriteClick}
              className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-soft"
              whileTap={{ scale: 0.8 }}
            >
              <Heart
                className={cn(
                  "w-4 h-4 transition-all duration-300",
                  activity.isFavorite
                    ? "fill-primary text-primary"
                    : "text-muted-foreground group-hover:text-primary"
                )}
              />
            </motion.button>
            
            <Badge variant="age" className="absolute top-2.5 left-2.5 text-[10px] backdrop-blur-md bg-white/90 shadow-sm">
              {activity.ageRange}
            </Badge>
          </div>
          
          <div className="p-4">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] text-primary uppercase tracking-wider font-bold">
                {activity.category}
              </span>
              {activity.rating && (
                <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
                  <Star className="w-3 h-3 fill-warning text-warning" />
                  {activity.rating}
                </span>
              )}
            </div>
            <h3 className="font-bold text-sm text-foreground line-clamp-2 font-display leading-snug mb-2">
              {activity.title}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
              <MapPin className="w-3 h-3" />
              <span className="truncate">{activity.location}</span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-border/50">
              <span className="text-lg font-bold text-gradient font-display">₺{activity.price}</span>
              {activity.nextSession && (
                <span className="text-[11px] text-muted-foreground flex items-center gap-1 bg-muted px-2 py-1 rounded-full">
                  <Clock className="w-3 h-3" />
                  {activity.nextSession}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
