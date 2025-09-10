import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  message = 'Yükleniyor...', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'loading-spinner-sm',
    md: 'loading-spinner-md',
    lg: 'loading-spinner-lg',
  };

  return (
    <div className={`loading-spinner-container ${className}`}>
      <div className={`loading-spinner ${sizeClasses[size]}`}>
        <div className="spinner-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      {message && (
        <p className="loading-message">{message}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
