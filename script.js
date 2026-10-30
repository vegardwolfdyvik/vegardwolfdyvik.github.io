// Handles the "General Enquiries" contact form — sends it to Web3Forms
// without reloading the page. You should not need to edit this file;
// just put your Web3Forms access key in index.html (see the comment
// above the <form> tag there).

(function () {
  var form = document.getElementById("contact-form");
  if (!form) return;

  var status = document.getElementById("form-status");
  var button = form.querySelector("button[type=submit]");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var key = form.querySelector('[name="access_key"]').value;
    if (!key || key === "YOUR-ACCESS-KEY-HERE") {
      status.textContent = "Contact form isn't set up yet — missing Web3Forms access key.";
      status.className = "form-status error";
      return;
    }

    button.disabled = true;
    status.textContent = "Sending…";
    status.className = "form-status";

    fetch(form.action, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new FormData(form),
    })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.success) {
          status.textContent = "Thanks — your message has been sent.";
          status.className = "form-status success";
          form.reset();
        } else {
          status.textContent = "Something went wrong. Please try again, or email us directly.";
          status.className = "form-status error";
        }
      })
      .catch(function () {
        status.textContent = "Something went wrong. Please try again, or email us directly.";
        status.className = "form-status error";
      })
      .finally(function () {
        button.disabled = false;
      });
  });
})();
