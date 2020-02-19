import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { HtmlComponent, HeadingComponent } from "../components/html"

const HomePage = ({ pageContext }) => {
  const content = pageContext.data.nodes
  return (
    <Layout>
      <SEO title="Home" />
      {
        content.map(({ title, content }) => {
          return (
            <p>
              <HeadingComponent content={title} />
              {content.map(value => <HtmlComponent content={value} />)}
            </p>
          )
        })
      }
    </Layout>
  )
}

export default HomePage
