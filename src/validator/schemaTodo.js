import * as Yup from "yup";
export const schemaTodo = Yup.object({
  todo: Yup.string().required("Todo is required"),
});
