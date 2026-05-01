import Link from "next/link";

const experience = [
  {
    title: "Cloud-Native Portfolio Platform (Self-Directed)",
    company: "Independent Project",
    period: "Mar 2026 — Present",
    type: "Self-directed",
    bullets: [
      "Designed and deployed a production-grade cloud-native platform on AWS — live at doraejangue.com.",
      "Provisioned S3, CloudFront, ACM, Route 53, and IAM OIDC using Terraform Infrastructure as Code.",
      "Built dual-track CI/CD pipeline with GitHub Actions: static deployment to S3/CloudFront and containerised deployment to Kubernetes via Helm.",
      "Implemented Origin Access Control (OAC) for private S3 delivery and keyless AWS auth via IAM OIDC — no long-lived credentials stored anywhere.",
      "Documented full engineering decisions, architecture diagrams, and case studies at doraejangue.com/projects.",
    ],
  },
  {
    title: "Cybersecurity Consultant",
    company: "Hagital",
    period: "Mar 2023 — Feb 2026",
    type: "Contract",
    bullets: [
      "Deployed and optimised SIEM and EDR tooling to enhance monitoring and incident detection.",
      "Designed custom detection logic for brute-force, ransomware, and data exfiltration scenarios mapped to MITRE ATT&CK.",
      "Managed full vulnerability lifecycle using Tenable.io — achieved 100% reduction in critical vulnerabilities.",
      "Implemented secure AWS configurations aligned to CIS benchmarks and Well-Architected Security Pillar.",
      "Automated remediation tasks using PowerShell and improved monitoring dashboards with KQL.",
    ],
  },
  {
    title: "Cloud Engineer",
    company: "Darktrace",
    period: "Jun 2021 — Oct 2022",
    type: "Fixed-term contract",
    bullets: [
      "Optimised cloud-based workloads in collaboration with engineering teams, achieving a 30% cost reduction.",
      "Identified and mitigated infrastructure vulnerabilities, ensuring compliance with security best practices.",
      "Conducted AWS environment review improving system reliability and regulatory alignment.",
      "Designed and implemented a cloud-based solution using AWS services that resulted in a 50% reduction in infrastructure overhead.",
    ],
  },
  {
    title: "AWS Solutions Architect",
    company: "Revolent",
    period: "Sep 2020 — Apr 2021",
    type: "Fixed-term contract",
    bullets: [
      "Delivered strategic guidance for cloud migrations, optimising infrastructure for diverse clients.",
      "Designed CI/CD pipelines leveraging AWS services, boosting development efficiency by 40%.",
      "Collaborated with engineering teams to embed security into operational processes.",
    ],
  },
  {
    title: "Linux System Administrator",
    company: "Data Service",
    period: "Oct 2016 — Aug 2020",
    type: "Full-time",
    bullets: [
      "Implemented automated CI/CD pipeline using Jenkins, Maven, Docker, and AWS EC2 with Terraform IaC.",
      "Embedded security checks into deployment workflows.",
      "Installed and maintained Linux-based servers with emphasis on hardening and patch management.",
      "Responded to production outages by identifying and resolving network vulnerabilities.",
    ],
  },
];

