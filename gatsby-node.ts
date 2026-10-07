import { GatsbyNode } from "gatsby"
import path from "path"

export const createPages: GatsbyNode["createPages"] = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql<{
    allMarkdownRemark: {
      nodes: Array<{
        frontmatter: { slug: string }
      }>
    }
  }>(`
    {
      allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/posts/" } }) {
        nodes {
          frontmatter {
            slug
          }
        }
      }
    }
  `)

  result.data?.allMarkdownRemark.nodes.forEach((node) => {
    createPage({
      path: `/post/${node.frontmatter.slug}`,
      component: path.resolve("./src/templates/post.tsx"),
      context: {
        slug: node.frontmatter.slug,
      },
    })
  })
}
