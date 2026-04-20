import Link from "next/link";
import { siteConfig } from "@/lib/site";

export default function Footer() {
  return (
    <footer
      style={{
        padding: "28px 32px",
        borderTop: "1px solid var(--border)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "56px",
      }}
    >
      <span style={{ fontSize: "11px", color: "var(--dim)" }}>
        © {new Date().getFullYear()} {siteConfig.name}
      </span>

      <div style={{ display: "flex", gap: "20px" }}>
        {[
          { href: siteConfig.github, label: "GitHub" },
          { href: siteConfig.linkedin, label: "LinkedIn" },
          { href: "/resume", label: "Resume" },
        ].map(({ href, label }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            style={{
              fontSize: "11px",
              color: "var(--dim)",
              textDecoration: "none",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            {label}
          </a>
        ))}
      </div>
    </footer>
  );
}
