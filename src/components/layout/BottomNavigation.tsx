import { Home, MapPin, Heart, User, Calendar } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Ana Sayfa", path: "/" },
  { icon: Calendar, label: "Bugün", path: "/today" },
  { icon: MapPin, label: "Yakınımda", path: "/nearby" },
  { icon: Heart, label: "Favoriler", path: "/favorites" },
  { icon: User, label: "Profil", path: "/profile" },
];

export const BottomNavigation = () => {
  const location = useLocation();

  return (
    <nav className="bottom-nav">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className="relative flex flex-col items-center justify-center gap-0.5 px-4 py-2 min-w-[64px]"
            >
              <motion.div
                className={cn(
                  "relative p-2 rounded-2xl transition-colors duration-300",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
                whileTap={{ scale: 0.9 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-gradient-to-br from-primary/15 to-accent/10 rounded-2xl"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
                <Icon
                  className={cn(
                    "w-5 h-5 relative z-10 transition-all duration-300",
                    isActive && "drop-shadow-sm"
                  )}
                  strokeWidth={isActive ? 2.5 : 2}
                />
              </motion.div>
              <span
                className={cn(
                  "text-[10px] font-medium transition-all duration-300",
                  isActive ? "text-primary font-semibold" : "text-muted-foreground"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
