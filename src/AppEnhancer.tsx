import React, { FC } from "react"
import { Toaster } from "react-hot-toast"
import { Layout } from "./Components"
import AuthProvider from "./Context/Auth"
import ApolloServiceProvider from "./Services/ApolloServiceProvider"

const Index: FC = ({ children }) => {
  return (
    <AuthProvider>
      <Layout>
        <ApolloServiceProvider>{children}</ApolloServiceProvider>
        {/* {children} */}
        <Toaster position="bottom-center" reverseOrder={false} />
      </Layout>
    </AuthProvider>
  )
}

export default Index
