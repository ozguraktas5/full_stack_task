import React from 'react';
import '../../styles/ui/Input.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  variant?: 'default' | 'search';
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClear?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', variant = 'default', icon, rightIcon, onClear, ...props }, ref) => {
    const baseClasses = 'input';
    const variantClasses = {
      default: 'input-default',
      search: 'input-search',
    };

    const classes = `${baseClasses} ${variantClasses[variant]} ${className}`.trim();

    return (
      <div className={`input-container ${variantClasses[variant]}`}>
        {icon && <div className="input-icon-left">{icon}</div>}
        <input
          className={classes}
          ref={ref}
          {...props}
        />
        {rightIcon && <div className="input-icon-right">{rightIcon}</div>}
        {onClear && props.value && (
          <button
            type="button"
            className="input-clear"
            onClick={onClear}
            aria-label="Temizle"
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M18 6L6 18M6 6L18 18" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
