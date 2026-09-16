/* =====================================================
   STACKLY BPO ADMIN DASHBOARD JS
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* =================================================
       ELEMENTS
    ================================================= */

    const sidebar = document.getElementById("sidebar");
    const sidebarOverlay = document.getElementById("sidebarOverlay");
    const menuToggle = document.getElementById("menuToggle");
    const pageTitle = document.getElementById("pageTitle");

    const sidebarLinks = document.querySelectorAll(".sidebar-link");
    const pageElements = document.querySelectorAll(".page");

    const internalPageLinks = document.querySelectorAll(
        '[data-page]'
    );


    /* =================================================
       PAGE TITLES
    ================================================= */

    const pageTitles = {
        dashboard: "Dashboard",
        customers: "Customers",
        services: "Services",
        reports: "Reports",
        messages: "Messages",
        team: "Team",
        settings: "Settings"
    };


    /* =================================================
       AOS
    ================================================= */

    if (typeof AOS !== "undefined") {

        AOS.init({
            duration: 750,
            easing: "ease-out-cubic",
            once: true,
            offset: 40
        });

    }


    /* =================================================
       GSAP
    ================================================= */

    if (typeof gsap !== "undefined") {

        gsap.from(".dashboard-header", {
            opacity: 0,
            y: -15,
            duration: .7,
            ease: "power2.out"
        });

    }


    /* =================================================
       MOBILE SIDEBAR
    ================================================= */

    function openSidebar() {

        if (!sidebar) {
            return;
        }

        sidebar.classList.add("mobile-open");

        if (sidebarOverlay) {
            sidebarOverlay.classList.add("active");
            sidebarOverlay.setAttribute("aria-hidden", "false");
        }

        if (menuToggle) {
            menuToggle.classList.add("active");
            menuToggle.setAttribute("aria-expanded", "true");
            menuToggle.setAttribute("aria-label", "Close menu");
            menuToggle.setAttribute("title", "Close menu");
        }

        document.body.style.overflow = "hidden";
    }


    function closeSidebar() {

        if (!sidebar) {
            return;
        }

        sidebar.classList.remove("mobile-open");

        if (sidebarOverlay) {
            sidebarOverlay.classList.remove("active");
            sidebarOverlay.setAttribute("aria-hidden", "true");
        }

        if (menuToggle) {
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open menu");
            menuToggle.setAttribute("title", "Open menu");
        }

        document.body.style.overflow = "";
    }


    if (menuToggle) {

        menuToggle.addEventListener("click", function () {

            const isOpen =
                sidebar.classList.contains("mobile-open");

            if (isOpen) {
                closeSidebar();
            } else {
                openSidebar();
            }

        });

    }


    if (sidebarOverlay) {

        sidebarOverlay.addEventListener(
            "click",
            closeSidebar
        );

    }


    /* =================================================
       SHOW PAGE
    ================================================= */

    function showPage(pageId, updateHash = true) {

        if (!pageId) {
            pageId = "dashboard";
        }

        const targetPage =
            document.getElementById(pageId);

        if (!targetPage) {
            pageId = "dashboard";
        }

        /* Hide all pages */

        pageElements.forEach(function (page) {

            page.classList.remove("active-page");

        });


        /* Show selected page */

        const activePage =
            document.getElementById(pageId);

        if (activePage) {
            activePage.classList.add("active-page");
        }


        /* Active sidebar */

        sidebarLinks.forEach(function (link) {

            const linkPage =
                link.getAttribute("data-page");

            link.classList.toggle(
                "active",
                linkPage === pageId
            );

        });


        /* Header title */

        if (pageTitle) {

            pageTitle.textContent =
                pageTitles[pageId] || "Dashboard";

        }


        /* Hash */

        if (updateHash) {

            const newHash =
                "#" + pageId;

            if (window.location.hash !== newHash) {

                history.replaceState(
                    null,
                    "",
                    newHash
                );

            }

        }


        /* Close mobile menu */

        closeSidebar();


        /* Refresh AOS */

        if (typeof AOS !== "undefined") {

            setTimeout(function () {
                AOS.refresh();
            }, 100);

        }


        /* Animate active page */

        if (
            typeof gsap !== "undefined" &&
            activePage
        ) {

            gsap.fromTo(
                activePage,
                {
                    opacity: 0,
                    y: 8
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: .35,
                    ease: "power2.out"
                }
            );

        }


        /* Animate progress */

        setTimeout(function () {
            animateProgress(activePage);
        }, 150);

    }


    /* =================================================
       NAVIGATION
    ================================================= */

    internalPageLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const pageId =
                link.getAttribute("data-page");

            if (!pageId) {
                return;
            }

            event.preventDefault();

            showPage(pageId);

        });

    });


    /* =================================================
       HASH NAVIGATION
    ================================================= */

    function loadHashPage() {

        let pageId =
            window.location.hash.replace("#", "");

        if (!pageId) {
            pageId = "dashboard";
        }

        if (!document.getElementById(pageId)) {
            pageId = "dashboard";
        }

        showPage(pageId, false);

    }


    window.addEventListener(
        "hashchange",
        loadHashPage
    );


    /* =================================================
       COUNTERS
    ================================================= */

    function animateCounters(container) {

        if (!container) {
            return;
        }

        const counters =
            container.querySelectorAll(
                ".stat-number"
            );

        counters.forEach(function (counter) {

            if (counter.dataset.animated === "true") {
                return;
            }

            const target =
                parseFloat(
                    counter.dataset.value || "0"
                );

            const decimal =
                parseInt(
                    counter.dataset.decimal || "0",
                    10
                );

            const prefix =
                counter.dataset.prefix || "";

            const suffix =
                counter.dataset.suffix || "";

            const duration = 1200;

            const startTime = performance.now();

            function updateCounter(currentTime) {

                const elapsed =
                    currentTime - startTime;

                const progress =
                    Math.min(
                        elapsed / duration,
                        1
                    );

                const eased =
                    1 - Math.pow(
                        1 - progress,
                        3
                    );

                const value =
                    target * eased;

                const formatted =
                    value.toLocaleString(
                        "en-US",
                        {
                            minimumFractionDigits: decimal,
                            maximumFractionDigits: decimal
                        }
                    );

                counter.textContent =
                    prefix +
                    formatted +
                    suffix;

                if (progress < 1) {

                    requestAnimationFrame(
                        updateCounter
                    );

                } else {

                    counter.dataset.animated =
                        "true";

                }

            }

            requestAnimationFrame(
                updateCounter
            );

        });

    }


    /* =================================================
       PROGRESS BARS
    ================================================= */

    function animateProgress(container) {

        if (!container) {
            return;
        }

        const progressBars =
            container.querySelectorAll(
                "[data-progress]"
            );

        progressBars.forEach(function (bar) {

            const progress =
                bar.getAttribute(
                    "data-progress"
                );

            bar.style.width = "0%";

            setTimeout(function () {

                bar.style.width =
                    progress + "%";

            }, 100);

        });

    }


    /* =================================================
       SEARCH
    ================================================= */

    const searchButton =
        document.getElementById(
            "searchButton"
        );

    if (searchButton) {

        searchButton.addEventListener(
            "click",
            function () {

                const currentPage =
                    document.querySelector(
                        ".page.active-page"
                    );

                if (!currentPage) {
                    return;
                }

                const firstInput =
                    currentPage.querySelector(
                        "input"
                    );

                if (firstInput) {

                    firstInput.focus();

                } else {

                    searchButton.setAttribute(
                        "aria-label",
                        "Search is not available on this page"
                    );

                    setTimeout(function () {

                        searchButton.setAttribute(
                            "aria-label",
                            "Search"
                        );

                    }, 1800);

                }

            }
        );

    }


    /* =================================================
       NOTIFICATION
    ================================================= */

    const notificationButton =
        document.getElementById(
            "notificationButton"
        );

    if (notificationButton) {

        notificationButton.addEventListener(
            "click",
            function () {

                notificationButton.classList.toggle(
                    "notification-open"
                );

            }
        );

    }


    /* =================================================
       PROFILE MORE BUTTON
    ================================================= */

    const profileMore =
        document.querySelector(
            ".profile-more"
        );

    if (profileMore) {

        profileMore.addEventListener(
            "click",
            function () {

                profileMore.classList.toggle(
                    "profile-open"
                );

            }
        );

    }


    /* =================================================
       MORE ACTIVITY
    ================================================= */

    const moreButtons =
        document.querySelectorAll(
            ".more-button"
        );

    moreButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                button.classList.toggle(
                    "active"
                );

            }
        );

    });


    /* =================================================
       WINDOW RESIZE
    ================================================= */

    window.addEventListener(
        "resize",
        function () {

            if (
                window.innerWidth > 992 &&
                sidebar &&
                sidebar.classList.contains(
                    "mobile-open"
                )
            ) {

                closeSidebar();

            }

        }
    );


    /* =================================================
       ESC KEY
    ================================================= */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                closeSidebar();

            }

        }
    );


    /* =================================================
       INITIAL LOAD
    ================================================= */

    loadHashPage();

    const dashboard =
        document.getElementById(
            "dashboard"
        );

    if (dashboard) {

        animateCounters(dashboard);
        animateProgress(dashboard);

    }


    /* =================================================
       OBSERVER FOR PAGE COUNTERS
    ================================================= */

    const pageObserver =
        new MutationObserver(function () {

            const activePage =
                document.querySelector(
                    ".page.active-page"
                );

            if (activePage) {

                animateCounters(
                    activePage
                );

                animateProgress(
                    activePage
                );

            }

        });


    const pageContainer =
        document.querySelector(
            ".page-container"
        );

    if (pageContainer) {

        pageObserver.observe(
            pageContainer,
            {
                attributes: true,
                subtree: true,
                attributeFilter: [
                    "class"
                ]
            }
        );

    }

});
/* =====================================================
   MOBILE SIDEBAR MENU
   HAMBURGER ↔ X
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const menuToggle = document.getElementById("menuToggle");
    const sidebar = document.getElementById("sidebar");
    const sidebarOverlay = document.getElementById("sidebarOverlay");

    if (!menuToggle || !sidebar || !sidebarOverlay) {
        return;
    }

    function openMenu() {

        sidebar.classList.add("open");
        sidebarOverlay.classList.add("active");
        menuToggle.classList.add("active");

        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Close menu");
        menuToggle.setAttribute("title", "Close menu");

        document.body.classList.add("menu-open");
    }

    function closeMenu() {

        sidebar.classList.remove("open");
        sidebarOverlay.classList.remove("active");
        menuToggle.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open menu");
        menuToggle.setAttribute("title", "Open menu");

        document.body.classList.remove("menu-open");
    }

    function toggleMenu() {

        if (sidebar.classList.contains("open")) {
            closeMenu();
        } else {
            openMenu();
        }

    }

    /* Hamburger / X button */

    menuToggle.addEventListener("click", function () {
        toggleMenu();
    });

    /* Click outside sidebar */

    sidebarOverlay.addEventListener("click", function () {
        closeMenu();
    });

    /* Close menu when sidebar link is clicked */

    const sidebarLinks = sidebar.querySelectorAll(".sidebar-link");

    sidebarLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            if (window.innerWidth <= 1100) {
                closeMenu();
            }

        });

    });

    /* ESC key */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            closeMenu();
        }

    });

    /* Resize protection */

    window.addEventListener("resize", function () {

        if (window.innerWidth > 1100) {
            closeMenu();
        }

    });

});