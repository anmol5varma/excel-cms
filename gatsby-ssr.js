/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

const { Helmet } = require("react-helmet")

exports.onRenderBody = ({ setHeadComponents, setHtmlAttributes, setBodyAttributes }, pluginOptions) => {
    const helmet = Helmet.renderStatic()
    setHtmlAttributes(helmet.htmlAttributes.toComponent())
    setBodyAttributes(helmet.bodyAttributes.toComponent())
    setHeadComponents([
        helmet.title.toComponent(),
        helmet.link.toComponent(),
        helmet.meta.toComponent(),
        helmet.noscript.toComponent(),
        helmet.script.toComponent(),
        helmet.style.toComponent(),
    ])
}
