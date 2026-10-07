import React from "react"
import { graphql, HeadFC, PageProps } from "gatsby"
import Layout from "../components/Layout"
import PostCard from "../components/PostCard"

interface PostNode {
  frontmatter: {
    title: string
    slug: string
    category: string
    author: string
    coverColor: string | null
    date: string
  }
  excerpt: string
}

const IndexPage: React.FC<PageProps<{ allMarkdownRemark: { nodes: PostNode[] } }>> = ({
  data,
}) => {
  const posts = data.allMarkdownRemark.nodes
  const featured = posts[0]
  const rest = posts.slice(1)

  return (
    <Layout>
      {/* Hero */}
      <section
        style={{
          textAlign: "center",
          padding: "32px 0 40px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontFamily: "var(--font-display)",
            fontSize: "10rem",
            color: "rgba(255,255,255,0.02)",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            pointerEvents: "none",
          }}
        >
          REVISTA DO!
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "3rem",
            textTransform: "uppercase",
            marginBottom: "8px",
            background: "linear-gradient(135deg, #e60012, #ffd700)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "3px",
          }}
        >
          Revista DO!
        </h1>
        <p
          style={{
            color: "#ccc",
            fontSize: "1.1rem",
            maxWidth: "500px",
            margin: "0 auto",
          }}
        >
          Sua revista online de cultura geek, anime, games e tecnologia
        </p>
        <div
          style={{
            width: "80px",
            height: "4px",
            background: "linear-gradient(90deg, #e60012, #ffd700)",
            margin: "16px auto 0",
            borderRadius: "2px",
          }}
        />
      </section>

      {/* Featured post */}
      {featured && (
        <section style={{ marginBottom: "32px" }}>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.85rem",
              color: "#ffd700",
              textTransform: "uppercase",
              letterSpacing: "3px",
              marginBottom: "12px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span
              style={{
                background: "#e60012",
                padding: "2px 8px",
                color: "#fff",
                fontSize: "0.7rem",
              }}
            >
              DESTAQUE
            </span>
            Edição Especial
          </div>
          <PostCard
            title={featured.frontmatter.title}
            slug={featured.frontmatter.slug}
            category={featured.frontmatter.category}
            author={featured.frontmatter.author}
            excerpt={featured.excerpt}
            coverColor={featured.frontmatter.coverColor || undefined}
            featured
            index={0}
          />
        </section>
      )}

      {/* Posts grid */}
      {rest.length > 0 && (
        <section>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.5rem",
              color: "#ffffff",
              textTransform: "uppercase",
              letterSpacing: "2px",
              marginBottom: "20px",
              borderLeft: "4px solid #e60012",
              paddingLeft: "12px",
            }}
          >
            Últimas Edições
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "24px",
            }}
          >
            {rest.map((post, i) => (
              <PostCard
                key={post.frontmatter.slug}
                title={post.frontmatter.title}
                slug={post.frontmatter.slug}
                category={post.frontmatter.category}
                author={post.frontmatter.author}
                excerpt={post.excerpt}
                coverColor={post.frontmatter.coverColor || undefined}
                index={i + 1}
              />
            ))}
          </div>
        </section>
      )}
    </Layout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Revista DO! — Cultura Geek</title>

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/posts/" } }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        frontmatter {
          title
          slug
          category
          author
          coverColor
          date
        }
        excerpt(pruneLength: 120)
      }
    }
  }
`
