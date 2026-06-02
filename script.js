/* SBTech Consulting — site interactions */
(function () {
  "use strict";

  // Mobile nav toggle
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // Close menu when a link is tapped
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Current year in footer
  var yearEls = document.querySelectorAll("#year");
  var year = new Date().getFullYear();
  yearEls.forEach(function (el) { el.textContent = year; });

  // Contact form (client-side validation + friendly confirmation)
  var form = document.getElementById("contactForm");
  if (form) {
    var note = document.getElementById("formNote");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!name || !emailOk) {
        note.textContent = "Please enter your name and a valid email address.";
        note.className = "form-note err";
        return;
      }

      // No backend yet — open the visitor's email client as a graceful fallback.
      var subject = encodeURIComponent("Website inquiry from " + name);
      var body = encodeURIComponent(
        "Name: " + name +
        "\nEmail: " + email +
        "\nPhone: " + (form.phone ? form.phone.value.trim() : "") +
        "\n\n" + (form.message ? form.message.value.trim() : "")
      );
      window.location.href =
        "mailto:info@sbtechma.com?subject=" + subject + "&body=" + body;

      note.textContent = "Thanks! Your email app should open to send the message. Or reach us directly at info@sbtechma.com.";
      note.className = "form-note ok";
      form.reset();
    });
  }
})();
