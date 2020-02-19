import React from "react"

export const HtmlComponent = ({ content }) => (
    <div
        dangerouslySetInnerHTML={{ __html: content }}
    />
)


export const HeadingComponent = ({ content }) => (
    <h1
        dangerouslySetInnerHTML={{ __html: content }}
    />
)