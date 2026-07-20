"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials, logout } from "@/redux/slices/authSlice";
import { useGetMyProfileQuery } from "@/redux/api/userApi";
import type { RootState } from "@/redux/store";
import {
  LayoutDashboard,
  User,
  FileText,
  Bookmark,
  CheckSquare,
  Settings,
  LogOut,
  Menu,
  X,
  Sparkles,
  MessageSquare,
  PlusCircle,
  Briefcase,
} from "lucide-react";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { toast } from "sonner";
import { baseApi } from "@/redux/api/baseApi";

interface NavItem {
  href: string;
  label: string;
  icon: any;
  isAI?: boolean;
}

const JOB_SEEKER_LINKS: NavItem[] = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/profile", label: "My Profile", icon: User },
  { href: "/resume", label: "Resume & AI Match", icon: FileText, isAI: true },
  { href: "/saved-jobs", label: "Saved Jobs", icon: Bookmark },
  { href: "/applied-jobs", label: "Applied Jobs", icon: CheckSquare },
  { href: "/ai-chat", label: "AI Career Coach", icon: MessageSquare, isAI: true },
];

const EMPLOYER_LINKS: NavItem[] = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/profile", label: "Company Profile", icon: User },
  { href: "/add-job", label: "Post a Job", icon: PlusCircle },
  { href: "/manage-jobs", label: "Manage Jobs", icon: Briefcase },
];

