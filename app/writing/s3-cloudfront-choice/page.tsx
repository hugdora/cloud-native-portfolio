import Link from "next/link";

export default function S3CloudFrontArticle() {
  return (
    <main style={{ padding: "56px 32px", maxWidth: "720px" }}>
      <style>{`
        .back-link { color: var(--dim); text-decoration: none; font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; transition: color 0.2s; }
        .back-link:hover { color: var(--accent); }
        .article-body h2 { font-family: Syne, sans-serif; font-size: 18px; font-weight: 700; color: #fff; margin: 40px 0 14px; letter-spacing: -0.01em; }
        .article-body p { font-size: 14px; color: var(--muted); line-height: 1.85; margin-bottom: 18px; }
        .article-body strong { color: var(--text); font-weight: 500; }
        .callout { background: var(--card); border: 1px solid var(--border); border-left: 2px solid var(--accent); padding: 16px 20px; margin: 24px 0; font-size: 13px; color: var(--muted); line-height: 1.75; }
        .callout strong { color: var(--accent); display: block; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 6px; }
        .code-block { background: var(--card); border: 1px solid var(--border); padding: 16px 20px; font-family: DM Mono, monospace; font-size: 12px; color: var(--muted); line-height: 1.8; margin: 20px 0; overflow-x: auto; white-space: pre; }
        .tag { font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase; padding: 3px 10px; border: 1px solid var(--border); color: var(--dim); border-radius: 1px; margin-right: 6px; }
        .divider { height: 1px; background: var(--border); margin: 48px 0; }
      `}</style>

      <div style={{ marginBottom: "40px" }}>
        <Link href="/writing" className="back-link">← Writing</Link>
      </div>

      {/* Header */}
      <div style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "16px" }}>
        01 / Architecture
      </div>
      <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: "20px" }}>
        Why I used S3 + CloudFront over traditional hosting
      </h1>
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "48px" }}>
        <span style={{ fontSize: "12px", color: "var(--dim)" }}>5 min read</span>
        <span style={{ width: "1px", height: "14px", background: "var(--border)" }} />
        {["AWS", "CloudFront", "S3", "Architecture"].map(t => <span key={t} className="tag">{t}</span>)}
      </div>

      <div className="article-body">
        <p>
          When I started building this portfolio, the obvious choice was to spin up a server — a small EC2 instance, maybe a Lightsail VPS, something running nginx. It is the path most people take because it is familiar. You deploy a file, nginx serves it, done.
        </p>
        <p>
          I chose not to do that. Here is why.
        </p>

        <h2>The problem with running a server for a static site</h2>
        <p>
          A static website — one that consists entirely of HTML, CSS, JavaScript, and assets — does not need a server. It needs storage and delivery. A web server adds a layer between those two things that solves a problem you do not have.
        </p>
        <p>
          More specifically, running a server for a static site means you are now responsible for: keeping the operating system patched, managing the process that serves files, handling SSL certificate renewal, scaling when traffic spikes, and paying for compute time even when no one is visiting. None of those problems are interesting. None of them make the site faster or more reliable. They are just overhead.
        </p>

        <div className="callout">
          <strong>The core insight</strong>
          A static site has no dynamic logic. There is nothing to compute. The correct infrastructure is one that stores files and delivers them — nothing more.
        </div>

        <h2>Why S3</h2>
        <p>
          S3 is object storage. It stores files and returns them on request. That is exactly what a static site needs. It is also highly durable (eleven nines), globally available, and essentially free at portfolio scale — you pay fractions of a cent per GB per month and fractions of a cent per request.
        </p>
        <p>
          Critically, I keep the S3 bucket <strong>completely private</strong>. Public S3 buckets are a common pattern for static hosting, but they expose the origin URL directly. Anyone can hit the bucket endpoint, bypass CloudFront, skip your cache, and access objects without going through any of your security controls. Private bucket, CloudFront in front, OAC to authenticate — that is the production pattern.
        </p>

        <div className="code-block">{`# What the bucket policy looks like
{
  "Effect": "Allow",
  "Principal": {
    "Service": "cloudfront.amazonaws.com"
  },
  "Action": "s3:GetObject",
  "Resource": "arn:aws:s3:::your-bucket/*",
  "Condition": {
    "StringEquals": {
      "AWS:SourceArn": "arn:aws:cloudfront::ACCOUNT:distribution/ID"
    }
  }
}`}</div>

        <p>
          Only the specific CloudFront distribution can read from the bucket. Not the public internet. Not other AWS accounts. Not even other distributions in the same account.
        </p>

        <h2>Why CloudFront</h2>
        <p>
          CloudFront is a Content Delivery Network. It has edge locations in over 400 cities worldwide. When someone in Tokyo visits your site, they do not wait for a round trip to your S3 bucket in eu-west-2 — they get the cached response from the Tokyo edge location in milliseconds.
        </p>
        <p>
          CloudFront also handles HTTPS termination via ACM certificates, enforces redirect-to-HTTPS on all viewer connections, and gives you a place to attach CloudFront Functions for URL rewriting without ever touching the origin.
        </p>
        <p>
          The free tier covers 1TB of data transfer and 10 million HTTP requests per month. For a portfolio site, the bill is effectively zero.
        </p>

        <h2>The one problem I did not expect</h2>
        <p>
          Next.js static export generates files like <strong>/projects/index.html</strong>. When a user navigates directly to <strong>/projects/</strong>, CloudFront requests that path from S3. S3 looks for an object called <strong>projects/</strong> — which does not exist — and returns 403 AccessDenied.
        </p>
        <p>
          The fix is a CloudFront Function that runs on every viewer request and rewrites the URL before it reaches S3:
        </p>

        <div className="code-block">{`function handler(event) {
  var request = event.request;
  var uri = request.uri;

  if (uri.endsWith("/")) {
    request.uri = uri + "index.html";
  } else if (!uri.includes(".")) {
    request.uri = uri + "/index.html";
  }

  return request;
}`}</div>

        <p>
          This runs at the edge, adds no perceptible latency, and costs a fraction of what Lambda@Edge would. The function must be published before it can be attached to a behaviour — creating it is not enough. That cost me an hour.
        </p>

        <h2>What I would do differently</h2>
        <p>
          Nothing significant. The S3 + CloudFront pattern is the correct one for static delivery. If I were building a site with server-side rendering or API routes, I would use a different approach — but for a static export, this is the right architecture.
        </p>
        <p>
          The one thing I would add next is a WAF rule to rate-limit requests at the CloudFront layer. It is not necessary for a portfolio site, but it is a good habit and costs very little.
        </p>

        <div className="divider" />

        <p style={{ fontSize: "13px", color: "var(--dim)" }}>
          The Terraform that provisions this entire stack — S3, CloudFront, OAC, ACM, Route 53 — is in the{" "}
          <a href="https://github.com/hugdora/cloud-native-portfolio" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)", textDecoration: "none" }}>repository</a>.
          The full case study is on the{" "}
          <Link href="/projects/cloud-platform" style={{ color: "var(--accent)", textDecoration: "none" }}>Cloud Platform project page</Link>.
        </p>
      </div>
    </main>
  );
}
