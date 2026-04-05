export default function FeaturedProjects() {
  const projects = [
    {
      title: "Cloud-Native Delivery Platform",
      summary:
        "A portfolio platform delivered through Terraform-managed AWS infrastructure and a Kubernetes deployment track.",
      stack: ["Next.js", "TypeScript", "AWS", "Terraform", "Kubernetes"],
    },
    {
      title: "AWS Static Hosting Infrastructure",
      summary:
        "Terraform-managed AWS hosting with S3, CloudFront, Route 53, ACM, and secure delivery workflow design.",
      stack: ["AWS", "Terraform", "S3", "CloudFront", "Route 53"],
    },
    {
      title: "Kubernetes Delivery Platform",
      summary:
        "Containerized application delivery with Deployments, Services, Ingress, probes, and Helm packaging.",
      stack: ["Docker", "Kubernetes", "Helm", "Ingress"],
    },
  ];

  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="space-y-10">
          <div className="max-w-3xl space-y-3">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
              Selected Engineering Work
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-white">
              Case studies built around delivery, infrastructure, and operations
            </h2>
            <p className="text-base leading-7 text-slate-300">
              Each project is documented as an engineering case study with architecture,
              trade-offs, delivery workflow, and operational decisions.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.title}
                className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6"
              >
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                  <p className="text-sm leading-6 text-slate-300">{project.summary}</p>

                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}