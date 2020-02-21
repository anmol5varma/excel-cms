/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"
import "./global.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div
      style={{
        minHeight: `100vh`,
        display: `flex`,
        flexDirection: `column`
      }}
    >
      <Header siteTitle={data.site.siteMetadata.title} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
          display: `flex`,
          flexDirection: `column`,
          flexGrow: 1
        }}
      >
        <main
          style={{
            flexGrow: 1,
            display: `flex`,
            flexDirection: `column`
          }}
        >{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          Love &hearts;
        </footer>
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
