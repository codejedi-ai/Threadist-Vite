import { h } from 'preact';
import { useState } from 'preact/hooks';
import './Sidebar.css'; // Optional for styling

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <button onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? 'Close Sidebar' : 'Open Sidebar'}
            </button>
            {isOpen && (
                <nav>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </nav>
            )}
        </div>
    );
};

export default Sidebar;
