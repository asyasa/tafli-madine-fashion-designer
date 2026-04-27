import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function initContact() {
  const title = document.querySelector("[data-contact-title]");
  if (title) {
    const words = title.querySelectorAll("span");
    gsap.set(words, { yPercent: 110 });
    ScrollTrigger.create({
      trigger: title,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(words, {
          yPercent: 0,
          stagger: 0.08,
          duration: 1.1,
          ease: "power4.out",
        });
      },
    });
  }
}
