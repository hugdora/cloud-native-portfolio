# cloud-native-portfolio

Personal portfolio for **Huguette Dora Edjangue** — Platform & DevOps Engineer.

Live at [doraejangue.com](https://doraejangue.com)

---

## What this is

This repository is both the **source code for the portfolio website** and a **demonstration of the infrastructure that delivers it**. The site itself is a project. The infrastructure that runs it is also a project. Both are documented here.

---

## Architecture

```
User → Route 53 → CloudFront → S3 (private via OAC)
```

| Layer | Technology | Notes |
|---|---|---|
| Frontend | Next.js 16 + TypeScript | Static export (`output: "export"`) |
| CDN | AWS CloudFront | Edge delivery, HTTPS termination |
| Origin | AWS S3 | Private bucket, no public access |
| Origin access | CloudFront OAC | SigV4-signed requests only |
| DNS | AWS Route 53 | A alias → CloudFront, www redirect |
| TLS | AWS Certificate Manager | Issued in us-east-1 (CF requirement) |
| IaC | Terraform | All infrastructure version-controlled |
| CI/CD | GitHub Actions | Two deploy paths, IAM OIDC auth |

### Two deployment tracks

**Track 1 — AWS Static (primary)**
```
GitHub Actions → next build → S3 sync → CloudFront invalidation
```

**Track 2 — Kubernetes (demonstration)**
```
GitHub Actions → docker build → registry → kubectl apply / helm upgrade
```

---

## Repository structure

```
cloud-native-portfolio/
├── app/                        # Next.js App Router pages
│   ├── page.tsx                # Homepage
│   ├── projects/
│   │   ├── page.tsx            # Projects listing
│   │   ├── cloud-platform/     # Project 1 case study
│   │   ├── kubernetes-platform/# Project 2 case study
│   │   └── cicd-pipeline/      # Project 3 case study
│   ├── architecture/           # Architecture overview page
│   ├── writing/                # Technical writing
│   ├── resume/                 # Resume page
│   └── contact/                # Contact page
├── components/
│   ├── layout/                 # Navbar, Footer
│   └── sections/               # Hero, Projects, Capabilities, CTA...
├── content/
│   └── projects/               # Project markdown documentation
├── infra/
│   ├── modules/
│   │   └── s3_site/            # Terraform module: S3 + CloudFront + OAC
│   └── envs/
│       ├── dev/                # Dev environment config
│       └── prod/               # Prod environment config
├── lib/
│   └── site.ts                 # Central config (name, links, stack)
└── public/                     # Static assets
```

---

## Projects documented

### 01 — Cloud-Native Static Platform on AWS
Private S3 bucket + CloudFront CDN + Origin Access Control + ACM HTTPS + Route 53 DNS.
Fully provisioned with Terraform. Deployed via GitHub Actions with IAM OIDC (no stored keys).

→ [Live case study](https://doraejangue.com/projects/cloud-platform)

### 02 — Kubernetes Delivery Platform
Containerised Next.js delivery with Deployments, Services, Ingress NGINX, liveness/readiness
probes, and Helm packaging. Runs as a parallel delivery track alongside the static path.

→ [Live case study](https://doraejangue.com/projects/kubernetes-platform)

### 03 — Dual-Track CI/CD Pipeline
GitHub Actions pipeline: lint → type-check → test → build → security scan → deploy (parallel).
Two independent deploy jobs: S3/CloudFront and Kubernetes. IAM OIDC for keyless AWS auth.

→ [Live case study](https://doraejangue.com/projects/cicd-pipeline)

---

## Infrastructure

Terraform manages the full AWS stack. See [`infra/README.md`](infra/README.md) for details.

```bash
cd infra/envs/dev
terraform init
terraform plan -var-file="terraform.tfvars"
terraform apply
```

**What Terraform provisions:**
- S3 bucket (private, public access fully blocked)
- CloudFront distribution with OAC
- ACM certificate (us-east-1)
- Route 53 A alias record
- IAM OIDC provider for GitHub Actions
- S3 bucket policy (CloudFront-only access)

---

## Local development

```bash
npm install
npm run dev        # localhost:3000
npm run build      # production build + static export → out/
```

Requires Node.js 18+.

---

## Deploy

### Static path (primary)
```bash
npm run build
aws s3 sync out/ s3://YOUR-BUCKET --delete
aws cloudfront create-invalidation --distribution-id YOUR-DIST-ID --paths "/*"
```

### Via GitHub Actions (automated)
Push to `main` → CI runs → both deploy paths fire in parallel.
AWS authentication uses IAM OIDC — no access keys stored in GitHub Secrets.

---

## Tech stack

`Next.js` `TypeScript` `AWS S3` `CloudFront` `Route 53` `ACM` `Terraform` `Docker` `Kubernetes` `Helm` `GitHub Actions` `IAM OIDC`

---

## Security notes

- S3 bucket has **Block Public Access** fully enabled — no direct S3 access possible
- CloudFront uses **Origin Access Control (OAC)** with SigV4 signing — not legacy OAI
- GitHub Actions uses **IAM OIDC** — zero long-lived AWS credentials stored anywhere
- Terraform state is **not committed** to this repo (see `.gitignore`)

---

## Contact

**Huguette Dora Edjangue**
Platform & DevOps Engineer — London / Remote

[doraejangue.com](https://doraejangue.com) · [GitHub](https://github.com/hugdora) · [LinkedIn](https://linkedin.com/in/hugdora)
