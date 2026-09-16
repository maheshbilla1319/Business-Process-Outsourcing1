/* =====================================================
   STACKLY BPO LOGIN JS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ================= AOS ================= */

    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 900,
            easing: "ease-out-cubic",
            once: true,
            offset: 70
        });
    }


    /* ================= ELEMENTS ================= */

    const loginForm = document.getElementById("loginForm");

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const roleInput = document.getElementById("role");

    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const roleError = document.getElementById("roleError");

    const loginButton = document.getElementById("loginButton");
    const loginMessage = document.getElementById("loginMessage");

    const passwordToggle = document.getElementById("passwordToggle");


    /* =====================================================
       PASSWORD SHOW / HIDE
    ===================================================== */

    if (passwordToggle) {

        passwordToggle.addEventListener("click", () => {

            const icon = passwordToggle.querySelector("i");

            if (passwordInput.type === "password") {

                passwordInput.type = "text";

                icon.classList.remove("fa-eye");
                icon.classList.add("fa-eye-slash");

                passwordToggle.setAttribute(
                    "aria-label",
                    "Hide password"
                );

                passwordToggle.setAttribute(
                    "title",
                    "Hide password"
                );

            } else {

                passwordInput.type = "password";

                icon.classList.remove("fa-eye-slash");
                icon.classList.add("fa-eye");

                passwordToggle.setAttribute(
                    "aria-label",
                    "Show password"
                );

                passwordToggle.setAttribute(
                    "title",
                    "Show password"
                );
            }

        });

    }


    /* =====================================================
       LOGIN
       
       ANY EMAIL
       ANY PASSWORD
       
       ADMIN  → admin.html
       VIEWER → viewer.html
    ===================================================== */

    if (loginForm) {

        loginForm.addEventListener("submit", function (event) {

            event.preventDefault();


            /* Clear previous errors */

            emailError.textContent = "";
            passwordError.textContent = "";
            roleError.textContent = "";
            loginMessage.textContent = "";


            /* Get values */

            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();
            const role = roleInput.value;


            /* =================================================
               EMAIL REQUIRED
            ================================================= */

            if (email === "") {

                emailError.textContent = "Please enter your email.";

                emailInput.focus();

                return;
            }


            /* =================================================
               PASSWORD REQUIRED
            ================================================= */

            if (password === "") {

                passwordError.textContent = "Please enter your password.";

                passwordInput.focus();

                return;
            }


            /* =================================================
               ROLE CHECK
            ================================================= */

            if (role !== "admin" && role !== "viewer") {

                roleError.textContent = "Please select a valid role.";

                return;
            }


            /* =================================================
               LOGIN SUCCESS
               
               NO EMAIL CHECK
               NO PASSWORD CHECK
            ================================================= */

            let redirectPage = "";
            let redirectText = "";


            if (role === "admin") {

                redirectPage = "admin.html";
                redirectText = "Redirecting to Admin Dashboard...";

            } else if (role === "viewer") {

                redirectPage = "viewer.html";
                redirectText = "Redirecting to Viewer Dashboard...";

            }


            /* Disable button */

            loginButton.disabled = true;


            /* Loading button */

            loginButton.innerHTML = `
                <span>Redirecting...</span>
                <i class="fa-solid fa-spinner fa-spin"></i>
            `;


            /* Success message */

            loginMessage.textContent = redirectText;

            loginMessage.classList.add("success");


            /* =================================================
               SAVE LOGIN DETAILS
               
               Optional - for dashboard display
            ================================================= */

            sessionStorage.setItem("stacklyLoggedIn", "true");
            sessionStorage.setItem("stacklyUserEmail", email);
            sessionStorage.setItem("stacklyUserRole", role);


            /* =================================================
               REDIRECT
            ================================================= */

            setTimeout(() => {

                window.location.href = redirectPage;

            }, 800);

        });

    }

});