import * as Yup from "yup";

export const UserSignUpSchema = Yup.object({
  name: Yup.string()
    .min(4, "Name must be at least 2 characters long")
    .required("Required is Required"),
  username: Yup.string()
    .min(4, "User name must be at least 2 characters long")
    .required("Required is Required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Required  is Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Required is Required"),
});

export const UserSignInSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Required  is Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Required is Required"),
});
