import React, { FC, Fragment } from "react"
import { Toaster } from "react-hot-toast"
import { Layout } from "./Components"
import AuthProvider from "./Context/Auth"
const Index: FC = ({ children }) => {
  return (
    <AuthProvider>
      <Layout>
        {children}
        <Toaster position="bottom-center" reverseOrder={false} />
      </Layout>
    </AuthProvider>
  )
}

export default Index
