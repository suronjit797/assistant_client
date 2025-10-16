import React from 'react';
import { Card } from 'antd';

interface ModernCardProps {
  children: React.ReactNode;
  title?: string;
  extra?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'gradient' | 'glass' | 'minimal';
  hoverable?: boolean;
  loading?: boolean;
  size?: 'small' | 'default' | 'large';
  onClick?: () => void;
}

const ModernCard: React.FC<ModernCardProps> = ({
  children,
  title,
  extra,
  className = '',
  variant = 'default',
  hoverable = true,
  loading = false,
  size = 'default',
  onClick,
}) => {
  const getVariantClasses = () => {
    const baseClasses = 'transition-all duration-300 ease-in-out';
    
    switch (variant) {
      case 'gradient':
        return `${baseClasses} bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border-0 shadow-lg hover:shadow-xl`;
      case 'glass':
        return `${baseClasses} glass-card border-0`;
      case 'minimal':
        return `${baseClasses} bg-transparent border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm hover:shadow-md`;
      default:
        return `${baseClasses} modern-card border border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl`;
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'p-4';
      case 'large':
        return 'p-8';
      default:
        return 'p-6';
    }
  };

  const hoverClasses = hoverable ? 'hover:scale-[1.02] hover:-translate-y-1 cursor-pointer' : '';

  return (
    <Card
      title={title && (
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white m-0">
            {title}
          </h3>
          {extra}
        </div>
      )}
      loading={loading}
      className={`
        ${getVariantClasses()} 
        ${hoverClasses} 
        ${className}
        animate-fadeIn
        overflow-hidden
        !rounded-2xl
      `}
      bodyStyle={{
        padding: 0,
      }}
      headStyle={{
        border: 'none',
        background: 'transparent',
        padding: '24px 24px 16px 24px',
      }}
      onClick={onClick}
    >
      <div className={getSizeClasses()}>
        {children}
      </div>
    </Card>
  );
};

export default ModernCard;
