
import React from 'react';
import type { Category, StoreItem } from './types';

const TargetIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" /></svg>;
const HeartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>;
const BriefcaseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h2zm5-1V5a1 1 0 00-1-1H9a1 1 0 00-1 1v1h4z" clipRule="evenodd" /></svg>;
const BookOpenIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 16c1.255 0 2.443-.29 3.5-.804V4.804zM14.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 0114.5 16c1.255 0 2.443-.29 3.5-.804v-10A7.968 7.968 0 0014.5 4z" /></svg>;


export const DEFAULT_CATEGORIES: Category[] = [
  { name: 'Personal', color: 'bg-indigo-500', icon: <TargetIcon /> },
  { name: 'Health', color: 'bg-red-500', icon: <HeartIcon /> },
  { name: 'Productivity', color: 'bg-amber-500', icon: <BriefcaseIcon /> },
  { name: 'Learning', color: 'bg-sky-500', icon: <BookOpenIcon /> },
];

export const STORE_ITEMS: StoreItem[] = [
  {
    id: 'football',
    name: 'Football',
    description: 'A standard-sized football, perfect for a pickup game or practicing your throws.',
    price: 150,
  },
  {
    id: 'sunglasses',
    name: 'Sunglasses',
    description: 'Stylish shades to protect your eyes from the sun and make you look cool.',
    price: 200,
  },
  {
    id: 'wizard_staff',
    name: 'Wizard Staff',
    description: 'A mystical staff imbued with ancient powers. Or it\'s just a cool-looking stick. You decide.',
    price: 500,
  },
];
