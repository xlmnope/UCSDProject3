$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var emailInput = $("input#email-input");
  var phoneInput = $("input#phone-input");
  var passwordInput = $("input#password-input");

  // When the signup button is clicked, we validate the email, phone number and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      phone: phoneInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.phone || !userData.password) {
      return;
    }
    // If we have an email, phone number and password, run the signUpUser function
    signUpUser(userData.email, userData.phone, userData.password);
    emailInput.val("");
    phoneInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If succesful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, phone, password) {
    $.post("/api/signup", {
      email: email,
      phone: phone,
      password: password
    }).then(function(data) {
      window.location.replace(data);
      // If there's an error, handle it by throwing up a boostrap alert
    }).catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert.msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
