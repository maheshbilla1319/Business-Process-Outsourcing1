/* =====================================================
   STACKLY BPO SIGNUP JS
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

    const form = document.getElementById("signupForm");

    const fullName = document.getElementById("fullName");
    const email = document.getElementById("email");
    const role = document.getElementById("role");

    const password = document.getElementById("password");
    const confirmPassword =
        document.getElementById("confirmPassword");

    const terms = document.getElementById("terms");

    const passwordToggle =
        document.getElementById("passwordToggle");

    const confirmPasswordToggle =
        document.getElementById("confirmPasswordToggle");

    const signupButton =
        document.querySelector(".signup-btn");


    /* ================= CHECK FORM ================= */

    if (!form) {
        console.error("signupForm not found.");
        return;
    }


    /* ================= PASSWORD TOGGLE ================= */

    function togglePassword(input, button) {

        if (!input || !button) return;

        const icon = button.querySelector("i");

        if (input.type === "password") {

            input.type = "text";

            if (icon) {
                icon.classList.remove("fa-eye");
                icon.classList.add("fa-eye-slash");
            }

            button.setAttribute(
                "aria-label",
                "Hide password"
            );

            button.setAttribute(
                "title",
                "Hide password"
            );

        } else {

            input.type = "password";

            if (icon) {
                icon.classList.remove("fa-eye-slash");
                icon.classList.add("fa-eye");
            }

            button.setAttribute(
                "aria-label",
                "Show password"
            );

            button.setAttribute(
                "title",
                "Show password"
            );
        }
    }


    if (passwordToggle) {

        passwordToggle.addEventListener("click", () => {

            togglePassword(
                password,
                passwordToggle
            );

        });
    }


    if (confirmPasswordToggle) {

        confirmPasswordToggle.addEventListener("click", () => {

            togglePassword(
                confirmPassword,
                confirmPasswordToggle
            );

        });
    }


    /* ================= ERROR HELPERS ================= */

    function setError(input, errorId, message) {

        if (input) {
            input.classList.add("input-error");
        }

        const errorElement =
            document.getElementById(errorId);

        if (errorElement) {
            errorElement.textContent = message;
        }
    }


    function clearError(input, errorId) {

        if (input) {
            input.classList.remove("input-error");
        }

        const errorElement =
            document.getElementById(errorId);

        if (errorElement) {
            errorElement.textContent = "";
        }
    }


    /* ================= VALIDATION ================= */

    function validEmail(value) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }


    function validPassword(value) {

        /*
           Minimum 8 characters
           At least one letter
           At least one number
        */

        return /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(value);
    }


    /* ================= LIVE VALIDATION ================= */

    if (fullName) {

        fullName.addEventListener("input", () => {

            if (fullName.value.trim().length >= 2) {

                clearError(
                    fullName,
                    "nameError"
                );
            }

        });
    }


    if (email) {

        email.addEventListener("input", () => {

            if (validEmail(email.value.trim())) {

                clearError(
                    email,
                    "emailError"
                );
            }

        });
    }


    if (role) {

        role.addEventListener("change", () => {

            if (role.value !== "") {

                clearError(
                    role,
                    "roleError"
                );
            }

        });
    }


    if (password) {

        password.addEventListener("input", () => {

            if (validPassword(password.value)) {

                clearError(
                    password,
                    "passwordError"
                );
            }

        });
    }


    if (confirmPassword) {

        confirmPassword.addEventListener("input", () => {

            if (
                confirmPassword.value !== "" &&
                confirmPassword.value === password.value
            ) {

                clearError(
                    confirmPassword,
                    "confirmPasswordError"
                );
            }

        });
    }


    /* ================= FORM SUBMIT ================= */

    form.addEventListener("submit", (event) => {

        event.preventDefault();

        let isValid = true;


        /* ================= NAME ================= */

        if (
            !fullName ||
            fullName.value.trim().length < 2
        ) {

            setError(
                fullName,
                "nameError",
                "Please enter your full name."
            );

            isValid = false;

        } else {

            clearError(
                fullName,
                "nameError"
            );
        }


        /* ================= EMAIL ================= */

        if (
            !email ||
            !validEmail(email.value.trim())
        ) {

            setError(
                email,
                "emailError",
                "Please enter a valid email address."
            );

            isValid = false;

        } else {

            clearError(
                email,
                "emailError"
            );
        }


        /* ================= ROLE ================= */

        if (
            !role ||
            role.value === ""
        ) {

            setError(
                role,
                "roleError",
                "Please select Admin or Viewer."
            );

            isValid = false;

        } else {

            clearError(
                role,
                "roleError"
            );
        }


        /* ================= PASSWORD ================= */

        if (
            !password ||
            !validPassword(password.value)
        ) {

            setError(
                password,
                "passwordError",
                "Use at least 8 characters with letters and numbers."
            );

            isValid = false;

        } else {

            clearError(
                password,
                "passwordError"
            );
        }


        /* ================= CONFIRM PASSWORD ================= */

        if (
            !confirmPassword ||
            confirmPassword.value === "" ||
            confirmPassword.value !== password.value
        ) {

            setError(
                confirmPassword,
                "confirmPasswordError",
                "Passwords do not match."
            );

            isValid = false;

        } else {

            clearError(
                confirmPassword,
                "confirmPasswordError"
            );
        }


        /* ================= TERMS ================= */

        const termsError =
            document.getElementById("termsError");

        if (!terms || !terms.checked) {

            if (termsError) {

                termsError.textContent =
                    "Please accept the Terms & Conditions.";
            }

            isValid = false;

        } else {

            if (termsError) {

                termsError.textContent = "";
            }
        }


        /* ================= STOP IF INVALID ================= */

        if (!isValid) {

            return;
        }


        /* ================= ACCOUNT CREATED ================= */

        if (signupButton) {

            signupButton.classList.add("loading");

            const buttonText =
                signupButton.querySelector("span");

            if (buttonText) {

                buttonText.textContent =
                    "Creating Account...";
            }

            signupButton.disabled = true;
        }


        /* ================= SAVE ACCOUNT DETAILS ================= */

        localStorage.setItem(
            "stacklySignupName",
            fullName.value.trim()
        );

        localStorage.setItem(
            "stacklySignupEmail",
            email.value.trim()
        );

        localStorage.setItem(
            "stacklySignupRole",
            role.value
        );

        localStorage.setItem(
            "stacklySignupPassword",
            password.value
        );


        /* ================= REDIRECT TO LOGIN ================= */

        setTimeout(() => {

            window.location.href = "./login.html";

        }, 900);

    });


    /* ================= INPUT CLEAR ================= */

    [
        fullName,
        email,
        role,
        password,
        confirmPassword

    ].forEach((input) => {

        if (!input) return;

        input.addEventListener("focus", () => {

            input.classList.remove(
                "input-error"
            );

        });

    });

});