// register.js provide functions for user registration - Mohsen
/* global $ M */
$("#regForm").on("click", event => {
  event.preventDefault();
  // Start: getting data of form elements
  const newUser = {
    userFirstName: $("#firstName")
      .val()
      .trim(),
    userLastName: $("#lastName")
      .val()
      .trim(),
    userNickName: $("#nickName")
      .val()
      .trim(),
    userPhone: $("#userPhone")
      .val()
      .trim(),
    userEmail: $("#userEmail")
      .val()
      .trim(),
    userSkills: $("#userSkills")
      .val()
      .trim(),
    userPassword: $("#userPassword")
      .val()
      .trim(),
    verifyPassword: $("#verifyPassword")
      .val()
      .trim()
  };
  // End: getting data of form elements
  // Start: email verification
  const email = newUser.userEmail;
  const pwd = newUser.userPassword;
  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  function validatePassword(password) {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return regex.test(password);
  }
  // eslint-disable-next-line no-unused-vars
  const isEmailValid = validateEmail(email);
  const isPWDValid = validatePassword(pwd);
  // End: email verification

  // checking email verification and password match
  if (
    newUser.userPassword === newUser.verifyPassword &&
    isEmailValid &&
    isPWDValid
  ) {
    $.post("/api/register", newUser, result => {
      if (result === "Success") {
        // redirect registered user with id to event sign up proccess
        window.location.href = "/events";
      } else {
        M.toast({ html: "Please try again! Something is going wrong" });
      }
    });
  } else if (!isEmailValid) {
    M.toast({ html: "Please enter a valid email" });
  } else if (!isPWDValid) {
    M.toast({ html: "Try a stronger password" });
  } else {
    M.toast({ html: "Passwords do not match" });
  }
});
