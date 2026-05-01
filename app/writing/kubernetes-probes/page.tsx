import Link from "next/link";

export default function KubernetesProbesArticle() {
  return (
    <main style={{ padding: "56px 32px", maxWidth: "720px", margin: "0 auto" }}>
      <style>{`
        .back-link { color: var(--dim); text-decoration: none; font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; transition: color 0.2s; }
        .back-link:hover { color: var(--accent); }
        .article-body h2 { font-family: Syne, sans-serif; font-size: 18px; font-weight: 700; color: #fff; margin: 40px 0 14px; letter-spacing: -0.01em; }
        .article-body p { font-size: 14px; color: var(--muted); line-height: 1.85; margin-bottom: 18px; }
        .article-body strong { color: var(--text); font-weight: 500; }
        .callout { background: var(--card); border: 1px solid var(--border); border-left: 2px solid var(--accent); padding: 16px 20px; margin: 24px 0; font-size: 13px; color: var(--muted); line-height: 1.75; }
        .callout strong { color: var(--accent); display: block; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 6px; }
        .callout.warning { border-left-color: #ef9f27; }
        .callout.warning strong { color: #ef9f27; }
        .probe-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--border); margin: 24px 0; }
        .probe-card { background: var(--card); padding: 20px; }
        .probe-name { font-family: Syne, sans-serif; font-size: 14px; font-weight: 700; margin-bottom: 8px; }
        .probe-q { font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--dim); margin-bottom: 8px; }
        .probe-a { font-size: 13px; color: var(--muted); line-height: 1.7; margin-bottom: 10px; }
        .probe-action { font-size: 11px; padding: 6px 10px; border-radius: 1px; display: inline-block; }
        .code-block { background: var(--card); border: 1px solid var(--border); padding: 16px 20px; font-family: DM Mono, monospace; font-size: 12px; color: var(--muted); line-height: 1.8; margin: 20px 0; overflow-x: auto; white-space: pre; }
        .code-hl { color: var(--accent); }
        .code-comment { color: var(--dim); }
        .scenario { background: var(--card); border: 1px solid var(--border); padding: 16px 20px; margin-bottom: 1px; }
        .scenario-title { font-size: 13px; font-weight: 500; color: var(--text); margin-bottom: 6px; }
        .scenario-body { font-size: 12px; color: var(--muted); line-height: 1.7; }
        .tag { font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase; padding: 3px 10px; border: 1px solid var(--border); color: var(--dim); border-radius: 1px; margin-right: 6px; }
        .divider { height: 1px; background: var(--border); margin: 48px 0; }
      `}</style>

      <div style={{ marginBottom: "40px" }}>
        <Link href="/writing" className="back-link">← Writing</Link>
      </div>

      <div style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "16px" }}>
        04 / Operations
      </div>
      <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: "20px" }}>
        Readiness vs liveness probes in Kubernetes — what I learned
      </h1>
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "48px" }}>
        <span style={{ fontSize: "12px", color: "var(--dim)" }}>5 min read</span>
        <span style={{ width: "1px", height: "14px", background: "var(--border)" }} />
        {["Kubernetes", "Operations", "Reliability"].map(t => <span key={t} className="tag">{t}</span>)}
      </div>

      <div className="article-body">
        <p>
          Liveness and readiness probes look almost identical in a Kubernetes manifest. They are configured the same way, they hit HTTP endpoints, they have the same parameters. It is easy to assume they do the same thing, or to configure them identically and move on.
        </p>
        <p>
          They do fundamentally different things, and confusing them causes real problems in production. Here is what I learned while implementing them.
        </p>

        <h2>The core difference</h2>

        <div className="probe-grid">
          <div className="probe-card">
            <div className="probe-name" style={{ color: "var(--accent)" }}>Readiness probe</div>
            <div className="probe-q">Question it answers:</div>
            <div className="probe-a">"Is this pod ready to receive traffic right now?"</div>
            <div className="probe-q">When it fails:</div>
            <div className="probe-a">The pod is removed from the Service's endpoints. Traffic stops being routed to it. The pod keeps running.</div>
            <span className="probe-action" style={{ background: "rgba(74,240,184,0.08)", border: "1px solid rgba(74,240,184,0.2)", color: "var(--accent)", fontSize: "10px" }}>
              Remove from load balancer
            </span>
          </div>
          <div className="probe-card">
            <div className="probe-name" style={{ color: "#3a7fff" }}>Liveness probe</div>
            <div className="probe-q">Question it answers:</div>
            <div className="probe-a">"Is this pod still alive and not in a broken state?"</div>
            <div className="probe-q">When it fails:</div>
            <div className="probe-a">Kubernetes kills the container and restarts it according to the pod's restart policy.</div>
            <span className="probe-action" style={{ background: "rgba(58,127,255,0.08)", border: "1px solid rgba(58,127,255,0.2)", color: "#3a7fff", fontSize: "10px" }}>
              Restart the container
            </span>
          </div>
        </div>

        <p>
          Readiness controls traffic routing. Liveness controls container lifecycle. They solve completely different problems.
        </p>

        <h2>Why using the same endpoint for both is a mistake</h2>
        <p>
          The most common pattern I see is configuring both probes to hit the same <strong>/health</strong> endpoint. It seems logical — if the app is healthy, it should be both live and ready, right?
        </p>
        <p>
          The problem emerges during startup. A Next.js application or any Node.js server takes time to initialise. During that period, the app might be alive — the process is running, the port is open — but not yet ready to serve requests. If your liveness probe fires too early and the app has not loaded yet, Kubernetes kills and restarts the container. That restart resets the timer. The container never gets a chance to finish starting up.
        </p>

        <div className="callout warning">
          <strong>Crash loop pattern</strong>
          A liveness probe that fires during startup causes a crash loop. The container starts, the probe fires before the app is ready, Kubernetes restarts it, the probe fires again. The pod never becomes healthy.
        </div>

        <h2>What the probes should actually check</h2>
        <div className="scenario">
          <div className="scenario-title">Readiness probe → check application readiness</div>
          <div className="scenario-body">
            Hit an endpoint that verifies the app is fully initialised and ready to handle requests. For a Next.js app, this might be <strong>/api/health</strong> that returns 200 only after all startup tasks are complete. For an app that depends on a database connection, the readiness check should verify that connection exists.
          </div>
        </div>
        <div className="scenario" style={{ marginTop: "1px" }}>
          <div className="scenario-title">Liveness probe → check for deadlocks and zombie states</div>
          <div className="scenario-body">
            Hit a simpler endpoint that just confirms the process is alive and not stuck. This should be extremely lightweight — it should not check dependencies or do any real work. If the process can respond at all, it is live. The liveness probe only needs to catch catastrophic failures: memory leaks that cause total unresponsiveness, deadlocks, or corrupted state.
          </div>
        </div>

        <h2>The configuration — what to actually set</h2>

        <div className="code-block">
{`livenessProbe:
  httpGet:
    path: /api/alive      `}<span className="code-comment"># Lightweight — just confirms process is running</span>{`
    port: 3000
  `}<span className="code-hl">initialDelaySeconds: 30</span>{`  `}<span className="code-comment"># Give the app time to start before first check</span>{`
  periodSeconds: 10
  failureThreshold: 3     `}<span className="code-comment"># 3 consecutive failures before restart</span>{`
  timeoutSeconds: 5

