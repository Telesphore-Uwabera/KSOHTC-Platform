import { Link } from "react-router-dom";
import { BookOpen, HardHat, Building, Pickaxe, ArrowRight } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const courses = [
  { id: "osh-foundation", title: "OSH Foundation", sector: "All sectors", desc: "Introduction to Occupational Safety and Health. Covers hazards, risk assessment, and basic control measures.", duration: "2 weeks", icon: BookOpen },
  { id: "safety-officer", title: "Safety Officer", sector: "Construction, Industrial, Mining", desc: "Certification program for Safety Officers. Aligned with national requirements and industry standards.", duration: "4 weeks", icon: HardHat },
  { id: "safety-supervisor", title: "Safety Supervisor", sector: "Construction, Industrial, Mining", desc: "Advanced training for Safety Supervisors. Incident investigation, safety culture, and compliance.", duration: "3 weeks", icon: Building },
  { id: "construction-osh", title: "Construction OSH", sector: "Construction", desc: "Site safety, fall prevention, PPE, and construction-specific risk management.", duration: "2 weeks", icon: HardHat },
  { id: "industrial-osh", title: "Industrial OSH", sector: "Industrial", desc: "Machinery safety, chemical handling, fire safety, and emergency response for industrial settings.", duration: "2 weeks", icon: Building },
  { id: "mining-osh", title: "Mining OSH", sector: "Mining", desc: "Underground safety, ventilation, explosives safety, and mining regulations.", duration: "3 weeks", icon: Pickaxe },
];

export default function Courses() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      <div className="h-24" aria-hidden="true" />

      <section className="relative text-white py-16 sm:py-20 md:py-28 min-h-[40vh] flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1523241597681-2c8e01840799?w=1920&q=80" alt="" className="w-full h-full object-cover hero-zoom" aria-hidden />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/90 to-secondary/90" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 hero-reveal-slow" style={{ animationDelay: "0.4s", animationFillMode: "both" }}>Our Courses</h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto hero-reveal-slow" style={{ animationDelay: "0.9s", animationFillMode: "both" }}>
            Register or log in to enroll and start studying. Choose a course below to get started.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10 scroll-reveal reveal-right-slow delay-400">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary">Available courses</h2>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-accent to-accent/80 text-black font-bold py-2.5 px-5 rounded-lg hover:shadow-lg transition-all duration-300"
              >
                Register to enroll
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center border-2 border-primary text-primary font-bold py-2.5 px-5 rounded-lg hover:bg-primary/5 transition-all duration-300"
              >
                Log in
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {courses.map((course, idx) => (
              <div
                key={course.id}
                className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300 scroll-reveal reveal-scale-slow"
                style={{ animationDelay: `${0.9 + idx * 0.15}s` }}
              >
                <div className="p-6 sm:p-8">
                  <span className="inline-flex w-12 h-12 rounded-xl bg-primary/10 items-center justify-center text-primary mb-4">
                    <course.icon className="w-6 h-6" />
                  </span>
                  <h3 className="text-xl font-bold text-primary mb-2">{course.title}</h3>
                  <p className="text-sm text-accent font-medium mb-2">{course.sector}</p>
                  <p className="text-gray-600 text-sm mb-4">{course.desc}</p>
                  <p className="text-gray-500 text-xs">Duration: {course.duration}</p>
                  <Link
                    to="/login"
                    className="mt-4 inline-flex items-center gap-2 text-primary font-semibold text-sm hover:text-accent transition-colors"
                  >
                    Enroll now
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
