
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, Info, Shield, CreditCard, HelpCircle, LayoutDashboard, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./Button";
import { ShieldLogo } from "./ShieldLogo";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to handle smooth scrolling to sections on home page
  const scrollToSection = (sectionId: string) => {
    if (isHomePage) {
      const section = document.getElementById(sectionId);
      if (section) {
        window.scrollTo({
          top: section.offsetTop - 100, // Offset by navbar height
          behavior: 'smooth'
        });
      }
      // Close mobile menu if open
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    } else {
      // If not on home page, navigate to home page with anchor
      window.location.href = `/#${sectionId}`;
    }
  };

  return (
    <nav className="py-4 px-6 md:px-12 lg:px-24 w-full fixed top-0 z-50 bg-[#0A0A14]/80 backdrop-blur-md border-b border-[#2A2A3C]">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <ShieldLogo className="h-8 w-8 text-cipher-purple" />
          <span className="text-xl font-bold text-white neon-text">CipherGuard</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex gap-5">
            <Link to="/" className="font-medium text-gray-300 hover:text-cipher-purple transition-colors flex items-center gap-1.5">
              <Home size={18} />
              <span>Home</span>
            </Link>
            <button 
              onClick={() => scrollToSection('features')}
              className="font-medium text-gray-300 hover:text-cipher-purple transition-colors flex items-center gap-1.5"
            >
              <Shield size={18} />
              <span>Features</span>
            </button>
            <button 
              onClick={() => scrollToSection('how-it-works')}
              className="font-medium text-gray-300 hover:text-cipher-purple transition-colors flex items-center gap-1.5"
            >
              <Info size={18} />
              <span>How It Works</span>
            </button>
            <button 
              onClick={() => scrollToSection('pricing')}
              className="font-medium text-gray-300 hover:text-cipher-purple transition-colors flex items-center gap-1.5"
            >
              <CreditCard size={18} />
              <span>Pricing</span>
            </button>
            <button 
              onClick={() => scrollToSection('faq')}
              className="font-medium text-gray-300 hover:text-cipher-purple transition-colors flex items-center gap-1.5"
            >
              <HelpCircle size={18} />
              <span>FAQ</span>
            </button>
            <Link to="/contact" className="font-medium text-gray-300 hover:text-cipher-purple transition-colors flex items-center gap-1.5">
              <Mail size={18} />
              <span>Contact</span>
            </Link>
            <Link to="/dashboard" className="font-medium text-cipher-blue hover:text-cipher-blue-light transition-colors flex items-center gap-1.5">
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </Link>
          </div>
          <Button variant="primary" onClick={() => scrollToSection('pricing')}>Try For Free</Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-[#0A0A14] shadow-lg py-4 px-6 flex flex-col gap-4 border-b border-[#2A2A3C] z-50">
          <Link to="/" className="font-medium text-gray-300 py-2 hover:text-cipher-purple flex items-center gap-2">
            <Home size={18} />
            <span>Home</span>
          </Link>
          <button 
            onClick={() => scrollToSection('features')}
            className="font-medium text-gray-300 py-2 hover:text-cipher-purple flex items-center gap-2 text-left"
          >
            <Shield size={18} />
            <span>Features</span>
          </button>
          <button 
            onClick={() => scrollToSection('how-it-works')}
            className="font-medium text-gray-300 py-2 hover:text-cipher-purple flex items-center gap-2 text-left"
          >
            <Info size={18} />
            <span>How It Works</span>
          </button>
          <button 
            onClick={() => scrollToSection('pricing')}
            className="font-medium text-gray-300 py-2 hover:text-cipher-purple flex items-center gap-2 text-left"
          >
            <CreditCard size={18} />
            <span>Pricing</span>
          </button>
          <button 
            onClick={() => scrollToSection('faq')}
            className="font-medium text-gray-300 py-2 hover:text-cipher-purple flex items-center gap-2 text-left"
          >
            <HelpCircle size={18} />
            <span>FAQ</span>
          </button>
          <Link to="/contact" className="font-medium text-gray-300 py-2 hover:text-cipher-purple flex items-center gap-2">
            <Mail size={18} />
            <span>Contact</span>
          </Link>
          <Link to="/dashboard" className="font-medium text-cipher-blue py-2 hover:text-cipher-blue-light flex items-center gap-2">
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </Link>
          <Button variant="primary" className="w-full mt-2" onClick={() => scrollToSection('pricing')}>
            Try For Free
          </Button>
        </div>
      )}
    </nav>
  );
};
