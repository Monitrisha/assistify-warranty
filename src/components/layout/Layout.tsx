
import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  // Add paths that should not have padding or footer
  const routesWithoutPadding = ['/chat'];
  const routesWithoutFooter = ['/chat'];
  
  const shouldHavePadding = !routesWithoutPadding.includes(location.pathname);
  const shouldShowFooter = !routesWithoutFooter.includes(location.pathname);
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className={`flex-1 ${shouldHavePadding ? 'py-8' : ''}`}>
        {children}
      </main>
      {shouldShowFooter && <Footer />}
    </div>
  );
};

export default Layout;
