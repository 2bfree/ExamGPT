"use client"

import { TopNavLayout } from "@/components/layout/top-nav-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail, Phone, MapPin, Bell, Shield, Palette, Download, Trash2, Camera, Save, Key } from "lucide-react"
import { useState } from "react"

export default function SettingsPage() {
  // Profile settings
  const [firstName, setFirstName] = useState("John")
  const [lastName, setLastName] = useState("Smith")
  const [email, setEmail] = useState("john.smith@university.edu")
  const [phone, setPhone] = useState("+1 (555) 123-4567")
  const [department, setDepartment] = useState("Mathematics")
  const [institution, setInstitution] = useState("State University")
  const [bio, setBio] = useState("Professor of Mathematics with 15 years of teaching experience.")

  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [gradingAlerts, setGradingAlerts] = useState(true)
  const [weeklyReports, setWeeklyReports] = useState(false)

  // AI settings
  const [aiConfidenceThreshold, setAiConfidenceThreshold] = useState("85")
  const [autoApproveHighConfidence, setAutoApproveHighConfidence] = useState(false)
  const [requireManualReview, setRequireManualReview] = useState(true)

  // Display settings
  const [theme, setTheme] = useState("light")
  const [language, setLanguage] = useState("en")
  const [timezone, setTimezone] = useState("America/New_York")

  const handleSaveProfile = () => {
    console.log("Saving profile settings...")
  }

  const handleSaveNotifications = () => {
    console.log("Saving notification settings...")
  }

  const handleSaveAI = () => {
    console.log("Saving AI settings...")
  }

  const handleSaveDisplay = () => {
    console.log("Saving display settings...")
  }

  const handleExportData = () => {
    console.log("Exporting user data...")
  }

  const handleDeleteAccount = () => {
    console.log("Delete account requested...")
  }

  return (
    <TopNavLayout
      currentPage="Settings"
      title="Account Settings"
      subtitle="Manage your profile, preferences, and AI grading settings"
      addButtonText="Export Data"
      onAddClick={handleExportData}
      showSearch={false}
      showFilter={false}
    >
      <div className="space-y-8">
        {/* User Info Card */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>User Information</CardTitle>
                <CardDescription>Your account details and contact information</CardDescription>
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                User ID: TCH001
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Profile Picture */}
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Profile picture" />
                <AvatarFallback className="text-lg">JS</AvatarFallback>
              </Avatar>
              <div>
                <Button variant="outline" size="sm" className="bg-transparent">
                  <Camera className="h-4 w-4 mr-2" />
                  Change Photo
                </Button>
                <p className="text-sm text-gray-500 mt-1">JPG, PNG or GIF. Max size 2MB.</p>
              </div>
            </div>

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="first-name">First Name</Label>
                <Input id="first-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last Name</Label>
                <Input id="last-name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="pl-10" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select value={department} onValueChange={setDepartment}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mathematics">Mathematics</SelectItem>
                    <SelectItem value="Physics">Physics</SelectItem>
                    <SelectItem value="Chemistry">Chemistry</SelectItem>
                    <SelectItem value="Biology">Biology</SelectItem>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="History">History</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="institution">Institution</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="institution"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                placeholder="Tell us about yourself..."
              />
            </div>

            <div className="flex justify-end">
              <Button onClick={handleSaveProfile} className="bg-gray-900 hover:bg-gray-800">
                <Save className="h-4 w-4 mr-2" />
                Save Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Notification Settings
            </CardTitle>
            <CardDescription>Configure how you receive notifications and alerts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifications" className="font-medium">
                    Email Notifications
                  </Label>
                  <p className="text-sm text-gray-500">Receive notifications via email</p>
                </div>
                <Switch id="email-notifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="push-notifications" className="font-medium">
                    Push Notifications
                  </Label>
                  <p className="text-sm text-gray-500">Receive browser push notifications</p>
                </div>
                <Switch id="push-notifications" checked={pushNotifications} onCheckedChange={setPushNotifications} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="grading-alerts" className="font-medium">
                    Grading Alerts
                  </Label>
                  <p className="text-sm text-gray-500">Get notified when AI grading is complete</p>
                </div>
                <Switch id="grading-alerts" checked={gradingAlerts} onCheckedChange={setGradingAlerts} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="weekly-reports" className="font-medium">
                    Weekly Reports
                  </Label>
                  <p className="text-sm text-gray-500">Receive weekly performance summaries</p>
                </div>
                <Switch id="weekly-reports" checked={weeklyReports} onCheckedChange={setWeeklyReports} />
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={handleSaveNotifications} className="bg-gray-900 hover:bg-gray-800">
                <Save className="h-4 w-4 mr-2" />
                Save Notifications
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* AI Grading Settings */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              AI Grading Preferences
            </CardTitle>
            <CardDescription>Configure AI grading behavior and confidence thresholds</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="confidence-threshold">AI Confidence Threshold (%)</Label>
                <Input
                  id="confidence-threshold"
                  type="number"
                  min="0"
                  max="100"
                  value={aiConfidenceThreshold}
                  onChange={(e) => setAiConfidenceThreshold(e.target.value)}
                />
                <p className="text-sm text-gray-500">
                  Minimum confidence level required for AI grading (current: {aiConfidenceThreshold}%)
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-approve" className="font-medium">
                    Auto-approve High Confidence
                  </Label>
                  <p className="text-sm text-gray-500">Automatically approve grades above threshold</p>
                </div>
                <Switch
                  id="auto-approve"
                  checked={autoApproveHighConfidence}
                  onCheckedChange={setAutoApproveHighConfidence}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="manual-review" className="font-medium">
                    Require Manual Review
                  </Label>
                  <p className="text-sm text-gray-500">Always require human review before finalizing grades</p>
                </div>
                <Switch id="manual-review" checked={requireManualReview} onCheckedChange={setRequireManualReview} />
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={handleSaveAI} className="bg-gray-900 hover:bg-gray-800">
                <Save className="h-4 w-4 mr-2" />
                Save AI Settings
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Display Settings */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Palette className="h-5 w-5 mr-2" />
              Display & Language
            </CardTitle>
            <CardDescription>Customize your interface preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select value={timezone} onValueChange={setTimezone}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="America/New_York">Eastern Time</SelectItem>
                    <SelectItem value="America/Chicago">Central Time</SelectItem>
                    <SelectItem value="America/Denver">Mountain Time</SelectItem>
                    <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={handleSaveDisplay} className="bg-gray-900 hover:bg-gray-800">
                <Save className="h-4 w-4 mr-2" />
                Save Display Settings
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Key className="h-5 w-5 mr-2" />
              Security
            </CardTitle>
            <CardDescription>Manage your account security and password</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Button variant="outline" className="w-full bg-transparent">
                Change Password
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                Enable Two-Factor Authentication
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                View Login History
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Data Management</CardTitle>
            <CardDescription>Export your data or delete your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" onClick={handleExportData} className="bg-transparent">
                <Download className="h-4 w-4 mr-2" />
                Export All Data
              </Button>
              <Button variant="destructive" onClick={handleDeleteAccount}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Account
              </Button>
            </div>
            <p className="text-sm text-gray-500">
              Deleting your account will permanently remove all your data and cannot be undone.
            </p>
          </CardContent>
        </Card>
      </div>
    </TopNavLayout>
  )
}
