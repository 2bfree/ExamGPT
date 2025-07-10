"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"

const scoreDistribution = [
  { range: "90-100", count: 45, percentage: 18 },
  { range: "80-89", count: 78, percentage: 31 },
  { range: "70-79", count: 65, percentage: 26 },
  { range: "60-69", count: 42, percentage: 17 },
  { range: "50-59", count: 15, percentage: 6 },
  { range: "0-49", count: 5, percentage: 2 },
]

const questionPerformance = [
  { question: "Q1", correct: 85, incorrect: 15, difficulty: "Easy" },
  { question: "Q2", correct: 78, incorrect: 22, difficulty: "Medium" },
  { question: "Q3", correct: 45, incorrect: 55, difficulty: "Hard" },
  { question: "Q4", correct: 92, incorrect: 8, difficulty: "Easy" },
  { question: "Q5", correct: 67, incorrect: 33, difficulty: "Medium" },
]

const gradingTrends = [
  { month: "Jan", exams: 120, avgScore: 78.5 },
  { month: "Feb", exams: 145, avgScore: 81.2 },
  { month: "Mar", exams: 167, avgScore: 79.8 },
  { month: "Apr", exams: 189, avgScore: 82.1 },
  { month: "May", exams: 203, avgScore: 80.7 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export default function StatisticsPage() {
  return (
    <MainLayout currentPage="Statistics">
      <div className="space-y-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Exams</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-green-600">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Average Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78.5%</div>
              <p className="text-xs text-green-600">+2.1% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">AI Accuracy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94.2%</div>
              <p className="text-xs text-green-600">+0.8% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Time Saved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156h</div>
              <p className="text-xs text-gray-500">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
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

          <Card>
            <CardHeader>
              <CardTitle>Question Performance</CardTitle>
              <CardDescription>Correct vs incorrect answers by question</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={questionPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="question" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="correct" fill="#10B981" />
                  <Bar dataKey="incorrect" fill="#EF4444" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Grading Trends</CardTitle>
              <CardDescription>Monthly exam volume and average scores</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={gradingTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Bar yAxisId="left" dataKey="exams" fill="#8884d8" />
                  <Line yAxisId="right" type="monotone" dataKey="avgScore" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Question Difficulty Analysis</CardTitle>
              <CardDescription>Performance breakdown by question difficulty</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {questionPerformance.map((q, index) => (
                <div key={q.question} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{q.question}</span>
                      <Badge
                        variant={
                          q.difficulty === "Easy" ? "default" : q.difficulty === "Medium" ? "secondary" : "destructive"
                        }
                      >
                        {q.difficulty}
                      </Badge>
                    </div>
                    <span className="text-sm text-gray-600">{q.correct}% correct</span>
                  </div>
                  <Progress value={q.correct} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Detailed Performance Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Exam Performance</CardTitle>
            <CardDescription>Detailed breakdown of recent exam results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Exam</th>
                    <th className="text-left p-2">Date</th>
                    <th className="text-left p-2">Students</th>
                    <th className="text-left p-2">Avg Score</th>
                    <th className="text-left p-2">Pass Rate</th>
                    <th className="text-left p-2">AI Accuracy</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-2">Mathematics Final</td>
                    <td className="p-2">2024-01-15</td>
                    <td className="p-2">45</td>
                    <td className="p-2">85.2%</td>
                    <td className="p-2">91%</td>
                    <td className="p-2">96%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">Physics Quiz</td>
                    <td className="p-2">2024-01-14</td>
                    <td className="p-2">32</td>
                    <td className="p-2">72.8%</td>
                    <td className="p-2">78%</td>
                    <td className="p-2">94%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">Chemistry Test</td>
                    <td className="p-2">2024-01-13</td>
                    <td className="p-2">28</td>
                    <td className="p-2">79.1%</td>
                    <td className="p-2">86%</td>
                    <td className="p-2">92%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
