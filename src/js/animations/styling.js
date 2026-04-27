import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";

export function initStyling() {
  gsap.registerPlugin(Draggable, InertiaPlugin);
  const rail = document.querySelector("[data-styling-rail]");
  const track = document.querySelector("[data-styling-track]");
  if (!rail || !track) return;

  let getMax = () => -(track.scrollWidth - window.innerWidth + 48);

  // Scroll-driven horizontal motion
  gsap.to(track, {
    x: getMax,
    ease: "none",
    scrollTrigger: {
      trigger: rail,
      start: "top 85%",
      end: "bottom top",
      scrub: 0.6,
      invalidateOnRefresh: true,
    },
  });

  // Draggable with inertia
  Draggable.create(track, {
    type: "x",
    inertia: true,
    bounds: { minX: getMax(), maxX: 0 },
    edgeResistance: 0.8,
    onPress() {
      rail.classList.add("is-dragging");
    },
    onRelease() {
      rail.classList.remove("is-dragging");
    },
  });
}
