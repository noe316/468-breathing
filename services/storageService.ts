import { SessionRecord, DailyStat } from '../types';
import { LOCAL_STORAGE_KEY } from '../constants';

// Helper to get KST Date String (YYYY-MM-DD)
export const getKSTDateString = (timestamp: number): string => {
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat('en-CA', { // en-CA gives YYYY-MM-DD
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(date);
};

// Helper to get KST Time String (HH:MM)
export const formatTimeKST = (timestamp: number): string => {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Seoul',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(new Date(timestamp));
};

export const saveSession = (cycles: number, durationSec: number) => {
  const newRecord: SessionRecord = {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    totalCycles: cycles,
    totalDurationSec: durationSec,
  };

  const existingData = getHistory();
  const updatedData = [newRecord, ...existingData];
  
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedData));
  } catch (error) {
    console.error("Failed to save to local storage", error);
  }
};

export const getHistory = (): SessionRecord[] => {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to read from local storage", error);
    return [];
  }
};

export const getDailyStats = (): DailyStat[] => {
  const history = getHistory();
  const groups: Record<string, DailyStat> = {};

  history.forEach(record => {
    const kstDate = getKSTDateString(record.timestamp);
    
    if (!groups[kstDate]) {
      groups[kstDate] = {
        date: kstDate,
        count: 0,
        totalDuration: 0,
        sessions: []
      };
    }

    groups[kstDate].count += 1;
    groups[kstDate].totalDuration += record.totalDurationSec;
    groups[kstDate].sessions.push(record);
  });

  // Convert to array and sort by date descending
  return Object.values(groups).sort((a, b) => b.date.localeCompare(a.date));
};

export const formatDuration = (seconds: number): string => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
};
