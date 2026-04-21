import Link from "next/link";

export default function KubernetesSecondTrackArticle() {
  return (
    <main style={{ padding: "56px 32px", maxWidth: "720px" }}>
      <style>{`
        .back-link { color: var(--dim); text-decoration: none; font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; transition: color 0.2s; }
        .back-link:hover { color: var(--accent); }
        .article-body h2 { font-family: Syne, sans-serif; font-size: 18px; font-weight: 700; color: #fff; margin: 40px 0 14px; letter-spacing: -0.01em; }
        .article-body p { font-size: 14px; color: var(--muted); line-height: 1.85; margin-bottom: 18px; }
        .article-body strong { color: var(--text); font-weight: 500; }
        .callout { background: var(--card); border: 1px solid var(--border); border-left: 2px solid var(--accent); padding: 16px 20px; margin: 24px 0; font-size: 13px; color: var(--muted); line-height: 1.75; }
        .callout strong { color: var(--accent); display: block; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 6px; }
        .compare-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--border); margin: 24px 0; }
        .compare-cell { background: var(--card); padding: 16px 18px; }
        .compare-head { font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 10px; font-weight: 500; }
        .compare-item { font-size: 12px; color: var(--muted); line-height: 1.7; padding: 4px 0; border-bottom: 1px solid var(--border); }
        .compare-item:last-child { border-bottom: none; }
        .tag { font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase; padding: 3px 10px; border: 1px solid var(--border); color: var(--dim); border-radius: 1px; margin-right: 6px; }
        .divider { height: 1px; background: var(--border); margin: 48px 0; }
      `}</style>

      <div style={{ marginBottom: "40px" }}>
        <Link href="/writing" className="back-link">← Writing</Link>
      </div>

      <div style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "16px" }}>
        02 / Architecture
      </div>
      <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: "20px" }}>
        Why Kubernetes is a second deployment track, not the primary one
      </h1>
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "48px" }}>
        <span style={{ fontSize: "12px", color: "var(--dim)" }}>6 min read</span>
        <span style={{ width: "1px", height: "14px", background: "var(--border)" }} />
        {["Kubernetes", "Architecture", "Decision-making"].map(t => <span key={t} className="tag">{t}</span>)}
      </div>

      <div className="article-body">
        <p>
          Kubernetes is one of the most impressive pieces of infrastructure software ever built. It solves genuinely hard problems — container scheduling, self-healing, rolling deployments, service discovery, horizontal scaling — at a level of sophistication that took years to develop.
        </p>
        <p>
          It is also completely unnecessary for serving a static portfolio website. And I think that distinction is worth writing about, because the instinct in the DevOps world is often to reach for the most powerful tool available rather than the most appropriate one.
        </p>

        <h2>What Kubernetes actually costs</h2>
        <p>
          When people say Kubernetes is complex, they usually mean the learning curve. That is real but finite. The deeper cost is operational: Kubernetes requires ongoing attention in a way that S3 + CloudFront simply does not.
        </p>
        <p>
          With Kubernetes, you are responsible for: the control plane (unless managed), node health and capacity, networking (CNI plugins, Ingress controllers), certificate management, pod disruption budgets, resource requests and limits, RBAC, and the upgrade path for both the cluster and every component running on it. None of that work disappears just because you chose a managed service like EKS.
        </p>

        <div className="callout">
          <strong>The honest question</strong>
          For any infrastructure decision, ask: what problem does this solve that simpler alternatives cannot? If you cannot answer clearly, the simpler alternative is probably correct.
        </div>

        <h2>What S3 + CloudFront costs instead</h2>
        <p>
          S3 + CloudFront requires essentially zero ongoing operational work for a static site. There are no nodes to patch, no pods to monitor, no control plane to upgrade. The infrastructure provisions once via Terraform and then runs without intervention.
        </p>
        <p>
          The tradeoff is capability. S3 + CloudFront cannot run server-side logic, cannot manage stateful workloads, cannot do anything a server does. But a static site does not need any of those things, so the tradeoff costs nothing.
        </p>

        <div className="compare-grid">
          <div className="compare-cell">
            <div className="compare-head" style={{ color: "var(--accent)" }}>S3 + CloudFront</div>
            <div className="compare-item">Zero ongoing ops work</div>
            <div className="compare-item">Sub-millisecond global delivery</div>
            <div className="compare-item">Free tier covers portfolio scale</div>
            <div className="compare-item">No servers, no patches, no restarts</div>
            <div className="compare-item">Scales to millions of requests automatically</div>
          </div>
          <div className="compare-cell">
            <div className="compare-head" style={{ color: "#3a7fff" }}>Kubernetes</div>
            <div className="compare-item">Ongoing node and cluster maintenance</div>
            <div className="compare-item">Full container lifecycle management</div>
            <div className="compare-item">Significant compute cost at any scale</div>
            <div className="compare-item">Horizontal scaling, self-healing pods</div>
            <div className="compare-item">Required for stateful or dynamic workloads</div>
          </div>
        </div>

        <h2>Why Kubernetes is still in this platform</h2>
        <p>
          The Kubernetes deployment track exists for a different reason: demonstration. The skills required to design and operate a Kubernetes delivery pipeline — Deployments, Services, Ingress, health probes, Helm packaging, rolling updates — are directly relevant to production workloads at scale. A portfolio that only shows S3 + CloudFront leaves that entire skill set invisible.
        </p>
        <p>
          By running Kubernetes as a parallel track, the platform demonstrates both: the correct tool for the static hosting problem, and the ability to operate container orchestration when the problem actually requires it.
        </p>

        <div className="callout">
          <strong>The design decision</strong>
          The Kubernetes track is not over-engineering. It is intentional demonstration of a skill set that would be the primary delivery mechanism in a production microservices environment.
        </div>

        <h2>When Kubernetes is the right choice</h2>
        <p>
          Kubernetes becomes appropriate when you have workloads that need dynamic scaling, when you are running multiple services that need to communicate with each other, when you need fine-grained resource allocation across a shared compute pool, or when you need zero-downtime deployments for stateful applications.
        </p>
        <p>
          In other words: microservices, APIs, background workers, databases, event-driven systems. Not static websites.
        </p>
        <p>
          The most common mistake I see is organisations running Kubernetes for workloads that would be better served by a managed platform — App Runner, Fargate, Cloud Run, or even a simple S3 + CloudFront setup. The operational cost of Kubernetes is justified when the problem demands its capabilities. When it does not, you are paying complexity tax for no return.
        </p>

        <h2>The takeaway</h2>
        <p>
          Choosing the right tool is a more valuable skill than knowing many tools. The decision to use S3 + CloudFront as the primary path is not a concession — it is the technically correct answer to the problem. The decision to include Kubernetes is also correct, for a different reason entirely.
        </p>
        <p>
          Good platform engineering is not about using every capability available. It is about matching capability to requirement, and being able to articulate why.
        </p>

        <div className="divider" />

        <p style={{ fontSize: "13px", color: "var(--dim)" }}>
          The full Kubernetes implementation is documented on the{" "}
          <Link href="/projects/kubernetes-platform" style={{ color: "var(--accent)", textDecoration: "none" }}>Kubernetes Platform project page</Link>.
          The CI/CD pipeline that runs both tracks is on the{" "}
          <Link href="/projects/cicd-pipeline" style={{ color: "var(--accent)", textDecoration: "none" }}>CI/CD Pipeline page</Link>.
        </p>
      </div>
    </main>
  );
}
