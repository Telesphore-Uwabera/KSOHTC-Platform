import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle2, MapPin, Phone, Mail, Shield, BookOpen, HardHat, Building, Pickaxe, GraduationCap, Lightbulb, Rocket, Crown, Star, Award, Target, Sparkles, Building2, UserCheck, AlertTriangle, Users, Globe, Quote } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import type { Testimonial } from "@shared/api";

async function fetchTestimonials(): Promise<Testimonial[]> {
  const res = await fetch("/api/testimonials");
  if (!res.ok) throw new Error("Failed to load testimonials");
  return res.json();
}

export default function Index() {
  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ["testimonials"],
    queryFn: fetchTestimonials,
  });
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      {/* Spacer so content is not hidden under fixed nav */}
      <div className="h-20 sm:h-24 md:h-28 lg:h-32" aria-hidden="true" />

      {/* Hero Section — background image only, no hero image */}
      <section id="home" className="relative text-white py-12 sm:py-16 md:py-20 lg:py-28 overflow-hidden min-h-[70vh] sm:min-h-[75vh] flex flex-col justify-center">
        {/* Background image (Unsplash - professionals/training) */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&q=80"
            alt=""
            className="w-full h-full object-cover hero-zoom"
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/95 via-secondary/90 to-primary/90" />
        </div>
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary rounded-full blur-3xl animate-float animate-delay-300" />
        </div>

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <div className="w-full max-w-7xl flex flex-col items-center space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 bg-accent/20 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full hero-reveal-slow" style={{ animationDelay: "0.3s", animationFillMode: "both" }}>
              <Award className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
              <span className="text-accent font-semibold text-xs sm:text-sm">Professional OSH Training Institution</span>
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight hero-reveal-slow sm:whitespace-nowrap" style={{ animationDelay: "0.7s", animationFillMode: "both" }}>
              Kigali Safety OSH Training Center
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-accent font-bold hero-reveal-slow" style={{ animationDelay: "1.1s", animationFillMode: "both" }}>
              Safety Today, Prosperity Tomorrow!
            </p>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 w-full max-w-full leading-relaxed hero-reveal-slow" style={{ animationDelay: "1.5s", animationFillMode: "both" }}>
              Dedicated to Developing Competent Safety Professionals for Rwanda's Construction, Industrial & Mining Sectors
            </p>
            <div className="flex flex-row flex-nowrap gap-3 sm:gap-4 pt-2 hero-reveal-slow" style={{ animationDelay: "1.9s", animationFillMode: "both" }}>
              <Link to="/login" className="group bg-accent text-black px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:bg-accent/90 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transform inline-flex items-center justify-center shrink-0">
                ENROLL NOW!
                <Target className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="#who" className="bg-transparent border-2 border-white text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:bg-white/10 transition-all duration-300 hover:shadow-lg inline-flex items-center justify-center shrink-0">
                Learn More
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are Section — enter from left/right, delayed */}
      <section id="who" className="py-12 sm:py-16 md:py-20 lg:py-28 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 rounded-3xl sm:rounded-[2rem] border border-gray-200/60 bg-white/50 shadow-inner py-12 sm:py-16">
          <div className="mb-10 sm:mb-16 scroll-reveal reveal-left-slow delay-400">
            <div className="inline-block bg-primary text-white px-6 py-2.5 sm:px-8 sm:py-3 rounded-lg mb-3 sm:mb-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
              <h2 className="section-header">Who We Are</h2>
            </div>
            <p className="text-gray-600 text-base sm:text-lg mt-3 sm:mt-4 max-w-2xl">A Professional Occupational Safety and Health (OSH) Training Institution</p>
          </div>

          <div className="mb-8 sm:mb-12 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border border-gray-200 scroll-reveal reveal-right-slow delay-800">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80"
              alt="Team collaboration and professional training"
              className="w-full h-44 sm:h-52 md:h-64 object-cover"
            />
          </div>

          <div className="space-y-10 sm:space-y-12">
            <p className="text-lg text-gray-700 leading-relaxed max-w-3xl scroll-reveal reveal-up-slow delay-1200">
              <span className="font-bold text-primary text-xl">Kigali Safety OSH Training Center (KSOTC)</span> is dedicated to <span className="font-semibold text-primary">Developing Competent Safety Professionals</span> for Rwanda's key sectors.
            </p>

            {/* Description cards — scale in with stagger */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
              {[
                { icon: GraduationCap, title: "Bridging the Gap in Qualified Safety Officers", desc: "Addressing the growing demand for qualified Safety Officers and Safety Supervisors in Rwanda's expanding economy.", bg: "bg-accent/15" },
                { icon: Users, title: "Building a Strong Safety Culture", desc: "Promoting organizational commitment to workplace safety excellence across all industries.", bg: "bg-primary/10" },
                { icon: Shield, title: "National Workplace Safety Improvement", desc: "Contributing to Rwanda's national workplace safety improvement through structured, practical training programs.", bg: "bg-secondary/10" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col sm:flex-row gap-4 p-5 rounded-xl border border-gray-200/80 hover:border-primary/30 hover:shadow-md bg-white transition-all duration-300 group scroll-reveal reveal-scale-slow" style={{ animationDelay: `${1.4 + i * 0.25}s` }}>
                  <span className={`flex-shrink-0 w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center text-primary group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-6 h-6" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-bold text-gray-800 mb-1 group-hover:text-primary transition-colors text-sm sm:text-base">{item.title}</p>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Icon cards (Construction, Industrial, Mining) — same row, blur-in */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
              <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl min-h-[12rem] flex items-center justify-center shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group cursor-pointer border-2 border-primary/10 hover:border-primary/30 scroll-reveal reveal-blur delay-2200">
                <div className="text-center p-4">
                  <HardHat className="w-16 h-16 sm:w-20 sm:h-20 text-primary mb-3 group-hover:scale-110 transition-transform duration-300 mx-auto" />
                  <p className="font-bold text-gray-800 text-base sm:text-lg">Construction</p>
                  <p className="text-sm text-gray-600">Building safety</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-accent/20 to-primary/20 rounded-xl min-h-[12rem] flex items-center justify-center shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group cursor-pointer border-2 border-accent/10 hover:border-accent/30 scroll-reveal reveal-blur delay-2500">
                <div className="text-center p-4">
                  <Building className="w-16 h-16 sm:w-20 sm:h-20 text-accent mb-3 group-hover:scale-110 transition-transform duration-300 mx-auto" />
                  <p className="font-bold text-gray-800 text-base sm:text-lg">Industrial</p>
                  <p className="text-sm text-gray-600">Workplace safety</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-secondary/20 to-accent/20 rounded-xl min-h-[12rem] flex items-center justify-center shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group cursor-pointer border-2 border-secondary/10 hover:border-secondary/30 scroll-reveal reveal-blur delay-2800">
                <div className="text-center p-4">
                  <Pickaxe className="w-16 h-16 sm:w-20 sm:h-20 text-secondary mb-3 group-hover:scale-110 transition-transform duration-300 mx-auto" />
                  <p className="font-bold text-gray-800 text-base sm:text-lg">Mining</p>
                  <p className="text-sm text-gray-600">Extraction safety</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Provide Section — enter from right, zoom image, up-slow cards */}
      <section id="provide" className="py-16 md:py-28 bg-white relative border-l-4 border-primary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 scroll-reveal reveal-right-slow delay-400">
            <div className="inline-block bg-secondary text-white px-8 py-3 rounded-lg mb-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <h2 className="section-header">What We Provide</h2>
            </div>
            <p className="text-gray-600 text-lg mt-4 max-w-2xl">Comprehensive OSH training programs tailored to industry needs</p>
          </div>

          <div className="mb-8 sm:mb-12 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border border-gray-200 scroll-reveal reveal-zoom delay-800">
            <img
              src="https://images.unsplash.com/photo-1523241597681-2c8e01840799?w=1200&q=80"
              alt="Training and education"
              className="w-full h-44 sm:h-52 md:h-56 object-cover"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {[
              {
                icon: BookOpen,
                title: "Structured & Standardized OSH Training Programs",
                desc: "Comprehensive training programs that meet international standards and best practices in Occupational Safety and Health",
                color: "from-primary/10 to-accent/10",
                border: "border-primary",
              },
              {
                icon: GraduationCap,
                title: "Practical, Industry-Focused Safety Education",
                desc: "Real-world training aligned with current industry practices and challenges in Rwanda's key sectors",
                color: "from-secondary/10 to-accent/10",
                border: "border-secondary",
              },
              {
                icon: Lightbulb,
                title: "Skills-Based Learning (Rwanda Labour Regulations)",
                desc: "Training specifically aligned with Rwanda Labour Regulations and international best practices",
                color: "from-accent/10 to-primary/10",
                border: "border-accent",
              },
              {
                icon: Rocket,
                title: "Professional Development",
                desc: "Training programs for both individuals and corporate clients to advance safety culture and competence",
                color: "from-secondary/10 to-primary/10",
                border: "border-secondary",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`bg-gradient-to-br ${item.color} rounded-xl p-8 border-l-4 ${item.border} hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 scroll-reveal reveal-up-slow`}
                style={{ animationDelay: `${1.2 + idx * 0.3}s` }}
              >
                <div className="flex items-start gap-4">
                  <item.icon className="w-10 h-10 text-primary hover:scale-125 transition-transform duration-300" />
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-2">{item.title}</h3>
                    <p className="text-gray-700">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section — up-slow header, left-slow image, scale-slow cards */}
      <section id="industries" className="py-12 sm:py-16 md:py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 rounded-3xl border-2 border-accent/20 bg-white/70 shadow-lg py-12 sm:py-16">
          <div className="text-center mb-10 sm:mb-16 scroll-reveal reveal-up-slow delay-400">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-3 sm:mb-4">Industries We Serve</h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto px-2">Specialized training for Rwanda's key sectors</p>
          </div>

          <div className="mb-8 sm:mb-12 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border border-gray-200 scroll-reveal reveal-left-slow delay-800">
            <img
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80"
              alt="Industries we serve"
              className="w-full h-44 sm:h-52 md:h-64 object-cover"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              { icon: HardHat, name: "Construction", desc: "Specialized training for construction site safety and hazard management", img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80" },
              { icon: Building, name: "Industrial", desc: "Comprehensive training for industrial operations and worker safety", img: "https://images.unsplash.com/photo-1581092160562-40e53e5e2d0e?w=400&q=80" },
              { icon: Pickaxe, name: "Mining", desc: "Expert training for mining operations and underground safety", img: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3785?w=400&q=80" },
            ].map((industry, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl sm:rounded-2xl overflow-hidden text-center border-2 border-primary/20 hover:border-primary hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.99] group scroll-reveal reveal-scale-slow cursor-pointer"
                style={{ animationDelay: `${1.3 + idx * 0.35}s` }}
              >
                <img
                  src={industry.img}
                  alt={industry.name}
                  className="w-full h-40 sm:h-44 object-cover"
                />
                <div className="p-8">
                  <industry.icon className="w-24 h-24 text-primary mb-6 inline-block group-hover:scale-125 transition-transform duration-300" />
                  <h3 className="text-2xl font-bold text-primary mb-3 group-hover:text-accent transition-colors">{industry.name}</h3>
                  <p className="text-gray-600 group-hover:text-gray-800 transition-colors">{industry.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Graduates Training Section — up-slow + zoom, staggered cards */}
      <section className="py-16 md:py-28 bg-gradient-to-br from-primary to-primary/90 text-white relative overflow-hidden rounded-3xl mx-4 sm:mx-6 lg:mx-8 ring-2 ring-white/10">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22><rect width=%2220%22 height=%2220%22 fill=%22white%22/></svg>')] bg-repeat"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 scroll-reveal reveal-up-slow delay-400">
            <h2 className="section-header text-white mb-2">What Our Graduates Are Trained To Do</h2>
            <p className="text-primary/90 text-lg">Master essential safety competencies for workplace excellence</p>
          </div>

          <div className="mb-8 sm:mb-12 rounded-xl sm:rounded-2xl overflow-hidden shadow-xl ring-2 ring-white/20 scroll-reveal reveal-zoom delay-800">
            <img
              src="https://images.unsplash.com/photo-1523050857298-b0492b1eb587?w=1200&q=80"
              alt="Graduates and training"
              className="w-full h-44 sm:h-52 md:h-56 object-cover"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              { title: "Identify Workplace Hazards", desc: "Recognize and assess potential dangers in various work environments" },
              { title: "Conduct Risk Assessments", desc: "Evaluate hazards and determine appropriate control measures" },
              { title: "Implement Safety Control Measures", desc: "Deploy effective measures to minimize risks and protect workers" },
              { title: "Investigate Workplace Incidents", desc: "Conduct thorough analyses to prevent future workplace accidents" },
              { title: "Promote Strong Safety Culture", desc: "Build organizational commitment to workplace safety excellence" },
              { title: "Apply OSH Standards and Compliance", desc: "Implement and maintain standards in line with national and international requirements" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex gap-4 p-6 bg-white/10 backdrop-blur rounded-lg hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:-translate-y-1 scroll-reveal reveal-up-slow"
                style={{ animationDelay: `${1.2 + idx * 0.15}s` }}
              >
                <CheckCircle2 className="w-8 h-8 text-accent flex-shrink-0 hover:scale-110 transition-transform" />
                <div>
                  <h3 className="text-lg font-bold mb-2 text-white hover:text-accent transition-colors">{item.title}</h3>
                  <p className="text-white/90">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section — left/right slow with long delay */}
      <section id="mission" className="py-16 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 scroll-reveal reveal-scale-slow delay-400">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Our Vision & Mission</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-stretch">
            {/* Mission */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 scroll-reveal reveal-left-slow delay-600">
              <div className="bg-gradient-to-r from-secondary to-secondary/80 text-white py-8 px-8">
                <h3 className="section-header text-white">Our Mission</h3>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80"
                  alt="Our mission"
                  className="w-full h-36 sm:h-44 object-cover"
                />
              </div>
              <div className="p-6 sm:p-8">
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-medium mb-6">Our mission in detail:</p>
                <ul className="space-y-4">
                  {[
                    { icon: Award, text: "High-Quality training", sub: "Rigorous, standards-based OSH education" },
                    { icon: Sparkles, text: "Practical & Industry-Aligned", sub: "Real-world skills for Construction, Industrial & Mining" },
                    { icon: Building2, text: "Occupational Safety and Health", sub: "Complete OSH curriculum" },
                    { icon: UserCheck, text: "Competent Professionals", sub: "Develops certified Safety Officers and Supervisors" },
                    { icon: AlertTriangle, text: "Prevent workplace accidents", sub: "Hazard identification and risk control" },
                    { icon: Users, text: "Strong safety culture", sub: "Across organizations and the Region" },
                    { icon: Globe, text: "Rwanda and the Region", sub: "Serving Rwanda and beyond" },
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4 items-start group">
                      <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                        <item.icon className="w-5 h-5" />
                      </span>
                      <div>
                        <span className="font-bold text-gray-800 text-primary">{item.text}</span>
                        <p className="text-gray-600 text-sm mt-0.5">{item.sub}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 scroll-reveal reveal-right-slow delay-1000">
              <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-8 px-8">
                <h3 className="section-header text-white">Our Vision</h3>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80"
                  alt="Our vision"
                  className="w-full h-36 sm:h-44 object-cover"
                />
              </div>
              <div className="p-6 sm:p-8 pt-5 sm:pt-6">
                <p className="text-lg text-gray-700 leading-relaxed font-medium mb-5">
                  To become the <span className="font-bold text-primary">Leading Occupational Safety and Health Training Institution in Rwanda</span>, recognized for <span className="font-bold text-secondary">Excellence, Accreditation & Measurable Industry Impact</span>.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 group">
                    <Crown className="w-8 h-8 text-primary flex-shrink-0 mt-0.5 group-hover:scale-125 transition-transform" />
                    <div>
                      <h4 className="font-bold text-gray-800 group-hover:text-primary transition-colors">Excellence</h4>
                      <p className="text-gray-600 text-sm mt-0.5">Commitment to highest standards in OSH training and education</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 group">
                    <Star className="w-8 h-8 text-secondary flex-shrink-0 mt-0.5 group-hover:scale-125 transition-transform" />
                    <div>
                      <h4 className="font-bold text-gray-800 group-hover:text-primary transition-colors">Accreditation</h4>
                      <p className="text-gray-600 text-sm mt-0.5">Recognized certification and regulatory compliance</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 group">
                    <Star className="w-8 h-8 text-accent flex-shrink-0 mt-0.5 group-hover:scale-125 transition-transform" />
                    <div>
                      <h4 className="font-bold text-gray-800 group-hover:text-primary transition-colors">Industry Impact</h4>
                      <p className="text-gray-600 text-sm mt-0.5">Measurable improvements in workplace safety across Rwanda</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 group">
                    <Target className="w-8 h-8 text-primary flex-shrink-0 mt-0.5 group-hover:scale-125 transition-transform" />
                    <div>
                      <h4 className="font-bold text-gray-800 group-hover:text-primary transition-colors">Quality Assurance</h4>
                      <p className="text-gray-600 text-sm mt-0.5">Continuous improvement of training delivery and outcomes</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 group">
                    <Globe className="w-8 h-8 text-secondary flex-shrink-0 mt-0.5 group-hover:scale-125 transition-transform" />
                    <div>
                      <h4 className="font-bold text-gray-800 group-hover:text-primary transition-colors">Regional Leadership</h4>
                      <p className="text-gray-600 text-sm mt-0.5">Setting the standard for OSH education across the region</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section (admin-managed) */}
      <section id="testimonials" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <div className="text-center mb-10 sm:mb-14 scroll-reveal reveal-up reveal-delay-0 w-full max-w-3xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-3">What Our Participants Say</h2>
            <p className="text-gray-600 text-base sm:text-lg">Stories from professionals who trained with us</p>
          </div>
          {isLoading ? (
            <p className="text-gray-500 text-center py-8">Loading testimonials…</p>
          ) : testimonials.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No testimonials yet. Check back soon.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto">
              {testimonials.map((t, idx) => (
                <div
                  key={t.id}
                  className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm hover:border-primary/40 hover:shadow-md transition-all duration-300 scroll-reveal reveal-up"
                  style={{ animationDelay: `${0.1 + idx * 0.08}s` }}
                >
                  <Quote className="w-8 h-8 text-primary/60 mb-3" />
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    {t.avatarUrl ? (
                      <img src={t.avatarUrl} alt="" className="w-10 h-10 rounded-full object-cover bg-gray-200" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <UserCheck className="w-5 h-5 text-primary" />
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-gray-800">{t.name}</p>
                      <p className="text-gray-500 text-sm">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <div className="text-center mb-10 sm:mb-14 scroll-reveal reveal-up reveal-delay-0 w-full max-w-3xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-3">Frequently Asked Questions</h2>
            <p className="text-gray-600 text-base sm:text-lg">Common questions about our OSH training and enrollment</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 w-full max-w-5xl mx-auto">
            {[
              { q: "What is OSH training?", a: "Occupational Safety and Health (OSH) training prepares professionals to identify hazards, assess risks, and implement safety measures in workplaces. Our programs align with Rwanda Labour Regulations and international best practices." },
              { q: "Who can enroll?", a: "Individuals and corporate clients can enroll. No specific prior qualification is required for foundation courses; some advanced programs may have prerequisites. Contact us for details." },
              { q: "Where are trainings held?", a: "We are based at Kicukiro Center, Kigali, Rwanda. Trainings can be held on-site or at your organization's premises for group enrollments." },
              { q: "Are certificates issued?", a: "Yes. Successful participants receive certificates of completion. Our programs are designed to support recognition and accreditation in line with national and industry standards." },
              { q: "How do I enroll or get a quote?", a: "Use the contact form below, call/WhatsApp +250 785 072 512, or email kigalisafetyoshtrainingcenter@gmail.com. We will respond with enrollment steps or a tailored quote for your organization." },
              { q: "What sectors do you train for?", a: "We provide OSH training for Construction, Industrial, and Mining sectors, with programs tailored to each industry's safety requirements and national regulations." },
            ].map((faq, idx) => (
              <details
                key={idx}
                className="group bg-white rounded-xl border-2 border-gray-200 overflow-hidden shadow-sm hover:border-primary/40 hover:shadow-md transition-all duration-300 scroll-reveal reveal-up"
                style={{ animationDelay: `${0.2 + idx * 0.06}s` }}
              >
                <summary className="flex items-start sm:items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5 cursor-pointer list-none font-semibold text-gray-800 hover:text-primary transition-colors min-h-[3.5rem]">
                  <span className="text-left text-sm sm:text-base line-clamp-2 flex-1 pr-2">{faq.q}</span>
                  <span className="text-primary text-xl sm:text-2xl shrink-0 transition-transform duration-300 group-open:rotate-45 flex items-center">+</span>
                </summary>
                <p className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 text-gray-600 text-sm sm:text-base leading-relaxed border-t border-gray-100 bg-gray-50/50">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section — up-slow + zoom, scale-slow cards */}
      <section id="contact" className="py-16 md:py-28 bg-gradient-to-br from-secondary via-secondary/95 to-secondary/90 text-white relative overflow-hidden rounded-3xl mx-4 sm:mx-6 lg:mx-8 ring-2 ring-white/20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-float"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 scroll-reveal reveal-up-slow delay-400">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h2>
            <p className="text-accent text-lg">We're here to answer your questions</p>
          </div>

          <div className="mb-8 sm:mb-12 rounded-xl sm:rounded-2xl overflow-hidden shadow-xl ring-2 ring-white/20 scroll-reveal reveal-zoom delay-800">
            <img
              src="https://images.unsplash.com/photo-1497366216548-ee70bd0e0067?w=1200&q=80"
              alt="Get in touch"
              className="w-full h-40 sm:h-48 object-cover"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-12">
            {[
              {
                icon: MapPin,
                title: "Address",
                content: "Kicukiro Center\nKigali, Rwanda",
              },
              {
                icon: Phone,
                title: "Phone / WhatsApp",
                content: "+250 785 072 512",
                link: "tel:+250785072512",
              },
              {
                icon: Mail,
                title: "Email",
                content: "kigalisafetyoshtrainingcenter@gmail.com",
                link: "mailto:kigalisafetyoshtrainingcenter@gmail.com",
              },
            ].map((contact, idx) => {
              const Icon = contact.icon;
              return (
                <div
                  key={idx}
                  className="bg-gray-600/50 backdrop-blur rounded-2xl p-8 text-center hover:bg-gray-500/50 transition-all duration-300 hover:scale-110 hover:-translate-y-2 group scroll-reveal reveal-scale-slow"
                  style={{ animationDelay: `${1.2 + idx * 0.35}s` }}
                >
                  <Icon className="w-12 h-12 mx-auto mb-4 text-accent group-hover:scale-125 transition-transform" />
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-accent transition-colors">{contact.title}</h3>
                  <p className="text-gray-200 whitespace-pre-line">
                    {contact.link ? (
                      <a 
                        href={contact.link} 
                        className="text-gray-200 hover:text-accent transition-colors underline decoration-dotted underline-offset-2"
                        onClick={(e) => {
                          if (contact.link.startsWith('tel:')) {
                            e.stopPropagation();
                          }
                        }}
                      >
                        {contact.content}
                      </a>
                    ) : (
                      contact.content
                    )}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="bg-white/10 backdrop-blur rounded-2xl p-6 sm:p-8 mb-8 border border-white/20 shadow-xl">
            <form className="max-w-2xl mx-auto space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-5 py-3.5 sm:px-6 sm:py-4 rounded-xl bg-white/20 border-2 border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-accent focus:bg-white/30 transition-all duration-300"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-5 py-3.5 sm:px-6 sm:py-4 rounded-xl bg-white/20 border-2 border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-accent focus:bg-white/30 transition-all duration-300"
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full px-5 py-3.5 sm:px-6 sm:py-4 rounded-xl bg-white/20 border-2 border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-accent focus:bg-white/30 transition-all duration-300 resize-none"
              />
              <button type="button" className="w-full bg-gradient-to-r from-accent to-accent/80 text-black font-bold py-3.5 sm:py-4 rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]">
                Send Message
              </button>
            </form>
          </div>

          <div className="text-center">
            <Link to="/login" className="inline-block bg-gradient-to-r from-accent to-accent/80 text-black px-8 sm:px-12 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] transform scroll-reveal reveal-zoom delay-2200">
              ENROLL NOW!
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
