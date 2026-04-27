import { gsap } from "gsap";

export function initPreloader() {
  return new Promise((resolve) => {
    const pre = document.querySelector("[data-preloader]");
    const counter = document.querySelector("[data-preloader-counter]");
    const bar = document.querySelector("[data-preloader-bar]");
    const label = document.querySelector("[data-preloader-label]");
    if (!pre) return resolve();

    const state = { n: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        gsap
          .timeline({
            onComplete: () => {
              pre.style.display = "none";
              resolve();
            },
          })
          .to(label, { y: -20, autoAlpha: 0, duration: 0.5, ease: "power3.in" }, 0)
          .to(counter, { y: -40, autoAlpha: 0, duration: 0.55, ease: "power3.in" }, 0.05)
          .to(
            pre,
            {
              yPercent: -100,
              duration: 1.1,
              ease: "expo.inOut",
            },
            0.2
          );
      },
    });

    tl.to(bar, { scaleX: 1, duration: 2.6, ease: "power2.inOut" }, 0)
      .to(
        state,
        {
          n: 100,
          duration: 2.6,
          ease: "power2.inOut",
          onUpdate: () => {
            counter.textContent = Math.round(state.n);
          },
        },
        0
      );
  });
}
