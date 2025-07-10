"use client"

import { TopNavLayout } from "@/components/layout/top-nav-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Clock,
  Users,
  BookOpen,
  Target,
  Lightbulb,
  Heart,
  TrendingUp,
  Award,
  Coffee,
  Zap,
  CheckCircle,
  ArrowRight,
} from "lucide-react"

const milestones = [
  {
    year: "2019",
    title: "The Problem Discovered",
    description:
      "As a mathematics professor, I was spending 15+ hours every weekend grading exams, leaving little time for family and research.",
    icon: Clock,
    color: "text-red-600",
    bgColor: "bg-red-50",
  },
  {
    year: "2020",
    title: "The Pandemic Catalyst",
    description:
      "COVID-19 forced remote learning, increasing grading workload by 300%. I knew there had to be a better way.",
    icon: TrendingUp,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    year: "2021",
    title: "First AI Experiment",
    description:
      "Built a simple AI model to grade multiple-choice questions. It worked, but I wanted more - full exam grading.",
    icon: Lightbulb,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
  },
  {
    year: "2022",
    title: "The Breakthrough",
    description: "Developed advanced OCR + AI that could understand handwritten math solutions. Accuracy reached 94%.",
    icon: Zap,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    year: "2023",
    title: "Beta Testing Success",
    description:
      "50 professors tested the system. Average grading time reduced from 4 hours to 30 minutes per exam set.",
    icon: Users,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    year: "2024",
    title: "ExamGrader AI Launch",
    description:
      "Officially launched to help educators worldwide reclaim their time and focus on what matters most - teaching.",
    icon: Award,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
]

const stats = [
  { label: "Hours Saved Weekly", value: "15+", icon: Clock },
  { label: "Grading Accuracy", value: "94%", icon: Target },
  { label: "Teachers Helped", value: "500+", icon: Users },
  { label: "Exams Graded", value: "10K+", icon: BookOpen },
]

const testimonials = [
  {
    name: "Dr. Sarah Chen",
    role: "Mathematics Professor, MIT",
    avatar: "SC",
    quote:
      "ExamGrader AI gave me my weekends back. I can now spend quality time with my family while maintaining high grading standards.",
  },
  {
    name: "Prof. Michael Rodriguez",
    role: "Physics Department, Stanford",
    avatar: "MR",
    quote:
      "The accuracy is incredible. It catches mistakes I might miss when grading 200+ exams. My students get better, more consistent feedback.",
  },
  {
    name: "Dr. Emily Watson",
    role: "Chemistry Professor, Harvard",
    avatar: "EW",
    quote:
      "This tool transformed my teaching. I now have time to create better course materials and provide more personalized student support.",
  },
]

export default function StoryPage() {
  const handleGetStarted = () => {
    window.location.href = "/pricing"
  }

  const handleContactUs = () => {
    console.log("Contact us clicked")
  }

  return (
    <TopNavLayout
      currentPage="Story"
      title="Our Story"
      subtitle="Why we built ExamGrader AI and how it's transforming education"
      addButtonText="Get Started"
      onAddClick={handleGetStarted}
      showSearch={false}
      showFilter={false}
    >
      <div className="space-y-12">
        {/* Hero Section */}
        <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-50 to-purple-50">
          <CardContent className="p-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-blue-100">
                <Heart className="h-12 w-12 text-blue-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">From Burnout to Breakthrough</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              ExamGrader AI was born from a simple frustration: spending more time grading than teaching. What started
              as a personal solution became a mission to help educators worldwide reclaim their passion for teaching.
            </p>
            <div className="flex justify-center space-x-4">
              <Button onClick={handleGetStarted} className="bg-blue-600 hover:bg-blue-700">
                Try It Free
              </Button>
              <Button variant="outline" onClick={handleContactUs} className="bg-transparent">
                Contact Us
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Founder Section */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center mb-6">
                  <Avatar className="h-16 w-16 mr-4">
                    <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Founder" />
                    <AvatarFallback className="text-lg bg-blue-100 text-blue-600">JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Dr. John Davis</h3>
                    <p className="text-gray-600">Founder & CEO</p>
                    <p className="text-sm text-gray-500">Professor of Mathematics, 15+ years</p>
                  </div>
                </div>
                <blockquote className="text-lg text-gray-700 italic mb-4">
                  "I became a professor to inspire students and advance knowledge, not to spend my entire weekend
                  grading papers. When I realized I was working 70+ hour weeks just to keep up with grading, I knew
                  something had to change."
                </blockquote>
                <p className="text-gray-600">
                  After years of research in machine learning and education technology, Dr. Davis created ExamGrader AI
                  to solve the grading crisis facing educators worldwide.
                </p>
              </div>
              <div className="bg-gray-100 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4">The Numbers That Started It All</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hours spent grading per week:</span>
                    <span className="font-bold text-red-600">15-20 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Weekend time with family:</span>
                    <span className="font-bold text-red-600">Almost none</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Grading consistency:</span>
                    <span className="font-bold text-red-600">Declining</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Job satisfaction:</span>
                    <span className="font-bold text-red-600">At all-time low</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-center">The Journey</CardTitle>
            <CardDescription className="text-center">
              From problem to solution - the 5-year journey to create ExamGrader AI
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-8">
              {milestones.map((milestone, index) => {
                const Icon = milestone.icon
                return (
                  <div key={milestone.year} className="flex items-start">
                    <div className="flex flex-col items-center mr-6">
                      <div className={`p-3 rounded-full ${milestone.bgColor} mb-2`}>
                        <Icon className={`h-6 w-6 ${milestone.color}`} />
                      </div>
                      <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                        {milestone.year}
                      </Badge>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Impact Stats */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-center">Our Impact Today</CardTitle>
            <CardDescription className="text-center">
              Real numbers from real educators using ExamGrader AI
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat) => {
                const Icon = stat.icon
                return (
                  <div key={stat.label} className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 rounded-lg bg-blue-50">
                        <Icon className="h-8 w-8 text-blue-600" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Testimonials */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-center">What Educators Say</CardTitle>
            <CardDescription className="text-center">Stories from professors who got their time back</CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div key={testimonial.name} className="text-center">
                  <Avatar className="h-16 w-16 mx-auto mb-4">
                    <AvatarImage src={`/placeholder.svg?height=64&width=64`} alt={testimonial.name} />
                    <AvatarFallback className="text-lg bg-blue-100 text-blue-600">{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <blockquote className="text-gray-700 italic mb-4">"{testimonial.quote}"</blockquote>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Mission Statement */}
        <Card className="border-0 shadow-sm bg-gradient-to-r from-green-50 to-blue-50">
          <CardContent className="p-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-green-100">
                <Target className="h-12 w-12 text-green-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
              To empower educators worldwide by eliminating the grading burden, allowing them to focus on what they do
              best: inspiring students, creating engaging content, and advancing knowledge. We believe teachers should
              teach, not grade.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900 mb-1">Accurate</h4>
                <p className="text-sm text-gray-600">94%+ accuracy with continuous improvement</p>
              </div>
              <div className="text-center">
                <Coffee className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900 mb-1">Time-Saving</h4>
                <p className="text-sm text-gray-600">Reduce grading time by 90%</p>
              </div>
              <div className="text-center">
                <Heart className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900 mb-1">Educator-First</h4>
                <p className="text-sm text-gray-600">Built by teachers, for teachers</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="border-0 shadow-sm bg-gray-900 text-white">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Reclaim Your Time?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join hundreds of educators who have already transformed their teaching experience with ExamGrader AI.
            </p>
            <div className="flex justify-center space-x-4">
              <Button onClick={handleGetStarted} className="bg-blue-600 hover:bg-blue-700">
                Start Free Trial
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button
                variant="outline"
                onClick={handleContactUs}
                className="border-gray-600 text-white hover:bg-gray-800 bg-transparent"
              >
                Schedule Demo
              </Button>
            </div>
            <p className="text-sm text-gray-400 mt-4">No credit card required • 14-day free trial • Cancel anytime</p>
          </CardContent>
        </Card>
      </div>
    </TopNavLayout>
  )
}
