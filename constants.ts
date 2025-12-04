import { BreathingPhase, PhaseConfig } from './types';

// ==========================================
// COLOR PALETTE (Deep Night & Bioluminescence)
// ==========================================
export const Theme = {
    Main: '#8CB8C6',          // Soft Air Blue-Green
    MainLight: '#BBD4DB',     // Misty Blue (hover / idle)
    // Exhale(날숨) / Idle
    Sub: '#A89F94',           // Warm Gray-Beige (안정·이완)
    // 배경 계열
    Background: '#1E2224',    // Deep Calm Blue-Gray
    Surface: '#2A2F31',       // Card / Panel
    // 텍스트
    TextPrimary: '#E7EBED',   // Soft White
    TextSecondary: '#B0B5B8', // Muted Gray
    // Hold(정지): 중립·균형·심박 안정
    Accent: '#C6B6D9',        // Muted Lavender
    // 성공/완료 등에 사용할 보조
    Success: '#7EBF9D',       // Desaturated Green (안정·균형·회복)
    Border: '#3A3F41',        // Soft Dark Border
};

// ==========================================
// BREATHING CONFIGURATION (4-7-8)
// ==========================================
export const BREATHING_CONFIG: Record<BreathingPhase, PhaseConfig> = {
  [BreathingPhase.IDLE]: { duration: 0, label: 'Ready', instruction: 'Set your goal' },
  [BreathingPhase.INHALE]: { duration: 4, label: 'Inhale', instruction: 'Breathe in...' },
  [BreathingPhase.HOLD]: { duration: 7, label: 'Hold', instruction: 'Hold breath...' },
  [BreathingPhase.EXHALE]: { duration: 8, label: 'Exhale', instruction: 'Release...' },
  [BreathingPhase.COMPLETED]: { duration: 0, label: 'Done', instruction: 'Completed' },
};

export const LOCAL_STORAGE_KEY = 'breathing_app_history_v1';