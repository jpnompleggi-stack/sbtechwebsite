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

  // Contact form — submits to Web3Forms (emails the results) with validation.
  // Falls back to the visitor's email client if the access key isn't set yet.
  var form = document.getElementById("contactForm");
  if (form) {
    var note = document.getElementById("formNote");
    var submitBtn = form.querySelector('button[type="submit"]');

    function setNote(msg, kind) {
      note.textContent = msg;
      note.className = "form-note " + (kind || "");
    }

    function mailtoFallback(name, email) {
      var subject = encodeURIComponent("Website inquiry from " + name);
      var body = encodeURIComponent(
        "Name: " + name +
        "\nEmail: " + email +
        "\nPhone: " + (form.phone ? form.phone.value.trim() : "") +
        "\n\n" + (form.message ? form.message.value.trim() : "")
      );
      window.location.href =
        "mailto:info@sbtechma.com?subject=" + subject + "&body=" + body;
      setNote("Your email app should open to send the message. Or reach us directly at info@sbtechma.com.", "ok");
      form.reset();
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!name || !emailOk) {
        setNote("Please enter your name and a valid email address.", "err");
        return;
      }

      var keyField = form.querySelector('input[name="access_key"]');
      var keyConfigured = keyField && keyField.value && keyField.value.indexOf("YOUR_") === -1;

      // If Web3Forms isn't configured yet, gracefully fall back to email client.
      if (!keyConfigured || !window.fetch) {
        mailtoFallback(name, email);
        return;
      }

      submitBtn.disabled = true;
      var original = submitBtn.textContent;
      submitBtn.textContent = "Sending…";
      setNote("", "");

      fetch(form.action, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form)
      })
        .then(function (res) { return res.json().then(function (data) { return { ok: res.ok, data: data }; }); })
        .then(function (r) {
          if (r.ok && r.data.success) {
            setNote("Thanks! Your message has been sent — we'll be in touch shortly.", "ok");
            form.reset();
          } else {
            setNote((r.data && r.data.message) || "Something went wrong. Please email info@sbtechma.com.", "err");
          }
        })
        .catch(function () {
          setNote("Network error. Please email us directly at info@sbtechma.com.", "err");
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = original;
        });
    });
  }
})();
