/* =========================================================
   STACKLY BPO VIEWER DASHBOARD
   viewer.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    "use strict";


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const sidebar = document.getElementById("sidebar");
    const sidebarOverlay = document.getElementById("sidebarOverlay");

    const menuToggle = document.getElementById("menuToggle");
    const sidebarClose = document.getElementById("sidebarClose");

    const pageTitle = document.getElementById("pageTitle");

    const navLinks = document.querySelectorAll(".nav-link");
    const pages = document.querySelectorAll(".page");

    const internalLinks = document.querySelectorAll(
        '[data-page]'
    );


    /* =====================================================
       PAGE NAMES
    ===================================================== */

    const pageNames = {

        dashboard: "Dashboard",
        overview: "Overview",
        customers: "Customers",
        services: "Services",
        reports: "Reports",
        messages: "Messages",
        team: "Team"

    };


    /* =====================================================
       MOBILE SIDEBAR OPEN
    ===================================================== */

    function openSidebar() {

        if (!sidebar) {
            return;
        }

        sidebar.classList.add("open");

        if (sidebarOverlay) {
            sidebarOverlay.classList.add("active");
        }

        document.body.classList.add("menu-open");

        if (menuToggle) {
            menuToggle.setAttribute(
                "aria-expanded",
                "true"
            );
        }

    }


    /* =====================================================
       MOBILE SIDEBAR CLOSE
    ===================================================== */

    function closeSidebar() {

        if (sidebar) {
            sidebar.classList.remove("open");
            sidebar.classList.remove("active");
        }

        if (sidebarOverlay) {
            sidebarOverlay.classList.remove("active");
        }

        document.body.classList.remove("menu-open");

        if (menuToggle) {
            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );
        }

    }


    /* =====================================================
       MENU TOGGLE
    ===================================================== */

    if (menuToggle) {

        menuToggle.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                if (
                    sidebar &&
                    (
                        sidebar.classList.contains("open") ||
                        sidebar.classList.contains("active")
                    )
                ) {

                    closeSidebar();

                } else {

                    openSidebar();

                }

            }
        );

    }


    /* =====================================================
       X CLOSE BUTTON
    ===================================================== */

    if (sidebarClose) {

        sidebarClose.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                closeSidebar();

            }
        );

    }


    /* =====================================================
       OVERLAY CLOSE
    ===================================================== */

    if (sidebarOverlay) {

        sidebarOverlay.addEventListener(
            "click",
            function () {

                closeSidebar();

            }
        );

    }


    /* =====================================================
       ESC KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                closeSidebar();

            }

        }
    );


    /* =====================================================
       PAGE SHOW FUNCTION
    ===================================================== */

    function showPage(
        pageId,
        updateHash = true
    ) {

        /*
         * Default page
         */

        if (!pageId) {

            pageId = "overview";

        }


        /*
         * Check page exists
         */

        const selectedPage =
            document.getElementById(pageId);


        /*
         * Dashboard is available
         */

        if (!selectedPage) {

            pageId = "overview";

        }


        /*
         * Hide all pages
         */

        pages.forEach(function (page) {

            page.classList.remove(
                "active-page"
            );

            page.classList.remove(
                "active"
            );

        });


        /*
         * Show selected page
         */

        const activePage =
            document.getElementById(pageId);


        if (activePage) {

            activePage.classList.add(
                "active-page"
            );

            activePage.classList.add(
                "active"
            );

        }


        /*
         * Navigation active state
         */

        navLinks.forEach(function (link) {

            const linkPage =
                link.getAttribute(
                    "data-page"
                );

            link.classList.remove(
                "active"
            );


            if (linkPage === pageId) {

                link.classList.add(
                    "active"
                );

            }

        });


        /*
         * Dashboard / Overview special handling
         */

        if (
            pageId === "dashboard" ||
            pageId === "overview"
        ) {

            navLinks.forEach(function (link) {

                const linkPage =
                    link.getAttribute(
                        "data-page"
                    );

                if (linkPage === pageId) {

                    link.classList.add(
                        "active"
                    );

                }

            });

        }


        /*
         * Header title
         */

        if (pageTitle) {

            pageTitle.textContent =
                pageNames[pageId] ||
                "Overview";

        }


        /*
         * Browser URL
         */

        if (updateHash) {

            history.replaceState(
                null,
                "",
                "#" + pageId
            );

        }


        /*
         * Close mobile sidebar
         */

        closeSidebar();


        /*
         * Scroll page top
         */

        window.scrollTo({

            top: 0,
            behavior: "smooth"

        });


        /*
         * Refresh AOS
         */

        if (
            typeof AOS !== "undefined"
        ) {

            setTimeout(
                function () {

                    AOS.refreshHard();

                },
                150
            );

        }

    }


    /* =====================================================
       NAVIGATION LINKS
    ===================================================== */

    navLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const pageId =
                    link.getAttribute(
                        "data-page"
                    );

                const href =
                    link.getAttribute(
                        "href"
                    );


                /*
                 * Internal dashboard pages
                 */

                if (
                    pageId &&
                    href &&
                    href.startsWith("#")
                ) {

                    event.preventDefault();

                    showPage(
                        pageId,
                        true
                    );

                }

            }
        );

    });


    /* =====================================================
       DATA-PAGE INTERNAL LINKS
       Example:
       View All
       Dashboard links
    ===================================================== */

    internalLinks.forEach(function (link) {

        /*
         * Skip sidebar nav because already handled
         */

        if (
            link.classList.contains(
                "nav-link"
            )
        ) {

            return;

        }


        link.addEventListener(
            "click",
            function (event) {

                const pageId =
                    link.getAttribute(
                        "data-page"
                    );

                const href =
                    link.getAttribute(
                        "href"
                    );


                if (
                    pageId &&
                    href &&
                    href.startsWith("#")
                ) {

                    event.preventDefault();

                    showPage(
                        pageId,
                        true
                    );

                }

            }
        );

    });


    /* =====================================================
       HASH PAGE LOAD
    ===================================================== */

    function loadHashPage() {

        let hash =
            window.location.hash
                .replace("#", "")
                .trim();


        /*
         * Dashboard is valid
         */

        if (
            hash &&
            pageNames[hash]
        ) {

            showPage(
                hash,
                false
            );

        } else {

            /*
             * Default Overview
             */

            showPage(
                "overview",
                false
            );

        }

    }


    /* =====================================================
       HASH CHANGE
    ===================================================== */

    window.addEventListener(
        "hashchange",
        function () {

            loadHashPage();

        }
    );


    /* =====================================================
       CLOSE MOBILE MENU AFTER PAGE CLICK
    ===================================================== */

    document.querySelectorAll(
        ".sidebar a"
    ).forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                if (
                    window.innerWidth <= 992
                ) {

                    setTimeout(
                        closeSidebar,
                        100
                    );

                }

            }
        );

    });


    /* =====================================================
       CLOSE MENU WHEN CLICKING OUTSIDE SIDEBAR
    ===================================================== */

    document.addEventListener(
        "click",
        function (event) {

            if (
                !sidebar ||
                !sidebar.classList.contains(
                    "open"
                )
            ) {

                return;

            }


            const clickedInsideSidebar =
                sidebar.contains(
                    event.target
                );

            const clickedMenuButton =
                menuToggle &&
                menuToggle.contains(
                    event.target
                );


            if (
                !clickedInsideSidebar &&
                !clickedMenuButton
            ) {

                closeSidebar();

            }

        }
    );


    /* =====================================================
       WINDOW RESIZE
    ===================================================== */

    window.addEventListener(
        "resize",
        function () {

            if (
                window.innerWidth > 992
            ) {

                closeSidebar();

            }

        }
    );


    /* =====================================================
       BODY SCROLL CONTROL
    ===================================================== */

    /*
     * CSS handles this using:
     *
     * body.menu-open {
     *     overflow: hidden;
     * }
     *
     * This JS only adds/removes the class.
     */


    /* =====================================================
       404 LINKS
    ===================================================== */

    document.querySelectorAll(
        'a[href="404.html"]'
    ).forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                window.location.href =
                    "404.html";

            }
        );

    });


    /* =====================================================
       REDIRECT-404 BUTTONS
    ===================================================== */

    document.querySelectorAll(
        ".redirect-404"
    ).forEach(function (button) {

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                window.location.href =
                    "404.html";

            }
        );

    });


    /* =====================================================
       AOS INITIALIZATION
    ===================================================== */

    if (
        typeof AOS !== "undefined"
    ) {

        AOS.init({

            duration: 800,

            easing: "ease-out-cubic",

            once: true,

            offset: 70,

            disable: false

        });

    }


    /* =====================================================
       GSAP INTRO ANIMATION
    ===================================================== */

    if (
        typeof gsap !== "undefined"
    ) {

        gsap.from(
            ".dashboard-header",
            {

                y: -20,

                opacity: 0,

                duration: 0.7,

                ease: "power3.out"

            }
        );


        gsap.from(
            ".sidebar",
            {

                x: -25,

                opacity: 0,

                duration: 0.7,

                ease: "power3.out"

            }
        );


        gsap.from(
            ".dashboard-stat-card",
            {

                y: 25,

                opacity: 0,

                duration: 0.6,

                stagger: 0.08,

                delay: 0.2,

                ease: "power3.out"

            }
        );

    }


    /* =====================================================
       PROGRESS BAR ANIMATION
    ===================================================== */

    const progressBars =
        document.querySelectorAll(
            ".progress-fill, .dashboard-progress span"
        );


    progressBars.forEach(function (bar) {

        let targetWidth =
            bar.getAttribute(
                "data-progress"
            );


        /*
         * Existing CSS class widths
         */

        if (!targetWidth) {

            if (
                bar.classList.contains(
                    "dashboard-progress-92"
                ) ||
                bar.classList.contains(
                    "progress-92"
                )
            ) {

                targetWidth = "92%";

            } else if (
                bar.classList.contains(
                    "dashboard-progress-86"
                ) ||
                bar.classList.contains(
                    "progress-86"
                )
            ) {

                targetWidth = "86%";

            } else if (
                bar.classList.contains(
                    "dashboard-progress-78"
                ) ||
                bar.classList.contains(
                    "progress-78"
                )
            ) {

                targetWidth = "78%";

            } else if (
                bar.classList.contains(
                    "dashboard-progress-94"
                ) ||
                bar.classList.contains(
                    "progress-94"
                )
            ) {

                targetWidth = "94%";

            }

        }


        if (targetWidth) {

            /*
             * Only animate dashboard progress
             * if inline width is not required.
             */

            setTimeout(
                function () {

                    bar.classList.add(
                        "progress-animated"
                    );

                },
                250
            );

        }

    });


    /* =====================================================
       COUNTER ANIMATION
       Works with:
       data-count="1248"
    ===================================================== */

    const counters =
        document.querySelectorAll(
            "[data-count]"
        );


    counters.forEach(function (counter) {

        const target =
            parseFloat(
                counter.getAttribute(
                    "data-count"
                )
            );


        if (
            Number.isNaN(target)
        ) {

            return;

        }


        let current = 0;

        const duration = 1200;

        const intervalTime = 20;

        const steps =
            duration / intervalTime;

        const increment =
            target / steps;


        const timer =
            setInterval(
                function () {

                    current += increment;


                    if (
                        current >= target
                    ) {

                        current =
                            target;

                        clearInterval(
                            timer
                        );

                    }


                    if (
                        Number.isInteger(
                            target
                        )
                    ) {

                        counter.textContent =
                            Math.floor(
                                current
                            ).toLocaleString();

                    } else {

                        counter.textContent =
                            current.toFixed(
                                1
                            );

                    }

                },
                intervalTime
            );

    });


    /* =====================================================
       IMAGE ERROR FALLBACK
    ===================================================== */

    document.querySelectorAll(
        "img"
    ).forEach(function (image) {

        image.addEventListener(
            "error",
            function () {

                image.classList.add(
                    "image-error"
                );

            }
        );

    });


    /* =====================================================
       ACCESSIBILITY
    ===================================================== */

    if (menuToggle) {

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    /* =====================================================
       INITIAL PAGE
    ===================================================== */

    loadHashPage();


    /* =====================================================
       FINAL READY
    ===================================================== */

    document.body.classList.add(
        "dashboard-ready"
    );

});
sidebar.classList.add("open");
sidebar.classList.remove("open");