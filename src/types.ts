export type RiskLevel = 'HIGH RISK' | 'MEDIUM RISK' | 'LOW RISK';

export type ChipType = 'danger' | 'warning' | 'safe' | 'neutral';

export interface IndicatorChip {
  text: string;
  type: ChipType;
}

export interface HeuristicItem {
  label: string;
  detail: string;
}

export interface SafetyRecommendation {
  label: string;
  detail: string;
}

export interface KeypadWarning {
  title: string;
  riskHeader: string;
  summary: string;
  instruction: string;
}

export interface ScenarioData {
  id: string;
  title: string;
  subtitle: string;
  text: string;
  risk: RiskLevel;
  category: string;
  chips: IndicatorChip[];
  heuristics: HeuristicItem[];
  recommendations: SafetyRecommendation[];
  keypadWarning: KeypadWarning;
}

export interface ScanRecord {
  id: string;
  timestamp: string;
  relativeTime: string;
  message: string;
  risk: RiskLevel;
  category: string;
  indicatorCount: number;
  scenarioKey?: string;
}

export type ActiveView = 'dashboard' | 'analyzer' | 'keypad' | 'history' | 'awareness';
export type AppMode = 'web' | 'keypad';
