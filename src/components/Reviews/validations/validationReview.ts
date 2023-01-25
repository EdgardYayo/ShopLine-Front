import * as yup from "yup";

const isRequiredMessage = "This field is required";

export default yup.object().shape({
  content: yup.string().required(isRequiredMessage),
  rating: yup
    .string()
    .required("No rating provided.")
    .min(1, "The rating must be of 1 minimum.")
    .max(5, "The rating must be of 5 maximum."),
});