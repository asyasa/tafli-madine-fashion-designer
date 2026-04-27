import "./styles/main.scss";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";

import { initPreloader } from "./js/preloader.js";
import { initSmoothScroll } from "./js/smooth.js";
import { initCursor } from "./js/cursor.js";
import { initMagnetic } from "./js/magnetic.js";
import { initHero } from "./js/animations/hero.js";
import { initReveals } from "./js/animations/reveal.js";
import { initParallax } from "./js/animations/parallax.js";
import { initExperience } from "./js/animations/experience.js";
import { initForet } from "./js/animations/foret.js";
import { initProjects } from "./js/animations/projects.js";
import { initStyling } from "./js/animations/styling.js";
import { initCollections } from "./js/animations/collections.js";
import { initIllustration } from "./js/animations/illustration.js";
import { initContact } from "./js/animations/contact.js";

gsap.registerPlugin(ScrollTrigger, Flip);

function initDrawer() {
  const toggle = document.querySelector("[data-nav-toggle]");
  const close = document.querySelector("[data-drawer-close]");
  const drawer = document.querySelector("[data-drawer]");
  if (!toggle || !drawer) return;
  const open = () => {
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
  };
  const shut = () => {
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
  };
  toggle.addEventListener("click", open);
  close?.addEventListener("click", shut);
  drawer.querySelectorAll("a").forEach((a) => a.addEventListener("click", shut));
}

function initNavState() {
  const nav = document.querySelector("[data-nav]");
  const progress = document.querySelector("[data-progress-fill]");
  const body = document.body;

  // Nav subtle shrink
  ScrollTrigger.create({
    start: 10,
    end: 99999,
    onUpdate: (self) => {
      nav?.classList.toggle("is-scrolled", self.scroll() > 40);
    },
  });

  // Progress fill
  if (progress) {
    gsap.to(progress, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { scrub: true, start: "top top", end: "bottom bottom" },
    });
  }

  // Section theme — toggle body class
  document.querySelectorAll("[data-section][data-theme]").forEach((section) => {
    const theme = section.dataset.theme;
    ScrollTrigger.create({
      trigger: section,
      start: "top 35%",
      end: "bottom 35%",
      onToggle: (self) => {
        if (self.isActive) {
          body.dataset.theme = theme;
          body.classList.toggle("is-light", theme === "light");
        }
      },
    });
  });
}

async function boot() {
  initCursor();
  initDrawer();
  initSmoothScroll();

  await initPreloader();

  // Order matters — initialise text splits first so subsequent scrollTrigger creations use correct heights
  initHero();
  initReveals();
  initParallax();
  initForet();
  initCollections();
  initIllustration();
  initContact();
  initProjects();
  initStyling();
  initExperience();
  initNavState();
  initMagnetic();

  // Refresh after fonts & images likely settled
  requestAnimationFrame(() => ScrollTrigger.refresh());
  window.addEventListener("load", () => ScrollTrigger.refresh());
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
