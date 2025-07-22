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
    if (rating > 0) {
      setShowModal(true);
    }
  };

  return (
    <>
      <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl shadow-xl max-w-3xl mx-auto w-full mt-6 sm:mt-10">
        <h2 className="text-2xl font-bold text-center text-gray-800">What do you think?</h2>
        <p className="text-sm text-gray-600 text-center mt-1">
          Please give your rating by clicking on the stars below
        </p>

        {/* Star Rating */}
        <div className="flex justify-center mt-5 gap-2 sm:gap-3">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              className={`w-8 h-8 sm:w-10 sm:h-10 cursor-pointer transition-transform hover:scale-110 ${
                index < rating ? "fill-yellow-400 stroke-yellow-400" : "stroke-gray-400"
              }`}
              onClick={() => setRating(index + 1)}
            />
          ))}
        </div>

        {/* Review Input */}
        <div className="mt-6">
          <Textarea
            placeholder="Tell us about your experience"
            className="h-28 sm:h-32 border border-gray-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 rounded-xl transition-shadow"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </div>

        <Button
          className="w-full mt-6 h-12 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white text-lg font-semibold rounded-xl shadow-md transition-transform hover:scale-[1.02]"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>

      {/* Thank You Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="text-center p-6 sm:p-8 rounded-2xl shadow-2xl">
          <DialogHeader>
            <DialogTitle className="sr-only">Review Submission Confirmation</DialogTitle>
          </DialogHeader>

          <Image src="/profile/checkmark.png" alt="Success" width={80} height={80} className="mx-auto mb-3" />

          <h2 className="text-xl font-semibold text-gray-800">Thank you for your review!</h2>
          <p className="text-sm text-gray-600 mt-1">
            Your items have been placed and are on their way to being processed.
          </p>

          <Link href="/" className="w-full">
            <Button className="w-full bg-orange-400 hover:bg-orange-500 text-white text-lg font-semibold mt-6 rounded-xl transition-all">
              Back to Home
            </Button>
          </Link>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ToReview;
