import { CheckCircle2, MapPin, Phone, Mail, Shield, Zap, BookOpen, Users, Globe, HardHat, Building, Pickaxe, GraduationCap, Lightbulb, Rocket, Crown, Star, Award, Target } from "lucide-react";
import Header from "../components/Header";

export default function Index() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <section id="home" className="relative bg-gradient-to-br from-secondary via-secondary to-secondary/95 text-white py-16 md:py-28 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary rounded-full blur-3xl animate-float animate-delay-300"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="animate-fade-in-left">
              <div className="inline-flex items-center gap-2 bg-accent/20 px-4 py-2 rounded-full mb-6">
                <Award className="w-5 h-5 text-accent" />
                <span className="text-accent font-semibold text-sm">Professional OSH Training Institution</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-up">
                Kigali Safety <br className="hidden sm:block" /> OSH Training Center
              </h1>

              <p className="text-2xl md:text-3xl text-accent font-bold mb-6 animate-fade-in-up animate-delay-100">
                Safety Today, Prosperity Tomorrow!
              </p>

              <p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-8 animate-fade-in-up animate-delay-200 leading-relaxed">
                Dedicated to Developing Competent Safety Professionals for Rwanda's Construction, Industrial & Mining Sectors
              </p>

              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animate-delay-300">
                <a href="#contact" className="group bg-accent text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-accent-light transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 transform inline-flex items-center">
                  ENROLL NOW!
                  <Target className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#who" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-all duration-300 hover:shadow-lg inline-flex items-center">
                  Learn More
                  <Shield className="w-5 h-5 ml-2" />
                </a>
              </div>
            </div>

            {/* Right Visual */}
            <div className="hidden md:flex justify-center animate-fade-in-right">
              <img 
                src="/navigation-logo.jpeg" 
                alt="KSOTC Logo" 
                className="w-48 h-48 object-contain transition-all duration-300 hover:scale-110 animate-float"
                style={{ mixBlendMode: 'multiply', filter: 'contrast(1.5)' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section id="who" className="py-16 md:py-28 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 animate-fade-in-up">
            <div className="inline-block bg-primary text-white px-8 py-3 rounded-lg mb-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <h2 className="section-header">Who We Are</h2>
            </div>
            <p className="text-gray-600 text-lg mt-4 max-w-2xl">A Professional Occupational Safety and Health (OSH) Training Institution</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="animate-fade-in-left">
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                <span className="font-bold text-primary text-xl">Kigali Safety OSH Training Center (KSOTC)</span> is dedicated to <span className="font-semibold text-primary">Developing Competent Safety Professionals</span> for Rwanda's key sectors:
              </p>

              <div className="space-y-4 mb-10">
                <div className="flex gap-4 items-center group cursor-pointer">
                  <span className="text-accent font-bold text-3xl group-hover:scale-125 transition-transform">•</span>
                  <span className="text-lg text-gray-700 group-hover:text-primary transition-colors"><span className="font-semibold">Construction</span></span>
                </div>
                <div className="flex gap-4 items-center group cursor-pointer">
                  <span className="text-accent font-bold text-3xl group-hover:scale-125 transition-transform">•</span>
                  <span className="text-lg text-gray-700 group-hover:text-primary transition-colors"><span className="font-semibold">Industrial</span></span>
                </div>
                <div className="flex gap-4 items-center group cursor-pointer">
                  <span className="text-accent font-bold text-3xl group-hover:scale-125 transition-transform">•</span>
                  <span className="text-lg text-gray-700 group-hover:text-primary transition-colors"><span className="font-semibold">Mining</span></span>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4 p-4 rounded-lg hover:bg-primary/5 transition-all duration-300 group">
                  <CheckCircle2 className="w-7 h-7 text-accent flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors">
                      Bridging the Gap in Qualified Safety Officers
                    </p>
                    <p className="text-gray-600">
                      Addressing the growing demand for qualified Safety Officers and Safety Supervisors in Rwanda's expanding economy.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-lg hover:bg-primary/5 transition-all duration-300 group">
                  <CheckCircle2 className="w-7 h-7 text-accent flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors">
                      Building a Strong Safety Culture
                    </p>
                    <p className="text-gray-600">
                      Promoting organizational commitment to workplace safety excellence across all industries.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-lg hover:bg-secondary/5 transition-all duration-300 group">
                  <Shield className="w-7 h-7 text-primary flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors">
                      National Workplace Safety Improvement
                    </p>
                    <p className="text-gray-600">
                      Contributing to Rwanda's national workplace safety improvement through structured, practical training programs.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden md:grid grid-cols-2 gap-6 animate-fade-in-right">
              <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl h-56 flex items-center justify-center shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 group cursor-pointer border-2 border-primary/10 hover:border-primary/30">
                <div className="text-center">
                  <HardHat className="w-24 h-24 text-primary mb-4 group-hover:scale-125 transition-transform duration-300" />
                  <p className="font-bold text-gray-800 text-lg">Construction</p>
                  <p className="text-sm text-gray-600">Building safety</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-accent/20 to-primary/20 rounded-xl h-56 flex items-center justify-center shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 group cursor-pointer border-2 border-accent/10 hover:border-accent/30 animate-delay-100">
                <div className="text-center">
                  <Building className="w-24 h-24 text-accent mb-4 group-hover:scale-125 transition-transform duration-300" />
                  <p className="font-bold text-gray-800 text-lg">Industrial</p>
                  <p className="text-sm text-gray-600">Workplace safety</p>
                </div>
              </div>
              <div className="col-span-2 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-xl h-56 flex items-center justify-center shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 group cursor-pointer border-2 border-secondary/10 hover:border-secondary/30 animate-delay-200">
                <div className="text-center">
                  <Pickaxe className="w-24 h-24 text-secondary mb-4 group-hover:scale-125 transition-transform duration-300" />
                  <p className="font-bold text-gray-800 text-lg">Mining</p>
                  <p className="text-sm text-gray-600">Extraction safety</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Provide Section */}
      <section id="provide" className="py-16 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 animate-fade-in-up">
            <div className="inline-block bg-secondary text-white px-8 py-3 rounded-lg mb-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <h2 className="section-header">What We Provide</h2>
            </div>
            <p className="text-gray-600 text-lg mt-4 max-w-2xl">Comprehensive OSH training programs tailored to industry needs</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
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
                className={`bg-gradient-to-br ${item.color} rounded-xl p-8 border-l-4 ${item.border} hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 animate-fade-in-up`}
                style={{ animationDelay: `${idx * 0.15}s` }}
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

      {/* Industries Section */}
      <section id="industries" className="py-16 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">Industries We Serve</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Specialized training for Rwanda's key sectors</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: HardHat, name: "Construction", desc: "Specialized training for construction site safety and hazard management" },
              { icon: Building, name: "Industrial", desc: "Comprehensive training for industrial operations and worker safety" },
              { icon: Pickaxe, name: "Mining", desc: "Expert training for mining operations and underground safety" },
            ].map((industry, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 text-center border-2 border-primary/20 hover:border-primary hover:shadow-2xl transition-all duration-300 hover:scale-110 hover:-translate-y-2 group animate-fade-in-up cursor-pointer"
                style={{ animationDelay: `${idx * 0.2}s` }}
              >
                <industry.icon className="w-24 h-24 text-primary mb-6 inline-block group-hover:scale-125 transition-transform duration-300" />
                <h3 className="text-2xl font-bold text-primary mb-3 group-hover:text-accent transition-colors">{industry.name}</h3>
                <p className="text-gray-600 group-hover:text-gray-800 transition-colors">{industry.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Graduates Training Section */}
      <section className="py-16 md:py-28 bg-gradient-to-br from-primary to-primary/90 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22><rect width=%2220%22 height=%2220%22 fill=%22white%22/></svg>')] bg-repeat"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 animate-fade-in-up">
            <h2 className="section-header text-white mb-2">What Our Graduates Are Trained To Do</h2>
            <p className="text-primary/90 text-lg">Master essential safety competencies for workplace excellence</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: "Identify Workplace Hazards", desc: "Recognize and assess potential dangers in various work environments" },
              { title: "Conduct Risk Assessments", desc: "Evaluate hazards and determine appropriate control measures" },
              { title: "Implement Safety Control Measures", desc: "Deploy effective measures to minimize risks and protect workers" },
              { title: "Investigate Workplace Incidents", desc: "Conduct thorough analyses to prevent future workplace accidents" },
              { title: "Promote Strong Safety Culture", desc: "Build organizational commitment to workplace safety excellence" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex gap-4 p-6 bg-white/10 backdrop-blur rounded-lg hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
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

      {/* Mission & Vision Section */}
      <section id="mission" className="py-16 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Our Vision & Mission</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-fade-in-left">
              <div className="bg-gradient-to-r from-secondary to-secondary/80 text-white py-8 px-8">
                <h3 className="section-header text-white">Our Mission</h3>
              </div>
              <div className="p-8">
                <p className="text-lg text-gray-700 leading-relaxed font-medium">
                  To provide <span className="font-bold text-primary">High-Quality, Practical, and Industry-Aligned Occupational Safety and Health training</span> that develops <span className="font-bold text-primary">Competent Professionals</span> to prevent workplace accidents and promote a strong safety culture across Rwanda and the Region.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-fade-in-right">
              <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-8 px-8">
                <h3 className="section-header text-white">Our Vision</h3>
              </div>
              <div className="p-8">
                <p className="text-lg text-gray-700 leading-relaxed font-medium mb-6">
                  To become the <span className="font-bold text-primary">Leading Occupational Safety and Health Training Institution in Rwanda</span>, recognized for <span className="font-bold text-secondary">Excellence, Accreditation & Measurable Industry Impact</span>.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4 group">
                    <Crown className="w-8 h-8 text-primary group-hover:scale-125 transition-transform" />
                    <div>
                      <h4 className="font-bold text-gray-800 group-hover:text-primary transition-colors">Excellence</h4>
                      <p className="text-gray-600 text-sm">Commitment to highest standards in OSH training and education</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 group">
                    <Star className="w-8 h-8 text-secondary group-hover:scale-125 transition-transform" />
                    <div>
                      <h4 className="font-bold text-gray-800 group-hover:text-primary transition-colors">Accreditation</h4>
                      <p className="text-gray-600 text-sm">Recognized certification and regulatory compliance</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 group">
                    <Star className="w-8 h-8 text-accent group-hover:scale-125 transition-transform" />
                    <div>
                      <h4 className="font-bold text-gray-800 group-hover:text-primary transition-colors">Industry Impact</h4>
                      <p className="text-gray-600 text-sm">Measurable improvements in workplace safety across Rwanda</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section id="industries" className="py-16 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">Industries We Serve</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Specialized training for Rwanda's key sectors</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: HardHat, name: "Construction", desc: "Specialized training for construction site safety and hazard management" },
              { icon: Building, name: "Industrial", desc: "Comprehensive training for industrial operations and worker safety" },
              { icon: Pickaxe, name: "Mining", desc: "Expert training for mining operations and underground safety" },
            ].map((industry, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 text-center border-2 border-primary/20 hover:border-primary hover:shadow-2xl transition-all duration-300 hover:scale-110 hover:-translate-y-2 group animate-fade-in-up cursor-pointer"
                style={{ animationDelay: `${idx * 0.2}s` }}
              >
                <industry.icon className="w-24 h-24 text-primary mb-6 inline-block group-hover:scale-125 transition-transform duration-300" />
                <h3 className="text-2xl font-bold text-primary mb-3 group-hover:text-accent transition-colors">{industry.name}</h3>
                <p className="text-gray-600 group-hover:text-gray-800 transition-colors">{industry.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-28 bg-gradient-to-br from-secondary via-secondary/95 to-secondary/90 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-float"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h2>
            <p className="text-accent text-lg">We're here to answer your questions</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
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
                  className="bg-white/10 backdrop-blur rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300 hover:scale-110 hover:-translate-y-2 group animate-fade-in-up"
                  style={{ animationDelay: `${idx * 0.15}s` }}
                >
                  <Icon className="w-12 h-12 mx-auto mb-4 text-accent group-hover:scale-125 transition-transform" />
                  <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">{contact.title}</h3>
                  <p className="text-primary/90 whitespace-pre-line">
                    {contact.link ? (
                      <a 
                        href={contact.link} 
                        className="hover:text-accent transition-colors underline decoration-dotted underline-offset-2"
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

          <div className="bg-white/10 backdrop-blur rounded-2xl p-8 mb-8 animate-fade-in-up animate-delay-500">
            <form className="max-w-2xl mx-auto space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-6 py-4 rounded-lg bg-white/20 border-2 border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-accent focus:bg-white/30 transition-all duration-300"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-6 py-4 rounded-lg bg-white/20 border-2 border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-accent focus:bg-white/30 transition-all duration-300"
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full px-6 py-4 rounded-lg bg-white/20 border-2 border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-accent focus:bg-white/30 transition-all duration-300 resize-none"
              ></textarea>
              <button className="w-full bg-gradient-to-r from-accent to-accent/80 text-black font-bold py-4 rounded-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 transform hover:from-accent/90 to-accent/70">
                Send Message
              </button>
            </form>
          </div>

          <div className="text-center">
            <button className="inline-block bg-gradient-to-r from-accent to-accent/80 text-black px-12 py-4 rounded-lg font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 transform animate-fade-in-up animate-delay-400">
              ENROLL NOW!
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 items-start">
            
            {/* Column 1: Logo & Branding */}
            <div className="flex flex-col items-start text-left lg:col-span-1 lg:col-start-1">
              <img 
                src="/footer-logo.jpeg" 
                alt="KSOTC Footer Logo" 
                className="w-32 h-32 object-contain transition-all duration-300 hover:scale-110 bg-white rounded-full p-2 mb-6"
              />
              <p className="text-accent font-semibold text-sm mb-2 whitespace-nowrap">Kigali Safety OSH Training Center</p>
              <p className="text-accent font-medium text-sm whitespace-nowrap">Safety Today, Prosperity Tomorrow!</p>
            </div>

            {/* Column 2: Quick Links - Left aligned on all screens */}
            <div className="lg:col-span-3 lg:col-start-2 lg:flex lg:justify-center">
              <div className="text-left w-full max-w-xs">
                <h4 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Quick Links</h4>
                <ul className="space-y-3">
                  <li><a href="#home" className="hover:text-accent transition-colors duration-300 flex items-center gap-2">
                    <span className="w-1 h-1 bg-accent rounded-full"></span>
                    Home
                  </a></li>
                  <li><a href="#who" className="hover:text-accent transition-colors duration-300 flex items-center gap-2">
                    <span className="w-1 h-1 bg-accent rounded-full"></span>
                    About Us
                  </a></li>
                  <li><a href="#provide" className="hover:text-accent transition-colors duration-300 flex items-center gap-2">
                    <span className="w-1 h-1 bg-accent rounded-full"></span>
                    Programs
                  </a></li>
                  <li><a href="#industries" className="hover:text-accent transition-colors duration-300 flex items-center gap-2">
                    <span className="w-1 h-1 bg-accent rounded-full"></span>
                    Industries
                  </a></li>
                  <li><a href="#mission" className="hover:text-accent transition-colors duration-300 flex items-center gap-2">
                    <span className="w-1 h-1 bg-accent rounded-full"></span>
                    Mission
                  </a></li>
                  <li><a href="#contact" className="hover:text-accent transition-colors duration-300 flex items-center gap-2">
                    <span className="w-1 h-1 bg-accent rounded-full"></span>
                    Contact
                  </a></li>
                </ul>
              </div>
            </div>

            {/* Column 3: Contact Info - Left aligned on all screens */}
            <div className="text-left lg:col-span-1 lg:col-start-5">
              <h4 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Contact</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 whitespace-nowrap">
                  <MapPin className="w-4 h-4 text-accent flex-shrink-0" />
                  <span className="truncate">Kicukiro Center, Kigali, Rwanda</span>
                </div>

                <div className="flex items-center gap-3 whitespace-nowrap">
                  <Phone className="w-4 h-4 text-accent flex-shrink-0" />
                  <a
                    href="tel:+250785072512"
                    className="hover:text-accent transition-colors duration-300"
                  >
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
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700 pt-8 mt-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-400">
                © 2024 Kigali Safety OSH Training Center. All rights reserved.
              </p>
              <div className="flex items-center gap-6 text-sm text-gray-400">
                <a href="#privacy" className="hover:text-accent transition-colors duration-300">Privacy Policy</a>
                <a href="#terms" className="hover:text-accent transition-colors duration-300">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
