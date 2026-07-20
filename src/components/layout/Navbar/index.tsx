"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/common/Button";
import {
  User as UserIcon,
  LayoutDashboard,
  LogOut,
  FileText,
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
    <header className="sticky top-0 z-50 w-full border-b border-[#E2E8F0] bg-white/90 backdrop-blur-xl transition-all">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8 max-w-7xl">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-xl font-extrabold tracking-tight text-[#1E293B] font-sans">
            careerpilot<span className="text-[#2563EB] font-black">:</span>
            <span className="text-xs font-black uppercase tracking-widest text-[#8B5CF6] bg-[#F3E8FF] border border-[#8B5CF6]/20 px-2 py-0.5 rounded-full ml-1 shadow-xs">
              AI
            </span>
          </span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-bold tracking-tight text-[#1E293B]">
          <Link
            href="/explore-jobs"
            className={`transition-colors hover:text-[#2563EB] ${
              pathname === "/explore-jobs" ? "text-[#2563EB] font-extrabold" : ""
            }`}
          >
            Explore Jobs
          </Link>

          {user && (
            <Link
              href="/dashboard"
              className={`transition-colors hover:text-[#2563EB] ${
                pathname === "/dashboard" ? "text-[#2563EB] font-extrabold" : ""
              }`}
            >
              Dashboard
            </Link>
          )}

          {user && user.role === "job-seeker" && (
            <>
              <Link
                href="/resume"
                className={`transition-colors hover:text-[#8B5CF6] flex items-center gap-1.5 ${
                  pathname === "/resume" ? "text-[#8B5CF6] font-extrabold" : ""
                }`}
              >
                <Sparkles className="h-4 w-4 text-[#8B5CF6]" /> Resume Match
              </Link>
              <Link
                href="/ai-chat"
                className={`transition-colors hover:text-[#8B5CF6] flex items-center gap-1.5 ${
                  pathname === "/ai-chat" ? "text-[#8B5CF6] font-extrabold" : ""
                }`}
              >
                <Bot className="h-4 w-4 text-[#8B5CF6]" /> AI Coach
              </Link>
            </>
          )}

          {user && user.role === "employer" && (
            <>
              <Link
                href="/add-job"
                className={`transition-colors hover:text-[#2563EB] flex items-center gap-1.5 ${
                  pathname === "/add-job" ? "text-[#2563EB] font-extrabold" : ""
                }`}
              >
                <PlusCircle className="h-4 w-4 text-[#2563EB]" /> Post Job
              </Link>
              <Link
                href="/manage-jobs"
                className={`transition-colors hover:text-[#2563EB] flex items-center gap-1.5 ${
                  pathname === "/manage-jobs" ? "text-[#2563EB] font-extrabold" : ""
                }`}
              >
                <Briefcase className="h-4 w-4" /> Manage Jobs
              </Link>
            </>
          )}

          <Link
            href="/about"
            className={`transition-colors hover:text-[#2563EB] ${
              pathname === "/about" ? "text-[#2563EB] font-extrabold" : ""
            }`}
          >
            About
          </Link>

          <Link
            href="/faq"
            className={`transition-colors hover:text-[#2563EB] ${
              pathname === "/faq" ? "text-[#2563EB] font-extrabold" : ""
            }`}
          >
            FAQ
          </Link>

          <Link
            href="/blog"
            className={`transition-colors hover:text-[#2563EB] ${
              pathname === "/blog" ? "text-[#2563EB] font-extrabold" : ""
            }`}
          >
            Blog
          </Link>
        </nav>

        {/* Right User Actions */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 p-1.5 rounded-full hover:bg-[#F4F7FE] transition-colors focus:outline-none cursor-pointer border border-[#E2E8F0] shadow-xs"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.name}
                    className="h-7 w-7 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-7 w-7 rounded-full bg-[#2563EB] text-white font-extrabold flex items-center justify-center text-xs">
                    {getInitials(user.name)}
                  </div>
                )}
                <span className="text-xs font-bold pr-1 text-[#1E293B]">{user.name}</span>
                <ChevronDown className="h-3.5 w-3.5 text-[#64748B]" />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-[#E2E8F0] shadow-xl backdrop-blur-xl py-2 text-xs z-50 animate-in fade-in duration-150">
                  <div className="px-4 py-3 border-b border-[#E2E8F0]">
                    <p className="font-extrabold text-[#1E293B] text-sm">{user.name}</p>
                    <p className="text-[11px] text-[#64748B] truncate">{user.email}</p>
                  </div>

                  <div className="py-1">
                    <Link
                      href="/dashboard"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 hover:bg-[#F4F7FE] transition-colors font-semibold text-[#1E293B]"
                    >
                      <LayoutDashboard className="h-4 w-4 text-[#64748B]" /> Dashboard
                    </Link>
                    <Link
                      href="/profile"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 hover:bg-[#F4F7FE] transition-colors font-semibold text-[#1E293B]"
                    >
                      <UserIcon className="h-4 w-4 text-[#64748B]" /> Profile
                    </Link>
                    <Link
                      href="/settings"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 hover:bg-[#F4F7FE] transition-colors font-semibold text-[#1E293B]"
                    >
                      <Settings className="h-4 w-4 text-[#64748B]" /> Settings
                    </Link>
                  </div>

                  <div className="border-t border-[#E2E8F0] pt-1">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors font-semibold text-left"
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
                <Button variant="outline" size="sm" className="text-xs font-bold rounded-full">
                  Log in
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="text-xs font-bold bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-full shadow-md shadow-blue-500/15">
                  For Job Seekers
                </Button>
              </Link>
              <Link href="/register?role=employer">
                <Button variant="secondary" size="sm" className="text-xs font-bold rounded-full">
                  Recruiter
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-[#64748B] hover:text-[#1E293B]"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-[#E2E8F0] bg-white p-4 space-y-3">
          <Link href="/explore-jobs" className="block text-sm font-bold text-[#1E293B] py-2">
            Explore Jobs
          </Link>
          <Link href="/about" className="block text-sm font-bold text-[#1E293B] py-2">
            About
          </Link>
          <Link href="/faq" className="block text-sm font-bold text-[#1E293B] py-2">
            FAQ
          </Link>
          <Link href="/blog" className="block text-sm font-bold text-[#1E293B] py-2">
            Blog
          </Link>
          {!user && (
            <div className="flex flex-col gap-2 pt-2 border-t border-[#E2E8F0]">
              <Link href="/login">
                <Button variant="outline" className="w-full text-xs font-bold">Log in</Button>
              </Link>
              <Link href="/register">
                <Button className="w-full text-xs font-bold bg-[#2563EB]">For Job Seekers</Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
