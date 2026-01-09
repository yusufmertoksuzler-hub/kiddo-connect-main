import { useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, Send, Headphones } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { storage } from "@/lib/storage";

const HelpPage = () => {
    const navigate = useNavigate();
    const [subject, setSubject] = useState("");
    const [topic, setTopic] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!subject || !topic || !message) {
            toast.error("Lütfen tüm alanları doldurun.");
            return;
        }

        storage.addMessage({
            subject,
            topic,
            message
        });

        toast.success("Mesajınız destek ekibine iletildi. En kısa sürede dönüş yapacağız.");
        navigate("/profile");
    };

    return (
        <MobileLayout>
            <div className="gradient-mesh fixed inset-0 -z-10" />

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
                    <h1 className="font-bold text-lg font-display">Yardım & Destek</h1>
                </div>
            </div>

            <div className="p-4 max-w-lg mx-auto">
                <div className="text-center mb-8 bg-white/40 backdrop-blur-md p-6 rounded-3xl shadow-sm border border-white/50">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 p-4">
                        <div className="w-full h-full bg-primary rounded-full flex items-center justify-center animate-pulse-slow">
                            <Headphones className="w-6 h-6 text-primary-foreground" />
                        </div>
                    </div>
                    <h2 className="text-xl font-bold font-display text-foreground">Size nasıl yardımcı olabiliriz?</h2>
                    <p className="text-muted-foreground text-sm mt-2">
                        Geri bildirimleriniz bizim için çok değerli.
                    </p>
                </div>

                <div className="bg-white/60 backdrop-blur-sm p-6 rounded-3xl shadow-lg border border-white/50">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium ml-1">Konu Başlığı</label>
                            <Select onValueChange={setTopic}>
                                <SelectTrigger className="bg-white/80 border-border/50 h-11">
                                    <SelectValue placeholder="Konu seçin" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="reservation">Rezervasyon Sorunları</SelectItem>
                                    <SelectItem value="payment">Ödeme İşlemleri</SelectItem>
                                    <SelectItem value="account">Hesap İşlemleri</SelectItem>
                                    <SelectItem value="other">Diğer</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium ml-1">Başlık</label>
                            <Input
                                placeholder="Örn: Rezervasyonum görünmüyor"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                className="bg-white/80 border-border/50 h-11"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium ml-1">Mesajınız</label>
                            <Textarea
                                placeholder="Detaylı açıklama..."
                                className="min-h-[120px] bg-white/80 border-border/50 resize-none p-4"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </div>

                        <Button type="submit" className="w-full h-12 text-base rounded-xl mt-2" size="lg">
                            <Send className="w-4 h-4 mr-2" />
                            Gönder
                        </Button>
                    </form>
                </div>
            </div>
        </MobileLayout>
    );
};

export default HelpPage;
