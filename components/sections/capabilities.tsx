const groups = [
  {
    title: "Cloud Infrastructure",
    items: ["AWS", "IAM", "S3", "CloudFront", "Route 53", "ACM", "OAC"],
  },
  {
    title: "Infrastructure as Code",
    items: ["Terraform", "Modules", "Env separation", "State management"],
  },
  {
    title: "Containers & Orchestration",
    items: ["Docker", "Kubernetes", "Deployments", "Services", "Ingress", "Helm", "Probes"],
  },
  {
    title: "CI/CD & Automation",
    items: ["GitHub Actions", "Jenkins", "IAM OIDC", "Build pipelines", "Quality gates"],
  },
];

export default function Capabilities() {
  return (
    <section style={{ padding: "56px 32px" }}>
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
        Focused on shipping and operating cloud-native systems
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
    </section>
  );
}
