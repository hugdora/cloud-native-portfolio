import Link from "next/link";

const posts = [
  {
    title: "Using GitHub OIDC with AWS for keyless deployment security",
    href: "/writing/github-oidc-aws",
    tag: "Security · IAM",
    mins: "7 min read",
  },
  {
    title: "Why I used S3 + CloudFront over traditional hosting",
    href: "/writing/s3-cloudfront-choice",
    tag: "AWS · Architecture",
    mins: "5 min read",
  },
  {
    title: "Readiness vs liveness probes in Kubernetes — what I learned",
    href: "/writing/kubernetes-probes",
    tag: "Kubernetes · Reliability",
    mins: "5 min read",
  },
  {
    title: "Why Kubernetes is a second deployment track, not the primary one",
    href: "/writing/kubernetes-second-track",
    tag: "Kubernetes · Architecture",
    mins: "6 min read",
  },
];

export default function TechnicalWriting() {
  return (
    <section style={{ padding: "56px 0" }}>
      <style>{`
        .writing-item { background: var(--card); transition: background 0.2s; display: flex; justify-content: space-between; align-items: center; padding: 20px 28px; text-decoration: none; color: inherit; gap: 16px; }
        .writing-item:hover { background: var(--bg3); }
        .w-arrow { color: var(--dim); transition: color 0.2s, transform 0.2s; font-size: 14px; flex-shrink: 0; }
        .writing-item:hover .w-arrow { color: var(--accent); transform: translateX(4px); }
      `}</style>

      <div className="container">
        <div
          style={{
            fontSize: "10px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--accent)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "16px",
          }}
        >
          Writing
          <span
            style={{
              flex: 1,
              height: "1px",
              background: "var(--border)",
              maxWidth: "200px",
            }}
          />
        </div>

        <h2
          style={{
            fontFamily: "Syne, sans-serif",
            fontSize: "clamp(20px, 3vw, 28px)",
            fontWeight: 700,
            color: "#fff",
            marginBottom: "8px",
            letterSpacing: "-0.01em",
          }}
        >
          Engineering reasoning, documented
        </h2>
        <p
          style={{
            color: "var(--muted)",
            fontSize: "13px",
            lineHeight: 1.7,
            marginBottom: "28px",
            maxWidth: "520px",
          }}
        >
          Short notes on the architectural decisions made while building this
          platform — not documentation summaries, but implementation experience.
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1px",
            background: "var(--border)",
            marginBottom: "20px",
          }}
        >
          {posts.map((post) => (
            <Link key={post.href} href={post.href} className="writing-item">
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <span
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--dim)",
                  }}
                >
                  {post.tag} · {post.mins}
                </span>
                <span style={{ fontSize: "13px", color: "var(--text)" }}>
                  {post.title}
                </span>
              </div>
              <span className="w-arrow">→</span>
            </Link>
          ))}
        </div>

        <Link
          href="/writing"
          style={{
            fontSize: "12px",
            color: "var(--dim)",
            textDecoration: "none",
            letterSpacing: "0.06em",
            transition: "color 0.2s",
          }}
        >
          Read all notes →
        </Link>
      </div>
    </section>
  );
}
