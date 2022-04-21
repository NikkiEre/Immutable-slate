import * as Yup from "yup";

export const yupSchemaRegister = {
  username: Yup.string()
    .min(5, "Must be at least 5 characters")
    .max(40, "Must be 40 characters or less")
    .matches(/^[a-zA-Z\s]*$/g, "You are using invalid characters")
    .required("This field is required."),
  email: Yup.string().email("Invalid email address").required("This field is required."),
  password: Yup.string()
    .matches(/^[a-zA-Z0-9]*$/g, "You are using invalid characters")
    .min(3, "Must be at least 3 characters")
    .required("This field is required."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], `Password and Confirm Password doesn't match`)
    .required("This field is required."),
};

export const yupSchemaLogin = {
  email: Yup.string().email("Invalid email address").required("This field is required."),
  password: Yup.string().required("This field is required."),
};
