"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/common/Button";
import {
  Cpu,
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
  Bot,
} from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/slices/authSlice";
import { baseApi } from "@/redux/api/baseApi";
import { toast } from "sonner";

export function Navbar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    dispatch(logout());
    dispatch(baseApi.util.resetApiState());
    toast.success("Logged out successfully");
    window.location.replace("/login");
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
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/80 dark:border-zinc-800 bg-background/90 backdrop-blur-xl transition-all">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8 max-w-7xl">
        {/* Brand Title: Wellfound Style Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-xl font-extrabold tracking-tight text-foreground font-sans">
            careerpilot<span className="text-rose-600 font-black">:</span><span className="text-xs font-black uppercase tracking-widest text-rose-600 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900/50 px-1.5 py-0.5 rounded-full ml-1">AI</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-tight text-zinc-600 dark:text-zinc-300">
          <Link
            href="/explore-jobs"
            className={`transition-colors hover:text-rose-600 ${
              pathname === "/explore-jobs" ? "text-rose-600 font-bold" : ""
            }`}
          >
            Explore Jobs
          </Link>

          {user && (
            <Link
              href="/dashboard"
              className={`transition-colors hover:text-rose-600 ${
                pathname === "/dashboard" ? "text-rose-600 font-bold" : ""
              }`}
            >
              Dashboard
            </Link>
          )}

          {user && user.role === "job-seeker" && (
            <>
              <Link
                href="/resume"
                className={`transition-colors hover:text-rose-600 flex items-center gap-1.5 ${
                  pathname === "/resume" ? "text-rose-600 font-bold" : ""
                }`}
              >
                <FileText className="h-3.5 w-3.5" /> Resume Match
              </Link>
              <Link
                href="/ai-chat"
                className={`transition-colors hover:text-rose-600 flex items-center gap-1.5 ${
                  pathname === "/ai-chat" ? "text-rose-600 font-bold" : ""
                }`}
              >
                <Bot className="h-3.5 w-3.5 text-rose-600" /> AI Coach
              </Link>
            </>
          )}

          {user && user.role === "employer" && (
            <>
              <Link
                href="/add-job"
                className={`transition-colors hover:text-rose-600 flex items-center gap-1.5 ${
                  pathname === "/add-job" ? "text-rose-600 font-bold" : ""
                }`}
              >
                <PlusCircle className="h-3.5 w-3.5 text-rose-600" /> Post Job
              </Link>
              <Link
                href="/manage-jobs"
                className={`transition-colors hover:text-rose-600 flex items-center gap-1.5 ${
                  pathname === "/manage-jobs" ? "text-rose-600 font-bold" : ""
                }`}
              >
                <Briefcase className="h-3.5 w-3.5" /> Manage Jobs
              </Link>
            </>
          )}

          <Link
            href="/about"
            className={`transition-colors hover:text-rose-600 ${
              pathname === "/about" ? "text-rose-600 font-bold" : ""
            }`}
          >
            About
          </Link>

          <Link
            href="/faq"
            className={`transition-colors hover:text-rose-600 ${
              pathname === "/faq" ? "text-rose-600 font-bold" : ""
            }`}
          >
            FAQ
          </Link>
        </nav>

        {/* Right User Actions */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors focus:outline-none cursor-pointer border border-zinc-200 dark:border-zinc-700"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.name}
                    className="h-7 w-7 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-7 w-7 rounded-full bg-rose-600 text-white font-extrabold flex items-center justify-center text-xs">
                    {getInitials(user.name)}
                  </div>
                )}
                <span className="text-xs font-semibold pr-1 text-foreground">{user.name}</span>
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-card border border-border shadow-2xl backdrop-blur-xl py-2 text-xs z-50 animate-in fade-in duration-150">
                  <div className="px-4 py-3 border-b">
                    <p className="font-extrabold text-foreground text-sm">{user.name}</p>
                    <p className="text-[11px] text-muted-foreground truncate">{user.email}</p>
                  </div>

                  <div className="py-1">
                    <Link
                      href="/dashboard"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 hover:bg-secondary transition-colors font-medium text-foreground"
                    >
                      <LayoutDashboard className="h-4 w-4 text-muted-foreground" /> Dashboard
                    </Link>
                    <Link
                      href="/profile"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 hover:bg-secondary transition-colors font-medium text-foreground"
                    >
                      <UserIcon className="h-4 w-4 text-muted-foreground" /> Profile
                    </Link>
                    <Link
                      href="/settings"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 hover:bg-secondary transition-colors font-medium text-foreground"
                    >
                      <Settings className="h-4 w-4 text-muted-foreground" /> Settings
                    </Link>
                  </div>

                  <div className="border-t pt-1">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-red-500 hover:bg-red-500/10 transition-colors font-semibold text-left"
                    >
                      <LogOut className="h-4 w-4" /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <Link href="/login">
                <Button variant="outline" size="sm" className="text-xs font-semibold rounded-full border-zinc-300">
                  Log in
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white rounded-full shadow-md shadow-rose-500/20">
                  For job seekers
                </Button>
              </Link>
              <Link href="/register?role=employer">
                <Button variant="secondary" size="sm" className="text-xs font-semibold bg-zinc-900 text-white hover:bg-zinc-800 rounded-full">
                  Recruiter
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-muted-foreground hover:text-foreground"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
    </header>
  );
}
