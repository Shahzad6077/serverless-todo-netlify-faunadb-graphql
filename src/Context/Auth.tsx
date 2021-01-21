import React, { createContext, useContext, useEffect, useState } from "react"

import {
  User,
  AuthContextType,
  AUTH_CONTEXT_INITIAL_STATE,
} from "./../Types/auth.interface"
import netlifyIdentity from "netlify-identity-widget"

const AuthContext = createContext<AuthContextType>(AUTH_CONTEXT_INITIAL_STATE)

export const useAuthContext = () => useContext<AuthContextType>(AuthContext)

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    netlifyIdentity.init({})
    netlifyIdentity.on("login", user => console.log("login", user))
    netlifyIdentity.on("logout", () => console.log("Logged out"))
  }, [])

  const onLogin = () => {
    netlifyIdentity.open()
  }
  const onLogout = () => {
    netlifyIdentity.logout()
  }

  const isAuthenticated = !!user?.uid
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, onLogin, onLogout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
