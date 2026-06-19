/* main.js — навигация, фильтр проектов, reveal-анимации. */
"use strict";

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

/* Мобильное меню */
const toggle = document.querySelector(".nav__toggle");
const menu = document.getElementById("nav-menu");
if (toggle && menu) {
  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  menu.addEventListener("click", (e) => {
    if (e.target.closest("a")) { menu.classList.remove("is-open"); toggle.setAttribute("aria-expanded", "false"); }
  });
}

/* Фильтр проектов */
const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll("#grid .card");
filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    filters.forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    const cat = btn.dataset.filter;
    cards.forEach((card) => {
      const show = cat === "all" || card.dataset.cat === cat;
      card.classList.toggle("is-hidden", !show);
    });
  });
});

/* Типизатор стека в hero (изюминка) */
const typed = document.getElementById("typed");
if (typed && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const words = ["gRPC-сервисы", "Kafka и Redis", "PostgreSQL", "Docker · Linux", "распределённые системы"];
  let wi = 0, ci = 0, deleting = false;
  const tick = () => {
    const w = words[wi];
    typed.textContent = w.slice(0, ci);
    if (!deleting && ci < w.length) { ci++; setTimeout(tick, 75); }
    else if (!deleting && ci === w.length) { deleting = true; setTimeout(tick, 1500); }
    else if (deleting && ci > 0) { ci--; setTimeout(tick, 40); }
    else { deleting = false; wi = (wi + 1) % words.length; setTimeout(tick, 300); }
  };
  tick();
} else if (typed) { typed.textContent = "gRPC · Kafka · Redis · Docker"; }

/* Reveal */
const reveals = document.querySelectorAll("[data-reveal]");
if (reveals.length && "IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const io = new IntersectionObserver((entries, obs) => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add("is-visible"); obs.unobserve(e.target); }
  }, { threshold: 0.08, rootMargin: "0px 0px -6% 0px" });
  reveals.forEach((el) => io.observe(el));
} else { reveals.forEach((el) => el.classList.add("is-visible")); }
