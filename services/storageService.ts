import { DailyLog } from '../types';

const STORAGE_KEY = 'wq_learning_logs';

export const getLogs = (): Record<string, DailyLog> => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (e) {
    console.error("Failed to parse logs", e);
    return {};
  }
};

export const getLogForDate = (date: string): DailyLog => {
  const logs = getLogs();
  if (logs[date]) {
    return logs[date];
  }
  return {
    date,
    studyMinutes: 0,
    alphaTemplates: 0,
    brainScore: 0,
    brainRank: 0,
    notes: ''
  };
};

export const saveLog = (log: DailyLog): void => {
  const logs = getLogs();
  logs[log.date] = log;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
};

export const getAllLogsArray = (): DailyLog[] => {
  const logs = getLogs();
  return Object.values(logs).sort((a, b) => a.date.localeCompare(b.date));
};