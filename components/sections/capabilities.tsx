const groups = [
  {
    title: "Cloud & Infrastructure",
    items: ["AWS EC2", "S3", "CloudFront", "IAM", "Route 53", "ACM", "GuardDuty", "Security Hub", "Azure"],
  },
  {
    title: "Infrastructure as Code",
    items: ["Terraform", "Modular Architecture", "State Management", "Env Separation"],
  },
  {
    title: "Containers & Orchestration",
    items: ["Docker", "Kubernetes", "Deployments", "Services", "Ingress", "Helm", "Health Probes"],
  },
  {
    title: "CI/CD & Automation",
    items: ["GitHub Actions", "Jenkins", "AWS CodePipeline", "CodeBuild", "IAM OIDC", "Build Pipelines", "Quality Gates", "Bash", "PowerShell"],
  },
  {
    title: "Security & Compliance",
    items: ["IAM OIDC", "OAC", "Zero Trust", "Tenable.io", "Microsoft Sentinel", "MITRE ATT&CK", "CIS Benchmarks", "ISO 27001", "GDPR"],
  },
  {
    title: "Systems & Platform",
    items: ["Linux (Ubuntu, CentOS)", "Next.js", "TypeScript", "Ansible", "KQL", "Maven"],
  },
];

export default function Capabilities() {
  return (
    <section style={{ padding: "56px 0" }}>
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
        Core capabilities
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
        A practical toolset built across cloud, security, and platform engineering
      </h2>
      <p
        style={{
          color: "var(--muted)",
          fontSize: "13px",
          lineHeight: 1.7,
          marginBottom: "32px",
        }}
      >
        The full stack from IAM policies to ingress controllers.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1px",
          background: "var(--border)",
        }}
      >
        {groups.map((group) => (
          <div
            key={group.title}
            style={{
              background: "var(--card)",
              padding: "24px 24px 20px",
            }}
          >
            <div
              style={{
                fontFamily: "Syne, sans-serif",
                fontSize: "13px",
                fontWeight: 600,
                color: "#fff",
                marginBottom: "14px",
                letterSpacing: "0.02em",
              }}
            >
              {group.title}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {group.items.map((item) => (
                <span
                  key={item}
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.06em",
                    padding: "4px 10px",
                    border: "1px solid var(--border)",
                    color: "var(--dim)",
                    borderRadius: "1px",
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}
