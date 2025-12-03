import React, { useEffect, useState } from 'react';
import { BreathingPhase } from '../types';
import { Theme, BREATHING_CONFIG } from '../constants';

interface BreathingVisualProps {
  phase: BreathingPhase;
  timeLeft: number;
}

const BreathingVisual: React.FC<BreathingVisualProps> = ({ phase, timeLeft }) => {
  const [scale, setScale] = useState(1);
  const [color, setColor] = useState(Theme.MainLight);
  const [opacity, setOpacity] = useState(0.5);

  const config = BREATHING_CONFIG[phase];

  useEffect(() => {
    switch (phase) {
      case BreathingPhase.IDLE:
        setScale(1);
        setColor(Theme.MainLight);
        setOpacity(0.3);
        break;
      case BreathingPhase.INHALE:
        setScale(2.2); // Expand
        setColor(Theme.Main);
        setOpacity(1);
        break;
      case BreathingPhase.HOLD:
        setScale(2.2); // Stay expanded
        setColor(Theme.Accent); // Teal for hold
        setOpacity(0.9);
        break;
      case BreathingPhase.EXHALE:
        setScale(1); // Contract
        setColor(Theme.MainLight); // Return to neutral
        setOpacity(0.4);
        break;
      case BreathingPhase.COMPLETED:
        setScale(1.1);
        setColor(Theme.Success);
        setOpacity(0.8);
        break;
    }
  }, [phase]);

  // Transition duration logic
  const transitionDuration = phase === BreathingPhase.IDLE || phase === BreathingPhase.COMPLETED 
    ? '0.8s' 
    : `${config.duration}s`;
    
  // Timer circle visual calculation
  const maxStroke = 283; 
  const strokeDashoffset = config.duration > 0 
    ? maxStroke - ((config.duration - timeLeft) / config.duration) * maxStroke 
    : 0;

  return (
    <div className="relative flex items-center justify-center w-80 h-80 my-4">
      {/* Background Rings */}
      <div 
        className="absolute w-full h-full rounded-full border opacity-20"
        style={{ 
          borderColor: Theme.TextSecondary,
          transform: 'scale(1.2)' 
        }}
      />
      
      {/* The Breathing Circle */}
      <div
        className="rounded-full shadow-2xl flex items-center justify-center z-10 blur-sm"
        style={{
          width: '120px',
          height: '120px',
          backgroundColor: color,
          opacity: opacity,
          transform: `scale(${scale})`,
          transitionProperty: 'transform, background-color, opacity',
          transitionTimingFunction: 'cubic-bezier(0.4, 0.0, 0.2, 1)', 
          transitionDuration: transitionDuration,
          boxShadow: `0 0 50px ${color}40`
        }}
      >
      </div>

      {/* Center Number Overlay (Only Number) */}
      <div className="absolute z-20 flex flex-col items-center justify-center pointer-events-none drop-shadow-md">
        {(phase !== BreathingPhase.IDLE && phase !== BreathingPhase.COMPLETED) && (
          <span className="text-5xl font-light tabular-nums" style={{ color: Theme.TextPrimary }}>
            {Math.ceil(timeLeft)}
          </span>
        )}
      </div>

       {/* Progress Ring */}
       {(phase !== BreathingPhase.IDLE && phase !== BreathingPhase.COMPLETED) && (
        <svg className="absolute w-full h-full rotate-[-90deg] pointer-events-none opacity-30">
            <circle
                cx="50%"
                cy="50%"
                r="45%"
                fill="transparent"
                stroke={Theme.TextPrimary}
                strokeWidth="1.5"
                strokeDasharray={maxStroke}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 0.1s linear' }}
            />
        </svg>
       )}
    </div>
  );
};

export default BreathingVisual;