readinessProbe:
  httpGet:
    path: /api/ready      `}<span className="code-comment"># Checks full app readiness (DB, cache, etc.)</span>{`
    port: 3000
  `}<span className="code-hl">initialDelaySeconds: 10</span>{`  `}<span className="code-comment"># Can fire earlier than liveness</span>{`
  periodSeconds: 5
  failureThreshold: 3
  successThreshold: 1     `}<span className="code-comment"># 1 success re-adds to load balancer</span>{`
  timeoutSeconds: 3`}
        </div>

        <p>
          The <strong>initialDelaySeconds</strong> on the liveness probe is the most important parameter. Set it too low and you get crash loops. Set it too high and Kubernetes will not catch genuine failures quickly enough. For most Node.js applications, 30 seconds is a safe starting point. Profile your actual startup time and set it to roughly 1.5× that value.
        </p>

        <h2>Startup probes — the third option</h2>
        <p>
          Kubernetes 1.16 introduced a third probe type: the startup probe. It runs once during container startup and disables the liveness probe until it succeeds. This is the cleanest solution for applications with variable startup times.
        </p>

        <div className="code-block">
{`startupProbe:
  httpGet:
    path: /api/alive
    port: 3000
  `}<span className="code-hl">failureThreshold: 30</span>{`    `}<span className="code-comment"># Up to 5 minutes (30 × 10s) to start</span>{`
  periodSeconds: 10
  `}<span className="code-comment"># Liveness probe only activates after this succeeds</span>{``}
        </div>

        <p>
          With a startup probe, you can give a slow-starting container up to 5 minutes to initialise without loosening your liveness probe thresholds. Once the startup probe succeeds, the liveness probe takes over with its normal strict settings.
        </p>

        <h2>What I got wrong first</h2>
        <p>
          My first attempt used the same <strong>/health</strong> endpoint for both probes with an <strong>initialDelaySeconds</strong> of 5 seconds. The app took 12 seconds to start. Kubernetes killed the container after 3 failed liveness checks, restarted it, and the cycle repeated. The pod showed as Running but was never Ready.
        </p>
        <p>
          The fix was two separate endpoints, a 30-second initial delay on liveness, and a startup probe to handle the variable startup window cleanly. After those changes, the pod came up reliably on every deployment.
        </p>

        <div className="callout">
          <strong>The rule of thumb</strong>
          Readiness probe = "can you take traffic?" Liveness probe = "are you still alive?" They should point to different endpoints and have different thresholds. If they are identical, one of them is wrong.
        </div>

        <div className="divider" />

        <p style={{ fontSize: "13px", color: "var(--dim)" }}>
          The full Kubernetes implementation including probe configuration is documented on the{" "}
          <Link href="/projects/kubernetes-platform" style={{ color: "var(--accent)", textDecoration: "none" }}>Kubernetes Platform project page</Link>.
        </p>
      </div>
    </main>
  );
}
