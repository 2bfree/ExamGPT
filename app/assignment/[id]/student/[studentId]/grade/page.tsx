"use client"

import { TopNavLayout } from "@/components/layout/top-nav-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ArrowLeft, FileText, Edit, Check, Download, Eye } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"

interface RubricItem {
  id: string
  text: string
  points: number
  checked: boolean
  type: "positive" | "negative"
}

const mockRubricItems: RubricItem[] = [
  {
    id: "1",
    text: "Fully Correct",
    points: -1,
    checked: false,
    type: "positive",
  },
  {
    id: "2",
    text: "Fully Incorrect",
    points: -1,
    checked: false,
    type: "negative",
  },
  {
    id: "3",
    text: "Didn't consider n = 1",
    points: -2,
    checked: false,
    type: "negative",
  },
  {
    id: "4",
    text: "Didn't consider odd case",
    points: -2,
    checked: true,
    type: "negative",
  },
  {
    id: "5",
    text: "Didn't apply inductive hypothesis to n-1 and identify addition by 1 = 2^1 (odd case)",
    points: -2,
    checked: true,
    type: "negative",
  },
]

const studentAnswer = `Case 1: n is Odd:
n = 2k + 1, k ∈ Z
then n + 1 = 2(k + 1)
If n is odd then n is the sum of n - 1 as a sum of powers of 2 plus 2^0 = 1, for every odd n we must have 2^0 = 1 in the sum

Thus P(n+1) holds then n + 1 = n - 1 this can be either 2 or replacing 2^1 with 2^0 or replacing 1 = 2^0 with 2^1

Case 2: n is even
then n (the sum of powers of 2) = n, there is no 2^0 since for i > 0, 2^i is even and the sum of`

