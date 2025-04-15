import React from 'preact/compat';
import './Sidebar.css'; // Assuming you'll have a separate CSS file

const LeftSidebar = () => {
  return (
    <div className="left-sidebar">
      <div className="sidebar-section top-section">
        <div className="icon-container">
          <div className="question-mark">?</div>
        </div>
        <div className="label">Crapproade</div>
      </div>

      <div className="sidebar-section build-section">
        <div className="label">Build</div>
        <button className="rounded-button">Scene</button>
        <button className="rounded-button">Object</button>
        <button className="rounded-button">Allied</button>
        <button className="rounded-button">Environment</button>
        <button className="rounded-button with-icon">Earth +</button>
      </div>
    </div>
  );
};

export default LeftSidebar;