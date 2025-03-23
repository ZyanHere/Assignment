"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ToReview = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = () => {
    // if (rating > 0 && review.trim() !== "") {
    //   setShowModal(true);
    // }
    if (rating > 0) {
        setShowModal(true);
      }
  };

  return (
    <>
      <div className="bg-gray-100 p-6 rounded-md shadow-md">
        <h2 className="text-xl font-semibold text-center">What do you think?</h2>
        <p className="text-sm text-gray-600 text-center mt-1">
          Please give your rating by clicking on the stars below
        </p>

        {/* Star Rating */}
        <div className="flex justify-center mt-3 gap-1">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              className={`w-8 h-8 cursor-pointer ${
                index < rating ? "fill-yellow-400 stroke-yellow-400" : "stroke-gray-400"
              }`}
              onClick={() => setRating(index + 1)}
            />
          ))}
        </div>

        {/* Review Input */}
        <div className="mt-4">
          <Textarea
            placeholder="Tell us about your experience"
            className="h-24 border-gray-300"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </div>

        
        <Button
          className="w-full mt-4 h-12 bg-green-500 hover:bg-green-600 text-white text-lg"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>

      {/* Thank You Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="text-center p-6 rounded-lg">
          <DialogHeader>
            {/* Hidden for accessibility */}
            <DialogTitle className="sr-only">Review Submission Confirmation</DialogTitle>
          </DialogHeader>

          <Image src="/profile/checkmark.png" alt="Success" width={80} height={80} className="mx-auto" />

          <h2 className="text-lg font-semibold mt-2">Thank you for your review!</h2>
          <p className="text-gray-600 mt-1">
            Your items have been placed and are on their way to being processed.
          </p>

          <Link href="/" className="w-full">
            <Button className="w-full bg-orange-400 hover:bg-orange-500 text-white text-lg mt-4">
              Back to home
            </Button>
          </Link>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ToReview;
