"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, FileText, ImageIcon, X } from "lucide-react"
import { useDropzone } from "react-dropzone"

interface UploadedFile {
  file: File
  preview: string
  type: "exam" | "answer-key"
}

export default function UploadPage() {
  const [examFiles, setExamFiles] = useState<UploadedFile[]>([])
  const [answerKeyFiles, setAnswerKeyFiles] = useState<UploadedFile[]>([])
  const [examTitle, setExamTitle] = useState("")
  const [examDescription, setExamDescription] = useState("")
  const [questionType, setQuestionType] = useState("")
  const [totalQuestions, setTotalQuestions] = useState("")

  const onDropExam = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      type: "exam" as const,
    }))
    setExamFiles((prev) => [...prev, ...newFiles])
  }, [])

  const onDropAnswerKey = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      type: "answer-key" as const,
    }))
    setAnswerKeyFiles((prev) => [...prev, ...newFiles])
  }, [])

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Submitting exam for grading...")
  }

  return (
    <MainLayout currentPage="Upload Exam">
      <div className="max-w-4xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Upload Exam for AI Grading</CardTitle>
            <CardDescription>Upload exam papers and answer keys to get started with automated grading</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Exam Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="exam-title">Exam Title</Label>
                  <Input
                    id="exam-title"
                    value={examTitle}
                    onChange={(e) => setExamTitle(e.target.value)}
                    placeholder="e.g., Mathematics Final Exam"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="total-questions">Total Questions</Label>
                  <Input
                    id="total-questions"
                    type="number"
                    value={totalQuestions}
                    onChange={(e) => setTotalQuestions(e.target.value)}
                    placeholder="e.g., 25"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="question-type">Question Type</Label>
                <Select value={questionType} onValueChange={setQuestionType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select question type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                    <SelectItem value="true-false">True/False</SelectItem>
                    <SelectItem value="short-answer">Short Answer</SelectItem>
                    <SelectItem value="mixed">Mixed Types</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="exam-description">Description (Optional)</Label>
                <Textarea
                  id="exam-description"
                  value={examDescription}
                  onChange={(e) => setExamDescription(e.target.value)}
                  placeholder="Additional details about the exam..."
                  rows={3}
                />
              </div>

              {/* Exam Papers Upload */}
              <div className="space-y-4">
                <Label>Exam Papers</Label>
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
                <Label>Answer Key</Label>
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

              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline">
                  Save as Draft
                </Button>
                <Button type="submit" disabled={examFiles.length === 0 || answerKeyFiles.length === 0}>
                  Start AI Grading
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
