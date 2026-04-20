import Link from "next/link";

const stack = [
  "Kubernetes", "Docker", "Helm", "Ingress NGINX",
  "Deployments", "Services", "ConfigMaps",
  "Liveness Probes", "Readiness Probes", "GitHub Actions",
];

const decisions = [
  {
    title: "Why Kubernetes as a second track, not the primary",
    body: "For a static portfolio site, Kubernetes adds operational complexity with no real benefit over S3 + CloudFront. The primary path stays simple and cost-efficient. The Kubernetes track exists to demonstrate orchestration skills — it's a deliberate engineering decision, not over-engineering.",
  },
  {
    title: "Why Helm for packaging",
    body: "Raw Kubernetes manifests work, but they don't scale across environments. Helm templates allow the same manifests to be deployed to dev, staging, and production with different values files — reducing duplication and making environment promotion explicit.",
  },
  {
    title: "Why separate liveness and readiness probes",
    body: "Liveness probes restart a container that has crashed or entered a deadlock. Readiness probes remove a pod from the load balancer until it's ready to serve traffic. Using the same endpoint for both is a common mistake — a slow startup should trigger readiness failure, not a restart.",
  },
  {
    title: "Why Ingress over NodePort or LoadBalancer",
    body: "NodePort exposes high-numbered ports directly on the node. LoadBalancer provisions a cloud load balancer per service — expensive at scale. Ingress provides a single entry point with host-based and path-based routing, TLS termination, and no per-service cloud cost.",
  },
];

