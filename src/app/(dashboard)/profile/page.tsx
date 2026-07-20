"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { User, Mail, Phone, MapPin, Globe, Save } from "lucide-react";
import { useGetMyProfileQuery, useUpdateMyProfileMutation } from "@/redux/api/userApi";
import { toast } from "sonner";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  
  const { data: profileResponse, isLoading } = useGetMyProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateMyProfileMutation();
  const user = profileResponse?.data;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    headline: "",
    bio: "",
    portfolio: ""
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        location: user.location || "",
        headline: user.headline || "",
        bio: user.bio || "",
        portfolio: user.portfolio || ""
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile(formData).unwrap();
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to update profile");
    }
  };

  if (isLoading) return <div className="p-16 text-center text-[#64748B] font-semibold">Loading profile...</div>;

  return (
    <div className="max-w-4xl space-y-8 pb-10">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1E293B]">My Profile</h1>
          <p className="text-[#64748B] font-medium mt-1 text-sm">Manage your personal information and preferences.</p>
        </div>
        <Button variant={isEditing ? "outline" : "default"} className="rounded-lg px-6 font-extrabold bg-[#8B5CF6] hover:bg-[#7C3AED] text-white" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Cancel Editing" : "Edit Profile"}
        </Button>
      </div>

      <div className="bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl p-8 sm:p-10">
        
        {/* Avatar Section */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8 pb-8 border-b border-[#E5E7EB]">
          <div className="relative">
            <div className="h-24 w-24 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center text-3xl font-extrabold border-4 border-white">
              {user?.name?.charAt(0) || "U"}
            </div>
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-extrabold text-[#1E293B]">{user?.name}</h2>
            <p className="text-[#64748B] font-semibold mb-3 text-sm">{user?.headline || user?.role}</p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-semibold text-[#64748B]">
              {user?.location && <span>{user.location}</span>}
              <span>{user?.email}</span>
            </div>
          </div>
        </div>

        {/* Form Section with 25%+ Whitespace */}
        <form onSubmit={handleSubmit} className="space-y-8">
          
          <div className="space-y-4">
            <h3 className="font-extrabold text-lg text-[#1E293B]">Personal Information</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-[#64748B]">Full Name</label>
                <Input name="name" value={formData.name} onChange={handleChange} type="text" disabled={!isEditing} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-[#64748B]">Email Address (Read-only)</label>
                <Input type="email" value={user?.email || ""} disabled className="opacity-70 bg-white" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-[#64748B]">Phone Number</label>
                <Input name="phone" value={formData.phone} onChange={handleChange} type="tel" disabled={!isEditing} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-[#64748B]">Location</label>
                <Input name="location" value={formData.location} onChange={handleChange} type="text" disabled={!isEditing} />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-extrabold text-lg text-[#1E293B]">Professional Details</h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-[#64748B]">Professional Headline</label>
                <Input name="headline" value={formData.headline} onChange={handleChange} type="text" placeholder="e.g. Senior Fullstack Engineer" disabled={!isEditing} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-[#64748B]">Bio / Summary</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={4}
                  disabled={!isEditing}
                  placeholder="Tell us about your technical experience and career background..."
                  className="flex w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm font-medium text-[#1E293B] placeholder:text-[#64748B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] disabled:opacity-50 resize-y"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-[#64748B]">Portfolio / Website</label>
                <Input name="portfolio" value={formData.portfolio} onChange={handleChange} type="url" placeholder="https://" disabled={!isEditing} />
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="pt-4 flex justify-end gap-3">
              <Button type="button" variant="outline" className="rounded-lg font-bold" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isUpdating} className="bg-[#8B5CF6] hover:bg-[#7C3AED] rounded-lg px-6 font-extrabold text-white">
                {isUpdating ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          )}

        </form>
      </div>
    </div>
  );
}
