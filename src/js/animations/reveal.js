import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { splitChars, splitLines } from "../splitText.js";

export function initReveals() {
  // Character-level reveals
  document.querySelectorAll("[data-split-chars]").forEach((el) => {
    const { chars } = splitChars(el);
    el.classList.add("is-split-ready");
    chars.forEach((c) => (c.style.display = "inline-block"));
    gsap.set(chars, { yPercent: 110, opacity: 0 });
    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(chars, {
          yPercent: 0,
          opacity: 1,
          stagger: 0.012,
          duration: 0.9,
          ease: "power4.out",
        });
      },
    });
  });

  // Line-level reveals
  document.querySelectorAll("[data-split-lines]").forEach((el) => {
    // Hero handles its own.
    if (el.closest("[data-section='hero']")) return;
    const { lines } = splitLines(el);
    el.classList.add("is-split-ready");
    gsap.set(lines, { yPercent: 110 });
    ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      once: true,
      onEnter: () => {
        gsap.to(lines, {
          yPercent: 0,
          stagger: 0.08,
          duration: 1,
          ease: "power3.out",
        });
      },
    });
  });

  // Simple reveals
  document.querySelectorAll("[data-reveal]").forEach((el) => {
    if (el.closest("[data-section='hero']")) return;
    ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      once: true,
      onEnter: () => {
        el.classList.add("is-revealed");
      },
    });
  });
}
