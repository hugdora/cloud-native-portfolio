export default function TechnicalWriting() {
  const posts = [
    "Why I used S3 + CloudFront for the primary deployment path",
    "Why Kubernetes is a second deployment track, not the primary one",
    "Using GitHub OIDC with AWS for deployment security",
    "Readiness vs liveness probes in Kubernetes",
  ];

  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="space-y-10">
          <div className="max-w-3xl space-y-3">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
              Writing
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-white">
              Short notes on architecture, delivery, and platform choices
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <article
                key={post}
                className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6"
              >
                <h3 className="text-lg font-semibold text-white">{post}</h3>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}