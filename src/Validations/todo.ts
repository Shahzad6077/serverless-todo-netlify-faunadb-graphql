import * as yup from "yup"

const crudSchema = yup.object().shape({
  text: yup.string().required("Title is required."),
})
export default crudSchema
