import Link from "next/link";

const principles = [
  {
    num: "01",
    title: "Security is not a layer — it is the foundation",
    body: "Every system I build starts with the question: what is the minimum access needed for this to work? IAM OIDC over long-lived credentials. Private S3 origins over public buckets. OAC over legacy OAI. Least privilege is not a compliance checkbox — it is a design constraint applied from day one.",
  },
  {
    num: "02",
    title: "Infrastructure must be reproducible",
    body: "If the only way to rebuild your infrastructure is to remember what you clicked in the console, it is already broken. Everything I provision is in Terraform — version-controlled, reviewable, and deployable from scratch in minutes. The infrastructure is code. It lives in the repo. It has a history.",
  },
  {
    num: "03",
    title: "Automation removes human error from the critical path",
    body: "Manual deployments introduce variability. The tenth time someone runs a deploy, they will skip a step. CI/CD pipelines enforce the same process every time — lint, type-check, test, build, deploy — regardless of who triggers them or when. Consistency at the cost of flexibility is worth it.",
  },
  {
    num: "04",
    title: "Simplicity is an engineering decision, not a compromise",
    body: "The primary deployment path for this platform is S3 + CloudFront, not Kubernetes. That is intentional. Kubernetes adds real operational cost — nodes to manage, probes to tune, networking to debug. For a static site, that cost buys nothing. Use the simplest tool that meets the requirement. Add complexity only when the problem demands it.",
  },
  {
    num: "05",
    title: "Observability is built in, not bolted on",
    body: "A system you cannot observe is a system you cannot operate. Health probes, structured logging, and deployment audit trails are not optional additions — they are part of the delivery contract. In Kubernetes, liveness and readiness probes are the difference between self-healing infrastructure and a silent failure waiting to be discovered.",
  },
];

const platformLayers = [
  {
    layer: "DNS",
    tech: "AWS Route 53",
    role: "A alias record routes doraejangue.com to the CloudFront distribution. www redirects to the canonical root domain via a separate S3 redirect bucket and CloudFront distribution.",
    decision: "Route 53 alias records are free and avoid the TTL limitations of CNAME records at the zone apex.",
  },
  {
    layer: "CDN & TLS",
    tech: "AWS CloudFront + ACM",
    role: "CloudFront terminates HTTPS, caches static assets at the edge globally, and enforces redirect-to-HTTPS on all viewer requests. The ACM certificate covers both the root and www domains.",
    decision: "ACM certificates for CloudFront must be issued in us-east-1 — a hard AWS requirement regardless of where your origin lives.",
  },
  {
    layer: "Origin",
    tech: "AWS S3 (private)",
    role: "The S3 bucket stores the Next.js static export. Public access is fully blocked at the bucket level. Only CloudFront can read from it, authenticated via Origin Access Control with SigV4 signing.",
    decision: "OAC (not the legacy OAI) is the AWS-recommended pattern. It uses short-lived signed requests rather than a static identity, which is harder to misuse.",
  },
  {
    layer: "URL routing",
    tech: "CloudFront Function",
    role: "A viewer-request CloudFront Function rewrites clean URLs to their index.html equivalent. /projects/ becomes /projects/index.html before the request hits S3. Without this, direct navigation returns AccessDenied.",
    decision: "A CloudFront Function runs at the edge with sub-millisecond latency and no cold starts — significantly cheaper and faster than a Lambda@Edge for simple URL rewrites.",
  },
  {
    layer: "IaC",
    tech: "Terraform",
    role: "All AWS resources — S3, CloudFront, OAC, ACM, Route 53, IAM OIDC — are provisioned by Terraform. The module structure separates reusable resource definitions from environment-specific configuration.",
    decision: "Terraform state files are never committed to the repository. The .gitignore excludes *.tfstate, *.tfvars, and .terraform/ from the first commit.",
  },
  {
    layer: "CI/CD",
    tech: "GitHub Actions + IAM OIDC",
    role: "Every push to main triggers a CI run. On success, two independent deploy jobs run in parallel: one syncs the static export to S3 and invalidates CloudFront, the other builds and pushes a Docker image to the registry and deploys to Kubernetes.",
    decision: "IAM OIDC eliminates the need to store AWS access keys in GitHub Secrets. GitHub exchanges a short-lived OIDC token for an AWS role — no credentials to rotate, no secrets to leak.",
  },
];

