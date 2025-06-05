import * as Yup from "yup";

export const schemaRegister = Yup.object({
  username: Yup.string().max(50).required("Username is required"),
  password: Yup.string().max(20).required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null])
    .required("Confirm password is required"),
});
