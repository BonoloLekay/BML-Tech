// Mobile navigation

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", function () {
    navMenu.classList.toggle("active");
  });

  const navLinks = navMenu.querySelectorAll("a");

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      navMenu.classList.remove("active");
    });
  });
}

// Contact form

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm) {
  contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const submitButton = contactForm.querySelector('button[type="submit"]');

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }

    if (formMessage) {
      formMessage.textContent = "";
      formMessage.style.display = "none";
    }

    const formData = new FormData(contactForm);

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        if (formMessage) {
          formMessage.textContent =
            "Thank you! Your enquiry has been sent successfully. I will get back to you soon.";

          formMessage.style.display = "block";
        }

        contactForm.reset();
      } else {
        let data = {};

        try {
          data = await response.json();
        } catch (error) {
          console.log("Could not read server response.");
        }

        if (formMessage) {
          if (data.errors && data.errors.length > 0) {
            formMessage.textContent = data.errors
              .map((error) => error.message)
              .join(", ");
          } else {
            formMessage.textContent =
              "Sorry, your enquiry could not be sent. Please try again.";
          }

          formMessage.style.display = "block";
        }
      }
    } catch (error) {
      console.error("Form submission error:", error);

      if (formMessage) {
        formMessage.textContent =
          "Unable to send your enquiry right now. Please check your internet connection and try again.";

        formMessage.style.display = "block";
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Send Enquiry →";
      }
    }
  });
}

// Current year

const currentYear = document.getElementById("currentYear");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

// Smooth scrolling

const pageLinks = document.querySelectorAll('a[href^="#"]');

pageLinks.forEach(function (link) {
  link.addEventListener("click", function (event) {
    const targetId = this.getAttribute("href");

    if (!targetId || targetId === "#") {
      return;
    }

    const target = document.querySelector(targetId);

    if (target) {
      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});
