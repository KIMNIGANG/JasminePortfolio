"use strict";

//function

//scroll to sector
function scrollToSelector(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
  selectNavItem(navItems[sectionIds.indexOf(selector)]);
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
  menu.classList.remove("open");
  const scrollTo = document.querySelector(link);
  scrollTo.scrollIntoView({ behavior: "smooth" });
  selectNavItem(target);
});

//navbar togglebtn
const togglebtn = document.querySelector(".toggle_btn");
const menu = document.querySelector(".navbar_menu");
togglebtn.addEventListener("click", () => {
  menu.classList.toggle("open");
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
  scrollToSelector(event.target.dataset.top);
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
  const active = document.querySelector(".category_btn.selected");
  active.classList.remove("selected");

  const target =
    event.target === "button" ? event.target : event.target.parentNode;
  event.target.classList.add("selected");

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

//navbar active when scrolled
const sectionIds = [
  "#home",
  "#about",
  "#skills",
  "#work",
  "#testimonials",
  "#contact",
];
const sections = sectionIds.map((id) => document.querySelector(id));
const navItems = sectionIds.map((id) =>
  document.querySelector(`[data-link="${id}"]`)
);

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];
function selectNavItem(selected) {
  selectedNavItem.classList.remove("active");
  selectedNavItem = selected;
  selectedNavItem.classList.add("active");
}

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.3,
};

const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      const index = sectionIds.indexOf(`#${entry.target.id}`);
      // 스크롤링이 아래로 되어서 페이지가 올라옴
      if (entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1;
      } else {
        selectedNavIndex = index - 1;
      }
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach((section) => observer.observe(section));

window.addEventListener("wheel", () => {
  if (window.scrollY === 0) {
    selectedNavIndex = 0;
  } else if (
    Math.round(window.scrollY + window.innerHeight) >=
    document.body.clientHeight
  ) {
    selectedNavIndex = 5;
  }

  selectNavItem(navItems[selectedNavIndex]);
});
