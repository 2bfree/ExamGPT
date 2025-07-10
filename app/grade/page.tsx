"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, AlertCircle, Eye, MessageSquare, ThumbsUp, ThumbsDown } from "lucide-react"

interface Question {
  id: number
  number: number
  type: "multiple-choice" | "true-false" | "short-answer"
  studentAnswer: string
  correctAnswer: string
  isCorrect: boolean
  points: number
  maxPoints: number
  aiConfidence: number
  feedback: string
  aiSuggestion?: string
}

const mockQuestions: Question[] = [
  {
    id: 1,
    number: 1,
    type: "multiple-choice",
    studentAnswer: "B",
    correctAnswer: "B",
    isCorrect: true,
    points: 2,
    maxPoints: 2,
    aiConfidence: 95,
    feedback: "Correct! The student properly identified the inductive step.",
  },
  {
    id: 2,
    number: 2,
    type: "short-answer",
    studentAnswer: "n = 2k + 1, k ∈ Z",
    correctAnswer: "n = 2k + 1 where k is an integer",
    isCorrect: true,
    points: 3,
    maxPoints: 3,
    aiConfidence: 88,
    feedback: "Correct mathematical notation and understanding.",
  },
  {
    id: 3,
    number: 3,
    type: "short-answer",
    studentAnswer: "Didn't consider n = 1",
    correctAnswer: "Must verify base case n = 1",
    isCorrect: false,
    points: 1,
    maxPoints: 4,
    aiConfidence: 92,
    feedback: "Partial credit. Student identified the issue but didn't provide complete explanation.",
    aiSuggestion: "Consider giving partial credit for recognizing the missing base case verification.",
  },
]

export default function GradePage() {
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(mockQuestions[0])
  const [customFeedback, setCustomFeedback] = useState("")
  const [showAISuggestions, setShowAISuggestions] = useState(true)

  const totalPoints = mockQuestions.reduce((sum, q) => sum + q.points, 0)
  const maxTotalPoints = mockQuestions.reduce((sum, q) => sum + q.maxPoints, 0)
  const percentage = Math.round((totalPoints / maxTotalPoints) * 100)

  const handleApproveGrade = (questionId: number) => {
    console.log(`Approved grade for question ${questionId}`)
  }

  const handleRejectGrade = (questionId: number) => {
    console.log(`Rejected grade for question ${questionId}`)
  }

  return (
    <MainLayout currentPage="Grade Exams">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Question List */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Mathematics Final</span>
                <Badge variant="secondary">{percentage}%</Badge>
              </CardTitle>
              <CardDescription>
                Student: John Doe • {totalPoints}/{maxTotalPoints} points
              </CardDescription>
              <Progress value={percentage} className="w-full" />
            </CardHeader>
          </Card>

          <Card className="flex-1">
            <CardHeader>
              <CardTitle className="text-lg">Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 max-h-96 overflow-y-auto">
              {mockQuestions.map((question) => (
                <div
                  key={question.id}
                  onClick={() => setSelectedQuestion(question)}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedQuestion?.id === question.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Q{question.number}</span>
                      {question.isCorrect ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {question.points}/{question.maxPoints}
                      </div>
                      <div className="text-xs text-gray-500">{question.aiConfidence}% confidence</div>
                    </div>
                  </div>
                  <div className="mt-1 text-xs text-gray-600 capitalize">{question.type.replace("-", " ")}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Exam Paper View */}
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Exam Paper
              </CardTitle>
            </CardHeader>
            <CardContent className="h-full">
              <div className="bg-gray-100 rounded-lg p-4 h-full flex items-center justify-center">
                <img
                  src="/images/grading-interface-reference.png"
                  alt="Exam paper"
                  className="max-w-full max-h-full object-contain rounded"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Grading Panel */}
        <div className="lg:col-span-1 space-y-4">
          {selectedQuestion && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Question {selectedQuestion.number}</span>
                    <Badge variant={selectedQuestion.isCorrect ? "default" : "destructive"}>
                      {selectedQuestion.points}/{selectedQuestion.maxPoints} pts
                    </Badge>
                  </CardTitle>
                  <CardDescription className="capitalize">
                    {selectedQuestion.type.replace("-", " ")} • {selectedQuestion.aiConfidence}% AI Confidence
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm text-gray-700 mb-2">Student Answer:</h4>
                    <div className="p-3 bg-gray-50 rounded border text-sm">{selectedQuestion.studentAnswer}</div>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm text-gray-700 mb-2">Correct Answer:</h4>
                    <div className="p-3 bg-green-50 rounded border text-sm">{selectedQuestion.correctAnswer}</div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => handleApproveGrade(selectedQuestion.id)}
                    >
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => handleRejectGrade(selectedQuestion.id)}
                    >
                      <ThumbsDown className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    AI Feedback
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-blue-50 rounded border text-sm">{selectedQuestion.feedback}</div>

                  {selectedQuestion.aiSuggestion && (
                    <div className="p-3 bg-yellow-50 rounded border">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                        <div>
                          <h5 className="font-medium text-sm text-yellow-800 mb-1">AI Suggestion:</h5>
                          <p className="text-sm text-yellow-700">{selectedQuestion.aiSuggestion}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Add Custom Feedback:</label>
                    <Textarea
                      value={customFeedback}
                      onChange={(e) => setCustomFeedback(e.target.value)}
                      placeholder="Add your own feedback for the student..."
                      rows={3}
                    />
                  </div>

                  <Button className="w-full">Save Feedback</Button>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </MainLayout>
  )
}
