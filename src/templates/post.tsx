import React from "react"
import { graphql, HeadFC, PageProps } from "gatsby"
import Layout from "../components/Layout"
import EngagementButton from "../components/EngagementButton"

interface PostData {
  markdownRemark: {
    frontmatter: {
      title: string
      slug: string
      category: string
      author: string
      date: string
      coverColor: string | null
    }
    html: string
  }
}

const categoryColors: Record<string, string> = {
  Anime: "#e60012",
  Games: "#0055a5",
  Tech: "#00c853",
  "Cultura Pop": "#e91e8c",
}

const PostTemplate: React.FC<PageProps<PostData>> = ({ data }) => {
  const post = data.markdownRemark
  const { title, category, author, date, coverColor, slug } = post.frontmatter
  const catColor = categoryColors[category] || "#e60012"
  const gradient =
    coverColor || `linear-gradient(135deg, ${catColor} 0%, #1a1a2e 100%)`

  return (
    <Layout>
      <article style={{ maxWidth: "800px", margin: "0 auto" }}>
        <a
          href="/"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.8rem",
            color: "#ffd700",
            textTransform: "uppercase",
            letterSpacing: "2px",
            display: "inline-block",
            marginBottom: "16px",
          }}
        >
          ← Voltar
        </a>

        {/* Hero header */}
        <div
          style={{
            background: gradient,
            borderRadius: "4px",
            padding: "48px 32px",
            marginBottom: "32px",
            position: "relative",
            overflow: "hidden",
            border: "3px solid #000",
            boxShadow: "4px 4px 0 rgba(0,0,0,0.5)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontFamily: "var(--font-display)",
              fontSize: "12rem",
              color: "rgba(255,255,255,0.04)",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              pointerEvents: "none",
            }}
          >
            {category}
          </div>
          <span
            style={{
              background: catColor,
              color: "#fff",
              fontFamily: "var(--font-display)",
              fontSize: "0.75rem",
              padding: "4px 14px",
              textTransform: "uppercase",
              letterSpacing: "1px",
              transform: "skewX(-5deg)",
              display: "inline-block",
              marginBottom: "16px",
            }}
          >
            {category}
          </span>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "2.5rem",
              color: "#ffffff",
              textTransform: "uppercase",
              lineHeight: 1.1,
              textShadow: "3px 3px 0 rgba(0,0,0,0.6)",
              marginBottom: "16px",
            }}
          >
            {title}
          </h1>
          <div
            style={{
              display: "flex",
              gap: "16px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.85rem",
                color: "#ffd700",
                textTransform: "uppercase",
              }}
            >
              Por {author}
            </span>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem" }}>
              {date}
            </span>
          </div>
        </div>

        {/* Article body */}
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            borderRadius: "4px",
            padding: "32px",
            border: "1px solid rgba(255,255,255,0.06)",
            lineHeight: 1.8,
            fontSize: "1.05rem",
            color: "#ddd",
          }}
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        {/* Engagement */}
        <div
          style={{
            marginTop: "32px",
            padding: "24px",
            background: "rgba(255,255,255,0.03)",
            borderRadius: "4px",
            border: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.85rem",
                color: "#ffd700",
                textTransform: "uppercase",
                letterSpacing: "1px",
                marginBottom: "4px",
              }}
            >
              Gostou desta edição?
            </div>
            <div style={{ fontSize: "0.8rem", color: "#999" }}>
              Deixe seu voto de fogo!
            </div>
          </div>
          <EngagementButton slug={slug} />
        </div>
      </article>
    </Layout>
  )
}

export default PostTemplate

export const Head: HeadFC<PostData> = ({ data }) => (
  <title>{data.markdownRemark.frontmatter.title} — Revista DO!</title>
)

export const pageQuery = graphql`
  query ($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        slug
        category
        author
        date(formatString: "DD/MM/YYYY")
        coverColor
      }
    }
  }
`
