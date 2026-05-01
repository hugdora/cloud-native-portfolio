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
  {
    num: "04",
    category: "AWS Native CI/CD",
    title: "React App Deployment with AWS CodePipeline",
    description:
      "Full CI/CD pipeline using AWS CodePipeline, CodeBuild, and S3 to automatically build and deploy a React application on every GitHub push. Pipeline lives entirely inside AWS — no GitHub Actions required.",
    tags: ["AWS CodePipeline", "AWS CodeBuild", "S3", "React", "buildspec.yml"],
    href: "/projects/codepipeline-react-s3",
    highlight: "GitHub push → CodePipeline → CodeBuild → S3. Fully automated.",
  },
];

export default function ProjectsPage() {
  return (
    <main style={{ padding: "56px 32px", maxWidth: "900px", margin: "0 auto" }}>
      <style>{`
        .proj-row { background: var(--card); display: block; text-decoration: none; color: inherit; padding: 36px 32px; transition: background 0.2s; border-left: 3px solid transparent; }
        .proj-row:hover { background: var(--bg3); border-left-color: var(--accent); }
        .proj-row:hover .proj-title { color: #ffffff; }
        .proj-row:hover .proj-arrow { color: var(--accent); transform: translate(4px, -4px); }
        .proj-arrow { color: var(--dim); font-size: 22px; transition: color 0.2s, transform 0.25s; display: inline-block; flex-shrink: 0; }
        .proj-title { font-family: Syne, sans-serif; font-size: clamp(22px, 3vw, 30px); font-weight: 800; color: #f0f4ff; line-height: 1.15; letter-spacing: -0.02em; margin-bottom: 10px; transition: color 0.2s; }
        .proj-tag { font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase; padding: 4px 12px; background: rgba(74,240,184,0.06); border: 1px solid rgba(74,240,184,0.2); color: var(--accent); border-radius: 1px; }
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
        <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.75, maxWidth: "580px" }}>
          Four interconnected projects spanning cloud infrastructure, container orchestration, CI/CD automation, and AWS-native delivery pipelines. Each documented as a full engineering case study.
        </p>
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1px", background: "var(--border)", marginBottom: "48px" }}>
        {[
          { value: "4", label: "Projects" },
          { value: "2", label: "Deployment tracks" },
          { value: "2", label: "CI/CD approaches" },
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
                <span style={{ fontFamily: "Syne, sans-serif", fontSize: "48px", fontWeight: 800, color: "var(--border2)", lineHeight: 1, letterSpacing: "-0.04em", userSelect: "none" }}>
                  {project.num}
                </span>
                <span style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", padding: "4px 10px", border: "1px solid rgba(74,240,184,0.3)", borderRadius: "1px", background: "rgba(74,240,184,0.05)", alignSelf: "center" }}>
                  {project.category}
                </span>
              </div>
              <span className="proj-arrow">↗</span>
            </div>

            <h2 className="proj-title">{project.title}</h2>

            <div style={{ fontSize: "12px", color: "var(--accent)", marginBottom: "14px", fontFamily: "DM Mono, monospace", letterSpacing: "0.02em" }}>
              → {project.highlight}
            </div>

            <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.75, marginBottom: "22px", maxWidth: "640px" }}>
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
          Projects 01–03 share a single repository and CI/CD pipeline. Project 04 demonstrates the AWS-native alternative — CodePipeline + CodeBuild — showing two distinct approaches to the same delivery problem.
        </p>
      </div>
    </main>
  );
}
