import { Activity } from "@/components/activities/ActivityCard";

// Import images
import artImage from "@/assets/activity-art.jpg";
import gymnasticsImage from "@/assets/activity-gymnastics.jpg";
import musicImage from "@/assets/activity-music.jpg";
import swimmingImage from "@/assets/activity-swimming.jpg";
import codingImage from "@/assets/activity-coding.jpg";
import danceImage from "@/assets/activity-dance.jpg";

export const categories = [
  { id: "all", name: "Tümü", emoji: "✨" },
  { id: "sports", name: "Spor", emoji: "⚽" },
  { id: "art", name: "Sanat", emoji: "🎨" },
  { id: "music", name: "Müzik", emoji: "🎵" },
  { id: "stem", name: "STEM", emoji: "🔬" },
  { id: "dance", name: "Dans", emoji: "💃" },
  { id: "language", name: "Dil", emoji: "🌍" },
  { id: "nature", name: "Doğa", emoji: "🌿" },
];

export const mockActivities: Activity[] = [
  {
    id: "1",
    title: "Yaratıcı Resim Atölyesi",
    category: "Sanat",
    ageRange: "4-8 yaş",
    price: 350,
    location: "Kadıköy, İstanbul",
    distance: "1.2 km",
    imageUrl: artImage,
    nextSession: "Bugün 14:00",
    spotsLeft: 3,
    isFavorite: true,
    rating: 4.8,
    providerName: "Küçük Sanatçılar Akademisi",
  },
  {
    id: "2",
    title: "Çocuk Jimnastik Kursu",
    category: "Spor",
    ageRange: "3-6 yaş",
    price: 500,
    location: "Beşiktaş, İstanbul",
    distance: "2.5 km",
    imageUrl: gymnasticsImage,
    nextSession: "Yarın 10:00",
    spotsLeft: 8,
    isFavorite: false,
    rating: 4.9,
    providerName: "Sportif Gelişim Merkezi",
  },
  {
    id: "3",
    title: "Müzik Dolu Eğlence - Enstrüman Tanıma",
    category: "Müzik",
    ageRange: "5-10 yaş",
    price: 400,
    location: "Şişli, İstanbul",
    distance: "3.1 km",
    imageUrl: musicImage,
    nextSession: "Cmt 11:00",
    spotsLeft: 12,
    isFavorite: false,
    rating: 4.7,
    providerName: "Notalar Müzik Okulu",
  },
  {
    id: "4",
    title: "Yüzme Dersleri - Başlangıç",
    category: "Spor",
    ageRange: "6-12 yaş",
    price: 600,
    location: "Ataşehir, İstanbul",
    distance: "4.0 km",
    imageUrl: swimmingImage,
    nextSession: "Pzt 16:00",
    spotsLeft: 5,
    isFavorite: true,
    rating: 4.9,
    providerName: "Aqua Kids Academy",
  },
  {
    id: "5",
    title: "Robotik ve Kodlama Atölyesi",
    category: "STEM",
    ageRange: "7-12 yaş",
    price: 550,
    location: "Maslak, İstanbul",
    distance: "5.2 km",
    imageUrl: codingImage,
    nextSession: "Prş 15:00",
    spotsLeft: 6,
    isFavorite: false,
    rating: 4.8,
    providerName: "Geleceğin Mühendisleri",
  },
  {
    id: "6",
    title: "Bale ve Modern Dans Kursu",
    category: "Dans",
    ageRange: "4-10 yaş",
    price: 450,
    location: "Levent, İstanbul",
    distance: "3.8 km",
    imageUrl: danceImage,
    nextSession: "Çrş 17:00",
    spotsLeft: 4,
    isFavorite: false,
    rating: 4.6,
    providerName: "Dans Sanat Merkezi",
  },
];

export interface Session {
  id: string;
  date: string;
  dayName: string;
  time: string;
  price: number;
  spotsLeft: number;
  totalSpots: number;
}

export const mockSessions: Session[] = [
  { id: "s1", date: "8 Ocak", dayName: "Çarşamba", time: "14:00 - 15:30", price: 350, spotsLeft: 3, totalSpots: 10 },
  { id: "s2", date: "10 Ocak", dayName: "Cuma", time: "14:00 - 15:30", price: 350, spotsLeft: 7, totalSpots: 10 },
  { id: "s3", date: "12 Ocak", dayName: "Pazar", time: "10:00 - 11:30", price: 380, spotsLeft: 2, totalSpots: 10 },
  { id: "s4", date: "15 Ocak", dayName: "Çarşamba", time: "14:00 - 15:30", price: 350, spotsLeft: 10, totalSpots: 10 },
  { id: "s5", date: "17 Ocak", dayName: "Cuma", time: "14:00 - 15:30", price: 350, spotsLeft: 8, totalSpots: 10 },
];
