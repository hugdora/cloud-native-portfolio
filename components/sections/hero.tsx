import Link from "next/link";
import { siteConfig } from "@/lib/site";

const certs = [
  {
    title: "AWS Certified Solutions Architect",
    level: "Associate",
    issuer: "Amazon Web Services",
    icon: "☁",
    color: "rgba(255,153,0,0.15)",
    border: "rgba(255,153,0,0.3)",
    tag: "#FF9900",
  },
  {
    title: "AWS Certified Cloud Practitioner",
    level: "Foundational",
    issuer: "Amazon Web Services",
    icon: "☁",
    color: "rgba(255,153,0,0.08)",
    border: "rgba(255,153,0,0.2)",
    tag: "#FF9900",
  },
  {
    title: "Certified in Cybersecurity",
    level: "CC",
    issuer: "ISC²",
    icon: "🛡",
    color: "rgba(74,240,184,0.08)",
    border: "rgba(74,240,184,0.25)",
    tag: "#4af0b8",
  },
  {
    title: "Red Hat Certified System Administrator",
    level: "RHCSA",
    issuer: "Red Hat",
    icon: "🐧",
    color: "rgba(238,0,0,0.08)",
    border: "rgba(238,0,0,0.25)",
    tag: "#EE0000",
  },
];

export default function Hero() {
  return (
    <section
      style={{
        padding: "72px 0 64px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow effects */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-80px",
          right: "-60px",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle, rgba(74,240,184,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-40px",
          left: "-80px",
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle, rgba(58,127,255,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container">

        {/* Tag */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "11px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: "20px",
          }}
        >
          <span style={{ width: "20px", height: "1px", background: "var(--accent)" }} />
          {siteConfig.title}
        </div>

        {/* Status dot */}
        {siteConfig.openToWork && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "11px",
              color: "var(--muted)",
              marginBottom: "32px",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "var(--accent)",
                animation: "pulse 2s ease-in-out infinite",
                flexShrink: 0,
              }}
            />
            Open to roles — {siteConfig.location}
          </div>
        )}

        {/* Two-column layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 320px",
            gap: "64px",
            alignItems: "start",
          }}
        >
          {/* LEFT — headline, description, CTAs, stats, badges */}
          <div>
            <h1
              style={{
                fontFamily: "Syne, sans-serif",
                fontSize: "clamp(32px, 4.5vw, 52px)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "#fff",
                marginBottom: "24px",
              }}
            >
              I build{" "}
              <span style={{ color: "var(--accent)" }}>secure, automated,</span>{" "}
              and observable cloud-native platforms.
            </h1>

            <p
              style={{
                color: "var(--muted)",
                maxWidth: "520px",
                lineHeight: 1.75,
                marginBottom: "16px",
                fontSize: "13px",
              }}
            >
              With 5+ years across cloud infrastructure, DevOps, and
              cybersecurity, I design delivery platforms that are repeatable,
              auditable, and secure by default; from IAM policies and Terraform
              modules to Kubernetes ingress and CI/CD pipelines.
            </p>

            <p
              style={{
                color: "var(--muted)",
                maxWidth: "520px",
                lineHeight: 1.75,
                marginBottom: "40px",
                fontSize: "13px",
              }}
            >
              Security isn&apos;t a layer I add at the end. It&apos;s built into
              every workflow.
            </p>

            {/* CTA buttons */}
            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
                marginBottom: "48px",
              }}
            >
              <Link
                href="/projects"
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
                View Projects →
              </Link>
              <Link
                href="/Huguette-Dora-Edjangue-CV.pdf"
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
                Download CV ↓
              </Link>
            </div>

            {/* Stats strip */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "32px",
                marginBottom: "40px",
                paddingBottom: "40px",
                borderBottom: "1px solid var(--border)",
              }}
            >
              {[
                { number: "5+", label: "Years in cloud & security" },
                { number: "100%", label: "Critical vulnerabilities eliminated" },
                { number: "0", label: "Stored AWS credentials" },
                { number: "4", label: "Production projects, 2 delivery tracks" },
              ].map(({ number, label }) => (
                <div
                  key={label}
                  style={{ display: "flex", flexDirection: "column", gap: "4px" }}
                >
                  <span
                    style={{
                      fontFamily: "Syne, sans-serif",
                      fontSize: "28px",
                      fontWeight: 800,
                      color: "var(--accent)",
                      letterSpacing: "-0.02em",
                      lineHeight: 1,
                    }}
                  >
                    {number}
                  </span>
                  <span
                    style={{
                      fontSize: "10px",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--dim)",
                      maxWidth: "140px",
                      lineHeight: 1.4,
                    }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Stack badges */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {siteConfig.stack.map((tech) => (
                <span
                  key={tech}
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    padding: "5px 12px",
                    border: "1px solid var(--border)",
                    borderRadius: "2px",
                    color: "var(--dim)",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT — about panel + certifications panel */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              position: "sticky",
              top: "100px",
            }}
          >
            {/* About Me panel */}
            <div
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              {/* Photo + name row */}
              <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "4px",
                    overflow: "hidden",
                    flexShrink: 0,
                    border: "1px solid var(--border2)",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/Dora-id-picture.jpg"
                    alt="Huguette Dora Edjangue"
                    style={{ objectFit: "cover", width: "100%", height: "100%", display: "block" }}
                  />
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "Syne, sans-serif",
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "#fff",
                      lineHeight: 1.2,
                    }}
                  >
                    Huguette Dora Edjangue
                  </div>
                  <div
                    style={{
                      fontSize: "10px",
                      color: "var(--accent)",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      marginTop: "4px",
                    }}
                  >
                    Platform & DevOps Engineer
                  </div>
                  <div
                    style={{
                      fontSize: "10px",
                      color: "var(--dim)",
                      marginTop: "2px",
                    }}
                  >
                    London, UK
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: "1px", background: "var(--border)" }} />

              {/* Bio */}
              <p
                style={{
                  fontSize: "11px",
                  color: "var(--muted)",
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                Since I have started my journey in IT, I’ve been passionate about deploying and securing web platforms. 
                I build systems where automation, reliability, and security are integrated from the start; not added later.
                What motivates me most is creating reliable, secure, and scalable systems that people can trust.
              </p>

              {/* Languages */}
              <div style={{ display: "flex", gap: "8px" }}>
                {["French — Native", "English — Professional"].map((lang) => (
                  <span
                    key={lang}
                    style={{
                      fontSize: "9px",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      padding: "3px 8px",
                      border: "1px solid var(--border)",
                      color: "var(--dim)",
                      borderRadius: "1px",
                    }}
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* Certifications panel */}
            <div>
              <div
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--dim)",
                  marginBottom: "12px",
                  paddingBottom: "12px",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                Certifications
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1px",
                  background: "var(--border)",
                }}
              >
                {certs.map((cert) => (
                  <div
                    key={cert.title}
                    style={{
                      background: "var(--card)",
                      padding: "14px 16px",
                      display: "flex",
                      gap: "12px",
                      alignItems: "flex-start",
                    }}
                  >
                    {/* Icon bubble */}
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "5px",
                        background: cert.color,
                        border: `1px solid ${cert.border}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "14px",
                        flexShrink: 0,
                      }}
                    >
                      {cert.icon}
                    </div>

                    {/* Text */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                      <div
                        style={{
                          fontSize: "11px",
                          color: "var(--text)",
                          fontWeight: 500,
                          lineHeight: 1.3,
                        }}
                      >
                        {cert.title}
                      </div>
                      <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                        <span
                          style={{
                            fontSize: "9px",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            color: cert.tag,
                            fontWeight: 600,
                          }}
                        >
                          {cert.level}
                        </span>
                        <span style={{ color: "var(--border2)", fontSize: "9px" }}>·</span>
                        <span
                          style={{
                            fontSize: "9px",
                            letterSpacing: "0.06em",
                            color: "var(--dim)",
                            textTransform: "uppercase",
                          }}
                        >
                          {cert.issuer}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(74,240,184,0.4); }
          50% { opacity: 0.8; box-shadow: 0 0 0 6px rgba(74,240,184,0); }
        }
        @media (max-width: 768px) {
          .hero-two-col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
