import React, { useEffect, useRef } from 'react';
import { VscLightbulb, VscThreeBars } from 'react-icons/vsc';
import { FaTimes } from 'react-icons/fa';
import { links } from './data/links';
import { useGlobalContext } from './context';
import { Link } from 'react-router-dom';
const Navbar = () => {
  const { isSidebarOpen, closeSidebar, openSidebar } = useGlobalContext();
  const linksContainerRef = useRef(null);

  useEffect(() => {
    if (isSidebarOpen) {
      linksContainerRef.current.style.transform = 'translateX(0%)';
    } else {
      linksContainerRef.current.style.transform = 'translateX(-100%)';
    }
  }, [isSidebarOpen]);

  return (
    <nav className="navbar">
      <div className="navbar__header">
        <VscLightbulb className="navbar__logo" />

        <h5 className="navbar__title">MyQuizz</h5>
      </div>
      <button className="navbar__open" onClick={openSidebar}>
        <VscThreeBars />
      </button>

      <ul className="navbar__links" ref={linksContainerRef}>
        <button className="navbar__close" onClick={closeSidebar}>
          <FaTimes />
        </button>
        {links.map(link => {
          const { id, url, text, icon } = link;
          return (
            <li key={id}>
              <Link to={url}>
                {text} {icon}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
export default Navbar;
