import { HardHat, Building, Pickaxe } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const industries = [
  { icon: HardHat, name: "Construction", desc: "Specialized training for construction site safety and hazard management. We cover fall prevention, PPE, site risk assessment, and compliance with construction safety standards.", img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80" },
  { icon: Building, name: "Industrial", desc: "Comprehensive training for industrial operations and worker safety. Topics include machinery safety, chemical handling, fire safety, and emergency response.", img: "https://images.unsplash.com/photo-1581092160562-40e53e5e2d0e?w=800&q=80" },
  { icon: Pickaxe, name: "Mining", desc: "Expert training for mining operations and underground safety. Covers hazard identification, ventilation, explosives safety, and mining regulations.", img: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3785?w=800&q=80" },
];

const faqs = [
  { q: "Which industry is right for my team?", a: "We serve Construction, Industrial, and Mining sectors. If your work spans more than one, we can tailor a combined or sector-specific program. Contact us to discuss your needs." },
  { q: "Do you offer sector-specific certificates?", a: "Yes. Our programs are designed to support sector-specific competencies and align with national and industry expectations for Safety Officers and Supervisors." },
];

export default function Industries() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      <div className="h-24" aria-hidden="true" />

      <section className="relative text-white py-16 sm:py-20 md:py-28 min-h-[40vh] flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80" alt="" className="w-full h-full object-cover hero-zoom" aria-hidden />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/90 to-secondary/90" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 hero-reveal-slow" style={{ animationDelay: "0.4s", animationFillMode: "both" }}>Industries We Serve</h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl hero-reveal-slow" style={{ animationDelay: "0.9s", animationFillMode: "both" }}>Specialized training for Rwanda's key sectors.</p>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 rounded-3xl border-2 border-accent/20 bg-white/70 shadow-lg py-12">
          <div className="mb-10 sm:mb-14 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border border-gray-200 scroll-reveal reveal-left-slow delay-400">
            <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80" alt="Industries" className="w-full h-44 sm:h-56 object-cover" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {industries.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-2xl hover:border-primary/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.99] scroll-reveal reveal-scale-slow"
                style={{ animationDelay: `${1 + idx * 0.3}s` }}
              >
                <img src={item.img} alt={item.name} className="w-full h-48 sm:h-52 object-cover" />
                <div className="p-6 sm:p-8">
                  <span className="inline-flex w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary/10 items-center justify-center text-primary mb-4">
                    <item.icon className="w-7 h-7 sm:w-8 sm:h-8" />
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-primary mb-3">{item.name}</h2>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full flex flex-col items-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-8 sm:mb-10 text-center scroll-reveal reveal-scale-slow delay-400">Industry FAQs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 w-full max-w-5xl mx-auto">
            {faqs.map((faq, idx) => (
              <details key={idx} className="group bg-white rounded-xl border-2 border-gray-200 overflow-hidden shadow-sm hover:border-primary/40 hover:shadow-md transition-all duration-300 scroll-reveal reveal-blur" style={{ animationDelay: `${0.8 + idx * 0.2}s` }}>
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
