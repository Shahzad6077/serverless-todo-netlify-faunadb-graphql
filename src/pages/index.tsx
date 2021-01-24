import React, { FC, useEffect } from "react"
import { SEO } from "../Components"
import { Link, navigate } from "gatsby"
import netlifyIdentity from "netlify-identity-widget"
import { useAuthContext } from "../Context/Auth"
type Props = {}

const Index: FC<Props> = () => {
  const { isAuthenticated } = useAuthContext()

  useEffect(() => {
    typeof window !== "undefined" && isAuthenticated && navigate("/app")
  }, [isAuthenticated])
  return (
    <div>
      <SEO title="Home" />
      Todo appp
    </div>
  )
}

export default Index
