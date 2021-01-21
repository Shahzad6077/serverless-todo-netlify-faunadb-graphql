import React, { FC, useEffect, useState } from "react"
import classes from "./crud.module.css"
import { TODO_DATA, TODO_VARIENT } from "./../../Types/todo.interface"
import CreateComp from "./Create"
import Item from "./Item"
import { useMutation, useQuery } from "@apollo/client"
import { GET_ALL_TODO } from "../../Types/TodoQueries"
import TodoItem from "./TodoItem"
type Props = {}
interface StateType {
  error: null | string
  currVarient: TODO_VARIENT
  list: TODO_DATA[]

  id?: string
  text: string
}
const DefaultValue: StateType = {
  text: "",
  id: null,
  error: null,
  currVarient: "CREATE",
  list: [],
}
const CrudComp: FC<Props> = () => {
  const { data, loading, error } = useQuery(GET_ALL_TODO)

  const [state, setObjState] = useState<StateType>(DefaultValue)
  const setState = (obj: Partial<StateType>) =>
    setObjState(p => ({ ...p, ...obj }))

  return (
    <div className={classes.crudWrapper}>
      <CreateComp
        varient={state.currVarient}
        defaultValues={{
          id: state.id,
          text: state.text,
        }}
      />
      <div className={classes.listWrapper}>
        {loading ? (
          <div>Loading...</div>
        ) : !error ? (
          data.getAllTodosById.map((data: TODO_DATA, i) => {
            return <TodoItem key={data.id} {...data} />
          })
        ) : (
          <p className="error">{`${error.toString()}`}</p>
        )}
      </div>
    </div>
  )
}

export default CrudComp
