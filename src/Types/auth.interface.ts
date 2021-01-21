export type User = null | {
  uid: string
}
export type SessionFormValues = {
  email: string
  password: string
}

export interface AuthContextType {
  user: User
  isAuthenticated: boolean
  onLogin: () => void
  onLogout: () => Promise<void> | void
}
export const AUTH_CONTEXT_INITIAL_STATE = {
  user: null,
  isAuthenticated: false,
  onLogin: () => {},
  onLogout: () => {},
}
