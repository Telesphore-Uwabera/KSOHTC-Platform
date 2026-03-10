import { MapPin, Phone, Mail, ExternalLink } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MAP_EMBED_URL = "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d4729.875635675041!2d30.103122774967193!3d-1.9845040979975614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMcKwNTknMDQuMiJTIDMwwrAwNicyMC41IkU!5e1!3m2!1sen!2srw!4v1772737124478!5m2!1sen!2srw";
const MAP_DIRECTIONS_URL = "https://www.google.com/maps/dir//-1.984504,30.103123";

const contacts = [
  { icon: MapPin, title: "Address", content: "Kicukiro, Kigali, Rwanda", link: "#map" },
  { icon: Phone, title: "WhatsApp", content: "+250 785 072 512", link: "https://wa.me/250785072512" },
  { icon: Mail, title: "Email", content: "kigalisafetyoshtrainingcenter@gmail.com", link: "mailto:kigalisafetyoshtrainingcenter@gmail.com" },
];

const faqs = [
  { q: "What are your opening hours?", a: "We are available by WhatsApp during business hours. For visits, please contact us in advance to confirm availability at Kicukiro." },
  { q: "How quickly do you respond to inquiries?", a: "We aim to respond to contact form submissions and emails within 1–2 business days. For urgent enrollment or quote requests, WhatsApp is fastest." },
  { q: "Can I request a quote for group training?", a: "Yes. Use the form below or email us with your organization name, number of participants, and preferred program or sector. We will send a tailored quote." },
  { q: "Where is KSOHTC located?", a: "We are based at Kicukiro, Kigali, Rwanda. Use the map below for directions or WhatsApp to schedule a visit." },
];

export default function Contact() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      <div className="h-28 sm:h-32" aria-hidden="true" />

      <section className="relative text-white py-16 sm:py-20 md:py-28 min-h-[40vh] flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/95 via-secondary/90 to-primary/90" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 hero-reveal-slow" style={{ animationDelay: "0.4s", animationFillMode: "both" }}>Get In Touch</h1>
          <p className="text-sm sm:text-base text-accent/90 max-w-xl hero-reveal-slow" style={{ animationDelay: "0.9s", animationFillMode: "both" }}>Questions or enrollment—we’re here to help.</p>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-windy">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-12">
            {contacts.map((item, idx) => {
              const Icon = item.icon;
              const isAddress = item.content === "Kicukiro, Kigali, Rwanda" && item.link === "#map";
              const cardClass = "bg-white rounded-[30px] p-6 sm:p-8 shadow-lg border-2 border-gray-200 text-center hover:shadow-xl hover:border-primary/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.99] scroll-reveal reveal-scale-slow";
              const cardContent = (
                <>
                  <span className="inline-flex w-12 h-12 rounded-[30px] bg-accent/15 items-center justify-center text-accent mb-4">
                    <Icon className="w-6 h-6" />
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-primary mb-1.5">{item.title}</h3>
                  <p className="text-gray-600 whitespace-pre-line text-xs sm:text-sm">
                    {item.link ? (
                      item.link.startsWith("http") || item.link.startsWith("mailto:") ? (
                        <a
                          href={item.link}
                          className="text-primary hover:text-accent underline decoration-dotted"
                          {...(item.link.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        >
                          {item.content}
                        </a>
                      ) : (
                        <span className="text-primary">{item.content} — View map</span>
                      )
                    ) : (
                      item.content
                    )}
                  </p>
                </>
              );
              return (
                <div key={idx}>
                  {isAddress ? (
                    <a href="#map" className={`block ${cardClass}`} style={{ animationDelay: `${0.9 + idx * 0.3}s` }}>
                      {cardContent}
                    </a>
                  ) : (
                    <div className={cardClass} style={{ animationDelay: `${0.9 + idx * 0.3}s` }}>
                      {cardContent}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="bg-white rounded-[30px] shadow-lg border border-gray-200 p-6 sm:p-8 md:p-10 mb-12 sm:mb-16 scroll-reveal reveal-left-slow delay-1800">
            <h2 className="text-lg sm:text-xl font-bold text-primary mb-4 sm:mb-6">Send a message</h2>
            <form className="w-full space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 sm:px-6 sm:py-4 rounded-lg border-2 border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 sm:px-6 sm:py-4 rounded-lg border-2 border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full px-4 py-3 sm:px-6 sm:py-4 rounded-lg border-2 border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-primary transition-colors resize-none"
              />
              <div className="flex justify-center w-full">
                <button type="button" className="bg-gradient-to-r from-accent to-accent/80 text-black font-bold py-3 px-8 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
                  Send Message
                </button>
              </div>
            </form>
          </div>

          <div className="w-full flex flex-col items-center">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-primary mb-4 sm:mb-6 text-center scroll-reveal reveal-scale-slow delay-400">Contact FAQs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 w-full max-w-5xl mx-auto">
            {faqs.map((faq, idx) => (
              <details key={idx} className="group bg-white rounded-[30px] border-2 border-gray-200 overflow-hidden shadow-sm hover:border-primary/40 hover:shadow-md transition-all duration-300 scroll-reveal reveal-blur" style={{ animationDelay: `${0.8 + idx * 0.18}s` }}>
                <summary className="flex items-start sm:items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5 cursor-pointer list-none font-semibold text-gray-800 hover:text-primary transition-colors min-h-[3.5rem]">
                  <span className="text-left text-xs sm:text-sm md:text-base line-clamp-2 flex-1 pr-2">{faq.q}</span>
                  <span className="text-primary text-xl shrink-0 transition-transform duration-300 group-open:rotate-45 flex items-center">+</span>
                </summary>
                <p className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 text-gray-600 text-xs sm:text-sm leading-relaxed border-t border-gray-100 bg-gray-50/50">{faq.a}</p>
              </details>
            ))}
          </div>
          </div>

          <div id="map" className="mt-10 sm:mt-12 scroll-reveal reveal-raise delay-400 w-full">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-primary mb-2 sm:mb-3">Find us</h2>
            <p className="text-gray-600 text-sm sm:text-base mb-4">
              <a href="#map" className="text-primary hover:text-accent underline decoration-dotted">Kicukiro, Kigali, Rwanda</a>
            </p>
            <div className="w-full rounded-[30px] overflow-hidden shadow-lg border-2 border-gray-200 bg-gray-100 aspect-video">
              <iframe
                src={MAP_EMBED_URL}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "140px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="KSOHTC location on Google Maps"
                className="w-full h-full min-h-[140px] sm:min-h-[160px] md:min-h-[180px]"
              />
            </div>
            <a
              href={MAP_DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Get directions on Google Maps
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
