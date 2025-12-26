
import React from 'react';

interface RiskMeterProps {
  score: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const RiskMeter: React.FC<RiskMeterProps> = ({ score, label, size = 'md' }) => {
  const radius = size === 'sm' ? 24 : size === 'md' ? 60 : size === 'lg' ? 85 : 110;
  const stroke = size === 'sm' ? 3 : size === 'md' ? 8 : size === 'lg' ? 10 : 12;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getColor = (s: number) => {
    if (s < 25) return '#10b981'; // Low (Green)
    if (s < 50) return '#f59e0b'; // Medium (Amber)
    if (s < 75) return '#f97316'; // High (Orange)
    return '#ef4444'; // Critical (Red)
  };

  const getLevelLabel = (s: number) => {
    if (s < 25) return 'Low Risk';
    if (s < 50) return 'Moderate';
    if (s < 75) return 'High Risk';
    return 'Critical';
  };

  const activeColor = getColor(score);

  return (
    <div className="flex flex-col items-center">
      <div className="relative inline-flex items-center justify-center">
        {/* Background Glow */}
        <div 
          className="absolute inset-0 rounded-full blur-[40px] opacity-20 transition-all duration-1000"
          style={{ backgroundColor: activeColor }}
        ></div>
        
        <svg
          height={radius * 2}
          width={radius * 2}
          className="transform -rotate-90 relative z-10"
        >
          {/* Track */}
          <circle
            stroke="rgba(255,255,255,0.03)"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          {/* Progress */}
          <circle
            stroke={activeColor}
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ 
              strokeDashoffset,
              transition: 'stroke-dashoffset 2s cubic-bezier(0.34, 1.56, 0.64, 1), stroke 0.5s ease',
              filter: `drop-shadow(0 0 12px ${activeColor}88)`
            }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>

        {/* Number in Donut */}
        <div className="absolute flex flex-col items-center z-20 text-center">
          <span 
            className={`font-black tracking-tighter leading-none animate-pulse ${
              size === 'sm' ? 'text-sm' : size === 'md' ? 'text-4xl' : size === 'lg' ? 'text-6xl' : 'text-7xl'
            }`}
            style={{ 
              color: 'white',
              textShadow: `0 0 30px ${activeColor}aa`
            }}
          >
            {score}
          </span>
          <span 
            className={`font-black uppercase tracking-[0.3em] mt-2 block ${
              size === 'sm' ? 'text-[5px]' : 'text-[10px]'
            }`} 
            style={{ color: activeColor }}
          >
            {getLevelLabel(score)}
          </span>
        </div>
      </div>
      {label && (
        <span className="mt-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">
          {label}
        </span>
      )}
    </div>
  );
};

export default RiskMeter;
