"use client";

import * as React from "react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const filters = {
    priceRanges: [
        { label: "Under 100", min: 0, max: 100 },
        { label: "100 - 250", min: 100, max: 250 },
        { label: "250 - 500", min: 250, max: 500 },
        { label: "500 - 1000", min: 500, max: 1000 },
        { label: "Over 2000", min: 2000, max: null },
    ],
    ratings: [
        { label: "4★ & above", value: 4 },
        { label: "3★ & above", value: 3 },
        { label: "2★ & above", value: 2 },
    ],
    availability: [
        { label: "In Stock", value: true },
        { label: "Out of Stock", value: false },
    ],
};

export default function FilterSheet({ onApply, currentFilters = {} }) {
    const [open, setOpen] = React.useState(false);
    const [selectedFilters, setSelectedFilters] = React.useState(currentFilters);
    console.log('selected filters', selectedFilters);

    const handleSelect = (group, value) => {
        setSelectedFilters((prev) => ({ ...prev, [group]: value }));
    };

    const handleApply = () => {
        onApply(selectedFilters);
        setOpen(false);
    };

    const handleClear = () => {
        setSelectedFilters({});
        onApply({});
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    className="text-xs sm:text-sm px-4 py-2 text-black font-semibold rounded-lg transition-transform transform hover:scale-105 shadow-md"
                >
                    Filters
                </Button>
            </SheetTrigger>

            <SheetContent
                side="right"
                className="w-[300px] sm:w-[350px] bg-gradient-to-b from-yellow-50 to-yellow-100 p-5 shadow-xl flex flex-col overflow-x-hidden"
            >
                <SheetHeader className="border-b border-yellow-300 pb-3">
                    <SheetTitle className="text-xl font-bold text-yellow-700">
                        Filters
                    </SheetTitle>
                </SheetHeader>

                {/* Action Buttons */}
                <div className="mt-4 flex flex-row items-center justify-between gap-2">
                    <Button
                        onClick={handleApply}
                        className="py-3 font-semibold rounded-lg transition-all duration-200 text-black bg-yellow-500 hover:bg-yellow-600 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                        Apply Filters
                    </Button>

                    <Button
                        variant="ghost"
                        className="text-yellow-700 font-medium border border-yellow-300 hover:bg-yellow-100"
                        onClick={handleClear}
                    >
                        ⟲ Clear Filters
                    </Button>
                </div>
                <div className="space-y-3 overflow-y-auto flex-1 overflow-x-hidden p-2">
                    <Accordion type="multiple" className="mt-4 space-y-3">
                        <AccordionItem value="price">
                            <AccordionTrigger className="text-yellow-700 font-semibold">
                                Price Range
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="space-y-2">
                                    {filters.priceRanges.map((range, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleSelect("priceRange", range)}
                                            className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200
                      ${selectedFilters.priceRange?.label === range.label
                                                    ? "bg-yellow-400 text-black border-yellow-500 shadow-md"
                                                    : "bg-white hover:bg-yellow-50 text-gray-700 border-gray-200"
                                                }`}
                                        >
                                            {range.label}
                                        </button>
                                    ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="ratings">
                            <AccordionTrigger className="text-yellow-700 font-semibold">
                                Ratings
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="space-y-2">
                                    {filters.ratings.map((rating, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleSelect("rating", rating)}
                                            className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200
                      ${selectedFilters.rating?.value === rating.value
                                                    ? "bg-yellow-400 text-black border-yellow-500 shadow-md"
                                                    : "bg-white hover:bg-yellow-50 text-gray-700 border-gray-200"
                                                }`}
                                        >
                                            {rating.label}
                                        </button>
                                    ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="availability">
                            <AccordionTrigger className="text-yellow-700 font-semibold">
                                Availability
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="space-y-2">
                                    {filters.availability.map((avail, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleSelect("availability", avail)}
                                            className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200
                      ${selectedFilters.availability?.value === avail.value
                                                    ? "bg-yellow-400 text-black border-yellow-500 shadow-md"
                                                    : "bg-white hover:bg-yellow-50 text-gray-700 border-gray-200"
                                                }`}
                                        >
                                            {avail.label}
                                        </button>
                                    ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                </div>
            </SheetContent>
        </Sheet>
    );
}