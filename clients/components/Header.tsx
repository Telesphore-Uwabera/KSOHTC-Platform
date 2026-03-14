import { useState, useEffect } from "react";
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

const SCROLL_THRESHOLD = 40;

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > SCROLL_THRESHOLD);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    setScrolled(window.scrollY > SCROLL_THRESHOLD);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const compact = scrolled;
  const headerClass =
    "fixed top-0 left-0 right-0 z-50 animate-fade-in-down transition-all duration-300 ease-out bg-white shadow-md backdrop-blur-sm";

  return (
    <header className={headerClass}>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className={`flex items-center gap-1 sm:gap-2 transition-all duration-300 ${compact ? "h-16 sm:h-20 md:h-20" : "h-20 sm:h-24 md:h-28"}`}>
          <div className="hidden md:flex md:flex-1 md:items-center md:min-w-0" />
          <div className="hidden md:flex md:items-center md:justify-center md:flex-shrink-0">
            <div className={`flex items-center gap-2 lg:gap-4 pl-3 pr-3 sm:pl-4 sm:pr-4 transition-all duration-300 ${compact ? "py-1 gap-2" : "py-2 sm:py-3"}`}>
              <Link to="/" className="flex-shrink-0 flex items-center group cursor-pointer transition-all duration-300 hover:scale-105">
                <img
                  src="/logo.webp"
                  alt="KSOHTC Logo"
                  className={`object-contain max-w-full h-auto transition-all duration-300 group-hover:rotate-3 ${compact ? "w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16" : "w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32"}`}
                />
              </Link>
              <nav className="flex gap-1 sm:gap-2 lg:gap-3">
                {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-2 sm:px-3 py-1.5 sm:py-2 font-medium transition-all duration-300 relative group text-xs sm:text-sm lg:text-base ${location.pathname === link.path ? "text-primary" : "text-gray-700 hover:text-primary"}`}
              >
                {link.label}
                <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-300 ${
                  location.pathname === link.path ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </Link>
                ))}
                <Link
                  to={isAdminRoute ? "/admin" : "/dashboard"}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-semibold transition-all duration-300 text-xs sm:text-sm lg:text-base border-2 ${
                    (isAdminRoute ? location.pathname === "/admin" : location.pathname === "/dashboard")
                      ? "bg-primary text-white border-primary shadow-md"
                      : "border-primary text-primary bg-primary/10 hover:bg-primary hover:text-white hover:shadow-md"
                  }`}
                >
                  {isAdminRoute ? "Admin" : "Dashboard"}
                </Link>
              </nav>
            </div>
          </div>
          <div className="hidden md:block md:flex-1 md:min-w-0" />

          <Link to="/" className="md:hidden flex-shrink-0 flex items-center group cursor-pointer transition-all duration-300 hover:scale-105">
            <img
              src="/logo.webp"
              alt="KSOHTC Logo"
              className={`object-contain max-w-full h-auto transition-all duration-300 group-hover:rotate-3 ${compact ? "w-14 h-14 sm:w-16 sm:h-16" : "w-20 h-20 sm:w-24 sm:h-24"}`}
            />
          </Link>

          <div className="md:hidden flex-1 min-w-0" aria-hidden />

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex items-center gap-2 py-2 pl-3 pr-3 rounded-lg hover:bg-gray-100 transition-colors duration-300 ml-auto"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? (
              <X className="w-5 h-5 text-primary animate-spin-fast shrink-0" />
            ) : (
              <Menu className="w-5 h-5 text-primary shrink-0" />
            )}
            <span className="text-sm font-medium text-gray-700">{isOpen ? "Close" : "Menu"}</span>
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
                to={isAdminRoute ? "/admin" : "/dashboard"}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-xl font-semibold transition-all duration-300 border-2 ${
                  (isAdminRoute ? location.pathname === "/admin" : location.pathname === "/dashboard")
                    ? "bg-primary text-white border-primary"
                    : "border-primary text-primary bg-primary/10 hover:bg-primary hover:text-white"
                }`}
              >
                {isAdminRoute ? "Admin" : "Dashboard"}
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
