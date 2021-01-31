import React, { FC, useEffect, useState } from "react"
import classes from "./crud.module.css"
import { TODO_DATA, TODO_VARIENT } from "../../Types/todo.interface"
import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import todoSchema from "./../../Validations/todo"
import { toast } from "react-hot-toast"
import { useMutation, useApolloClient } from "@apollo/client"
import { CREATE_TODO, GET_ALL_TODO } from "./../../Types/TodoQueries"
import { Spinner } from "../../Utils"

type Props = {
  varient: TODO_VARIENT
  defaultValues: Omit<TODO_DATA, "userId">
}

const CreateComp: FC<Props> = ({ varient, defaultValues }) => {
  const client = useApolloClient()
  const { register, errors, handleSubmit, reset, setValue } = useForm<
    Omit<TODO_DATA, "id" | "userId">
  >({
    defaultValues: defaultValues,
    resolver: yupResolver(todoSchema),
  })
  const [onCreateTodo, { loading, data }] = useMutation(CREATE_TODO, {
    onCompleted(data) {
      toast("Todo is Archived.", {
        icon: "🔥",
        style: {
          borderRadius: "10px",
          background: "var(--purple)",
          color: "#fff",
        },
      })
    },
    onError(err) {
      console.log(err)
    },
    update(cache, { data }) {
      // Query that fetches all existing to-do items
      const query = GET_ALL_TODO

      // Get the current to-do list
      const existingData = client.readQuery({ query })

      // Write back to the to-do list, appending the new item
      client.writeQuery({
        query,
        data: {
          getAllTodosById: [data.createTodo, ...existingData.getAllTodosById],
        },
      })
    },
  })

  const id = defaultValues.id

  useEffect(() => {
    if (id) {
      setValue("text", defaultValues.text, { shouldValidate: true })
    } else {
    }
  }, [id])
  const [err, setErr] = useState<null | string>(null)

  const onSubmitForm: SubmitHandler<Omit<TODO_DATA, "userId">> = async data => {
    try {
      await onCreateTodo({
        variables: { text: data.text },
      })
      reset()
      toast("Todo is added.")
    } catch (err) {
      console.log(err.body.message)
    }
  }

  return (
    <div className={classes.createView}>
      <h2>
        <span style={{ textTransform: "capitalize" }}>
          {varient.toLowerCase()}
        </span>{" "}
        Todo
      </h2>
      <div className={classes.formWrapper}>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <label htmlFor="p_name">Title</label>
          <input
            id="p_name"
            name="text"
            type="text"
            ref={register({ required: true })}
          />
          {errors.text && <p className="error">{errors.text.message}</p>}

          {/* <b r /> */}

          <button
            type="submit"
            className="primary-btn"
            disabled={loading}
            style={{
              ...(loading && {
                backgroundColor: "transparent",
                display: "flex",
                justifyContent: "center",
              }),
            }}
          >
            {loading ? <Spinner /> : varient}
          </button>
        </form>
        {err && <p className="error">{err}</p>}
      </div>
    </div>
  )
}

export default CreateComp
