export const testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
export const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[0-9])(?=.{8,})");

export const accountValidator = ({
  password,
  email,
  confirmPassword,
  name
}) => {
  const errors = {};
  if (password === "") errors.password = "Password required";
  if (!passwordRegex.test(password))
    errors.password =
      "Password should contain at least 8 charaters, a letter and a number";

  if (email === "") errors.email = "Email required";
  if (!testEmail.test(email)) errors.email = "Please enter a valid email";
  if (confirmPassword && password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }
  if (name === "") {
    errors.name = "username is required";
  }

  return errors;
};

export default accountValidator;
