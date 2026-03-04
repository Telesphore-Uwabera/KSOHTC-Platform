import { MapPin, Phone, Mail } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const contacts = [
  { icon: MapPin, title: "Address", content: "Kicukiro Center\nKigali, Rwanda" },
  { icon: Phone, title: "Phone / WhatsApp", content: "+250 785 072 512", link: "tel:+250785072512" },
  { icon: Mail, title: "Email", content: "kigalisafetyoshtrainingcenter@gmail.com", link: "mailto:kigalisafetyoshtrainingcenter@gmail.com" },
];

const faqs = [
  { q: "What are your opening hours?", a: "We are available by phone and WhatsApp during business hours. For visits, please contact us in advance to confirm availability at Kicukiro Center." },
  { q: "How quickly do you respond to inquiries?", a: "We aim to respond to contact form submissions and emails within 1–2 business days. For urgent enrollment or quote requests, calling or WhatsApp is fastest." },
  { q: "Can I request a quote for group training?", a: "Yes. Use the form below or email us with your organization name, number of participants, and preferred program or sector. We will send a tailored quote." },
  { q: "Where is KSOTC located?", a: "We are based at Kicukiro Center, Kigali, Rwanda. You can reach us by phone, email, or the contact form above for directions or to schedule a visit." },
];

export default function Contact() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      <div className="h-24" aria-hidden="true" />

      <section className="relative text-white py-16 sm:py-20 md:py-28 min-h-[40vh] flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1497366216548-ee70bd0e0067?w=1920&q=80" alt="" className="w-full h-full object-cover hero-zoom" aria-hidden />
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/95 via-secondary/90 to-primary/90" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 hero-reveal-slow" style={{ animationDelay: "0.4s", animationFillMode: "both" }}>Get In Touch</h1>
          <p className="text-lg sm:text-xl text-accent/90 max-w-2xl hero-reveal-slow" style={{ animationDelay: "0.9s", animationFillMode: "both" }}>We're here to answer your questions and support your enrollment.</p>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 sm:mb-14 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg scroll-reveal reveal-zoom delay-400">
            <img src="https://images.unsplash.com/photo-1497366216548-ee70bd0e0067?w=1200&q=80" alt="Contact us" className="w-full h-44 sm:h-56 object-cover" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {contacts.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border-2 border-gray-200 text-center hover:shadow-xl hover:border-primary/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.99] scroll-reveal reveal-scale-slow"
                  style={{ animationDelay: `${0.9 + idx * 0.3}s` }}
                >
                  <span className="inline-flex w-14 h-14 rounded-2xl bg-accent/15 items-center justify-center text-accent mb-4">
                    <Icon className="w-7 h-7" />
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-primary mb-2">{item.title}</h3>
                  <p className="text-gray-600 whitespace-pre-line text-sm sm:text-base">
                    {item.link ? (
                      <a href={item.link} className="text-primary hover:text-accent underline decoration-dotted">
                        {item.content}
                      </a>
                    ) : (
                      item.content
                    )}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8 md:p-10 mb-12 sm:mb-16 scroll-reveal reveal-left-slow delay-1800">
            <h2 className="text-xl sm:text-2xl font-bold text-primary mb-6">Send a message</h2>
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
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6 sm:mb-8 text-center scroll-reveal reveal-scale-slow delay-400">Contact FAQs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 w-full max-w-5xl mx-auto">
            {faqs.map((faq, idx) => (
              <details key={idx} className="group bg-white rounded-xl border-2 border-gray-200 overflow-hidden shadow-sm hover:border-primary/40 hover:shadow-md transition-all duration-300 scroll-reveal reveal-blur" style={{ animationDelay: `${0.8 + idx * 0.18}s` }}>
                <summary className="flex items-start sm:items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5 cursor-pointer list-none font-semibold text-gray-800 hover:text-primary transition-colors min-h-[3.5rem]">
                  <span className="text-left text-sm sm:text-base line-clamp-2 flex-1 pr-2">{faq.q}</span>
                  <span className="text-primary text-xl shrink-0 transition-transform duration-300 group-open:rotate-45 flex items-center">+</span>
                </summary>
                <p className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 text-gray-600 text-sm sm:text-base leading-relaxed border-t border-gray-100 bg-gray-50/50">{faq.a}</p>
              </details>
            ))}
          </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
