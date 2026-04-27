import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function initCollections() {
  const items = document.querySelectorAll("[data-collection]");
  items.forEach((item) => {
    const figs = item.querySelectorAll(".collection__media figure");
    const meta = item.querySelector(".collection__meta");

    // Background hue pulse on entry
    gsap.fromTo(
      item,
      { filter: "saturate(0.6)" },
      {
        filter: "saturate(1)",
        scrollTrigger: {
          trigger: item,
          start: "top 75%",
          end: "top 30%",
          scrub: true,
        },
      }
    );

    // Meta reveal
    if (meta) {
      gsap.from(meta.children, {
        opacity: 0,
        y: 28,
        stagger: 0.08,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: meta, start: "top 80%", once: true },
      });
    }

    // Figure entry scale
    figs.forEach((f, i) => {
      gsap.from(f, {
        opacity: 0,
        y: 48,
        scale: 0.96,
        duration: 1,
        delay: i * 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: f, start: "top 85%", once: true },
      });
    });
  });
}
