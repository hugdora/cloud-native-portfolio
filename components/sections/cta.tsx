import Link from "next/link";
import { siteConfig } from "@/lib/site";

export default function CTA() {
  return (
    <section style={{ padding: "0 32px 56px" }}>
      <div
        style={{
          padding: "40px",
          background: "var(--card)",
          border: "1px solid var(--border)",
          position: "relative",
          overflow: "hidden",
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
            background:
              "radial-gradient(circle, rgba(74,240,184,0.04) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <h2
          style={{
            fontFamily: "Syne, sans-serif",
            fontSize: "20px",
            fontWeight: 700,
            color: "#fff",
            marginBottom: "12px",
            maxWidth: "440px",
          }}
        >
          Interested in cloud infrastructure or platform engineering work?
        </h2>

        <p
          style={{
            color: "var(--muted)",
            fontSize: "12px",
            lineHeight: 1.7,
            maxWidth: "440px",
            marginBottom: "20px",
          }}
        >
          I&apos;m currently open to Cloud / DevOps / Platform Engineer roles in{" "}
          {siteConfig.location}. Reach out if you&apos;re building something with
          AWS, Terraform, Kubernetes, or GitHub Actions.
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
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
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
            }}
          >
            View GitHub
          </a>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
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
            }}
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
