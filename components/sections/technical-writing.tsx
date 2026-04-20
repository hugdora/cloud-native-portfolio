import Link from "next/link";

const posts = [
  {
    title: "Why I used S3 + CloudFront over traditional hosting",
    href: "/writing/s3-cloudfront-choice",
  },
  {
    title: "Why Kubernetes is a second deployment track, not the primary one",
    href: "/writing/kubernetes-second-track",
  },
  {
    title: "Using GitHub OIDC with AWS for keyless deployment security",
    href: "/writing/github-oidc-aws",
  },
  {
    title: "Readiness vs liveness probes in Kubernetes — what I learned",
    href: "/writing/kubernetes-probes",
  },
];

export default function TechnicalWriting() {
  return (
    <section style={{ padding: "56px 32px" }}>
      <style>{`
        .writing-item { background: var(--card); transition: background 0.2s; display: flex; justify-content: space-between; align-items: center; padding: 20px 28px; text-decoration: none; color: inherit; }
        .writing-item:hover { background: var(--bg3); }
        .w-arrow { color: var(--dim); transition: color 0.2s, transform 0.2s; font-size: 14px; flex-shrink: 0; margin-left: 16px; }
        .writing-item:hover .w-arrow { color: var(--accent); transform: translateX(4px); }
      `}</style>

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
        <span style={{ flex: 1, height: "1px", background: "var(--border)", maxWidth: "200px" }} />
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
        Short notes on architecture & platform decisions
      </h2>
      <p
        style={{
          color: "var(--muted)",
          fontSize: "13px",
          lineHeight: 1.7,
          marginBottom: "28px",
        }}
      >
        Engineering reasoning behind every major choice in this platform.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "var(--border)" }}>
        {posts.map((post) => (
          <Link key={post.href} href={post.href} className="writing-item">
            <span style={{ fontSize: "13px", color: "var(--text)" }}>{post.title}</span>
            <span className="w-arrow">→</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
