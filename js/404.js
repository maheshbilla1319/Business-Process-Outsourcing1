/* =====================================================
   PRELOADER
====================================================== */

window.addEventListener("load", () => {

    const preloader = document.querySelector(".preloader");

    if (!preloader) return;

    if (typeof gsap !== "undefined") {

        gsap.to(preloader, {
            opacity: 0,
            duration: 0.6,
            delay: 0.3,
            onComplete: () => {
                preloader.style.display = "none";
            }
        });

    } else {

        preloader.style.opacity = "0";

        setTimeout(() => {
            preloader.style.display = "none";
        }, 600);

    }

});


/* =====================================================
   AOS
====================================================== */

document.addEventListener("DOMContentLoaded", () => {

    if (typeof AOS !== "undefined") {

        AOS.init({
            duration: 900,
            easing: "ease-out-cubic",
            once: true,
            offset: 80
        });

    }

});


/* =====================================================
   MOBILE MENU
====================================================== */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navMenu.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

        menuToggle.setAttribute(
            "title",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

    });


    navMenu.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

            menuToggle.setAttribute(
                "title",
                "Open navigation menu"
            );

        });

    });

}


/* =====================================================
   GSAP 404 ANIMATION
====================================================== */

if (typeof gsap !== "undefined") {

    const timeline = gsap.timeline({
        delay: 0.65
    });


    /* ---------------------------------------------
       404 NUMBER
    --------------------------------------------- */

    timeline.from(".error-number span", {

        opacity: 0,
        y: 80,
        rotateX: -90,
        duration: 0.9,
        stagger: 0.15,
        ease: "back.out(1.7)"

    });


    /* ---------------------------------------------
       HEADING
    --------------------------------------------- */

    timeline.from(
        ".error-content h2",
        {
            opacity: 0,
            y: 25,
            duration: 0.7,
            ease: "power3.out"
        },
        "-=0.45"
    );


    /* ---------------------------------------------
       PARAGRAPH
    --------------------------------------------- */

    timeline.from(
        ".error-content > p",
        {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: "power2.out"
        },
        "-=0.35"
    );


    /* ---------------------------------------------
       BUTTONS
    --------------------------------------------- */

    timeline.from(
        ".error-actions",
        {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: "power2.out"
        },
        "-=0.25"
    );


    /* ---------------------------------------------
       VISUAL FRAME
    --------------------------------------------- */

    gsap.from(".visual-frame", {

        opacity: 0,
        scale: 0.85,
        rotate: -5,
        duration: 1.2,
        delay: 0.8,
        ease: "power3.out"

    });


    /* ---------------------------------------------
       FLOATING CARDS
    --------------------------------------------- */

    gsap.from(".floating-card", {

        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 1.3,
        stagger: 0.2,
        ease: "back.out(1.5)"

    });


    /* ---------------------------------------------
       VISUAL DOTS
    --------------------------------------------- */

    gsap.from(".visual-dot", {

        opacity: 0,
        scale: 0,
        duration: 0.5,
        delay: 1.5,
        stagger: 0.15,
        ease: "back.out(2)"

    });


    /* ---------------------------------------------
       MOUSE PARALLAX
    --------------------------------------------- */

    const visual = document.querySelector(".error-visual");

    if (visual) {

        visual.addEventListener("mousemove", event => {

            const rect = visual.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) /
                rect.width -
                0.5;

            const y =
                (event.clientY - rect.top) /
                rect.height -
                0.5;


            gsap.to(".visual-center", {

                x: x * 18,
                y: y * 18,
                duration: 0.5,
                ease: "power2.out"

            });


            gsap.to(".card-top", {

                x: x * -12,
                y: y * -12,
                duration: 0.6,
                ease: "power2.out"

            });


            gsap.to(".card-bottom", {

                x: x * 12,
                y: y * 12,
                duration: 0.6,
                ease: "power2.out"

            });

        });


        visual.addEventListener("mouseleave", () => {

            gsap.to(
                ".visual-center, .card-top, .card-bottom",
                {
                    x: 0,
                    y: 0,
                    duration: 0.7,
                    ease: "power3.out"
                }
            );

        });

    }

}


/* =====================================================
   BACK TO PREVIOUS PAGE
====================================================== */

function goBackPage() {

    /*
       If browser history has a previous page,
       go back to that page.
    */

    if (window.history.length > 1) {

        window.history.back();

    } else {

        /*
           If there is no previous history,
           go to Home page.
        */

        window.location.href = "index.html";

    }

}


/* =====================================================
   BACK BUTTON EVENT
====================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const backButton =
        document.getElementById("backPreviousPage");

    if (!backButton) return;

    backButton.addEventListener("click", event => {

        event.preventDefault();

        goBackPage();

    });

});