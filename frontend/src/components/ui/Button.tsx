import React from 'react';
import '../../styles/ui/Button.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'default', size = 'default', asChild = false, loading = false, disabled, ...props }, ref) => {
    const baseClasses = 'btn';
    const variantClasses = {
      default: 'btn-default',
      destructive: 'btn-destructive',
      outline: 'btn-outline',
      secondary: 'btn-secondary',
      ghost: 'btn-ghost',
      link: 'btn-link',
    };
    const sizeClasses = {
      default: 'btn-default-size',
      sm: 'btn-sm',
      lg: 'btn-lg',
      icon: 'btn-icon',
    };

    const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${loading ? 'loading' : ''} ${className}`.trim();

    return (
      <button
        className={classes}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {props.children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
