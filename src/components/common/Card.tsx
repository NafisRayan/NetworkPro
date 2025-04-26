import React, { ReactNode } from 'react';

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
  footer?: ReactNode;
  isLoading?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  title, 
  children, 
  className = '', 
  footer,
  isLoading = false
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden ${className}`}>
      {title && (
        <div className="px-4 py-3 border-b border-neutral-200">
          <h3 className="font-medium text-text">{title}</h3>
        </div>
      )}
      
      <div className={`p-4 ${isLoading ? 'animate-pulse' : ''}`}>
        {isLoading ? (
          <div className="space-y-3">
            <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
            <div className="h-4 bg-neutral-200 rounded w-1/2"></div>
            <div className="h-4 bg-neutral-200 rounded w-5/6"></div>
          </div>
        ) : (
          children
        )}
      </div>
      
      {footer && (
        <div className="px-4 py-3 bg-neutral-50 border-t border-neutral-200">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;