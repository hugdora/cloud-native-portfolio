import Link from "next/link";

export default function Hero() {
  return (
    <section className="py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-4xl space-y-8">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
            PLATFORM & DEVOPS ENGINEER
          </p>

          <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl leading-tight">
            Designing secure, automated, and observable delivery platforms.
          </h1>

          <p className="max-w-3xl text-lg leading-8 text-slate-300">
            I design and operate cloud infrastructure, delivery pipelines, and container
            platforms using AWS, Terraform, GitHub Actions, Jenkins, Docker, and Kubernetes.
          </p>
          <p className="text-sm text-slate-500">
            Focused on production-ready infrastructure, automation, and platform reliability.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/projects"
              className="rounded-full bg-white px-6 py-3 text-sm font-medium text-slate-950 hover:bg-slate-200 transition"
            >
              View Projects
            </Link>
            <Link
              href="/architecture"
              className="rounded-full border border-slate-700 px-6 py-3 text-sm font-medium text-white hover:border-slate-500 transition"
            >
              View Architecture
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}