export default function CloudPlatformPage() {
  return (
    <div className="min-h-screen bg-[#020817] text-white">
      <div className="mx-auto max-w-5xl px-6 py-20">
        
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-slate-400">
          Project
        </p>

        <h1 className="mb-6 text-4xl font-semibold">
          Cloud-Native Static Platform on AWS
        </h1>

        <p className="mb-10 text-lg text-slate-300">
          Designed and deployed a secure static delivery platform using AWS S3,
          CloudFront, Route 53, ACM, and Terraform.
        </p>

        <section className="mb-10">
          <h2 className="mb-3 text-2xl font-semibold">Overview</h2>
          <p className="text-slate-300">
            Production-ready static web platform with private S3 origin,
            CloudFront edge delivery, HTTPS, and custom domain routing.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-2xl font-semibold">Architecture</h2>
          <p className="text-slate-300">
            User → Route 53 → CloudFront → S3 private bucket via Origin Access Control.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold">Tech Stack</h2>
          <ul className="list-disc pl-6 text-slate-300">
            <li>AWS S3</li>
            <li>AWS CloudFront</li>
            <li>AWS Route 53</li>
            <li>AWS Certificate Manager</li>
            <li>Terraform</li>
          </ul>
        </section>

      </div>
    </div>
  );
}