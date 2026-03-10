import { BookOpen, GraduationCap, Lightbulb, Rocket, CheckCircle2 } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const programs = [
  { icon: BookOpen, title: "Format", desc: "3 months Intensive or Weekend (2 months). Theory + practice.", color: "from-primary/10 to-accent/10", border: "border-primary" },
  { icon: GraduationCap, title: "Competency-Based", desc: "Risk assessment, case studies. Ready on completion.", color: "from-secondary/10 to-accent/10", border: "border-secondary" },
  { icon: Lightbulb, title: "Careers", desc: "Officer, Supervisor, Inspector, HSE. Experience: Manager.", color: "from-accent/10 to-primary/10", border: "border-accent" },
  { icon: Rocket, title: "Services", desc: "Refresher, CPD, Consultancy, PPE. Lower risk.", color: "from-secondary/10 to-primary/10", border: "border-secondary" },
];

const faqs = [
  { q: "What courses do you offer?", a: "Occupational Safety & Health in Construction Management (OSH in Construction), OSH in Industrial Sector, and OSH in Mining. Each program has defined key competency areas and prepares graduates for Safety Officer, Supervisor, and related roles." },
  { q: "How long are the programs?", a: "3 Months Intensive Training, or Weekend Option: Friday Afternoon & Sunday (2 Months). Contact us for details on specific programs." },
  { q: "Do you offer in-company training?", a: "Yes. We can deliver tailored training at your organization's premises for groups. Request a quote via the Contact page." },
  { q: "Are programs aligned with national regulations?", a: "Yes. Our training is aligned with Rwanda Labour Regulations and international OSH best practices to support certification and compliance." },
];

export default function Programs() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      <div className="h-28 sm:h-32" aria-hidden="true" />

      <section className="relative text-white py-16 sm:py-20 md:py-28 min-h-[40vh] flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/ksohtc-3.jpeg" alt="" className="w-full h-full object-cover hero-zoom" aria-hidden />
          <div className="absolute inset-0 bg-black/30" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/90 to-secondary/90" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 hero-reveal-slow" style={{ animationDelay: "0.4s", animationFillMode: "both" }}>Our Programs</h1>
          <p className="text-sm sm:text-base text-white/90 max-w-xl hero-reveal-slow" style={{ animationDelay: "0.9s", animationFillMode: "both" }}>Structured OSH. 3 months Intensive or Weekend (2 months).</p>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-24 bg-gray-50 border-l-4 border-primary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-drift">
          <div className="mb-10 sm:mb-14 scroll-reveal reveal-flip delay-400">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-3">What We Provide</h2>
            <p className="text-gray-600 text-xs">Practical OSH for competent professionals.</p>
          </div>
          <div className="rounded-[30px] overflow-hidden shadow-lg border border-gray-200 mb-10 sm:mb-14 scroll-reveal reveal-bounce delay-800 relative">
            <img src="/ksohtc-3.jpeg" alt="KSOHTC training session" className="w-full h-44 sm:h-56 object-cover rounded-[30px]" loading="lazy" decoding="async" />
            <div className="img-overlay rounded-[30px]" aria-hidden="true" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {programs.map((item, idx) => (
              <div
                key={idx}
                className={`bg-gradient-to-br ${item.color} rounded-[30px] p-6 sm:p-8 border-l-4 ${item.border} hover:shadow-2xl transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] scroll-reveal ${idx % 3 === 0 ? "reveal-flip" : idx % 3 === 1 ? "reveal-bounce" : "reveal-spring"}`}
                style={{ animationDelay: `${1.2 + idx * 0.25}s` }}
              >
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-[30px] bg-primary/10 flex items-center justify-center text-primary">
                    <item.icon className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-primary mb-2">{item.title}</h3>
                    <p className="text-gray-700 text-sm sm:text-base">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full flex flex-col items-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-8 sm:mb-10 text-center scroll-reveal reveal-fade-scale delay-400">Program FAQs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 w-full max-w-5xl mx-auto">
            {faqs.map((faq, idx) => (
              <details key={idx} className="group bg-white rounded-[30px] border-2 border-gray-200 overflow-hidden shadow-sm hover:border-primary/40 hover:shadow-md transition-all duration-300 scroll-reveal reveal-fade-scale" style={{ animationDelay: `${0.7 + idx * 0.2}s` }}>
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
