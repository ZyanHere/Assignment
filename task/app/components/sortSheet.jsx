"use client";

import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const sortOptions = [
  { value: "relevance", label: "Relevance" },
  { value: "price_low_high", label: "Price: Low to High" },
  { value: "price_high_low", label: "Price: High to Low" },
  { value: "newest", label: "Newest Arrivals" },
  { value: "rating", label: "Customer Rating" },
  { value: "popularity", label: "Popularity" },
  { value: "discount", label: "Discount" },
];

export default function SortSheet({ onApply, currentSort = "relevance" }) {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(currentSort);
  const [hasApplied, setHasApplied] = React.useState(false);

  React.useEffect(() => {
    setSelected(currentSort);
  }, [currentSort]);

  const handleApply = () => {
    if (selected) {
      onApply(selected);
      setHasApplied(true);
      setOpen(false);
    }
  };

  const handleClear = () => {
    setSelected("relevance");
    onApply("relevance");
    setHasApplied(false);
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="text-xs sm:text-sm px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-transform transform hover:scale-105 shadow-md"
        >
          Sort
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[300px] sm:w-[350px] bg-gradient-to-b from-yellow-50 to-yellow-100 p-5 shadow-xl"
      >
        {/* Header */}
        <SheetHeader className="border-b border-yellow-300 pb-3">
          <SheetTitle className="text-xl font-bold text-yellow-700">
            Sort By
          </SheetTitle>
        </SheetHeader>

        {/* Sort Options */}
        <div className="mt-5 space-y-3">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelected(option.value)}
              className={`flex items-center justify-between w-full px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 
                ${
                  selected === option.value
                    ? "bg-yellow-400 text-black border-yellow-500 shadow-md"
                    : "bg-white hover:bg-yellow-50 text-gray-700 border-gray-200"
                }`}
            >
              <span>{option.label}</span>
              {selected === option.value && (
                <Check className="w-4 h-4 text-black" />
              )}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col gap-2">
          <Button
            onClick={handleApply}
            disabled={!selected}
            className={`w-full py-3 font-semibold rounded-lg transition-all duration-200 text-black
              ${
                selected
                  ? "bg-yellow-500 hover:bg-yellow-600 shadow-lg hover:shadow-xl transform hover:scale-105"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
          >
            {selected
              ? `Apply Sort (${selected.replace(/_/g, " ")})`
              : "Select an Option"}
          </Button>

          {hasApplied && selected !== "relevance" && (
            <Button
              variant="ghost"
              className="w-full text-yellow-700 font-medium border border-yellow-300 hover:bg-yellow-100"
              onClick={handleClear}
            >
              ⟲ Clear Sort
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
