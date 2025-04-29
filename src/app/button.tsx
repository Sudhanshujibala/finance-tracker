// src/components/ui/button.tsx
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({ children, onClick, variant = 'primary', size = 'md' }) => {
  const className = `btn ${variant} ${size}`;

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export { Button };
