"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setLocation } from "@/lib/redux/modalLocation/modalLocationSlice";

export const BannerHeader = () => {
  const dispatch = useDispatch();
  const location = useSelector((state) => state.modalLocation.location);

  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  const handleSave = () => {
    if (inputValue.trim()) {
      dispatch(setLocation(inputValue.trim()));
      setOpen(false); 
      setInputValue(""); 
    }
  };

  return (
    <div className="flex items-center gap-2 text-base font-semibold mb-4">
      <span className="text-black">
        {location || "Select delivery location"}
      </span>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Image
            src="/home/assets/Down.svg"
            alt="Down Arrow"
            width={20}
            height={20}
            className="object-contain cursor-pointer"
          />
        </DialogTrigger>

        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Enter your delivery address</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-3">
            <Input
              placeholder="Type your city or town"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button onClick={handleSave}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
