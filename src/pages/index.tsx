import React, { FC, useEffect } from "react"
import { SEO } from "../Components"
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
        Log In
      </button>
    </div>
  )
}

export default Index
