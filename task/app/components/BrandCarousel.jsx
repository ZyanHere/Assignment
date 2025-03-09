"use client";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import ProductCard from "./ProductCard";
import Image from "next/image";
import { useState } from "react";

const BrandCarousel = () => {
  const [firstVisible, setFirstVisible] = useState(0);
  const [lastVisible, setLastVisible] = useState(6); // 7 items visible at once
  const [hoveringCard, setHoveringCard] = useState(false);
  const [hoveringButton, setHoveringButton] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: false,
    mode: "free",
    slides: { perView: 7, spacing: 14 }, // 14px gap added
    slideChanged(slider) {
      setFirstVisible(slider.track.details.rel);
      setLastVisible(slider.track.details.rel + 6);
    },
  });

  // ✅ Fix: Adjust prev button visibility logic
  const showPrev = hoveringCard && firstVisible > 0;
  const showNext = hoveringCard && lastVisible < 11; // Ensures it disappears at the last slide

  return (
    <div ref={sliderRef} className="relative w-full overflow-hidden keen-slider">
      {Array.from({ length: 12 }).map((_, index) => (
        <div
          key={index}
          className="keen-slider__slide"
          onMouseEnter={() => setHoveringCard(true)}
          onMouseLeave={() => setHoveringCard(false)}
        >
          <ProductCard />
        </div>
      ))}

      {/* Previous Button (Appears when scrolling back) */}
      {(showPrev || hoveringButton) && (
        <button
          className="absolute top-1/2 transform -translate-y-1/2 rounded-full bg-transparent"
          onClick={() => instanceRef.current?.prev()}
          onMouseEnter={() => setHoveringButton(true)}
          onMouseLeave={() => setHoveringButton(false)}
        >
          <Image src="/essentials/next.png" alt="Prev" width={40} height={40} className="rotate-180" />
        </button>
      )}

      {/* Next Button (Appears when hovering the last visible slide) */}
      {(showNext || hoveringButton) && (
        <button
          className="absolute top-1/2 right-2 transform -translate-y-1/2 p-2 rounded-full bg-transparent"
          onClick={() => instanceRef.current?.next()}
          onMouseEnter={() => setHoveringButton(true)}
          onMouseLeave={() => setHoveringButton(false)}
        >
          <Image src="/essentials/next.png" alt="Next" width={40} height={40} />
        </button>
      )}
    </div>
  );
};

export default BrandCarousel;
