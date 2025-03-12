
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Menu, X, BarChart2, FileText, Calendar, MessageSquare, Upload, 
  Clock, Search, User, LogIn
} from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Navigation items
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <BarChart2 size={18} /> },
    { name: 'Claims', path: '/claims', icon: <FileText size={18} /> },
    { name: 'Appointments', path: '/appointments', icon: <Calendar size={18} /> },
    { name: 'Chat Assistant', path: '/chat', icon: <MessageSquare size={18} /> },
    { name: 'Upload', path: '/upload', icon: <Upload size={18} /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="relative h-8 w-8 overflow-hidden rounded-md bg-primary">
              <Clock className="absolute inset-0 h-full w-full p-1.5 text-primary-foreground" />
            </div>
            <span className="font-medium tracking-tight">Assistify Warranty</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-1 text-sm transition-colors ${
                isActive(item.path) 
                  ? 'text-primary font-medium' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* User Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search className="h-5 w-5" />
          </Button>
          
          <Link to="/login">
            <Button variant="ghost" size="sm" className="hidden md:flex items-center gap-1">
              <LogIn className="mr-1 h-4 w-4" />
              Sign In
            </Button>
          </Link>
          
          <Button variant="outline" size="sm" className="hidden md:flex items-center gap-1">
            <User className="mr-1 h-4 w-4" />
            Sign Up
          </Button>

          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle menu"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-16 z-50 bg-background/98 backdrop-blur-sm md:hidden animate-fade-in">
          <nav className="container flex flex-col gap-6 p-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-2 text-lg transition-colors ${
                  isActive(item.path) 
                    ? 'text-primary font-medium' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
            
            <div className="mt-4 flex flex-col gap-2">
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full justify-start">
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Button>
              </Link>
              
              <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full justify-start">
                  <User className="mr-2 h-4 w-4" />
                  Sign Up
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
