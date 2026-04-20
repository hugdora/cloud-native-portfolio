"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/architecture", label: "Architecture" },
  { href: "/writing", label: "Writing" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 32px",
        borderBottom: "1px solid var(--border)",
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(4,6,15,0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <Link
        href="/"
        style={{
          fontFamily: "Syne, sans-serif",
          fontWeight: 700,
          fontSize: "15px",
          color: "var(--text)",
          letterSpacing: "0.04em",
          textDecoration: "none",
        }}
      >
        dora<span style={{ color: "var(--accent)" }}>.</span>ed
      </Link>

      <nav>
        <ul
          style={{
            display: "flex",
            gap: "24px",
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
        >
          {links.map((link) => {
            const active = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  style={{
                    color: active ? "var(--accent)" : "var(--muted)",
                    textDecoration: "none",
                    fontSize: "12px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase" as const,
                    transition: "color 0.2s",
                  }}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
