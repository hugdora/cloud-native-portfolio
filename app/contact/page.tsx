"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

const channels = [
  {
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    desc: "Best for project enquiries and role opportunities.",
    cta: "Send email →",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/hugdora",
    href: siteConfig.linkedin,
    desc: "Connect for professional network and direct messages.",
    cta: "View profile →",
  },
  {
    label: "GitHub",
    value: "github.com/hugdora",
    href: siteConfig.github,
    desc: "Browse the full codebase behind this platform.",
    cta: "View repos →",
  },
  {
    label: "Portfolio",
    value: "doraejangue.com",
    href: "https://doraejangue.com",
    desc: "Projects, architecture, writing, and resume — all in one place.",
    cta: "Browse site →",
  },
];

export default function ContactPage() {
  const [copied, setCopied] = useState(false);

  function copyEmail() {
    navigator.clipboard.writeText(siteConfig.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <main style={{ padding: "56px 32px", maxWidth: "760px", margin: "0 auto" }}>
      <style>{`
        .channel-card {
          background: var(--card);
          border: 1px solid var(--border);
          padding: 24px 28px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
          transition: border-color 0.2s, background 0.2s;
        }
        .channel-card:hover { background: var(--bg3); border-color: var(--border2); }
        .channel-link {
          font-size: 12px;
          letter-spacing: 0.06em;
          color: var(--accent);
          text-decoration: none;
          border: 1px solid rgba(74,240,184,0.25);
          padding: 8px 18px;
          border-radius: 2px;
          white-space: nowrap;
          transition: background 0.2s;
          flex-shrink: 0;
        }
        .channel-link:hover { background: rgba(74,240,184,0.08); }
        .copy-btn {
          background: none;
          border: 1px solid var(--border2);
          color: var(--muted);
          font-family: DM Mono, monospace;
          font-size: 11px;
          letter-spacing: 0.06em;
          padding: 6px 14px;
          border-radius: 2px;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s;
        }
        .copy-btn:hover { border-color: var(--accent); color: var(--accent); }
        .copy-btn.copied { border-color: var(--accent); color: var(--accent); }
        .availability-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: var(--accent);
          animation: pulse-dot 2s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(74,240,184,0.4); }
          50% { opacity: 0.8; box-shadow: 0 0 0 6px rgba(74,240,184,0); }
        }
      `}</style>

      {/* Page header */}
      <div style={{ marginBottom: "52px" }}>
        <div style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)", display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
          Get in touch
          <span style={{ flex: 1, height: "1px", background: "var(--border)", maxWidth: "200px" }} />
        </div>
        <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "20px" }}>
          Contact
        </h1>
        <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.75, maxWidth: "520px" }}>
          Open to remote freelance opportunities in Platform Engineering, DevOps, and Cloud Security. If you are building something with AWS, Terraform, Kubernetes, or GitHub Actions — let&apos;s talk.
        </p>
      </div>

      {/* Availability banner */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "16px 20px", background: "rgba(74,240,184,0.05)", border: "1px solid rgba(74,240,184,0.2)", marginBottom: "40px" }}>
        <span className="availability-dot" />
        <div>
          <div style={{ fontSize: "13px", color: "var(--accent)", fontWeight: 500, marginBottom: "2px" }}>
            Available for new projects
          </div>
          <div style={{ fontSize: "12px", color: "var(--muted)" }}>
            London-based · Remote-first · Available immediately
          </div>
        </div>
      </div>

      {/* Email highlight */}
      <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderTop: "2px solid var(--accent)", padding: "28px", marginBottom: "1px", position: "relative", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, var(--accent), transparent)" }} />
        <div style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "10px" }}>
          Primary contact
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <div style={{ fontFamily: "Syne, sans-serif", fontSize: "20px", fontWeight: 700, color: "#fff", marginBottom: "6px" }}>
              {siteConfig.email}
            </div>
            <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.6 }}>
              For project enquiries, role opportunities, and collaborations.
            </p>
          </div>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <a href={`mailto:${siteConfig.email}`}
              style={{ padding: "11px 24px", background: "var(--accent)", color: "#04060f", fontFamily: "DM Mono, monospace", fontSize: "12px", fontWeight: 500, letterSpacing: "0.06em", borderRadius: "2px", textDecoration: "none" }}>
              Send email →
            </a>
            <button className={`copy-btn${copied ? " copied" : ""}`} onClick={copyEmail}>
              {copied ? "Copied ✓" : "Copy address"}
            </button>
          </div>
        </div>
      </div>

      {/* Other channels */}
      <div style={{ display: "grid", gap: "1px", background: "var(--border)", marginBottom: "48px" }}>
        {channels.slice(1).map((c) => (
          <div key={c.label} className="channel-card">
            <div>
              <div style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--dim)", marginBottom: "6px" }}>
                {c.label}
              </div>
              <div style={{ fontFamily: "DM Mono, monospace", fontSize: "13px", color: "var(--text)", marginBottom: "6px" }}>
                {c.value}
              </div>
              <p style={{ fontSize: "12px", color: "var(--muted)", lineHeight: 1.6 }}>
                {c.desc}
              </p>
            </div>
            <a href={c.href} target="_blank" rel="noopener noreferrer" className="channel-link">
              {c.cta}
            </a>
          </div>
        ))}
      </div>

      {/* What I am looking for */}
      <div style={{ marginBottom: "48px" }}>
        <div style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)", display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
          What I am looking for
          <span style={{ flex: 1, height: "1px", background: "var(--border)", maxWidth: "200px" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "var(--border)" }}>
          {[
            { type: "Remote freelance contracts", detail: "Platform, DevOps, or Cloud Security Engineering" },
            { type: "AWS infrastructure projects", detail: "Terraform, CloudFront, S3, IAM, security hardening" },
            { type: "CI/CD pipeline setup", detail: "GitHub Actions, Jenkins, Docker, Kubernetes delivery" },
            { type: "Cloud security consulting", detail: "Security posture review, compliance, hardening" },
          ].map(({ type, detail }) => (
            <div key={type} style={{ background: "var(--card)", padding: "18px 20px" }}>
              <div style={{ fontSize: "13px", fontWeight: 500, color: "var(--text)", marginBottom: "4px" }}>{type}</div>
              <div style={{ fontSize: "12px", color: "var(--muted)", lineHeight: 1.6 }}>{detail}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Resume CTA */}
      <div style={{ padding: "24px 28px", background: "var(--card)", border: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <div style={{ fontFamily: "Syne, sans-serif", fontSize: "14px", fontWeight: 600, color: "#fff", marginBottom: "4px" }}>
            Want to see my full background?
          </div>
          <p style={{ fontSize: "12px", color: "var(--muted)", lineHeight: 1.6 }}>
            5+ years of experience across cloud, DevOps, and security — with a downloadable CV.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <Link href="/resume"
            style={{ padding: "10px 20px", background: "var(--accent)", color: "#04060f", fontFamily: "DM Mono, monospace", fontSize: "12px", fontWeight: 500, borderRadius: "2px", textDecoration: "none" }}>
            View Resume →
          </Link>
          <Link href="/projects"
            style={{ padding: "10px 20px", border: "1px solid var(--border2)", color: "var(--text)", fontFamily: "DM Mono, monospace", fontSize: "12px", borderRadius: "2px", textDecoration: "none" }}>
            View Projects
          </Link>
        </div>
      </div>
    </main>
  );
}
