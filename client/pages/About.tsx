import { CheckCircle2, Shield, HardHat, Building, Pickaxe, Crown, Star, Award, Sparkles, Building2, UserCheck, AlertTriangle, Users, Globe, Target } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function About() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      <div className="h-24" aria-hidden="true" />

      {/* Page hero with background image */}
      <section className="relative text-white py-16 sm:py-20 md:py-28 min-h-[40vh] flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80" alt="" className="w-full h-full object-cover hero-zoom" aria-hidden />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/90 to-secondary/90" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 hero-reveal-slow" style={{ animationDelay: "0.4s", animationFillMode: "both" }}>About Us</h1>
          <p className="text-base sm:text-xl text-white/90 max-w-2xl hero-reveal-slow" style={{ animationDelay: "0.9s", animationFillMode: "both" }}>Who we are, our mission, vision, and what our graduates are trained to do.</p>
        </div>
      </section>

      {/* Who We Are — left/right slow, delayed */}
      <section className="py-12 sm:py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 rounded-3xl border border-gray-200/60 bg-white/50 shadow-inner py-12">
          <div className="mb-8 sm:mb-12 scroll-reveal reveal-left-slow delay-400">
            <h2 className="section-header text-primary mb-4">Who We Are</h2>
            <p className="text-gray-600 text-lg max-w-2xl">A Professional Occupational Safety and Health (OSH) Training Institution serving Rwanda and the region.</p>
          </div>
          <div className="mb-12 rounded-2xl overflow-hidden shadow-lg border border-gray-200 scroll-reveal reveal-right-slow delay-800">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80"
              alt="Who We Are"
              className="w-full h-48 md:h-64 object-cover"
            />
          </div>
          {/* Intro text — full page width */}
          <p className="text-lg text-gray-700 mb-10 leading-relaxed w-full max-w-full scroll-reveal reveal-scale-slow delay-1200">
            <span className="font-bold text-primary text-xl">Kigali Safety OSH Training Center (KSOTC)</span> is dedicated to{" "}
            <span className="font-semibold text-primary">Developing Competent Safety Professionals</span> for Rwanda's key sectors: Construction, Industrial, and Mining.
          </p>

          {/* Row 1: Three goal cards — one row, full width */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-10">
            {[
              { title: "Bridging the Gap in Qualified Safety Officers", desc: "Addressing the growing demand for qualified Safety Officers and Safety Supervisors in Rwanda's expanding economy.", icon: CheckCircle2 },
              { title: "Building a Strong Safety Culture", desc: "Promoting organizational commitment to workplace safety excellence across all industries.", icon: CheckCircle2 },
              { title: "National Workplace Safety Improvement", desc: "Contributing to Rwanda's national workplace safety improvement through structured, practical training programs.", icon: Shield },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg hover:bg-primary/5 transition-all duration-300 group border border-gray-200/80 bg-white scroll-reveal reveal-up-slow" style={{ animationDelay: `${1.5 + idx * 0.2}s` }}>
                <item.icon className="w-7 h-7 text-accent flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                <div className="min-w-0">
                  <p className="font-bold text-gray-800 mb-1 group-hover:text-primary transition-colors">{item.title}</p>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Row 2: Three sector cards — one row, full width */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
            {[
              { icon: HardHat, label: "Construction", sub: "Building safety" },
              { icon: Building, label: "Industrial", sub: "Workplace safety" },
              { icon: Pickaxe, label: "Mining", sub: "Extraction safety" },
            ].map((item, idx) => (
              <div key={idx} className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl h-48 flex flex-col items-center justify-center shadow-lg border-2 border-primary/10 hover:border-primary/30 transition-all scroll-reveal reveal-blur" style={{ animationDelay: `${2 + idx * 0.25}s` }}>
                <item.icon className="w-16 h-16 text-primary mb-3" />
                <p className="font-bold text-gray-800">{item.label}</p>
                <p className="text-sm text-gray-600">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision — left/right slow, long delay */}
      <section className="py-16 md:py-24 bg-white border-t-2 border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 scroll-reveal reveal-scale-slow delay-400">Our Vision & Mission</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300 scroll-reveal reveal-left-slow delay-600">
              <div className="bg-gradient-to-r from-secondary to-secondary/80 text-white py-8 px-8">
                <h3 className="section-header text-white">Our Mission</h3>
              </div>
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80" alt="Mission" className="w-full h-40 object-cover" />
              </div>
              <div className="p-6 sm:p-8">
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-medium mb-6">To provide High-Quality, Practical, and Industry-Aligned OSH training that develops Competent Professionals to prevent workplace accidents and promote a strong safety culture across Rwanda and the Region:</p>
                <ul className="space-y-4">
                  {[
                    { icon: Award, text: "High-Quality", sub: "Rigorous, standards-based education" },
                    { icon: Sparkles, text: "Practical & Industry-Aligned", sub: "Real-world skills" },
                    { icon: Building2, text: "OSH training", sub: "Complete curriculum" },
                    { icon: UserCheck, text: "Competent Professionals", sub: "Safety Officers & Supervisors" },
                    { icon: AlertTriangle, text: "Prevent workplace accidents", sub: "Hazard and risk control" },
                    { icon: Users, text: "Strong safety culture", sub: "Across the Region" },
                    { icon: Globe, text: "Rwanda and the Region", sub: "Serving beyond borders" },
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4 items-start group">
                      <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                        <item.icon className="w-5 h-5" />
                      </span>
                      <div>
                        <span className="font-bold text-primary">{item.text}</span>
                        <p className="text-gray-600 text-sm mt-0.5">{item.sub}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300 reveal-right" style={{ animationDelay: "0.2s" }}>
              <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-8 px-8">
                <h3 className="section-header text-white">Our Vision</h3>
              </div>
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80" alt="Vision" className="w-full h-40 object-cover" />
              </div>
              <div className="p-8">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  To become the <span className="font-bold text-primary">Leading OSH Training Institution in Rwanda</span>, recognized for{" "}
                  <span className="font-bold text-secondary">Excellence, Accreditation & Measurable Industry Impact</span>.
                </p>
                <div className="space-y-4">
                  {[
                    { icon: Crown, title: "Excellence", desc: "Commitment to highest standards in OSH training and education" },
                    { icon: Star, title: "Accreditation", desc: "Recognized certification and regulatory compliance" },
                    { icon: Star, title: "Industry Impact", desc: "Measurable improvements in workplace safety across Rwanda" },
                    { icon: Target, title: "Quality Assurance", desc: "Continuous improvement of training delivery and outcomes" },
                    { icon: Globe, title: "Regional Leadership", desc: "Setting the standard for OSH education across the region" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 group">
                      <item.icon className="w-8 h-8 text-primary flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-gray-800">{item.title}</h4>
                        <p className="text-gray-600 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Our Graduates Are Trained To Do */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary to-primary/90 text-white relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-header text-white mb-2 scroll-reveal reveal-up-slow delay-400">What Our Graduates Are Trained To Do</h2>
          <p className="text-white/90 text-lg mb-12 scroll-reveal reveal-up-slow delay-800">Master essential safety competencies for workplace excellence.</p>
          <div className="mb-12 rounded-2xl overflow-hidden shadow-xl ring-2 ring-white/20 scroll-reveal reveal-zoom delay-1200">
            <img
              src="https://images.unsplash.com/photo-1523050857298-b0492b1eb587?w=1200&q=80"
              alt="Graduates training"
              className="w-full h-48 md:h-56 object-cover"
            />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              { title: "Identify Workplace Hazards", desc: "Recognize and assess potential dangers in various work environments" },
              { title: "Conduct Risk Assessments", desc: "Evaluate hazards and determine appropriate control measures" },
              { title: "Implement Safety Control Measures", desc: "Deploy effective measures to minimize risks and protect workers" },
              { title: "Investigate Workplace Incidents", desc: "Conduct thorough analyses to prevent future workplace accidents" },
              { title: "Promote Strong Safety Culture", desc: "Build organizational commitment to workplace safety excellence" },
              { title: "Apply OSH Standards and Compliance", desc: "Implement and maintain standards in line with national and international requirements" },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4 p-6 bg-white/10 backdrop-blur rounded-lg hover:bg-white/20 transition-all duration-300 scroll-reveal reveal-up-slow" style={{ animationDelay: `${1.6 + idx * 0.2}s` }}>
                <CheckCircle2 className="w-8 h-8 text-accent flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-bold mb-2 text-white">{item.title}</h3>
                  <p className="text-white/90">{item.desc}</p>
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
