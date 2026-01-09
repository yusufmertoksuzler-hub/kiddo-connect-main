import { MobileLayout } from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
    const navigate = useNavigate();
    return (
        <MobileLayout>
            <div className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-border/40 px-4 py-3">
                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                        onClick={() => navigate(-1)}
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </Button>
                    <h1 className="font-bold text-lg font-display">Ayarlar</h1>
                </div>
            </div>
            <div className="p-4 text-center text-muted-foreground">
                Ayarlar sayfası yapım aşamasında.
            </div>
        </MobileLayout>
    );
};
export default SettingsPage;
