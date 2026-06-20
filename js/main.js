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

/* Прогресс-бар чтения + подсветка активного пункта меню */
const progress = document.getElementById("progress");
const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll('.nav__menu a[href^="#"]')];
function onScroll() {
  const h = document.documentElement;
  const max = h.scrollHeight - h.clientHeight;
  if (progress) progress.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
  const y = h.scrollTop + 120;
  let current = "";
  for (const s of sections) if (s.offsetTop <= y) current = s.id;
  navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + current));
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* Лайтбокс для скриншотов */
const lb = document.getElementById("lightbox");
const lbImg = document.getElementById("lightbox-img");
if (lb && lbImg) {
  const open = (src, alt) => { lbImg.src = src; lbImg.alt = alt || ""; lb.classList.add("is-open"); lb.setAttribute("aria-hidden", "false"); };
  const close = () => { lb.classList.remove("is-open"); lb.setAttribute("aria-hidden", "true"); lbImg.src = ""; };
  document.querySelectorAll(".card__media img.shot, .collage .desk").forEach((img) => {
    img.addEventListener("click", () => open(img.currentSrc || img.src, img.alt));
  });
  lb.addEventListener("click", (e) => { if (e.target !== lbImg) close(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
}

/* Копирование email + тост */
const toast = document.getElementById("toast");
function showToast(msg) {
  if (!toast) return;
  toast.textContent = msg; toast.classList.add("is-show");
  clearTimeout(showToast._t); showToast._t = setTimeout(() => toast.classList.remove("is-show"), 2000);
}
document.querySelectorAll("[data-copy]").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const text = btn.dataset.copy;
    try { await navigator.clipboard.writeText(text); showToast("Скопировано: " + text); }
    catch { window.location.href = "mailto:" + text; }
  });
});

/* Reveal */
const reveals = document.querySelectorAll("[data-reveal]");
if (reveals.length && "IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const io = new IntersectionObserver((entries, obs) => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add("is-visible"); obs.unobserve(e.target); }
  }, { threshold: 0.08, rootMargin: "0px 0px -6% 0px" });
  reveals.forEach((el) => io.observe(el));
} else { reveals.forEach((el) => el.classList.add("is-visible")); }
