import * as yup from "yup";

const isRequiredMessage = "This field is required";

export default yup.object().shape({
  email: yup.string().required(isRequiredMessage).email(),
  password: yup
    .string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
});
