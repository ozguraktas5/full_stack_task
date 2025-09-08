import React from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  icon, 
  color, 
  trend,
  className = '' 
}) => {
  return (
    <div className={`stats-card ${className}`}>
      <div className="stats-icon" style={{ backgroundColor: color }}>
        {icon}
      </div>
      <div className="stats-content">
        <h3>{value}</h3>
        <p>{title}</p>
        {trend && (
          <div className={`stats-trend ${trend.isPositive ? 'positive' : 'negative'}`}>
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="trend-icon"
            >
              <path 
                d={trend.isPositive ? "M7 14L12 9L17 14" : "M7 10L12 15L17 10"} 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
