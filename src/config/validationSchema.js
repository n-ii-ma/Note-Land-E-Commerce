import * as yup from "yup";

// Validate user registeration
export const registrationSchema = yup.object({
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

// Validate user's private info update
export const updatePrivateSchema = yup.object({
  first_name: yup
    .string()
    .nullable()
    .optional()
    .max(32, "First name must be less than 32 characters long"),
  last_name: yup
    .string()
    .nullable()
    .optional()
    .max(32, "Last name must be less than 32 characters long"),
  email: yup
    .string()
    .nullable()
    .optional()
    .email("Email must be a valid email")
    .min(5, "Email must be more than 5 characters long")
    .max(64, "Email must be less than 64 characters long"),
  password: yup
    .string()
    .nullable()
    .optional()
    .min(8, "Password must be more than 8 characters long")
    .max(255, "Password must be less than 255 characters long")
    .matches(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,255}$/,
      "Password must contain at least one number, one lowercase, and one uppercase character"
    ),
});

// Validate user's address info update
export const updateAddressSchema = yup.object({
  address: yup
    .string()
    .nullable()
    .optional()
    .min(5, "Address must be more than 5 characters long")
    .max(255, "Address must be less than 255 characters long"),
  city: yup
    .string()
    .nullable()
    .optional()
    .max(32, "City name must be less than 32 characters long"),
  postal_code: yup
    .string()
    .nullable()
    .optional()
    .length(10, "Postal code must be 10 characters long"),
  phone: yup
    .string()
    .nullable()
    .optional()
    .min(10, "Phone number must be more than 10 characters long")
    .max(20, "Phone number must be less than 20 characters long"),
});
