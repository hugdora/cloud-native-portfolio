import Link from "next/link";

const posts = [
  {
    num: "01",
    title: "Why I used S3 + CloudFront over traditional hosting",
    summary: "The case for private S3 origins, edge delivery, and why running a web server for a static site is the wrong tool for the job.",
    tags: ["AWS", "CloudFront", "S3", "Architecture"],
    readTime: "5 min read",
    href: "/writing/s3-cloudfront-choice",
  },
  {
    num: "02",
    title: "Why Kubernetes is a second deployment track, not the primary one",
    summary: "Kubernetes is powerful, but power has a cost. Here is how I thought about when to use it and when not to — and why that decision matters more than the technology itself.",
    tags: ["Kubernetes", "Architecture", "Decision-making"],
    readTime: "6 min read",
    href: "/writing/kubernetes-second-track",
  },
  {
    num: "03",
    title: "Using GitHub OIDC with AWS for keyless deployment security",
    summary: "Long-lived AWS access keys in CI/CD pipelines are a liability. OIDC eliminates them entirely. Here is how it works and how to set it up.",
    tags: ["GitHub Actions", "AWS", "Security", "IAM"],
    readTime: "7 min read",
    href: "/writing/github-oidc-aws",
  },
  {
    num: "04",
    title: "Readiness vs liveness probes in Kubernetes — what I learned",
    summary: "They look similar, they are configured the same way, but they do fundamentally different things. Confusing them is one of the most common Kubernetes mistakes.",
    tags: ["Kubernetes", "Operations", "Reliability"],
    readTime: "5 min read",
    href: "/writing/kubernetes-probes",
  },
];

export default function WritingPage() {
  return (
    <main style={{ padding: "56px 32px", maxWidth: "900px", margin: "0 auto" }}>
      <style>{`
        .article-row { background: var(--card); display: block; text-decoration: none; color: inherit; padding: 28px 28px 24px; transition: background 0.2s; border-left: 3px solid transparent; }
        .article-row:hover { background: var(--bg3); border-left-color: var(--accent); }
        .article-row:hover .art-arrow { color: var(--accent); transform: translateX(4px); }
        .art-arrow { color: var(--dim); font-size: 16px; transition: color 0.2s, transform 0.2s; display: inline-block; flex-shrink: 0; }
        .art-tag { font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase; padding: 3px 10px; border: 1px solid var(--border); color: var(--dim); border-radius: 1px; }
      `}</style>

      {/* Page header */}
      <div style={{ marginBottom: "52px" }}>
        <div style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)", display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
          Technical writing
          <span style={{ flex: 1, height: "1px", background: "var(--border)", maxWidth: "200px" }} />
        </div>
        <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "16px" }}>
          Writing
        </h1>
        <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.75, maxWidth: "560px" }}>
          Short notes on architecture, delivery, and platform decisions. Each article documents the reasoning behind a real engineering choice made while building this platform.
        </p>
      </div>

      {/* Article list */}
      <div style={{ display: "grid", gap: "1px", background: "var(--border)", marginBottom: "40px" }}>
        {posts.map((post) => (
          <Link key={post.num} href={post.href} className="article-row">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <span style={{ fontFamily: "Syne, sans-serif", fontSize: "32px", fontWeight: 800, color: "var(--border2)", lineHeight: 1, letterSpacing: "-0.04em" }}>
                  {post.num}
                </span>
                <span style={{ fontSize: "10px", color: "var(--dim)", letterSpacing: "0.06em" }}>
                  {post.readTime}
                </span>
              </div>
              <span className="art-arrow">→</span>
            </div>

            <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(16px, 2.5vw, 20px)", fontWeight: 700, color: "#f0f4ff", marginBottom: "10px", lineHeight: 1.25 }}>
              {post.title}
            </h2>

            <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.75, marginBottom: "16px", maxWidth: "620px" }}>
              {post.summary}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {post.tags.map((tag) => (
                <span key={tag} className="art-tag">{tag}</span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      {/* Footer note */}
      <div style={{ padding: "20px 24px", background: "var(--card)", border: "1px solid var(--border)", borderLeft: "2px solid var(--accent)" }}>
        <p style={{ fontSize: "12px", color: "var(--muted)", lineHeight: 1.75 }}>
          These articles are written from implementation experience — not documentation summaries. Every decision described here was made while building and deploying this platform.
        </p>
      </div>
    </main>
  );
}
