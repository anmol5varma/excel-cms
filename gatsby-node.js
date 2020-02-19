/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
const path = require(`path`)
const caseConverter = require("./src/utils/kebabCaseAndCamelCase");

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Query for markdown nodes to use in creating pages.
  const result = await graphql(
    `
        {
          allRouteJson{
            nodes{
              name
            }
          }
        }
      `
  )

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  // Create pages for each markdown file.
  const blogPostTemplate = path.resolve(`src/templates/home.js`)
  result.data.allRouteJson.nodes.forEach(async ({ name }) => {
    const slugName = name.charAt(0).toUpperCase() + name.slice(1)
    const data = await graphql(
      `
          {
            all${slugName}Json{
              nodes{
                title
                content
              }
            }
          }
          `
    )
    createPage({
      path: caseConverter.camelCaseToKebabCase(name),
      component: blogPostTemplate,
      // In your blog post template's graphql query, you can use path
      // as a GraphQL variable to query for data from the markdown file.
      context: {
        data: data.data[`all${slugName}Json`]
      },
    })
  })
}
// You can delete this file if you're not using it
