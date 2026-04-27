import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function initParallax() {
  // Stack depth parallax (about section)
  document.querySelectorAll("[data-parallax-stack]").forEach((stack) => {
    stack.querySelectorAll("[data-depth]").forEach((el) => {
      const depth = parseFloat(el.dataset.depth) || 0.2;
      gsap.fromTo(
        el,
        { y: depth * 120 },
        {
          y: -depth * 120,
          ease: "none",
          scrollTrigger: {
            trigger: stack,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });
  });

  // Image parallax zoom (foret blocks, collections)
  document.querySelectorAll("[data-parallax-img]").forEach((wrap) => {
    const img = wrap.querySelector("img");
    if (!img) return;
    gsap.fromTo(
      img,
      { yPercent: -8, scale: 1.18 },
      {
        yPercent: 8,
        scale: 1.04,
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  });
}
