import React, { useState, useEffect, useRef } from "react";
import { assets } from "../assets/assets";

const Slider = () => {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Array of image URLs
  const slides = [
    assets.Slider_image1,
    assets.Slider_image2,
    assets.Slider_image3,
    assets.Slider_image4,
    assets.Slider_image5,
  ];

  const totalSlides = slides.length;

  const goToSlide = (index) => {
    if (!sliderRef.current) return;
    const slideWidth = sliderRef.current.children[0].clientWidth;
    sliderRef.current.style.transform = `translateX(-${index * slideWidth}px)`;
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Auto-slide every 3 seconds
  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 3000);
    return () => clearInterval(slideInterval);
  }, []);

  // Update slide on currentSlide change
  useEffect(() => {
    goToSlide(currentSlide);
  }, [currentSlide]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => goToSlide(currentSlide);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentSlide]);

  // Swipe support for mobile
  useEffect(() => {
    let startX = 0;
    let endX = 0;

    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
      endX = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      if (startX - endX > 50) nextSlide(); // swipe left
      if (endX - startX > 50) prevSlide(); // swipe right
    };

    const slider = sliderRef.current;
    slider.addEventListener("touchstart", handleTouchStart);
    slider.addEventListener("touchmove", handleTouchMove);
    slider.addEventListener("touchend", handleTouchEnd);

    return () => {
      slider.removeEventListener("touchstart", handleTouchStart);
      slider.removeEventListener("touchmove", handleTouchMove);
      slider.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Previous button */}
      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 p-1 md:p-2 bg-black/30 rounded-full hover:bg-black/50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 md:h-6 md:w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Slider container */}
      <div className="w-full">
        <div
          ref={sliderRef}
          className="flex w-full transition-transform duration-500 ease-in-out"
        >
          {slides.map((src, index) => (
            <img
              key={index}
              src={src}
              className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover flex-shrink-0"
              alt={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Next button */}
      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 p-1 md:p-2 bg-black/30 rounded-full hover:bg-black/50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 md:h-6 md:w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 w-full flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
              currentSlide === index ? "bg-white scale-125" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
