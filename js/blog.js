/* =====================================================
   STACKLY WEBSITE JAVASCRIPT
===================================================== */


/* =====================================================
   PRELOADER
===================================================== */

window.addEventListener("load", function () {

    const preloader = document.querySelector(".preloader");

    setTimeout(() => {

        preloader.style.opacity = "0";
        preloader.style.visibility = "hidden";

    }, 700);

});


/* =====================================================
   AOS INITIALIZATION
===================================================== */

AOS.init({

    duration: 900,
    easing: "ease-out-cubic",
    once: true,
    offset: 80,
    delay: 50

});


/* =====================================================
   HEADER SCROLL
===================================================== */

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});


/* =====================================================
   MOBILE MENU
===================================================== */

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const navActions = document.querySelector(".nav-actions");

let menuOpen = false;


menuToggle.addEventListener("click", () => {

    menuOpen = !menuOpen;

    if (menuOpen) {

        navMenu.style.display = "flex";
        navActions.style.display = "flex";

        navMenu.style.position = "absolute";
        navMenu.style.top = "82px";
        navMenu.style.left = "0";
        navMenu.style.width = "100%";
        navMenu.style.padding = "30px";
        navMenu.style.background = "#07343D";
        navMenu.style.flexDirection = "column";
        navMenu.style.alignItems = "flex-start";

        navActions.style.position = "absolute";
        navActions.style.top = "350px";
        navActions.style.left = "0";
        navActions.style.width = "100%";
        navActions.style.padding = "20px 30px 30px";
        navActions.style.background = "#07343D";

    } else {

        navMenu.style.display = "";
        navActions.style.display = "";

    }

});


/* =====================================================
   MOBILE NAV CLOSE
===================================================== */

document.querySelectorAll(".nav-link").forEach(link => {

    link.addEventListener("click", () => {

        if (window.innerWidth <= 900) {

            navMenu.style.display = "";
            navActions.style.display = "";

            menuOpen = false;

        }

    });

});


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");


window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {

            current = section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === `#${current}`) {

            link.classList.add("active");

        }

    });

});


/* =====================================================
   COUNTER ANIMATION
===================================================== */

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) {
                return;
            }

            const counter = entry.target;
            const target = Number(counter.dataset.target);

            let value = 0;

            const duration = 1800;
            const startTime = performance.now();


            function updateCounter(currentTime) {

                const progress =
                    Math.min((currentTime - startTime) / duration, 1);

                const eased =
                    1 - Math.pow(1 - progress, 3);

                value = Math.floor(target * eased);

                counter.textContent =
                    value.toLocaleString();


                if (progress < 1) {

                    requestAnimationFrame(updateCounter);

                } else {

                    counter.textContent =
                        target.toLocaleString();

                }

            }


            requestAnimationFrame(updateCounter);

            counterObserver.unobserve(counter);

        });

    },

    {
        threshold: 0.6
    }

);


counters.forEach(counter => {

    counterObserver.observe(counter);

});
/* =====================================================
   NEWSLETTER VALIDATION
   SUBMIT → 404.HTML
===================================================== */

const newsletterForm =
    document.getElementById("newsletterForm");

if (newsletterForm) {

    newsletterForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const emailInput =
            document.getElementById("footer-email");

        if (!emailInput) {
            return;
        }

        const emailValue =
            emailInput.value.trim();

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        /* ===============================
           EMPTY EMAIL
        =============================== */

        if (emailValue === "") {

            emailInput.focus();

            emailInput.setCustomValidity(
                "Please enter your email address."
            );

            emailInput.reportValidity();

            return;
        }


        /* ===============================
           INVALID EMAIL
        =============================== */

        if (!emailPattern.test(emailValue)) {

            emailInput.focus();

            emailInput.setCustomValidity(
                "Please enter a valid email address."
            );

            emailInput.reportValidity();

            return;
        }


        /* ===============================
           CLEAR VALIDATION
        =============================== */

        emailInput.setCustomValidity("");


        /* ===============================
           SUBMIT BUTTON
        =============================== */

        const submitButton =
            newsletterForm.querySelector(
                "button[type='submit']"
            );

        if (submitButton) {

            submitButton.disabled = true;

            const buttonText =
                submitButton.querySelector("span");

            if (buttonText) {
                buttonText.textContent =
                    "Submitting...";
            }
        }


        /* ===============================
           REDIRECT TO 404
        =============================== */

        setTimeout(function () {

            window.location.href = "404.html";

        }, 700);

    });


    /* ===============================
       CLEAR ERROR WHILE TYPING
    =============================== */

    const emailInput =
        document.getElementById("footer-email");

    if (emailInput) {

        emailInput.addEventListener("input", function () {

            emailInput.setCustomValidity("");

        });

    }

}
/* =====================================================
   STACKLY BPO - FRESH INSIGHTS FILTER
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const filterButtons = document.querySelectorAll(".fresh-filter-btn");
    const posts = document.querySelectorAll(".fresh-post-box");

    if (!filterButtons.length || !posts.length) {
        return;
    }


    /* =================================================
       FILTER BUTTON CLICK
    ================================================= */

    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const selectedFilter =
                this.getAttribute("data-filter");

            /* Remove active class */
            filterButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            /* Add active class */
            this.classList.add("active");


            /* Filter posts */
            posts.forEach(function (post) {

                const category =
                    post.getAttribute("data-category");

                if (
                    selectedFilter === "all" ||
                    category === selectedFilter
                ) {

                    post.style.display = "grid";

                    /* Small animation */
                    post.style.opacity = "0";
                    post.style.transform = "translateY(15px)";

                    requestAnimationFrame(function () {

                        post.style.transition =
                            "opacity 0.4s ease, transform 0.4s ease";

                        post.style.opacity = "1";
                        post.style.transform = "translateY(0)";

                    });

                } else {

                    post.style.display = "none";
                }

            });

        });

    });


    /* =================================================
       INITIAL STATE
    ================================================= */

    posts.forEach(function (post) {

        post.style.opacity = "1";
        post.style.transform = "translateY(0)";

    });

});