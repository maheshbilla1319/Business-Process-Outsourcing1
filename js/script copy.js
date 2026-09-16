/* =====================================================
   STACKLY BPO - MAIN SCRIPT
   MOBILE MENU + PRELOADER
   BREAKPOINT: 796px
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ================= MOBILE MENU ================= */

    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (menuToggle && navMenu) {

        function openMenu() {
            navMenu.classList.add("mobile-active");
            menuToggle.classList.add("active");

            menuToggle.setAttribute("aria-expanded", "true");
            menuToggle.setAttribute("aria-label", "Close navigation menu");
            menuToggle.setAttribute("title", "Close navigation menu");

            document.body.classList.add("menu-open");
        }

        function closeMenu() {
            navMenu.classList.remove("mobile-active");
            menuToggle.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
            menuToggle.setAttribute("title", "Open navigation menu");

            document.body.classList.remove("menu-open");
        }

        /* Toggle button */

        menuToggle.addEventListener("click", function (event) {
            event.stopPropagation();

            const isOpen = navMenu.classList.contains("mobile-active");

            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        /* Close menu when clicking any navigation link */

        const navLinks = navMenu.querySelectorAll("a");

        navLinks.forEach(function (link) {
            link.addEventListener("click", function () {

                if (window.innerWidth <= 796) {
                    closeMenu();
                }

            });
        });

        /* Close when clicking outside */

        document.addEventListener("click", function (event) {

            if (window.innerWidth <= 796) {

                const clickedInsideMenu = navMenu.contains(event.target);
                const clickedToggle = menuToggle.contains(event.target);

                if (
                    navMenu.classList.contains("mobile-active") &&
                    !clickedInsideMenu &&
                    !clickedToggle
                ) {
                    closeMenu();
                }
            }

        });

        /* Close with Escape key */

        document.addEventListener("keydown", function (event) {

            if (event.key === "Escape") {
                closeMenu();
            }

        });

        /* Close menu when switching back to desktop */

        window.addEventListener("resize", function () {

            if (window.innerWidth > 796) {
                closeMenu();
            }

        });

    }


    /* ================= PRELOADER ================= */

    const preloader = document.getElementById("preloader");

    if (preloader) {

        window.addEventListener("load", function () {

            setTimeout(function () {

                preloader.style.opacity = "0";
                preloader.style.visibility = "hidden";
                preloader.style.pointerEvents = "none";

            }, 400);

        });

    }


    /* ================= AOS ================= */

    if (typeof AOS !== "undefined") {

        AOS.init({
            duration: 900,
            easing: "ease-out-cubic",
            once: true,
            offset: 80
        });

    }


    /* ================= SMOOTH SCROLL ================= */

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (
                targetId &&
                targetId !== "#" &&
                document.querySelector(targetId)
            ) {

                event.preventDefault();

                const target = document.querySelector(targetId);

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });

});