export default function KubernetesPlatformPage() {
  return (
    <main style={{ padding: "56px 32px", maxWidth: "820px" }}>
      <style>{`
        .decision-card { background: var(--card); border: 1px solid var(--border); padding: 20px 24px; margin-bottom: 1px; }
        .decision-card:hover { border-color: var(--border2); }
        .back-link { color: var(--dim); text-decoration: none; font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; transition: color 0.2s; }
        .back-link:hover { color: var(--accent); }
      `}</style>

      <div style={{ marginBottom: "40px" }}>
        <Link href="/projects" className="back-link">← Projects</Link>
      </div>

      <div style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "16px" }}>
        02 / Container Orchestration
      </div>
      <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "20px" }}>
        Kubernetes Delivery Platform
      </h1>
      <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.75, marginBottom: "52px", maxWidth: "620px" }}>
        A containerised application delivery platform built with Kubernetes, Helm, and Docker. Runs as a parallel deployment track to the AWS static path, demonstrating orchestration, health management, and platform operations in a real delivery workflow.
      </p>

      {/* Architecture Diagram */}
      <div style={{ marginBottom: "52px" }}>
        <div style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)", display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
          Architecture
          <span style={{ flex: 1, height: "1px", background: "var(--border)", maxWidth: "200px" }} />
        </div>

        <div style={{ background: "var(--card)", border: "1px solid var(--border)", padding: "32px 24px", position: "relative", overflow: "hidden" }}>
          <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, var(--accent), transparent)" }} />

          <svg width="100%" viewBox="0 0 720 220" style={{ overflow: "visible" }}>
            <defs>
              <marker id="arr2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M2 1L8 5L2 9" fill="none" stroke="#4af0b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </marker>
              <marker id="arr2b" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M2 1L8 5L2 9" fill="none" stroke="#3a7fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </marker>
            </defs>

            {/* GitHub Actions */}
            <rect x="10" y="76" width="110" height="44" rx="4" fill="#080d1c" stroke="#2a3a60" strokeWidth="1"/>
            <text x="65" y="95" textAnchor="middle" fill="#4af0b8" fontSize="10" fontFamily="DM Mono, monospace" fontWeight="500">GitHub Actions</text>
            <text x="65" y="110" textAnchor="middle" fill="#3d4f7a" fontSize="8" fontFamily="DM Mono, monospace">build + push image</text>

            {/* Arrow to registry */}
            <line x1="120" y1="98" x2="155" y2="98" stroke="#4af0b8" strokeWidth="1" markerEnd="url(#arr2)"/>

            {/* Container Registry */}
            <rect x="157" y="76" width="110" height="44" rx="4" fill="#0b1120" stroke="#1a2444" strokeWidth="1"/>
            <text x="212" y="95" textAnchor="middle" fill="#e8edf8" fontSize="10" fontFamily="DM Mono, monospace">Registry</text>
            <text x="212" y="110" textAnchor="middle" fill="#3d4f7a" fontSize="8" fontFamily="DM Mono, monospace">Docker image</text>

            {/* Arrow to K8s cluster */}
            <line x1="267" y1="98" x2="302" y2="98" stroke="#4af0b8" strokeWidth="1" markerEnd="url(#arr2)"/>
            <text x="284" y="90" textAnchor="middle" fill="#3d4f7a" fontSize="8" fontFamily="DM Mono, monospace">pull</text>

            {/* K8s Cluster box */}
            <rect x="304" y="20" width="290" height="160" rx="6" fill="transparent" stroke="#2a3a60" strokeWidth="1" strokeDasharray="5 3"/>
            <text x="320" y="38" fill="#3a7fff" fontSize="9" fontFamily="DM Mono, monospace">Kubernetes Cluster</text>

            {/* Ingress */}
            <rect x="320" y="50" width="100" height="36" rx="4" fill="#080d1c" stroke="#3a7fff" strokeWidth="1"/>
            <text x="370" y="67" textAnchor="middle" fill="#3a7fff" fontSize="10" fontFamily="DM Mono, monospace" fontWeight="500">Ingress</text>
            <text x="370" y="80" textAnchor="middle" fill="#3d4f7a" fontSize="8" fontFamily="DM Mono, monospace">TLS + routing</text>

            {/* Arrow ingress to service */}
            <line x1="370" y1="86" x2="370" y2="105" stroke="#3a7fff" strokeWidth="1" markerEnd="url(#arr2b)"/>

            {/* Service */}
            <rect x="320" y="107" width="100" height="36" rx="4" fill="#080d1c" stroke="#2a3a60" strokeWidth="1"/>
            <text x="370" y="124" textAnchor="middle" fill="#e8edf8" fontSize="10" fontFamily="DM Mono, monospace">Service</text>
            <text x="370" y="137" textAnchor="middle" fill="#3d4f7a" fontSize="8" fontFamily="DM Mono, monospace">ClusterIP</text>

            {/* Arrow service to pods */}
            <line x1="420" y1="125" x2="455" y2="105" stroke="#2a3a60" strokeWidth="1" markerEnd="url(#arr2b)"/>
            <line x1="420" y1="125" x2="455" y2="145" stroke="#2a3a60" strokeWidth="1" markerEnd="url(#arr2b)"/>

            {/* Pod 1 */}
            <rect x="457" y="88" width="110" height="34" rx="4" fill="#0b1120" stroke="#1a2444" strokeWidth="1"/>
            <text x="512" y="103" textAnchor="middle" fill="#e8edf8" fontSize="9" fontFamily="DM Mono, monospace">Pod</text>
            <text x="512" y="115" textAnchor="middle" fill="#3d4f7a" fontSize="8" fontFamily="DM Mono, monospace">Next.js container</text>

            {/* Pod 2 */}
            <rect x="457" y="128" width="110" height="34" rx="4" fill="#0b1120" stroke="#1a2444" strokeWidth="1"/>
            <text x="512" y="143" textAnchor="middle" fill="#e8edf8" fontSize="9" fontFamily="DM Mono, monospace">Pod</text>
            <text x="512" y="155" textAnchor="middle" fill="#3d4f7a" fontSize="8" fontFamily="DM Mono, monospace">Next.js container</text>

            {/* Helm label */}
            <rect x="320" y="168" width="100" height="8" rx="2" fill="transparent"/>
            <text x="370" y="176" textAnchor="middle" fill="#3d4f7a" fontSize="8" fontFamily="DM Mono, monospace">packaged with Helm</text>

            {/* User -> Ingress */}
            <rect x="10" y="24" width="70" height="32" rx="4" fill="#0b1120" stroke="#1a2444" strokeWidth="1"/>
            <text x="45" y="40" textAnchor="middle" fill="#e8edf8" fontSize="10" fontFamily="DM Mono, monospace">User</text>
            <text x="45" y="52" textAnchor="middle" fill="#3d4f7a" fontSize="8" fontFamily="DM Mono, monospace">Browser</text>
            <line x1="80" y1="40" x2="200" y2="40" stroke="#2a3a60" strokeWidth="1" strokeDasharray="4 3"/>
            <line x1="200" y1="40" x2="200" y2="68" stroke="#2a3a60" strokeWidth="1" strokeDasharray="4 3"/>
            <line x1="200" y1="68" x2="320" y2="68" stroke="#2a3a60" strokeWidth="1" markerEnd="url(#arr2b)" strokeDasharray="4 3"/>
          </svg>
        </div>
      </div>

      {/* Problem / Solution */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "var(--border)", marginBottom: "52px" }}>
        {[
          {
            label: "Problem",
            text: "Running a single container on a server with no orchestration means no automatic restarts, no health checks, no rolling updates, and no horizontal scaling. A single crash takes the site down."
          },
          {
            label: "Solution",
            text: "Kubernetes manages the full container lifecycle — scheduling pods, restarting unhealthy containers, routing traffic via Services and Ingress, and enabling zero-downtime deployments via rolling updates."
          }
        ].map(({ label, text }) => (
          <div key={label} style={{ background: "var(--card)", padding: "24px" }}>
            <div style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "10px" }}>{label}</div>
            <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.75 }}>{text}</p>
          </div>
        ))}
      </div>

      {/* Key decisions */}
      <div style={{ marginBottom: "52px" }}>
        <div style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)", display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
          Engineering decisions
          <span style={{ flex: 1, height: "1px", background: "var(--border)", maxWidth: "200px" }} />
        </div>
        {decisions.map((d) => (
          <div key={d.title} className="decision-card">
            <div style={{ fontFamily: "Syne, sans-serif", fontSize: "13px", fontWeight: 600, color: "#fff", marginBottom: "8px" }}>{d.title}</div>
            <p style={{ fontSize: "12px", color: "var(--muted)", lineHeight: 1.75 }}>{d.body}</p>
          </div>
        ))}
      </div>

      {/* Lessons learned */}
      <div style={{ marginBottom: "52px" }}>
        <div style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)", display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
          Lessons learned
          <span style={{ flex: 1, height: "1px", background: "var(--border)", maxWidth: "200px" }} />
        </div>
        {[
          "Readiness and liveness probes should point to different endpoints — readiness checks if the app is ready to receive traffic, liveness checks if it's still alive. Mixing them causes unnecessary pod restarts during slow startups.",
          "Helm values files are the cleanest way to manage environment differences. One chart, multiple values files (dev.yaml, prod.yaml) — no duplicated manifests.",
          "imagePullPolicy: Always is essential during active development — without it, Kubernetes may use a cached image and not pick up new changes.",
          "Resource requests and limits must be set on every container. Without them, a single runaway pod can starve other workloads on the node.",
        ].map((lesson, i) => (
          <div key={i} style={{ display: "flex", gap: "16px", padding: "14px 0", borderBottom: "1px solid var(--border)" }}>
            <span style={{ color: "var(--accent)", fontSize: "11px", fontFamily: "DM Mono, monospace", flexShrink: 0, paddingTop: "2px" }}>0{i + 1}</span>
            <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.7 }}>{lesson}</p>
          </div>
        ))}
      </div>

      {/* Stack */}
      <div style={{ marginBottom: "40px" }}>
        <div style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)", display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
          Tech stack
          <span style={{ flex: 1, height: "1px", background: "var(--border)", maxWidth: "200px" }} />
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {stack.map((item) => (
            <span key={item} style={{ fontSize: "11px", letterSpacing: "0.06em", padding: "5px 12px", background: "rgba(74,240,184,0.06)", border: "1px solid rgba(74,240,184,0.2)", color: "var(--accent)", borderRadius: "1px" }}>
              {item}
            </span>
          ))}
        </div>
      </div>

      <a href="https://github.com/hugdora/cloud-native-portfolio" target="_blank" rel="noopener noreferrer"
        style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "12px", letterSpacing: "0.06em", color: "var(--accent)", textDecoration: "none", border: "1px solid rgba(74,240,184,0.2)", padding: "10px 20px", borderRadius: "2px" }}>
        View repository ↗
      </a>
    </main>
  );
}
