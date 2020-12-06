"use strict";

//  when scroll down navbar show

document.addEventListener("scroll", () => {
  const navbar = document.querySelector("#navbar");
  const navbarheight = navbar.getBoundingClientRect().height;
  let y = window.scrollY;
  if (y > navbarheight) {
    const el = document.getElementById("navbar");
    el.style.backgroundColor = "var(--color-pink)";
    el.style.opacity = 0.95;
    el.style.transition = "all,300ms";
  } else {
    const el = document.getElementById("navbar");
    el.style.backgroundColor = "transparent";
  }
});

const navbar = document.querySelector("#navbar");
const navbarheight = navbar.getBoundingClientRect().height;
console.log(`height: ${navbarheight}`);

// navbar menu button click event

const navbarbutton = document.querySelector(".navbar_menu");
navbarbutton.addEventListener("click", (event) => {
  const target = event.target;
  const link = target.dataset.link;

  const scrollTo = document.querySelector(link);
  scrollTo.scrollIntoView({ behavior: "smooth" });
});
