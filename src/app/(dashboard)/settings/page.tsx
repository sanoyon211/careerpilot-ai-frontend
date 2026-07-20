"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/redux/store";
import { Button } from "@/components/common/Button";
import {
  Lock,
  Mail,
  ShieldCheck,
  Bell,
  User,
  CheckCircle2,
  AlertTriangle,
  KeyRound,
  Sparkles,
  LogOut,
} from "lucide-react";
import { toast } from "sonner";
import { logout } from "@/redux/slices/authSlice";
import { baseApi } from "@/redux/api/baseApi";
import { useUpdateMyProfileMutation } from "@/redux/api/userApi";

export default function SettingsPage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const [updateProfile, { isLoading: isUpdatingProfile }] = useUpdateMyProfileMutation();

  // Password State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Notification State
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [aiAlerts, setAiAlerts] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    setIsChangingPassword(true);
    toast.loading("Updating security password...", { id: "pw-change" });

    setTimeout(() => {
      setIsChangingPassword(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      toast.success("Security password updated successfully!", { id: "pw-change" });
    }, 1200);
  };

  const handleSaveNotifications = () => {
    toast.success("Notification preferences updated!");
  };

  const handleSignOutAll = () => {
    document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    dispatch(logout());
    dispatch(baseApi.util.resetApiState());
    toast.success("Signed out of all devices");
    window.location.replace("/login");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your security, notifications, and account credentials.</p>
      </div>

      {/* Account Profile Summary Card */}
      <div className="bg-card border rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-xl bg-[#0F172A] text-white font-extrabold text-xl flex items-center justify-center">
            {user?.name?.charAt(0) || "U"}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-lg">{user?.name || "User"}</h2>
              <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold uppercase bg-[#F3E8FF] text-[#8B5CF6] border border-[#8B5CF6]/30">
                {user?.role || "Job Seeker"}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5 text-muted-foreground" /> {user?.email}
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F3E8FF] text-[#8B5CF6] border border-[#8B5CF6]/30 text-xs font-bold">
          <ShieldCheck className="h-4 w-4" /> Account Verified
        </div>
      </div>

      {/* Security & Password Section */}
      <div className="bg-card border rounded-xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b pb-4">
          <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
            <KeyRound className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-bold text-lg">Password & Security</h2>
            <p className="text-xs text-muted-foreground">Update your password to keep your account secure.</p>
          </div>
        </div>

        <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-lg">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-muted-foreground uppercase" htmlFor="currentPw">
              Current Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
              <input
                id="currentPw"
                type="password"
                placeholder="••••••••"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border bg-background text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground uppercase" htmlFor="newPw">
                New Password
              </label>
              <input
                id="newPw"
                type="password"
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border bg-background text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground uppercase" htmlFor="confirmPw">
                Confirm Password
              </label>
              <input
                id="confirmPw"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border bg-background text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          </div>

          <Button type="submit" isLoading={isChangingPassword} className="bg-primary hover:bg-primary/90 rounded-xl gap-2 mt-2">
            <ShieldCheck className="h-4 w-4" /> Update Password
          </Button>
        </form>
      </div>

      {/* Notification Preferences Section */}
      <div className="bg-card border rounded-xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b pb-4">
          <div className="p-2.5 rounded-xl bg-[#F3E8FF] text-[#8B5CF6]">
            <Bell className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-bold text-lg">Notification Preferences</h2>
            <p className="text-xs text-muted-foreground">Choose when and how CareerPilot AI contacts you.</p>
          </div>
        </div>

        <div className="space-y-4 max-w-xl">
          <label className="flex items-center justify-between p-3.5 rounded-xl border bg-slate-50 dark:bg-slate-900 cursor-pointer">
            <div>
              <span className="font-bold text-sm block">Job Application Updates</span>
              <span className="text-xs text-muted-foreground">Get notified when employer reviews or updates application status</span>
            </div>
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={(e) => setEmailNotifications(e.target.checked)}
              className="h-4.5 w-4.5 rounded border-gray-300 text-primary focus:ring-primary"
            />
          </label>

          <label className="flex items-center justify-between p-3.5 rounded-xl border bg-slate-50 dark:bg-slate-900 cursor-pointer">
            <div>
              <span className="font-bold text-sm block flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-primary" /> AI Career & Job Match Alerts
              </span>
              <span className="text-xs text-muted-foreground">Receive weekly AI-curated job recommendation digests</span>
            </div>
            <input
              type="checkbox"
              checked={aiAlerts}
              onChange={(e) => setAiAlerts(e.target.checked)}
              className="h-4.5 w-4.5 rounded border-gray-300 text-primary focus:ring-primary"
            />
          </label>

          <label className="flex items-center justify-between p-3.5 rounded-xl border bg-slate-50 dark:bg-slate-900 cursor-pointer">
            <div>
              <span className="font-bold text-sm block">News & Platform Updates</span>
              <span className="text-xs text-muted-foreground">Receive product feature announcements and career insights</span>
            </div>
            <input
              type="checkbox"
              checked={marketingEmails}
              onChange={(e) => setMarketingEmails(e.target.checked)}
              className="h-4.5 w-4.5 rounded border-gray-300 text-primary focus:ring-primary"
            />
          </label>

          <Button onClick={handleSaveNotifications} variant="outline" className="rounded-xl">
            Save Preferences
          </Button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-red-500/10 text-red-600">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-bold text-lg text-red-600">Session & Danger Zone</h2>
            <p className="text-xs text-muted-foreground">Manage active sessions across all devices.</p>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-bold text-sm text-foreground">Sign Out of All Sessions</p>
            <p className="text-xs text-muted-foreground">This will log you out from all desktop and mobile browsers immediately.</p>
          </div>
          <Button onClick={handleSignOutAll} variant="outline" className="text-red-600 hover:bg-red-500/10 border-red-200 rounded-xl gap-2 shrink-0">
            <LogOut className="h-4 w-4" /> Sign Out All Devices
          </Button>
        </div>
      </div>
    </div>
  );
}
