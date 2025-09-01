export enum Frequency {
  DAILY = 'Daily',
  WEEKLY = 'Weekly',
}

export interface Log {
  date: string; // YYYY-MM-DD format
}

export interface Habit {
  id: string;
  name: string;
  category: string;
  frequency: Frequency;
  createdAt: string; // ISO string
  logs: Log[];
}

export type Category = {
  name:string;
  color:string;
  icon: React.ReactNode;
};

export interface StoreItem {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface UserStats {
  username: string;
  level: number;
  xp: number;
  intelligence: number;
  strength: number;
  chi: number;
  charisma: number;
  avatar: {
    backgroundColor: string;
  };
}

export interface UserCredentials {
  username: string;
  password: string; // NOTE: In a real-world app, this would be a securely hashed password.
}
