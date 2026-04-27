import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { splitChars } from "../splitText.js";

export function initForet() {
  const section = document.querySelector("[data-section='foret']");
  if (!section) return;

  // Title char stagger
  const titleLines = section.querySelectorAll("[data-foret-title] .foret__title-line");
  titleLines.forEach((line) => {
    const { chars } = splitChars(line);
    chars.forEach((c) => (c.style.display = "inline-block"));
    line.classList.add("is-split-ready");
    gsap.set(chars, { yPercent: 110, opacity: 0 });
    ScrollTrigger.create({
      trigger: line,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(chars, {
          yPercent: 0,
          opacity: 1,
          stagger: 0.02,
          duration: 1,
          ease: "power4.out",
        });
      },
    });
  });

  // Mask / clip-path reveal on signature image
  const mask = section.querySelector("[data-foret-mask]");
  const maskImg = mask?.querySelector("img");
  if (mask && maskImg) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: mask,
        start: "top 75%",
        end: "bottom 30%",
        scrub: 1,
      },
    });
    tl.fromTo(
      mask,
      { clipPath: "inset(18% 18% 18% 18% round 4px)" },
      { clipPath: "inset(0% 0% 0% 0% round 4px)", ease: "none" }
    ).to(maskImg, { scale: 1.0, ease: "none" }, 0);
  }
}
