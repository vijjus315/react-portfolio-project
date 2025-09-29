import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const PageLayout = ({ title, children }) => {
  return (
    <div className="page-layout">
      <Navbar />
      <main>
        {title && <h1 className="page-title">{title}</h1>}
        {children || <Outlet />}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
