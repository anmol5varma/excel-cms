import React from "react"

import Layout from "../components/layout"
import Image from "../components/image"
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
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
    </Layout>
  )
}

export default HomePage
