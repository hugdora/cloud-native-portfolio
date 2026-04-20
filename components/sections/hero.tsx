import Link from "next/link";
import { siteConfig } from "@/lib/site";

export default function Hero() {
  return (
    <section
      style={{
        padding: "72px 32px 64px",
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
        <span
          style={{ width: "20px", height: "1px", background: "var(--accent)" }}
        />
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
            marginBottom: "28px",
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
          Open to new roles — {siteConfig.location}
        </div>
      )}

      {/* Headline */}
      <h1
        style={{
          fontFamily: "Syne, sans-serif",
          fontSize: "clamp(32px, 5vw, 52px)",
          fontWeight: 800,
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          color: "#fff",
          maxWidth: "680px",
          marginBottom: "24px",
        }}
      >
        I build and ship{" "}
        <span style={{ color: "var(--accent)" }}>cloud-native</span> delivery
        platforms.
      </h1>

      {/* Description */}
      <p
        style={{
          color: "var(--muted)",
          maxWidth: "560px",
          lineHeight: 1.75,
          marginBottom: "40px",
          fontSize: "13px",
        }}
      >
        {siteConfig.description}
      </p>

      {/* CTA buttons */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          marginBottom: "52px",
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
          href="/architecture"
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
          View Architecture
        </Link>
      </div>

      {/* Stack badges */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          paddingTop: "20px",
          borderTop: "1px solid var(--border)",
        }}
      >
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

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(74,240,184,0.4); }
          50% { opacity: 0.8; box-shadow: 0 0 0 6px rgba(74,240,184,0); }
        }
      `}</style>
    </section>
  );
}
