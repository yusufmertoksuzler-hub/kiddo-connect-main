import { v4 as uuidv4 } from 'uuid';
import { Activity } from '@/components/activities/ActivityCard';
import { mockActivities } from '@/data/mockData';

// Types
export interface Child {
  id: string;
  name: string;
  age: number;
  avatar: string;
  gender: 'boy' | 'girl' | 'other';
}

export interface UserProfile {
  name: string;
  email: string;
  location: string;
  isPremium: boolean;
  avatar?: string;
}

export interface Booking {
  id: string;
  activityId: string;
  activityTitle: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  timestamp: number;
}

export interface SupportMessage {
  id: string;
  subject: string;
  topic: string;
  message: string;
  date: string;
  status: 'new' | 'read';
}

// Default Data
const DEFAULT_USER: UserProfile = {
  name: "Beyza Yaman",
  email: "beyza.yaman@email.com",
  location: "Kadıköy, İstanbul",
  isPremium: true
};

const DEFAULT_CHILDREN: Child[] = [
  { id: "1", name: "Elif", age: 6, avatar: "👧", gender: 'girl' },
  { id: "2", name: "Can", age: 4, avatar: "👦", gender: 'boy' }
];

// Storage Keys
const KEYS = {
  USER: 'kiddo_user',
  CHILDREN: 'kiddo_children',
  BOOKINGS: 'kiddo_bookings',
  FAVORITES: 'kiddo_favorites',
  ACTIVITIES: 'kiddo_activities',
  MESSAGES: 'kiddo_messages'
};

// Helper Functions
export const storage = {
  getUser: (): UserProfile => {
    const data = localStorage.getItem(KEYS.USER);
    return data ? JSON.parse(data) : DEFAULT_USER;
  },

  updateUser: (user: Partial<UserProfile>) => {
    const current = storage.getUser();
    const updated = { ...current, ...user };
    localStorage.setItem(KEYS.USER, JSON.stringify(updated));
    window.dispatchEvent(new Event('storage-update-user'));
    return updated;
  },

  getChildren: (): Child[] => {
    const data = localStorage.getItem(KEYS.CHILDREN);
    return data ? JSON.parse(data) : DEFAULT_CHILDREN;
  },

  addChild: (child: Omit<Child, 'id'>) => {
    const children = storage.getChildren();
    const newChild = { ...child, id: uuidv4() };
    const updated = [...children, newChild];
    localStorage.setItem(KEYS.CHILDREN, JSON.stringify(updated));
    window.dispatchEvent(new Event('storage-update-children'));
    return newChild;
  },

  deleteChild: (id: string) => {
    const children = storage.getChildren();
    const updated = children.filter(c => c.id !== id);
    localStorage.setItem(KEYS.CHILDREN, JSON.stringify(updated));
    window.dispatchEvent(new Event('storage-update-children'));
  },

  getBookings: (): Booking[] => {
    const data = localStorage.getItem(KEYS.BOOKINGS);
    return data ? JSON.parse(data) : [];
  },

  addBooking: (booking: Omit<Booking, 'id' | 'timestamp' | 'status'>) => {
    const bookings = storage.getBookings();
    const newBooking: Booking = {
      ...booking,
      id: uuidv4(),
      status: 'confirmed',
      timestamp: Date.now()
    };
    const updated = [newBooking, ...bookings];
    localStorage.setItem(KEYS.BOOKINGS, JSON.stringify(updated));
    window.dispatchEvent(new Event('storage-update-bookings'));
    return newBooking;
  },

  getActivities: (): Activity[] => {
    const data = localStorage.getItem(KEYS.ACTIVITIES);
    return data ? JSON.parse(data) : mockActivities;
  },

  addActivity: (activity: Omit<Activity, 'id'>) => {
    const activities = storage.getActivities();
    const newActivity = { ...activity, id: uuidv4() };
    const updated = [newActivity, ...activities];
    localStorage.setItem(KEYS.ACTIVITIES, JSON.stringify(updated));
    window.dispatchEvent(new Event('storage-update-activities'));
    return newActivity;
  },

  deleteActivity: (id: string) => {
    const activities = storage.getActivities();
    const updated = activities.filter(a => a.id !== id);
    localStorage.setItem(KEYS.ACTIVITIES, JSON.stringify(updated));
    window.dispatchEvent(new Event('storage-update-activities'));
  },

  getMessages: (): SupportMessage[] => {
    const data = localStorage.getItem(KEYS.MESSAGES);
    return data ? JSON.parse(data) : [];
  },

  addMessage: (msg: Omit<SupportMessage, 'id' | 'date' | 'status'>) => {
    const messages = storage.getMessages();
    const newMessage: SupportMessage = {
      ...msg,
      id: uuidv4(),
      date: new Date().toLocaleDateString('tr-TR'),
      status: 'new'
    };
    const updated = [newMessage, ...messages];
    localStorage.setItem(KEYS.MESSAGES, JSON.stringify(updated));
    window.dispatchEvent(new Event('storage-update-messages'));
    return newMessage;
  },

  // Initialize defaults if empty
  init: () => {
    if (!localStorage.getItem(KEYS.USER)) {
      localStorage.setItem(KEYS.USER, JSON.stringify(DEFAULT_USER));
    }
    if (!localStorage.getItem(KEYS.CHILDREN)) {
      localStorage.setItem(KEYS.CHILDREN, JSON.stringify(DEFAULT_CHILDREN));
    }
    if (!localStorage.getItem(KEYS.ACTIVITIES)) {
      localStorage.setItem(KEYS.ACTIVITIES, JSON.stringify(mockActivities));
    }
  }
};

// Initialize immediately
storage.init();
