export default function ArchitectureSnapshot() {
  return (
    <section style={{ padding: "56px 0" }}>
      <div className="container">
        {/* Header row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "64px",
            alignItems: "start",
            marginBottom: "32px",
          }}
        >
          {/* Left — label + title + description */}
          <div>
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
              Architecture snapshot
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
                marginBottom: "12px",
                letterSpacing: "-0.01em",
              }}
            >
              Two deployment tracks, one platform
            </h2>
            <p
              style={{
                color: "var(--muted)",
                fontSize: "13px",
                lineHeight: 1.7,
              }}
            >
              The primary path uses AWS static delivery for efficiency. The
              second path is Kubernetes-based to demonstrate orchestration and
              platform operations.
            </p>
          </div>

          {/* Right — quick stats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1px",
              background: "var(--border)",
              alignSelf: "end",
            }}
          >
            {[
              { number: "2", label: "Deployment tracks" },
              { number: "0", label: "Stored credentials" },
              { number: "1", label: "Unified pipeline" },
              { number: "5", label: "Quality gates" },
            ].map(({ number, label }) => (
              <div
                key={label}
                style={{
                  background: "var(--card)",
                  padding: "20px 24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}
              >
                <span
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontSize: "24px",
                    fontWeight: 800,
                    color: "var(--accent)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}
                >
                  {number}
                </span>
                <span
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--dim)",
                    lineHeight: 1.4,
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Full-width code block */}
        <div
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            padding: "28px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Top accent line */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "1px",
              background:
                "linear-gradient(90deg, transparent, var(--accent), transparent)",
            }}
          />

          <pre
            style={{
              fontFamily: "DM Mono, monospace",
              fontSize: "12px",
              lineHeight: 1.9,
              color: "var(--muted)",
              whiteSpace: "pre",
              overflowX: "auto",
              margin: 0,
            }}
          >
            {[
              { type: "hl", text: "GitHub Actions" },
              { type: "plain", text: "\n  " },
              { type: "dim", text: "├─" },
              { type: "plain", text: " CI:      " },
              { type: "hl2", text: "lint" },
              { type: "plain", text: " → type-check → test → build → security scan\n  " },
              { type: "dim", text: "├─" },
              { type: "plain", text: " Deploy:  out/ → " },
              { type: "hl", text: "S3" },
              { type: "plain", text: " → " },
              { type: "hl", text: "CloudFront" },
              { type: "plain", text: " → " },
              { type: "hl", text: "Route 53" },
              { type: "plain", text: "\n  " },
              { type: "dim", text: "└─" },
              { type: "plain", text: " Deploy:  Docker image → registry → " },
              { type: "hl", text: "Kubernetes" },
              { type: "plain", text: " → Ingress\n\n" },
              { type: "hl", text: "Terraform" },
              { type: "plain", text: "\n  " },
              { type: "dim", text: "└─" },
              { type: "plain", text: " S3 (private + OAC) / CloudFront / ACM / Route 53 / IAM OIDC\n\n" },
              { type: "hl", text: "DNS" },
              { type: "plain", text: "\n  " },
              { type: "dim", text: "├─" },
              { type: "plain", text: " doraejangue.com     → " },
              { type: "hl2", text: "A alias" },
              { type: "plain", text: " → CloudFront distribution\n  " },
              { type: "dim", text: "└─" },
              { type: "plain", text: " www.doraejangue.com → " },
              { type: "hl2", text: "redirect" },
              { type: "plain", text: " → doraejangue.com (canonical)" },
            ].map((part, i) => {
              if (part.type === "hl")
                return (
                  <span key={i} style={{ color: "var(--accent)" }}>
                    {part.text}
                  </span>
                );
              if (part.type === "hl2")
                return (
                  <span key={i} style={{ color: "var(--accent2)" }}>
                    {part.text}
                  </span>
                );
              if (part.type === "dim")
                return (
                  <span key={i} style={{ color: "var(--dim)" }}>
                    {part.text}
                  </span>
                );
              return <span key={i}>{part.text}</span>;
            })}
          </pre>
        </div>
      </div>
    </section>
  );
}
