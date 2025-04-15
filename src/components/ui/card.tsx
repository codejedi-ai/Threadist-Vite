import React from 'react';
import './Card.css'; // Assuming the CSS file is in the same directory

type CardProps = {
  children: React.ReactNode;
  className?: string;
  title?: string;
};

export default function Card({ children, className = '', title }: CardProps) {
  return (
    <div className={`card-container ${className}`}>
      {title && <h2 className="card-title">{title}</h2>}
      {children}
    </div>
  );
}