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
export const updatePrivateSchema = yup.object().shape(
  {
    first_name: yup.string().when("first_name", (value) => {
      // If first_name exists, validate it against the rules
      if (value) {
        return yup
          .string()
          .max(32, "First name must be less than 32 characters long");
      } else {
        return yup
          .string()
          .transform((value, originalValue) => {
            // Convert empty values to null
            if (!value) {
              return null;
            }
            return originalValue;
          })
          .nullable()
          .optional();
      }
    }),
    last_name: yup.string().when("last_name", (value) => {
      if (value) {
        return yup
          .string()
          .max(32, "Last name must be less than 32 characters long");
      } else {
        return yup
          .string()
          .transform((value, originalValue) => {
            if (!value) {
              return null;
            }
            return originalValue;
          })
          .nullable()
          .optional();
      }
    }),
    email: yup.string().when("email", (value) => {
      if (value) {
        return yup
          .string()
          .email("Email must be a valid email")
          .min(5, "Email must be more than 5 characters long")
          .max(64, "Email must be less than 64 characters long");
      } else {
        return yup
          .string()
          .transform((value, originalValue) => {
            if (!value) {
              return null;
            }
            return originalValue;
          })
          .nullable()
          .optional();
      }
    }),
    password: yup.string().when("password", (value) => {
      if (value) {
        return yup
          .string()
          .min(8, "Password must be more than 8 characters long")
          .max(255, "Password must be less than 255 characters long")
          .matches(
            /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,255}$/,
            "Password must contain at least one number, one lowercase, and one uppercase character"
          );
      } else {
        return yup
          .string()
          .transform((value, originalValue) => {
            if (!value) {
              return null;
            }
            return originalValue;
          })
          .nullable()
          .optional();
      }
    }),
  },
  [
    ["first_name", "first_name"],
    ["last_name", "last_name"],
    ["email", "email"],
    ["password", "password"],
  ]
);

// Validate user's address info update
export const updateAddressSchema = yup.object().shape(
  {
    address: yup.string().when("address", (value) => {
      if (value) {
        return yup
          .string()
          .min(5, "Address must be more than 5 characters long")
          .max(255, "Address must be less than 255 characters long");
      } else {
        return yup
          .string()
          .transform((value, originalValue) => {
            if (!value) {
              return null;
            }
            return originalValue;
          })
          .nullable()
          .optional();
      }
    }),
    city: yup.string().when("city", (value) => {
      if (value) {
        return yup
          .string()
          .max(32, "City name must be less than 32 characters long");
      } else {
        return yup
          .string()
          .transform((value, originalValue) => {
            if (!value) {
              return null;
            }
            return originalValue;
          })
          .nullable()
          .optional();
      }
    }),
    postal_code: yup.string().when("postal_code", (value) => {
      if (value) {
        return yup
          .string()
          .length(10, "Postal code must be 10 characters long");
      } else {
        return yup
          .string()
          .transform((value, originalValue) => {
            if (!value) {
              return null;
            }
            return originalValue;
          })
          .nullable()
          .optional();
      }
    }),
    phone: yup.string().when("phone", (value) => {
      if (value) {
        return yup
          .string()
          .min(10, "Phone number must be more than 10 characters long")
          .max(20, "Phone number must be less than 20 characters long");
      } else {
        return yup
          .string()
          .transform((value, originalValue) => {
            if (!value) {
              return null;
            }
            return originalValue;
          })
          .nullable()
          .optional();
      }
    }),
  },
  [
    ["address", "address"],
    ["city", "city"],
    ["postal_code", "postal_code"],
    ["phone", "phone"],
  ]
);
