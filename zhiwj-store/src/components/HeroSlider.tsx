"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const slides = [
  { id: 1, title: "TAMADDOON", subtitle: "Heritage Collection" },
  { id: 2, title: "METOMORFOZ", subtitle: "Transformation Series" },
  { id: 3, title: "BAHOR", subtitle: "Spring Awakening" },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden bg-gray-50">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Placeholder gradient - replace with real images */}
          <div 
            className="w-full h-full flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${index % 2 === 0 ? '#1a1a1a' : '#2a2a2a'} 0%, ${index % 2 === 0 ? '#0a0a0a' : '#1a1a1a'} 100%)`
            }}
          >
            <div className="text-center text-white px-4">
              <h1 className="text-5xl md:text-8xl lg:text-9xl font-serif font-bold tracking-[0.3em] mb-4 animate-fade-in">
                {slide.title}
              </h1>
              <p className="text-sm md:text-base uppercase tracking-[0.5em] text-gray-400">
                {slide.subtitle}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-12 h-[1px] transition-all duration-500 ${
              index === currentSlide ? "bg-white" : "bg-white/30"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pb-4 animate-bounce">
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  );
}
