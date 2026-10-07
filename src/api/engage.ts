import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby"

const engagements = new Map<string, Set<string>>()

function getClientIp(req: GatsbyFunctionRequest): string {
  const forwarded = req.headers["x-forwarded-for"]
  if (typeof forwarded === "string") return forwarded.split(",")[0].trim()
  if (Array.isArray(forwarded)) return forwarded[0]
  return req.headers["x-real-ip"] as string || "unknown"
}

export default function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  if (req.method === "GET") {
    const slug = req.query.slug as string
    if (!slug) return res.status(400).json({ error: "slug required" })
    const ips = engagements.get(slug)
    return res.json({ count: ips ? ips.size : 0 })
  }

  if (req.method === "POST") {
    const { slug } = req.body
    if (!slug) return res.status(400).json({ error: "slug required" })

    const ip = getClientIp(req)
    if (!engagements.has(slug)) {
      engagements.set(slug, new Set())
    }

    const ips = engagements.get(slug)!
    const alreadyEngaged = ips.has(ip)

    if (!alreadyEngaged) {
      ips.add(ip)
    }

    return res.json({ count: ips.size, alreadyEngaged })
  }

  res.status(405).json({ error: "method not allowed" })
}
