import { gsap } from "gsap";

export function initCursor() {
  if (matchMedia("(hover: none)").matches) return;

  const cursor = document.querySelector("[data-cursor]");
  const dot = document.querySelector("[data-cursor-dot]");
  const ring = document.querySelector("[data-cursor-ring]");
  const label = document.querySelector("[data-cursor-label]");
  if (!cursor || !dot || !ring) return;

  const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const dotPos = { ...pos };
  const ringPos = { ...pos };

  window.addEventListener("mousemove", (e) => {
    pos.x = e.clientX;
    pos.y = e.clientY;
  });

  window.addEventListener("mousedown", () => cursor.classList.add("is-down"));
  window.addEventListener("mouseup", () => cursor.classList.remove("is-down"));

  gsap.ticker.add(() => {
    dotPos.x += (pos.x - dotPos.x) * 0.9;
    dotPos.y += (pos.y - dotPos.y) * 0.9;
    ringPos.x += (pos.x - ringPos.x) * 0.18;
    ringPos.y += (pos.y - ringPos.y) * 0.18;
    dot.style.transform = `translate3d(${dotPos.x}px, ${dotPos.y}px, 0) translate(-50%, -50%)`;
    ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`;
  });

  document.querySelectorAll("[data-cursor-hover]").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.classList.add("is-hover");
      label.textContent = el.dataset.cursorHover;
    });
    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("is-hover");
      label.textContent = "";
    });
  });

  // Hide cursor when leaving window
  document.addEventListener("mouseleave", () => {
    gsap.to([dot, ring], { autoAlpha: 0, duration: 0.3 });
  });
  document.addEventListener("mouseenter", () => {
    gsap.to([dot, ring], { autoAlpha: 1, duration: 0.3 });
  });
}
