import React from 'react';
import { Button, Drawer } from 'antd';
import { FiX } from 'react-icons/fi';

interface SlidePanelProps {
  title: string;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: number | string;
  placement?: 'left' | 'right' | 'top' | 'bottom';
  footer?: React.ReactNode;
  loading?: boolean;
  className?: string;
}

const SlidePanel: React.FC<SlidePanelProps> = ({
  title,
  open,
  onClose,
  children,
  width = 600,
  placement = 'right',
  footer,
  loading = false,
  className = '',
}) => {
  return (
    <Drawer
      title={null}
      placement={placement}
      width={width}
      open={open}
      onClose={onClose}
      mask={true}
      maskClosable={true}
      className={`modern-slide-panel ${className}`}
      styles={{
        wrapper: {
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        },
        header: {
          display: 'none',
        },
        body: {
          padding: 0,
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 100%)',
        },
      }}
      destroyOnClose
      loading={loading}
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-gray-800 m-0">{title}</h2>
          <Button
            type="text"
            shape="circle"
            icon={<FiX className="text-lg" />}
            onClick={onClose}
            className="hover:bg-gray-100 text-gray-600"
          />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto modern-scrollbar">
          <div className="p-6">
            {children}
          </div>
        </div>

        {/* Footer */}
        {footer && (
          <div className="border-t border-gray-200 p-6 bg-gray-50/80 backdrop-blur-sm">
            {footer}
          </div>
        )}
      </div>
    </Drawer>
  );
};

export default SlidePanel;
