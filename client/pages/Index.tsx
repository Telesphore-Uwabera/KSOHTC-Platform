import { CheckCircle2, MapPin, Phone, Mail, Shield } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-sm">
              KS
            </div>
            <div>
              <h1 className="font-bold text-primary text-lg">KSOTC</h1>
              <p className="text-xs text-gray-600">Safety Training Center</p>
            </div>
          </div>
          <nav className="hidden md:flex gap-8">
            <a href="#who" className="text-gray-700 hover:text-primary transition font-medium">
              Who We Are
            </a>
            <a href="#provide" className="text-gray-700 hover:text-primary transition font-medium">
              What We Provide
            </a>
            <a href="#mission" className="text-gray-700 hover:text-primary transition font-medium">
              Mission
            </a>
            <a href="#contact" className="text-gray-700 hover:text-primary transition font-medium">
              Contact
            </a>
          </nav>
          <button className="hidden md:block bg-accent text-black px-6 py-2 rounded-lg font-semibold hover:bg-accent-light transition">
            Enroll Now
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-secondary to-secondary/95 text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
              <div className="text-3xl font-bold text-secondary">🌍</div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Kigali Safety <br className="hidden sm:block" /> OSH Training Center
          </h1>
          <p className="text-xl md:text-2xl text-amber-300 font-semibold mb-8">
            Safety Today, Prosperity Tomorrow
          </p>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto mb-10">
            Professional Occupational Safety and Health training dedicated to developing competent safety professionals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-accent text-black px-8 py-3 rounded-lg font-bold text-lg hover:bg-accent-light transition shadow-lg">
              Get Started
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-white/10 transition">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section id="who" className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="inline-block bg-primary text-white px-6 py-2 rounded-lg mb-6">
              <h2 className="section-header">Who We Are</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                <span className="font-bold text-primary">Kigali Safety OSH Training Center (KSOTC)</span> is a professional Occupational Safety and Health (OSH) training institution dedicated to developing <span className="font-semibold text-primary">competent safety professionals</span> for Rwanda's
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex gap-4">
                  <span className="text-primary font-bold text-2xl">•</span>
                  <span className="text-lg text-gray-700"><span className="font-semibold text-primary">Construction</span></span>
                </div>
                <div className="flex gap-4">
                  <span className="text-primary font-bold text-2xl">•</span>
                  <span className="text-lg text-gray-700"><span className="font-semibold text-primary">Industrial</span></span>
                </div>
                <div className="flex gap-4">
                  <span className="text-primary font-bold text-2xl">•</span>
                  <span className="text-lg text-gray-700"><span className="font-semibold text-primary">Mining</span></span>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-800 mb-2">
                      Growing Demand for Qualified Officers
                    </p>
                    <p className="text-gray-600">
                      As Rwanda's economy continues to expand, the demand for qualified Safety Officers and Safety Supervisors is increasing.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-800 mb-2">
                      Bridging the Gap
                    </p>
                    <p className="text-gray-600">
                      KSOTC exists to bridge this gap through structured, practical, and industry-relevant safety training.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-800 mb-2">
                      Capacity Building Institution
                    </p>
                    <p className="text-gray-600">
                      KSOTC is not a short-course provider. It is a capacity-building institution contributing national workplace safety improvement.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden md:grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg h-48 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-4xl mb-2">👷</p>
                  <p className="font-semibold text-gray-700">Construction</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg h-48 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-4xl mb-2">🏭</p>
                  <p className="font-semibold text-gray-700">Industrial</p>
                </div>
              </div>
              <div className="col-span-2 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-lg h-48 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-4xl mb-2">⛏️</p>
                  <p className="font-semibold text-gray-700">Mining</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Provide Section */}
      <section id="provide" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="inline-block bg-secondary text-white px-6 py-2 rounded-lg mb-6">
              <h2 className="section-header">What We Provide</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-8 border-l-4 border-primary hover:shadow-lg transition">
              <div className="flex items-start gap-4">
                <div className="text-3xl">📚</div>
                <div>
                  <h3 className="text-xl font-bold text-primary mb-2">Structured & Standardized Programs</h3>
                  <p className="text-gray-700">OSH training programs that meet international standards and Rwanda Labour Laws</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-secondary/10 to-accent/10 rounded-xl p-8 border-l-4 border-secondary hover:shadow-lg transition">
              <div className="flex items-start gap-4">
                <div className="text-3xl">🎓</div>
                <div>
                  <h3 className="text-xl font-bold text-secondary mb-2">Practical, Industry-Focused Education</h3>
                  <p className="text-gray-700">Real-world training aligned with current industry practices and challenges</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-accent/10 to-primary/10 rounded-xl p-8 border-l-4 border-accent hover:shadow-lg transition">
              <div className="flex items-start gap-4">
                <div className="text-3xl">💡</div>
                <div>
                  <h3 className="text-xl font-bold text-primary mb-2">Skills-Based Learning</h3>
                  <p className="text-gray-700">Training aligned with Rwanda Labour Regulations and international best practices</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-secondary/10 to-primary/10 rounded-xl p-8 border-l-4 border-secondary hover:shadow-lg transition">
              <div className="flex items-start gap-4">
                <div className="text-3xl">🚀</div>
                <div>
                  <h3 className="text-xl font-bold text-secondary mb-2">Professional Development</h3>
                  <p className="text-gray-700">Training for individuals and corporate clients to advance safety culture</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Graduates Training Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary to-primary/90 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="section-header text-white mb-2">What Our Graduates Are Trained To Do</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <CheckCircle2 className="w-8 h-8 text-accent flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold mb-2">Identify Workplace Hazards</h3>
                <p className="text-primary/90">Recognize and assess potential dangers in various work environments</p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle2 className="w-8 h-8 text-accent flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold mb-2">Conduct Risk Assessments</h3>
                <p className="text-primary/90">Evaluate hazards and determine appropriate control measures</p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle2 className="w-8 h-8 text-accent flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold mb-2">Implement Safety Controls</h3>
                <p className="text-primary/90">Deploy effective measures to minimize risks and protect workers</p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle2 className="w-8 h-8 text-accent flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold mb-2">Investigate Incidents</h3>
                <p className="text-primary/90">Conduct thorough analyses to prevent future workplace accidents</p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle2 className="w-8 h-8 text-accent flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold mb-2">Promote Safety Culture</h3>
                <p className="text-primary/90">Build organizational commitment to workplace safety excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section id="mission" className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-secondary text-white py-8 px-8">
                <h3 className="section-header">Our Mission</h3>
              </div>
              <div className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-8 h-8 rounded-full bg-accent text-secondary font-bold flex items-center justify-center flex-shrink-0 text-sm">
                    ✓
                  </div>
                  <p className="text-gray-700">
                    To provide <span className="font-bold text-primary">high-quality, practical, and industry-aligned OSH training</span> that develops competent professionals
                  </p>
                </div>
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-8 h-8 rounded-full bg-accent text-secondary font-bold flex items-center justify-center flex-shrink-0 text-sm">
                    ✓
                  </div>
                  <p className="text-gray-700">
                    Capable of <span className="font-bold text-primary">preventing workplace accidents</span> and promoting a strong safety culture
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent text-secondary font-bold flex items-center justify-center flex-shrink-0 text-sm">
                    ✓
                  </div>
                  <p className="text-gray-700">
                    Across Rwanda and the region
                  </p>
                </div>
              </div>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-primary text-white py-8 px-8">
                <h3 className="section-header">Our Vision</h3>
              </div>
              <div className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="text-2xl">👑</div>
                  <p className="text-gray-700">
                    To become the <span className="font-bold text-primary">leading Occupational Safety and Health training institution</span> in Rwanda
                  </p>
                </div>
                <div className="flex items-start gap-4 mb-6">
                  <div className="text-2xl">⭐</div>
                  <p className="text-gray-700">
                    Recognized for <span className="font-bold text-secondary">excellence, accreditation & industry impact</span>
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="text-2xl">🌟</div>
                  <p className="text-gray-700">
                    Building a safer, more prosperous region through professional safety education
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">Industries We Serve</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-8 text-center border-2 border-primary/20 hover:border-primary hover:shadow-lg transition">
              <div className="text-5xl mb-4">👷</div>
              <h3 className="text-2xl font-bold text-primary mb-2">Construction</h3>
              <p className="text-gray-600">Specialized training for construction site safety and hazard management</p>
            </div>
            <div className="bg-gradient-to-br from-secondary/5 to-accent/5 rounded-xl p-8 text-center border-2 border-secondary/20 hover:border-secondary hover:shadow-lg transition">
              <div className="text-5xl mb-4">🏭</div>
              <h3 className="text-2xl font-bold text-secondary mb-2">Industrial</h3>
              <p className="text-gray-600">Comprehensive training for industrial operations and worker safety</p>
            </div>
            <div className="bg-gradient-to-br from-accent/10 to-primary/5 rounded-xl p-8 text-center border-2 border-accent/20 hover:border-accent hover:shadow-lg transition">
              <div className="text-5xl mb-4">⛏️</div>
              <h3 className="text-2xl font-bold text-accent mb-2">Mining</h3>
              <p className="text-gray-600">Expert training for mining operations and underground safety</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 bg-gradient-to-r from-secondary to-secondary/90 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Get In Touch</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur rounded-xl p-8 text-center">
              <MapPin className="w-10 h-10 mx-auto mb-4 text-accent" />
              <h3 className="text-xl font-bold mb-2">Address</h3>
              <p className="text-white/80">Kicukiro Center<br />Kigali, Rwanda</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-8 text-center">
              <Phone className="w-10 h-10 mx-auto mb-4 text-accent" />
              <h3 className="text-xl font-bold mb-2">Phone / WhatsApp</h3>
              <p className="text-white/80 text-lg font-semibold">0785 072 512</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-8 text-center">
              <Mail className="w-10 h-10 mx-auto mb-4 text-accent" />
              <h3 className="text-xl font-bold mb-2">Email</h3>
              <p className="text-white/80 break-all">kigalisafetyoshtrainingcenter@gmail.com</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-xl p-8 mb-8">
            <form className="max-w-2xl mx-auto space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-accent"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-accent"
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-accent"
              ></textarea>
              <button className="w-full bg-accent text-black font-bold py-3 rounded-lg hover:bg-accent-light transition">
                Send Message
              </button>
            </form>
          </div>

          <div className="text-center">
            <button className="inline-block bg-accent text-black px-12 py-4 rounded-lg font-bold text-lg hover:bg-accent-light transition shadow-lg">
              Enroll Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold">
              KS
            </div>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">KSOTC</h3>
          <p className="mb-4">Safety Today, Prosperity Tomorrow</p>
          <p className="text-sm border-t border-gray-700 pt-4">
            © 2024 Kigali Safety OSH Training Center. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
