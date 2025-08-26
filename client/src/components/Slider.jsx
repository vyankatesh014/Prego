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
    <div className="flex items-center justify-center w-full px-2 md:px-6">
      {/* Previous button */}
      <button
        onClick={prevSlide}
        className="p-1 md:p-2 bg-black/30 rounded-full hover:bg-black/50 md:mr-6 mr-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 md:h-6 w-5 md:w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Slider container */}
      <div className="w-full max-w-3xl overflow-hidden relative">
        <div
          ref={sliderRef}
          className="flex transition-transform duration-500 ease-in-out"
        >
          {slides.map((src, index) => (
            <img
              key={index}
              src={src}
              className="w-full flex-shrink-0 rounded-lg"
              alt={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Next button */}
      <button
        onClick={nextSlide}
        className="p-1 md:p-2 bg-black/30 rounded-full hover:bg-black/50 md:ml-6 ml-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 md:h-6 w-5 md:w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default Slider;
