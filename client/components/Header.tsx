import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Programs", path: "/programs" },
  { label: "Industries", path: "/industries" },
  { label: "Courses", path: "/courses" },
  { label: "Contact", path: "/contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm animate-fade-in-down">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex items-center h-20 gap-2">
          <div className="hidden md:flex md:flex-1 md:items-center md:min-w-0" />
          <div className="hidden md:flex md:items-center md:justify-center md:flex-shrink-0">
            <div className="flex items-center gap-4 bg-white/90 border-2 border-gray-200 rounded-[30%] pl-4 pr-4 py-2.5 shadow-sm">
              <Link to="/" className="flex-shrink-0 flex items-center group cursor-pointer transition-all duration-300 hover:scale-105">
                <img
                  src="/logo.jpeg"
                  alt="KSOHTC Logo"
                  className="w-11 h-11 lg:w-12 lg:h-12 object-contain transition-all duration-300 group-hover:rotate-3"
                />
              </Link>
              <nav className="flex gap-3">
                {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 text-base font-medium transition-all duration-300 relative group ${
                  location.pathname === link.path ? "text-primary" : "text-gray-700 hover:text-primary"
                }`}
              >
                {link.label}
                <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-300 ${
                  location.pathname === link.path ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </Link>
                ))}
              </nav>
              <Link
                to="/login"
                className="flex-shrink-0 bg-gradient-to-r from-accent to-accent/80 text-black px-4 py-2 rounded-lg text-sm font-bold hover:shadow-lg hover:scale-105 transition-all duration-300 transform whitespace-nowrap"
              >
                ENROLL NOW!
              </Link>
            </div>
          </div>
          <div className="hidden md:block md:flex-1 md:min-w-0" />

          <Link to="/" className="md:hidden flex-shrink-0 flex items-center group cursor-pointer transition-all duration-300 hover:scale-105">
            <img
              src="/logo.jpeg"
              alt="KSOHTC Logo"
              className="w-14 h-14 sm:w-16 sm:h-16 object-contain transition-all duration-300 group-hover:rotate-3"
            />
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
          >
            {isOpen ? <X className="w-6 h-6 text-primary animate-spin-fast" /> : <Menu className="w-6 h-6 text-primary" />}
          </button>
        </div>

        {isOpen && (
          <nav className="md:hidden bg-gradient-to-b from-white to-gray-50 border-t border-gray-200 animate-slide-down">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                    location.pathname === link.path ? "bg-primary/10 text-primary" : "text-gray-700 hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block mt-4 bg-gradient-to-r from-accent to-accent/80 text-black px-4 py-3 rounded-lg font-bold hover:shadow-lg transition-all duration-300 text-center"
              >
                ENROLL NOW!
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
