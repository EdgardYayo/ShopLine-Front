import * as yup from "yup";

const isRequiredMessage = "This field is required";
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export default yup.object().shape({
  name: yup
    .string()
    .required("No name provided")
    .min(5, "The name must have at least 5 characters")
    .max(15, "The name cannot exceed 15 characters"),
  email: yup.string().required(isRequiredMessage).email(),
  password: yup
    .string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),

  confirmPassword: yup.string().when("password", {
    is: (val: string | any[]) => (val && val.length > 0 ? true : false),
    then: yup
      .string()
      .oneOf([yup.ref("password")], "Both password need to be the same"),
  }),
  dni: yup
    .string()
    .required("No document provided")
    .min(10, "The identification document must have at least 10 characters")
    .max(13, "The identification document cannot exceed 13 characters"),
  phone: yup.string().matches(phoneRegExp, "Phone number is not valid"),
  address: yup.string().required(isRequiredMessage),
  nationality: yup.string().required("No country Selected"),
});
