import React, { FC, useState } from "react"
import { TODO_DATA } from "./../../Types/todo.interface"

import classes from "./crud.module.css"
import Item from "./Item"
import toast from "react-hot-toast"
import { useMutation } from "@apollo/client"
import { ON_ARCHIVED_TODO, ON_DELETE_TODO } from "../../Types/TodoQueries"
import { Spinner } from "./../../Utils"
type Props = {} & TODO_DATA

const TodoItem: FC<Props> = ({ id, text, userId, archived, ts }) => {
  const [onArchivedTodo, { loading: archivedLoading }] = useMutation(
    ON_ARCHIVED_TODO,
    {
      onCompleted() {
        toast("Todo is Archived.", {
          icon: "🚀",
          style: {
            borderRadius: "10px",
            background: "var(--purple)",
            color: "#fff",
          },
        })
      },
      onError(err) {
        toast("Todo is not Archived try again latter..", {
          style: {
            borderRadius: "10px",
            background: "var(--purple)",
            color: "#fff",
          },
        })
      },
    }
  )
  const [onDeleteTodo, { loading: deleteLoading }] = useMutation(
    ON_DELETE_TODO,
    {
      onCompleted() {
        toast("Todo is Deleted.", {
          icon: "🚀",
          style: {
            borderRadius: "10px",
            background: "var(--purple)",
            color: "#fff",
          },
        })
      },
      onError(err) {
        console.log(err)
        toast(`${err.message}..`, {
          style: {
            borderRadius: "10px",
            background: "var(--purple)",
            color: "#fff",
          },
        })
      },
      update(cache, { data }) {
        cache.modify({
          fields: {
            getAllTodosById(existingListRefs, { readField }) {
              return existingListRefs.filter(
                itemRef => data.deleteTodo.id !== readField("id", itemRef)
              )
            },
          },
        })
      },
    }
  )

  return (
    <Item
      key={id}
      data={{
        id: id,
        text: text,
        userId: userId,
        archived: archived,
      }}
      actions={
        <div className={classes.actions}>
          {!archived && (
            <button
              className="primary-btn info-bg"
              type="button"
              onClick={() => onArchivedTodo({ variables: { todoId: id } })}
            >
              {archivedLoading ? <Spinner /> : `Archive`}
            </button>
          )}
          <button
            className="primary-btn t-bg warning-clr"
            type="button"
            onClick={() => onDeleteTodo({ variables: { todoId: id } })}
          >
            {deleteLoading ? <Spinner /> : `delete`}
          </button>
        </div>
      }
      activeId={"null"}
    />
  )
}

export default TodoItem
