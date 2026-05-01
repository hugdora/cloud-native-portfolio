import Link from "next/link";

const stack = [
  "AWS CodePipeline",
  "AWS CodeBuild",
  "Amazon S3",
  "React",
  "GitHub",
  "buildspec.yml",
  "IAM service roles",
  "Node.js 18",
];

const decisions = [
  {
    title: "Why CodePipeline over GitHub Actions for this project",
    body: "GitHub Actions keeps the pipeline inside GitHub — the YAML lives in the repo and the runner is GitHub-hosted. CodePipeline keeps everything inside AWS — the pipeline is configured in the AWS console, CodeBuild runs the build in an AWS-managed container, and the deployment is handled by AWS directly. Neither is universally better. Organisations already deep in the AWS ecosystem often prefer CodePipeline because it integrates natively with CodeBuild, CodeDeploy, and the rest of the AWS developer tooling suite, and gives a single control plane for all delivery concerns.",
  },
  {
    title: "Why buildspec.yml must be at the repo root",
    body: "CodeBuild looks for buildspec.yml at the root of the source directory by default. You can override this in the CodeBuild project configuration, but putting it at the root is the convention and the clearest signal to anyone reading the repo that CodeBuild is in use. The file defines all build phases — install, pre_build, build, post_build — and the artifacts section tells CodePipeline exactly which files to pass to the deploy stage.",
  },
  {
    title: "Why npm ci instead of npm install",
    body: "npm ci installs exactly what is in package-lock.json without resolving. It is faster than npm install on CI because it skips the resolution step, and it is fully reproducible — the same versions every time regardless of when the build runs. npm install can silently resolve to newer patch versions between runs, which can introduce unexpected failures in a pipeline.",
  },
  {
    title: "Why base-directory: build, not dist",
    body: "Create React App outputs its production build to a build/ directory, not dist/. This is a common source of confusion because many other tools (Vite, Rollup, webpack) default to dist/. Setting the wrong base-directory in buildspec.yml means CodePipeline deploys nothing — or worse, deploys source files instead of the compiled output. The artifacts section must match the actual output directory of the build tool being used.",
  },
];

