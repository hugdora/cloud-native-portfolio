export default function CloudPlatformPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16 text-white">
      <p className="mb-4 text-sm uppercase tracking-[0.3em] text-slate-400">
        Project
      </p>

      <h1 className="mb-6 text-4xl font-semibold">
        Cloud-Native Static Platform on AWS
      </h1>

      <p className="mb-8 text-lg text-slate-300">
        Designed and deployed a secure static delivery platform using AWS S3,
        CloudFront, Route 53, ACM, and Terraform.
      </p>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">Overview</h2>
        <p className="text-slate-300">
          This project delivers a production-ready static web platform with a
          private S3 origin, CloudFront edge delivery, HTTPS, and custom domain
          routing.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">Architecture</h2>
        <p className="text-slate-300">
          User → Route 53 → CloudFront → S3 private bucket via Origin Access
          Control.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">Tech Stack</h2>
        <ul className="list-disc space-y-2 pl-6 text-slate-300">
          <li>AWS S3</li>
          <li>AWS CloudFront</li>
          <li>AWS Route 53</li>
          <li>AWS Certificate Manager</li>
          <li>Terraform</li>
          <li>Next.js</li>
        </ul>
      </section>
    </main>
  );
}