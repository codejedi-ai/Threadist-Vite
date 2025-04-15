import React from 'react';
import './Button.css'; // Assuming the CSS file is in the same directory

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'icon';
  primary?: boolean;
  size?: 'small' | 'medium' | 'large';
  label: string;
}

export default function Button({
  variant = 'default',
  primary = false,
  size = 'medium',
  label,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`app-button ${primary ? 'primary' : ''} size-${size} ${className}`}
      {...props}
    >
      {label}
    </button>
  );
}