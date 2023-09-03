import React, { useState } from 'react';
import { Collapse } from 'bootstrap/dist/js/bootstrap.esm.min';

function Demo() {
  const [subListOpen, setSubListOpen] = useState(false);

  const toggleSubList = () => {
    setSubListOpen(!subListOpen);
  };

  return (
    <div className="Sidebar">
      <nav id="sidebar">
        <div className="sidebar-header">
          <img src="your-logo.png" alt="Logo" />
        </div>
        <ul className="list-unstyled components">
          <li>
            <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" onClick={toggleSubList}>
              HOME
            </a>
            <ul className={`collapse ${subListOpen ? 'show' : ''}`} id="homeSubmenu">
              <li>
                <a href="#">Sub-item 1</a>
              </li>
              <li>
                <a href="#">Sub-item 2</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#home1Submenu" data-toggle="collapse" aria-expanded="false" onClick={toggleSubList}>
              Home 1
            </a>
            <ul className={`collapse ${subListOpen ? 'show' : ''}`} id="home1Submenu">
              <li>
                <a href="#">Sub-item 1</a>
              </li>
              <li>
                <a href="#">Sub-item 2</a>
              </li>
            </ul>
          </li>
          {/* Repeat similar structure for Home 2 and Home 3 */}
        </ul>
      </nav>
    </div>
  );
}

export default Demo;
