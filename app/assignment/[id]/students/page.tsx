"use client"

import { TopNavLayout } from "@/components/layout/top-nav-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Search, Filter, CheckCircle, XCircle, Clock, Eye } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

interface Student {
  id: string
  name: string
  studentId: string
  subject: string
  score: number
  maxScore: number
  status: "graded" | "pending" | "submitted"
  submissionDate: string
  gradedDate?: string
  correctAnswers: number
  totalQuestions: number
}

const students: Student[] = [
  {
    id: "1",
    name: "Alice Johnson",
    studentId: "STU001",
    subject: "Math 101",
    score: 85.5,
    maxScore: 100,
    status: "graded",
    submissionDate: "2024-01-15",
    gradedDate: "2024-01-16",
    correctAnswers: 8,
    totalQuestions: 10,
  },
  {
    id: "2",
    name: "Bob Smith",
    studentId: "STU002",
    subject: "Math 101",
    score: 78.2,
    maxScore: 100,
    status: "graded",
    submissionDate: "2024-01-15",
    gradedDate: "2024-01-16",
    correctAnswers: 7,
    totalQuestions: 10,
  },
  {
    id: "3",
    name: "Carol Davis",
    studentId: "STU003",
    subject: "Math 101",
    score: 92.1,
    maxScore: 100,
    status: "graded",
    submissionDate: "2024-01-14",
    gradedDate: "2024-01-15",
    correctAnswers: 9,
    totalQuestions: 10,
  },
  {
    id: "4",
    name: "David Wilson",
    studentId: "STU004",
    subject: "Math 101",
    score: 0,
    maxScore: 100,
    status: "pending",
    submissionDate: "2024-01-16",
    correctAnswers: 0,
    totalQuestions: 10,
  },
  {
    id: "5",
    name: "Emma Brown",
    studentId: "STU005",
    subject: "Math 101",
    score: 88.7,
    maxScore: 100,
    status: "graded",
    submissionDate: "2024-01-15",
    gradedDate: "2024-01-16",
    correctAnswers: 8,
    totalQuestions: 10,
  },
]

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .substring(0, 2)
    .toUpperCase()
}

function getStatusIcon(status: string) {
  switch (status) {
    case "graded":
      return <CheckCircle className="h-4 w-4 text-green-500" />
    case "pending":
      return <Clock className="h-4 w-4 text-orange-500" />
    case "submitted":
      return <XCircle className="h-4 w-4 text-blue-500" />
    default:
      return <Clock className="h-4 w-4 text-gray-500" />
  }
}

function getStatusColor(status: string): string {
  switch (status) {
    case "graded":
      return "bg-green-100 text-green-800"
    case "pending":
      return "bg-orange-100 text-orange-800"
    case "submitted":
      return "bg-blue-100 text-blue-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function AssignmentStudentsPage() {
  const params = useParams()
  const router = useRouter()
  const assignmentId = params.id as string

  // Mock assignment data - in real app, fetch based on assignmentId
  const assignmentTitle = "Calculus Final Exam"
  const gradedStudents = students.filter((s) => s.status === "graded")
  const pendingStudents = students.filter((s) => s.status === "pending")
  const averageScore = gradedStudents.reduce((sum, s) => sum + s.score, 0) / gradedStudents.length

  const handleBack = () => {
    router.push("/")
  }

  const handleViewGrading = (studentId: string) => {
    router.push(`/assignment/${assignmentId}/student/${studentId}/grade`)
  }

  return (
    <TopNavLayout
      currentPage="Dashboard"
      title={assignmentTitle}
      subtitle={`Student submissions and grading status • Assignment ID: ${assignmentId}`}
      addButtonText="Export Results"
      showSearch={false}
      showFilter={false}
    >
      <div className="space-y-6">
        {/* Back Button */}
        <Button variant="outline" onClick={handleBack} className="mb-4 bg-transparent">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-blue-50 mr-4">
                  <CheckCircle className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Graded</p>
                  <p className="text-2xl font-bold text-gray-900">{gradedStudents.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-orange-50 mr-4">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">{pendingStudents.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-green-50 mr-4">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Score</p>
                  <p className="text-2xl font-bold text-gray-900">{averageScore.toFixed(1)}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-purple-50 mr-4">
                  <CheckCircle className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Pass Rate</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.round((gradedStudents.filter((s) => s.score >= 70).length / gradedStudents.length) * 100)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex justify-between items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input type="text" placeholder="Search students by name or ID..." className="pl-10" />
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Select defaultValue="all-status">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-status">All Status</SelectItem>
                <SelectItem value="graded">Graded</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="submitted">Submitted</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Student List View */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left p-4 font-medium text-gray-900">Student</th>
                    <th className="text-left p-4 font-medium text-gray-900">Status</th>
                    <th className="text-left p-4 font-medium text-gray-900">Score</th>
                    <th className="text-left p-4 font-medium text-gray-900">Correct Answers</th>
                    <th className="text-left p-4 font-medium text-gray-900">Graded</th>
                    <th className="text-left p-4 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr
                      key={student.id}
                      className={`border-b hover:bg-gray-50 ${index % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}
                    >
                      <td className="p-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                            <span className="text-blue-600 font-semibold text-xs">{getInitials(student.name)}</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{student.name}</p>
                            <p className="text-sm text-gray-500">
                              {student.studentId} • {student.subject}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(student.status)}
                          <Badge className={getStatusColor(student.status)}>{student.status}</Badge>
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className={`font-bold ${student.status === "graded" ? "text-green-600" : "text-gray-400"}`}
                        >
                          {student.status === "graded" ? `${student.score}%` : "Pending"}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="font-medium text-gray-900">
                          {student.status === "graded" ? `${student.correctAnswers}/${student.totalQuestions}` : "—"}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="text-sm text-gray-600">{student.gradedDate || "—"}</span>
                      </td>
                      <td className="p-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs bg-transparent"
                          onClick={() => handleViewGrading(student.id)}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </TopNavLayout>
  )
}
