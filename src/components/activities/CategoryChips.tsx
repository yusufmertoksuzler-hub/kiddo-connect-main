import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CategoryChipsProps {
  categories: { id: string; name: string; emoji?: string }[];
  selectedId?: string;
  onSelect?: (id: string) => void;
}

export const CategoryChips = ({ categories, selectedId, onSelect }: CategoryChipsProps) => {
  return (
    <div className="flex gap-4 overflow-x-auto no-scrollbar py-2 -mx-4 px-4 snap-x">
      {categories.map((category, index) => (
        <motion.button
          key={category.id}
          onClick={() => onSelect?.(category.id)}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.03 }}
          whileTap={{ scale: 0.95 }}
          className="flex flex-col items-center gap-2 min-w-[70px] snap-center"
        >
          <div
            className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-sm transition-all duration-300 border",
              selectedId === category.id
                ? "bg-gradient-primary border-transparent shadow-lg scale-110"
                : "bg-white border-border/50 hover:border-primary/50 hover:bg-white/80"
            )}
          >
            <span className="drop-shadow-sm">{category.emoji}</span>
          </div>
          <span
            className={cn(
              "text-xs font-medium transition-colors",
              selectedId === category.id ? "text-primary font-bold" : "text-muted-foreground"
            )}
          >
            {category.name}
          </span>
        </motion.button>
      ))}
    </div>
  );
};

