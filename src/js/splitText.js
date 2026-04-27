// Utility to split text by chars/lines using SplitText when available, with fallback.
import { gsap } from "gsap";

let SplitText = null;
try {
  // Dynamically import (side-effect free if fails)
  SplitText = (await import("gsap/SplitText")).SplitText;
  gsap.registerPlugin(SplitText);
} catch (e) {
  SplitText = null;
}

function fallbackSplitChars(el) {
  const text = el.textContent;
  el.innerHTML = text
    .split("")
    .map((c) => (c === " " ? "<span>&nbsp;</span>" : `<span class="ch">${c}</span>`))
    .join("");
  return { chars: el.querySelectorAll(".ch"), words: [], lines: [] };
}

function fallbackSplitLines(el) {
  // Naïve: wrap per word; animator only animates slight translate.
  const text = el.textContent;
  el.innerHTML = text
    .split(/\s+/)
    .map((w) => `<span class="word" style="display:inline-block">${w}</span>`)
    .join(" ");
  return { chars: [], words: el.querySelectorAll(".word"), lines: el.querySelectorAll(".word") };
}

export function splitChars(el) {
  if (SplitText) {
    const st = new SplitText(el, { type: "chars,words" });
    return { chars: st.chars, words: st.words, lines: [] };
  }
  return fallbackSplitChars(el);
}

export function splitLines(el) {
  if (SplitText) {
    const st = new SplitText(el, { type: "lines", linesClass: "split-line" });
    // wrap each line in a mask so we can translateY
    st.lines.forEach((line) => {
      const wrapper = document.createElement("span");
      wrapper.className = "split-line-mask";
      line.parentNode.insertBefore(wrapper, line);
      wrapper.appendChild(line);
    });
    return { chars: [], words: [], lines: st.lines };
  }
  return fallbackSplitLines(el);
}
