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

    }/* =====================================================
   STACKLY BPO SERVICES JS
   AOS + GSAP + MOBILE MENU + PRELOADER
===================================================== */

document.addEventListener("DOMContentLoaded", function () {


    /* =================================================
       PRELOADER
    ================================================= */

    const preloader = document.getElementById("preloader");

    window.addEventListener("load", function () {

        if (!preloader) return;

        setTimeout(function () {

            preloader.style.opacity = "0";
            preloader.style.visibility = "hidden";

            setTimeout(function () {

                preloader.remove();

            }, 500);

        }, 500);

    });


    /* =================================================
       MOBILE MENU
    ================================================= */

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    const menuOverlay = document.getElementById("menuOverlay");

    if (menuToggle && navMenu) {

        function openMenu() {

            navMenu.classList.add("active");

            menuToggle.classList.add("active");

            if (menuOverlay) {
                menuOverlay.classList.add("active");
            }

            menuToggle.setAttribute(
                "aria-expanded",
                "true"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Close navigation menu"
            );

            document.body.style.overflow = "hidden";

        }


        function closeMenu() {

            navMenu.classList.remove("active");

            menuToggle.classList.remove("active");

            if (menuOverlay) {
                menuOverlay.classList.remove("active");
            }

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

            document.body.style.overflow = "";

        }


        menuToggle.addEventListener(
            "click",
            function () {

                if (
                    navMenu.classList.contains("active")
                ) {

                    closeMenu();

                } else {

                    openMenu();

                }

            }
        );


        if (menuOverlay) {

            menuOverlay.addEventListener(
                "click",
                closeMenu
            );

        }


        /* CLOSE WHEN NAV LINK CLICKED */

        const navLinks =
            navMenu.querySelectorAll(".nav-link");

        navLinks.forEach(function (link) {

            link.addEventListener(
                "click",
                closeMenu
            );

        });


        /* CLOSE WITH ESC */

        document.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Escape") {

                    closeMenu();

                }

            }
        );


        /* RESET AFTER DESKTOP */

        window.addEventListener(
            "resize",
            function () {

                if (window.innerWidth > 796) {

                    closeMenu();

                }

            }
        );

    }


    /* =================================================
       AOS
    ================================================= */

    if (typeof AOS !== "undefined") {

        AOS.init({

            duration: 900,

            delay: 50,

            offset: 80,

            easing: "ease-out-cubic",

            once: true,

            mirror: false,

            anchorPlacement: "top-bottom"

        });

    }


    /* =================================================
       GSAP
    ================================================= */

    if (
        typeof gsap !== "undefined" &&
        typeof ScrollTrigger !== "undefined"
    ) {

        gsap.registerPlugin(ScrollTrigger);


        /* ---------------------------------------------
           HERO / STORY
        --------------------------------------------- */

        const storyContent =
            document.querySelector(".story-content");

        const storyImage =
            document.querySelector(".story-image");


        if (storyContent) {

            gsap.from(storyContent, {

                opacity: 0,

                x: -70,

                duration: 1.1,

                delay: 0.3,

                ease: "power3.out"

            });

        }


        if (storyImage) {

            gsap.from(storyImage, {

                opacity: 0,

                x: 70,

                duration: 1.1,

                delay: 0.45,

                ease: "power3.out"

            });

        }


        /* ---------------------------------------------
           SERVICE CARDS
        --------------------------------------------- */

        const serviceCards =
            gsap.utils.toArray(".service-card");


        serviceCards.forEach(function (card, index) {

            gsap.from(card, {

                scrollTrigger: {

                    trigger: card,

                    start: "top 88%",

                    toggleActions:
                        "play none none reverse"

                },

                opacity: 0,

                y: 60,

                duration: 0.7,

                delay: index * 0.08,

                ease: "power3.out"

            });

        });


        /* ---------------------------------------------
           EXPERIENCE IMAGES
        --------------------------------------------- */

        const experienceImages =
            gsap.utils.toArray(".experience-image");


        experienceImages.forEach(function (image) {

            gsap.from(image, {

                scrollTrigger: {

                    trigger: image,

                    start: "top 85%",

                    toggleActions:
                        "play none none reverse"

                },

                opacity: 0,

                scale: 0.94,

                duration: 0.9,

                ease: "power3.out"

            });

        });


        /* ---------------------------------------------
           EXPERIENCE CONTENT
        --------------------------------------------- */

        const experienceContent =
            gsap.utils.toArray(".experience-content");


        experienceContent.forEach(function (content) {

            gsap.from(content, {

                scrollTrigger: {

                    trigger: content,

                    start: "top 85%",

                    toggleActions:
                        "play none none reverse"

                },

                opacity: 0,

                x: 50,

                duration: 0.9,

                ease: "power3.out"

            });

        });


        /* ---------------------------------------------
           OPERATION ITEMS
        --------------------------------------------- */

        const operationItems =
            gsap.utils.toArray(".operation-item");


        operationItems.forEach(function (item, index) {

            gsap.from(item, {

                scrollTrigger: {

                    trigger: item,

                    start: "top 90%",

                    toggleActions:
                        "play none none reverse"

                },

                opacity: 0,

                x: 45,

                duration: 0.65,

                delay: index * 0.08,

                ease: "power2.out"

            });

        });


        /* ---------------------------------------------
           SERVICE GRID CARDS
        --------------------------------------------- */

        const gridCards =
            gsap.utils.toArray(".service-grid-card");


        gridCards.forEach(function (card, index) {

            gsap.from(card, {

                scrollTrigger: {

                    trigger: card,

                    start: "top 88%",

                    toggleActions:
                        "play none none reverse"

                },

                opacity: 0,

                y: 55,

                scale: 0.97,

                duration: 0.75,

                delay: index * 0.1,

                ease: "power3.out"

            });

        });


        /* ---------------------------------------------
           CTA
        --------------------------------------------- */

        const cta =
            document.querySelector(".cta-content");


        if (cta) {

            gsap.from(cta, {

                scrollTrigger: {

                    trigger: ".cta-section",

                    start: "top 80%",

                    toggleActions:
                        "play none none reverse"

                },

                opacity: 0,

                y: 50,

                duration: 0.9,

                ease: "power3.out"

            });

        }


        /* ---------------------------------------------
           FOOTER
        --------------------------------------------- */

        const footerColumns =
            gsap.utils.toArray(".footer-column");


        footerColumns.forEach(function (column, index) {

            gsap.from(column, {

                scrollTrigger: {

                    trigger: column,

                    start: "top 92%",

                    toggleActions:
                        "play none none reverse"

                },

                opacity: 0,

                y: 30,

                duration: 0.6,

                delay: index * 0.08,

                ease: "power2.out"

            });

        });


        /* ---------------------------------------------
           REFRESH SCROLLTRIGGER
        --------------------------------------------- */

        window.addEventListener(
            "load",
            function () {

                ScrollTrigger.refresh();

            }
        );

    }


    /* =================================================
       NEWSLETTER VALIDATION
    ================================================= */

    const newsletterForm =
        document.getElementById("newsletterForm");


    if (newsletterForm) {

        newsletterForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const emailInput =
                    document.getElementById("footer-email");

                if (!emailInput) return;

                const email =
                    emailInput.value.trim();

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (!emailPattern.test(email)) {

                    emailInput.focus();

                    emailInput.setAttribute(
                        "aria-invalid",
                        "true"
                    );

                    return;

                }


                emailInput.setAttribute(
                    "aria-invalid",
                    "false"
                );


                /* SIMPLE SUCCESS STATE */

                const button =
                    newsletterForm.querySelector("button");

                const originalText =
                    button.innerHTML;

                button.innerHTML =
                    '<span>Submitted</span>' +
                    '<i class="fa-solid fa-check"></i>';

                button.disabled = true;


                setTimeout(function () {

                    emailInput.value = "";

                    button.innerHTML =
                        originalText;

                    button.disabled = false;

                }, 2500);

            }
        );

    }


    /* =================================================
       IMAGE LOAD SAFETY
    ================================================= */

    const images =
        document.querySelectorAll("img");


    images.forEach(function (image) {

        image.addEventListener(
            "error",
            function () {

                image.style.visibility = "hidden";

            }
        );

    });


    /* =================================================
       ACTIVE NAVIGATION
    ================================================= */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    document
        .querySelectorAll(".nav-link")
        .forEach(function (link) {

            const linkPage =
                link.getAttribute("href")
                    ?.split("/")
                    .pop()
                    .toLowerCase();


            if (
                linkPage &&
                linkPage === currentPage
            ) {

                link.classList.add("active");

            }

        });


});

}