import React from "react"

interface PostCardProps {
  title: string
  slug: string
  category: string
  author: string
  excerpt: string
  coverColor?: string
  featured?: boolean
  index?: number
}

const categoryColors: Record<string, string> = {
  Anime: "#e60012",
  Games: "#0055a5",
  Tech: "#00c853",
  "Cultura Pop": "#e91e8c",
}

const gradientSets = [
  "linear-gradient(135deg, #e60012 0%, #ff6b00 50%, #ffd700 100%)",
  "linear-gradient(135deg, #0055a5 0%, #00a0e9 50%, #00c853 100%)",
  "linear-gradient(135deg, #e91e8c 0%, #ff6b00 50%, #e60012 100%)",
  "linear-gradient(135deg, #1a1a2e 0%, #0055a5 50%, #00a0e9 100%)",
  "linear-gradient(135deg, #ff6b00 0%, #e60012 50%, #e91e8c 100%)",
]

const PostCard: React.FC<PostCardProps> = ({
  title,
  slug,
  category,
  author,
  excerpt,
  coverColor,
  featured = false,
  index = 0,
}) => {
  const gradient = coverColor || gradientSets[index % gradientSets.length]
  const catColor = categoryColors[category] || "#e60012"
  const rotation = featured ? 0 : ((index % 5) - 2) * 1.5

  return (
    <a
      href={`/post/${slug}`}
      style={{
        display: "block",
        textDecoration: "none",
        transform: `rotate(${rotation}deg)`,
        transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        animation: `slideIn 0.4s ease-out ${index * 0.08}s both`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "rotate(0deg) scale(1.05)"
        e.currentTarget.style.zIndex = "10"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = `rotate(${rotation}deg) scale(1)`
        e.currentTarget.style.zIndex = "1"
      }}
    >
      <div
        style={{
          background: gradient,
          borderRadius: "4px",
          overflow: "hidden",
          position: "relative",
          height: featured ? "420px" : "320px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          border: "3px solid #000",
          boxShadow: "4px 4px 0 rgba(0,0,0,0.5), 0 8px 24px rgba(0,0,0,0.3)",
        }}
      >
        {/* Top bar like magazine header */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            background: "rgba(0,0,0,0.7)",
            padding: "6px 12px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: `3px solid ${catColor}`,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.65rem",
              color: "#ffd700",
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            Revista DO!
          </span>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.6rem",
              color: "#ccc",
              textTransform: "uppercase",
            }}
          >
            Ed. {(index + 1).toString().padStart(2, "0")}
          </span>
        </div>

        {/* Category burst badge */}
        <div
          style={{
            position: "absolute",
            top: "40px",
            right: "12px",
            background: catColor,
            color: "#fff",
            fontFamily: "var(--font-display)",
            fontSize: "0.7rem",
            padding: "4px 12px",
            textTransform: "uppercase",
            letterSpacing: "1px",
            transform: "skewX(-5deg)",
            boxShadow: "2px 2px 0 rgba(0,0,0,0.3)",
          }}
        >
          {category}
        </div>

        {/* Decorative elements */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontFamily: "var(--font-display)",
            fontSize: featured ? "8rem" : "5rem",
            color: "rgba(255,255,255,0.06)",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            letterSpacing: "-4px",
          }}
        >
          {category}
        </div>

        {/* Content overlay */}
        <div
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 40%, transparent 100%)",
            padding: "60px 16px 16px",
            position: "relative",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: featured ? "2rem" : "1.4rem",
              color: "#ffffff",
              textTransform: "uppercase",
              lineHeight: 1.1,
              marginBottom: "8px",
              textShadow: "2px 2px 0 rgba(0,0,0,0.8)",
            }}
          >
            {title}
          </h2>
          <p
            style={{
              fontSize: "0.8rem",
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.4,
              marginBottom: "8px",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical" as const,
              overflow: "hidden",
            }}
          >
            {excerpt}
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.75rem",
                color: "#ffd700",
                textTransform: "uppercase",
              }}
            >
              Por {author}
            </span>
            <span
              style={{
                fontSize: "0.65rem",
                color: catColor,
                fontFamily: "var(--font-display)",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Leia mais →
            </span>
          </div>
        </div>
      </div>
    </a>
  )
}

export default PostCard
