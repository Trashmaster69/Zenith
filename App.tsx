import React, { useState } from 'react';
import type { Habit, Log, StoreItem, UserStats, UserCredentials } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { getTodayDateString } from './utils/habits';
import { Header } from './components/Header';
import { AddHabitModal } from './components/AddHabitModal';
import { Dashboard } from './components/Dashboard';
import { Analytics } from './components/Analytics';
import { Store } from './components/Store';
import { User } from './components/User';
import { Auth } from './components/Auth';
import { v4 as uuidv4 } from 'uuid';

export type View = 'dashboard' | 'analytics' | 'store' | 'user';

const MainApp: React.FC<{ user: UserCredentials; onLogout: () => void }> = ({ user, onLogout }) => {
  
  const getInitialUserStats = (username: string): UserStats => ({
    username: username,
    level: 1,
    xp: 0,
    intelligence: 5,
    strength: 5,
    chi: 5,
    charisma: 5,
    avatar: {
      backgroundColor: '#6366f1', // Indigo 500
    },
  });

  const [habits, setHabits] = useLocalStorage<Habit[]>(`habits_${user.username}`, []);
  const [coinBalance, setCoinBalance] = useLocalStorage<number>(`coinBalance_${user.username}`, 500);
  const [inventory, setInventory] = useLocalStorage<string[]>(`inventory_${user.username}`, []);
  const [userStats, setUserStats] = useLocalStorage<UserStats>(`userStats_${user.username}`, getInitialUserStats(user.username));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState<View>('dashboard');

  const addHabit = (newHabit: Omit<Habit, 'id' | 'logs' | 'createdAt'>) => {
    setHabits(prev => [
      ...prev,
      {
        ...newHabit,
        id: uuidv4(),
        logs: [],
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  const XP_PER_HABIT = 15;
  const xpForNextLevel = (level: number) => level * 100;

  const toggleHabitCompletion = (habitId: string) => {
    const todayStr = getTodayDateString();
    const habit = habits.find(h => h.id === habitId);
    if (!habit) return;

    const alreadyCompleted = habit.logs.some(log => log.date === todayStr);

    if (!alreadyCompleted) {
      setCoinBalance(prevCoins => prevCoins + 10);
      setUserStats(prevStats => {
        const newXp = prevStats.xp + XP_PER_HABIT;
        const neededXp = xpForNextLevel(prevStats.level);
        if (newXp >= neededXp) {
          // Level up!
          return {
            ...prevStats,
            level: prevStats.level + 1,
            xp: newXp - neededXp,
            intelligence: prevStats.intelligence + 1,
            strength: prevStats.strength + 1,
            chi: prevStats.chi + 1,
            charisma: prevStats.charisma + 1,
          };
        }
        return { ...prevStats, xp: newXp };
      });
    }

    setHabits(prevHabits =>
      prevHabits.map(h => {
        if (h.id === habitId) {
          const newLogs = alreadyCompleted
            ? h.logs.filter(log => log.date !== todayStr)
            : [...h.logs, { date: todayStr }];
          return { ...h, logs: newLogs };
        }
        return h;
      })
    );
  };
  
  const handlePurchase = (item: StoreItem): boolean => {
    if (coinBalance >= item.price && !inventory.includes(item.id)) {
      setCoinBalance(prev => prev - item.price);
      setInventory(prev => [...prev, item.id]);
      return true;
    }
    return false;
  };

  const handleAvatarChange = (newColor: string) => {
    setUserStats(prev => ({
        ...prev,
        avatar: { ...prev.avatar, backgroundColor: newColor }
    }));
  };

  return (
    <div className="min-h-screen bg-base-200 text-neutral font-sans">
      <Header 
        onAddHabit={() => setIsModalOpen(true)}
        onLogout={onLogout}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />
      <main className="container mx-auto">
        {currentView === 'dashboard' && (
          <Dashboard habits={habits} onToggleComplete={toggleHabitCompletion} />
        )}
        {currentView === 'analytics' && <Analytics habits={habits} />}
        {currentView === 'store' && (
          <Store 
            coinBalance={coinBalance} 
            inventory={inventory} 
            onPurchase={handlePurchase}
          />
        )}
        {currentView === 'user' && (
          <User
            stats={userStats}
            coinBalance={coinBalance}
            onAvatarChange={handleAvatarChange}
          />
        )}
      </main>
      <AddHabitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddHabit={addHabit}
      />
    </div>
  );
};


const App: React.FC = () => {
    const [users, setUsers] = useLocalStorage<UserCredentials[]>('zenith_users', []);
    const [currentUser, setCurrentUser] = useLocalStorage<UserCredentials | null>('zenith_currentUser', null);

    const handleLogin = (credentials: UserCredentials): boolean => {
        const user = users.find(u => u.username === credentials.username && u.password === credentials.password);
        if(user) {
            setCurrentUser(user);
            return true;
        }
        return false;
    };

    const handleSignup = (credentials: UserCredentials): boolean => {
        const userExists = users.some(u => u.username === credentials.username);
        if(userExists) {
            return false;
        }
        setUsers(prev => [...prev, credentials]);
        setCurrentUser(credentials);
        return true;
    };

    const handleLogout = () => {
        setCurrentUser(null);
    };

    if(!currentUser) {
        return <Auth onLogin={handleLogin} onSignup={handleSignup} />;
    }

    return <MainApp user={currentUser} onLogout={handleLogout} />;
};


export default App;
