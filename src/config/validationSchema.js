import * as yup from "yup";

const schema = yup.object({
  first_name: yup
    .string()
    .required("First name cannot be empty")
    .max(32, "First name must be less than 32 characters long"),
  last_name: yup
    .string()
    .required("Last name cannot be empty")
    .max(32, "Last name must be less than 32 characters long"),
  email: yup
    .string()
    .required("Email cannot be empty")
    .email("Email must be a valid email")
    .min(5, "Email must be more than 5 characters long")
    .max(64, "Email must be less than 64 characters long"),
  password: yup
    .string()
    .required("Password cannot be empty")
    .min(8, "Password must be more than 8 characters long")
    .max(255, "Password must be less than 255 characters long")
    .matches(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,255}$/,
      "Password must contain at least one number, one lowercase, and one uppercase character"
    ),
});

export default schema;