export default function CodePipelineReactS3Page() {
  return (
    <main style={{ padding: "56px 32px", maxWidth: "820px", margin: "0 auto" }}>
      <style>{`
        .decision-card { background: var(--card); border: 1px solid var(--border); padding: 20px 24px; margin-bottom: 1px; }
        .decision-card:hover { border-color: var(--border2); }
        .back-link { color: var(--dim); text-decoration: none; font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; transition: color 0.2s; }
        .back-link:hover { color: var(--accent); }
      `}</style>

      {/* Back */}
      <div style={{ marginBottom: "40px" }}>
        <Link href="/projects" className="back-link">← Projects</Link>
      </div>

      {/* Header */}
      <div style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "16px" }}>
        04 / AWS Native CI/CD
      </div>
      <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "20px" }}>
        React App Deployment with AWS CodePipeline
      </h1>
      <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.75, marginBottom: "52px", maxWidth: "620px" }}>
        A fully automated CI/CD pipeline using AWS-native tooling — CodePipeline, CodeBuild, and S3 — to build and deploy a React application on every GitHub push. The pipeline lives entirely inside AWS, demonstrating the alternative to GitHub Actions for teams operating within an AWS-centric delivery workflow.
      </p>

      {/* Architecture diagram */}
      <div style={{ marginBottom: "52px" }}>
        <div style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)", display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
          Pipeline architecture
          <span style={{ flex: 1, height: "1px", background: "var(--border)", maxWidth: "200px" }} />
        </div>

        <div style={{ background: "var(--card)", border: "1px solid var(--border)", padding: "32px 24px", position: "relative", overflow: "hidden" }}>
          <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, var(--accent), transparent)" }} />

          <svg width="100%" viewBox="0 0 720 180" style={{ overflow: "visible", display: "block" }}>
            <defs>
              <marker id="pipe-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M2 1L8 5L2 9" fill="none" stroke="#4af0b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </marker>
              <marker id="pipe-arrow-dim" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                <path d="M2 1L8 5L2 9" fill="none" stroke="#2e4470" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </marker>
            </defs>

            {/* GitHub */}
            <rect x="10" y="60" width="110" height="56" rx="4" fill="#0d1322" stroke="#1e2d4a" strokeWidth="1"/>
            <text x="65" y="84" textAnchor="middle" fill="#eef2fc" fontSize="11" fontFamily="DM Mono, monospace" fontWeight="500">GitHub</text>
            <text x="65" y="100" textAnchor="middle" fill="#5a7299" fontSize="9" fontFamily="DM Mono, monospace">push to main</text>
            <text x="65" y="112" textAnchor="middle" fill="#5a7299" fontSize="8" fontFamily="DM Mono, monospace">webhook trigger</text>

            <line x1="120" y1="88" x2="148" y2="88" stroke="#4af0b8" strokeWidth="1.5" markerEnd="url(#pipe-arrow)"/>

            {/* CodePipeline wrapper */}
            <rect x="150" y="20" width="550" height="136" rx="4" fill="transparent" stroke="#1e2d4a" strokeWidth="1" strokeDasharray="5 3"/>
            <text x="168" y="38" fill="#5a7299" fontSize="9" fontFamily="DM Mono, monospace" letterSpacing="1">AWS CODEPIPELINE</text>

            {/* Stage 1 Source */}
            <rect x="165" y="50" width="130" height="88" rx="4" fill="#080d1c" stroke="#2e4470" strokeWidth="1"/>
            <text x="230" y="72" textAnchor="middle" fill="#4af0b8" fontSize="10" fontFamily="DM Mono, monospace" fontWeight="500">Stage 1</text>
            <text x="230" y="87" textAnchor="middle" fill="#eef2fc" fontSize="10" fontFamily="DM Mono, monospace">Source</text>
            <text x="230" y="103" textAnchor="middle" fill="#5a7299" fontSize="8" fontFamily="DM Mono, monospace">GitHub App</text>
            <text x="230" y="115" textAnchor="middle" fill="#5a7299" fontSize="8" fontFamily="DM Mono, monospace">pulls source</text>
            <text x="230" y="127" textAnchor="middle" fill="#4af0b8" fontSize="8" fontFamily="DM Mono, monospace">✓ Succeeded</text>

            <line x1="295" y1="94" x2="323" y2="94" stroke="#4af0b8" strokeWidth="1.5" markerEnd="url(#pipe-arrow)"/>

            {/* Stage 2 Build */}
            <rect x="325" y="50" width="150" height="88" rx="4" fill="#080d1c" stroke="#4af0b8" strokeWidth="1.5"/>
            <text x="400" y="72" textAnchor="middle" fill="#4af0b8" fontSize="10" fontFamily="DM Mono, monospace" fontWeight="500">Stage 2</text>
            <text x="400" y="87" textAnchor="middle" fill="#eef2fc" fontSize="10" fontFamily="DM Mono, monospace">Build — CodeBuild</text>
            <text x="400" y="103" textAnchor="middle" fill="#5a7299" fontSize="8" fontFamily="DM Mono, monospace">reads buildspec.yml</text>
            <text x="400" y="115" textAnchor="middle" fill="#5a7299" fontSize="8" fontFamily="DM Mono, monospace">npm ci → npm run build</text>
            <text x="400" y="127" textAnchor="middle" fill="#4af0b8" fontSize="8" fontFamily="DM Mono, monospace">✓ Succeeded</text>

            <line x1="475" y1="94" x2="503" y2="94" stroke="#4af0b8" strokeWidth="1.5" markerEnd="url(#pipe-arrow)"/>

            {/* Stage 3 Deploy */}
            <rect x="505" y="50" width="175" height="88" rx="4" fill="#080d1c" stroke="#2e4470" strokeWidth="1"/>
            <text x="592" y="72" textAnchor="middle" fill="#4af0b8" fontSize="10" fontFamily="DM Mono, monospace" fontWeight="500">Stage 3</text>
            <text x="592" y="87" textAnchor="middle" fill="#eef2fc" fontSize="10" fontFamily="DM Mono, monospace">Deploy — S3</text>
            <text x="592" y="103" textAnchor="middle" fill="#5a7299" fontSize="8" fontFamily="DM Mono, monospace">extracts build/ artifact</text>
            <text x="592" y="115" textAnchor="middle" fill="#5a7299" fontSize="8" fontFamily="DM Mono, monospace">static website hosting</text>
            <text x="592" y="127" textAnchor="middle" fill="#4af0b8" fontSize="8" fontFamily="DM Mono, monospace">✓ Succeeded</text>

            {/* buildspec label */}
            <rect x="325" y="152" width="150" height="1" fill="var(--border)"/>
            <text x="400" y="168" textAnchor="middle" fill="#5a7299" fontSize="8" fontFamily="DM Mono, monospace">buildspec.yml at repo root</text>
          </svg>
        </div>
      </div>

      {/* Problem / Solution */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "var(--border)", marginBottom: "52px" }}>
        {[
          {
            label: "Problem",
            text: "Manual deployments are slow and error-prone. Organisations using AWS tooling exclusively need a delivery pipeline that lives entirely within AWS — not one that depends on GitHub-hosted runners or external CI services."
          },
          {
            label: "Solution",
            text: "AWS CodePipeline detects every GitHub push via webhook and triggers an automated 3-stage pipeline. CodeBuild installs dependencies and builds the React app. The build output is deployed directly to S3 — no manual steps, no server to manage."
          }
        ].map(({ label, text }) => (
          <div key={label} style={{ background: "var(--card)", padding: "24px" }}>
            <div style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "10px" }}>{label}</div>
            <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.75 }}>{text}</p>
          </div>
        ))}
      </div>

      {/* buildspec breakdown */}
      <div style={{ marginBottom: "52px" }}>
        <div style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)", display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
          buildspec.yml — phase by phase
          <span style={{ flex: 1, height: "1px", background: "var(--border)", maxWidth: "200px" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "var(--border)" }}>
          {[
            { phase: "install", cmd: "npm ci --legacy-peer-deps", desc: "Clean, reproducible install from package-lock.json. Faster than npm install and guarantees the same versions every run." },
            { phase: "build", cmd: "npm run build", desc: "React production build via react-scripts. Outputs optimised static files to the build/ directory." },
            { phase: "post_build", cmd: "echo Build complete.", desc: "Confirmation step. Could be extended to send notifications or run post-build validation." },
            { phase: "artifacts", cmd: "base-directory: build", desc: "Tells CodePipeline to deploy only the build/ output — not the source code, not node_modules." },
          ].map(({ phase, cmd, desc }) => (
            <div key={phase} style={{ background: "var(--card)", padding: "18px 20px" }}>
              <div style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "6px" }}>{phase}</div>
              <div style={{ fontFamily: "DM Mono, monospace", fontSize: "11px", color: "var(--text)", marginBottom: "8px", padding: "4px 8px", background: "var(--bg3)", borderRadius: "2px" }}>{cmd}</div>
              <p style={{ fontSize: "12px", color: "var(--muted)", lineHeight: 1.7 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison: CodePipeline vs GitHub Actions */}
      <div style={{ marginBottom: "52px" }}>
        <div style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)", display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
          CodePipeline vs GitHub Actions
          <span style={{ flex: 1, height: "1px", background: "var(--border)", maxWidth: "200px" }} />
        </div>
        <div style={{ background: "var(--card)", border: "1px solid var(--border)", overflow: "hidden" }}>
          {[
            { aspect: "Pipeline location", cp: "AWS Console (CodePipeline)", gha: "GitHub repo (.github/workflows/)" },
            { aspect: "Build environment", cp: "AWS CodeBuild container", gha: "GitHub-hosted runner" },
            { aspect: "AWS authentication", cp: "CodePipeline IAM service role", gha: "IAM OIDC — no stored keys" },
            { aspect: "Build config file", cp: "buildspec.yml", gha: "*.yml in .github/workflows/" },
            { aspect: "Visibility", cp: "AWS Console", gha: "GitHub Actions tab" },
            { aspect: "Cost", cp: "~$1/month per pipeline", gha: "Free tier (2,000 min/month)" },
          ].map(({ aspect, cp, gha }, i) => (
            <div key={aspect} style={{ display: "grid", gridTemplateColumns: "180px 1fr 1fr", borderBottom: i < 5 ? "1px solid var(--border)" : "none" }}>
              <div style={{ padding: "12px 16px", fontSize: "11px", color: "var(--dim)", letterSpacing: "0.04em", borderRight: "1px solid var(--border)", background: "var(--bg3)" }}>{aspect}</div>
              <div style={{ padding: "12px 16px", fontSize: "12px", color: "var(--muted)", borderRight: "1px solid var(--border)" }}>
                <span style={{ color: "var(--accent)", marginRight: "6px" }}>CP</span>{cp}
              </div>
              <div style={{ padding: "12px 16px", fontSize: "12px", color: "var(--muted)" }}>
                <span style={{ color: "#5b8fff", marginRight: "6px" }}>GHA</span>{gha}
              </div>
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
          "The artifacts base-directory must match the build tool's output exactly. Create React App outputs to build/, not dist/. Getting this wrong means CodePipeline either deploys nothing or deploys the wrong files silently.",
          "eslintrc.js config files that reference external packages (like eslint-config-airbnb) will fail the CodeBuild if those packages are not installed. The safest approach is to rely on react-scripts' built-in ESLint config and remove any custom eslintrc files.",
          "CodeBuild automatically retries failed builds once (AutomatedStageRetry). This is useful for transient failures but can mask the real error — always read the build logs rather than waiting for the retry to potentially succeed.",
          "S3 bucket policy errors with spaces in the ARN (arn:aws:s3:::bucket-name /*) fail silently — the policy saves successfully but GetObject requests return 403. Always validate the ARN has no spaces before the /*.",
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

      {/* Links */}
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "40px" }}>
        <a href="https://github.com/hugdora/aws-codepipeline-react-s3" target="_blank" rel="noopener noreferrer"
          style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "12px", letterSpacing: "0.06em", color: "var(--accent)", textDecoration: "none", border: "1px solid rgba(74,240,184,0.2)", padding: "10px 20px", borderRadius: "2px" }}>
          View repository ↗
        </a>
        <a href="http://react-app-dora-2026.s3-website.eu-west-2.amazonaws.com" target="_blank" rel="noopener noreferrer"
          style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "12px", letterSpacing: "0.06em", color: "var(--text)", textDecoration: "none", border: "1px solid var(--border2)", padding: "10px 20px", borderRadius: "2px" }}>
          View live app ↗
        </a>
      </div>

      {/* Related projects */}
      <div style={{ padding: "24px 28px", background: "var(--card)", border: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <div style={{ fontFamily: "Syne, sans-serif", fontSize: "14px", fontWeight: 600, color: "#fff", marginBottom: "4px" }}>Compare with the GitHub Actions approach</div>
          <p style={{ fontSize: "12px", color: "var(--muted)", lineHeight: 1.6 }}>Project 03 solves the same delivery problem using GitHub Actions and IAM OIDC instead of CodePipeline.</p>
        </div>
        <Link href="/projects/cicd-pipeline"
          style={{ padding: "10px 20px", background: "var(--accent)", color: "#04060f", fontFamily: "DM Mono, monospace", fontSize: "12px", fontWeight: 500, borderRadius: "2px", textDecoration: "none", whiteSpace: "nowrap" }}>
          View Project 03 →
        </Link>
      </div>
    </main>
  );
}
