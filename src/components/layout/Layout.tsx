
import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  // Add new route paths here to determine if they should have padding
  const routesWithoutPadding = ['/chat'];
  const shouldHavePadding = !routesWithoutPadding.includes(location.pathname);
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className={`flex-1 ${shouldHavePadding ? 'py-8' : ''}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
