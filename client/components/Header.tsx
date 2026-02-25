import { useState } from "react";
import { Menu, X, Shield, HardHat } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#who" },
    { label: "Programs", href: "#provide" },
    { label: "Industries", href: "#industries" },
    { label: "Mission", href: "#mission" },
    { label: "Contact", href: "#contact" },
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm animate-fade-in-down">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-3 group cursor-pointer transition-all duration-300 hover:scale-105">
            <img 
              src="/navigation-logo.jpeg" 
              alt="KSOTC Logo" 
              className="w-16 h-16 object-contain transition-all duration-300 group-hover:rotate-3"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-1">
            {navLinks.map((link, idx) => (
              <button
                key={idx}
                onClick={() => handleNavClick(link.href)}
                className="px-4 py-2 text-gray-700 hover:text-primary font-medium transition-all duration-300 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300 rounded-full"></span>
              </button>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex gap-4 items-center">
            <button
              onClick={() => handleNavClick("#contact")}
              className="bg-gradient-to-r from-accent to-accent/80 text-black px-6 py-2.5 rounded-lg font-bold hover:shadow-lg hover:scale-105 transition-all duration-300 transform"
            >
              ENROLL NOW!
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-primary animate-spin-fast" />
            ) : (
              <Menu className="w-6 h-6 text-primary" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden bg-gradient-to-b from-white to-gray-50 border-t border-gray-200 animate-slide-down">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link, idx) => (
                <button
                  key={idx}
                  onClick={() => handleNavClick(link.href)}
                  className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-primary/10 hover:text-primary rounded-lg font-medium transition-all duration-300 transform hover:translate-x-1"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => handleNavClick("#contact")}
                className="w-full mt-4 bg-gradient-to-r from-accent to-accent/80 text-black px-4 py-3 rounded-lg font-bold hover:shadow-lg transition-all duration-300"
              >
                ENROLL NOW!
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
