import Link from "next/link";

const stack = [
  "GitHub Actions", "IAM OIDC", "AWS S3", "CloudFront",
  "Docker", "Kubernetes", "TypeScript", "ESLint",
  "Next.js", "Terraform",
];

const decisions = [
  {
    title: "Why IAM OIDC over long-lived access keys",
    body: "Static AWS access keys stored in GitHub Secrets are a major security risk — they never expire, can be leaked in logs, and require manual rotation. IAM OIDC lets GitHub Actions assume an AWS role dynamically for each workflow run using short-lived tokens. No keys to rotate, no secrets to leak.",
  },
  {
    title: "Why two separate deploy jobs, not one",
    body: "The static S3 deploy and the Kubernetes deploy are independent concerns. Separating them means a Kubernetes cluster issue won't block the static deployment, and each path can be enabled or disabled without modifying shared logic. Each job also has its own IAM permissions — least-privilege by design.",
  },
  {
    title: "Why security scanning in CI, not as a separate tool",
    body: "Shifting security left means catching issues before they reach production. Running a dependency audit and static analysis in every PR build ensures no new vulnerabilities are introduced silently. It also creates a clear audit trail in the GitHub Actions log.",
  },
  {
    title: "Why CloudFront invalidation is part of the deploy job",
    body: "Without cache invalidation, CloudFront may serve stale files for up to 24 hours after a deployment. Running aws cloudfront create-invalidation at the end of every deploy ensures users always get the latest version immediately.",
  },
];