const getAccessTokenFromCookie = () => {
  if (typeof document === "undefined") return null;
  const match = document.cookie.split("; ").find((row) => row.startsWith("accessToken="));
  if (!match) return null;
  const token = match.split("=")[1]?.trim();
  return token && token !== "" ? token : null;
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cookieToken = typeof window !== "undefined" ? getAccessTokenFromCookie() : null;

  const { data: profileResponse, isLoading: isLoadingProfile, isError: isProfileError } = useGetMyProfileQuery(
    undefined,
    {
      skip: !!user || !cookieToken,
    }
  );

  useEffect(() => {
    if (!user && profileResponse?.data) {
      const token = getAccessTokenFromCookie() || "";
      dispatch(setCredentials({ user: profileResponse.data, accessToken: token }));
    }
  }, [user, profileResponse, dispatch]);

  useEffect(() => {
    const token = getAccessTokenFromCookie();
    if (!user) {
      if (!token || isProfileError) {
        document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
      }
    }
  }, [user, isProfileError, pathname]);

  useEffect(() => {
    if (!user?._id) return;

    const rawUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const socketUrl = rawUrl.replace(/\/api\/v1\/?$/, "");
    const socket = io(socketUrl);

    socket.emit("join_user_room", user._id);

    socket.on("status_updated", (data) => {
      toast.success("Application Status Update", {
        description: `Your application for "${data.jobTitle}" moved to "${data.status}".`,
        duration: 8000,
      });

      dispatch(baseApi.util.invalidateTags(["Application", "SavedJob", "Job"]));
    });

    return () => {
      socket.disconnect();
    };
  }, [user, dispatch]);

  const handleSignOut = () => {
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

  const isEmployer = user?.role === "employer";
  const navItems = isEmployer ? EMPLOYER_LINKS : JOB_SEEKER_LINKS;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <div className="text-center space-y-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#8B5CF6] border-t-transparent mx-auto text-[#8B5CF6]" />
          <p className="text-sm font-bold text-[#64748B] animate-pulse">
            {isLoadingProfile ? "Verifying authentication session..." : "Redirecting to login..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      {/* Mobile Topbar */}
      <div className="md:hidden bg-white border-b border-[#E5E7EB] p-4 flex items-center justify-between sticky top-0 z-20">
        <Link href="/" className="flex items-center gap-1">
          <span className="font-extrabold text-xl tracking-tight text-[#1E293B] font-sans">
            careerpilot<span className="text-[#8B5CF6] font-black">:</span>
            <span className="text-xs font-black uppercase tracking-widest text-[#8B5CF6] bg-[#F3E8FF] border border-[#8B5CF6]/20 px-2 py-0.5 rounded-lg ml-1">
              AI
            </span>
          </span>
        </Link>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-[#64748B]">
          {isMobileMenuOpen ? <X className="h-6 w-6" strokeWidth={1.5} /> : <Menu className="h-6 w-6 text-[#0F172A]" strokeWidth={1.5} />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`
        ${isMobileMenuOpen ? "fixed inset-0 top-[65px] z-30 bg-white" : "hidden"} 
        md:block md:w-64 md:shrink-0 bg-[#FAFAFA] border-r border-[#E5E7EB] md:sticky md:top-0 md:h-screen flex flex-col overflow-y-auto
      `}
      >
        {/* Header Logo */}
        <div className="p-6 hidden md:block border-b border-[#E5E7EB] bg-white">
          <Link href="/" className="flex items-center gap-1 group">
            <span className="font-extrabold text-xl tracking-tight text-[#1E293B] font-sans">
              careerpilot<span className="text-[#8B5CF6] font-black">:</span>
              <span className="text-xs font-black uppercase tracking-widest text-[#8B5CF6] bg-[#F3E8FF] border border-[#8B5CF6]/20 px-2 py-0.5 rounded-lg ml-1">
                AI
              </span>
            </span>
          </Link>
        </div>

        {/* Compact Sidebar Profile Box */}
        <div className="p-3.5 mx-3 my-4 bg-white border border-[#E5E7EB] rounded-xl flex items-center gap-3">
          {user.photoURL ? (
            <img src={user.photoURL} alt={user.name} className="h-9 w-9 rounded-full object-cover border border-[#E5E7EB]" />
          ) : (
            <div className="h-9 w-9 rounded-full bg-[#8B5CF6] text-white font-extrabold flex items-center justify-center text-xs shrink-0">
              {getInitials(user.name)}
            </div>
          )}
          <div className="overflow-hidden min-w-0">
            <p className="font-extrabold text-xs text-[#1E293B] truncate">{user.name}</p>
            <span className="inline-block text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-[#F3E8FF] text-[#8B5CF6] border border-[#8B5CF6]/20">
              {isEmployer ? "Employer" : "Job Seeker"}
            </span>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="p-3.5 space-y-1.5 flex-1">
          <div className="text-[11px] font-extrabold text-[#64748B] uppercase tracking-wider mb-3 px-3">
            {isEmployer ? "Employer Workspace" : "Job Seeker Navigation"}
          </div>

          {navItems.map((link) => {
            const isActive = pathname === link.href;
            const isAICoachActive = link.href === "/ai-chat" && isActive;

            let linkClass = "text-[#64748B] hover:bg-white hover:text-[#8B5CF6]";
            if (isActive) {
              linkClass = "bg-[#8B5CF6] text-white font-extrabold";
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${linkClass}`}
              >
                <link.icon className={`h-5 w-5 shrink-0 ${isActive ? "text-white" : link.isAI ? "text-[#8B5CF6]" : "text-[#0F172A]"}`} strokeWidth={1.5} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer Controls */}
        <div className="p-3.5 border-t border-[#E5E7EB] bg-white space-y-1.5 mt-auto">
          <Link
            href="/settings"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
              pathname === "/settings"
                ? "bg-[#8B5CF6] text-white"
                : "text-[#64748B] hover:bg-[#FAFAFA] hover:text-[#8B5CF6]"
            }`}
          >
            <Settings className="h-5 w-5 shrink-0 text-[#0F172A]" strokeWidth={1.5} /> Settings
          </Link>

          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-red-600 hover:bg-red-50 transition-colors text-left cursor-pointer"
          >
            <LogOut className="h-5 w-5 shrink-0" strokeWidth={1.5} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Page Area with Generous Whitespace */}
      <main className="flex-1 p-6 md:p-10 overflow-x-hidden max-w-full bg-white">{children}</main>
    </div>
  );
}