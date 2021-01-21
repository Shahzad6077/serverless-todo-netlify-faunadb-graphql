export interface TODO_DATA {
  id?: string
  text: string
  userId: string
  archived?: boolean
  ts?: number
}

export type Todo_List_Type = TODO_DATA[]
export type TODO_VARIENT = "CREATE" | "UPDATE"
