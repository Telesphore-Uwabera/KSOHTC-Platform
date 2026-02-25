import { CheckCircle2, MapPin, Phone, Mail, Shield, Zap, BookOpen, Users } from "lucide-react";
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

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6 animate-scale-in">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110">
              <div className="text-5xl animate-float">🌍</div>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-up">
            Kigali Safety <br className="hidden sm:block" /> OSH Training Center
          </h1>

          <p className="text-2xl md:text-3xl text-accent font-bold mb-6 animate-fade-in-up animate-delay-100">
            Safety Today, Prosperity Tomorrow
          </p>

          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-10 animate-fade-in-up animate-delay-200 leading-relaxed">
            Professional Occupational Safety and Health training dedicated to developing competent safety professionals for Rwanda's leading sectors
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animate-delay-300">
            <button className="group bg-accent text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-accent-light transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 transform">
              Get Started
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-all duration-300 hover:shadow-lg">
              Learn More
            </button>
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
            <p className="text-gray-600 text-lg mt-4 max-w-2xl">Learn about our mission to develop competent safety professionals</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="animate-fade-in-left">
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                <span className="font-bold text-primary text-xl">Kigali Safety OSH Training Center (KSOTC)</span> is a professional Occupational Safety and Health (OSH) training institution dedicated to developing <span className="font-semibold text-primary">competent safety professionals</span> for Rwanda's key sectors:
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
                      Growing Demand for Qualified Officers
                    </p>
                    <p className="text-gray-600">
                      As Rwanda's economy continues to expand, the demand for qualified Safety Officers and Safety Supervisors is increasing exponentially.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-lg hover:bg-primary/5 transition-all duration-300 group">
                  <CheckCircle2 className="w-7 h-7 text-accent flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors">
                      Bridging the Gap
                    </p>
                    <p className="text-gray-600">
                      KSOTC exists to bridge this gap through structured, practical, and industry-relevant safety training programs.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-lg hover:bg-secondary/5 transition-all duration-300 group">
                  <Shield className="w-7 h-7 text-primary flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors">
                      Capacity Building Institution
                    </p>
                    <p className="text-gray-600">
                      KSOTC is not a short-course provider. It is a capacity-building institution contributing to national workplace safety improvement.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden md:grid grid-cols-2 gap-6 animate-fade-in-right">
              <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl h-56 flex items-center justify-center shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 group cursor-pointer border-2 border-primary/10 hover:border-primary/30">
                <div className="text-center">
                  <p className="text-6xl mb-4 group-hover:scale-125 transition-transform duration-300">👷</p>
                  <p className="font-bold text-gray-800 text-lg">Construction</p>
                  <p className="text-sm text-gray-600">Building safety</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-accent/20 to-primary/20 rounded-xl h-56 flex items-center justify-center shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 group cursor-pointer border-2 border-accent/10 hover:border-accent/30 animate-delay-100">
                <div className="text-center">
                  <p className="text-6xl mb-4 group-hover:scale-125 transition-transform duration-300">🏭</p>
                  <p className="font-bold text-gray-800 text-lg">Industrial</p>
                  <p className="text-sm text-gray-600">Workplace safety</p>
                </div>
              </div>
              <div className="col-span-2 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-xl h-56 flex items-center justify-center shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 group cursor-pointer border-2 border-secondary/10 hover:border-secondary/30 animate-delay-200">
                <div className="text-center">
                  <p className="text-6xl mb-4 group-hover:scale-125 transition-transform duration-300">⛏️</p>
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
            <p className="text-gray-600 text-lg mt-4 max-w-2xl">Comprehensive training programs tailored to industry needs</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: "📚",
                title: "Structured & Standardized Programs",
                desc: "OSH training programs that meet international standards and Rwanda Labour Laws",
                color: "from-primary/10 to-accent/10",
                border: "border-primary",
              },
              {
                icon: "🎓",
                title: "Practical, Industry-Focused Education",
                desc: "Real-world training aligned with current industry practices and challenges",
                color: "from-secondary/10 to-accent/10",
                border: "border-secondary",
              },
              {
                icon: "💡",
                title: "Skills-Based Learning",
                desc: "Training aligned with Rwanda Labour Regulations and international best practices",
                color: "from-accent/10 to-primary/10",
                border: "border-accent",
              },
              {
                icon: "🚀",
                title: "Professional Development",
                desc: "Training for individuals and corporate clients to advance safety culture",
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
                  <div className="text-4xl hover:scale-125 transition-transform duration-300">{item.icon}</div>
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

      {/* Graduates Training Section */}
      <section className="py-16 md:py-28 bg-gradient-to-br from-primary to-primary/90 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22><rect width=%2220%22 height=%2220%22 fill=%22white%22/></svg>')] bg-repeat"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 animate-fade-in-up">
            <h2 className="section-header text-white mb-2">What Our Graduates Are Trained To Do</h2>
            <p className="text-primary/90 text-lg">Master essential safety competencies</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: "Identify Workplace Hazards", desc: "Recognize and assess potential dangers in various work environments" },
              { title: "Conduct Risk Assessments", desc: "Evaluate hazards and determine appropriate control measures" },
              { title: "Implement Safety Controls", desc: "Deploy effective measures to minimize risks and protect workers" },
              { title: "Investigate Incidents", desc: "Conduct thorough analyses to prevent future workplace accidents" },
              { title: "Promote Safety Culture", desc: "Build organizational commitment to workplace safety excellence" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex gap-4 p-6 bg-white/10 backdrop-blur rounded-lg hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <CheckCircle2 className="w-8 h-8 text-accent flex-shrink-0 hover:scale-110 transition-transform" />
                <div>
                  <h3 className="text-lg font-bold mb-2 hover:text-accent transition-colors">{item.title}</h3>
                  <p className="text-primary/90">{item.desc}</p>
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
              <div className="p-8 space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className="w-8 h-8 rounded-full bg-accent text-secondary font-bold flex items-center justify-center flex-shrink-0 text-sm group-hover:scale-125 transition-transform">
                    ✓
                  </div>
                  <p className="text-gray-700 group-hover:text-primary transition-colors">
                    To provide <span className="font-bold text-primary">high-quality, practical, and industry-aligned OSH training</span> that develops competent professionals
                  </p>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="w-8 h-8 rounded-full bg-accent text-secondary font-bold flex items-center justify-center flex-shrink-0 text-sm group-hover:scale-125 transition-transform">
                    ✓
                  </div>
                  <p className="text-gray-700 group-hover:text-primary transition-colors">
                    Capable of <span className="font-bold text-primary">preventing workplace accidents</span> and promoting a strong safety culture
                  </p>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="w-8 h-8 rounded-full bg-accent text-secondary font-bold flex items-center justify-center flex-shrink-0 text-sm group-hover:scale-125 transition-transform">
                    ✓
                  </div>
                  <p className="text-gray-700 group-hover:text-primary transition-colors">
                    Across Rwanda and the region
                  </p>
                </div>
              </div>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-fade-in-right">
              <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-8 px-8">
                <h3 className="section-header text-white">Our Vision</h3>
              </div>
              <div className="p-8 space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className="text-2xl group-hover:scale-125 transition-transform">👑</div>
                  <p className="text-gray-700 group-hover:text-primary transition-colors">
                    To become the <span className="font-bold text-primary">leading Occupational Safety and Health training institution</span> in Rwanda
                  </p>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="text-2xl group-hover:scale-125 transition-transform">⭐</div>
                  <p className="text-gray-700 group-hover:text-primary transition-colors">
                    Recognized for <span className="font-bold text-secondary">excellence, accreditation & industry impact</span>
                  </p>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="text-2xl group-hover:scale-125 transition-transform">🌟</div>
                  <p className="text-gray-700 group-hover:text-primary transition-colors">
                    Building a safer, more prosperous region through professional safety education
                  </p>
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
              { emoji: "👷", name: "Construction", desc: "Specialized training for construction site safety and hazard management" },
              { emoji: "🏭", name: "Industrial", desc: "Comprehensive training for industrial operations and worker safety" },
              { emoji: "⛏️", name: "Mining", desc: "Expert training for mining operations and underground safety" },
            ].map((industry, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 text-center border-2 border-primary/20 hover:border-primary hover:shadow-2xl transition-all duration-300 hover:scale-110 hover:-translate-y-2 group animate-fade-in-up cursor-pointer"
                style={{ animationDelay: `${idx * 0.2}s` }}
              >
                <div className="text-6xl mb-6 inline-block group-hover:scale-125 transition-transform duration-300">{industry.emoji}</div>
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
                content: "0785 072 512",
              },
              {
                icon: Mail,
                title: "Email",
                content: "kigalisafetyosh\ntrainingcenter@gmail.com",
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
                  <p className="text-white/80 whitespace-pre-line">{contact.content}</p>
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
              Enroll Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold hover:scale-110 transition-transform duration-300">
              KS
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">KSOTC</h3>
          <p className="text-accent font-semibold mb-6">Safety Today, Prosperity Tomorrow</p>
          <div className="space-y-2 text-sm">
            <p>Kicukiro Center, Kigali, Rwanda</p>
            <p>Phone: 0785 072 512 | Email: kigalisafetyoshtrainingcenter@gmail.com</p>
            <p className="border-t border-gray-700 pt-4 mt-4">
              © 2024 Kigali Safety OSH Training Center. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