const certifications = [
  { name: "AWS Certified Solutions Architect", issuer: "Amazon Web Services" },
  { name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services" },
  { name: "Certified in Cybersecurity (CC)", issuer: "ISC2" },
  { name: "Red Hat Certified Linux System Administrator", issuer: "Red Hat" },
];

const education = [
  {
    degree: "CertHE Business Skills for the Workplace",
    school: "University of Wales Trinity Saint David",
    period: "Feb 2025 — Feb 2026",
  },
  {
    degree: "Level 3 Certificate in Networking & Cybersecurity",
    school: "B2W",
    period: "Jan 2023 — Feb 2024",
  },
  {
    degree: "Degree in Process Industrial & Electro-Mechanical Engineering",
    school: "University of Louis Pasteur",
    period: "Sep 2003 — Oct 2005",
  },
];

const skillGroups = [
  {
    title: "Cloud & Infrastructure",
    items: ["AWS (EC2, S3, CloudFront, IAM, Config, GuardDuty, Security Hub)", "Azure", "Terraform", "Linux (Ubuntu, CentOS)"],
  },
  {
    title: "DevOps & Automation",
    items: ["GitHub Actions", "Jenkins", "Docker", "Kubernetes", "Helm", "Maven", "PowerShell", "Bash", "Ansible"],
  },
  {
    title: "Security",
    items: ["Microsoft Sentinel (SIEM)", "Microsoft Defender for Endpoint (EDR)", "Tenable.io", "KQL", "MITRE ATT&CK", "CIS Benchmarks", "ISO 27001 / 27002", "GDPR", "Zero Trust", "IAM", "IDS/IPS", "Wireshark"],
  },
  {
    title: "Platform & Delivery",
    items: ["Next.js", "TypeScript", "CI/CD pipeline design", "Route 53", "CloudFront OAC", "ACM", "IAM OIDC"],
  },
];

const metrics = [
  { value: "100%", label: "Reduction in critical vulnerabilities", context: "Hagital · Tenable.io" },
  { value: "30%", label: "Cloud cost reduction", context: "Darktrace · AWS workload optimisation" },
  { value: "50%", label: "Infrastructure overhead reduction", context: "Darktrace · AWS solution design" },
  { value: "40%", label: "Dev efficiency improvement", context: "Revolent · CI/CD pipeline design" },
];

export default function ResumePage() {
  return (
    <main style={{ padding: "56px 32px", maxWidth: "860px", margin: "0 auto" }}>
      <style>{`
        .section-label { font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; color: var(--accent); display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
        .section-label::after { content: ''; flex: 1; height: 1px; background: var(--border); max-width: 200px; }
        .resume-section { margin-bottom: 56px; }
        .job-card { padding: 24px 0; border-bottom: 1px solid var(--border); }
        .job-card:last-child { border-bottom: none; }
        .job-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px; flex-wrap: wrap; gap: 8px; }
        .job-title { font-family: Syne, sans-serif; font-size: 16px; font-weight: 700; color: #fff; }
        .job-meta { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; flex-wrap: wrap; }
        .job-company { font-size: 13px; color: var(--accent); font-weight: 500; }
        .job-period { font-size: 11px; color: var(--dim); font-family: DM Mono, monospace; }
        .job-type { font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase; padding: 2px 8px; border: 1px solid var(--border); color: var(--muted); border-color: var(--border2); border-radius: 1px; }
        .job-bullets { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 8px; }
        .job-bullet { display: flex; gap: 12px; font-size: 13px; color: var(--muted); line-height: 1.7; }
        .job-bullet::before { content: '—'; color: var(--accent); flex-shrink: 0; margin-top: 1px; }
        .cert-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--border); }
        .cert-card { background: var(--card); padding: 16px 20px; }
        .cert-name { font-size: 13px; font-weight: 500; color: #fff; margin-bottom: 4px; }
        .cert-issuer { font-size: 11px; color: var(--muted); letter-spacing: 0.04em; }
        .edu-item { display: flex; justify-content: space-between; align-items: flex-start; padding: 16px 0; border-bottom: 1px solid var(--border); gap: 16px; flex-wrap: wrap; }
        .edu-item:last-child { border-bottom: none; }
        .edu-degree { font-size: 14px; font-weight: 500; color: var(--text); margin-bottom: 4px; }
        .edu-school { font-size: 12px; color: var(--accent); }
        .edu-period { font-size: 11px; color: var(--muted); font-family: DM Mono, monospace; white-space: nowrap; }
        .skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--border); }
        .skill-group { background: var(--card); padding: 20px 22px; }
        .skill-title { font-family: Syne, sans-serif; font-size: 12px; font-weight: 600; color: #fff; margin-bottom: 12px; letter-spacing: 0.02em; }
        .skill-tags { display: flex; flex-wrap: wrap; gap: 6px; }
        .skill-tag { font-size: 10px; letter-spacing: 0.04em; padding: 3px 10px; border: 1px solid var(--border); color: var(--muted); border-color: var(--border2); border-radius: 1px; }
        .metric-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--border); margin-bottom: 48px; }
        .metric-card { background: var(--card); padding: 20px 18px; }
        .metric-value { font-family: Syne, sans-serif; font-size: 28px; font-weight: 800; color: var(--accent); line-height: 1; margin-bottom: 6px; }
        .metric-label { font-size: 11px; color: var(--text); margin-bottom: 4px; line-height: 1.4; }
        .metric-context { font-size: 10px; color: var(--dim); font-family: DM Mono, monospace; }
        .download-btn { display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; background: var(--accent); color: #04060f; font-family: DM Mono, monospace; font-size: 12px; font-weight: 500; letter-spacing: 0.06em; border-radius: 2px; text-decoration: none; transition: opacity 0.2s; }
        .download-btn:hover { opacity: 0.85; }
        .outline-btn { display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; background: transparent; color: var(--text); border: 1px solid var(--border2); font-family: DM Mono, monospace; font-size: 12px; letter-spacing: 0.06em; border-radius: 2px; text-decoration: none; }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: "48px" }}>
        <div className="section-label" style={{ marginBottom: "20px" }}>CV / Résumé</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "20px" }}>
          <div>
            <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "8px" }}>
              Huguette Dora Edjangue
            </h1>
            <div style={{ fontFamily: "DM Mono, monospace", fontSize: "14px", color: "var(--accent)", marginBottom: "16px" }}>
              Platform & DevOps Engineer · Cloud Security Specialist
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
              {[
                { label: "edjanguedora@gmail.com", href: "mailto:edjanguedora@gmail.com" },
                { label: "linkedin.com/in/hugdora", href: "https://linkedin.com/in/hugdora" },
                { label: "github.com/hugdora", href: "https://github.com/hugdora" },
                { label: "doraejangue.com", href: "https://doraejangue.com" },
              ].map(({ label, href }) => (
                <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                  style={{ fontSize: "12px", color: "var(--muted)", textDecoration: "none", fontFamily: "DM Mono, monospace" }}>
                  {label}
                </a>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <a href="/resume/Huguette-Dora-Edjangue-CV.pdf" download className="download-btn">
              Download PDF ↓
            </a>
            <a href="https://linkedin.com/in/hugdora" target="_blank" rel="noopener noreferrer" className="outline-btn">
              LinkedIn ↗
            </a>
          </div>
        </div>
      </div>

      {/* Profile */}
      <div className="resume-section">
        <div className="section-label">Profile</div>
        <div style={{ background: "var(--card)", border: "1px solid var(--border)", padding: "24px 28px", position: "relative", overflow: "hidden" }}>
          <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, var(--accent), transparent)" }} />
          <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: 1.85, maxWidth: "680px" }}>
            Platform & DevOps Engineer with 5+ years of experience designing and implementing cloud infrastructure, CI/CD pipelines, and security controls across AWS environments. Proven track record of embedding security into engineering workflows — achieving a 100% reduction in critical vulnerabilities, 30% cloud cost reduction, and 40% improvement in development efficiency. Strong foundation in Infrastructure as Code, container orchestration, and cloud-native delivery with hands-on expertise in Terraform, Kubernetes, Docker, GitHub Actions, and AWS.
          </p>
        </div>
      </div>

      {/* Key metrics */}
      <div className="resume-section">
        <div className="section-label">Impact metrics</div>
        <div className="metric-grid">
          {metrics.map(({ value, label, context }) => (
            <div key={value} className="metric-card">
              <div className="metric-value">{value}</div>
              <div className="metric-label">{label}</div>
              <div className="metric-context">{context}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div className="resume-section">
        <div className="section-label">Experience</div>
        <div>
          {experience.map((job) => (
            <div key={job.title + job.company} className="job-card">
              <div className="job-header">
                <div className="job-title">{job.title}</div>
                <span className="job-type">{job.type}</span>
              </div>
              <div className="job-meta">
                <span className="job-company">{job.company}</span>
                <span style={{ color: "var(--border2)" }}>·</span>
                <span className="job-period">{job.period}</span>
              </div>
              <ul className="job-bullets">
                {job.bullets.map((b, i) => (
                  <li key={i} className="job-bullet">{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div className="resume-section">
        <div className="section-label">Certifications</div>
        <div className="cert-grid">
          {certifications.map(({ name, issuer }) => (
            <div key={name} className="cert-card">
              <div className="cert-name">{name}</div>
              <div className="cert-issuer">{issuer}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="resume-section">
        <div className="section-label">Technical skills</div>
        <div className="skills-grid">
          {skillGroups.map((group) => (
            <div key={group.title} className="skill-group">
              <div className="skill-title">{group.title}</div>
              <div className="skill-tags">
                {group.items.map((item) => (
                  <span key={item} className="skill-tag">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="resume-section">
        <div className="section-label">Education</div>
        <div style={{ background: "var(--card)", border: "1px solid var(--border)", padding: "8px 24px" }}>
          {education.map(({ degree, school, period }) => (
            <div key={degree} className="edu-item">
              <div>
                <div className="edu-degree">{degree}</div>
                <div className="edu-school">{school}</div>
              </div>
              <div className="edu-period">{period}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div className="resume-section">
        <div className="section-label">Languages</div>
        <div style={{ display: "flex", gap: "1px", background: "var(--border)", maxWidth: "320px" }}>
          {[{ lang: "French", level: "Native" }, { lang: "English", level: "Professional" }].map(({ lang, level }) => (
            <div key={lang} style={{ background: "var(--card)", padding: "14px 20px", flex: 1 }}>
              <div style={{ fontSize: "13px", fontWeight: 500, color: "#fff", marginBottom: "3px" }}>{lang}</div>
              <div style={{ fontSize: "11px", color: "var(--dim)" }}>{level}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div style={{ padding: "28px", background: "var(--card)", border: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <div style={{ fontFamily: "Syne, sans-serif", fontSize: "15px", fontWeight: 600, color: "#fff", marginBottom: "6px" }}>
            Available for remote freelance work
          </div>
          <p style={{ fontSize: "12px", color: "var(--muted)", lineHeight: 1.6, maxWidth: "440px" }}>
            Open to Platform Engineer, DevOps Engineer, and Cloud Security Engineer roles. London-based, remote-first.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <a href="mailto:edjanguedora@gmail.com" className="download-btn">
            Get in touch →
          </a>
          <Link href="/projects" className="outline-btn">
            View projects
          </Link>
        </div>
      </div>
    </main>
  );
}
