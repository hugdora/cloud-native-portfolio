import Link from "next/link";

const stack = [
  "Kubernetes", "Docker", "Helm", "NGINX Ingress",
  "Node.js", "Express", "ConfigMap", "minikube",
  "Liveness Probes", "Readiness Probes", "Startup Probes",
];

const decisions = [
  {
    title: "Why Kubernetes as a second delivery track, not the primary",
    body: "For a static portfolio site, Kubernetes adds real operational cost with no benefit over S3 + CloudFront. The primary path stays simple and efficient. The Kubernetes track exists to demonstrate orchestration skills — container lifecycle management, health probing, rolling updates, Helm packaging — that are directly relevant to production workloads at scale. It is a deliberate engineering decision, not over-engineering.",
  },
  {
    title: "Why three separate health probe endpoints",
    body: "Using the same endpoint for both readiness and liveness is one of the most common Kubernetes mistakes. A slow-starting app should fail readiness (removed from the Service) — not liveness (restarted). A deadlocked app should fail liveness — not readiness. Separate /ready and /live endpoints give Kubernetes precise control over each decision. The startup probe disables the liveness check entirely until the app is confirmed alive, preventing crash loops during startup.",
  },
  {
    title: "Why maxUnavailable: 0 in the rolling update strategy",
    body: "With maxUnavailable: 0 and maxSurge: 1, Kubernetes must spin up a new pod and wait for it to pass its readiness probe before terminating any old pod. This guarantees zero-downtime deployments — capacity never drops below the desired replica count during a rollout. The trade-off is slightly more resource usage during the update window, which is acceptable.",
  },
  {
    title: "Why Helm over raw kubectl apply",
    body: "Raw manifests work for a single environment, but they don't scale to dev/staging/prod. Helm templates allow the same manifests to deploy across environments with different values files — no duplication. A single helm upgrade --install command handles both first-time installs and updates, and Helm tracks revision history enabling one-command rollbacks.",
  },
  {
    title: "Why resource requests and limits on every container",
    body: "Without resource constraints, the Kubernetes scheduler cannot make informed placement decisions, and a runaway container can starve other workloads on the same node. Requests define the minimum guaranteed resources; limits cap the maximum. Setting both is a production requirement, not an optimisation.",
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
        .proof-img { width: 100%; border: 1px solid var(--border); border-radius: 2px; display: block; margin-top: 12px; }
        .proof-label { font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--accent); margin-bottom: 4px; }
        .proof-caption { font-size: 11px; color: var(--dim); margin-top: 6px; line-height: 1.5; }
      `}</style>

      {/* Back */}
      <div style={{ marginBottom: "40px" }}>
        <Link href="/projects" className="back-link">← Projects</Link>
      </div>

      {/* Header */}
      <div style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "16px" }}>
        02 / Container Orchestration
      </div>
      <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "20px" }}>
        Kubernetes Delivery Platform
      </h1>
      <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.75, marginBottom: "52px", maxWidth: "620px" }}>
        A containerised Node.js/Express application delivery platform running on Kubernetes with Deployments, Services, NGINX Ingress, ConfigMaps, all three health probe types, and Helm packaging. Deployed on minikube demonstrating full container orchestration and lifecycle management.
      </p>

      {/* Architecture diagram */}
      <div style={{ marginBottom: "52px" }}>
        <div style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)", display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
          Architecture
          <span style={{ flex: 1, height: "1px", background: "var(--border)", maxWidth: "200px" }} />
        </div>

        <div style={{ background: "var(--card)", border: "1px solid var(--border)", padding: "32px 24px", position: "relative", overflow: "hidden" }}>
          <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, var(--accent), transparent)" }} />
          <svg width="100%" viewBox="0 0 720 220" style={{ overflow: "visible", display: "block" }}>
            <defs>
              <marker id="k8s-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M2 1L8 5L2 9" fill="none" stroke="#4af0b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </marker>
              <marker id="k8s-arrow-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M2 1L8 5L2 9" fill="none" stroke="#5b8fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </marker>
            </defs>

            {/* GitHub Actions */}
            <rect x="10" y="88" width="110" height="44" rx="4" fill="#080d1c" stroke="#2e4470" strokeWidth="1"/>
            <text x="65" y="107" textAnchor="middle" fill="#eef2fc" fontSize="10" fontFamily="DM Mono, monospace" fontWeight="500">GitHub Actions</text>
            <text x="65" y="121" textAnchor="middle" fill="#5a7299" fontSize="9" fontFamily="DM Mono, monospace">docker build + push</text>

            <line x1="120" y1="110" x2="148" y2="110" stroke="#4af0b8" strokeWidth="1.5" markerEnd="url(#k8s-arrow)"/>

            {/* Registry */}
            <rect x="150" y="88" width="100" height="44" rx="4" fill="#080d1c" stroke="#1e2d4a" strokeWidth="1"/>
            <text x="200" y="107" textAnchor="middle" fill="#eef2fc" fontSize="10" fontFamily="DM Mono, monospace">Registry</text>
            <text x="200" y="121" textAnchor="middle" fill="#5a7299" fontSize="9" fontFamily="DM Mono, monospace">Docker image</text>

            <line x1="250" y1="110" x2="278" y2="110" stroke="#4af0b8" strokeWidth="1.5" markerEnd="url(#k8s-arrow)"/>

            {/* K8s cluster box */}
            <rect x="280" y="20" width="430" height="180" rx="6" fill="transparent" stroke="#2e4470" strokeWidth="1" strokeDasharray="5 3"/>
            <text x="298" y="38" fill="#5a7299" fontSize="9" fontFamily="DM Mono, monospace" letterSpacing="1">KUBERNETES CLUSTER (minikube)</text>

            {/* Ingress */}
            <rect x="295" y="50" width="120" height="44" rx="4" fill="#080d1c" stroke="#5b8fff" strokeWidth="1.5"/>
            <text x="355" y="70" textAnchor="middle" fill="#5b8fff" fontSize="11" fontFamily="DM Mono, monospace" fontWeight="500">Ingress</text>
            <text x="355" y="84" textAnchor="middle" fill="#5a7299" fontSize="9" fontFamily="DM Mono, monospace">NGINX · node-app.local</text>

            <line x1="415" y1="72" x2="448" y2="72" stroke="#5b8fff" strokeWidth="1.5" markerEnd="url(#k8s-arrow-blue)"/>

            {/* Service */}
            <rect x="450" y="50" width="110" height="44" rx="4" fill="#080d1c" stroke="#2e4470" strokeWidth="1"/>
            <text x="505" y="70" textAnchor="middle" fill="#eef2fc" fontSize="11" fontFamily="DM Mono, monospace">Service</text>
            <text x="505" y="84" textAnchor="middle" fill="#5a7299" fontSize="9" fontFamily="DM Mono, monospace">ClusterIP :80</text>

            {/* Arrows to pods */}
            <line x1="505" y1="94" x2="505" y2="118" stroke="#2e4470" strokeWidth="1" markerEnd="url(#k8s-arrow-blue)"/>
            <line x1="505" y1="118" x2="450" y2="130" stroke="#2e4470" strokeWidth="1"/>
            <line x1="505" y1="118" x2="560" y2="130" stroke="#2e4470" strokeWidth="1"/>

            {/* Pod 1 */}
            <rect x="390" y="130" width="110" height="50" rx="4" fill="#080d1c" stroke="#1e2d4a" strokeWidth="1"/>
            <text x="445" y="150" textAnchor="middle" fill="#eef2fc" fontSize="10" fontFamily="DM Mono, monospace">Pod 1</text>
            <text x="445" y="164" textAnchor="middle" fill="#4af0b8" fontSize="8" fontFamily="DM Mono, monospace">Ready ✓ Live ✓</text>
            <text x="445" y="175" textAnchor="middle" fill="#5a7299" fontSize="8" fontFamily="DM Mono, monospace">1/1 Running</text>

            {/* Pod 2 */}
            <rect x="510" y="130" width="110" height="50" rx="4" fill="#080d1c" stroke="#1e2d4a" strokeWidth="1"/>
            <text x="565" y="150" textAnchor="middle" fill="#eef2fc" fontSize="10" fontFamily="DM Mono, monospace">Pod 2</text>
            <text x="565" y="164" textAnchor="middle" fill="#4af0b8" fontSize="8" fontFamily="DM Mono, monospace">Ready ✓ Live ✓</text>
            <text x="565" y="175" textAnchor="middle" fill="#5a7299" fontSize="8" fontFamily="DM Mono, monospace">1/1 Running</text>

            {/* ConfigMap */}
            <rect x="650" y="88" width="52" height="36" rx="4" fill="#080d1c" stroke="#1e2d4a" strokeWidth="1" strokeDasharray="3 2"/>
            <text x="676" y="103" textAnchor="middle" fill="#5a7299" fontSize="8" fontFamily="DM Mono, monospace">Config</text>
            <text x="676" y="115" textAnchor="middle" fill="#5a7299" fontSize="8" fontFamily="DM Mono, monospace">Map</text>
            <line x1="650" y1="106" x2="620" y2="155" stroke="#1e2d4a" strokeWidth="1" strokeDasharray="3 2"/>

            {/* User */}
            <rect x="10" y="30" width="80" height="36" rx="4" fill="#0d1322" stroke="#1e2d4a" strokeWidth="1"/>
            <text x="50" y="48" textAnchor="middle" fill="#eef2fc" fontSize="10" fontFamily="DM Mono, monospace">User</text>
            <text x="50" y="61" textAnchor="middle" fill="#5a7299" fontSize="8" fontFamily="DM Mono, monospace">Browser</text>
            <line x1="90" y1="48" x2="200" y2="48" stroke="#2e4470" strokeWidth="1" strokeDasharray="4 3"/>
            <line x1="200" y1="48" x2="200" y2="72" stroke="#2e4470" strokeWidth="1" strokeDasharray="4 3"/>
            <line x1="200" y1="72" x2="293" y2="72" stroke="#2e4470" strokeWidth="1" markerEnd="url(#k8s-arrow-blue)" strokeDasharray="4 3"/>

            {/* Helm label */}
            <text x="355" y="210" textAnchor="middle" fill="#5a7299" fontSize="8" fontFamily="DM Mono, monospace">packaged with Helm · helm upgrade --install</text>
          </svg>
        </div>
      </div>

      {/* Problem / Solution */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "var(--border)", marginBottom: "52px" }}>
        {[
          {
            label: "Problem",
            text: "Running a container on a server with no orchestration means no automatic restarts, no health checks, no rolling updates, and no horizontal scaling. A single crash takes the service down with no recovery."
          },
          {
            label: "Solution",
            text: "Kubernetes manages the full container lifecycle — scheduling pods, restarting unhealthy containers, routing traffic via Services and Ingress, and enabling zero-downtime deployments via rolling updates with readiness-gated rollouts."
          }
        ].map(({ label, text }) => (
          <div key={label} style={{ background: "var(--card)", padding: "24px" }}>
            <div style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "10px" }}>{label}</div>
            <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.75 }}>{text}</p>
          </div>
        ))}
      </div>

      {/* Proof of implementation */}
      <div style={{ marginBottom: "52px" }}>
        <div style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)", display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
          Proof of implementation
          <span style={{ flex: 1, height: "1px", background: "var(--border)", maxWidth: "200px" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          {[
            {
              label: "Both pods running — 1/1 Ready",
              caption: "2 replicas, 0 restarts, STATUS = Running. Rolling update confirmed — new ReplicaSet hash visible.",
              img: "/projects/kubernetes-platform/pods-v2.png"
            },
            {
              label: "All 3 probes configured on running pod",
              caption: "Liveness on /live (delay=30s), Readiness on /ready (delay=10s), Startup on /live (failureThreshold=6). Separate endpoints by design.",
              img: "/projects/kubernetes-platform/pod-probes.png"
            },
            {
              label: "Ingress routing to node-app.local",
              caption: "NGINX Ingress class, ADDRESS = 192.168.49.2, port 80. node-app.local resolves via /etc/hosts.",
              img: "/projects/kubernetes-platform/ingress.png"
            },
            {
              label: "Helm release deployed — revision 2",
              caption: "chart = kubernetes-app-0.1.0, STATUS = deployed. Revision 2 confirms a Helm upgrade was applied.",
              img: "/projects/kubernetes-platform/helm-list.png"
            },
          ].map(({ label, caption, img }) => (
            <div key={label} style={{ background: "var(--card)", border: "1px solid var(--border)", padding: "16px" }}>
              <div className="proof-label">{label}</div>
              <img src={img} alt={label} className="proof-img" />
              <p className="proof-caption">{caption}</p>
            </div>
          ))}
        </div>

        {/* Full width curl response */}
        <div style={{ marginTop: "16px", background: "var(--card)", border: "1px solid var(--border)", padding: "16px" }}>
          <div className="proof-label">Live HTTP 200 response from node-app.local</div>
          <img src="/projects/kubernetes-platform/curl-response.png" alt="curl response" className="proof-img" />
          <p className="proof-caption">
            StatusCode 200. JSON response includes message, version, environment = production, Node.js runtime, uptime, and the pod hostname — confirming the request traversed Ingress → Service → Pod.
          </p>
        </div>
      </div>

      {/* Probe design */}
      <div style={{ marginBottom: "52px" }}>
        <div style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)", display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
          Health probe design
          <span style={{ flex: 1, height: "1px", background: "var(--border)", maxWidth: "200px" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1px", background: "var(--border)" }}>
          {[
            {
              probe: "Startup",
              endpoint: "GET /live",
              config: "delay=0s · failure=6 · period=10s",
              action: "Disables liveness until app is alive",
              purpose: "Prevents crash loops during slow startup. App has up to 60s to start before liveness takes over."
            },
            {
              probe: "Readiness",
              endpoint: "GET /ready",
              config: "delay=10s · failure=3 · period=5s",
              action: "Removes pod from Service endpoints",
              purpose: "Pod stops receiving traffic if not ready. Does not restart the container — the app keeps running."
            },
            {
              probe: "Liveness",
              endpoint: "GET /live",
              config: "delay=30s · failure=3 · period=10s",
              action: "Restarts the container",
              purpose: "Catches deadlocks and zombie states. Only fires after startup probe succeeds."
            },
          ].map(({ probe, endpoint, config, action, purpose }) => (
            <div key={probe} style={{ background: "var(--card)", padding: "18px 20px" }}>
              <div style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "8px" }}>{probe} probe</div>
              <div style={{ fontFamily: "DM Mono, monospace", fontSize: "11px", color: "var(--text)", marginBottom: "6px", padding: "3px 8px", background: "var(--bg3)", borderRadius: "2px" }}>{endpoint}</div>
              <div style={{ fontSize: "10px", color: "var(--dim)", marginBottom: "8px", fontFamily: "DM Mono, monospace" }}>{config}</div>
              <div style={{ fontSize: "11px", color: "var(--accent)", marginBottom: "6px", fontWeight: 500 }}>→ {action}</div>
              <p style={{ fontSize: "11px", color: "var(--muted)", lineHeight: 1.65 }}>{purpose}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Engineering decisions */}
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
          "imagePullPolicy: IfNotPresent is required when using locally built images in minikube. Without it, Kubernetes tries to pull from a remote registry and fails with ImagePullBackOff — even if the image exists locally inside the minikube daemon.",
          "eval $(minikube docker-env) must be run in every new terminal session before building images. The environment variables it sets only persist for the current session — a common source of confusion when images built in one terminal are not visible inside the cluster.",
          "The rolling update progress deadline (default 600s) applies to the whole rollout, not just a single pod. If the new image does not exist in the daemon, the rollout will time out waiting for pods that can never start — always verify images exist before kubectl set image.",
          "npm ci requires a package-lock.json to exist — it cannot generate one. Always run npm install locally first to generate the lockfile before using npm ci in a Dockerfile or CI pipeline.",
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

      {/* Repo link + related */}
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "40px" }}>
        <a href="https://github.com/hugdora/kubernetes-delivery-platform" target="_blank" rel="noopener noreferrer"
          style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "12px", letterSpacing: "0.06em", color: "var(--accent)", textDecoration: "none", border: "1px solid rgba(74,240,184,0.2)", padding: "10px 20px", borderRadius: "2px" }}>
          View repository ↗
        </a>
      </div>

      <div style={{ padding: "24px 28px", background: "var(--card)", border: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <div style={{ fontFamily: "Syne, sans-serif", fontSize: "14px", fontWeight: 600, color: "#fff", marginBottom: "4px" }}>See how the CI/CD pipeline deploys to this cluster</div>
          <p style={{ fontSize: "12px", color: "var(--muted)", lineHeight: 1.6 }}>Project 03 documents the GitHub Actions pipeline that builds the Docker image and runs helm upgrade --install.</p>
        </div>
        <Link href="/projects/cicd-pipeline"
          style={{ padding: "10px 20px", background: "var(--accent)", color: "#04060f", fontFamily: "DM Mono, monospace", fontSize: "12px", fontWeight: 500, borderRadius: "2px", textDecoration: "none", whiteSpace: "nowrap" }}>
          View CI/CD Pipeline →
        </Link>
      </div>
    </main>
  );
}
