/* Contact form validation & submission feedback */
document.addEventListener("DOMContentLoaded", () => {

  const form     = document.getElementById("contactForm");
  const feedback = document.getElementById("ctFeedback");
  const submitBtn = form && form.querySelector(".ct-submit");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let valid = true;

    // Clear previous errors
    form.querySelectorAll("input, select, textarea").forEach(el => el.classList.remove("error"));
    feedback.className = "ct-feedback";
    feedback.textContent = "";

    // Validate required fields
    form.querySelectorAll("[required]").forEach(el => {
      if (!el.value.trim()) {
        el.classList.add("error");
        valid = false;
      }
    });

    // Basic email check
    const emailEl = form.querySelector("#email");
    if (emailEl && emailEl.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value)) {
      emailEl.classList.add("error");
      valid = false;
    }

    if (!valid) {
      feedback.textContent = "Please fill in all required fields correctly.";
      feedback.classList.add("error");
      return;
    }

    // Simulate sending — swap with real fetch/WP REST/SMTP when live
    const btnText = submitBtn.querySelector(".ct-btn-text");
    const btnIcon = submitBtn.querySelector("i");
    submitBtn.disabled = true;
    btnText.textContent = "Sending…";
    btnIcon.className = "fa-solid fa-spinner fa-spin";

    setTimeout(() => {
      submitBtn.disabled = false;
      btnText.textContent = "Send Message";
      btnIcon.className = "fa-solid fa-paper-plane";
      feedback.textContent = "✓ Thank you! Your message has been sent. We'll be in touch within one business day.";
      feedback.classList.add("success");
      form.reset();
    }, 1500);
  });

  // Remove error class on input
  form.querySelectorAll("input, select, textarea").forEach(el => {
    el.addEventListener("input", () => el.classList.remove("error"));
  });

});
