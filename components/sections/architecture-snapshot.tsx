export default function ArchitectureSnapshot() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="space-y-10">
          <div className="max-w-3xl space-y-3">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
              Architecture Snapshot
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-white">
              Two deployment paths for the same portfolio platform
            </h2>
            <p className="text-base leading-7 text-slate-300">
              The primary path is AWS static delivery for simplicity and cost efficiency.
              The second path is Kubernetes-based delivery to demonstrate orchestration
              and platform operations.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 text-sm text-slate-300">
            <pre className="whitespace-pre-wrap leading-7">{`GitHub Actions
   ├─ CI: lint → type-check → test → build → security scan
   ├─ Deploy Static: out/ → S3 → CloudFront → Route 53
   └─ Deploy K8s: Docker image → registry → Kubernetes → Ingress

Terraform
   └─ S3 / CloudFront / ACM / Route 53 / IAM OIDC`}</pre>
          </div>
        </div>
      </div>
    </section>
  );
}