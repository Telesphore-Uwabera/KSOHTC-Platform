import { Link } from "react-router-dom";
import { HardHat, Building, Pickaxe, ArrowRight, Clock, LogOut } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getStoredUser, clearStoredUser } from "../lib/auth";
import { COURSES } from "../data/courses";

const iconByCourse = {
  construction: HardHat,
  "industrial-safety": Building,
  mining: Pickaxe,
};

export default function Courses() {
  const user = getStoredUser();
  const pending = user && !user.approved;
  const canAccess = user && user.approved;

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      <div className="h-28 sm:h-32" aria-hidden="true" />

      <section className="relative text-white py-16 sm:py-20 md:py-28 min-h-[40vh] flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/ksohtc-3.jpeg" alt="" className="w-full h-full object-cover hero-zoom" decoding="async" aria-hidden />
          <div className="absolute inset-0 bg-black/30" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/90 to-secondary/90" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 hero-reveal-slow" style={{ animationDelay: "0.4s", animationFillMode: "both" }}>Our Courses</h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto hero-reveal-slow" style={{ animationDelay: "0.9s", animationFillMode: "both" }}>
            {canAccess
              ? "Choose a course below to enroll and start studying."
              : pending
                ? "Your account is pending approval. You will access courses once an admin approves your registration."
                : "Register or log in to enroll. After admin approval, you can access courses."}
          </p>
        </div>
      </section>

      {pending && (
        <section className="py-8 px-4 sm:px-6 lg:px-8 bg-amber-50 border-b border-amber-200">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex w-10 h-10 rounded-full bg-amber-200 items-center justify-center text-amber-800">
                <Clock className="w-5 h-5" />
              </span>
              <div>
                <p className="font-semibold text-amber-900">Account pending approval</p>
                <p className="text-sm text-amber-800">
                  You’re logged in as {user?.email}. An admin must approve your registration before you can access courses. After approval, log out and log in again to refresh your access.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => { clearStoredUser(); window.location.href = "/courses"; }}
              className="inline-flex items-center gap-2 text-amber-800 font-semibold hover:text-amber-900"
            >
              <LogOut className="w-4 h-4" />
              Log out
            </button>
          </div>
        </section>
      )}

      <section className="py-12 sm:py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-sway">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10 scroll-reveal reveal-right-slow delay-400">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary">Available courses</h2>
            {!user && (
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/register"
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
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {COURSES.map((course, idx) => {
              const Icon = iconByCourse[course.id];
              return (
                <div
                  key={course.id}
                  className="bg-white rounded-[30px] shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300 scroll-reveal reveal-scale-slow"
                  style={{ animationDelay: `${0.9 + idx * 0.15}s` }}
                >
                  <div className="p-6 sm:p-8">
                    <span className="inline-flex w-10 h-10 rounded-[30px] bg-primary/10 items-center justify-center text-primary mb-4">
                      <Icon className="w-5 h-5" />
                    </span>
                    <h3 className="text-xl font-bold text-primary mb-2">{course.title}</h3>
                    <p className="text-sm text-accent font-medium mb-2">{course.sector}</p>
                    <p className="text-gray-600 text-sm mb-4">{course.desc}</p>
                    <p className="text-gray-500 text-xs">Duration: {course.duration}</p>
                    {canAccess ? (
                      <Link
                        to={`/courses/${course.id}`}
                        className="mt-4 inline-flex items-center gap-2 text-primary font-semibold text-sm hover:text-accent transition-colors"
                      >
                        View materials
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    ) : (
                      <Link
                        to={user ? "#" : "/login"}
                        className={`mt-4 inline-flex items-center gap-2 font-semibold text-sm transition-colors ${user ? "text-gray-400 cursor-not-allowed" : "text-primary hover:text-accent"}`}
                        onClick={user ? (e) => e.preventDefault() : undefined}
                      >
                        {pending ? "Enroll (pending approval)" : "Enroll now"}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
