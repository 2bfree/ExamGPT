"use client"

import type React from "react"

import { TopNavLayout } from "@/components/layout/top-nav-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ArrowLeft, Upload, FileText, ImageIcon, X, CalendarIcon, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useDropzone } from "react-dropzone"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface UploadedFile {
  file: File
  preview: string
  type: "exam" | "answer-key"
}

interface RubricCriterion {
  id: string
  description: string
  points: number
}

export default function AddAssignmentPage() {
  const router = useRouter()

  // Form state
  const [assignmentTitle, setAssignmentTitle] = useState("")
  const [subject, setSubject] = useState("")
  const [description, setDescription] = useState("")
  const [totalPoints, setTotalPoints] = useState("")
  const [dueDate, setDueDate] = useState<Date>()
  const [questionType, setQuestionType] = useState("")
  const [totalQuestions, setTotalQuestions] = useState("")
  const [passingGrade, setPassingGrade] = useState("")

  // File uploads
  const [examFiles, setExamFiles] = useState<UploadedFile[]>([])
  const [answerKeyFiles, setAnswerKeyFiles] = useState<UploadedFile[]>([])

  // Rubric
  const [rubricCriteria, setRubricCriteria] = useState<RubricCriterion[]>([
    { id: "1", description: "Correct methodology", points: 25 },
    { id: "2", description: "Accurate calculations", points: 25 },
    { id: "3", description: "Clear explanations", points: 25 },
    { id: "4", description: "Proper formatting", points: 25 },
  ])

  // Settings
  const [enableAIGrading, setEnableAIGrading] = useState(true)
  const [requireManualReview, setRequireManualReview] = useState(false)
  const [allowLateSubmissions, setAllowLateSubmissions] = useState(true)
  const [showScoresToStudents, setShowScoresToStudents] = useState(true)

  const handleBack = () => {
    router.push("/")
  }

  const onDropExam = (acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      type: "exam" as const,
    }))
    setExamFiles((prev) => [...prev, ...newFiles])
  }

  const onDropAnswerKey = (acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      type: "answer-key" as const,
    }))
    setAnswerKeyFiles((prev) => [...prev, ...newFiles])
  }

  const examDropzone = useDropzone({
    onDrop: onDropExam,
    accept: {
      "application/pdf": [".pdf"],
      "image/*": [".png", ".jpg", ".jpeg"],
    },
    multiple: true,
  })

  const answerKeyDropzone = useDropzone({
    onDrop: onDropAnswerKey,
    accept: {
      "application/pdf": [".pdf"],
      "image/*": [".png", ".jpg", ".jpeg"],
    },
    multiple: true,
  })

  const removeFile = (index: number, type: "exam" | "answer-key") => {
    if (type === "exam") {
      setExamFiles((prev) => prev.filter((_, i) => i !== index))
    } else {
      setAnswerKeyFiles((prev) => prev.filter((_, i) => i !== index))
    }
  }

  const addRubricCriterion = () => {
    const newCriterion: RubricCriterion = {
      id: Date.now().toString(),
      description: "",
      points: 0,
    }
    setRubricCriteria((prev) => [...prev, newCriterion])
  }

  const updateRubricCriterion = (id: string, field: "description" | "points", value: string | number) => {
    setRubricCriteria((prev) =>
      prev.map((criterion) => (criterion.id === id ? { ...criterion, [field]: value } : criterion)),
    )
  }

  const removeRubricCriterion = (id: string) => {
    setRubricCriteria((prev) => prev.filter((criterion) => criterion.id !== id))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Creating assignment...")
    // In a real app, this would submit the form data
    router.push("/")
  }

  const handleSaveDraft = () => {
    console.log("Saving as draft...")
    // In a real app, this would save the form as a draft
  }

  return (
    <TopNavLayout
      currentPage="Dashboard"
      title="Create New Assignment"
      subtitle="Set up a new assignment with AI-powered grading"
      addButtonText="Save Draft"
      onAddClick={handleSaveDraft}
      showSearch={false}
      showFilter={false}
    >
      <div className="space-y-6">
        {/* Back Button */}
        <Button variant="outline" onClick={handleBack} className="mb-4 bg-transparent">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Enter the basic details for your assignment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="assignment-title">Assignment Title *</Label>
                  <Input
                    id="assignment-title"
                    value={assignmentTitle}
                    onChange={(e) => setAssignmentTitle(e.target.value)}
                    placeholder="e.g., Calculus Final Exam"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Select value={subject} onValueChange={setSubject}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mathematics">Mathematics</SelectItem>
                      <SelectItem value="physics">Physics</SelectItem>
                      <SelectItem value="chemistry">Chemistry</SelectItem>
                      <SelectItem value="biology">Biology</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="history">History</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide additional details about the assignment..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="total-points">Total Points *</Label>
                  <Input
                    id="total-points"
                    type="number"
                    value={totalPoints}
                    onChange={(e) => setTotalPoints(e.target.value)}
                    placeholder="100"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="total-questions">Total Questions *</Label>
                  <Input
                    id="total-questions"
                    type="number"
                    value={totalQuestions}
                    onChange={(e) => setTotalQuestions(e.target.value)}
                    placeholder="10"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passing-grade">Passing Grade (%)</Label>
                  <Input
                    id="passing-grade"
                    type="number"
                    value={passingGrade}
                    onChange={(e) => setPassingGrade(e.target.value)}
                    placeholder="70"
                    min="0"
                    max="100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="question-type">Question Type *</Label>
                  <Select value={questionType} onValueChange={setQuestionType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select question type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                      <SelectItem value="true-false">True/False</SelectItem>
                      <SelectItem value="short-answer">Short Answer</SelectItem>
                      <SelectItem value="essay">Essay</SelectItem>
                      <SelectItem value="mixed">Mixed Types</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Due Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !dueDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dueDate ? format(dueDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={dueDate} onSelect={setDueDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* File Uploads */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Upload Files</CardTitle>
              <CardDescription>Upload exam papers and answer keys for AI grading</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Exam Papers Upload */}
              <div className="space-y-4">
                <Label>Exam Papers *</Label>
                <div
                  {...examDropzone.getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                    examDropzone.isDragActive ? "border-blue-400 bg-blue-50" : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <input {...examDropzone.getInputProps()} />
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-lg font-medium text-gray-900 mb-2">Drop exam papers here, or click to browse</p>
                  <p className="text-sm text-gray-500">Supports PDF and image files (PNG, JPG, JPEG)</p>
                </div>

                {examFiles.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {examFiles.map((file, index) => (
                      <div key={index} className="flex items-center p-3 border rounded-lg">
                        {file.file.type.startsWith("image/") ? (
                          <ImageIcon className="h-8 w-8 text-blue-500 mr-3" />
                        ) : (
                          <FileText className="h-8 w-8 text-red-500 mr-3" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{file.file.name}</p>
                          <p className="text-xs text-gray-500">{(file.file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(index, "exam")}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Answer Key Upload */}
              <div className="space-y-4">
                <Label>Answer Key *</Label>
                <div
                  {...answerKeyDropzone.getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                    answerKeyDropzone.isDragActive
                      ? "border-green-400 bg-green-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <input {...answerKeyDropzone.getInputProps()} />
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-lg font-medium text-gray-900 mb-2">Drop answer key here, or click to browse</p>
                  <p className="text-sm text-gray-500">Supports PDF and image files (PNG, JPG, JPEG)</p>
                </div>

                {answerKeyFiles.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {answerKeyFiles.map((file, index) => (
                      <div key={index} className="flex items-center p-3 border rounded-lg">
                        {file.file.type.startsWith("image/") ? (
                          <ImageIcon className="h-8 w-8 text-blue-500 mr-3" />
                        ) : (
                          <FileText className="h-8 w-8 text-red-500 mr-3" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{file.file.name}</p>
                          <p className="text-xs text-gray-500">{(file.file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(index, "answer-key")}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Grading Rubric */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Grading Rubric</CardTitle>
              <CardDescription>Define the criteria and point distribution for grading</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {rubricCriteria.map((criterion, index) => (
                <div key={criterion.id} className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="flex-1">
                    <Input
                      value={criterion.description}
                      onChange={(e) => updateRubricCriterion(criterion.id, "description", e.target.value)}
                      placeholder="Enter grading criterion..."
                    />
                  </div>
                  <div className="w-24">
                    <Input
                      type="number"
                      value={criterion.points}
                      onChange={(e) =>
                        updateRubricCriterion(criterion.id, "points", Number.parseInt(e.target.value) || 0)
                      }
                      placeholder="Points"
                      min="0"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeRubricCriterion(criterion.id)}
                    disabled={rubricCriteria.length === 1}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              <Button type="button" variant="outline" onClick={addRubricCriterion} className="w-full bg-transparent">
                <Plus className="h-4 w-4 mr-2" />
                Add Criterion
              </Button>

              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">Total Points:</span>
                  <Badge variant="secondary" className="text-lg">
                    {rubricCriteria.reduce((sum, criterion) => sum + criterion.points, 0)} pts
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Grading Settings */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>AI Grading Settings</CardTitle>
              <CardDescription>Configure how AI will grade this assignment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="enable-ai-grading" checked={enableAIGrading} onCheckedChange={setEnableAIGrading} />
                  <Label htmlFor="enable-ai-grading" className="font-medium">
                    Enable AI Grading
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="require-manual-review"
                    checked={requireManualReview}
                    onCheckedChange={setRequireManualReview}
                  />
                  <Label htmlFor="require-manual-review">Require manual review for all AI-graded submissions</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="allow-late-submissions"
                    checked={allowLateSubmissions}
                    onCheckedChange={setAllowLateSubmissions}
                  />
                  <Label htmlFor="allow-late-submissions">Allow late submissions</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="show-scores-to-students"
                    checked={showScoresToStudents}
                    onCheckedChange={setShowScoresToStudents}
                  />
                  <Label htmlFor="show-scores-to-students">Show scores to students immediately after grading</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-6">
            <Button type="button" variant="outline" onClick={handleSaveDraft}>
              Save as Draft
            </Button>
            <Button
              type="submit"
              disabled={!assignmentTitle || !subject || examFiles.length === 0 || answerKeyFiles.length === 0}
              className="bg-gray-900 hover:bg-gray-800"
            >
              Create Assignment
            </Button>
          </div>
        </form>
      </div>
    </TopNavLayout>
  )
}
