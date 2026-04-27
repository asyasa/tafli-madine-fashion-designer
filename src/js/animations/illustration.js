import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function initIllustration() {
  // Signature draw
  document.querySelectorAll("[data-signature] path").forEach((p) => {
    ScrollTrigger.create({
      trigger: p,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(p, { strokeDashoffset: 0, duration: 2.4, ease: "power2.out" });
      },
    });
  });

  // Plate fade + blur
  document.querySelectorAll(".illustration__plate").forEach((plate) => {
    gsap.from(plate, {
      opacity: 0,
      y: 40,
      filter: "blur(8px)",
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: plate, start: "top 85%", once: true },
    });
  });
}
