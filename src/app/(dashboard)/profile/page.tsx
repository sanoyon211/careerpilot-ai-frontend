"use client"

import { useState } from "react"
import { Button } from "@/components/common/Button"
import { User, Mail, Phone, MapPin, Globe, Save } from "lucide-react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsEditing(false)
    console.log("Profile updated")
  }

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
              JD
            </div>
            {isEditing && (
              <button className="absolute bottom-0 right-0 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-md font-medium shadow">
                Change
              </button>
            )}
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold">John Doe</h2>
            <p className="text-muted-foreground font-medium mb-3">Senior Frontend Developer</p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> San Francisco, CA</span>
              <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" /> john@example.com</span>
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
                  <input type="text" defaultValue="John Doe" disabled={!isEditing} className="w-full pl-10 pr-3 py-2 rounded-md border bg-background disabled:opacity-50 disabled:bg-muted" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <input type="email" defaultValue="john@example.com" disabled={!isEditing} className="w-full pl-10 pr-3 py-2 rounded-md border bg-background disabled:opacity-50 disabled:bg-muted" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <input type="tel" defaultValue="+1 (555) 123-4567" disabled={!isEditing} className="w-full pl-10 pr-3 py-2 rounded-md border bg-background disabled:opacity-50 disabled:bg-muted" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <input type="text" defaultValue="San Francisco, CA" disabled={!isEditing} className="w-full pl-10 pr-3 py-2 rounded-md border bg-background disabled:opacity-50 disabled:bg-muted" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Professional Details</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Professional Headline</label>
                <input type="text" defaultValue="Senior Frontend Developer" disabled={!isEditing} className="w-full px-3 py-2 rounded-md border bg-background disabled:opacity-50 disabled:bg-muted" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Bio / Summary</label>
                <textarea rows={4} disabled={!isEditing} defaultValue="Passionate frontend developer with 5+ years of experience building scalable web applications. Strong focus on React, Next.js, and web performance." className="w-full px-3 py-2 rounded-md border bg-background disabled:opacity-50 disabled:bg-muted resize-y" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Portfolio / Website</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <input type="url" defaultValue="https://johndoe.dev" disabled={!isEditing} className="w-full pl-10 pr-3 py-2 rounded-md border bg-background disabled:opacity-50 disabled:bg-muted" />
                </div>
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="pt-4 flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
              <Button type="submit" className="gap-2"><Save className="h-4 w-4" /> Save Changes</Button>
            </div>
          )}

        </form>
      </div>
    </div>
  )
}
