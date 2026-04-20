import Link from "next/link";

const projects = [
  {
    num: "01",
    title: "Cloud-Native Static Platform on AWS",
    description:
      "Private S3 origin with CloudFront CDN, Origin Access Control, ACM HTTPS, and Route 53 DNS. Fully provisioned with Terraform and deployed via GitHub Actions.",
    tags: ["AWS S3", "CloudFront", "Terraform", "Route 53", "ACM", "Next.js"],
    href: "/projects/cloud-platform",
  },
  {
    num: "02",
    title: "Kubernetes Delivery Platform",
    description:
      "Containerised application delivery using Deployments, Services, Ingress, health probes, and Helm packaging. Second deployment track running parallel to the AWS static path.",
    tags: ["Kubernetes", "Docker", "Helm", "Ingress", "CI/CD"],
    href: "/projects/kubernetes-platform",
  },
  {
    num: "03",
    title: "Dual-Track CI/CD Delivery Pipeline",
    description:
      "GitHub Actions workflow with lint, type-check, test, security scan, and two deploy paths: S3/CloudFront and Kubernetes. IAM OIDC for keyless AWS authentication.",
    tags: ["GitHub Actions", "IAM OIDC", "AWS", "Docker", "TypeScript"],
    href: "/projects/cicd-pipeline",
  },
];

export default function FeaturedProjects() {
  return (
    <section style={{ padding: "56px 32px" }}>
      <style>{`
        .proj-card { background: var(--card); transition: background 0.2s; display: block; text-decoration: none; color: inherit; padding: 28px 28px 24px; }
        .proj-card:hover { background: var(--bg3); }
        .proj-arrow { font-size: 16px; color: var(--dim); transition: color 0.2s; }
        .proj-card:hover .proj-arrow { color: var(--accent); }
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
        Selected engineering work
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
        Production-grade case studies
      </h2>
      <p
        style={{
          color: "var(--muted)",
          fontSize: "13px",
          maxWidth: "540px",
          lineHeight: 1.7,
          marginBottom: "40px",
        }}
      >
        Each project is documented with architecture decisions, trade-offs,
        delivery workflow, and operational design — not just code.
      </p>

      <div style={{ display: "grid", gap: "1px", background: "var(--border)" }}>
        {projects.map((project) => (
          <Link key={project.num} href={project.href} className="proj-card">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "10px",
              }}
            >
              <span style={{ fontSize: "10px", color: "var(--dim)", letterSpacing: "0.1em" }}>
                {project.num} / Project
              </span>
              <span className="proj-arrow">↗</span>
            </div>

            <div
              style={{
                fontFamily: "Syne, sans-serif",
                fontSize: "16px",
                fontWeight: 600,
                color: "#fff",
                marginBottom: "8px",
                lineHeight: 1.3,
              }}
            >
              {project.title}
            </div>

            <div style={{ fontSize: "12px", color: "var(--muted)", lineHeight: 1.7, marginBottom: "16px" }}>
              {project.description}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    padding: "3px 10px",
                    background: "rgba(74,240,184,0.06)",
                    border: "1px solid rgba(74,240,184,0.2)",
                    color: "var(--accent)",
                    borderRadius: "1px",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
