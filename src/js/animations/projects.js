import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function initProjects() {
  const grid = document.querySelector("[data-projects-grid]");
  const filterBar = document.querySelector("[data-projects-filter]");
  if (!grid || !filterBar) return;

  const items = grid.querySelectorAll(".project");

  // Entrance stagger
  gsap.set(items, { opacity: 0, y: 48 });
  ScrollTrigger.batch(items, {
    onEnter: (els) =>
      gsap.to(els, {
        opacity: 1,
        y: 0,
        stagger: 0.07,
        duration: 0.9,
        ease: "power3.out",
      }),
    start: "top 88%",
    once: true,
  });

  // Filter + Flip
  filterBar.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBar.querySelectorAll("button").forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      const filter = btn.dataset.filter;
      const state = Flip.getState(items);
      items.forEach((it) => {
        const tag = it.dataset.filterTag;
        if (filter === "all" || tag === filter) {
          it.classList.remove("is-hidden");
        } else {
          it.classList.add("is-hidden");
        }
      });
      Flip.from(state, {
        duration: 0.7,
        ease: "power3.inOut",
        absolute: true,
        stagger: 0.02,
        onEnter: (els) =>
          gsap.fromTo(
            els,
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 0.5 }
          ),
        onLeave: (els) =>
          gsap.to(els, { opacity: 0, scale: 0.9, duration: 0.3 }),
      });
    });
  });
}
