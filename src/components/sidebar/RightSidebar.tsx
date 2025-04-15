import { FunctionalComponent, h } from "preact";

interface LinkProps {
  href: string;
  children: preact.ComponentChildren;
  className?: string;
}

const Link: FunctionalComponent<LinkProps> = ({ href, children, className }) => {
  return (
    <a href={href} className={`custom-link ${className || ""}`} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
};

export default Link;
