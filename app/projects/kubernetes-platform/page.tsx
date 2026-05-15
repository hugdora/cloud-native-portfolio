import Link from "next/link";

const stack = [
  "AWS EKS", "AWS EC2 (t3.small)", "AWS VPC", "Terraform",
  "Docker", "Helm", "NGINX Ingress", "Kubernetes",
  "GitHub Actions", "IAM OIDC", "DockerHub", "Elastic Load Balancer",
];

const decisions = [
  {
    title: "Why EKS over minikube for this implementation",
    body: "minikube runs a single-node cluster locally — useful for learning but not representative of production. EKS provisions real EC2 worker nodes inside a VPC, with a managed control plane, IAM integration, and an Elastic Load Balancer for ingress. Every component in this implementation maps directly to what you would run in a production environment.",
  },
  {
    title: "Why Terraform for the entire infrastructure stack",
    body: "The VPC, subnets, NAT Gateway, Internet Gateway, EKS cluster, node group, IAM roles, and OIDC provider are all provisioned by Terraform. This means the entire cluster can be created in one command (terraform apply) and destroyed in one command (terraform destroy) — reproducible, version-controlled, and zero manual console setup.",
  },
  {
    title: "Why three separate health probe endpoints",
    body: "The NGINX container serves /ready and /live as separate lightweight endpoints returning JSON. Readiness controls whether the pod receives traffic. Liveness controls whether the container is restarted. The startup probe disables liveness during container startup, preventing crash loops on slow-starting containers.",
  },
  {
    title: "Why IAM OIDC for GitHub Actions instead of stored credentials",
    body: "The Terraform stack provisions an IAM OIDC provider and a scoped IAM role. GitHub Actions assumes this role via short-lived tokens — no AWS access keys are stored anywhere in the repository. The trust policy is locked to the specific repo and branch.",
  },
  {
    title: "Why Helm for packaging Kubernetes manifests",
    body: "Raw kubectl manifests work for a single environment but don't scale. The Helm chart templates the Deployment, Service, and Ingress with configurable values — replica count, image tag, resource limits — so the same chart deploys across environments. helm upgrade --install handles both first-time installs and updates in a single command.",
  },
];

