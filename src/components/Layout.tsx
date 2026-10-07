import React from "react"

const categories = ["Anime", "Games", "Tech", "Cultura Pop"]
const contributors = [
  { name: "Gaba", email: "gaba@revista.com" },
  { name: "Lucas", email: "lucas@revista.com" },
  { name: "Laura", email: "laura@revista.com" },
  { name: "Marina", email: "marina@revista.com" },
  { name: "Vitor", email: "vitor@revista.com" },
]

const styles = {
  header: {
    background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)",
    borderBottom: "4px solid #e60012",
    position: "sticky" as const,
    top: 0,
    zIndex: 100,
  },
  headerInner: {
    maxWidth: "var(--max-width)",
    margin: "0 auto",
    padding: "0 var(--gutter)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap" as const,
  },
  logo: {
    fontFamily: "var(--font-display)",
    fontSize: "2.5rem",
    color: "#ffffff",
    textTransform: "uppercase" as const,
    letterSpacing: "2px",
    padding: "12px 0",
    display: "flex",
    alignItems: "center",
    gap: "4px",
    textDecoration: "none",
  },
  logoAccent: {
    background: "#e60012",
    color: "#ffffff",
    padding: "2px 10px",
    transform: "skewX(-5deg)",
    display: "inline-block",
    fontSize: "2.8rem",
    textShadow: "2px 2px 0 #000",
  },
  logoSuffix: {
    color: "#ffd700",
    fontSize: "1.8rem",
    fontStyle: "italic" as const,
    marginLeft: "2px",
  },
  nav: {
    display: "flex",
    gap: "0",
    flexWrap: "wrap" as const,
  },
  navLink: {
    fontFamily: "var(--font-display)",
    fontSize: "0.95rem",
    color: "#ffffff",
    textTransform: "uppercase" as const,
    padding: "8px 16px",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    textDecoration: "none",
    transition: "all 0.2s",
    letterSpacing: "1px",
    position: "relative" as const,
  },
  main: {
    maxWidth: "var(--max-width)",
    margin: "0 auto",
    padding: "24px var(--gutter)",
    minHeight: "70vh",
  },
  footer: {
    background: "#0a0a0a",
    borderTop: "4px solid #e60012",
    padding: "32px var(--gutter)",
    marginTop: "48px",
  },
  footerInner: {
    maxWidth: "var(--max-width)",
    margin: "0 auto",
    textAlign: "center" as const,
  },
  footerTitle: {
    fontFamily: "var(--font-display)",
    fontSize: "1.2rem",
    color: "#ffd700",
    textTransform: "uppercase" as const,
    marginBottom: "16px",
    letterSpacing: "2px",
  },
  contributorsGrid: {
    display: "flex",
    justifyContent: "center",
    gap: "24px",
    flexWrap: "wrap" as const,
    marginBottom: "24px",
  },
  contributor: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: "4px",
  },
  contributorAvatar: {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "var(--font-display)",
    fontSize: "1.2rem",
    color: "#ffffff",
    border: "2px solid #ffd700",
  },
  contributorName: {
    fontFamily: "var(--font-display)",
    fontSize: "0.85rem",
    color: "#ffffff",
    textTransform: "uppercase" as const,
  },
  contributorEmail: {
    fontSize: "0.7rem",
    color: "#999",
  },
  copyright: {
    color: "#666",
    fontSize: "0.8rem",
    marginTop: "8px",
  },
}

const avatarColors = ["#e60012", "#0055a5", "#00c853", "#e91e8c", "#ff6b00"]

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <a href="/" style={styles.logo}>
            <span>Revista</span>
            <span style={styles.logoAccent}>DO!</span>
            <span style={styles.logoSuffix}>extra</span>
          </a>
          <nav style={styles.nav}>
            {categories.map((cat) => (
              <a
                key={cat}
                href="/"
                style={styles.navLink}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#ffd700"
                  e.currentTarget.style.background = "rgba(255, 215, 0, 0.1)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#ffffff"
                  e.currentTarget.style.background = "transparent"
                }}
              >
                {cat}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main style={styles.main}>{children}</main>

      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <div style={styles.footerTitle}>Equipe Editorial</div>
          <div style={styles.contributorsGrid}>
            {contributors.map((c, i) => (
              <div key={c.name} style={styles.contributor}>
                <div
                  style={{
                    ...styles.contributorAvatar,
                    background: avatarColors[i],
                  }}
                >
                  {c.name[0]}
                </div>
                <span style={styles.contributorName}>{c.name}</span>
                <span style={styles.contributorEmail}>{c.email}</span>
              </div>
            ))}
          </div>
          <div style={styles.copyright}>
            © 2026 Revista DO! — Todos os direitos reservados
          </div>
        </div>
      </footer>
    </>
  )
}

export default Layout
