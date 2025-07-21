"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import Image from "next/image"

export function ProductCard({ product, onClick }) {
  return (
    <Card
      className="relative bg-white hover:shadow-lg transition-all duration-200 cursor-pointer"
      onClick={() => onClick?.(product)}
    >
      <CardContent className="p-4">
        {/* Checkmark */}
        <div className="absolute top-3 right-3 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
          <Check className="w-4 h-4 text-white" />
        </div>

        {/* Product Image */}
        <div className="flex justify-center mb-4 mt-2">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={120}
            height={120}
            className="object-contain"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-900">{product.name}</h3>
          <p className="text-sm text-gray-600">{product.subtitle}</p>

          <div className="flex items-center gap-2">
            <Badge variant="destructive" className="bg-red-100 text-red-700 hover:bg-red-100">
              {product.discount}
            </Badge>
            <span className="text-sm text-gray-600">{product.stock}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">MRP-</span>
            <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
            <span className="text-lg font-bold text-gray-900">{product.salePrice}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}