export interface DailyLog {
  date: string; // ISO Format YYYY-MM-DD
  studyMinutes: number;
  alphaTemplates: number;
  brainScore: number;
  brainRank: number;
  notes: string;
}

export interface SummaryStats {
  totalStudyMinutes: number;
  totalAlphaTemplates: number;
  currentStreak: number;
}