const groups = [
  {
    title: "Cloud Infrastructure",
    items: ["AWS", "IAM", "S3", "CloudFront", "Route 53", "ACM"],
  },
  {
    title: "Infrastructure as Code",
    items: ["Terraform modules", "Environment separation", "Reusable provisioning"],
  },
  {
    title: "Containers & Orchestration",
    items: ["Docker", "Kubernetes", "Deployments", "Services", "Ingress", "Helm"],
  },
  {
    title: "CI/CD & Automation",
    items: ["GitHub Actions", "Build pipelines", "Release workflows", "Quality gates"],
  },
];

export default function Capabilities() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="space-y-10">
          <div className="max-w-3xl space-y-3">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
              Core Capabilities
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-white">
              Focused on shipping and operating cloud-native systems
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {groups.map((group) => (
              <div
                key={group.title}
                className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6"
              >
                <h3 className="mb-4 text-lg font-semibold text-white">{group.title}</h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  {group.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}