export default function AIGradingPage() {
  const params = useParams()
  const router = useRouter()
  const assignmentId = params.id as string
  const studentId = params.studentId as string

  const [rubricItems, setRubricItems] = useState(mockRubricItems)
  const [feedback, setFeedback] = useState(
    "For the case where n+1 is even, try writing n+1 = 2k and applying the inductive hypothesis to k.",
  )

  const handleBack = () => {
    router.push(`/assignment/${assignmentId}/students`)
  }

  const handleRubricChange = (id: string, checked: boolean) => {
    setRubricItems((items) => items.map((item) => (item.id === id ? { ...item, checked } : item)))
  }

  const totalDeductions = rubricItems
    .filter((item) => item.checked && item.type === "negative")
    .reduce((sum, item) => sum + Math.abs(item.points), 0)

  const finalScore = Math.max(0, 74 - totalDeductions)

  const handleNavigation = (direction: string) => {
    console.log(`Navigate to ${direction}`)
  }

  const handleApproveGrade = () => {
    console.log("Grade approved")
  }

  const handleExportResults = () => {
    console.log("Exporting results")
  }

  return (
    <TopNavLayout
      currentPage="Dashboard"
      title="AI Assignment Grading"
      subtitle="Alice Johnson • STU001 • Calculus Final Exam"
      addButtonText="Export Grade"
      showSearch={false}
      showFilter={false}
    >
      <div className="space-y-6">
        {/* Back Button */}
        <Button variant="outline" onClick={handleBack} className="mb-4 bg-transparent">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Students
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Exam Paper */}
          <div className="space-y-4">
            {/* Transcription Badge with View Button */}
            <div className="flex items-center justify-between mb-4">
              <Badge className="bg-green-100 text-green-800">1. Transcription</Badge>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="bg-transparent">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh]">
                  <DialogHeader>
                    <DialogTitle>Original Exam Paper</DialogTitle>
                  </DialogHeader>
                  <div className="flex justify-center p-4">
                    <img
                      src="/images/ai-grading-interface.png"
                      alt="Original exam paper"
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Exam Paper Image */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="bg-gray-100 rounded-lg p-4 min-h-96 flex items-center justify-center">
                  <img
                    src="/images/ai-grading-interface.png"
                    alt="Student exam paper"
                    className="max-w-full max-h-full object-contain rounded"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Student Answer */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Student Answer:</h3>
                <div className="bg-gray-50 rounded-lg p-4 text-sm leading-relaxed whitespace-pre-line">
                  {studentAnswer}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - AI Grading */}
          <div className="space-y-4">
            {/* AI Grade */}
            <div className="flex items-center justify-between mb-4">
              <Badge className="bg-blue-100 text-blue-800">2. AI Grade</Badge>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{finalScore}.0 / 74.0</div>
              </div>
            </div>

            {/* Attempted and High Confidence */}
            <div className="flex gap-4 text-sm text-gray-600 mb-4">
              <span>Attempted</span>
              <span>High Confidence</span>
            </div>

            {/* AI Confidence */}
            <div className="mb-6">
              <Badge className="bg-green-100 text-green-800 mb-3">3. AI Confidence</Badge>
              <Progress value={85} className="w-full h-2" />
            </div>

            {/* Rubric */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900">Submission-Specific Rubric Items</h3>
                <Button variant="ghost" size="sm" className="text-gray-600">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit rubric
                </Button>
              </div>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="max-h-64 overflow-y-auto pr-2">
                    <div className="space-y-3">
                      {rubricItems.map((item) => (
                        <div key={item.id} className="flex items-start gap-3">
                          <Checkbox
                            checked={item.checked}
                            onCheckedChange={(checked) => handleRubricChange(item.id, checked as boolean)}
                            className="mt-1"
                          />
                          <div className="flex items-start gap-2 flex-1">
                            <Badge variant="destructive" className="bg-red-500 text-white text-xs shrink-0">
                              {item.points > 0 ? `+${item.points}` : item.points} pts
                            </Badge>
                            <span className="text-sm text-gray-900 leading-relaxed">{item.text}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t">
                    <Button variant="ghost" size="sm" className="w-full text-gray-600">
                      + Add rubric item
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AI Feedback */}
            <div className="mt-6">
              <Badge className="bg-purple-100 text-purple-800 mb-4">4. AI Feedback</Badge>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <h3 className="font-medium text-gray-900 mb-3">Suggested Comment:</h3>
                  <Textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="min-h-24 text-sm mb-4"
                    placeholder="Add feedback for the student..."
                  />

                  {/* Action Buttons */}
                  <div className="flex gap-3 mb-4">
                    <Button variant="outline" className="bg-gray-900 text-white hover:bg-gray-800">
                      <FileText className="h-4 w-4 mr-2" />
                      Report
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      Approve and Export
                    </Button>
                  </div>

                  <p className="text-sm text-gray-500">
                    Write comments for the student manually, or generate comments using the Generate Comment button.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* AI Summary */}
            <div className="mt-6">
              <Badge className="bg-yellow-100 text-yellow-800 mb-4">5. AI Summary</Badge>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Notes for the Reviewer</h3>
                      <p className="text-sm text-gray-500 mb-3">Not shown to students</p>

                      <div className="space-y-3">
                        <div>
                          <h4 className="font-medium text-sm text-gray-900 mb-2">High-Level Summary:</h4>
                          <p className="text-sm text-gray-700 leading-relaxed">
                            The student correctly proved the case where n + 1 is odd by applying the inductive
                            hypothesis to n and adding 2^0. However, for the case where n + 1 is even, the student's
                            proof is incorrect. After writing n + 1 = 2(k + 1), the student failed to apply the
                            inductive hypothesis to k = 1 and provided an incoherent argument that did not explain why
                            the resulting powers of 2 would be distinct.
                          </p>
                        </div>

                        <div>
                          <h4 className="font-medium text-sm text-gray-900 mb-2">Detailed Summary:</h4>
                          <p className="text-sm text-gray-600">[Additional detailed analysis would appear here...]</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-wrap gap-2 pt-4">
              <Button variant="outline" size="sm" onClick={() => handleNavigation("mark-reviewed")}>
                Mark as reviewed
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleNavigation("previous-unreviewed")}>
                Previous unreviewed
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleNavigation("previous")}>
                Previous
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleNavigation("next")}>
                Next
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleNavigation("next-unreviewed")}>
                Next unreviewed
              </Button>
            </div>

            {/* Final Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button onClick={handleApproveGrade} className="flex-1 bg-gray-900 hover:bg-gray-800">
                <Check className="h-4 w-4 mr-2" />
                Approve Grade
              </Button>
              <Button variant="outline" onClick={handleExportResults} className="bg-transparent">
                <Download className="h-4 w-4 mr-2" />
                Export Results
              </Button>
            </div>
          </div>
        </div>
      </div>
    </TopNavLayout>
  )
}
