import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { User, Mail, Phone, Building2, Briefcase, Globe, Lock, ShieldCheck } from "lucide-react";

const INDUSTRIES = ["Construction", "Industrial", "Mining", "Other"];
const COUNTRIES = ["Rwanda", "Uganda", "Kenya", "Tanzania", "Burundi", "Other"];

export default function Register() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      <div className="h-24" aria-hidden="true" />

      <section className="w-full min-h-[calc(100vh-6rem)] py-12 sm:py-16 md:py-24 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden scroll-reveal reveal-scale">
            {/* Header strip */}
            <div className="w-full bg-primary text-white px-6 sm:px-8 md:px-10 py-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Create an account</h1>
              <p className="mt-2 text-primary-foreground/90 text-sm sm:text-base max-w-2xl">
                Register to enroll in OSH training courses and access your learning dashboard.
              </p>
            </div>

            <div className="p-6 sm:p-8 md:p-10">
              <form className="space-y-6 md:space-y-8">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    Personal information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div className="md:col-span-2">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Full name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        placeholder="e.g. Jean Claude Habimana"
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Phone number
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        placeholder="+250 7XX XXX XXX"
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Country
                      </label>
                      <select
                        id="country"
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 text-gray-900 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white"
                      >
                        <option value="">Select country</option>
                        {COUNTRIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-primary" />
                    Professional details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Organization / Company
                      </label>
                      <input
                        id="organization"
                        type="text"
                        placeholder="Employer or institution name"
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Role / Job title
                      </label>
                      <input
                        id="role"
                        type="text"
                        placeholder="e.g. Site Supervisor, Safety Officer"
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Industry / Sector of interest
                      </label>
                      <select
                        id="industry"
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 text-gray-900 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white"
                      >
                        <option value="">Select industry</option>
                        {INDUSTRIES.map((i) => (
                          <option key={i} value={i}>{i}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-primary" />
                    Security
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Password <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="password"
                        type="password"
                        placeholder="Min. 8 characters"
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="confirm" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Confirm password <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="confirm"
                        type="password"
                        placeholder="Repeat password"
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    id="terms"
                    type="checkbox"
                    className="mt-1 w-4 h-4 rounded border-2 border-gray-300 text-primary focus:ring-primary"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    I agree to the{" "}
                    <Link to="/contact" className="font-semibold text-primary hover:underline">terms of service</Link>
                    {" "}and understand that my data will be used to manage my enrollment and course access.
                  </label>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <button
                    type="button"
                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-accent to-accent/80 text-black font-bold py-3.5 px-6 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <ShieldCheck className="w-5 h-5" />
                    Create account
                  </button>
                  <Link
                    to="/courses"
                    className="flex-1 text-center py-3.5 px-6 rounded-lg font-semibold border-2 border-gray-300 text-gray-700 hover:border-primary hover:text-primary transition-colors"
                  >
                    View courses first
                  </Link>
                </div>
              </form>

              <p className="mt-8 pt-6 border-t border-gray-200 text-center text-gray-600 text-sm">
                Already have an account?{" "}
                <Link to="/login" className="font-semibold text-primary hover:text-primary/80 underline">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
