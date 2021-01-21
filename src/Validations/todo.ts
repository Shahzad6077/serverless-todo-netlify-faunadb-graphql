import * as yup from "yup"

const crudSchema = yup.object().shape({
  text: yup.string().required("Product name is required."),
})
export default crudSchema
