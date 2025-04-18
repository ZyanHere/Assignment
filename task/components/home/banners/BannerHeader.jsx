"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export const BannerHeader = () => {
  const [location, setLocation] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleSave = () => {
    if (inputValue.trim()) {
      setLocation(inputValue.trim());
    }
  };

  return (
    <Dialog>
      <div className="flex items-center gap-2 text-base font-semibold mb-4">
        <span className="text-black">
          {location || "Select delivery location"}
        </span>
        <DialogTitle></DialogTitle>
        <DialogTrigger asChild>
          <button>
            <Image
              src="/home/assets/Down.svg"
              alt="Down Arrow"
              width={20}
              height={20}
              className="object-contain"
            />
          </button>
        </DialogTrigger>
      </div>

      <DialogContent className="max-w-sm rounded-xl p-6">
        <div className="flex justify-center mb-4">
          <button className="bg-white p-2 rounded-sm shadow-md">
            X
          </button>
        </div>

        <div className="space-y-4">
          <p className="text-base font-medium">Select delivery location</p>
          <Input
            placeholder="Enter location"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <DialogTrigger asChild>
            <Button
              className="w-full bg-yellow-400 text-black hover:bg-yellow-500"
              onClick={handleSave}
            >
              Save
            </Button>
          </DialogTrigger>

          
        </div>
      </DialogContent>
    </Dialog>
  );
};
