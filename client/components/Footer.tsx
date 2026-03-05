import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Code2, ExternalLink } from "lucide-react";

const FOOTER_MAP_EMBED = "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d4729.875635675041!2d30.103122774967193!3d-1.9845040979975614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMcKwNTknMDQuMiJTIDMwwrAwNicyMC41IkU!5e1!3m2!1sen!2srw!4v1772737124478!5m2!1sen!2srw";
const MAP_DIRECTIONS_URL = "https://www.google.com/maps/dir//-1.984504,30.103123";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 items-start">
          <div className="flex flex-col items-start text-left lg:col-span-1 lg:col-start-1">
            <Link to="/" className="block">
              <img
                src="/logo.jpeg"
                alt="KSOHTC Footer Logo"
                className="w-44 h-44 object-contain transition-all duration-300 hover:scale-110 mb-6"
              />
            </Link>
            <p className="text-accent font-semibold text-sm mb-2 whitespace-nowrap">Kigali Safety OSH Training Center</p>
            <p className="text-accent font-medium text-sm whitespace-nowrap">Safety Today, Prosperity Tomorrow!</p>
          </div>

          <div className="lg:col-span-3 lg:col-start-2 lg:flex lg:justify-center">
            <div className="text-left w-full max-w-xs">
              <h4 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { to: "/", label: "Home" },
                  { to: "/about", label: "About Us" },
                  { to: "/programs", label: "Programs" },
                  { to: "/industries", label: "Industries" },
                  { to: "/contact", label: "Contact" },
                ].map(({ to, label }) => (
                  <li key={to}>
                    <Link to={to} className="hover:text-accent transition-colors duration-300 flex items-center gap-2">
                      <span className="w-1 h-1 bg-accent rounded-full" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-left lg:col-span-1 lg:col-start-5">
            <h4 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Contact</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 whitespace-nowrap">
                <MapPin className="w-4 h-4 text-accent flex-shrink-0" />
                <span className="truncate">Kicukiro Center, Kigali, Rwanda</span>
              </div>
              <div className="flex items-center gap-3 whitespace-nowrap">
                <Phone className="w-4 h-4 text-accent flex-shrink-0" />
                <a href="https://wa.me/250785072512" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors duration-300">
                  +250 785 072 512
                </a>
              </div>
              <div className="flex items-center gap-3 whitespace-nowrap">
                <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                <a
                  href="mailto:kigalisafetyoshtrainingcenter@gmail.com"
                  className="hover:text-accent transition-colors duration-300 truncate"
                  title="kigalisafetyoshtrainingcenter@gmail.com"
                >
                  kigalisafetyoshtrainingcenter@gmail.com
                </a>
              </div>
            </div>
            <div className="mt-4 w-full rounded-lg overflow-hidden border border-gray-600 h-16 sm:h-20">
              <iframe
                src={FOOTER_MAP_EMBED}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="KSOHTC location"
                className="w-full h-full min-h-[64px]"
              />
            </div>
            <a
              href={MAP_DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-2 text-xs text-accent hover:underline"
            >
              <ExternalLink className="w-3 h-3" />
              Get directions
            </a>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 mt-12">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <p className="text-sm text-gray-400 text-center sm:text-left">
              © {new Date().getFullYear()} Kigali Safety OSH Training Center. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm text-gray-400">
              <Link to="/contact" className="hover:text-accent transition-colors duration-300">Privacy Policy</Link>
              <Link to="/contact" className="hover:text-accent transition-colors duration-300">Terms of Service</Link>
              <a
                href="https://uwaberatelesphore.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-accent transition-colors duration-300"
              >
                <Code2 className="w-4 h-4" />
                Contact Developer
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
