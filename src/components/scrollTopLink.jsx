import React from 'react';
import { NavLink } from 'react-router-dom';

const ScrollToTopLink = ({ to, className, children }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <NavLink className={`${className}`} to={to} onClick={scrollToTop}>
      {children}
    </NavLink>
  );
};

export default ScrollToTopLink;