export default function KubernetesPlatformPage() {
  return (
    <main style={{ padding: "56px 0" }}>
      <style>{`
        .decision-card { background: var(--card); border: 1px solid var(--border); padding: 20px 24px; margin-bottom: 1px; }
        .decision-card:hover { border-color: var(--border2); }
        .back-link { color: var(--dim); text-decoration: none; font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; transition: color 0.2s; }
        .back-link:hover { color: var(--accent); }
        .proof-img { width: 100%; border: 1px solid var(--border2); border-radius: 4px; display: block; margin-top: 12px; }
        .proof-label { font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--accent); margin-bottom: 4px; font-weight: 500; }
        .proof-caption { font-size: 12px; color: var(--muted); margin-top: 8px; line-height: 1.6; }
        .proof-card { background: var(--bg2); border: 1px solid var(--border2); padding: 16px; border-radius: 4px; }
      `}</style>

      <div className="container" style={{ maxWidth: "860px" }}>

        {/* Back */}
        <div style={{ marginBottom: "40px" }}>
          <Link href="/projects" className="back-link">← Projects</Link>
        </div>

        {/* Header */}
        <div style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "16px" }}>
          02 / Container Orchestration
        </div>
        <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "20px" }}>
          Kubernetes Delivery Platform on AWS EKS
        </h1>
        <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.75, marginBottom: "40px", maxWidth: "640px" }}>
          A production-grade container orchestration platform deployed on AWS EKS. Terraform provisions the full infrastructure stack: VPC, EKS cluster, EC2 worker nodes, IAM roles, and OIDC provider. A static portfolio app is containerised with Docker/NGINX, packaged with Helm, and deployed automatically via GitHub Actions with IAM OIDC. An AWS Elastic Load Balancer routes external traffic through NGINX Ingress to the pods.
        </p>

        {/* Key Results */}
        <div style={{ background: "var(--card)", borderLeft: "3px solid var(--accent)", padding: "24px 28px", marginBottom: "52px" }}>
          <div style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "16px" }}>Key Results</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              "Delivered a full container lifecycle — build, package, deploy, probe — as a parallel track to the AWS static path, demonstrating two production-grade deployment approaches in one platform",
              "Packaged releases with Helm to standardise upgrades, rollback workflows, and environment configuration across the cluster",
              "Configured readiness and liveness probes to enforce health-gate behaviour, preventing traffic from reaching containers before they were ready",
            ].map((result, i) => (
              <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <span style={{ color: "var(--accent)", fontSize: "12px", flexShrink: 0, paddingTop: "2px" }}>→</span>
                <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.65, margin: 0 }}>{result}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Architecture diagram */}
        <div style={{ marginBottom: "52px" }}>
          <div style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)", display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
            Architecture
            <span style={{ flex: 1, height: "1px", background: "var(--border)", maxWidth: "200px" }} />
          </div>
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", padding: "32px 24px", position: "relative", overflow: "hidden" }}>
            <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, var(--accent), transparent)" }} />
            <svg width="100%" viewBox="0 0 800 180" style={{ overflow: "visible", display: "block" }}>
              <defs>
                <marker id="k-a1" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M2 1L8 5L2 9" fill="none" stroke="#4af0b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </marker>
                <marker id="k-a2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                  <path d="M2 1L8 5L2 9" fill="none" stroke="#2e4470" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </marker>
              </defs>
              <rect x="0" y="68" width="100" height="44" rx="4" fill="#080d1c" stroke="#2e4470" strokeWidth="1"/>
              <text x="50" y="86" textAnchor="middle" fill="#eef2fc" fontSize="10" fontFamily="DM Mono, monospace">git push</text>
              <text x="50" y="101" textAnchor="middle" fill="#5a7299" fontSize="8" fontFamily="DM Mono, monospace">main branch</text>
              <line x1="100" y1="90" x2="125" y2="90" stroke="#4af0b8" strokeWidth="1.5" markerEnd="url(#k-a1)"/>
              <rect x="127" y="56" width="110" height="68" rx="4" fill="#080d1c" stroke="#4af0b8" strokeWidth="1.5"/>
              <text x="182" y="76" textAnchor="middle" fill="#4af0b8" fontSize="10" fontFamily="DM Mono, monospace" fontWeight="500">GitHub Actions</text>
              <text x="182" y="91" textAnchor="middle" fill="#5a7299" fontSize="8" fontFamily="DM Mono, monospace">docker build + push</text>
              <text x="182" y="104" textAnchor="middle" fill="#5a7299" fontSize="8" fontFamily="DM Mono, monospace">IAM OIDC → EKS</text>
              <text x="182" y="116" textAnchor="middle" fill="#5a7299" fontSize="8" fontFamily="DM Mono, monospace">helm upgrade</text>
              <line x1="237" y1="90" x2="262" y2="90" stroke="#4af0b8" strokeWidth="1.5" markerEnd="url(#k-a1)"/>
              <rect x="264" y="20" width="530" height="150" rx="6" fill="transparent" stroke="#1e2d4a" strokeWidth="1" strokeDasharray="5 3"/>
              <text x="282" y="38" fill="#5a7299" fontSize="9" fontFamily="DM Mono, monospace" letterSpacing="1">AWS eu-west-2 — VPC</text>
              <rect x="280" y="50" width="100" height="40" rx="4" fill="#080d1c" stroke="#4af0b8" strokeWidth="1.5"/>
              <text x="330" y="68" textAnchor="middle" fill="#4af0b8" fontSize="10" fontFamily="DM Mono, monospace" fontWeight="500">ELB</text>
              <text x="330" y="82" textAnchor="middle" fill="#5a7299" fontSize="8" fontFamily="DM Mono, monospace">Internet-facing</text>
              <line x1="380" y1="70" x2="406" y2="70" stroke="#4af0b8" strokeWidth="1.5" markerEnd="url(#k-a1)"/>
              <rect x="408" y="50" width="110" height="40" rx="4" fill="#080d1c" stroke="#2e4470" strokeWidth="1"/>
              <text x="463" y="68" textAnchor="middle" fill="#eef2fc" fontSize="10" fontFamily="DM Mono, monospace">NGINX Ingress</text>
              <text x="463" y="82" textAnchor="middle" fill="#5a7299" fontSize="8" fontFamily="DM Mono, monospace">portfoliod-ingress</text>
              <line x1="518" y1="70" x2="544" y2="70" stroke="#4af0b8" strokeWidth="1.5" markerEnd="url(#k-a1)"/>
              <rect x="546" y="40" width="238" height="120" rx="4" fill="transparent" stroke="#2e4470" strokeWidth="1" strokeDasharray="4 3"/>
              <text x="562" y="57" fill="#5a7299" fontSize="8" fontFamily="DM Mono, monospace" letterSpacing="1">EKS — portfoliod-cluster</text>
              <rect x="558" y="64" width="210" height="30" rx="4" fill="#080d1c" stroke="#1e2d4a" strokeWidth="1"/>
              <text x="663" y="83" textAnchor="middle" fill="#eef2fc" fontSize="9" fontFamily="DM Mono, monospace">Service (ClusterIP)</text>
              <line x1="663" y1="94" x2="633" y2="112" stroke="#2e4470" strokeWidth="1" markerEnd="url(#k-a2)"/>
              <line x1="663" y1="94" x2="693" y2="112" stroke="#2e4470" strokeWidth="1" markerEnd="url(#k-a2)"/>
              <rect x="558" y="113" width="90" height="34" rx="4" fill="#080d1c" stroke="#1e2d4a" strokeWidth="1"/>
              <text x="603" y="128" textAnchor="middle" fill="#eef2fc" fontSize="9" fontFamily="DM Mono, monospace">Pod · Node 1</text>
              <text x="603" y="140" textAnchor="middle" fill="#4af0b8" fontSize="8" fontFamily="DM Mono, monospace">t3.small · Ready ✓</text>
              <rect x="676" y="113" width="90" height="34" rx="4" fill="#080d1c" stroke="#1e2d4a" strokeWidth="1"/>
              <text x="721" y="128" textAnchor="middle" fill="#eef2fc" fontSize="9" fontFamily="DM Mono, monospace">Pod · Node 2</text>
              <text x="721" y="140" textAnchor="middle" fill="#4af0b8" fontSize="8" fontFamily="DM Mono, monospace">t3.small · Ready ✓</text>
            </svg>
          </div>
        </div>

        {/* Problem / Solution */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "var(--border)", marginBottom: "52px" }}>
          {[
            { label: "Problem", text: "Running containers on a single server with no orchestration means no self-healing, no rolling updates, no load balancing, and no production-grade infrastructure. A crash takes the service down permanently." },
            { label: "Solution", text: "AWS EKS manages the Kubernetes control plane. Terraform provisions the full VPC and cluster stack. Helm deploys the app. GitHub Actions automates every build and deployment with IAM OIDC — no stored AWS credentials." }
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
          <div className="proof-card" style={{ marginBottom: "16px" }}>
            <div className="proof-label">GitHub Actions — Build and Deploy to EKS ✅</div>
            <img src="/projects/kubernetes-platform/github-actions-green.png" alt="GitHub Actions green" className="proof-img" />
            <p className="proof-caption">Both jobs green: Build and Push Docker Image (16s) → Deploy to EKS via Helm (1m 22s). Triggered by push to main. Status: Success. Total duration: 1m 57s.</p>
          </div>
          <div className="proof-card" style={{ marginBottom: "16px" }}>
            <div className="proof-label">Live app serving via AWS Elastic Load Balancer</div>
            <img src="/projects/kubernetes-platform/live-app.png" alt="Live app via ELB" className="proof-img" />
            <p className="proof-caption">portfoliod app live at the ELB DNS name. Traffic flows Browser → ELB → NGINX Ingress → Service → Pod.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div className="proof-card">
              <div className="proof-label">EKS nodes — 2× t3.small Ready</div>
              <img src="/projects/kubernetes-platform/eks-nodes.png" alt="EKS nodes" className="proof-img" />
              <p className="proof-caption">2 nodes in portfoliod-cluster-nodes. Both Status = Ready.</p>
            </div>
            <div className="proof-card">
              <div className="proof-label">EC2 instances — worker nodes running</div>
              <img src="/projects/kubernetes-platform/ec2-instances.png" alt="EC2 instances" className="proof-img" />
              <p className="proof-caption">2 t3.small instances Running across eu-west-2a and eu-west-2b.</p>
            </div>
          </div>
        </div>

        {/* Terraform outputs */}
        <div style={{ marginBottom: "52px" }}>
          <div style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)", display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            Terraform outputs
            <span style={{ flex: 1, height: "1px", background: "var(--border)", maxWidth: "200px" }} />
          </div>
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", padding: "20px 24px", position: "relative", overflow: "hidden" }}>
            <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, var(--accent), transparent)" }} />
            <pre style={{ fontFamily: "DM Mono, monospace", fontSize: "12px", color: "var(--muted)", lineHeight: 1.9, overflowX: "auto", whiteSpace: "pre-wrap", margin: 0 }}>
{`cluster_endpoint = `}<span style={{ color: "var(--accent)" }}>{`"https://21F972C4047FB6CBB4CDE6F2E67ED923.gr7.eu-west-2.eks.amazonaws.com"`}</span>{`
cluster_name     = `}<span style={{ color: "var(--accent)" }}>{`"portfoliod-cluster"`}</span>{`
cluster_region   = `}<span style={{ color: "var(--accent)" }}>{`"eu-west-2"`}</span>{`
github_role_arn  = `}<span style={{ color: "var(--accent)" }}>{`"arn:aws:iam::127486921697:role/portfoliod-cluster-github-deploy"`}</span>{`
vpc_id           = `}<span style={{ color: "var(--accent)" }}>{`"vpc-0aad5cf237cc566bc"`}</span>
            </pre>
          </div>
        </div>

        {/* Infrastructure stack */}
        <div style={{ marginBottom: "52px" }}>
          <div style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)", display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
            Infrastructure stack — provisioned by Terraform
            <span style={{ flex: 1, height: "1px", background: "var(--border)", maxWidth: "120px" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "var(--border)" }}>
            {[
              { layer: "VPC", detail: "Custom VPC with public + private subnets across 2 AZs. Public subnets for the load balancer, private subnets for worker nodes." },
              { layer: "NAT Gateway", detail: "Allows private subnet nodes to pull Docker images from DockerHub without being publicly accessible." },
              { layer: "EKS Cluster v1.31", detail: "AWS-managed Kubernetes control plane. Endpoint access: public + private. No control plane to maintain or patch." },
              { layer: "Node Group", detail: "2× t3.small EC2 instances across eu-west-2a and eu-west-2b. Managed node group — AWS handles patching." },
              { layer: "IAM Roles", detail: "Separate roles for EKS cluster, worker nodes, and GitHub Actions OIDC. Least-privilege policies on each." },
              { layer: "OIDC Provider", detail: "GitHub Actions authenticates to AWS via short-lived tokens. No access keys stored in GitHub Secrets." },
            ].map(({ layer, detail }) => (
              <div key={layer} style={{ background: "var(--card)", padding: "18px 20px" }}>
                <div style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "6px" }}>{layer}</div>
                <p style={{ fontSize: "12px", color: "var(--muted)", lineHeight: 1.7 }}>{detail}</p>
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
            "EKS cluster creation takes 10-15 minutes — significantly longer than other AWS resources. The node group takes an additional 3-5 minutes after the cluster is ready.",
            "The IAM OIDC provider for GitHub Actions (token.actions.githubusercontent.com) is account-level. Attempting to create it twice fails with EntityAlreadyExists. Import the existing provider into Terraform state with terraform import rather than recreating it.",
            "NGINX Ingress on EKS requires the controller service type to be LoadBalancer — this triggers AWS to provision an Elastic Load Balancer automatically. The EXTERNAL-IP shows <pending> until the ELB is fully provisioned (~2 minutes).",
            "terraform destroy must be run after helm uninstall to avoid dependency conflicts. Helm removes Kubernetes resources first, which allows Terraform to cleanly destroy the VPC without stuck dependencies on the load balancer.",
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

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "40px" }}>
          <a href="https://github.com/hugdora/portfoliod" target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "12px", letterSpacing: "0.06em", color: "var(--accent)", textDecoration: "none", border: "1px solid rgba(74,240,184,0.2)", padding: "10px 20px", borderRadius: "2px" }}>
            View repository ↗
          </a>
        </div>

        <div style={{ padding: "24px 28px", background: "var(--card)", border: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <div style={{ fontFamily: "Syne, sans-serif", fontSize: "14px", fontWeight: 600, color: "#fff", marginBottom: "4px" }}>See the CI/CD pipeline that deploys to this cluster</div>
            <p style={{ fontSize: "12px", color: "var(--muted)", lineHeight: 1.6 }}>Project 03 documents the GitHub Actions pipeline — IAM OIDC, dual-track deployments, and keyless AWS authentication.</p>
          </div>
          <Link href="/projects/cicd-pipeline"
            style={{ padding: "10px 20px", background: "var(--accent)", color: "#04060f", fontFamily: "DM Mono, monospace", fontSize: "12px", fontWeight: 500, borderRadius: "2px", textDecoration: "none", whiteSpace: "nowrap" }}>
            View CI/CD Pipeline →
          </Link>
        </div>
      </div>
    </main>
  );
}
