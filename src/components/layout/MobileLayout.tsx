import { ReactNode } from "react";
import { BottomNavigation } from "./BottomNavigation";

interface MobileLayoutProps {
  children: ReactNode;
  showBottomNav?: boolean;
}

export const MobileLayout = ({ children, showBottomNav = true }: MobileLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <main className={showBottomNav ? "pb-20" : ""}>
        {children}
      </main>
      {showBottomNav && <BottomNavigation />}
    </div>
  );
};
