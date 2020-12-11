"use strict";

//function

//scroll to sector
function scrollToSelector(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
}

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
  if (link == null) {
    return;
  }
  const scrollTo = document.querySelector(link);
  scrollTo.scrollIntoView({ behavior: "smooth" });
});

// Home contact me button

const contactMeButton = document.querySelector(".home_contact");
contactMeButton.addEventListener("click", (event) => {
  scrollToSelector(event.target.dataset.link);
});

//Scroll home fading

document.addEventListener("scroll", () => {
  const home = document.querySelector(".home_container");
  const homeHeight = home.getBoundingClientRect().height;
  let y = window.scrollY;
  let fading = 1.2 - y / homeHeight;
  home.style.opacity = fading;
});

//Scroll Top button

const topkey = document.querySelector(".topkey_button");
topkey.addEventListener("click", (event) => {
  scrollToSelector(event.target.dataset.link);
});

//View Top Button

document.addEventListener("scroll", () => {
  const topkey_button = document.querySelector(".topkey_button");
  const homeHeight = home.getBoundingClientRect().height;
  let y = window.scrollY;
  if (y > homeHeight / 2) {
    topkey_button.classList.add("visible");
  } else {
    topkey_button.classList.remove("visible");
  }
});

//Projects filter

const workBtn = document.querySelector(".work_categories");
const projectContainer = document.querySelector(".work_projects");
const projects = document.querySelectorAll(".project");
workBtn.addEventListener("click", (event) => {
  const filter =
    event.target.dataset.filter || event.target.parentNode.dataset.filter;
  if (filter == null) {
    return;
  }
  projectContainer.classList.add("anim-out");
  setTimeout(() => {
    projects.forEach((project) => {
      if (filter == "*" || project.dataset.type == filter) {
        project.classList.remove("invisible");
      } else {
        project.classList.add("invisible");
      }
    });
    projectContainer.classList.remove("anim-out");
  }, 300);
});
