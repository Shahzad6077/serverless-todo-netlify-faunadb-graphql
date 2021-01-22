import React, { FC, useEffect } from "react"
import { SEO } from "../Components"
import { Link } from "gatsby"
import netlifyIdentity from "netlify-identity-widget"
type Props = {}

const Index: FC<Props> = () => {
  return (
    <div>
      <SEO title="Home" />
      Todo appp
    </div>
  )
}

export default Index
