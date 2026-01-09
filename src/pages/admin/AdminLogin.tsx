import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Lock, User } from "lucide-react";
import { toast } from "sonner";

const AdminLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (username === "admin" && password === "admin") {
            toast.success("Giriş başarılı! Yönlendiriliyorsunuz...");
            // Simple automated session (in a real app, use auth tokens)
            localStorage.setItem("admin_session", "true");
            navigate("/admin");
        } else {
            toast.error("Hatalı kullanıcı adı veya şifre!");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/20 p-4">
            <div className="gradient-mesh fixed inset-0 -z-10" />

            <Card className="w-full max-w-md shadow-2xl border-0 glass-card">
                <CardHeader className="text-center space-y-2">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                        <Lock className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-bold font-display">Admin Girişi</CardTitle>
                    <CardDescription>
                        Devam etmek için lütfen giriş yapın
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    type="text"
                                    placeholder="Kullanıcı Adı"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    type="password"
                                    placeholder="Şifre"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>
                        <Button type="submit" className="w-full" size="lg">
                            Giriş Yap
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminLogin;
