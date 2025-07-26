"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function PromotionalCard({
  title = "Weekly sold 1k+",
  subtitle = "Freshness Guarantee",
  buttonText = "View More",
  onButtonClick,
}) {
  return (
    <Card className="w-80 bg-purple-800 text-white rounded-bl-4xl rounded-tr-4xl rounded-br-none rounded-tl-none border-none overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-3 h-3 bg-white rounded-full"></div>
          <span className="text-sm opacity-90">{subtitle}</span>
        </div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <Button
          variant="secondary"
          className="bg-white text-purple-800 hover:bg-gray-100 rounded-full px-6"
          onClick={onButtonClick}
        >
          {buttonText}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  )
}