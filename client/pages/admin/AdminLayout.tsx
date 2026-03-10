import { Link, Outlet, NavLink } from "react-router-dom";
import { ArrowLeft, LayoutDashboard, BookOpen, ClipboardList } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/admin", end: true, label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/courses", end: false, label: "Courses & Quizzes", icon: BookOpen },
];

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      <div className="h-28 sm:h-32" aria-hidden="true" />

      <section className="py-8 sm:py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary hover:text-secondary font-medium mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>

          <nav className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 pb-4">
            {nav.map(({ to, end, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  cn(
                    "inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors",
                    isActive
                      ? "bg-primary text-white"
                      : "text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                  )
                }
              >
                <Icon className="w-4 h-4" />
                {label}
              </NavLink>
            ))}
          </nav>

          <Outlet />
        </div>
      </section>

      <Footer />
    </div>
  );
}
