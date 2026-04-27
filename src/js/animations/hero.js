import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { splitChars, splitLines } from "../splitText.js";

export function initHero() {
  const hero = document.querySelector("[data-section='hero']");
  if (!hero) return;

  const title = hero.querySelector("[data-hero-title]");
  const lines = title?.querySelectorAll(".hero__title-line");
  const sub = hero.querySelector("[data-split-lines]");
  const reveals = hero.querySelectorAll("[data-reveal]");
  const media = hero.querySelector("[data-hero-media]");
  const videoEl = hero.querySelector("[data-hero-video]");
  const ticker = hero.querySelector("[data-ticker] .hero__ticker-track");

  // Character-level split for the hero title
  const letters = [];
  if (lines) {
    lines.forEach((line) => {
      const { chars } = splitChars(line);
      chars.forEach((c) => {
        c.style.display = "inline-block";
      });
      letters.push(...chars);
      line.classList.add("is-split-ready");
    });
  }

  if (sub) {
    const { lines: subLines } = splitLines(sub);
    sub.classList.add("is-split-ready");
    gsap.set(subLines, { yPercent: 110 });
    gsap.to(subLines, {
      yPercent: 0,
      stagger: 0.08,
      delay: 1.4,
      duration: 1.1,
      ease: "power3.out",
    });
  }

  // Master intro timeline
  const tl = gsap.timeline({ delay: 0.2, defaults: { ease: "power3.out" } });

  if (videoEl) {
    tl.fromTo(videoEl, { scale: 1.22, autoAlpha: 0 }, { scale: 1.08, autoAlpha: 1, duration: 1.8 }, 0);
  }

  if (letters.length) {
    gsap.set(letters, { yPercent: 110, rotate: 4 });
    tl.to(
      letters,
      {
        yPercent: 0,
        rotate: 0,
        stagger: 0.022,
        duration: 1.1,
        ease: "power4.out",
      },
      0.5
    );
  }

  reveals.forEach((el, i) => {
    tl.to(el, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, 1.0 + i * 0.07);
  });

  // Ticker loop
  if (ticker) {
    gsap.to(ticker, {
      xPercent: -50,
      duration: 30,
      ease: "none",
      repeat: -1,
    });
  }

  // Parallax on scroll
  if (media) {
    gsap.to(media, {
      yPercent: 18,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }

  // Subtle cursor-based motion
  const heroGrid = hero.querySelector(".hero__grid");
  if (heroGrid) {
    const xTo = gsap.quickTo(heroGrid, "x", { duration: 1.2, ease: "power3" });
    const yTo = gsap.quickTo(heroGrid, "y", { duration: 1.2, ease: "power3" });
    hero.addEventListener("mousemove", (e) => {
      const { innerWidth: w, innerHeight: h } = window;
      xTo(((e.clientX - w / 2) / w) * -18);
      yTo(((e.clientY - h / 2) / h) * -12);
    });
    hero.addEventListener("mouseleave", () => {
      xTo(0);
      yTo(0);
    });
  }
}
