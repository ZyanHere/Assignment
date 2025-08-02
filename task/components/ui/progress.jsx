import React from 'react';
import { cn } from '@/lib/utils';

const Progress = React.forwardRef(({ 
  className, 
  value = 0, 
  max = 100,
  variant = 'default',
  size = 'md',
  ...props 
}, ref) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  const variantClasses = {
    default: 'bg-blue-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500'
  };

  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  };

  return (
    <div
      ref={ref}
      className={cn(
        'w-full bg-gray-200 rounded-full overflow-hidden',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      <div
        className={cn(
          'h-full transition-all duration-300 ease-in-out',
          variantClasses[variant]
        )}
        style={{ width: `${percentage}%` }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      />
    </div>
  );
});

Progress.displayName = 'Progress';

export { Progress }; 