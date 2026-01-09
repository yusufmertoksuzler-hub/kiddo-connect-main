import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Calendar, Clock, MapPin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { storage, Booking } from "@/lib/storage";

const BookingsPage = () => {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState<Booking[]>(storage.getBookings());

    useEffect(() => {
        const handleBookingsUpdate = () => setBookings(storage.getBookings());
        window.addEventListener('storage-update-bookings', handleBookingsUpdate);
        return () => window.removeEventListener('storage-update-bookings', handleBookingsUpdate);
    }, []);

    return (
        <MobileLayout>
            <div className="gradient-mesh fixed inset-0 -z-10" />

            {/* Header */}
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
                    <h1 className="font-bold text-lg font-display">Rezervasyonlarım</h1>
                </div>
            </div>

            <div className="p-4 space-y-4">
                {bookings.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                            <Calendar className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Henüz rezervasyonunuz yok</h3>
                        <p className="text-muted-foreground text-sm mb-6">
                            Çocuğunuz için harika aktiviteler bulup rezervasyon yapabilirsiniz.
                        </p>
                        <Link to="/">
                            <Button>Aktiviteleri Keşfet</Button>
                        </Link>
                    </div>
                ) : (
                    bookings.map((booking, index) => (
                        <motion.div
                            key={booking.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="glass-card border-0 shadow-sm overflow-hidden">
                                <CardContent className="p-0">
                                    <div className="p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-bold text-foreground font-display text-lg">
                                                {booking.activityTitle}
                                            </h3>
                                            <Badge variant={booking.status === 'confirmed' ? 'success' : 'secondary'}>
                                                {booking.status === 'confirmed' ? 'Onaylandı' : 'Beklemede'}
                                            </Badge>
                                        </div>

                                        <div className="space-y-2 mt-3">
                                            <div className="flex items-center text-sm text-muted-foreground">
                                                <Calendar className="w-4 h-4 mr-2" />
                                                {booking.date}
                                            </div>
                                            <div className="flex items-center text-sm text-muted-foreground">
                                                <Clock className="w-4 h-4 mr-2" />
                                                {booking.time}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-muted/30 px-4 py-3 flex justify-between items-center border-t border-border/30">
                                        <span className="text-xs text-muted-foreground">Ref: {booking.id.slice(0, 8)}</span>
                                        <Button variant="outline" size="sm" className="h-8">Detaylar</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))
                )}
            </div>
        </MobileLayout>
    );
};

export default BookingsPage;
