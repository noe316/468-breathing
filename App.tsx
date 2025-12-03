import React, { useState, useEffect, useRef } from 'react';
import { BreathingPhase } from './types';
import { Theme, BREATHING_CONFIG } from './constants';
import { saveSession, getDailyStats } from './services/storageService';
import BreathingVisual from './components/BreathingVisual';
import DailyStats from './components/DailyStats';
import { StopCircle, Minus, Plus } from 'lucide-react';

const App: React.FC = () => {
  // State
  const [targetCycles, setTargetCycles] = useState<number>(1);
  const [currentCycle, setCurrentCycle] = useState<number>(0);
  const [phase, setPhase] = useState<BreathingPhase>(BreathingPhase.IDLE);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [stats, setStats] = useState(getDailyStats());
  
  const startTimeRef = useRef<number>(0);

  // Load stats on mount
  useEffect(() => {
    setStats(getDailyStats());
  }, []);

  // Timer Logic
  useEffect(() => {
    if (!isActive) return;

    const tick = () => {
      setTimeLeft((prev) => {
        if (prev <= 0.1) { // Threshold to switch phase
          handlePhaseTransition();
          return 0;
        }
        return prev - 0.1;
      });
    };

    const intervalId = window.setInterval(tick, 100);
    return () => window.clearInterval(intervalId);
  }, [isActive, phase]); 

  const handlePhaseTransition = () => {
    switch (phase) {
      case BreathingPhase.INHALE:
        setPhase(BreathingPhase.HOLD);
        setTimeLeft(BREATHING_CONFIG[BreathingPhase.HOLD].duration);
        break;
      case BreathingPhase.HOLD:
        setPhase(BreathingPhase.EXHALE);
        setTimeLeft(BREATHING_CONFIG[BreathingPhase.EXHALE].duration);
        break;
      case BreathingPhase.EXHALE:
        if (currentCycle + 1 >= targetCycles) {
          completeSession();
        } else {
          setCurrentCycle((prev) => prev + 1);
          setPhase(BreathingPhase.INHALE);
          setTimeLeft(BREATHING_CONFIG[BreathingPhase.INHALE].duration);
        }
        break;
      default:
        break;
    }
  };

  const startSession = () => {
    if (targetCycles < 1) return;
    setIsActive(true);
    setCurrentCycle(0);
    setPhase(BreathingPhase.INHALE);
    setTimeLeft(BREATHING_CONFIG[BreathingPhase.INHALE].duration);
    startTimeRef.current = Date.now();
  };

  const stopSession = () => {
    setIsActive(false);
    setPhase(BreathingPhase.IDLE);
    setTimeLeft(0);
    setCurrentCycle(0);
  };

  const completeSession = () => {
    setIsActive(false);
    setPhase(BreathingPhase.COMPLETED);
    
    // Calculate actual duration based on cycles
    const oneCycleDuration = 
      BREATHING_CONFIG.INHALE.duration + 
      BREATHING_CONFIG.HOLD.duration + 
      BREATHING_CONFIG.EXHALE.duration;
    
    const totalDuration = targetCycles * oneCycleDuration;

    saveSession(targetCycles, totalDuration);
    setStats(getDailyStats()); // Refresh list

    setTimeout(() => {
        setPhase(BreathingPhase.IDLE);
    }, 3000); 
  };

  const handleCycleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val) && val > 0 && val <= 50) {
      setTargetCycles(val);
    }
  };

  // Dynamic Styles
  const containerStyle = {
    backgroundColor: Theme.Background,
    color: Theme.TextPrimary,
    minHeight: '100vh',
  };

  const oneLoopTime = 18; // 4+6+8
  const totalTimeSeconds = targetCycles * oneLoopTime;

  return (
    <div style={containerStyle} className="flex flex-col items-center pt-6 pb-12 px-6 transition-colors duration-500 font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Header */}
      <header className="mb-10 text-center">
        <h1 
            className="text-3xl md:text-6xl font-semibold mb-2 tracking-tight flex items-center justify-center"
            style={{ color: Theme.Main }}
        >
            4<span className="text-slate-600 mx-2 font-thin">-</span>6<span className="text-slate-600 mx-2 font-thin">-</span>8
        </h1>
        <p className="text-slate-500 tracking-widest uppercase text-xs">Breath Flow</p>
      </header>

      {/* Main Visual */}
      <BreathingVisual phase={phase} timeLeft={timeLeft} />

      {/* Phase Label / Instruction (Moved below circle) */}
      <div className="h-16 mb-8 text-center flex flex-col justify-center">
        {isActive ? (
            <>
                <p 
                    className="text-3xl font-bold uppercase tracking-widest animate-fade-in"
                    style={{ 
                        color: phase === BreathingPhase.HOLD ? Theme.Accent : Theme.TextPrimary,
                    }}
                >
                    {BREATHING_CONFIG[phase].label}
                </p>
                <p className="text-sm font-mono uppercase tracking-widest mt-2 opacity-50" style={{ color: Theme.TextSecondary }}>
                    Loop {currentCycle + 1} / {targetCycles}
                </p>
            </>
        ) : phase === BreathingPhase.COMPLETED ? (
             <p className="text-3xl font-bold uppercase tracking-widest text-emerald-400">Completed</p>
        ) : (
            // Empty space or simple Ready text when IDLE
             <p className="text-3xl font-bold uppercase tracking-widest opacity-20">Ready</p>
        )}
      </div>

      {/* Controls */}
      {!isActive ? (
        <div 
          className="backdrop-blur-xl p-8 rounded-3xl border shadow-2xl w-full max-w-sm animate-in slide-in-from-bottom-4 fade-in duration-700"
          style={{ 
            backgroundColor: `${Theme.Surface}CC`, // 80% opacity
            borderColor: `${Theme.Border}80`
          }}
        >
          <label className="block text-sm font-medium mb-4 text-center" style={{ color: Theme.TextSecondary }}>
            Number of Loops
          </label>
          
          <div className="flex items-center justify-center mb-8">
            <button 
                onClick={() => setTargetCycles(Math.max(1, targetCycles - 1))}
                className="w-12 h-12 rounded-full transition flex items-center justify-center text-xl active:scale-95"
                style={{ backgroundColor: Theme.Border, color: Theme.TextPrimary }}
            >
                <Minus size={20} />
            </button>
            
            <input 
                className="w-24 text-center bg-transparent text-4xl font-bold border-none focus:ring-0 mx-4 tabular-nums outline-none appearance-none" 
                type="number" 
                value={targetCycles}
                onChange={handleCycleChange}
                style={{ color: Theme.TextPrimary }}
            />
            
            <button 
                onClick={() => setTargetCycles(Math.min(50, targetCycles + 1))}
                className="w-12 h-12 rounded-full transition flex items-center justify-center text-xl active:scale-95"
                style={{ backgroundColor: Theme.Border, color: Theme.TextPrimary }}
            >
                <Plus size={20} />
            </button>
          </div>
          
          <div className="text-center text-xs mb-8 space-y-1" style={{ color: Theme.TextSecondary }}>
            <p>Inhale: 4s • Hold: 6s • Exhale: 8s</p>
            <p>Total time: {totalTimeSeconds} seconds</p>
          </div>
          
          <button 
            onClick={startSession}
            className="w-full py-4 rounded-xl text-lg font-medium transition-all shadow-lg transform hover:-translate-y-0.5 active:scale-95"
            style={{ 
                backgroundColor: Theme.Sub, 
                color: '#fff',
                boxShadow: `0 0 20px ${Theme.Sub}50` 
            }}
          >
            Start Breathing
          </button>
        </div>
      ) : (
        <div className="flex gap-4 animate-in fade-in zoom-in duration-300 w-full max-w-sm">
          <button
            onClick={stopSession}
            className="w-full py-4 rounded-xl text-lg font-medium transition-all border flex items-center justify-center gap-2 group hover:bg-red-900/20"
            style={{ 
                borderColor: Theme.Border,
                color: Theme.TextSecondary
            }}
          >
            <StopCircle size={20} className="group-hover:text-red-400 transition-colors" />
            <span className="group-hover:text-red-400 transition-colors">Stop Session</span>
          </button>
        </div>
      )}

      {/* History Section */}
      <div 
        className="w-full flex justify-center mt-12 pt-10 border-t"
        style={{ borderColor: Theme.Border }}
      >
        <DailyStats stats={stats} />
      </div>

        <footer
            className="mt-10 text-[10px] uppercase tracking-widest opacity-30 flex flex-col items-center gap-1"
            style={{ color: Theme.TextSecondary }}
        >
            <a
                href="https://instagram.com/_noe.noe.noe_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] "
                style={{ color: Theme.TextPrimary }}
            >
                @_noe.noe.noe_
            </a>
            {new Date().getFullYear()} Minimal Breath
        </footer>
    </div>
  );
};

export default App;