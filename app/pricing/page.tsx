"use client"

import { TopNavLayout } from "@/components/layout/top-nav-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Check, X, Star, Zap, Crown, Headphones } from "lucide-react"
import { useState } from "react"

interface PricingFeature {
  name: string
  free: boolean | string
  basic: boolean | string
  premium: boolean | string
}

const pricingFeatures: PricingFeature[] = [
  {
    name: "AI Grading",
    free: "10 exams/month",
    basic: "100 exams/month",
    premium: "Unlimited",
  },
  {
    name: "Assignment Management",
    free: true,
    basic: true,
    premium: true,
  },
  {
    name: "Student Analytics",
    free: "Basic",
    basic: "Advanced",
    premium: "Advanced + Custom Reports",
  },
  {
    name: "File Upload Size",
    free: "5MB per file",
    basic: "25MB per file",
    premium: "100MB per file",
  },
  {
    name: "Bulk Operations",
    free: false,
    basic: true,
    premium: true,
  },
  {
    name: "Custom Rubrics",
    free: "3 rubrics",
    basic: "25 rubrics",
    premium: "Unlimited",
  },
  {
    name: "Export Options",
    free: "PDF only",
    basic: "PDF, Excel, CSV",
    premium: "All formats + API",
  },
  {
    name: "AI Confidence Threshold",
    free: false,
    basic: true,
    premium: true,
  },
  {
    name: "Manual Review Queue",
    free: false,
    basic: true,
    premium: true,
  },
  {
    name: "Team Collaboration",
    free: false,
    basic: "Up to 3 users",
    premium: "Unlimited users",
  },
  {
    name: "Priority Support",
    free: false,
    basic: "Email support",
    premium: "24/7 Phone + Email",
  },
  {
    name: "Data Retention",
    free: "30 days",
    basic: "1 year",
    premium: "Unlimited",
  },
  {
    name: "API Access",
    free: false,
    basic: false,
    premium: true,
  },
  {
    name: "White-label Options",
    free: false,
    basic: false,
    premium: true,
  },
]

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false)
  const [currentPlan, setCurrentPlan] = useState("free") // Current user's plan

  const plans = [
    {
      id: "free",
      name: "Free",
      icon: Star,
      price: { monthly: 0, annual: 0 },
      description: "Perfect for trying out AI grading",
      color: "text-gray-600",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
      buttonColor: "bg-gray-900 hover:bg-gray-800",
      popular: false,
    },
    {
      id: "basic",
      name: "Basic",
      icon: Zap,
      price: { monthly: 29, annual: 290 },
      description: "Great for individual teachers",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
      popular: true,
    },
    {
      id: "premium",
      name: "Premium",
      icon: Crown,
      price: { monthly: 79, annual: 790 },
      description: "Best for schools and departments",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      buttonColor: "bg-purple-600 hover:bg-purple-700",
      popular: false,
    },
  ]

  const handlePlanSelect = (planId: string) => {
    console.log(`Selected plan: ${planId}`)
    // In a real app, this would handle plan selection/upgrade
  }

  const handleContactSales = () => {
    console.log("Contact sales clicked")
  }

  const renderFeatureValue = (value: boolean | string) => {
    if (typeof value === "boolean") {
      return value ? <Check className="h-5 w-5 text-green-500" /> : <X className="h-5 w-5 text-gray-300" />
    }
    return <span className="text-sm text-gray-700">{value}</span>
  }

  return (
    <TopNavLayout
      currentPage="Pricing"
      title="Choose Your Plan"
      subtitle="Select the perfect plan for your AI grading needs"
      addButtonText="Contact Sales"
      onAddClick={handleContactSales}
      showSearch={false}
      showFilter={false}
    >
      <div className="space-y-8">
        {/* Billing Toggle */}
        <div className="flex items-center justify-center space-x-4">
          <Label htmlFor="billing-toggle" className={`text-sm ${!isAnnual ? "font-medium" : ""}`}>
            Monthly
          </Label>
          <Switch id="billing-toggle" checked={isAnnual} onCheckedChange={setIsAnnual} />
          <Label htmlFor="billing-toggle" className={`text-sm ${isAnnual ? "font-medium" : ""}`}>
            Annual
            <Badge variant="secondary" className="ml-2 bg-green-100 text-green-800">
              Save 17%
            </Badge>
          </Label>
        </div>

        {/* Current Plan Badge */}
        {currentPlan && (
          <div className="text-center">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Current Plan: {plans.find((p) => p.id === currentPlan)?.name}
            </Badge>
          </div>
        )}

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => {
            const PlanIcon = plan.icon
            const price = isAnnual ? plan.price.annual : plan.price.monthly
            const isCurrentPlan = currentPlan === plan.id

            return (
              <Card
                key={plan.id}
                className={`relative border-2 ${plan.borderColor} ${plan.popular ? "ring-2 ring-blue-500 ring-opacity-50" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white">Most Popular</Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div className={`inline-flex p-3 rounded-lg ${plan.bgColor} mb-4`}>
                    <PlanIcon className={`h-8 w-8 ${plan.color}`} />
                  </div>
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <CardDescription className="text-gray-600">{plan.description}</CardDescription>
                  <div className="mt-4">
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-gray-900">${price}</span>
                      {price > 0 && <span className="text-gray-500 ml-1">/{isAnnual ? "year" : "month"}</span>}
                    </div>
                    {isAnnual && price > 0 && (
                      <p className="text-sm text-gray-500 mt-1">${Math.round(price / 12)}/month billed annually</p>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Key Features */}
                  <div className="space-y-3">
                    {plan.id === "free" && (
                      <>
                        <div className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-3" />
                          <span className="text-sm">10 AI gradings per month</span>
                        </div>
                        <div className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-3" />
                          <span className="text-sm">Basic analytics</span>
                        </div>
                        <div className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-3" />
                          <span className="text-sm">3 custom rubrics</span>
                        </div>
                        <div className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-3" />
                          <span className="text-sm">Email support</span>
                        </div>
                      </>
                    )}

                    {plan.id === "basic" && (
                      <>
                        <div className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-3" />
                          <span className="text-sm">100 AI gradings per month</span>
                        </div>
                        <div className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-3" />
                          <span className="text-sm">Advanced analytics</span>
                        </div>
                        <div className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-3" />
                          <span className="text-sm">25 custom rubrics</span>
                        </div>
                        <div className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-3" />
                          <span className="text-sm">Team collaboration (3 users)</span>
                        </div>
                        <div className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-3" />
                          <span className="text-sm">Priority email support</span>
                        </div>
                      </>
                    )}

                    {plan.id === "premium" && (
                      <>
                        <div className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-3" />
                          <span className="text-sm">Unlimited AI gradings</span>
                        </div>
                        <div className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-3" />
                          <span className="text-sm">Custom reports & analytics</span>
                        </div>
                        <div className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-3" />
                          <span className="text-sm">Unlimited rubrics</span>
                        </div>
                        <div className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-3" />
                          <span className="text-sm">Unlimited team members</span>
                        </div>
                        <div className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-3" />
                          <span className="text-sm">24/7 phone & email support</span>
                        </div>
                        <div className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-3" />
                          <span className="text-sm">API access</span>
                        </div>
                      </>
                    )}
                  </div>

                  <Button
                    className={`w-full ${plan.buttonColor} ${isCurrentPlan ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={() => handlePlanSelect(plan.id)}
                    disabled={isCurrentPlan}
                  >
                    {isCurrentPlan ? "Current Plan" : plan.id === "free" ? "Get Started" : "Upgrade Now"}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Feature Comparison Table */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Feature Comparison</CardTitle>
            <CardDescription>Compare all features across our plans</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-medium text-gray-900">Features</th>
                    <th className="text-center p-4 font-medium text-gray-900">Free</th>
                    <th className="text-center p-4 font-medium text-gray-900">Basic</th>
                    <th className="text-center p-4 font-medium text-gray-900">Premium</th>
                  </tr>
                </thead>
                <tbody>
                  {pricingFeatures.map((feature, index) => (
                    <tr key={feature.name} className={`border-b ${index % 2 === 0 ? "bg-gray-50/50" : "bg-white"}`}>
                      <td className="p-4 font-medium text-gray-900">{feature.name}</td>
                      <td className="p-4 text-center">{renderFeatureValue(feature.free)}</td>
                      <td className="p-4 text-center">{renderFeatureValue(feature.basic)}</td>
                      <td className="p-4 text-center">{renderFeatureValue(feature.premium)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Can I change my plan anytime?</h4>
              <p className="text-gray-600 text-sm">
                Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing
                cycle.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">What happens if I exceed my monthly limit?</h4>
              <p className="text-gray-600 text-sm">
                If you exceed your monthly AI grading limit, you'll be prompted to upgrade your plan or wait until the
                next billing cycle.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Is there a free trial for paid plans?</h4>
              <p className="text-gray-600 text-sm">
                Yes, we offer a 14-day free trial for both Basic and Premium plans. No credit card required.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Do you offer educational discounts?</h4>
              <p className="text-gray-600 text-sm">
                Yes, we offer special pricing for educational institutions. Contact our sales team for more information.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contact Sales CTA */}
        <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-50 to-purple-50">
          <CardContent className="p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-lg bg-blue-100">
                <Headphones className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Need a Custom Solution?</h3>
            <p className="text-gray-600 mb-6">
              Looking for enterprise features, custom integrations, or volume pricing? Our sales team is here to help.
            </p>
            <Button onClick={handleContactSales} className="bg-blue-600 hover:bg-blue-700">
              Contact Sales Team
            </Button>
          </CardContent>
        </Card>
      </div>
    </TopNavLayout>
  )
}
