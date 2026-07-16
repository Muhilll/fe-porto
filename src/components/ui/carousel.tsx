"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Carousel({
  children,
  autoPlay = false,
  interval = 3000,
  showArrows = true,
  showDots = true,
  loop = true,
  className,
}) {
  const slides = Array.isArray(children) ? children : [children];
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  const goTo = useCallback(
    (index) => {
      if (loop) {
        setCurrent((index + slides.length) % slides.length);
      } else {
        setCurrent(Math.max(0, Math.min(index, slides.length - 1)));
      }
    },
    [slides.length, loop]
  );

  const prev = useCallback(() => goTo(current - 1), [current, goTo]);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  useEffect(() => {
    if (!autoPlay) return;
    timerRef.current = setInterval(next, interval);
    return () => clearInterval(timerRef.current);
  }, [autoPlay, interval, next]);

  return (
    <div data-slot="carousel" className={cn("relative w-full overflow-hidden rounded-xl", className)}>
      {/* Track */}
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div key={i} className="w-full shrink-0">
            {slide}
          </div>
        ))}
      </div>

      {/* Arrows */}
      {showArrows && slides.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 size-9 rounded-full bg-card/80 hover:bg-card shadow-md flex items-center justify-center text-foreground transition-colors backdrop-blur-sm"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 size-9 rounded-full bg-card/80 hover:bg-card shadow-md flex items-center justify-center text-foreground transition-colors backdrop-blur-sm"
          >
            <ChevronRight className="size-5" />
          </button>
        </>
      )}

      {/* Dots */}
      {showDots && slides.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={cn(
                "rounded-full transition-all duration-300",
                i === current
                  ? "bg-card w-5 h-2"
                  : "bg-card/50 size-2 hover:bg-card/80"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function CarouselSlide({ children, className }) {
  return (
    <div data-slot="carousel-slide" className={cn("w-full", className)}>
      {children}
    </div>
  );
}

export { Carousel, CarouselSlide };
