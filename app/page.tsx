"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Sparkles, Box, Scan, Component, Search, Menu, ShoppingBag, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Initial entrance animations
    const tl = gsap.timeline();

    tl.fromTo(
      ".nav-item",
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
    )
      .fromTo(
        ".hero-title",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.6"
      )
      .fromTo(
        ".hero-subtitle",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      )
      .fromTo(
        ".hero-btn",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      )
      .fromTo(
        ".hero-img-main",
        { x: 50, opacity: 0, rotation: 5 },
        { x: 0, opacity: 1, rotation: -3, duration: 1.2, ease: "power2.out" },
        "-=1"
      )
      .fromTo(
        ".hero-img-overlay",
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: "back.out(1.7)" },
        "-=0.8"
      )
      .fromTo(
        ".floating-elem",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, stagger: 0.1, ease: "back.out(2)" },
        "-=0.5"
      );

    // Continuous animations
    gsap.to(".spin-slow", {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: "linear"
    });

    gsap.to(".float-up-down", {
      y: -15,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // --- Adornment Section Animations ---
    let mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      // DESKTOP: Perfectly synced timeline
      const deskRibbon = document.querySelector('#desktop-adornment .gold-ribbon-path') as SVGPathElement;
      if (!deskRibbon) return;

      const length = deskRibbon.getTotalLength();
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".adornment-section",
          start: "top 150%", // Starts way before the section enters the screen
          end: "bottom 0%",
          scrub: 1.5,
        }
      });

      // Ribbon draws over the entire scroll length (duration 1)
      tl.fromTo('#desktop-adornment .gold-ribbon-path',
        { strokeDasharray: length, strokeDashoffset: length },
        { strokeDashoffset: 0, ease: "power2.inOut", duration: 1 }, 0
      );

      // Images pop up at exact percentages of the ribbon's progress
      const deskCards = gsap.utils.toArray<HTMLElement>('#desktop-adornment .category-card');
      if (deskCards.length === 4) {
        tl.fromTo(deskCards[0], { y: 150, opacity: 0 }, { y: 0, opacity: 1, duration: 0.1, ease: "power2.out" }, 0.40); // Ring
        tl.fromTo(deskCards[1], { y: 150, opacity: 0 }, { y: 0, opacity: 1, duration: 0.1, ease: "power2.out" }, 0.44); // Necklace
        tl.fromTo(deskCards[2], { y: 150, opacity: 0 }, { y: 0, opacity: 1, duration: 0.1, ease: "power2.out" }, 0.50); // Earrings
        tl.fromTo(deskCards[3], { y: 150, opacity: 0 }, { y: 0, opacity: 1, duration: 0.1, ease: "power2.out" }, 0.57); // Bracelets
      }
    });

    mm.add("(max-width: 1023px)", () => {
      // MOBILE: Dynamic scroll trigger per element
      const mobileRibbon = document.querySelector('#mobile-adornment .gold-ribbon-path') as SVGPathElement;
      if (mobileRibbon) {
        const length = mobileRibbon.getTotalLength();
        gsap.fromTo('#mobile-adornment .gold-ribbon-path',
          { strokeDasharray: length, strokeDashoffset: length },
          {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: "#mobile-adornment",
              start: "top 85%",
              end: "bottom 20%",
              scrub: 2,
            }
          }
        );
      }

      gsap.utils.toArray<HTMLElement>('#mobile-adornment .category-card').forEach(card => {
        gsap.fromTo(card,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 55%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    });

  }, { scope: container });

  const jellyPath1 = "M 50 10 C 75 5, 95 25, 90 50 C 85 75, 75 95, 50 90 C 25 85, 5 75, 10 50 C 15 25, 25 15, 50 10 Z";
  const jellyPath2 = "M 45 15 C 80 15, 90 20, 95 45 C 100 70, 70 90, 45 95 C 20 100, 15 80, 5 55 C -5 30, 10 15, 45 15 Z";

  const handleImageHover = () => {
    gsap.to(".hero-img-overlay", {
      scale: 1.05,
      duration: 0.5,
      ease: "power2.out"
    });
    gsap.to(".jelly-path", {
      attr: { d: jellyPath2 },
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  };

  const handleImageLeave = () => {
    gsap.to(".hero-img-overlay", {
      scale: 1,
      duration: 0.5,
      ease: "power2.out"
    });
    gsap.killTweensOf(".jelly-path");
    gsap.to(".jelly-path", {
      attr: { d: jellyPath1 },
      duration: 0.8,
      ease: "elastic.out(1, 0.4)"
    });
  };

  return (
    <div ref={container} className="w-full min-h-screen text-foreground overflow-clip relative selection:bg-brand selection:text-white bg-[#f4efe9]">

      {/* Hero Section */}
      <div className="relative w-full min-h-screen overflow-hidden">
        {/* Exact Background Layers from User Image - DESKTOP VIEW */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none hidden md:block"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Base Color */}
          <rect width="100%" height="100%" fill="#f4efe9" />

          {/* --- Hero Shapes (y: 0 - 900) --- */}
          {/* Top Right Blobs (Back to Front) - Cocoa Palette */}
          <path d="M 750 0 C 750 300, 1050 400, 1200 300 C 1350 200, 1440 450, 1440 450 L 1440 0 Z" fill="#d2b4a3" />
          <path d="M 950 0 C 950 200, 1150 250, 1250 150 C 1350 50, 1440 300, 1440 30x0 L 1440 0 Z" fill="#a97960" />
          <path d="M 1150 0 C 1150 150, 1300 250, 1400 150 C 1430 120, 1440 200, 1440 200 L 1440 0 Z" fill="#784a36" />
          <path d="M 1440 250 C 1300 250, 1250 400, 1440 450 Z" fill="#f4efe9" />

          {/* Small Accent Blob */}
          <ellipse cx="280" cy="700" rx="35" ry="20" transform="rotate(-15 280 700)" fill="#c2977d" />

          {/* Wireframe shape left */}
          <path d="M -50 550 C 100 500, 180 550, 180 650 C 180 750, 50 750, -50 700 Z" stroke="#a97960" strokeWidth="1.5" fill="none" />
          <path d="M -10 710 C 40 720, 90 700, 140 680" stroke="#a97960" strokeWidth="1.5" fill="none" />


          {/* Small Wavy Line Groups (Center & Right) */}
          <g stroke="#936a54" strokeWidth="1.5" fill="none">
            {/* Center */}
            <path d="M 650 540 Q 655 535, 660 540 T 670 540 T 680 540 T 690 540" />
            <path d="M 650 545 Q 655 540, 660 545 T 670 545 T 680 545 T 690 545" />
            <path d="M 650 550 Q 655 545, 660 550 T 670 550 T 680 550 T 690 550" />
            {/* Right */}
            <path d="M 1150 630 Q 1155 625, 1160 630 T 1170 630 T 1180 630 T 1190 630" />
            <path d="M 1150 635 Q 1155 630, 1160 635 T 1170 635 T 1180 635 T 1190 635" />
            <path d="M 1150 640 Q 1155 635, 1160 640 T 1170 640 T 1180 640 T 1190 640" />
          </g>
        </svg>



        {/* Mobile Background System - Responsive and precise (No Stretching!) */}
        <div className="absolute inset-0 w-full h-full block md:hidden pointer-events-none overflow-hidden bg-[#f4efe9]">
          {/* Top Right Tan Blob */}
          <svg viewBox="0 0 200 200" className="absolute top-0 right-0 w-[60%] max-w-[250px]">
            <path d="M 200 0 L 50 0 C 50 80, 150 150, 200 120 Z" fill="#a97960" />
          </svg>

          {/* Center Right Beige Blob */}
          <svg viewBox="0 0 300 500" className="absolute top-[15%] right-0 w-[70%] max-w-[300px]">
            <path d="M 300 0 C 100 0, 0 150, 50 300 C 100 450, 200 400, 300 350 Z" fill="#d2b4a3" />
          </svg>



          {/* Doodles & Sparkles (Absolute positioned to prevent warping) */}
          <svg viewBox="0 0 50 50" className="absolute top-[35%] left-[25%] w-[25px]">
            <g stroke="#1a1a1a" strokeWidth="2" fill="none">
              <path d="M 25 0 Q 25 20, 0 25 Q 25 30, 25 50 Q 25 30, 50 25 Q 25 20, 25 0 Z" />
            </g>
          </svg>

          <svg viewBox="0 0 50 50" className="absolute top-[48%] left-[8%] w-[20px]">
            <g stroke="#1a1a1a" strokeWidth="2" fill="none">
              <path d="M 25 0 Q 25 20, 0 25 Q 25 30, 25 50 Q 25 30, 50 25 Q 25 20, 25 0 Z" />
            </g>
          </svg>

          <svg viewBox="0 0 50 50" className="absolute top-[38%] right-[10%] w-[20px]">
            <g stroke="#1a1a1a" strokeWidth="2" fill="none">
              <path d="M 25 0 Q 25 20, 0 25 Q 25 30, 25 50 Q 25 30, 50 25 Q 25 20, 25 0 Z" />
            </g>
          </svg>

          <svg viewBox="0 0 100 50" className="absolute bottom-[20%] right-[8%] w-[60px]">
            <g stroke="#936a54" strokeWidth="4" fill="none" strokeLinecap="round">
              <path d="M 0 10 Q 15 0, 30 10 T 60 10 T 90 10" />
              <path d="M 0 25 Q 15 15, 30 25 T 60 25 T 90 25" />
              <path d="M 0 40 Q 15 30, 30 40 T 60 40 T 90 40" />
            </g>
          </svg>
        </div>


        {/* Navigation */}
        <nav className="absolute top-0 left-0 w-full flex items-center justify-between px-6 py-8 md:px-12 z-50">
          <div className="hidden md:flex items-center space-x-8 text-sm font-sans tracking-wide uppercase nav-item">
            <a href="#" className="hover:text-brand transition-colors">Our Story</a>
            <a href="#" className="hover:text-brand transition-colors">Blogs</a>
          </div>

          <div className="md:hidden nav-item text-foreground transition-colors">
            <div className="hamburger">
              <input className="checkbox peer opacity-0 w-full h-full absolute inset-0 cursor-pointer z-20 appearance-none m-0" type="checkbox" />
              <svg fill="none" viewBox="0 0 50 50" className="w-8 h-8 pointer-events-none peer-checked:[&_.line]:stroke-[#d1b482]">
                <path className="lineTop line" strokeLinecap="round" d="M6 11L44 11"></path>
                <path className="lineMid line" strokeLinecap="round" d="M6 24H43"></path>
                <path className="lineBottom line" strokeLinecap="round" d="M6 37H43"></path>
              </svg>
            </div>
          </div>

          <div className="text-2xl md:text-4xl font-serif tracking-widest nav-item">
            DEAR DARLING
          </div>

          <div className="hidden md:flex items-center space-x-8 text-sm font-sans tracking-wide uppercase nav-item">
            <a href="#" className="hover:text-brand transition-colors">Collections</a>
            <a href="#" className="hover:text-brand transition-colors">Bag</a>
          </div>

          <div className="md:hidden nav-item">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </nav>

        {/* Main Hero Content */}
        <main className="max-w-7xl mx-auto px-6 md:px-12 py-12 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-16 items-center relative z-10 min-h-screen">

          {/* Left Text Column */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left pt-24 lg:pt-0 lg:-translate-y-12">
            <h1 className="hero-title text-6xl sm:text-7xl md:text-[5.5rem] lg:text-[7rem] leading-[0.9] font-serif mb-6 flex flex-col">
              <span>WEAR</span>
              <span className="flex items-center gap-4">
                THE <span className="font-script text-[1.3em] font-normal lowercase tracking-normal -mt-4 text-[#c46e3f]">Light</span>
              </span>
            </h1>

            <p className="hero-subtitle text-lg md:text-xl text-gray-700 max-w-md font-sans mb-6 lg:mb-6 leading-relaxed">
              Handcrafted heirloom jewelry designed to capture every moving moment.
            </p>

            <div className="hero-btn relative group inline-block mt-2 lg:mt-4 -ml-5 w-[260px] h-[60px] cursor-pointer">
              {/* Wavy border SVG with water fill effect */}
              <svg width="260" height="60" viewBox="0 0 260 60" className="absolute inset-0 transition-transform duration-300 group-hover:scale-105">
                <defs>
                  <clipPath id="wavy-clip">
                    <path d="M 20 30 C 20 15, 40 10, 70 12 C 100 14, 130 8, 160 12 C 190 16, 220 10, 240 15 C 255 18, 255 42, 240 45 C 220 50, 190 44, 160 48 C 130 52, 100 46, 70 48 C 40 50, 20 45, 20 30 Z" />
                  </clipPath>
                </defs>

                {/* Outline */}
                <path
                  d="M 20 30 C 20 15, 40 10, 70 12 C 100 14, 130 8, 160 12 C 190 16, 220 10, 240 15 C 255 18, 255 42, 240 45 C 220 50, 190 44, 160 48 C 130 52, 100 46, 70 48 C 40 50, 20 45, 20 30 Z"
                  className="stroke-foreground fill-transparent stroke-[1.2px]"
                />

                {/* Water Fill Layer */}
                <rect
                  x="0"
                  y="0"
                  width="260"
                  height="60"
                  clipPath="url(#wavy-clip)"
                  className="fill-foreground translate-y-full transition-transform duration-[600ms] ease-out group-hover:translate-y-0"
                />
              </svg>

              {/* Base Text */}
              <div className="absolute inset-0 flex items-center justify-center font-sans text-[12px] font-semibold tracking-[0.2em] uppercase transition-colors duration-300 delay-100 text-foreground group-hover:text-white pointer-events-none">
                Explore Collection
              </div>

              {/* Custom 4-point gold star */}
              <div className="absolute top-[8px] right-[10px] w-[22px] h-[22px] text-[#d1b482] float-up-down z-10 transition-transform duration-300 group-hover:scale-125">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0 C12 8 16 12 24 12 C16 12 12 16 12 24 C12 16 8 12 0 12 C8 12 12 8 12 0 Z" />
                </svg>
              </div>
            </div>

            {/* Decorative lines/doodles from design */}
            <div className="hidden lg:block absolute left-8 bottom-32 opacity-20 floating-elem">
              <svg width="60" height="20" viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 10 Q 5 0, 10 10 T 20 10 T 30 10 T 40 10 T 50 10 T 60 10" stroke="currentColor" strokeWidth="1" fill="none" />
                <path d="M0 15 Q 5 5, 10 15 T 20 15 T 30 15 T 40 15 T 50 15 T 60 15" stroke="currentColor" strokeWidth="1" fill="none" />
              </svg>
            </div>
          </div>

          {/* Right Images Column */}
          <div className="relative w-full h-[450px] lg:h-[700px] flex justify-center items-center mt-2 lg:mt-24">

            {/* Sparkles floating around */}
            <Sparkles className="absolute top-[10%] left-[10%] w-8 h-8 text-foreground floating-elem float-up-down" strokeWidth={1} />
            <Sparkles className="absolute bottom-[20%] right-[10%] w-6 h-6 text-brand floating-elem float-up-down" style={{ animationDelay: '1s' }} />

            {/* Main Model Image */}
            <div className="hero-img-main relative w-[80%] max-w-[400px] aspect-[5/6] rounded-[40px] overflow-hidden shadow-2xl z-10 -rotate-3">
              <Image
                src="/assests/her-girl.jpg"
                alt="Model wearing Dear Darling Jewels"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 400px"
              />
            </div>

            {/* Overlay Ring Image inside organic jelly blob */}
            <div
              className="hero-img-overlay absolute -right-6 md:-right-16 top-[65%] -translate-y-1/2 w-[140px] h-[140px] md:w-[280px] md:h-[280px] z-20 cursor-pointer"
              onMouseEnter={handleImageHover}
              onMouseLeave={handleImageLeave}
            >
              {/* Curved Hover Text - Hidden on mobile as requested */}
              <svg viewBox="0 0 100 100" className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-30 overflow-visible">
                <path id="right-curve" d="M 50 -3 C 85 -3, 103 15, 103 50" fill="transparent" />
                <text fontSize="4" letterSpacing="3" fill="#666" className="font-sans font-bold uppercase opacity-80">
                  <textPath href="#right-curve" startOffset="45%">
                    HOVER!!
                  </textPath>
                </text>
              </svg>

              {/* The SVG Jelly Container */}
              <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible drop-shadow-2xl">
                <defs>
                  <clipPath id="jelly-clip">
                    <path className="jelly-path" d="M 50 10 C 75 5, 95 25, 90 50 C 85 75, 75 95, 50 90 C 25 85, 5 75, 10 50 C 15 25, 25 15, 50 10 Z" />
                  </clipPath>
                </defs>

                {/* Image inside SVG to bypass Safari's foreignObject clipPath bug */}
                <g clipPath="url(#jelly-clip)">
                  <image
                    href="/assests/ring.jpg"
                    x="0"
                    y="0"
                    width="100"
                    height="100"
                    preserveAspectRatio="xMidYMid slice"
                  />
                </g>

                {/* Thick White Border mimicking the shape exactly */}
                <path
                  className="jelly-path"
                  d="M 50 10 C 75 5, 95 25, 90 50 C 85 75, 75 95, 50 90 C 25 85, 5 75, 10 50 C 15 25, 25 15, 50 10 Z"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                />
              </svg>
            </div>

            {/* Artisanal Stamp */}
            <div className="absolute bottom-0 lg:bottom-12 left-2 md:-left-12 z-30 floating-elem bg-[#e6ddd0] rounded-full p-2 border border-foreground/10 scale-50 md:scale-75 lg:scale-90 xl:scale-100 origin-bottom-left">
              <div className="relative w-28 h-28 flex items-center justify-center">
                <div className="absolute inset-0 border border-foreground/20 rounded-full m-1"></div>
                <span className="font-serif text-2xl font-bold">100%</span>
                <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full spin-slow">
                  <path id="stamp-curve" d="M 50 50 m -40 0 a 40 40 0 1 1 80 0 a 40 40 0 1 1 -80 0" fill="transparent" />
                  <text fontSize="10" fill="currentColor" className="font-sans font-medium uppercase">
                    <textPath href="#stamp-curve" startOffset="0%" textLength="251" lengthAdjust="spacing">
                      ARTISANAL • ARTISANAL • ARTISANAL •
                    </textPath>
                  </text>
                </svg>
              </div>
            </div>

            {/* Decorative Gold Swirls using user's asset */}
            <div className="absolute -top-8 md:-top-16 -right-4 md:-right-12 w-[200px] h-[200px] md:w-[300px] md:h-[300px] floating-elem -z-10 pointer-events-none">
              <Image src="/assests/bg-element.png" alt="Gold Swirls" fill className="object-contain opacity-90" sizes="(max-width: 768px) 200px, 300px" />
            </div>

          </div>
        </main>
      </div>

      {/* 01 / Choose Your Adornment Section */}
      <section className="adornment-section relative w-full overflow-visible pt-20 pb-32 z-20 bg-[#f4efe9]">

        {/* ── BACKGROUND DECORATIVE BLOBS ── */}
        {/* Left blob now bleeds UP into the hero section above it */}
        <div className="absolute -top-[250px] left-0 w-[38%] h-[800px] bg-[#784a36] rounded-br-full opacity-[0.07] -z-10 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[48%] h-[480px] bg-[#a97960] rounded-tl-full opacity-[0.12] -z-10 pointer-events-none" />

        {/* ── HEADER ── */}
        <div className="text-center mb-20 relative z-30">
          <p className="text-[10px] tracking-[0.5em] uppercase text-brand mb-3 font-sans">Our Collection</p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif text-foreground tracking-wide flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6">
            <span>01 / CHOOSE YOUR</span>
            <span className="font-script text-brand text-[1.1em] lowercase tracking-normal">
              Adornment
            </span>
          </h2>
          <div className="w-14 h-px bg-brand mx-auto mt-5 opacity-50" />
        </div>

        {/* ── MAIN INTERACTIVE CANVAS (DESKTOP) ── */}
        <div id="desktop-adornment" className="hidden lg:block relative w-full max-w-[1300px] mx-auto min-h-[1050px]">

          {/* ── THE GOLDEN RIBBON (SVG) — z-10, BEHIND images (z-30) ── */}
          <svg
            viewBox="0 0 1300 1000"
            preserveAspectRatio="xMidYMid meet"
            className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="gold-3d-ribbon" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7a5010" />
                <stop offset="20%" stopColor="#d4a94e" />
                <stop offset="45%" stopColor="#f0d98a" />
                <stop offset="65%" stopColor="#c89440" />
                <stop offset="85%" stopColor="#e8c96e" />
                <stop offset="100%" stopColor="#7a5010" />
              </linearGradient>
              <filter id="ribbon-shadow-new">
                <feDropShadow dx="2" dy="6" stdDeviation="5" floodColor="#5a3800" floodOpacity="0.3" />
              </filter>
            </defs>

            {/* Shadow copy (offset slightly) */}
            <path
              d="M -800,100
                 C -300,80  280,520 450,390
                 C 570,300 700,210 860,310
                 C 1040,430 800,680 650,590
                 C 500,500 310,800 460,900
                 C 610,1000 1100,840 1300,940
                 C 1500,1040 2000,900 2200,900"
              fill="none"
              stroke="#5a3800"
              strokeWidth="32"
              strokeLinecap="round"
              opacity="0.15"
              transform="translate(3,7)"
              className="gold-ribbon-path"
            />
            {/* Main ribbon */}
            <path
              d="M -800,100
                 C -300,80  280,520 450,390
                 C 570,300 700,210 860,310
                 C 1040,430 800,680 650,590
                 C 500,500 310,800 460,900
                 C 610,1000 1100,840 1300,940
                 C 1500,1040 2000,900 2200,900"
              fill="none"
              stroke="url(#gold-3d-ribbon)"
              strokeWidth="24"
              strokeLinecap="round"
              filter="url(#ribbon-shadow-new)"
              className="gold-ribbon-path"
            />
          </svg>

          {/* ── FLOATING DECORATIONS ── */}
          {/* Sparkle accent */}
          <div className="absolute top-[8%] left-[14%] z-20 opacity-50">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#784a36" strokeWidth="1">
              <path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10L12 2Z" />
            </svg>
          </div>

          {/* Spinning handcrafted badge */}
          {/* <div className="absolute bottom-[18%] right-[14%] z-30 animate-[spin_20s_linear_infinite]">
            <div className="w-28 h-28 rounded-full bg-brand flex items-center justify-center p-2 text-center text-[#f4efe9] font-sans font-semibold tracking-widest text-[9px] uppercase border border-[#f4efe9]/40 shadow-xl">
              All Pieces • Handcrafted •
            </div>
          </div> */}

          {/* ── 01 RINGS — top-left, z-30 (above ribbon) ── */}
          <div className="category-card absolute z-30" style={{ top: '12%', left: '16%' }}>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-foreground font-serif text-xl tracking-widest">01 //</span>
              <span className="font-serif italic text-3xl text-foreground">Rings</span>
            </div>
            <div
              className="relative w-[280px] h-[300px] overflow-hidden shadow-2xl border-[7px] border-white/60 group cursor-pointer"
              style={{ borderRadius: '63% 37% 54% 46% / 44% 53% 47% 56%' }}
            >
              <Image src="/assests/cat-rings.jpg" alt="Rings" fill className="object-cover group-hover:scale-105 transition-transform duration-1000" sizes="280px" />
            </div>
          </div>

          {/* ── 02 NECKLACES — top-right, z-30 ── */}
          <div className="category-card absolute z-30" style={{ top: '25%', right: '15%' }}>
            <div className="flex justify-end items-center gap-4 mb-4">
              <span className="text-foreground font-serif text-xl tracking-widest">02 //</span>
              <span className="font-serif italic text-3xl text-foreground">Necklaces</span>
            </div>
            <div
              className="relative w-[300px] h-[280px] overflow-hidden shadow-2xl border-[7px] border-white/60 group cursor-pointer"
              style={{ borderRadius: '41% 59% 43% 57% / 54% 41% 59% 46%' }}
            >
              <Image src="/assests/cat-necklaces.jpg" alt="Necklaces" fill className="object-cover group-hover:scale-105 transition-transform duration-1000" sizes="300px" />
            </div>
          </div>

          {/* ── 03 EARRINGS — bottom-left, z-30 ── */}
          <div className="category-card absolute z-30" style={{ top: '55%', left: '12%' }}>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-foreground font-serif text-xl tracking-widest">03 //</span>
              <span className="font-serif italic text-3xl text-foreground">Earrings</span>
            </div>
            <div
              className="relative w-[260px] h-[240px] overflow-hidden shadow-2xl border-[7px] border-white/60 group cursor-pointer"
              style={{ borderRadius: '56% 44% 68% 32% / 46% 62% 38% 54%' }}
            >
              <Image src="/assests/cat-earrings.jpg" alt="Earrings" fill className="object-cover group-hover:scale-105 transition-transform duration-1000" sizes="260px" />
            </div>
          </div>

          {/* ── 04 BRACELETS — bottom-right, z-30 ── */}
          <div className="category-card absolute z-30" style={{ top: '72%', right: '18%' }}>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-foreground font-serif text-xl tracking-widest">04 //</span>
              <span className="font-serif italic text-3xl text-foreground">Bracelets</span>
            </div>
            <div
              className="relative w-[280px] h-[280px] overflow-hidden shadow-2xl border-[7px] border-white/60 group cursor-pointer"
              style={{ borderRadius: '48% 52% 43% 57% / 54% 48% 52% 46%' }}
            >
              <Image src="/assests/cat-bracelets.jpg" alt="Bracelets" fill className="object-cover group-hover:scale-105 transition-transform duration-1000" sizes="280px" />
            </div>
          </div>

        </div>

        {/* ── MAIN INTERACTIVE CANVAS (MOBILE / TABLET) ── */}
        <div id="mobile-adornment" className="block lg:hidden relative w-full max-w-lg mx-auto px-6 flex flex-col gap-20 py-10 z-20">

          {/* Vertical Mobile Ribbon */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
            preserveAspectRatio="none"
            viewBox="0 0 100 1000"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Soft background shadow ribbon */}
            <path
              d="M 150,-200 C -20,50 80,250 50,450 C 20,650 80,850 50,1200"
              fill="none"
              stroke="#5a3800"
              strokeWidth="4"
              opacity="0.15"
              transform="translate(1,3)"
              className="gold-ribbon-path"
            />
            {/* Main vibrant ribbon */}
            <path
              d="M 150,-200 C -20,50 80,250 50,450 C 20,650 80,850 50,1200"
              fill="none"
              stroke="url(#gold-3d-ribbon)"
              strokeWidth="3"
              strokeLinecap="round"
              filter="url(#ribbon-shadow-new)"
              className="gold-ribbon-path"
            />
          </svg>

          {/* 01 Rings (Mobile) */}
          <div className="category-card relative z-30 self-start mt-4">
            <div className="flex flex-col mb-4">
              <span className="text-foreground font-serif text-lg tracking-widest opacity-80">01 //</span>
              <span className="font-serif italic text-3xl text-foreground">Rings</span>
            </div>
            <div
              className="relative w-[240px] h-[260px] md:w-[320px] md:h-[340px] overflow-hidden shadow-2xl border-[6px] border-white/60 cursor-pointer"
              style={{ borderRadius: '63% 37% 54% 46% / 44% 53% 47% 56%' }}
            >
              <Image src="/assests/cat-rings.jpg" alt="Rings" fill className="object-cover" sizes="(max-width: 768px) 240px, 320px" />
            </div>
          </div>

          {/* 02 Necklaces (Mobile) */}
          <div className="category-card relative z-30 self-end mt-10">
            <div className="flex flex-col items-end mb-4 text-right">
              <span className="text-foreground font-serif text-lg tracking-widest opacity-80">02 //</span>
              <span className="font-serif italic text-3xl text-foreground">Necklaces</span>
            </div>
            <div
              className="relative w-[260px] h-[240px] md:w-[340px] md:h-[320px] overflow-hidden shadow-2xl border-[6px] border-white/60 cursor-pointer"
              style={{ borderRadius: '41% 59% 43% 57% / 54% 41% 59% 46%' }}
            >
              <Image src="/assests/cat-necklaces.jpg" alt="Necklaces" fill className="object-cover" sizes="(max-width: 768px) 260px, 340px" />
            </div>
          </div>

          {/* 03 Earrings (Mobile) */}
          <div className="category-card relative z-30 self-start mt-10">
            <div className="flex flex-col mb-4">
              <span className="text-foreground font-serif text-lg tracking-widest opacity-80">03 //</span>
              <span className="font-serif italic text-3xl text-foreground">Earrings</span>
            </div>
            <div
              className="relative w-[220px] h-[200px] md:w-[300px] md:h-[280px] overflow-hidden shadow-2xl border-[6px] border-white/60 cursor-pointer"
              style={{ borderRadius: '56% 44% 68% 32% / 46% 62% 38% 54%' }}
            >
              <Image src="/assests/cat-earrings.jpg" alt="Earrings" fill className="object-cover" sizes="(max-width: 768px) 220px, 300px" />
            </div>
          </div>

          {/* 04 Bracelets (Mobile) */}
          <div className="category-card relative z-30 self-end mt-10">
            <div className="flex flex-col items-end mb-4 text-right">
              <span className="text-foreground font-serif text-lg tracking-widest opacity-80">04 //</span>
              <span className="font-serif italic text-3xl text-foreground">Bracelets</span>
            </div>
            <div
              className="relative w-[240px] h-[240px] md:w-[320px] md:h-[320px] overflow-hidden shadow-2xl border-[6px] border-white/60 cursor-pointer"
              style={{ borderRadius: '48% 52% 43% 57% / 54% 48% 52% 46%' }}
            >
              <Image src="/assests/cat-bracelets.jpg" alt="Bracelets" fill className="object-cover" sizes="(max-width: 768px) 240px, 320px" />
            </div>
          </div>

        </div>
      </section>
      {/* ── BACKGROUND DECORATIVE BLOBS ── */}
      <section className="section-3 adornment-section relative w-full overflow-visible pt-20 pb-32 h-screen z-20 bg-[#f4efe9]">

        ❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌

      </section>

    </div>
  );
}
