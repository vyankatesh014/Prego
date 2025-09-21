import React, { useState, useEffect, useRef } from "react";
import { assets } from "../assets/assets";

const Slider = () => {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Array of slide objects with image, headline, subheadline, CTA text, and link
  const slides = [
    {
      image: assets.Slider_image1,
      headline: "Fresh Fruits & Veggies Delivered",
      subheadline: "Get the best produce at your doorstep, always fresh.",
      cta: "Shop Fruits & Veggies",
      link: "/products/fruits"
    },
    {
      image: assets.Slider_image5,
      headline: "Organic & Healthy Picks",
      subheadline: "Choose from a curated range of organic and healthy foods.",
      cta: "Explore Health Picks",
      link: "/health-picks"
     
    },
    {
      image: assets.Slider_image3,
      headline: "Snacks & Beverages",
      subheadline: "Treat yourself to delicious snacks and refreshing drinks.",
      cta: "See Snacks & Drinks",
      link: "/products/snacks"
    },
    {
      image: assets.Slider_image4,
      headline: "Bakery & Breads",
      subheadline: "Enjoy fresh breads and bakery delights every day.",
      cta: "Order Bakery",
      link: "/products/bakery"
    },
    {
      image: assets.Slider_image2,
      headline: "Dairy & Breakfast Essentials",
      subheadline: "Start your day right with our quality dairy selection.",
      cta: "Browse Dairy",
      link: "/products/dairy"
    },
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
      {/* Slider container with overlay */}
      <div className="w-full relative">
        <div
          ref={sliderRef}
          className="flex w-full transition-transform duration-500 ease-in-out"
        >
          {slides.map((slide, index) => (
            <img
              key={index}
              src={slide.image}
              className={`w-full h-[220px] sm:h-[340px] md:h-[440px] lg:h-[540px] object-cover flex-shrink-0 transition-transform duration-700 ${
                currentSlide === index ? 'scale-105' : 'scale-100 opacity-80'
              }`}
              alt={slide.headline}
            />
          ))}
        </div>
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10 pointer-events-none" />
        {/* Headline, subheadline, CTA for current slide */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 px-4">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-4 animate-fadeInUp">
            {slides[currentSlide].headline}
          </h1>
          <p className="text-base sm:text-lg md:text-2xl text-white/90 font-medium mb-6 animate-fadeInUp delay-100">
            {slides[currentSlide].subheadline}
          </p>
          <a
            href={slides[currentSlide].link}
            className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-all duration-300 animate-fadeInUp delay-200"
          >
            {slides[currentSlide].cta}
          </a>
        </div>
      </div>

      {/* Previous button */}
      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-30 p-1 md:p-2 bg-black/30 rounded-full hover:bg-black/50"
        aria-label="Previous Slide"
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

      {/* Next button */}
      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-30 p-1 md:p-2 bg-black/30 rounded-full hover:bg-black/50"
        aria-label="Next Slide"
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
      <div className="absolute bottom-4 w-full flex justify-center gap-2 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
              currentSlide === index ? "bg-white scale-125" : "bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
