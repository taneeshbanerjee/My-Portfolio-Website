import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const study = getCaseStudy(params.slug);
    if (!study) throw notFound();
    return { study };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Case study unavailable" }, { name: "robots", content: "noindex" }] };
    }
    const { study } = loaderData;
    const url = `https://taneeshbanerjee.lovable.app/work/${params.slug}`;
    return {
      meta: [
        { title: `${study.title} — Case Study | Taneesh Banerjee` },
        { name: "description", content: study.summary.slice(0, 155) },
        { property: "og:title", content: `${study.title} — Case Study` },
        { property: "og:description", content: study.summary.slice(0, 155) },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: CaseStudyPage,
});

function CaseStudyPage() {
  const { study } = Route.useLoaderData();
  const others = caseStudies.filter((c) => c.slug !== study.slug);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="ambient absolute -left-40 top-10 h-[30rem] w-[30rem] rounded-full bg-primary/10 blur-[120px]" />
        <div className="ambient absolute -right-48 top-[36rem] h-[34rem] w-[34rem] rounded-full bg-accent/10 blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 pb-24 pt-12 md:pt-20">
        <Link to="/" hash="projects" className="inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> Back to work
        </Link>

        <p className="mt-10 font-mono text-xs uppercase tracking-[.28em] text-primary">{study.category}</p>
        <h1 className="mt-4 font-display text-5xl font-semibold leading-[1.02] md:text-7xl">{study.title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{study.tagline}</p>

        <div className="glow-border mt-12 overflow-hidden rounded-2xl border border-primary/30 bg-card">
          <img src={study.cover} alt={`${study.title} cover visual`} className="aspect-[16/9] w-full object-cover" />
        </div>

        <dl className="mt-10 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3">
          {[["Year", study.year], ["Role", study.role], ["Stack", study.stack.join(", ")]].map(([k, v]) => (
            <div key={k} className="bg-background p-5">
              <dt className="font-mono text-[10px] uppercase tracking-[.2em] text-muted-foreground">{k}</dt>
              <dd className="mt-2 text-sm leading-6">{v}</dd>
            </div>
          ))}
        </dl>

        <section className="mt-16">
          <h2 className="font-display text-3xl font-semibold md:text-4xl">The problem</h2>
          <ul className="mt-6 space-y-4">
            {study.problem.map((p) => (
              <li key={p} className="flex gap-3 text-base leading-8 text-muted-foreground">
                <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-primary shadow-[0_0_10px_var(--color-primary)]" />
                {p}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-3xl font-semibold md:text-4xl">The approach</h2>
          <div className="mt-6 divide-y divide-border border-y border-border">
            {study.approach.map((a) => (
              <article key={a.step} className="grid gap-3 py-7 transition-colors hover:bg-card/40 md:grid-cols-[70px_1fr_1.2fr] md:px-4">
                <span className="font-mono text-xs text-primary">{a.step}</span>
                <h3 className="font-display text-xl font-semibold">{a.title}</h3>
                <p className="leading-8 text-muted-foreground">{a.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-3xl font-semibold md:text-4xl">Screens</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {study.screenshots.map((s) => (
              <figure key={s.src + s.caption} className="overflow-hidden rounded-lg border border-border bg-card">
                <img src={s.src} alt={s.caption} loading="lazy" className="aspect-[16/10] w-full object-cover" />
                <figcaption className="p-4 text-xs leading-5 text-muted-foreground">{s.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-3xl font-semibold md:text-4xl">Outcomes</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {study.outcomes.map((o) => (
              <div key={o.label} className="glass-panel rounded-lg border border-border p-6">
                <p className="font-display text-4xl font-semibold text-gradient">{o.metric}</p>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{o.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-lg border border-primary/30 bg-card/50 p-8">
          <h2 className="flex items-center gap-3 font-display text-2xl font-semibold"><CheckCircle2 className="h-5 w-5 text-primary" /> What I took from it</h2>
          <p className="mt-4 text-lg leading-9 text-muted-foreground">{study.reflection}</p>
        </section>

        <section className="mt-20">
          <h2 className="font-display text-2xl font-semibold">More work</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {others.map((c) => (
              <Link key={c.slug} to="/work/$slug" params={{ slug: c.slug }} className="group rounded-lg border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary">
                <p className="font-mono text-[10px] tracking-[.25em] text-primary">{c.category.toUpperCase()}</p>
                <h3 className="mt-3 font-display text-xl font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{c.tagline}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary">Read <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" /></span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
