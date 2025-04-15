
import { JSX } from 'preact/jsx-runtime';
import './Button.css';

interface ButtonProps extends JSX.HTMLAttributes<HTMLButtonElement> {
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
  const baseClass = variant === 'icon' ? 'icon-button' : 'app-button';
  const primaryClass = primary ? 'primary' : '';
  const sizeClass = `size-${size}`;
  
  const combinedClassName = [
    baseClass,
    primaryClass,
    sizeClass,
    className
  ].filter(Boolean).join(' ');
  
  return (
    <button class={combinedClassName} {...props}>
      {label}
    </button>
  );
}