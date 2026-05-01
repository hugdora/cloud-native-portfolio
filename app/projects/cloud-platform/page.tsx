import Link from "next/link";

const stack = [
  "AWS S3", "AWS CloudFront", "AWS Route 53",
  "AWS Certificate Manager", "Origin Access Control",
  "Terraform", "Next.js", "GitHub Actions", "IAM OIDC",
];

const decisions = [
  {
    title: "Why private S3 + OAC over public bucket",
    body: "Public S3 buckets expose the origin URL directly — anyone can bypass CloudFront and hit the bucket with no rate limiting, no caching, and no HTTPS enforcement. Origin Access Control (OAC) locks the bucket to CloudFront only via SigV4-signed requests, keeping the origin fully private.",
  },
  {
    title: "Why CloudFront over a simple web server",
    body: "CloudFront provides global edge delivery, automatic HTTPS termination, and a 1TB/month free tier. For a static portfolio, it's more performant and cheaper than running an EC2 instance, and removes all server maintenance overhead.",
  },
  {
    title: "Why Terraform over manual AWS console setup",
    body: "Manual console setups are not reproducible and don't survive team collaboration or disaster recovery. Terraform makes the entire infrastructure version-controlled, reviewable, and re-deployable from scratch in minutes.",
  },
  {
    title: "Why CloudFront Functions for URL rewriting",
    body: "Next.js static export generates index.html files inside directories. Without a viewer-request rewrite, direct navigation to /projects/ returns AccessDenied from S3. A lightweight CloudFront Function rewrites clean URLs to their index.html equivalent at the edge — no Lambda cold starts needed.",
  },
];

