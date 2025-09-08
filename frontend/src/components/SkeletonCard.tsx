import React from 'react';

interface SkeletonCardProps {
  type?: 'user' | 'post';
  className?: string;
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({ type = 'user', className = '' }) => {
  if (type === 'user') {
    return (
      <div className={`skeleton-card skeleton-user ${className}`}>
        <div className="skeleton-avatar"></div>
        <div className="skeleton-content">
          <div className="skeleton-text skeleton-title"></div>
          <div className="skeleton-text skeleton-subtitle"></div>
          <div className="skeleton-text skeleton-email"></div>
        </div>
        <div className="skeleton-actions">
          <div className="skeleton-button"></div>
          <div className="skeleton-button"></div>
          <div className="skeleton-button"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`skeleton-card skeleton-post ${className}`}>
      <div className="skeleton-header">
        <div className="skeleton-text skeleton-title"></div>
        <div className="skeleton-badge"></div>
      </div>
      <div className="skeleton-meta">
        <div className="skeleton-avatar-small"></div>
        <div className="skeleton-text skeleton-meta-text"></div>
      </div>
      <div className="skeleton-content">
        <div className="skeleton-text skeleton-body"></div>
        <div className="skeleton-text skeleton-body"></div>
        <div className="skeleton-text skeleton-body short"></div>
      </div>
      <div className="skeleton-actions">
        <div className="skeleton-button"></div>
        <div className="skeleton-button"></div>
        <div className="skeleton-button"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
