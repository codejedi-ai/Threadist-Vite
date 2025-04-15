
import './Card.css';

type CardProps = {
  children: preact.ComponentChildren;
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