import Link from "next/link";

export default function GitHubOIDCArticle() {
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
        .code-block { background: var(--card); border: 1px solid var(--border); padding: 16px 20px; font-family: DM Mono, monospace; font-size: 12px; color: var(--muted); line-height: 1.8; margin: 20px 0; overflow-x: auto; white-space: pre; }
        .code-hl { color: var(--accent); }
        .code-comment { color: var(--dim); }
        .steps { display: flex; flex-direction: column; gap: 1px; background: var(--border); margin: 24px 0; }
        .step { background: var(--card); padding: 16px 20px; display: flex; gap: 16px; }
        .step-num { font-family: Syne, sans-serif; font-size: 13px; font-weight: 700; color: var(--accent); flex-shrink: 0; min-width: 24px; }
        .step-content { font-size: 13px; color: var(--muted); line-height: 1.7; }
        .step-title { color: var(--text); font-weight: 500; display: block; margin-bottom: 4px; }
        .tag { font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase; padding: 3px 10px; border: 1px solid var(--border); color: var(--dim); border-radius: 1px; margin-right: 6px; }
        .divider { height: 1px; background: var(--border); margin: 48px 0; }
      `}</style>

      <div style={{ marginBottom: "40px" }}>
        <Link href="/writing" className="back-link">← Writing</Link>
      </div>

      <div style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "16px" }}>
        03 / Security
      </div>
      <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: "20px" }}>
        Using GitHub OIDC with AWS for keyless deployment security
      </h1>
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "48px" }}>
        <span style={{ fontSize: "12px", color: "var(--dim)" }}>7 min read</span>
        <span style={{ width: "1px", height: "14px", background: "var(--border)" }} />
        {["GitHub Actions", "AWS", "Security", "IAM"].map(t => <span key={t} className="tag">{t}</span>)}
      </div>

      <div className="article-body">
        <p>
          The standard way most teams configure GitHub Actions to deploy to AWS is to create an IAM user, generate an access key, and paste it into GitHub Secrets as <strong>AWS_ACCESS_KEY_ID</strong> and <strong>AWS_SECRET_ACCESS_KEY</strong>. It works. It is also a security liability that has caused real incidents at real companies.
        </p>
        <p>
          OIDC eliminates those credentials entirely. Here is how it works and how to set it up.
        </p>

        <h2>What is wrong with long-lived access keys</h2>
        <p>
          Long-lived AWS access keys have several properties that make them risky in CI/CD pipelines. They do not expire — once created, they are valid until explicitly rotated or deleted. They are stored as static secrets, which means they exist as plaintext values in GitHub's secrets store, in your shell history if you ever paste them, and potentially in debug logs if a workflow step accidentally prints environment variables.
        </p>
        <p>
          They also have broad scope by default. The IAM user that owns the key may have more permissions than any single workflow needs — because it was created once and shared across multiple use cases.
        </p>

        <div className="callout warning">
          <strong>The real risk</strong>
          A leaked AWS access key gives an attacker persistent access to your AWS account until someone notices and rotates it. With OIDC, there is nothing to leak — no key exists.
        </div>

        <h2>How OIDC works</h2>
        <p>
          OpenID Connect is a standard for identity federation. Instead of giving GitHub a credential to use, you configure AWS to trust GitHub's identity provider. When a workflow runs, GitHub generates a short-lived OIDC token — a signed JWT that says "this is a workflow in repository X, on branch Y, triggered by event Z." GitHub exchanges that token with AWS for temporary credentials scoped to a specific IAM role.
        </p>
        <p>
          Those temporary credentials expire in 15 minutes to 1 hour. There is no static secret. Nothing to rotate. Nothing to leak. If an attacker somehow intercepts a token, it is already expired by the time they could use it.
        </p>

        <div className="code-block">
{`# The OIDC flow — simplified

1. Workflow triggers
2. GitHub generates short-lived OIDC token (JWT)
   └─ contains: repo, branch, event, sha
3. GitHub calls AWS STS:AssumeRoleWithWebIdentity
   └─ presents the OIDC token
4. AWS validates token against GitHub's OIDC provider
   └─ checks trust policy conditions
5. AWS returns temporary credentials (15min–1hr)
6. Workflow uses credentials for S3 sync + CF invalidation
7. Credentials expire — nothing to clean up`}
        </div>

        <h2>Setting it up — step by step</h2>
        <div className="steps">
          <div className="step">
            <span className="step-num">01</span>
            <div className="step-content">
              <span className="step-title">Create the OIDC provider in AWS</span>
              In IAM → Identity providers, add a new OpenID Connect provider. The provider URL is <strong>https://token.actions.githubusercontent.com</strong>. The audience is <strong>sts.amazonaws.com</strong>. This tells AWS to trust tokens issued by GitHub.
            </div>
          </div>
          <div className="step">
            <span className="step-num">02</span>
            <div className="step-content">
              <span className="step-title">Create an IAM role with a trust policy</span>
              The trust policy defines which GitHub workflows can assume this role. You must be specific — too permissive and any GitHub repo can assume your role.
            </div>
          </div>
          <div className="step">
            <span className="step-num">03</span>
            <div className="step-content">
              <span className="step-title">Attach a least-privilege permission policy</span>
              The role should only have the permissions the workflow actually needs: s3:PutObject, s3:DeleteObject, s3:ListBucket, and cloudfront:CreateInvalidation. Nothing more.
            </div>
          </div>
          <div className="step">
            <span className="step-num">04</span>
            <div className="step-content">
              <span className="step-title">Configure the workflow to use OIDC</span>
              Add the id-token permission and use aws-actions/configure-aws-credentials with role-to-assume instead of access keys.
            </div>
          </div>
        </div>

        <h2>The trust policy — get this right</h2>
        <p>
          The trust policy is where most mistakes happen. Here is what a correct one looks like:
        </p>

        <div className="code-block">
{`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::ACCOUNT:oidc-provider/
          token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud":
            "sts.amazonaws.com",
          `}<span className="code-hl">{`"token.actions.githubusercontent.com:sub":
            "repo:hugdora/cloud-native-portfolio:ref:refs/heads/main"`}</span>{`
        }
      }
    }
  ]
}`}
        </div>

        <p>
          The highlighted condition is critical. It locks the role to a specific repository and branch. Without it, any public GitHub repository could assume your role. The <strong>sub</strong> claim in the OIDC token contains the repo name and ref — always validate both.
        </p>

        <h2>The workflow configuration</h2>

        <div className="code-block">
{`name: Deploy