const twoTracks = [
  {
    track: "Track 1",
    name: "AWS Static",
    label: "Primary",
    color: "var(--accent)",
    borderColor: "rgba(74,240,184,0.3)",
    bg: "rgba(74,240,184,0.04)",
    flow: ["next build", "out/ directory", "aws s3 sync", "CloudFront invalidation", "doraejangue.com"],
    why: "Optimal for static content. No servers to manage, global CDN, sub-100ms TTFB, effectively zero cost at portfolio scale.",
  },
  {
    track: "Track 2",
    name: "Kubernetes",
    label: "Demonstration",
    color: "#3a7fff",
    borderColor: "rgba(58,127,255,0.3)",
    bg: "rgba(58,127,255,0.04)",
    flow: ["docker build", "image registry", "helm upgrade", "rolling update", "Ingress → pods"],
    why: "Demonstrates orchestration, health management, and platform operations — skills that matter for production workloads at scale.",
  },
];

export default function ArchitecturePage() {
  return (
    <main style={{ padding: "56px 32px", maxWidth: "860px", margin: "0 auto" }}>
      <style>{`
        .arch-section { margin-bottom: 64px; }
        .section-label { font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; color: var(--accent); display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
        .section-label::after { content: ''; flex: 1; height: 1px; background: var(--border); max-width: 200px; }
        .section-title { font-family: Syne, sans-serif; font-size: clamp(20px, 3vw, 28px); font-weight: 700; color: #fff; margin-bottom: 8px; letter-spacing: -0.01em; }
        .section-sub { color: var(--muted); font-size: 13px; line-height: 1.75; max-width: 600px; margin-bottom: 36px; }
        .principle-item { display: flex; gap: 24px; padding: 24px 0; border-bottom: 1px solid var(--border); }
        .principle-item:last-child { border-bottom: none; }
        .principle-num { font-family: Syne, sans-serif; font-size: 13px; font-weight: 700; color: var(--accent); flex-shrink: 0; padding-top: 2px; min-width: 28px; }
        .principle-title { font-family: Syne, sans-serif; font-size: 15px; font-weight: 600; color: #fff; margin-bottom: 10px; line-height: 1.3; }
        .principle-body { font-size: 13px; color: var(--muted); line-height: 1.8; }
        .layer-card { background: var(--card); border: 1px solid var(--border); padding: 22px 24px; margin-bottom: 1px; }
        .layer-header { display: flex; align-items: center; gap: 12px; margin-bottom: 10px; }
        .layer-name { font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--accent); padding: 3px 10px; border: 1px solid rgba(74,240,184,0.25); border-radius: 1px; background: rgba(74,240,184,0.05); flex-shrink: 0; }
        .layer-tech { font-family: Syne, sans-serif; font-size: 14px; font-weight: 600; color: #fff; }
        .layer-role { font-size: 13px; color: var(--muted); line-height: 1.75; margin-bottom: 10px; }
        .layer-decision { font-size: 12px; color: var(--dim); line-height: 1.7; padding: 10px 14px; border-left: 2px solid var(--accent); background: rgba(74,240,184,0.03); }
        .layer-decision::before { content: 'Decision rationale: '; color: var(--accent); font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; display: block; margin-bottom: 4px; }
        .track-card { border: 1px solid; padding: 24px; border-radius: 2px; margin-bottom: 1px; }
        .track-label { font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; padding: 3px 10px; border-radius: 1px; border: 1px solid; display: inline-block; margin-bottom: 12px; }
        .track-name { font-family: Syne, sans-serif; font-size: 18px; font-weight: 700; color: #fff; margin-bottom: 6px; }
        .track-flow { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; margin: 14px 0; }
        .flow-step { font-size: 11px; font-family: DM Mono, monospace; padding: 5px 12px; border: 1px solid var(--border); color: var(--muted); border-radius: 1px; background: var(--card); }
        .flow-arrow { color: var(--dim); font-size: 12px; }
        .track-why { font-size: 12px; color: var(--muted); line-height: 1.7; }
        .back-link { color: var(--dim); text-decoration: none; font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; }
        .back-link:hover { color: var(--accent); }
        .proof-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--border); }
        .proof-item { background: var(--card); padding: 18px 20px; }
        .proof-check { font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--accent); margin-bottom: 6px; display: flex; align-items: center; gap: 6px; }
        .proof-check::before { content: '✓'; font-size: 12px; }
        .proof-detail { font-size: 12px; color: var(--muted); line-height: 1.65; }
      `}</style>

      {/* Page header */}
      <div style={{ marginBottom: "52px" }}>
        <div className="section-label">System design</div>
        <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "20px" }}>
          Architecture
        </h1>
        <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.8, maxWidth: "600px" }}>
          How I think about building systems — the principles behind every decision, the structure of the delivery platform, and the reasoning that connects security, automation, and simplicity into one coherent approach.
        </p>
      </div>

      {/* Engineering principles */}
      <div className="arch-section">
        <div className="section-label">Engineering principles</div>
        <h2 className="section-title">How I think before I build</h2>
        <p className="section-sub">
          These are not rules I follow — they are positions I hold. Every architectural decision in this platform traces back to one of them.
        </p>
        <div>
          {principles.map((p) => (
            <div key={p.num} className="principle-item">
              <span className="principle-num">{p.num}</span>
              <div>
                <div className="principle-title">{p.title}</div>
                <p className="principle-body">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Platform architecture diagram (text-based) */}
      <div className="arch-section">
        <div className="section-label">Platform overview</div>
        <h2 className="section-title">The full delivery stack</h2>
        <p className="section-sub">
          Every layer of this platform was chosen deliberately. Here is what each one does and why it was chosen over the alternatives.
        </p>

        {/* Visual flow */}
        <div style={{ background: "var(--card)", border: "1px solid var(--border)", padding: "28px", marginBottom: "24px", position: "relative", overflow: "hidden" }}>
          <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, var(--accent), transparent)" }} />

          <svg width="100%" viewBox="0 0 760 72" style={{ overflow: "visible", display: "block" }}>
            <defs>
              <marker id="page-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                <path d="M2 1L8 5L2 9" fill="none" stroke="#4af0b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </marker>
            </defs>
            {[
              { label: "User", sub: "Browser", x: 0 },
              { label: "Route 53", sub: "DNS", x: 130 },
              { label: "CloudFront", sub: "CDN + TLS", x: 260, highlight: true },
              { label: "OAC", sub: "SigV4 auth", x: 390 },
              { label: "S3", sub: "Private origin", x: 500 },
            ].map((node, i) => (
              <g key={node.label}>
                <rect x={node.x} y="8" width="110" height="48" rx="4"
                  fill={node.highlight ? "#080d1c" : "#0b1120"}
                  stroke={node.highlight ? "#4af0b8" : "#1a2444"}
                  strokeWidth={node.highlight ? 1.5 : 1}/>
                <text x={node.x + 55} y="30" textAnchor="middle" fill={node.highlight ? "#4af0b8" : "#e8edf8"} fontSize="11" fontFamily="DM Mono, monospace" fontWeight={node.highlight ? "600" : "400"}>{node.label}</text>
                <text x={node.x + 55} y="46" textAnchor="middle" fill="#3d4f7a" fontSize="9" fontFamily="DM Mono, monospace">{node.sub}</text>
                {i < 4 && <line x1={node.x + 110} y1="32" x2={node.x + 120} y2="32" stroke="#4af0b8" strokeWidth="1" markerEnd="url(#page-arrow)"/>}
              </g>
            ))}
            {/* Terraform underline */}
            <rect x="130" y="64" width="480" height="6" rx="2" fill="transparent" stroke="#1a2444" strokeWidth="1" strokeDasharray="4 3"/>
            <text x="370" y="70" textAnchor="middle" fill="#3d4f7a" fontSize="8" fontFamily="DM Mono, monospace">Terraform — all resources provisioned as code</text>
          </svg>
        </div>

        {/* Layer by layer breakdown */}
        <div>
          {platformLayers.map((layer) => (
            <div key={layer.layer} className="layer-card">
              <div className="layer-header">
                <span className="layer-name">{layer.layer}</span>
                <span className="layer-tech">{layer.tech}</span>
              </div>
              <p className="layer-role">{layer.role}</p>
              <div className="layer-decision">{layer.decision}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Two deployment tracks */}
      <div className="arch-section">
        <div className="section-label">Deployment strategy</div>
        <h2 className="section-title">Two tracks, one platform</h2>
        <p className="section-sub">
          The same codebase deploys via two independent paths. This is a deliberate architectural choice — not duplication, but demonstration of two distinct delivery patterns.
        </p>
        <div>
          {twoTracks.map((track) => (
            <div key={track.track} className="track-card" style={{ borderColor: track.borderColor, background: track.bg, marginBottom: "12px" }}>
              <span className="track-label" style={{ color: track.color, borderColor: track.borderColor, background: `${track.color}10` }}>
                {track.label}
              </span>
              <div className="track-name">{track.track} — {track.name}</div>
              <div className="track-flow">
                {track.flow.map((step, i) => (
                  <span key={step} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span className="flow-step" style={{ borderColor: track.borderColor, color: track.color }}>{step}</span>
                    {i < track.flow.length - 1 && <span className="flow-arrow">→</span>}
                  </span>
                ))}
              </div>
              <p className="track-why">{track.why}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Security model */}
      <div className="arch-section">
        <div className="section-label">Security model</div>
        <h2 className="section-title">How access is controlled</h2>
        <p className="section-sub">
          Every access boundary in this platform is explicit. Nothing is open by default.
        </p>
        <div className="proof-grid">
          {[
            {
              check: "S3 fully private",
              detail: "Block Public Access is enabled at the bucket level. No S3 object URL is reachable directly from the internet under any circumstance.",
            },
            {
              check: "CloudFront-only origin access",
              detail: "The S3 bucket policy allows only the specific CloudFront distribution ARN to call s3:GetObject. Any other principal — including AWS root — is denied.",
            },
            {
              check: "OAC SigV4 signing",
              detail: "CloudFront authenticates every request to S3 using AWS Signature Version 4. This is the current AWS-recommended pattern, replacing the legacy Origin Access Identity.",
            },
            {
              check: "Keyless CI/CD auth",
              detail: "GitHub Actions authenticates to AWS using IAM OIDC. Each workflow run receives a short-lived token. No AWS access keys exist in GitHub Secrets.",
            },
            {
              check: "HTTPS enforced end-to-end",
              detail: "CloudFront is configured with redirect-to-https on all viewer connections. HTTP requests are never served — they are permanently redirected to HTTPS.",
            },
            {
              check: "Least-privilege IAM",
              detail: "The IAM role assumed by GitHub Actions has only the permissions needed: s3:PutObject, s3:DeleteObject, cloudfront:CreateInvalidation. Nothing more.",
            },
          ].map(({ check, detail }) => (
            <div key={check} className="proof-item">
              <div className="proof-check">{check}</div>
              <p className="proof-detail">{detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Link to projects */}
      <div style={{ padding: "28px", background: "var(--card)", border: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <div style={{ fontFamily: "Syne, sans-serif", fontSize: "15px", fontWeight: 600, color: "#fff", marginBottom: "6px" }}>
            See the implementation
          </div>
          <p style={{ fontSize: "12px", color: "var(--muted)", lineHeight: 1.6 }}>
            Each project page documents the architecture decisions, trade-offs, and lessons learned in full detail.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <Link href="/projects/cloud-platform" style={{ padding: "10px 20px", background: "var(--accent)", color: "#04060f", fontFamily: "DM Mono, monospace", fontSize: "12px", fontWeight: 500, borderRadius: "2px", textDecoration: "none" }}>
            Cloud Platform →
          </Link>
          <Link href="/projects" style={{ padding: "10px 20px", border: "1px solid var(--border2)", color: "var(--text)", fontFamily: "DM Mono, monospace", fontSize: "12px", borderRadius: "2px", textDecoration: "none" }}>
            All Projects
          </Link>
        </div>
      </div>
    </main>
  );
}
