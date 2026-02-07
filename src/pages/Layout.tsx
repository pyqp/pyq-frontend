import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Footer from './Footer';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Add padding-top to account for fixed navbar height */}
      {/* Top announcement bar (44px) + Main nav (80px) = 124px total */}
      <div className="pt-[120px]">
        {/* Show Hero only on home page */}
        {!children && <Hero />}
        
        {/* Show children for other pages */}
        {children && (
          <main className="flex-grow">
            {children}
          </main>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Layout;