// const alertsussess1 = document.querySelector(".alert-sussess");
// const alertfalse1 = document.querySelector(".alert-false");
// if (inputElement) {
//   inputElement.addEventListener("blur", (e) => {
//     e.preventDefault();
//     handleValidator();
//   });
// }
// function handleValidator() {
//   try {


//   } catch (error) {
//     console.log(error);
//   }
// }
const formElement = document.querySelector("#form-1");
const btnSignUp = document.querySelector("#BTN_SIGN_UP");
const inputElement = document.querySelectorAll(".form-control")
Validator(
  {
    form: "#form-1",
    formGroupSelector: ".form-outline",
    errorSelector: ".form-message",
    btnLogout: "#BTN_SIGN_UP",
    rules: [
      Validator.isRequired("#typeEmailX", "Email không được để trống!"),
      Validator.isEmail("#typeEmailX"),
      Validator.isRequired("#typeUserNameX", "Tên đầy đủ không được để trống!"),
      Validator.isRequired("#typePasswordX", "Mật khẩu không được để trống!"),
      Validator.minLength("#typePasswordX", 6, "Mật khẩu"),
      Validator.isRequired("#typeConfirmPasswordX", "Mật khẩu không được để trống!"),
      Validator.isConfirmed("#typeConfirmPasswordX", function () {
        return document.querySelector("#form-1 #typePasswordX").value;
      }, "mật khẩu nhập lại không chính xác")
    ],
  });

if (formElement) {
  btnSignUp.addEventListener("click", (e) => {
    e.preventDefault();
    handleSignUp();
  });
}
async function handleSignUp() {
  try {
    const username = document.querySelector("#typeUserNameX").value;
    const email = document.querySelector("#typeEmailX").value;
    const password = document.querySelector("#typePasswordX").value;
    const confirmpassword = document.querySelector(
      "#typeConfirmPasswordX"
    ).value;
    const phoneNumber = document.querySelector("#typePhoneNumberX").value;
    const res = await axios({
      method: "POST",
      url: "/api/v1/user/signup",
      data: {
        username,
        email,
        password,
        confirmpassword,
        phoneNumber,
      },
    });

    console.log(res);
    if (res.data.status == "success") {
      // alertsussess1.classList.add("active_success");
      window.setTimeout(() => {
        location.assign("/login");
      }, 200);
      // } else if (res.data == "vui lòng nhập đầy đủ thông tin") {
      //   alertfalse1.classList.add("active_false");
    }
  } catch (error) {
    //   alertfalse1.classList.add("active_false");
    //   setTimeout(() => {
    //     alertfalse1.classList.remove("active_false");
    //   }, 5000);
    // }
    console.log(error);
  }
}
