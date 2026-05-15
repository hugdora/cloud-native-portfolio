import Link from "next/link";
import { siteConfig } from "@/lib/site";

export default function CTA() {
  return (
    <section style={{ padding: "0 0 56px" }}>
      <div className="container" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

        {/* Resume CTA */}
        <div
          style={{
            padding: "32px 40px",
            background: "var(--card)",
            border: "1px solid var(--border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "24px",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "10px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--accent)",
                marginBottom: "8px",
              }}
            >
              CV / Résumé
            </div>
            <div
              style={{
                fontFamily: "Syne, sans-serif",
                fontSize: "15px",
                fontWeight: 700,
                color: "#fff",
                marginBottom: "4px",
              }}
            >
              Platform & DevOps Engineer · Cloud Security Specialist
            </div>
            <div style={{ color: "var(--muted)", fontSize: "12px", marginBottom: "4px" }}>
              5+ years · AWS · Terraform · Kubernetes · GitHub Actions · Security
            </div>
            <div
              style={{
                color: "var(--dim)",
                fontSize: "10px",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              PDF · Updated May 2026
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <a
              href="/Huguette-Dora-Edjangue-CV.pdf"
              download
              style={{
                padding: "11px 24px",
                background: "var(--accent)",
                color: "#04060f",
                fontFamily: "DM Mono, monospace",
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "0.06em",
                borderRadius: "2px",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              Download CV ↓
            </a>
            <Link
              href="/resume"
              style={{
                padding: "11px 24px",
                background: "transparent",
                color: "var(--text)",
                border: "1px solid var(--border2)",
                fontFamily: "DM Mono, monospace",
                fontSize: "12px",
                letterSpacing: "0.06em",
                borderRadius: "2px",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              View Online →
            </Link>
          </div>
        </div>

        {/* Contact card — two columns */}
        <div
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            position: "relative",
            overflow: "hidden",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0",
          }}
        >
          {/* Background glow */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: "300px",
              height: "300px",
              background: "radial-gradient(circle, rgba(74,240,184,0.04) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* Left — heading, description, email, buttons */}
          <div style={{ padding: "40px", borderRight: "1px solid var(--border)" }}>
            <h2
              style={{
                fontFamily: "Syne, sans-serif",
                fontSize: "20px",
                fontWeight: 700,
                color: "#fff",
                marginBottom: "12px",
              }}
            >
              Interested in cloud infrastructure, platform engineering, or cloud security work?
            </h2>

            <p
              style={{
                color: "var(--muted)",
                fontSize: "12px",
                lineHeight: 1.7,
                marginBottom: "20px",
              }}
            >
              I&apos;m currently open to Platform Engineer, DevOps Engineer, and
              Cloud Security roles in {siteConfig.location}. Reach out if you&apos;re
              building something with AWS, Terraform, Kubernetes, or GitHub Actions.
            </p>

            <a
              href={`mailto:${siteConfig.email}`}
              style={{
                color: "var(--accent)",
                fontSize: "13px",
                display: "block",
                marginBottom: "24px",
                textDecoration: "none",
              }}
            >
              {siteConfig.email}
            </a>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Link
                href="/contact"
                style={{
                  padding: "11px 24px",
                  background: "var(--accent)",
                  color: "#04060f",
                  fontFamily: "DM Mono, monospace",
                  fontSize: "12px",
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                  borderRadius: "2px",
                  textDecoration: "none",
                }}
              >
                Send a message →
              </Link>
            </div>
          </div>

          {/* Right — availability status + links */}
          <div
            style={{
              padding: "40px",
              display: "flex",
              flexDirection: "column",
              gap: "32px",
              justifyContent: "space-between",
            }}
          >
            {/* Availability block */}
            <div>
              <div
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--dim)",
                  marginBottom: "16px",
                  paddingBottom: "12px",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                Availability
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {[
                  { label: "Status", value: "Open to roles", highlight: true },
                  { label: "Location", value: "London / Remote", highlight: false },
                  { label: "Notice", value: "Available immediately", highlight: false },
                  { label: "Type", value: "Full-time · Contract", highlight: false },
                ].map(({ label, value, highlight }) => (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "16px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "10px",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: "var(--dim)",
                      }}
                    >
                      {label}
                    </span>
                    <span
                      style={{
                        fontSize: "11px",
                        color: highlight ? "var(--accent)" : "var(--muted)",
                        fontWeight: highlight ? 600 : 400,
                      }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Links block */}
            <div>
              <div
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--dim)",
                  marginBottom: "16px",
                  paddingBottom: "12px",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                Find me online
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "var(--border)" }}>
                {[
                  { label: "GitHub", href: siteConfig.github, note: "github.com/hugdora" },
                  { label: "LinkedIn", href: siteConfig.linkedin, note: "linkedin.com/in/hugdora" },
                ].map(({ label, href, note }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: "var(--card)",
                      padding: "12px 16px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    <span style={{ fontSize: "11px", color: "var(--text)" }}>{label}</span>
                    <span style={{ fontSize: "10px", color: "var(--dim)" }}>{note} →</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
