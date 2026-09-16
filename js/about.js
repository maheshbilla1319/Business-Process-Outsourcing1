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
   MOBILE MENU TOGGLE
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (!menuToggle || !navMenu) return;

    /* OPEN / CLOSE MENU */
    menuToggle.addEventListener("click", function (event) {

        event.stopPropagation();

        navMenu.classList.toggle("open");
        menuToggle.classList.toggle("active");

        const isOpen = navMenu.classList.contains("open");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );
    });


    /* CLOSE MENU AFTER CLICKING LINK */
    const navLinks = navMenu.querySelectorAll(".nav-link");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navMenu.classList.remove("open");
            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );
        });

    });


    /* CLOSE WHEN CLICKING OUTSIDE */
    document.addEventListener("click", function (event) {

        if (
            navMenu.classList.contains("open") &&
            !navMenu.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {

            navMenu.classList.remove("open");
            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );
        }

    });


    /* CLOSE ON ESCAPE */
    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            navMenu.classList.remove("open");
            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );
        }

    });


    /* CLOSE WHEN RESIZING TO DESKTOP */
    window.addEventListener("resize", function () {

        if (window.innerWidth > 900) {

            navMenu.classList.remove("open");
            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });

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
   STACKLY BPO - CTA JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* =================================================
       CTA ELEMENTS
    ================================================= */

    const ctaSection = document.querySelector(".bpo-cta");

    if (!ctaSection) return;


    /* =================================================
       CTA STAT CARD REVEAL
    ================================================= */

    const statCards = ctaSection.querySelectorAll(".cta-stat-card");

    statCards.forEach(function (card, index) {

        card.style.opacity = "0";
        card.style.transform =
            index === 0
                ? "translateY(30px) rotate(-5deg)"
                : "translateY(30px) rotate(4deg)";

        card.style.transition =
            "opacity 0.7s ease, transform 0.7s ease";

    });


    /* =================================================
       INTERSECTION OBSERVER
    ================================================= */

    const ctaObserver = new IntersectionObserver(
        function (entries, observer) {

            entries.forEach(function (entry) {

                if (!entry.isIntersecting) return;

                const cards =
                    entry.target.querySelectorAll(".cta-stat-card");

                cards.forEach(function (card, index) {

                    setTimeout(function () {

                        card.style.opacity = "1";

                        if (index === 0) {
                            card.style.transform =
                                "translateY(0) rotate(-5deg)";
                        } else {
                            card.style.transform =
                                "translateY(0) rotate(4deg)";
                        }

                    }, index * 250);

                });

                observer.unobserve(entry.target);

            });

        },
        {
            threshold: 0.25
        }
    );

    ctaObserver.observe(ctaSection);


    /* =================================================
       1000+ COUNTER ANIMATION
    ================================================= */

    const statNumber =
        ctaSection.querySelector(".cta-stat-small strong");

    if (statNumber) {

        let counterStarted = false;

        const counterObserver = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (!entry.isIntersecting || counterStarted) {
                        return;
                    }

                    counterStarted = true;

                    let current = 0;
                    const target = 1000;
                    const duration = 1600;
                    const stepTime = 20;
                    const increment =
                        target / (duration / stepTime);

                    const counter = setInterval(function () {

                        current += increment;

                        if (current >= target) {
                            current = target;
                            clearInterval(counter);
                        }

                        statNumber.textContent =
                            Math.floor(current) + "+";

                    }, stepTime);

                    observer.unobserve(entry.target);

                });

            },
            {
                threshold: 0.5
            }
        );

        counterObserver.observe(statNumber);
    }


    /* =================================================
       CTA PRIMARY BUTTON
    ================================================= */

    const primaryButton =
        ctaSection.querySelector(".bpo-cta-primary");

    if (primaryButton) {

        primaryButton.addEventListener("mouseenter", function () {

            const icon = this.querySelector("i");

            if (icon) {
                icon.style.transform = "translateX(5px)";
            }

        });

        primaryButton.addEventListener("mouseleave", function () {

            const icon = this.querySelector("i");

            if (icon) {
                icon.style.transform = "translateX(0)";
            }

        });
    }


    /* =================================================
       CTA MOUSE MOVEMENT
       Desktop only
    ================================================= */

    const visual =
        ctaSection.querySelector(".bpo-cta-visual");

    const mainCard =
        ctaSection.querySelector(".cta-stat-main");

    const smallCard =
        ctaSection.querySelector(".cta-stat-small");

    if (
        visual &&
        mainCard &&
        smallCard &&
        window.innerWidth > 796
    ) {

        visual.addEventListener("mousemove", function (event) {

            const rect = visual.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) / rect.width - 0.5;

            const y =
                (event.clientY - rect.top) / rect.height - 0.5;

            mainCard.style.transform =
                `translate(${x * 10}px, ${y * 10}px) rotate(-5deg)`;

            smallCard.style.transform =
                `translate(${x * -15}px, ${y * -15}px) rotate(4deg)`;

        });


        visual.addEventListener("mouseleave", function () {

            mainCard.style.transform =
                "translate(0, 0) rotate(-5deg)";

            smallCard.style.transform =
                "translate(0, 0) rotate(4deg)";

        });

    }


    /* =================================================
       AOS INITIALIZATION
       Only if AOS is included
    ================================================= */

    if (typeof AOS !== "undefined") {

        AOS.init({
            duration: 900,
            easing: "ease-out-cubic",
            once: true,
            offset: 80
        });

    }

});
