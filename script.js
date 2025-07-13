console.log("Portfolio JS loaded!");
const themeToggle = document.getElementById("theme-toggle"),
  themeToggleFloating = document.getElementById("theme-toggle-floating"),
  body = document.body;
if (localStorage.getItem("theme") === "light") {
  body.classList.add("light-theme");
} else {
  body.classList.remove("light-theme");
}
function toggleTheme() {
  body.classList.toggle("light-theme");
  if (body.classList.contains("light-theme")) {
    localStorage.setItem("theme", "light");
  } else {
    localStorage.setItem("theme", "dark");
  }
}
if (themeToggle) themeToggle.addEventListener("click", toggleTheme);
if (themeToggleFloating)
  themeToggleFloating.addEventListener("click", toggleTheme);
const scrollBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", () => {
  window.scrollY > 200
    ? scrollBtn.classList.add("show")
    : scrollBtn.classList.remove("show");
}),
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

// Section fade-in on scroll
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");
  const observer = new window.IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  sections.forEach((section) => observer.observe(section));
});

// Section toggle logic
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".section-toggle").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", !expanded);
      const content = btn
        .closest("h2")
        .parentElement.querySelector(".section-content");
      if (content) {
        content.classList.toggle("collapsed", expanded);
      }
      btn.innerText = expanded ? "►" : "▼";
    });
  });
});

// Timeline node animation
document.addEventListener("DOMContentLoaded", function () {
  const nodes = document.querySelectorAll(".timeline-node");
  if (nodes.length) {
    const observer = new window.IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    nodes.forEach((node) => observer.observe(node));
  }
});

// Scrollspy logic
document.addEventListener("DOMContentLoaded", function () {
  const links = Array.from(document.querySelectorAll(".scrollspy-link"));
  const sections = links.map((link) =>
    document.querySelector(link.getAttribute("href"))
  );
  function onScroll() {
    let scrollPos = window.scrollY + 120;
    let activeIdx = 0;
    for (let i = 0; i < sections.length; i++) {
      if (sections[i] && sections[i].offsetTop <= scrollPos) {
        activeIdx = i;
      }
    }
    links.forEach((link, i) =>
      link.classList.toggle("active", i === activeIdx)
    );
  }
  window.addEventListener("scroll", onScroll);
  onScroll();
  // Smooth scroll for nav links
  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.offsetTop - 60, behavior: "smooth" });
        // Immediately update nav highlight
        links.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
      }
    });
  });
});

// Sticky nav detection for theme toggle
document.addEventListener("DOMContentLoaded", function () {
  const nav = document.querySelector(".scrollspy-nav");
  const floatingBtn = document.getElementById("theme-toggle-floating");
  let lastSticky = false;
  function checkSticky() {
    const navTop = nav.getBoundingClientRect().top;
    const isSticky = navTop <= 0;
    if (isSticky !== lastSticky) {
      nav.classList.toggle("sticky", isSticky);
      lastSticky = isSticky;
    }
  }
  window.addEventListener("scroll", checkSticky);
  checkSticky();
  if (floatingBtn) floatingBtn.addEventListener("click", toggleTheme);
});
