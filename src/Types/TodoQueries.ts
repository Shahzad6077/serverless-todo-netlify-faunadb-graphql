import { gql } from "@apollo/client"

export const CREATE_TODO = gql`
  mutation AddTodo($text: String!) {
    createTodo(text: $text) {
      id
      text
      userId
      archived
      ts
    }
  }
`
export const ON_ARCHIVED_TODO = gql`
  mutation onArchivedTodo($todoId: ID!) {
    archivedTodo(todoId: $todoId) {
      id
      text
      userId
      archived
      ts
    }
  }
`
export const ON_DELETE_TODO = gql`
  mutation onDeleteTodo($todoId: ID!) {
    deleteTodo(todoId: $todoId) {
      id
      text
      userId
      archived
      ts
    }
  }
`

export const GET_ALL_TODO = gql`
  query getAll {
    getAllTodosById {
      id
      text
      userId
      archived
      ts
    }
  }
`
