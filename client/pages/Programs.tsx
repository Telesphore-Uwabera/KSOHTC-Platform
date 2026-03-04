import { BookOpen, GraduationCap, Lightbulb, Rocket, CheckCircle2 } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const programs = [
  { icon: BookOpen, title: "Structured & Standardized OSH Training Programs", desc: "Comprehensive training that meets international standards and best practices in Occupational Safety and Health.", color: "from-primary/10 to-accent/10", border: "border-primary" },
  { icon: GraduationCap, title: "Practical, Industry-Focused Safety Education", desc: "Real-world training aligned with current industry practices and challenges in Rwanda's key sectors.", color: "from-secondary/10 to-accent/10", border: "border-secondary" },
  { icon: Lightbulb, title: "Skills-Based Learning (Rwanda Labour Regulations)", desc: "Training aligned with Rwanda Labour Regulations and international best practices.", color: "from-accent/10 to-primary/10", border: "border-accent" },
  { icon: Rocket, title: "Professional Development", desc: "Programs for individuals and corporate clients to advance safety culture and competence.", color: "from-secondary/10 to-primary/10", border: "border-secondary" },
];

const faqs = [
  { q: "What courses do you offer?", a: "We offer OSH foundation and advanced courses for Construction, Industrial, and Mining sectors, including Safety Officer and Safety Supervisor training aligned with national requirements." },
  { q: "How long are the programs?", a: "Duration varies by program—from short workshops to multi-week certification courses. Contact us for the specific program you are interested in." },
  { q: "Do you offer in-company training?", a: "Yes. We can deliver tailored training at your organization's premises for groups. Request a quote via the Contact page." },
  { q: "Are programs aligned with national regulations?", a: "Yes. Our training is aligned with Rwanda Labour Regulations and international OSH best practices to support certification and compliance." },
];

export default function Programs() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      <div className="h-24" aria-hidden="true" />

      <section className="relative text-white py-16 sm:py-20 md:py-28 min-h-[40vh] flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1523241597681-2c8e01840799?w=1920&q=80" alt="" className="w-full h-full object-cover hero-zoom" aria-hidden />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/90 to-secondary/90" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 hero-reveal-slow" style={{ animationDelay: "0.4s", animationFillMode: "both" }}>Our Programs</h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl hero-reveal-slow" style={{ animationDelay: "0.9s", animationFillMode: "both" }}>Comprehensive OSH training programs tailored to industry needs.</p>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-24 bg-gray-50 border-l-4 border-primary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 sm:mb-14 scroll-reveal reveal-right-slow delay-400">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-3">What We Provide</h2>
            <p className="text-gray-600 text-base sm:text-lg">Training that builds competent safety professionals.</p>
          </div>
          <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border border-gray-200 mb-10 sm:mb-14 scroll-reveal reveal-zoom delay-800">
            <img src="https://images.unsplash.com/photo-1523241597681-2c8e01840799?w=1200&q=80" alt="Training" className="w-full h-44 sm:h-56 object-cover" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {programs.map((item, idx) => (
              <div
                key={idx}
                className={`bg-gradient-to-br ${item.color} rounded-xl p-6 sm:p-8 border-l-4 ${item.border} hover:shadow-2xl transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] scroll-reveal reveal-up-slow`}
                style={{ animationDelay: `${1.2 + idx * 0.25}s` }}
              >
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <item.icon className="w-6 h-6" />
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
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-8 sm:mb-10 text-center reveal-scale-slow delay-400">Program FAQs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 w-full max-w-5xl mx-auto">
            {faqs.map((faq, idx) => (
              <details key={idx} className="group bg-white rounded-xl border-2 border-gray-200 overflow-hidden shadow-sm hover:border-primary/40 hover:shadow-md transition-all duration-300 scroll-reveal reveal-blur" style={{ animationDelay: `${0.7 + idx * 0.2}s` }}>
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
