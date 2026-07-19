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
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl transition-all">
      <div className="container mx-auto flex h-14 items-center justify-between px-4 md:px-8 max-w-7xl">
        {/* Brand Title with Sleek Cpu Icon */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="h-7 w-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
            <Cpu className="h-4 w-4" />
          </div>
          <span className="text-base font-bold tracking-tight text-foreground">
            CareerPilot <span className="text-primary font-black">AI</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-tight text-muted-foreground">
          <Link
            href="/explore-jobs"
            className={`transition-colors hover:text-foreground ${
              pathname === "/explore-jobs" ? "text-primary font-extrabold" : ""
            }`}
          >
            Explore Jobs
          </Link>

          {user && (
            <Link
              href="/dashboard"
              className={`transition-colors hover:text-foreground ${
                pathname === "/dashboard" ? "text-primary font-extrabold" : ""
              }`}
            >
              Dashboard
            </Link>
          )}

          {user && user.role === "job-seeker" && (
            <>
              <Link
                href="/resume"
                className={`transition-colors hover:text-foreground flex items-center gap-1.5 ${
                  pathname === "/resume" ? "text-primary font-extrabold" : ""
                }`}
              >
                <FileText className="h-3.5 w-3.5" /> Resume Match
              </Link>
              <Link
                href="/ai-chat"
                className={`transition-colors hover:text-foreground flex items-center gap-1.5 ${
                  pathname === "/ai-chat" ? "text-primary font-extrabold" : ""
                }`}
              >
                <Bot className="h-3.5 w-3.5 text-primary" /> AI Coach
              </Link>
            </>
          )}

          {user && user.role === "employer" && (
            <>
              <Link
                href="/add-job"
                className={`transition-colors hover:text-foreground flex items-center gap-1.5 ${
                  pathname === "/add-job" ? "text-primary font-extrabold" : ""
                }`}
              >
                <PlusCircle className="h-3.5 w-3.5 text-emerald-500" /> Post Job
              </Link>
              <Link
                href="/manage-jobs"
                className={`transition-colors hover:text-foreground flex items-center gap-1.5 ${
                  pathname === "/manage-jobs" ? "text-primary font-extrabold" : ""
                }`}
              >
                <Briefcase className="h-3.5 w-3.5" /> Manage Jobs
              </Link>
            </>
          )}

          <Link
            href="/about"
            className={`transition-colors hover:text-foreground ${
              pathname === "/about" ? "text-primary font-extrabold" : ""
            }`}
          >
            About
          </Link>

          <Link
            href="/faq"
            className={`transition-colors hover:text-foreground ${
              pathname === "/faq" ? "text-primary font-extrabold" : ""
            }`}
          >
            FAQ
          </Link>
        </nav>

        {/* Right User Actions */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-secondary transition-colors focus:outline-none cursor-pointer"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.name}
                    className="h-8 w-8 rounded-full object-cover border"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-primary text-white font-extrabold flex items-center justify-center text-xs">
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
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost" size="sm" className="text-xs font-semibold">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="text-xs font-semibold bg-primary text-white hover:bg-primary/90">
                  Get Started
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
