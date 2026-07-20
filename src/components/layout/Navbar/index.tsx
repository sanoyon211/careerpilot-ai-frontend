"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/common/Button";
import {
  User as UserIcon,
  LayoutDashboard,
  LogOut,
  PlusCircle,
  Briefcase,
  Menu,
  X,
  ChevronDown,
  Settings,
  Bot,
  Sparkles,
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

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

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
    <>
      <header className="sticky top-0 z-50 w-full border-b border-[#E5E7EB] bg-white/90 backdrop-blur-xl transition-all">
        {/* Fluid Full-Width Container */}
      <div className="w-full max-w-[1440px] mx-auto flex h-18 items-center justify-between px-6 md:px-12">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-extrabold tracking-tight text-[#0F172A] font-sans">
            careerpilot<span className="text-[#8B5CF6] font-black">:</span>
            <span className="text-xs font-black uppercase tracking-widest text-[#8B5CF6] bg-[#F3E8FF] border border-[#8B5CF6]/30 px-2.5 py-0.5 rounded-lg ml-1.5">
              AI
            </span>
          </span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-9 text-sm font-extrabold tracking-tight text-[#0F172A]">
          <Link
            href="/explore-jobs"
            className={`transition-colors hover:text-[#8B5CF6] ${
              pathname === "/explore-jobs" ? "text-[#8B5CF6] font-black" : ""
            }`}
          >
            Explore Jobs
          </Link>

          {user && (
            <Link
              href="/dashboard"
              className={`transition-colors hover:text-[#8B5CF6] ${
                pathname === "/dashboard" ? "text-[#8B5CF6] font-black" : ""
              }`}
            >
              Dashboard
            </Link>
          )}

          {user && user.role !== "employer" && (
            <>
              <Link
                href="/resume"
                className={`transition-colors hover:text-[#8B5CF6] flex items-center gap-1.5 ${
                  pathname === "/resume" ? "text-[#8B5CF6] font-black" : ""
                }`}
              >
                <Sparkles className="h-4 w-4 text-[#8B5CF6]" strokeWidth={1.5} /> Resume Match
              </Link>
              <Link
                href="/ai-chat"
                className={`transition-colors hover:text-[#8B5CF6] flex items-center gap-1.5 ${
                  pathname === "/ai-chat" ? "text-[#8B5CF6] font-black" : ""
                }`}
              >
                <Bot className="h-4 w-4 text-[#8B5CF6]" strokeWidth={1.5} /> AI Coach
              </Link>
            </>
          )}

          {user && user.role === "employer" && (
            <>
              <Link
                href="/add-job"
                className={`transition-colors hover:text-[#8B5CF6] flex items-center gap-1.5 ${
                  pathname === "/add-job" ? "text-[#8B5CF6] font-black" : ""
                }`}
              >
                <PlusCircle className="h-4 w-4 text-[#8B5CF6]" strokeWidth={1.5} /> Post Job
              </Link>
              <Link
                href="/manage-jobs"
                className={`transition-colors hover:text-[#8B5CF6] flex items-center gap-1.5 ${
                  pathname === "/manage-jobs" ? "text-[#8B5CF6] font-black" : ""
                }`}
              >
                <Briefcase className="h-4 w-4 text-[#0F172A]" strokeWidth={1.5} /> Manage Jobs
              </Link>
            </>
          )}

          <Link
            href="/about"
            className={`transition-colors hover:text-[#8B5CF6] ${
              pathname === "/about" ? "text-[#8B5CF6] font-black" : ""
            }`}
          >
            About
          </Link>

          <Link
            href="/faq"
            className={`transition-colors hover:text-[#8B5CF6] ${
              pathname === "/faq" ? "text-[#8B5CF6] font-black" : ""
            }`}
          >
            FAQ
          </Link>

          <Link
            href="/blog"
            className={`transition-colors hover:text-[#8B5CF6] ${
              pathname === "/blog" ? "text-[#8B5CF6] font-black" : ""
            }`}
          >
            Blog
          </Link>
        </nav>

        {/* Right User Actions */}
        <div className="hidden md:flex items-center gap-3.5">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-[#FAFAFA] transition-colors focus:outline-none cursor-pointer border border-[#E5E7EB]"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.name}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-[#8B5CF6] text-white font-black flex items-center justify-center text-xs">
                    {getInitials(user.name)}
                  </div>
                )}
                <span className="text-xs font-extrabold pr-1 text-[#0F172A]">{user.name}</span>
                <ChevronDown className="h-5 w-5 text-[#64748B]" strokeWidth={1.5} />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-60 rounded-2xl bg-white border border-[#E5E7EB] py-2 text-xs z-50 animate-in fade-in duration-150">
                  <div className="px-4 py-3 border-b border-[#E5E7EB]">
                    <p className="font-extrabold text-[#0F172A] text-sm">{user.name}</p>
                    <p className="text-[11px] text-[#64748B] truncate">{user.email}</p>
                  </div>

                  <div className="py-1">
                    <Link
                      href="/dashboard"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-[#FAFAFA] transition-colors font-bold text-[#0F172A]"
                    >
                      <LayoutDashboard className="h-5 w-5 text-[#0F172A]" strokeWidth={1.5} /> Dashboard
                    </Link>
                    <Link
                      href="/profile"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-[#FAFAFA] transition-colors font-bold text-[#0F172A]"
                    >
                      <UserIcon className="h-5 w-5 text-[#0F172A]" strokeWidth={1.5} /> Profile
                    </Link>
                    <Link
                      href="/settings"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-[#FAFAFA] transition-colors font-bold text-[#0F172A]"
                    >
                      <Settings className="h-5 w-5 text-[#0F172A]" strokeWidth={1.5} /> Settings
                    </Link>
                  </div>

                  <div className="border-t border-[#E5E7EB] pt-1">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors font-bold text-left cursor-pointer"
                    >
                      <LogOut className="h-5 w-5" strokeWidth={1.5} /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="outline" size="sm" className="text-xs font-extrabold rounded-lg px-5 border-[#E5E7EB]">
                  Log in
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="text-xs font-extrabold bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-lg px-6">
                  For Job Seekers
                </Button>
              </Link>
              <Link href="/register?role=employer">
                <Button variant="secondary" size="sm" className="text-xs font-extrabold rounded-lg bg-[#0F172A] text-white px-5">
                  Recruiter
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-[#64748B] hover:text-[#0F172A]"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" strokeWidth={1.5} /> : <Menu className="h-6 w-6 text-[#0F172A]" strokeWidth={1.5} />}
        </button>
      </div>
      </header>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-[998] md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 w-[280px] bg-white z-[999] shadow-2xl md:hidden flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between p-6 border-b border-[#E5E7EB]">
              <span className="text-lg font-extrabold text-[#0F172A]">Menu</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 text-[#64748B] hover:text-[#0F172A]"
              >
                <X className="h-6 w-6" strokeWidth={1.5} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <Link href="/explore-jobs" onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-extrabold text-[#0F172A] py-2">
                Explore Jobs
              </Link>
              {user && (
                <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 text-sm font-extrabold text-[#0F172A] py-2">
                  <LayoutDashboard className="h-5 w-5 text-[#0F172A]" strokeWidth={1.5} /> Dashboard
                </Link>
              )}
              {user && user.role !== "employer" && (
                <>
                  <Link href="/resume" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 text-sm font-extrabold text-[#0F172A] py-2">
                    <Sparkles className="h-5 w-5 text-[#8B5CF6]" strokeWidth={1.5} /> Resume Match
                  </Link>
                  <Link href="/ai-chat" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 text-sm font-extrabold text-[#0F172A] py-2">
                    <Bot className="h-5 w-5 text-[#8B5CF6]" strokeWidth={1.5} /> AI Coach
                  </Link>
                </>
              )}
              {user && user.role === "employer" && (
                <>
                  <Link href="/add-job" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 text-sm font-extrabold text-[#0F172A] py-2">
                    <PlusCircle className="h-5 w-5 text-[#8B5CF6]" strokeWidth={1.5} /> Post Job
                  </Link>
                  <Link href="/manage-jobs" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 text-sm font-extrabold text-[#0F172A] py-2">
                    <Briefcase className="h-5 w-5 text-[#0F172A]" strokeWidth={1.5} /> Manage Jobs
                  </Link>
                </>
              )}
              <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-extrabold text-[#0F172A] py-2">
                About
              </Link>
              <Link href="/faq" onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-extrabold text-[#0F172A] py-2">
                FAQ
              </Link>
              <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-extrabold text-[#0F172A] py-2">
                Blog
              </Link>
              {!user ? (
                <div className="flex flex-col gap-2.5 pt-6 mt-2 border-t border-[#E5E7EB]">
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full text-xs font-bold border-[#E5E7EB]">Log in</Button>
                  </Link>
                  <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full text-xs font-extrabold bg-[#8B5CF6] hover:bg-[#7C3AED] text-white">For Job Seekers</Button>
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-2 pt-6 mt-2 border-t border-[#E5E7EB]">
                  <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 text-sm font-extrabold text-[#0F172A] py-2">
                    <UserIcon className="h-5 w-5 text-[#0F172A]" strokeWidth={1.5} /> Profile
                  </Link>
                  <Link href="/settings" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 text-sm font-extrabold text-[#0F172A] py-2">
                    <Settings className="h-5 w-5 text-[#0F172A]" strokeWidth={1.5} /> Settings
                  </Link>
                  <button onClick={handleLogout} className="flex items-center gap-2 text-sm font-extrabold text-red-600 py-2 w-full text-left">
                    <LogOut className="h-5 w-5 text-red-600" strokeWidth={1.5} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
