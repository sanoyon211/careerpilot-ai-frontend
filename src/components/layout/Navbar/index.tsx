"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/common/Button";
import {
  Sparkles,
  User as UserIcon,
  LayoutDashboard,
  LogOut,
  FileText,
  MessageSquare,
  PlusCircle,
  Briefcase,
  Menu,
  X,
  ChevronDown,
  Settings,
  ShieldCheck,
} from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/slices/authSlice";
import { baseApi } from "@/redux/api/baseApi";
import { toast } from "sonner";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    dispatch(logout());
    dispatch(baseApi.util.resetApiState());
    document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    toast.success("Logged out successfully");
    router.push("/");
  };

  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/85 backdrop-blur-md transition-all shadow-xs">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary/10 text-primary p-2 rounded-xl group-hover:bg-primary group-hover:text-primary-foreground transition-all">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-primary via-indigo-600 to-blue-600 bg-clip-text text-transparent">
            CareerPilot AI
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link
            href="/explore-jobs"
            className={`transition-colors hover:text-primary ${
              pathname === "/explore-jobs" ? "text-primary font-bold" : "text-muted-foreground"
            }`}
          >
            Explore Jobs
          </Link>

          {user && (
            <Link
              href="/dashboard"
              className={`transition-colors hover:text-primary ${
                pathname === "/dashboard" ? "text-primary font-bold" : "text-muted-foreground"
              }`}
            >
              Dashboard
            </Link>
          )}

          {user && user.role === "job-seeker" && (
            <>
              <Link
                href="/resume"
                className={`transition-colors hover:text-primary flex items-center gap-1.5 ${
                  pathname === "/resume" ? "text-primary font-bold" : "text-muted-foreground"
                }`}
              >
                <FileText className="h-4 w-4" /> Resume & AI Match
              </Link>
              <Link
                href="/ai-chat"
                className={`transition-colors hover:text-primary flex items-center gap-1.5 ${
                  pathname === "/ai-chat" ? "text-primary font-bold" : "text-muted-foreground"
                }`}
              >
                <MessageSquare className="h-4 w-4 text-indigo-500" /> AI Coach
              </Link>
            </>
          )}

          {user && user.role === "employer" && (
            <>
              <Link
                href="/add-job"
                className={`transition-colors hover:text-primary flex items-center gap-1.5 ${
                  pathname === "/add-job" ? "text-primary font-bold" : "text-muted-foreground"
                }`}
              >
                <PlusCircle className="h-4 w-4 text-emerald-500" /> Post a Job
              </Link>
              <Link
                href="/manage-jobs"
                className={`transition-colors hover:text-primary flex items-center gap-1.5 ${
                  pathname === "/manage-jobs" ? "text-primary font-bold" : "text-muted-foreground"
                }`}
              >
                <Briefcase className="h-4 w-4" /> Manage Jobs
              </Link>
            </>
          )}

          <Link
            href="/about"
            className={`transition-colors hover:text-primary ${
              pathname === "/about" ? "text-primary font-bold" : "text-muted-foreground"
            }`}
          >
            About
          </Link>

          <Link
            href="/faq"
            className={`transition-colors hover:text-primary ${
              pathname === "/faq" ? "text-primary font-bold" : "text-muted-foreground"
            }`}
          >
            FAQ
          </Link>
        </nav>

        {/* Right CTA / User Profile Dropdown */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2.5 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.name}
                    className="h-9 w-9 rounded-full object-cover border-2 border-primary/30"
                  />
                ) : (
                  <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-primary to-indigo-600 text-white font-bold flex items-center justify-center text-xs shadow-xs">
                    {getInitials(user.name)}
                  </div>
                )}
                <div className="text-left hidden lg:block pr-1">
                  <p className="text-xs font-bold leading-none">{user.name}</p>
                  <p className="text-[10px] text-muted-foreground capitalize mt-0.5">{user.role || "User"}</p>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-60 rounded-2xl bg-card border shadow-xl py-2 text-sm z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-3 border-b">
                    <p className="font-bold text-foreground text-sm">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                      {user.role === "employer" ? "Employer Account" : "Job Seeker"}
                    </span>
                  </div>

                  <div className="py-1">
                    <Link
                      href="/dashboard"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <LayoutDashboard className="h-4 w-4 text-muted-foreground" /> Dashboard
                    </Link>
                    <Link
                      href="/profile"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <UserIcon className="h-4 w-4 text-muted-foreground" /> My Profile
                    </Link>
                    <Link
                      href="/settings"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <Settings className="h-4 w-4 text-muted-foreground" /> Account Settings
                    </Link>
                  </div>

                  <div className="border-t pt-1">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-red-500 hover:bg-red-500/10 transition-colors font-medium text-left"
                    >
                      <LogOut className="h-4 w-4" /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost" size="sm">Log in</Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="bg-primary hover:bg-primary/90">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card border-b px-4 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-3 font-medium text-sm">
            <Link
              href="/explore-jobs"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-muted"
            >
              Explore Jobs
            </Link>

            {user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg hover:bg-muted"
                >
                  Dashboard
                </Link>

                {user.role === "job-seeker" && (
                  <>
                    <Link
                      href="/resume"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="px-3 py-2 rounded-lg hover:bg-muted flex items-center gap-2"
                    >
                      <FileText className="h-4 w-4 text-indigo-500" /> Resume & AI Match
                    </Link>
                    <Link
                      href="/ai-chat"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="px-3 py-2 rounded-lg hover:bg-muted flex items-center gap-2"
                    >
                      <MessageSquare className="h-4 w-4 text-indigo-500" /> AI Career Coach
                    </Link>
                  </>
                )}

                {user.role === "employer" && (
                  <>
                    <Link
                      href="/add-job"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="px-3 py-2 rounded-lg hover:bg-muted flex items-center gap-2"
                    >
                      <PlusCircle className="h-4 w-4 text-emerald-500" /> Post a Job
                    </Link>
                    <Link
                      href="/manage-jobs"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="px-3 py-2 rounded-lg hover:bg-muted flex items-center gap-2"
                    >
                      <Briefcase className="h-4 w-4" /> Manage Jobs
                    </Link>
                  </>
                )}

                <Link
                  href="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg hover:bg-muted flex items-center gap-2"
                >
                  <UserIcon className="h-4 w-4" /> My Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-lg text-red-500 hover:bg-red-500/10 text-left flex items-center gap-2 font-semibold"
                >
                  <LogOut className="h-4 w-4" /> Sign Out
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2 pt-2 border-t">
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">Log in</Button>
                </Link>
                <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full">Sign Up</Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
