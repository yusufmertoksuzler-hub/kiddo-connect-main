import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Clock, CheckCircle } from "lucide-react";
import { storage, SupportMessage } from "@/lib/storage";

const AdminMessages = () => {
    const [messages, setMessages] = useState<SupportMessage[]>([]);

    useEffect(() => {
        const loadMessages = () => setMessages(storage.getMessages());
        loadMessages();
        window.addEventListener('storage-update-messages', loadMessages);
        return () => window.removeEventListener('storage-update-messages', loadMessages);
    }, []);

    return (
        <AdminLayout>
            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold font-display text-foreground">Destek Mesajları</h1>
                    <p className="text-muted-foreground">Kullanıcılardan gelen yardım talepleri.</p>
                </div>

                <div className="grid gap-4">
                    {messages.length === 0 ? (
                        <Card className="border-0 shadow-card">
                            <CardContent className="p-12 text-center text-muted-foreground">
                                <Mail className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                <p>Henüz mesaj yok.</p>
                            </CardContent>
                        </Card>
                    ) : (
                        messages.map((msg) => (
                            <Card key={msg.id} className="border-0 shadow-sm">
                                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                                    <div>
                                        <CardTitle className="text-base font-bold flex items-center gap-2">
                                            {msg.subject}
                                            {msg.status === 'new' && (
                                                <Badge variant="destructive" className="text-[10px] h-5">Yeni</Badge>
                                            )}
                                        </CardTitle>
                                        <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                                            <Clock className="w-3 h-3" /> {msg.date} • {msg.topic}
                                        </p>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm">{msg.message}</p>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminMessages;
