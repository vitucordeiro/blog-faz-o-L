import React, { useState, useEffect, useCallback } from "react"

interface EngagementButtonProps {
  slug: string
}

const EngagementButton: React.FC<EngagementButtonProps> = ({ slug }) => {
  const [count, setCount] = useState(0)
  const [engaged, setEngaged] = useState(false)
  const [animating, setAnimating] = useState(false)

  const storageKey = `revista_engaged_${slug}`

  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey)
      if (stored === "true") setEngaged(true)
    } catch {}

    fetch(`/api/engage?slug=${encodeURIComponent(slug)}`)
      .then((r) => r.json())
      .then((data) => {
        setCount(data.count || 0)
      })
      .catch(() => {})
  }, [slug, storageKey])

  const handleEngage = useCallback(async () => {
    if (engaged) return

    setAnimating(true)
    setTimeout(() => setAnimating(false), 600)

    try {
      const res = await fetch("/api/engage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      })
      const data = await res.json()
      setCount(data.count || count + 1)
      if (!data.alreadyEngaged) {
        setEngaged(true)
        try {
          localStorage.setItem(storageKey, "true")
        } catch {}
      }
    } catch {
      setCount((c) => c + 1)
      setEngaged(true)
      try {
        localStorage.setItem(storageKey, "true")
      } catch {}
    }
  }, [engaged, slug, count, storageKey])

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <button
        onClick={handleEngage}
        disabled={engaged}
        aria-label={engaged ? "Já curtiu" : "Curtir este post"}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "12px 24px",
          border: engaged ? "2px solid #ff6b00" : "2px solid #e60012",
          borderRadius: "4px",
          background: engaged
            ? "linear-gradient(135deg, #ff6b00 0%, #ffd700 100%)"
            : "linear-gradient(135deg, #e60012 0%, #ff6b00 100%)",
          color: "#ffffff",
          fontFamily: "var(--font-display)",
          fontSize: "1.1rem",
          textTransform: "uppercase" as const,
          letterSpacing: "1px",
          cursor: engaged ? "default" : "pointer",
          transition: "all 0.3s",
          transform: animating ? "scale(1.2)" : "scale(1)",
          boxShadow: engaged
            ? "0 0 20px rgba(255, 107, 0, 0.4)"
            : "3px 3px 0 rgba(0,0,0,0.3)",
          opacity: engaged ? 0.9 : 1,
          position: "relative" as const,
          overflow: "hidden",
        }}
        onMouseEnter={(e) => {
          if (!engaged) {
            e.currentTarget.style.transform = "scale(1.08)"
            e.currentTarget.style.boxShadow =
              "0 0 20px rgba(230, 0, 18, 0.5), 3px 3px 0 rgba(0,0,0,0.3)"
          }
        }}
        onMouseLeave={(e) => {
          if (!engaged) {
            e.currentTarget.style.transform = "scale(1)"
            e.currentTarget.style.boxShadow = "3px 3px 0 rgba(0,0,0,0.3)"
          }
        }}
      >
        <span
          style={{
            fontSize: "1.4rem",
            animation: animating ? "engagePulse 0.6s ease-out" : "none",
          }}
        >
          {engaged ? "🔥" : "❤️‍🔥"}
        </span>
        <span>{engaged ? "Curtido!" : "Curtir"}</span>
      </button>
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.2rem",
          color: "#ffd700",
          minWidth: "40px",
        }}
      >
        {count > 0 && `${count}`}
      </span>
    </div>
  )
}

export default EngagementButton
