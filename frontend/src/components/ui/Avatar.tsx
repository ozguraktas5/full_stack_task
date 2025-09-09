import React from 'react';
import '../../styles/ui/Avatar.css';

interface AvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ name, size = 'md', className = '' }) => {
  // İsimden baş harfleri al
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // İsme göre renk seç (tutarlı renk için hash kullan)
  const getColorFromName = (name: string) => {
    const colors = [
      'linear-gradient(135deg, #4ecdc4 0%, #45b7d1 100%)',
      'linear-gradient(135deg, #96ceb4 0%, #7fb069 100%)',
      'linear-gradient(135deg, #feca57 0%, #ff9ff3 100%)',
      'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)',
      'linear-gradient(135deg, #a8e6cf 0%, #4ecdc4 100%)',
      'linear-gradient(135deg, #ffd93d 0%, #6bcf7f 100%)',
      'linear-gradient(135deg, #ff8a80 0%, #ffab40 100%)',
      'linear-gradient(135deg, #81c784 0%, #64b5f6 100%)',
    ];
    
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const initials = getInitials(name);
  const backgroundColor = getColorFromName(name);

  return (
    <div 
      className={`avatar avatar-${size} ${className}`}
      style={{ background: backgroundColor }}
    >
      {initials}
    </div>
  );
};

export default Avatar;
