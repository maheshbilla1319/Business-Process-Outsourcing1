/* =====================================================
   STACKLY BPO WEBSITE JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", function () {


    /* =================================================
       PRELOADER
    ================================================= */

    const preloader = document.querySelector(".preloader");

    if (preloader) {

        window.addEventListener("load", function () {

            setTimeout(function () {

                preloader.classList.add("hide");

                setTimeout(function () {
                    preloader.style.display = "none";
                }, 500);

            }, 700);

        });

    }


    /* =================================================
       AOS INITIALIZATION
    ================================================= */

    if (typeof AOS !== "undefined") {

        AOS.init({
            duration: 900,
            easing: "ease-out-cubic",
            once: true,
            offset: 80,
            delay: 50
        });

    }


    /* =================================================
       HEADER SCROLL
    ================================================= */

    const header = document.querySelector(".header");

    function headerScroll() {

        if (!header) return;

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    window.addEventListener(
        "scroll",
        headerScroll,
        { passive: true }
    );

    headerScroll();


    /* =================================================
       MOBILE MENU
    ================================================= */

    const menuToggle =
        document.querySelector(".menu-toggle");

    const mobileNavigation =
        document.querySelector(".mobile-navigation");


    if (menuToggle && mobileNavigation) {


        function openMenu() {

            mobileNavigation.classList.add("open");

            menuToggle.classList.add("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "true"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Close menu"
            );

            document.body.classList.add(
                "mobile-menu-open"
            );

        }


        function closeMenu() {

            mobileNavigation.classList.remove("open");

            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open menu"
            );

            document.body.classList.remove(
                "mobile-menu-open"
            );

        }


        menuToggle.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                if (
                    mobileNavigation.classList.contains(
                        "open"
                    )
                ) {
                    closeMenu();
                } else {
                    openMenu();
                }

            }
        );


        /* ---------------------------------------------
           MOBILE LINKS
        --------------------------------------------- */

        const mobileLinks =
            mobileNavigation.querySelectorAll("a");


        mobileLinks.forEach(function (link) {

            link.addEventListener(
                "click",
                function () {
                    closeMenu();
                }
            );

        });


        /* ---------------------------------------------
           CLICK OUTSIDE
        --------------------------------------------- */

        document.addEventListener(
            "click",
            function (event) {

                if (
                    !mobileNavigation.classList.contains(
                        "open"
                    )
                ) {
                    return;
                }

                const insideMenu =
                    mobileNavigation.contains(
                        event.target
                    );

                const insideButton =
                    menuToggle.contains(
                        event.target
                    );

                if (!insideMenu && !insideButton) {
                    closeMenu();
                }

            }
        );


        /* ---------------------------------------------
           ESC KEY
        --------------------------------------------- */

        document.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Escape") {
                    closeMenu();
                }

            }
        );


        /* ---------------------------------------------
           DESKTOP RESIZE
        --------------------------------------------- */

        window.addEventListener(
            "resize",
            function () {

                if (window.innerWidth > 900) {
                    closeMenu();
                }

            }
        );

    }


    /* =================================================
       ACTIVE NAVIGATION
    ================================================= */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase() || "index.html";


    const allNavigationLinks =
        document.querySelectorAll(
            ".nav-link, .mobile-nav-link"
        );


    allNavigationLinks.forEach(function (link) {

        const href =
            link.getAttribute("href");


        if (!href) return;


        if (
            href.startsWith("#") ||
            href.startsWith("http") ||
            href.startsWith("mailto:")
        ) {
            return;
        }


        const linkPage =
            href
                .split("/")
                .pop()
                .toLowerCase();


        if (linkPage === currentPage) {

            link.classList.add("active");


            if (
                link.classList.contains("nav-link")
            ) {

                link.setAttribute(
                    "aria-current",
                    "page"
                );

            }

        } else {

            link.classList.remove("active");


            if (
                link.classList.contains("nav-link")
            ) {

                link.removeAttribute(
                    "aria-current"
                );

            }

        }

    });


    /* =================================================
       COUNTER ANIMATION
    ================================================= */

    const counters =
        document.querySelectorAll(".counter");


    if (
        counters.length &&
        "IntersectionObserver" in window
    ) {


        const counterObserver =
            new IntersectionObserver(

                function (entries, observer) {

                    entries.forEach(function (entry) {

                        if (!entry.isIntersecting) {
                            return;
                        }


                        const counter =
                            entry.target;


                        const target =
                            Number(
                                counter.dataset.target
                            );


                        if (
                            Number.isNaN(target) ||
                            target < 0
                        ) {

                            observer.unobserve(
                                counter
                            );

                            return;

                        }


                        const duration = 1800;

                        const startTime =
                            performance.now();


                        function updateCounter(
                            currentTime
                        ) {

                            const progress =
                                Math.min(
                                    (
                                        currentTime -
                                        startTime
                                    ) / duration,
                                    1
                                );


                            const eased =
                                1 -
                                Math.pow(
                                    1 - progress,
                                    3
                                );


                            const value =
                                Math.floor(
                                    target * eased
                                );


                            counter.textContent =
                                value.toLocaleString();


                            if (progress < 1) {

                                requestAnimationFrame(
                                    updateCounter
                                );

                            } else {

                                counter.textContent =
                                    target.toLocaleString();

                            }

                        }


                        requestAnimationFrame(
                            updateCounter
                        );


                        observer.unobserve(
                            counter
                        );

                    });

                },

                {
                    threshold: 0.6
                }

            );


        counters.forEach(function (counter) {

            counterObserver.observe(counter);

        });


    } else {


        /* ---------------------------------------------
           COUNTER FALLBACK
        --------------------------------------------- */

        counters.forEach(function (counter) {

            const target =
                Number(
                    counter.dataset.target
                );


            if (!Number.isNaN(target)) {

                counter.textContent =
                    target.toLocaleString();

            }

        });

    }


    /* =================================================
       ENQUIRY FORM
       VALIDATION → REDIRECT 404
    ================================================= */

    const enquiryForm =
        document.querySelector(".enquiry-form");


    if (enquiryForm) {


        enquiryForm.addEventListener(
            "submit",
            function (event) {

                /*
                 * IMPORTANT:
                 * Browser HTML validation runs first.
                 *
                 * If required fields are empty
                 * or email is invalid,
                 * this submit event will NOT
                 * continue to redirect.
                 */


                if (!enquiryForm.checkValidity()) {

                    event.preventDefault();

                    /*
                     * Show browser's native
                     * validation message.
                     */

                    enquiryForm.reportValidity();

                    return;

                }


                /*
                 * All required fields are valid.
                 * Stop normal form submission.
                 */

                event.preventDefault();


                /*
                 * Redirect to 404 page.
                 */

                window.location.href =
                    "404.html";

            }
        );

    }


    /* =================================================
       CONTACT LINKS
       CLOSE MOBILE MENU
    ================================================= */

    const contactLinks =
        document.querySelectorAll(
            'a[href="contact.html"]'
        );


    contactLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                if (mobileNavigation) {

                    mobileNavigation.classList.remove(
                        "open"
                    );

                }


                if (menuToggle) {

                    menuToggle.classList.remove(
                        "active"
                    );

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    menuToggle.setAttribute(
                        "aria-label",
                        "Open menu"
                    );

                }


                document.body.classList.remove(
                    "mobile-menu-open"
                );

            }
        );

    });


    /* =================================================
       GSAP ANIMATION
    ================================================= */

    if (typeof gsap !== "undefined") {


        /* ---------------------------------------------
           ABOUT HERO CONTENT
        --------------------------------------------- */

        const aboutHeroContent =
            document.querySelector(
                ".about-hero-content"
            );


        if (aboutHeroContent) {

            gsap.from(
                aboutHeroContent,
                {
                    opacity: 0,
                    y: 30,
                    duration: 1,
                    ease: "power3.out",
                    delay: 0.3
                }
            );

        }


        /* ---------------------------------------------
           ABOUT HERO IMAGE
        --------------------------------------------- */

        const aboutHeroImage =
            document.querySelector(
                ".about-hero-image"
            );


        if (aboutHeroImage) {

            gsap.from(
                aboutHeroImage,
                {
                    opacity: 0,
                    x: 40,
                    duration: 1,
                    ease: "power3.out",
                    delay: 0.45
                }
            );

        }

    }

});
/* =====================================================
   CONTACT FORM VALIDATION
====================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const contactForm = document.getElementById("contactForm");
    const formSuccess = document.getElementById("formSuccess");

    if (!contactForm) return;


    /* ================================================
       VALIDATION FUNCTIONS
    ================================================= */

    function showError(input, message) {

        const formGroup = input.closest(".form-group");
        const errorMessage =
            formGroup.querySelector(".error-message");

        input.classList.add("input-error");

        if (errorMessage) {
            errorMessage.textContent = message;
            errorMessage.classList.add("show");
        }
    }


    function clearError(input) {

        const formGroup = input.closest(".form-group");
        const errorMessage =
            formGroup.querySelector(".error-message");

        input.classList.remove("input-error");

        if (errorMessage) {
            errorMessage.textContent = "";
            errorMessage.classList.remove("show");
        }
    }


    function validateName() {

        const input = document.getElementById("name");
        const value = input.value.trim();

        if (value === "") {

            showError(
                input,
                "Please enter your full name."
            );

            return false;
        }

        if (value.length < 2) {

            showError(
                input,
                "Name must be at least 2 characters."
            );

            return false;
        }

        clearError(input);

        return true;
    }


    function validateEmail() {

        const input = document.getElementById("email");
        const value = input.value.trim();

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (value === "") {

            showError(
                input,
                "Please enter your email address."
            );

            return false;
        }

        if (!emailPattern.test(value)) {

            showError(
                input,
                "Please enter a valid email address."
            );

            return false;
        }

        clearError(input);

        return true;
    }


    function validatePhone() {

        const input = document.getElementById("phone");
        const value = input.value.trim();

        const phonePattern =
            /^[0-9]{10}$/;

        if (value === "") {

            showError(
                input,
                "Please enter your phone number."
            );

            return false;
        }

        if (!phonePattern.test(value)) {

            showError(
                input,
                "Please enter a valid 10-digit phone number."
            );

            return false;
        }

        clearError(input);

        return true;
    }


    function validateService() {

        const input = document.getElementById("service");
        const value = input.value;

        if (value === "") {

            showError(
                input,
                "Please select a service."
            );

            return false;
        }

        clearError(input);

        return true;
    }


    function validateCompany() {

        const input = document.getElementById("company");
        const value = input.value.trim();

        if (value === "") {

            showError(
                input,
                "Please enter your company name."
            );

            return false;
        }

        if (value.length < 2) {

            showError(
                input,
                "Company name must be at least 2 characters."
            );

            return false;
        }

        clearError(input);

        return true;
    }


    function validateMessage() {

        const input = document.getElementById("message");
        const value = input.value.trim();

        if (value === "") {

            showError(
                input,
                "Please tell us how we can help."
            );

            return false;
        }

        if (value.length < 10) {

            showError(
                input,
                "Message must be at least 10 characters."
            );

            return false;
        }

        clearError(input);

        return true;
    }


    /* ================================================
       LIVE VALIDATION
    ================================================= */

    document
        .getElementById("name")
        ?.addEventListener("blur", validateName);

    document
        .getElementById("email")
        ?.addEventListener("blur", validateEmail);

    document
        .getElementById("phone")
        ?.addEventListener("blur", validatePhone);

    document
        .getElementById("service")
        ?.addEventListener("change", validateService);

    document
        .getElementById("company")
        ?.addEventListener("blur", validateCompany);

    document
        .getElementById("message")
        ?.addEventListener("blur", validateMessage);


    /* ================================================
       FORM SUBMIT
    ================================================= */

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const nameValid = validateName();
        const emailValid = validateEmail();
        const phoneValid = validatePhone();
        const serviceValid = validateService();
        const companyValid = validateCompany();
        const messageValid = validateMessage();


        const formIsValid =
            nameValid &&
            emailValid &&
            phoneValid &&
            serviceValid &&
            companyValid &&
            messageValid;


        /* ============================================
           INVALID FORM
        ============================================ */

        if (!formIsValid) {

            const firstError =
                contactForm.querySelector(".input-error");

            if (firstError) {
                firstError.focus();
            }

            return;
        }


        /* ============================================
           SUCCESS MESSAGE
        ============================================ */

        const submitButton =
            contactForm.querySelector(".submit-btn");

        if (submitButton) {

            submitButton.disabled = true;

            submitButton.querySelector("span").textContent =
                "Sending Enquiry...";

        }


        if (formSuccess) {

            formSuccess.classList.add("show");

        }


        /* ============================================
           REDIRECT TO 404.HTML
        ============================================ */

        setTimeout(() => {

            window.location.href = "404.html";

        }, 1000);

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
