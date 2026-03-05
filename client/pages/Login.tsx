import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { LogIn, BookOpen } from "lucide-react";

export default function Login() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      <div className="h-24" aria-hidden="true" />

      <section className="w-full min-h-[calc(100vh-6rem)] py-12 sm:py-16 md:py-24 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[30px] shadow-xl border border-gray-200 overflow-hidden scroll-reveal reveal-scale">
            {/* Header strip */}
            <div className="w-full bg-primary text-white px-6 sm:px-8 py-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold flex items-center gap-2">
                <LogIn className="w-8 h-8" />
                Log in
              </h1>
              <p className="mt-2 text-primary-foreground/90 text-sm sm:text-base">
                Sign in to access your courses and continue studying.
              </p>
            </div>

            <div className="p-6 sm:p-8 md:p-10">
              <form className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-2 border-gray-300 text-primary focus:ring-primary" />
                    Remember me
                  </label>
                  <Link to="/contact" className="text-sm font-semibold text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-accent to-accent/80 text-black font-bold py-3.5 px-6 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
                >
                  <LogIn className="w-5 h-5" />
                  Log in
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-gray-200 space-y-3">
                <p className="text-center text-gray-600 text-sm">
                  Don't have an account?{" "}
                  <Link to="/register" className="font-semibold text-primary hover:text-primary/80 underline">
                    Create account
                  </Link>
                </p>
                <p className="text-center">
                  <Link
                    to="/courses"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80"
                  >
                    <BookOpen className="w-4 h-4" />
                    View courses
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
