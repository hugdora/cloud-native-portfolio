import Link from "next/link";

const projects = [
  {
    num: "01",
    category: "Cloud Infrastructure",
    title: "Cloud-Native Static Platform on AWS",
    description:
      "Private S3 origin with CloudFront CDN, Origin Access Control, ACM HTTPS, and Route 53 DNS. Fully provisioned with Terraform. IAM OIDC for keyless GitHub Actions deployment.",
    tags: ["AWS S3", "CloudFront", "Terraform", "Route 53", "ACM", "Next.js"],
    href: "/projects/cloud-platform",
    highlight: "Production-grade static delivery with zero direct S3 exposure.",
  },
  {
    num: "02",
    category: "Container Orchestration",
    title: "Kubernetes Delivery Platform",
    description:
      "Containerised application delivery using Deployments, Services, Ingress, readiness and liveness probes, and Helm packaging. Runs as a parallel deployment track alongside the AWS static path.",
    tags: ["Kubernetes", "Docker", "Helm", "Ingress", "CI/CD"],
    href: "/projects/kubernetes-platform",
    highlight: "Demonstrates full container lifecycle management and orchestration.",
  },
  {
    num: "03",
    category: "CI/CD & Automation",
    title: "Dual-Track CI/CD Delivery Pipeline",
    description:
      "GitHub Actions workflow with lint, type-check, test, security scan, and two independent deploy paths: S3/CloudFront and Kubernetes. IAM OIDC for keyless AWS authentication — no stored credentials.",
    tags: ["GitHub Actions", "IAM OIDC", "AWS", "Docker", "TypeScript"],
    href: "/projects/cicd-pipeline",
    highlight: "No long-lived AWS credentials. Two deploy paths. One pipeline.",
  },
];

export default function ProjectsPage() {
  return (
    <main style={{ padding: "56px 32px" }}>
      <style>{`
        .proj-row { background: var(--card); display: block; text-decoration: none; color: inherit; padding: 32px 28px; transition: background 0.2s; }
        .proj-row:hover { background: var(--bg3); }
        .proj-row:hover .proj-num { color: var(--accent); }
        .proj-row:hover .proj-arrow { color: var(--accent); transform: translate(3px, -3px); }
        .proj-arrow { color: var(--dim); font-size: 18px; transition: color 0.2s, transform 0.2s; display: inline-block; }
        .proj-tag { font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase; padding: 3px 10px; background: rgba(74,240,184,0.06); border: 1px solid rgba(74,240,184,0.2); color: var(--accent); border-radius: 1px; }
      `}</style>

      {/* Page header */}
      <div style={{ marginBottom: "52px" }}>
        <div style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)", display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
          Engineering work
          <span style={{ flex: 1, height: "1px", background: "var(--border)", maxWidth: "200px" }} />
        </div>
        <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "16px" }}>
          Projects
        </h1>
        <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.75, maxWidth: "560px" }}>
          Three interconnected projects that together form one cloud-native delivery platform. Each is documented as a full engineering case study — architecture, trade-offs, decisions, and lessons learned.
        </p>
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "var(--border)", marginBottom: "48px" }}>
        {[
          { value: "3", label: "Projects" },
          { value: "2", label: "Deployment tracks" },
          { value: "0", label: "Stored AWS credentials" },
        ].map(({ value, label }) => (
          <div key={label} style={{ background: "var(--card)", padding: "20px 24px" }}>
            <div style={{ fontFamily: "Syne, sans-serif", fontSize: "28px", fontWeight: 800, color: "var(--accent)", lineHeight: 1, marginBottom: "4px" }}>{value}</div>
            <div style={{ fontSize: "11px", color: "var(--muted)", letterSpacing: "0.06em" }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Project list */}
      <div style={{ display: "grid", gap: "1px", background: "var(--border)" }}>
        {projects.map((project) => (
          <Link key={project.num} href={project.href} className="proj-row">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <span className="proj-num" style={{ fontFamily: "DM Mono, monospace", fontSize: "11px", color: "var(--dim)", letterSpacing: "0.1em", transition: "color 0.2s" }}>
                  {project.num}
                </span>
                <span style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--dim)", padding: "3px 8px", border: "1px solid var(--border)", borderRadius: "1px" }}>
                  {project.category}
                </span>
              </div>
              <span className="proj-arrow">↗</span>
            </div>

            <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "20px", fontWeight: 700, color: "#fff", marginBottom: "10px", lineHeight: 1.2 }}>
              {project.title}
            </h2>

            {/* Highlight callout */}
            <div style={{ fontSize: "12px", color: "var(--accent)", marginBottom: "12px", fontFamily: "DM Mono, monospace", letterSpacing: "0.02em" }}>
              → {project.highlight}
            </div>

            <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.75, marginBottom: "20px", maxWidth: "640px" }}>
              {project.description}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {project.tags.map((tag) => (
                <span key={tag} className="proj-tag">{tag}</span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom note */}
      <div style={{ marginTop: "40px", padding: "20px 24px", background: "var(--card)", border: "1px solid var(--border)", borderLeft: "2px solid var(--accent)" }}>
        <p style={{ fontSize: "12px", color: "var(--muted)", lineHeight: 1.75 }}>
          All three projects share a single GitHub repository and are deployed through the same CI/CD pipeline. The infrastructure is fully provisioned with Terraform — reproducible from scratch in minutes.
        </p>
      </div>
    </main>
  );
}
