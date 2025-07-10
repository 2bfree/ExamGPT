"use client"

import { TopNavLayout } from "@/components/layout/top-nav-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Clock, TrendingUp, BookOpen } from "lucide-react"
import { Search, Filter, Calendar } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

const stats = [
  {
    title: "Total Assignments",
    value: "12",
    icon: FileText,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Total Graded",
    value: "66",
    icon: BookOpen,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    title: "Pending Grading",
    value: "23",
    icon: Clock,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    title: "Average Score",
    value: "78.5%",
    icon: TrendingUp,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
]

const assignments = [
  {
    id: "ASG001",
    title: "Calculus Final Exam",
    subject: "Math 101",
    dueDate: "2024-01-20",
    submissions: 25,
    totalStudents: 30,
    averageScore: 85.2,
    status: "active",
    pendingGrading: 0,
  },
  {
    id: "ASG002",
    title: "Physics Quiz Chapter 5",
    subject: "Physics 201",
    dueDate: "2024-01-18",
    submissions: 18,
    totalStudents: 22,
    averageScore: 78.4,
    status: "active",
    pendingGrading: 5,
  },
  {
    id: "ASG003",
    title: "Chemistry Lab Report",
    subject: "Chemistry 301",
    dueDate: "2024-01-25",
    submissions: 12,
    totalStudents: 20,
    averageScore: 92.1,
    status: "active",
    pendingGrading: 0,
  },
  {
    id: "ASG004",
    title: "Statistics Midterm",
    subject: "Math 201",
    dueDate: "2024-01-15",
    submissions: 28,
    totalStudents: 28,
    averageScore: 71.8,
    status: "completed",
    pendingGrading: 0,
  },
  {
    id: "ASG005",
    title: "Organic Chemistry Test",
    subject: "Chemistry 401",
    dueDate: "2024-01-22",
    submissions: 15,
    totalStudents: 18,
    averageScore: 88.7,
    status: "active",
    pendingGrading: 8,
  },
]

function getInitials(title: string): string {
  return title
    .split(" ")
    .map((word) => word[0])
    .join("")
    .substring(0, 2)
    .toUpperCase()
}

function getStatusColor(status: string): string {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800"
    case "completed":
      return "bg-gray-100 text-gray-800"
    case "draft":
      return "bg-yellow-100 text-yellow-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function Dashboard() {
  const router = useRouter()

  const handleAddAssignment = () => {
    router.push("/add-assignment")
  }

  return (
    <TopNavLayout
      currentPage="Dashboard"
      title="Assignment Management"
      subtitle="Manage assignments and track submission progress"
      addButtonText="Add Assignment"
      onAddClick={handleAddAssignment}
      showSearch={false}
      showFilter={false}
    >
      <div className="space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title} className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className={`p-3 rounded-lg ${stat.bgColor} mr-4`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input type="text" placeholder="Search assignments by name or ID..." className="pl-10" />
          </div>
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
        </div>

        {/* Assignment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assignments.map((assignment) => (
            <Card key={assignment.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-semibold text-sm">{getInitials(assignment.title)}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">{assignment.title}</h3>
                      <p className="text-xs text-gray-500">
                        {assignment.id} • {assignment.subject}
                      </p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(assignment.status)}>{assignment.status}</Badge>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500">Average Score</p>
                    <p className="text-lg font-bold text-green-600">{assignment.averageScore}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Submissions</p>
                    <p className="text-lg font-bold text-gray-900">
                      {assignment.submissions}/{assignment.totalStudents}
                    </p>
                  </div>
                </div>

                {/* Due Date */}
                <div className="flex items-center text-xs text-gray-500 mb-4">
                  <Calendar className="h-3 w-3 mr-1" />
                  Due: {assignment.dueDate}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs bg-transparent"
                    onClick={() => (window.location.href = `/assignment/${assignment.id}/students`)}
                  >
                    View Grade
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </TopNavLayout>
  )
}
