const navToggleIcon = document.querySelector(".nav__toggle-icon");
const menu = document.querySelector(".menu");
const cover = document.querySelector(".cover");
const resumeMenuItems = document.querySelectorAll(".resume-menu__item");
const portfolioListItems = document.querySelectorAll(".portfolio-list__item");

navToggleIcon.addEventListener("click" , function() {
    this.classList.toggle("nav__toggle-icon--open");
    menu.classList.toggle("menu--open");
    cover.classList.toggle("cover--open")
})

resumeMenuItems.forEach( resumeMenuItem => {
    resumeMenuItem.addEventListener("click" , function() {
        document.querySelector(".resume-menu__item--active").classList.remove("resume-menu__item--active");
        document.querySelector(".resume-content--show").classList.remove("resume-content--show");
        this.classList.add("resume-menu__item--active");
        let contentId = this.getAttribute("data-content-id");
        document.querySelector(contentId).classList.add("resume-content--show");
    })
})

portfolioListItems.forEach( portfolioListItem => {
    portfolioListItem.addEventListener("click" , function() {
        document.querySelector(".portfolio-list__item--active").classList.remove("portfolio-list__item--active");
        document.querySelector(".portfolio-content--show").classList.remove("portfolio-content--show");
        this.classList.add("portfolio-list__item--active");
        let PoortfolioContentId = this.getAttribute("data-content-id");
        document.querySelector(PoortfolioContentId).classList.add("portfolio-content--show");
    })
})