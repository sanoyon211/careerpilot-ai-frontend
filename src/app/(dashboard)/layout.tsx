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
  isPremium?: boolean;
}

const JOB_SEEKER_LINKS: NavItem[] = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/profile", label: "My Profile", icon: User },
  { href: "/resume", label: "Resume & AI Match", icon: FileText },
  { href: "/saved-jobs", label: "Saved Jobs", icon: Bookmark },
  { href: "/applied-jobs", label: "Applied Jobs", icon: CheckSquare },
  { href: "/ai-chat", label: "AI Career Coach", icon: MessageSquare, isPremium: true },
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

  // Skip profile fetching if user is already in Redux OR if there's no valid access token in cookies
  const { data: profileResponse, isLoading: isLoadingProfile, isError: isProfileError } = useGetMyProfileQuery(
    undefined,
    {
      skip: !!user || !cookieToken,
    }
  );

  // Rehydrate Redux state if profile is fetched via cookie token
  useEffect(() => {
    if (!user && profileResponse?.data) {
      const token = getAccessTokenFromCookie() || "";
      dispatch(setCredentials({ user: profileResponse.data, accessToken: token }));
    }
  }, [user, profileResponse, dispatch]);

  // Client-side authentication guard redirect
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

  // Socket.io real-time notification room connection
  useEffect(() => {
    if (!user?._id) return;

    const rawUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const socketUrl = rawUrl.replace(/\/api\/v1\/?$/, "");

    const socket = io(socketUrl);

    socket.emit("join_user_room", user._id);

    socket.on("status_updated", (data) => {
      toast.success(`Application Update! 🎉`, {
        description: `Your application for "${data.jobTitle}" moved to "${data.status}".`,
        duration: 8000,
      });

      // Invalidate RTK Query tags to refresh UI instantly without reloading
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
      <div className="min-h-screen flex items-center justify-center bg-muted/20">
        <div className="text-center space-y-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto text-primary" />
          <p className="text-sm font-semibold text-muted-foreground animate-pulse">
            {isLoadingProfile ? "Verifying authentication session..." : "Redirecting to login..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col md:flex-row">
      {/* Mobile Topbar */}
      <div className="md:hidden bg-card border-b p-4 flex items-center justify-between sticky top-0 z-20 shadow-xs">
        <Link
          href="/"
          className="font-extrabold text-xl bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent"
        >
          CareerPilot AI
        </Link>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-muted-foreground">
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`
        ${isMobileMenuOpen ? "fixed inset-0 top-[65px] z-30 bg-background" : "hidden"} 
        md:block md:w-64 md:shrink-0 bg-card border-r md:sticky md:top-0 md:h-screen flex flex-col overflow-y-auto transition-all shadow-xs
      `}
      >
        {/* Header Logo */}
        <div className="p-6 hidden md:block border-b">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary/10 text-primary p-2 rounded-xl">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-primary via-indigo-600 to-blue-600 bg-clip-text text-transparent">
              CareerPilot AI
            </span>
          </Link>
        </div>

        {/* User Card in Sidebar */}
        <div className="p-4 mx-3 my-3 bg-slate-50 dark:bg-slate-900 border rounded-2xl flex items-center gap-3">
          {user.photoURL ? (
            <img src={user.photoURL} alt={user.name} className="h-10 w-10 rounded-full object-cover border" />
          ) : (
            <div className="h-10 w-10 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs shrink-0">
              {getInitials(user.name)}
            </div>
          )}
          <div className="overflow-hidden">
            <p className="font-bold text-xs truncate text-foreground">{user.name}</p>
            <span className="inline-block text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-600 border border-indigo-500/20">
              {isEmployer ? "Employer" : "Job Seeker"}
            </span>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-1 flex-1">
          <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-3 px-3">
            {isEmployer ? "Employer Workspace" : "Job Seeker Navigation"}
          </div>

          {navItems.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <link.icon className="h-4.5 w-4.5 shrink-0" />
                <span>{link.label}</span>
                {link.isPremium && (
                  <Sparkles className={`h-3.5 w-3.5 ml-auto ${isActive ? "text-yellow-300" : "text-yellow-500"}`} />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer Controls */}
        <div className="p-4 border-t bg-card space-y-1 mt-auto">
          <Link
            href="/settings"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              pathname === "/settings"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Settings className="h-4.5 w-4.5 shrink-0" /> Settings
          </Link>

          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-500/10 transition-colors text-left"
          >
            <LogOut className="h-4.5 w-4.5 shrink-0" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Page Area */}
      <main className="flex-1 p-4 md:p-8 overflow-x-hidden max-w-full">{children}</main>
    </div>
  );
}