export default function CloudPlatformPage() {
  return (
    <main style={{ padding: "56px 32px", maxWidth: "820px", margin: "0 auto" }}>
      <style>{`
        .decision-card { background: var(--card); border: 1px solid var(--border); padding: 20px 24px; margin-bottom: 1px; }
        .decision-card:hover { border-color: var(--border2); }
        .back-link { color: var(--dim); text-decoration: none; font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; transition: color 0.2s; }
        .back-link:hover { color: var(--accent); }
      `}</style>

      {/* Back */}
      <div style={{ marginBottom: "40px" }}>
        <Link href="/projects" className="back-link">← Projects</Link>
      </div>

      {/* Header */}
      <div style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "16px" }}>
        01 / Cloud Infrastructure
      </div>
      <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "20px" }}>
        Cloud-Native Static Platform on AWS
      </h1>
      <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.75, marginBottom: "52px", maxWidth: "620px" }}>
        Designed and deployed a secure, globally distributed static delivery platform using AWS S3, CloudFront, Route 53, and ACM — fully provisioned with Terraform and deployed via GitHub Actions with keyless IAM OIDC authentication.
      </p>

      {/* Architecture Diagram */}
      <div style={{ marginBottom: "52px" }}>
        <div style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)", display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
          Architecture
          <span style={{ flex: 1, height: "1px", background: "var(--border)", maxWidth: "200px" }} />
        </div>

        <div style={{ background: "var(--card)", border: "1px solid var(--border)", padding: "32px 24px", position: "relative", overflow: "hidden" }}>
          <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, var(--accent), transparent)" }} />

          <svg width="100%" viewBox="0 0 720 200" style={{ overflow: "visible" }}>
            {/* Arrow marker */}
            <defs>
              <marker id="arr1" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M2 1L8 5L2 9" fill="none" stroke="#4af0b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </marker>
            </defs>

            {/* User */}
            <rect x="10" y="76" width="90" height="44" rx="4" fill="#0b1120" stroke="#1a2444" strokeWidth="1"/>
            <text x="55" y="95" textAnchor="middle" fill="#e8edf8" fontSize="11" fontFamily="DM Mono, monospace">User</text>
            <text x="55" y="111" textAnchor="middle" fill="#3d4f7a" fontSize="9" fontFamily="DM Mono, monospace">Browser</text>

            {/* Arrow */}
            <line x1="100" y1="98" x2="138" y2="98" stroke="#4af0b8" strokeWidth="1" markerEnd="url(#arr1)"/>
            <text x="119" y="90" textAnchor="middle" fill="#3d4f7a" fontSize="8" fontFamily="DM Mono, monospace">DNS</text>

            {/* Route 53 */}
            <rect x="140" y="76" width="100" height="44" rx="4" fill="#080d1c" stroke="#2a3a60" strokeWidth="1"/>
            <text x="190" y="93" textAnchor="middle" fill="#4af0b8" fontSize="11" fontFamily="DM Mono, monospace" fontWeight="500">Route 53</text>
            <text x="190" y="109" textAnchor="middle" fill="#3d4f7a" fontSize="9" fontFamily="DM Mono, monospace">A alias record</text>

            {/* Arrow */}
            <line x1="240" y1="98" x2="278" y2="98" stroke="#4af0b8" strokeWidth="1" markerEnd="url(#arr1)"/>
            <text x="259" y="90" textAnchor="middle" fill="#3d4f7a" fontSize="8" fontFamily="DM Mono, monospace">HTTPS</text>

            {/* CloudFront */}
            <rect x="280" y="60" width="120" height="76" rx="4" fill="#080d1c" stroke="#4af0b8" strokeWidth="1"/>
            <text x="340" y="88" textAnchor="middle" fill="#4af0b8" fontSize="11" fontFamily="DM Mono, monospace" fontWeight="500">CloudFront</text>
            <text x="340" y="104" textAnchor="middle" fill="#3d4f7a" fontSize="9" fontFamily="DM Mono, monospace">CDN + HTTPS</text>
            <text x="340" y="119" textAnchor="middle" fill="#3d4f7a" fontSize="9" fontFamily="DM Mono, monospace">ACM cert</text>
            <text x="340" y="129" textAnchor="middle" fill="#7c8fbb" fontSize="8" fontFamily="DM Mono, monospace">CF Function rewrite</text>

            {/* Arrow */}
            <line x1="400" y1="98" x2="438" y2="98" stroke="#4af0b8" strokeWidth="1" markerEnd="url(#arr1)"/>
            <text x="419" y="90" textAnchor="middle" fill="#3d4f7a" fontSize="8" fontFamily="DM Mono, monospace">OAC</text>

            {/* S3 */}
            <rect x="440" y="60" width="120" height="76" rx="4" fill="#080d1c" stroke="#2a3a60" strokeWidth="1"/>
            <text x="500" y="88" textAnchor="middle" fill="#4af0b8" fontSize="11" fontFamily="DM Mono, monospace" fontWeight="500">S3 Bucket</text>
            <text x="500" y="104" textAnchor="middle" fill="#3d4f7a" fontSize="9" fontFamily="DM Mono, monospace">Private origin</text>
            <text x="500" y="119" textAnchor="middle" fill="#3d4f7a" fontSize="9" fontFamily="DM Mono, monospace">Block public access</text>
            <text x="500" y="129" textAnchor="middle" fill="#7c8fbb" fontSize="8" fontFamily="DM Mono, monospace">Static Next.js export</text>

            {/* Terraform below */}
            <rect x="280" y="168" width="120" height="28" rx="4" fill="#0b1120" stroke="#1a2444" strokeWidth="1" strokeDasharray="4 3"/>
            <text x="340" y="186" textAnchor="middle" fill="#7c8fbb" fontSize="9" fontFamily="DM Mono, monospace">Terraform IaC</text>
            <line x1="340" y1="168" x2="340" y2="136" stroke="#1a2444" strokeWidth="1" strokeDasharray="4 3"/>

            {/* GitHub Actions */}
            <rect x="440" y="168" width="120" height="28" rx="4" fill="#0b1120" stroke="#1a2444" strokeWidth="1" strokeDasharray="4 3"/>
            <text x="500" y="181" textAnchor="middle" fill="#7c8fbb" fontSize="9" fontFamily="DM Mono, monospace">GitHub Actions</text>
            <text x="500" y="192" textAnchor="middle" fill="#3d4f7a" fontSize="8" fontFamily="DM Mono, monospace">IAM OIDC deploy</text>
            <line x1="500" y1="168" x2="500" y2="136" stroke="#1a2444" strokeWidth="1" strokeDasharray="4 3"/>

            {/* Lock badge on S3 */}
            <rect x="546" y="62" width="12" height="12" rx="2" fill="#0d1428" stroke="#2a3a60" strokeWidth="0.5"/>
            <text x="552" y="72" textAnchor="middle" fill="#4af0b8" fontSize="8" fontFamily="DM Mono, monospace">🔒</text>
          </svg>
        </div>
      </div>

      {/* Problem / Solution */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "var(--border)", marginBottom: "52px" }}>
        {[
          {
            label: "Problem",
            text: "Traditional public S3 static hosting exposes the origin directly, lacks security controls, and offers no CDN performance. Any direct S3 URL bypasses HTTPS enforcement and rate limiting."
          },
          {
            label: "Solution",
            text: "CloudFront acts as the single secure entry point. The S3 bucket is fully private — accessible only via Origin Access Control. Terraform provisions every resource. GitHub Actions deploys with IAM OIDC (no long-lived keys)."
          }
        ].map(({ label, text }) => (
          <div key={label} style={{ background: "var(--card)", padding: "24px" }}>
            <div style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "10px" }}>{label}</div>
            <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.75 }}>{text}</p>
          </div>
        ))}
      </div>

      {/* Key decisions */}
      <div style={{ marginBottom: "52px" }}>
        <div style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)", display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
          Engineering decisions
          <span style={{ flex: 1, height: "1px", background: "var(--border)", maxWidth: "200px" }} />
        </div>
        {decisions.map((d) => (
          <div key={d.title} className="decision-card">
            <div style={{ fontFamily: "Syne, sans-serif", fontSize: "13px", fontWeight: 600, color: "#fff", marginBottom: "8px" }}>{d.title}</div>
            <p style={{ fontSize: "12px", color: "var(--muted)", lineHeight: 1.75 }}>{d.body}</p>
          </div>
        ))}
      </div>

      {/* Lessons learned */}
      <div style={{ marginBottom: "52px" }}>
        <div style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)", display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
          Lessons learned
          <span style={{ flex: 1, height: "1px", background: "var(--border)", maxWidth: "200px" }} />
        </div>
        {[
          "CloudFront Functions must be published before they can be attached to a distribution behaviour — creating the function is not enough.",
          "Next.js static export requires trailingSlash: true in next.config.ts so every page exports as /route/index.html, which aligns with the CloudFront URL rewrite logic.",
          "ACM certificates for CloudFront must be requested in us-east-1 regardless of where your S3 bucket is — this is a hard CloudFront requirement.",
          "Terraform state files must never be committed to Git. The .terraform/ directory and *.tfstate files should be in .gitignore from day one.",
        ].map((lesson, i) => (
          <div key={i} style={{ display: "flex", gap: "16px", padding: "14px 0", borderBottom: "1px solid var(--border)" }}>
            <span style={{ color: "var(--accent)", fontSize: "11px", fontFamily: "DM Mono, monospace", flexShrink: 0, paddingTop: "2px" }}>0{i + 1}</span>
            <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.7 }}>{lesson}</p>
          </div>
        ))}
      </div>

      {/* Stack */}
      <div style={{ marginBottom: "40px" }}>
        <div style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)", display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
          Tech stack
          <span style={{ flex: 1, height: "1px", background: "var(--border)", maxWidth: "200px" }} />
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {stack.map((item) => (
            <span key={item} style={{ fontSize: "11px", letterSpacing: "0.06em", padding: "5px 12px", background: "rgba(74,240,184,0.06)", border: "1px solid rgba(74,240,184,0.2)", color: "var(--accent)", borderRadius: "1px" }}>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Repo link */}
      <a href="https://github.com/hugdora/cloud-native-portfolio" target="_blank" rel="noopener noreferrer"
        style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "12px", letterSpacing: "0.06em", color: "var(--accent)", textDecoration: "none", border: "1px solid rgba(74,240,184,0.2)", padding: "10px 20px", borderRadius: "2px" }}>
        View repository ↗
      </a>
    </main>
  );
}
