import React, { useState } from 'react';
import { DailyStat } from '../types';
import { formatDuration, formatTimeKST } from '../services/storageService';
import { Theme } from '../constants';

interface DailyStatsProps {
  stats: DailyStat[];
}

const DailyStats: React.FC<DailyStatsProps> = ({ stats }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (stats.length === 0) {
    return (
      <div className="text-center py-8 opacity-50 text-sm" style={{ color: Theme.TextSecondary }}>
        <p>No breathing history yet.</p>
        <p className="mt-1">Complete a session to start tracking.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto mt-8 animate-fade-in">
      
      {/* Header Row */}
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-xl font-light" style={{ color: Theme.Main }}>
            &#10004; Daily Progress
          </h2>
          {/*<a*/}
          {/*  href="https://instagram.com/_noe.noe.noe_"*/}
          {/*  target="_blank"*/}
          {/*  rel="noopener noreferrer"*/}
          {/*  className="text-[14px] opacity-80"*/}
          {/*  style={{ color: Theme.Sub }}*/}
          {/*>*/}
          {/*  More tools like this @_noe.noe.noe_*/}
          {/*</a>*/}
        </div>

        <button
          onClick={() => setIsVisible(!isVisible)}
          className="text-sm underline decoration-slate-600 underline-offset-4 transition-colors hover:text-white"
          style={{ color: Theme.TextSecondary }}
        >
          {isVisible ? 'Hide History' : 'Show History'}
        </button>

      </div>

      {/* List Container */}
      {isVisible && (
        <div className="space-y-4">
          {stats.map((stat) => (
            <div 
              key={stat.date} 
              className="backdrop-blur-sm rounded-2xl border overflow-hidden"
              style={{ 
                backgroundColor: `${Theme.Surface}80`, // 50% opacity hex approximation
                borderColor: `${Theme.Border}80`
              }}
            >
              
              {/* Card Header (Date Summary) */}
              <div 
                className="p-4 border-b flex justify-between items-center"
                style={{ 
                  backgroundColor: `${Theme.Surface}CC`, // 80% opacity
                  borderColor: `${Theme.Border}80`
                }}
              >
                <div>
                  <h3 className="font-semibold" style={{ color: Theme.TextPrimary }}>
                    {stat.date}
                  </h3>
                  <p className="text-xs" style={{ color: Theme.TextSecondary }}>
                    {stat.sessions.length} session{stat.sessions.length > 1 ? 's' : ''}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold" style={{ color: Theme.Main }}>
                    {stat.count} Loops
                  </div>
                  <div className="text-xs font-mono opacity-60" style={{ color: Theme.Main }}>
                    {formatDuration(stat.totalDuration)}
                  </div>
                </div>
              </div>

              {/* Detailed Session List */}
              <div style={{ backgroundColor: '#1E22244D' }}> {/* Darker inner background */}
                {stat.sessions.map((session, index) => (
                  <div 
                    key={session.id}
                    className={`px-4 py-2 flex justify-between text-sm ${index !== stat.sessions.length - 1 ? 'border-b' : ''}`}
                    style={{ borderColor: `${Theme.Border}80` }}
                  >
                    <span className="font-mono" style={{ color: Theme.TextSecondary }}>
                      {formatTimeKST(session.timestamp)}
                    </span>
                    <span style={{ color: Theme.TextSecondary }}>
                      {session.totalCycles} loops
                    </span>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DailyStats;
