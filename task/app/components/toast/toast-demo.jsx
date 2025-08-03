"use client"

import { useToast } from "./toast-container"
import { Button } from "./button"

export default function ToastDemo() {
  const { toast } = useToast()

  return (
    <div className="flex flex-wrap gap-4 p-6">
      <Button
        onClick={() => toast.success("Operation completed successfully! 🎉")}
        className="bg-emerald-500 hover:bg-emerald-600"
      >
        Success Toast
      </Button>

      <Button
        onClick={() => toast.error("Something went wrong. Please try again.")}
        className="bg-red-500 hover:bg-red-600"
      >
        Error Toast
      </Button>

      <Button
        onClick={() => toast.warning("Please check your input before proceeding.")}
        className="bg-amber-500 hover:bg-amber-600"
      >
        Warning Toast
      </Button>

      <Button
        onClick={() => toast.info("Here's some helpful information for you.")}
        className="bg-blue-500 hover:bg-blue-600"
      >
        Info Toast
      </Button>

      <Button
        onClick={() => {
          toast.success("First toast")
          setTimeout(() => toast.error("Second toast"), 500)
          setTimeout(() => toast.warning("Third toast"), 1000)
          setTimeout(() => toast.info("Fourth toast"), 1500)
        }}
        className="bg-purple-500 hover:bg-purple-600"
      >
        Multiple Toasts
      </Button>
    </div>
  )
}
