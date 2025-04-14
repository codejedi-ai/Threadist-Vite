import { h } from 'preact';
import './navbar.css';

export default function Navbar() {
  return (
    <nav class="navbar" role="navigation" aria-label="Main Navigation">
      <div class="nav-left">
        <a href="/" class="nav-link">Home</a>
        <a href="/about" class="nav-link">About</a>
      </div>
      <div class="nav-right">
        <a href="/services" class="nav-link">Services</a>
        <a href="/contact" class="nav-link">Contact</a>
      </div>
    </nav>
  );
}
