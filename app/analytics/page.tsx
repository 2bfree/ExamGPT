"use client"

import { TopNavLayout } from "@/components/layout/top-nav-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, Users, BookOpen, Clock, Target, Filter } from "lucide-react"

const scoreDistribution = [
  { range: "90-100", count: 45, percentage: 18 },
  { range: "80-89", count: 78, percentage: 31 },
  { range: "70-79", count: 65, percentage: 26 },
  { range: "60-69", count: 42, percentage: 17 },
  { range: "50-59", count: 15, percentage: 6 },
  { range: "0-49", count: 5, percentage: 2 },
]

const questionPerformance = [
  { question: "Q1", correct: 85, incorrect: 15, difficulty: "Easy", avgScore: 4.2, maxScore: 5 },
  { question: "Q2", correct: 78, incorrect: 22, difficulty: "Medium", avgScore: 3.9, maxScore: 5 },
  { question: "Q3", correct: 45, incorrect: 55, difficulty: "Hard", avgScore: 2.3, maxScore: 5 },
  { question: "Q4", correct: 92, incorrect: 8, difficulty: "Easy", avgScore: 4.6, maxScore: 5 },
  { question: "Q5", correct: 67, incorrect: 33, difficulty: "Medium", avgScore: 3.4, maxScore: 5 },
  { question: "Q6", correct: 34, incorrect: 66, difficulty: "Hard", avgScore: 1.7, maxScore: 5 },
  { question: "Q7", correct: 89, incorrect: 11, difficulty: "Easy", avgScore: 4.5, maxScore: 5 },
  { question: "Q8", correct: 56, incorrect: 44, difficulty: "Medium", avgScore: 2.8, maxScore: 5 },
]

const gradingTrends = [
  { month: "Jan", exams: 120, avgScore: 78.5, aiAccuracy: 94.2 },
  { month: "Feb", exams: 145, avgScore: 81.2, aiAccuracy: 95.1 },
  { month: "Mar", exams: 167, avgScore: 79.8, aiAccuracy: 93.8 },
  { month: "Apr", exams: 189, avgScore: 82.1, aiAccuracy: 96.3 },
  { month: "May", exams: 203, avgScore: 80.7, aiAccuracy: 95.7 },
  { month: "Jun", exams: 178, avgScore: 83.4, aiAccuracy: 97.1 },
]

const subjectPerformance = [
  { subject: "Mathematics", avgScore: 78.5, totalExams: 450, color: "#3B82F6" },
  { subject: "Physics", avgScore: 72.3, totalExams: 320, color: "#10B981" },
  { subject: "Chemistry", avgScore: 81.2, totalExams: 280, color: "#F59E0B" },
  { subject: "Biology", avgScore: 76.8, totalExams: 190, color: "#EF4444" },
]

const aiConfidenceData = [
  { range: "95-100%", count: 156, color: "#10B981" },
  { range: "90-94%", count: 89, color: "#3B82F6" },
  { range: "85-89%", count: 45, color: "#F59E0B" },
  { range: "80-84%", count: 23, color: "#EF4444" },
  { range: "Below 80%", count: 12, color: "#6B7280" },
]

const recentExams = [
  {
    id: "EX001",
    title: "Calculus Final Exam",
    subject: "Mathematics",
    date: "2024-01-20",
    students: 45,
    avgScore: 85.2,
    aiAccuracy: 96.8,
    status: "completed",
  },
  {
    id: "EX002",
    title: "Organic Chemistry Test",
    subject: "Chemistry",
    date: "2024-01-19",
    students: 32,
    avgScore: 78.4,
    aiAccuracy: 94.2,
    status: "completed",
  },
  {
    id: "EX003",
    title: "Physics Mechanics Quiz",
    subject: "Physics",
    date: "2024-01-18",
    students: 28,
    avgScore: 72.1,
    aiAccuracy: 92.5,
    status: "completed",
  },
  {
    id: "EX004",
    title: "Statistics Midterm",
    subject: "Mathematics",
    date: "2024-01-17",
    students: 38,
    avgScore: 81.7,
    aiAccuracy: 95.3,
    status: "completed",
  },
]