on:
  push:
    branches: [main]

permissions:
  id-token: write   `}<span className="code-comment"># Required for OIDC</span>{`
  contents: read

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          `}<span className="code-hl">role-to-assume</span>{`: arn:aws:iam::ACCOUNT:role/github-deploy-role
          aws-region: eu-west-2
          `}<span className="code-comment"># No AWS_ACCESS_KEY_ID or AWS_SECRET_ACCESS_KEY</span>{`

      - name: Deploy to S3
        run: aws s3 sync out/ s3://your-bucket --delete

      - name: Invalidate CloudFront
        run: |
          aws cloudfront create-invalidation \
            --distribution-id ${"{{"} secrets.CF_DIST_ID {"}}"}  \
            --paths "/*"`}
        </div>

        <div className="callout">
          <strong>Key detail</strong>
          The id-token: write permission must be explicitly declared in the workflow. Without it, GitHub does not generate an OIDC token for the run, and the credential exchange fails with a cryptic error.
        </div>

        <h2>What I learned the hard way</h2>
        <p>
          The trust policy condition must exactly match the sub claim that GitHub sends. If your condition says <strong>refs/heads/main</strong> but the workflow runs on a pull request, the sub claim will be different and the assume-role call will fail. Test on the exact branch and trigger type you intend to use.
        </p>
        <p>
          Also: you still need to store the CloudFront distribution ID in GitHub Secrets — but that is not a credential. It is a resource identifier. Even if it leaks, an attacker cannot do anything with a distribution ID alone. The IAM role controls what actions are permitted.
        </p>

        <div className="divider" />

        <p style={{ fontSize: "13px", color: "var(--dim)" }}>
          The Terraform that provisions the IAM OIDC provider and role is in the{" "}
          <a href="https://github.com/hugdora/cloud-native-portfolio" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)", textDecoration: "none" }}>repository</a>.
          The full pipeline implementation is on the{" "}
          <Link href="/projects/cicd-pipeline" style={{ color: "var(--accent)", textDecoration: "none" }}>CI/CD Pipeline project page</Link>.
        </p>
      </div>
    </main>
  );
}
