import { Search, SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  value?: string;
  onChange?: (value: string) => void;
  onFilterClick?: () => void;
  placeholder?: string;
}

export const SearchBar = ({
  value = "",
  onChange,
  onFilterClick,
  placeholder = "Aktivite veya konum ara...",
}: SearchBarProps) => {
  return (
    <motion.div 
      className="flex items-center gap-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex-1 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="pl-12 pr-4 h-14 bg-white/80 backdrop-blur-md border-white/50 rounded-2xl shadow-soft focus-visible:ring-primary/30 focus-visible:shadow-glow transition-all duration-300"
        />
      </div>
      <motion.div whileTap={{ scale: 0.95 }}>
        <Button
          variant="soft"
          size="icon-lg"
          onClick={onFilterClick}
          className="flex-shrink-0 rounded-2xl shadow-soft h-14 w-14"
        >
          <SlidersHorizontal className="w-5 h-5" />
        </Button>
      </motion.div>
    </motion.div>
  );
};