function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case "Easy":
      return "bg-green-100 text-green-800"
    case "Medium":
      return "bg-yellow-100 text-yellow-800"
    case "Hard":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function AnalyticsPage() {
  const handleExportData = () => {
    console.log("Exporting analytics data...")
  }

  return (
    <TopNavLayout
      currentPage="Analytics"
      title="Analytics Dashboard"
      subtitle="Comprehensive insights into exam performance and AI grading accuracy"
      addButtonText="Export Data"
      onAddClick={handleExportData}
      showSearch={false}
      showFilter={false}
    >
      <div className="space-y-8">
        {/* Filter Controls */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Select defaultValue="all-time">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-time">All Time</SelectItem>
                <SelectItem value="last-month">Last Month</SelectItem>
                <SelectItem value="last-quarter">Last Quarter</SelectItem>
                <SelectItem value="last-year">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all-subjects">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-subjects">All Subjects</SelectItem>
                <SelectItem value="mathematics">Mathematics</SelectItem>
                <SelectItem value="physics">Physics</SelectItem>
                <SelectItem value="chemistry">Chemistry</SelectItem>
                <SelectItem value="biology">Biology</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filters
          </Button>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Exams</p>
                  <p className="text-2xl font-bold text-gray-900">1,234</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+12% from last month</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-blue-50">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Score</p>
                  <p className="text-2xl font-bold text-gray-900">78.5%</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+2.1% from last month</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-green-50">
                  <Target className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">AI Accuracy</p>
                  <p className="text-2xl font-bold text-gray-900">94.2%</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+0.8% from last month</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-purple-50">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Time Saved</p>
                  <p className="text-2xl font-bold text-gray-900">156h</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">This month</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-orange-50">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Score Distribution</CardTitle>
              <CardDescription>Distribution of student scores across all exams</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={scoreDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Grading Trends</CardTitle>
              <CardDescription>Monthly exam volume, scores, and AI accuracy</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={gradingTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="avgScore" stroke="#3B82F6" name="Avg Score" />
                  <Line type="monotone" dataKey="aiAccuracy" stroke="#10B981" name="AI Accuracy" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Subject Performance</CardTitle>
              <CardDescription>Average scores by subject area</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={subjectPerformance}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="totalExams"
                    label={({ subject, avgScore }) => `${subject}: ${avgScore}%`}
                  >
                    {subjectPerformance.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>AI Confidence Distribution</CardTitle>
              <CardDescription>Distribution of AI grading confidence levels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiConfidenceData.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">{item.range}</span>
                      <span className="text-sm text-gray-600">{item.count} exams</span>
                    </div>
                    <Progress value={(item.count / 325) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Question Performance Analysis */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Question Performance Analysis</CardTitle>
            <CardDescription>Detailed breakdown of performance by question</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left p-3 font-medium text-gray-900">Question</th>
                    <th className="text-left p-3 font-medium text-gray-900">Difficulty</th>
                    <th className="text-left p-3 font-medium text-gray-900">Correct Rate</th>
                    <th className="text-left p-3 font-medium text-gray-900">Avg Score</th>
                    <th className="text-left p-3 font-medium text-gray-900">Performance</th>
                  </tr>
                </thead>
                <tbody>
                  {questionPerformance.map((question, index) => (
                    <tr
                      key={question.question}
                      className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}
                    >
                      <td className="p-3 font-medium text-gray-900">{question.question}</td>
                      <td className="p-3">
                        <Badge className={getDifficultyColor(question.difficulty)}>{question.difficulty}</Badge>
                      </td>
                      <td className="p-3">
                        <span
                          className={`font-medium ${question.correct >= 70 ? "text-green-600" : question.correct >= 50 ? "text-yellow-600" : "text-red-600"}`}
                        >
                          {question.correct}%
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="font-medium text-gray-900">
                          {question.avgScore}/{question.maxScore}
                        </span>
                      </td>
                      <td className="p-3">
                        <Progress value={question.correct} className="w-20 h-2" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Recent Exams */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Recent Exam Performance</CardTitle>
            <CardDescription>Latest exam results and AI grading accuracy</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left p-3 font-medium text-gray-900">Exam</th>
                    <th className="text-left p-3 font-medium text-gray-900">Subject</th>
                    <th className="text-left p-3 font-medium text-gray-900">Date</th>
                    <th className="text-left p-3 font-medium text-gray-900">Students</th>
                    <th className="text-left p-3 font-medium text-gray-900">Avg Score</th>
                    <th className="text-left p-3 font-medium text-gray-900">AI Accuracy</th>
                    <th className="text-left p-3 font-medium text-gray-900">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentExams.map((exam, index) => (
                    <tr
                      key={exam.id}
                      className={`border-b hover:bg-gray-50 ${index % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}
                    >
                      <td className="p-3">
                        <div>
                          <p className="font-medium text-gray-900">{exam.title}</p>
                          <p className="text-xs text-gray-500">{exam.id}</p>
                        </div>
                      </td>
                      <td className="p-3 text-gray-600">{exam.subject}</td>
                      <td className="p-3 text-gray-600">{exam.date}</td>
                      <td className="p-3 font-medium text-gray-900">{exam.students}</td>
                      <td className="p-3">
                        <span className="font-medium text-green-600">{exam.avgScore}%</span>
                      </td>
                      <td className="p-3">
                        <span className="font-medium text-blue-600">{exam.aiAccuracy}%</span>
                      </td>
                      <td className="p-3">
                        <Badge className="bg-green-100 text-green-800">{exam.status}</Badge>
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
