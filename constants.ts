import { BreathingPhase, PhaseConfig } from './types';

// ==========================================
// COLOR PALETTE (Deep Night & Bioluminescence)
// ==========================================
export const Theme = {

    // Main: '#EB4C88',        // Primary Point (가장 주목도 높은 Gold)
    // MainLight: '#e79def',   // Gold 계열 Hover/Light tone
    // Sub: '#F7C426',         // 서브 포인트(Hot Pink)
    // Background: '#000C0D',  // 전체 배경 Deep Navy-Black
    // Surface: '#0E1020',     // 콘텐츠 영역/카드
    // TextPrimary: '#F5F6FA',     // 거의 화이트 (dark mode 가독성 최적)
    // TextSecondary: '#A7A9B5',   // muted 그레이
    // Accent: '#00A7CC',      // 시안 액센트 (호흡 단계 색으로도 적합)
    // AccentSecondary: '#AA23BB', // 보라 액센트(보조 강조)
    // Success: '#59D38C',     // 전체 팔레트와 어울리는 그린
    // Border: '#1A1D25',      // Background–Surface 중간톤
    //
    //
    // Main: '#FB9D39',         // 포인트 컬러(가장 높은 강도)
    // MainLight: '#FFC278',    // 밝은 오렌지(버튼 hover, inhale-ready)
    // Sub: '#DE90BC',          // 서브 포인트(soft pink accent)
    // Background: '#000205',   // 전체 배경(near black)
    // Surface: '#0A0D13',      // 카드/패널 (배경보다 약간 밝게)
    // TextPrimary: '#E5E7EB',  // 거의 흰색에 가까운 회색 (가독성 확보)
    // TextSecondary: '#B4B6C0',// 보조 텍스트 (뉴트럴 톤 다운)
    // Accent: '#816F90',       // 중간 톤 보랏빛 (호흡단계 강조배경·UI 포인트)
    // Success: '#6CCF8D',      // 전체 팔레트와 가장 잘 맞는 그린(중립적)
    // Border: '#1A1D24',       // Surface와 Background 사이 톤
    //
    //
    // Main: '#A05CAD',          // 메인 포인트 컬러
    // MainLight: '#D3B2DA',     // 메인 밝은톤(아이들/엑센터)
    // Sub: '#D3A986',           // 서브 포인트 컬러
    // Background: '#2A261E',    // 전체 배경
    // Surface: '#3A352D',       // 카드/패널 (배경보다 조금 밝게)
    // TextPrimary: '#E4E4E6',   // 기본 텍스트 (뉴트럴 톤)
    // TextSecondary: '#B9B9BC', // 보조 텍스트 (뉴트럴의 감소 버전)
    // Accent: '#A05CAD',        // 메인 컬러와 동일하게 통일 (호흡 Hold 단계 등)
    // Success: '#9EC28E',       // 톤에 맞는 자연스러운 그린 (너가 준 계열 없어서 가장 조화로운 값)
    // Border: '#4A453D',        // Surface보다 어둡고 Background보다 밝게 설정


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
    Accent: '#C6B6D9',        // Muted Lavender (Hold 단계 시각적으로 가장 안정적)
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
  [BreathingPhase.HOLD]: { duration: 6, label: 'Hold', instruction: 'Hold breath...' },
  [BreathingPhase.EXHALE]: { duration: 8, label: 'Exhale', instruction: 'Release...' },
  [BreathingPhase.COMPLETED]: { duration: 0, label: 'Done', instruction: 'Completed' },
};

export const LOCAL_STORAGE_KEY = 'breathing_app_history_v1';