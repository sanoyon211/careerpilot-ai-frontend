"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/common/Button"
import { User, Mail, Phone, MapPin, Globe, Save } from "lucide-react"
import { useGetMyProfileQuery, useUpdateMyProfileMutation } from "@/redux/api/userApi"
import { toast } from "sonner"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  
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
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await updateProfile(formData).unwrap();
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to update profile");
    }
  }

  if (isLoading) return <div className="p-8 text-center">Loading profile...</div>;

  return (
    <div className="max-w-4xl space-y-6">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
          <p className="text-muted-foreground mt-1">Manage your personal information and preferences.</p>
        </div>
        <Button variant={isEditing ? "outline" : "default"} onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Cancel Editing" : "Edit Profile"}
        </Button>
      </div>

      <div className="bg-card border rounded-2xl p-6 sm:p-8 shadow-sm">
        
        {/* Avatar Section */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8 pb-8 border-b">
          <div className="relative">
            <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center text-3xl font-bold text-muted-foreground border-4 border-background shadow-sm">
              {user?.name?.charAt(0) || "U"}
            </div>
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold">{user?.name}</h2>
            <p className="text-muted-foreground font-medium mb-3">{user?.headline || user?.role}</p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-sm text-muted-foreground">
              {user?.location && <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {user.location}</span>}
              <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" /> {user?.email}</span>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-8">
          
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Personal Information</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <input name="name" value={formData.name} onChange={handleChange} type="text" disabled={!isEditing} className="w-full pl-10 pr-3 py-2 rounded-md border bg-background disabled:opacity-50 disabled:bg-muted" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address (Read-only)</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <input type="email" value={user?.email || ""} disabled className="w-full pl-10 pr-3 py-2 rounded-md border bg-background opacity-50 bg-muted" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <input name="phone" value={formData.phone} onChange={handleChange} type="tel" disabled={!isEditing} className="w-full pl-10 pr-3 py-2 rounded-md border bg-background disabled:opacity-50 disabled:bg-muted" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <input name="location" value={formData.location} onChange={handleChange} type="text" disabled={!isEditing} className="w-full pl-10 pr-3 py-2 rounded-md border bg-background disabled:opacity-50 disabled:bg-muted" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Professional Details</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Professional Headline</label>
                <input name="headline" value={formData.headline} onChange={handleChange} type="text" placeholder="e.g. Senior Frontend Developer" disabled={!isEditing} className="w-full px-3 py-2 rounded-md border bg-background disabled:opacity-50 disabled:bg-muted" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Bio / Summary</label>
                <textarea name="bio" value={formData.bio} onChange={handleChange} rows={4} disabled={!isEditing} placeholder="Tell us about your experience..." className="w-full px-3 py-2 rounded-md border bg-background disabled:opacity-50 disabled:bg-muted resize-y" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Portfolio / Website</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <input name="portfolio" value={formData.portfolio} onChange={handleChange} type="url" placeholder="https://" disabled={!isEditing} className="w-full pl-10 pr-3 py-2 rounded-md border bg-background disabled:opacity-50 disabled:bg-muted" />
                </div>
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="pt-4 flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
              <Button type="submit" disabled={isUpdating} className="gap-2"><Save className="h-4 w-4" /> {isUpdating ? 'Saving...' : 'Save Changes'}</Button>
            </div>
          )}

        </form>
      </div>
    </div>
  )
}
