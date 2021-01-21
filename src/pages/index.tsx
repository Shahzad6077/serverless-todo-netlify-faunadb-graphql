import React, { FC, useEffect } from "react"
import { SEO } from "../Components"
import { Link } from "gatsby"
import netlifyIdentity from "netlify-identity-widget"
type Props = {}

const Index: FC<Props> = () => {
  return (
    <div>
      <SEO title="Home" />
      <button
        className="primary-btn"
        onClick={() => {
          // netlifyIdentity.open()
          console.log(netlifyIdentity.currentUser())
        }}
      >
        Get user
      </button>
      <Link to="/app">App</Link>
      <Link to="/app/dashboard">Dashboard</Link>
    </div>
  )
}

export default Index