export default function CICDPipelinePage() {
  return (
    <main style={{ padding: "56px 32px", maxWidth: "820px", margin: "0 auto" }}>
      <style>{`
        .decision-card { background: var(--card); border: 1px solid var(--border); padding: 20px 24px; margin-bottom: 1px; }
        .decision-card:hover { border-color: var(--border2); }
        .back-link { color: var(--dim); text-decoration: none; font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; transition: color 0.2s; }
        .back-link:hover { color: var(--accent); }
        .stage { background: var(--card); border: 1px solid var(--border); padding: 12px 16px; border-radius: 2px; }
      `}</style>

      <div style={{ marginBottom: "40px" }}>
        <Link href="/projects" className="back-link">← Projects</Link>
      </div>

      <div style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "16px" }}>
        03 / CI/CD & Automation
      </div>
      <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "20px" }}>
        Dual-Track CI/CD Delivery Pipeline
      </h1>
      <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.75, marginBottom: "52px", maxWidth: "620px" }}>
        A GitHub Actions pipeline that runs quality gates on every push and deploys via two independent paths: a static Next.js export to AWS S3 + CloudFront, and a containerised build to Kubernetes. IAM OIDC provides keyless AWS authentication — no long-lived credentials stored anywhere.
      </p>

      {/* Architecture Diagram */}
      <div style={{ marginBottom: "52px" }}>
        <div style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)", display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
          Pipeline flow
          <span style={{ flex: 1, height: "1px", background: "var(--border)", maxWidth: "200px" }} />
        </div>

        <div style={{ background: "var(--card)", border: "1px solid var(--border)", padding: "32px 24px", position: "relative", overflow: "hidden" }}>
          <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, var(--accent), transparent)" }} />

          <svg width="100%" viewBox="0 0 720 240" style={{ overflow: "visible" }}>
            <defs>
              <marker id="arr3" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M2 1L8 5L2 9" fill="none" stroke="#4af0b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </marker>
              <marker id="arr3b" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M2 1L8 5L2 9" fill="none" stroke="#3a7fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </marker>
            </defs>

            {/* Git Push trigger */}
            <rect x="10" y="100" width="80" height="36" rx="4" fill="#080d1c" stroke="#2a3a60" strokeWidth="1"/>
            <text x="50" y="116" textAnchor="middle" fill="#e8edf8" fontSize="9" fontFamily="DM Mono, monospace">git push</text>
            <text x="50" y="129" textAnchor="middle" fill="#3d4f7a" fontSize="8" fontFamily="DM Mono, monospace">trigger</text>

            <line x1="90" y1="118" x2="118" y2="118" stroke="#4af0b8" strokeWidth="1" markerEnd="url(#arr3)"/>

            {/* CI Stage */}
            <rect x="120" y="60" width="120" height="116" rx="4" fill="#080d1c" stroke="#4af0b8" strokeWidth="1"/>
            <text x="180" y="80" textAnchor="middle" fill="#4af0b8" fontSize="10" fontFamily="DM Mono, monospace" fontWeight="500">CI</text>
            {["lint", "type-check", "test", "build", "sec scan"].map((step, i) => (
              <g key={step}>
                <rect x="132" y={90 + i * 17} width="96" height="13" rx="2" fill="#0b1120" stroke="#1a2444" strokeWidth="0.5"/>
                <text x="180" y={101 + i * 17} textAnchor="middle" fill="#7c8fbb" fontSize="8" fontFamily="DM Mono, monospace">{step}</text>
              </g>
            ))}

            {/* Fork arrow top (static) */}
            <line x1="240" y1="90" x2="300" y2="68" stroke="#4af0b8" strokeWidth="1" markerEnd="url(#arr3)"/>
            {/* Fork arrow bottom (k8s) */}
            <line x1="240" y1="148" x2="300" y2="170" stroke="#3a7fff" strokeWidth="1" markerEnd="url(#arr3b)"/>

            {/* Static deploy path */}
            <rect x="302" y="44" width="130" height="48" rx="4" fill="#080d1c" stroke="#4af0b8" strokeWidth="1"/>
            <text x="367" y="62" textAnchor="middle" fill="#4af0b8" fontSize="10" fontFamily="DM Mono, monospace" fontWeight="500">Static Deploy</text>
            <text x="367" y="76" textAnchor="middle" fill="#3d4f7a" fontSize="8" fontFamily="DM Mono, monospace">next build → out/</text>
            <text x="367" y="87" textAnchor="middle" fill="#3d4f7a" fontSize="8" fontFamily="DM Mono, monospace">aws s3 sync + invalidate</text>

            {/* Arrow static → cloudfront */}
            <line x1="432" y1="68" x2="470" y2="68" stroke="#4af0b8" strokeWidth="1" markerEnd="url(#arr3)"/>

            {/* CloudFront box */}
            <rect x="472" y="44" width="110" height="48" rx="4" fill="#0b1120" stroke="#1a2444" strokeWidth="1"/>
            <text x="527" y="62" textAnchor="middle" fill="#e8edf8" fontSize="10" fontFamily="DM Mono, monospace">S3 + CDN</text>
            <text x="527" y="76" textAnchor="middle" fill="#3d4f7a" fontSize="8" fontFamily="DM Mono, monospace">CloudFront</text>
            <text x="527" y="87" textAnchor="middle" fill="#3d4f7a" fontSize="8" fontFamily="DM Mono, monospace">cache invalidated</text>

            {/* K8s deploy path */}
            <rect x="302" y="148" width="130" height="48" rx="4" fill="#080d1c" stroke="#3a7fff" strokeWidth="1"/>
            <text x="367" y="166" textAnchor="middle" fill="#3a7fff" fontSize="10" fontFamily="DM Mono, monospace" fontWeight="500">K8s Deploy</text>
            <text x="367" y="180" textAnchor="middle" fill="#3d4f7a" fontSize="8" fontFamily="DM Mono, monospace">docker build + push</text>
            <text x="367" y="191" textAnchor="middle" fill="#3d4f7a" fontSize="8" fontFamily="DM Mono, monospace">kubectl apply / helm upgrade</text>

            {/* Arrow k8s → cluster */}
            <line x1="432" y1="172" x2="470" y2="172" stroke="#3a7fff" strokeWidth="1" markerEnd="url(#arr3b)"/>

            {/* K8s cluster */}
            <rect x="472" y="148" width="110" height="48" rx="4" fill="#0b1120" stroke="#1a2444" strokeWidth="1"/>
            <text x="527" y="166" textAnchor="middle" fill="#e8edf8" fontSize="10" fontFamily="DM Mono, monospace">K8s Cluster</text>
            <text x="527" y="180" textAnchor="middle" fill="#3d4f7a" fontSize="8" fontFamily="DM Mono, monospace">rolling update</text>
            <text x="527" y="191" textAnchor="middle" fill="#3d4f7a" fontSize="8" fontFamily="DM Mono, monospace">zero downtime</text>

            {/* IAM OIDC label */}
            <rect x="600" y="100" width="110" height="36" rx="4" fill="#0b1120" stroke="#1a2444" strokeWidth="1" strokeDasharray="4 3"/>
            <text x="655" y="116" textAnchor="middle" fill="#7c8fbb" fontSize="9" fontFamily="DM Mono, monospace">IAM OIDC</text>
            <text x="655" y="129" textAnchor="middle" fill="#3d4f7a" fontSize="8" fontFamily="DM Mono, monospace">keyless auth</text>
            <line x1="600" y1="118" x2="582" y2="92" stroke="#1a2444" strokeWidth="1" strokeDasharray="3 3"/>
            <line x1="600" y1="118" x2="582" y2="148" stroke="#1a2444" strokeWidth="1" strokeDasharray="3 3"/>
          </svg>
        </div>
      </div>

      {/* Problem / Solution */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "var(--border)", marginBottom: "52px" }}>
        {[
          {
            label: "Problem",
            text: "Manual deployments are slow, error-prone, and don't scale. Storing AWS credentials as long-lived secrets is a security risk. Running no quality gates means bugs and type errors reach production."
          },
          {
            label: "Solution",
            text: "Every push triggers a full CI run. On success, two independent deploy jobs run in parallel — one for the static path, one for Kubernetes. IAM OIDC means no AWS credentials are stored anywhere in GitHub."
          }
        ].map(({ label, text }) => (
          <div key={label} style={{ background: "var(--card)", padding: "24px" }}>
            <div style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "10px" }}>{label}</div>
            <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.75 }}>{text}</p>
          </div>
        ))}
      </div>

      {/* Pipeline stages breakdown */}
      <div style={{ marginBottom: "52px" }}>
        <div style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)", display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
          Pipeline stages
          <span style={{ flex: 1, height: "1px", background: "var(--border)", maxWidth: "200px" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "var(--border)" }}>
          {[
            { stage: "lint", desc: "ESLint checks code quality and catches common errors before the build." },
            { stage: "type-check", desc: "TypeScript compiler validates all types — no any leaks, no runtime surprises." },
            { stage: "test", desc: "Unit and integration tests run against the application code." },
            { stage: "build", desc: "next build runs the production build and catches build-time errors." },
            { stage: "security scan", desc: "npm audit checks for known vulnerabilities in the dependency tree." },
            { stage: "deploy (parallel)", desc: "Static path and Kubernetes path run simultaneously — independent failures, faster delivery." },
          ].map(({ stage, desc }) => (
            <div key={stage} style={{ background: "var(--card)", padding: "18px 20px" }}>
              <div style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "6px", fontFamily: "DM Mono, monospace" }}>{stage}</div>
              <p style={{ fontSize: "12px", color: "var(--muted)", lineHeight: 1.7 }}>{desc}</p>
            </div>
          ))}
        </div>
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
          "IAM OIDC trust policies must include the exact GitHub repo and branch in the condition — too permissive and any repo can assume your role, too strict and your own workflow breaks.",
          "CloudFront cache invalidation is not instant — it takes 30–60 seconds. Build your deploy job to trigger it and not wait for confirmation to avoid slowing down the pipeline.",
          "Separating CI from CD in different jobs makes it easy to re-run just the deploy without re-running tests — useful when a deploy fails due to an infrastructure issue, not a code issue.",
          "Caching node_modules in GitHub Actions using actions/cache can cut CI time by 60–80% on subsequent runs by avoiding a full npm install each time.",
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

      <a href="https://github.com/hugdora/cloud-native-portfolio" target="_blank" rel="noopener noreferrer"
        style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "12px", letterSpacing: "0.06em", color: "var(--accent)", textDecoration: "none", border: "1px solid rgba(74,240,184,0.2)", padding: "10px 20px", borderRadius: "2px" }}>
        View repository ↗
      </a>
    </main>
  );
}
