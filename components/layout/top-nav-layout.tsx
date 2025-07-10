"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface TopNavLayoutProps {
  children: React.ReactNode
  currentPage?: string
  title: string
  subtitle: string
  addButtonText: string
  onAddClick?: () => void
  showSearch?: boolean
  showFilter?: boolean
}

const navigation = [
  { name: "Dashboard", href: "/" },
  { name: "Analytics", href: "/analytics" },
  { name: "Pricing", href: "/pricing" },
  { name: "Story", href: "/story" },
]

export function TopNavLayout({
  children,
  currentPage = "Dashboard",
  title,
  subtitle,
  addButtonText,
  onAddClick,
  showSearch = true,
  showFilter = true,
}: TopNavLayoutProps) {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900 mr-8">ExamGrader AI</h1>
              <div className="flex space-x-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                      currentPage === item.name
                        ? "bg-gray-900 text-white"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>

            {/* User Info and Settings */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>
                  User ID: <span className="font-medium text-gray-900">TCH001</span>
                </span>
              </div>
              <a
                href="/settings"
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              >
                Settings
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
            <p className="text-gray-600 mt-1">{subtitle}</p>
          </div>
          <Button onClick={onAddClick} className="bg-gray-900 hover:bg-gray-800">
            <Plus className="h-4 w-4 mr-2" />
            {addButtonText}
          </Button>
        </div>

        {children}

        {/* Search and Filter Bar */}
        {(showSearch || showFilter) && (
          <div className="flex justify-between items-center mb-6">
            {showSearch && (
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search assignments by name or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            )}
            {showFilter && (
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Select defaultValue="all-subjects">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-subjects">All Subjects</SelectItem>
                    <SelectItem value="math">Mathematics</SelectItem>
                    <SelectItem value="physics">Physics</SelectItem>
                    <SelectItem value="chemistry">Chemistry</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
