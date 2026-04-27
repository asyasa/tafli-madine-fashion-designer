import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function initExperience() {
  const section = document.querySelector("[data-section='experience']");
  const track = document.querySelector("[data-exp-pin]");
  const list = document.querySelector("[data-exp-list]");
  if (!section || !track || !list) return;

  const cards = list.querySelectorAll("[data-exp-card]");

  // Horizontal scroll via ScrollTrigger pin
  let getDistance = () => list.scrollWidth - window.innerWidth + 64;

  const tween = gsap.to(list, {
    x: () => -getDistance(),
    ease: "none",
  });

  ScrollTrigger.create({
    trigger: track,
    start: "top 10%",
    end: () => `+=${getDistance()}`,
    pin: true,
    scrub: 1,
    anticipatePin: 1,
    animation: tween,
    invalidateOnRefresh: true,
  });

  // Card stagger entrance
  gsap.set(cards, { opacity: 0, y: 48 });
  cards.forEach((card, i) => {
    gsap.to(card, {
      opacity: 1,
      y: (i % 2 === 0 ? -32 : 32),
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: card,
        containerAnimation: tween,
        start: "left 85%",
        once: true,
      },
    });
  });
}
