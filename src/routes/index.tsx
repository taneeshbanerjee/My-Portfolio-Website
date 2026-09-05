import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight, Bot, Clapperboard, Code2, FileText, Menu, PenTool, Play, WandSparkles, X } from "lucide-react";
import { caseStudies } from "@/lib/case-studies";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Taneesh Banerjee — AI Engineer, Creative Technologist & Creator" },
      { name: "description", content: "Explore Taneesh Banerjee's work across AI engineering, modern websites, content creation, video editing, writing and digital storytelling." },
      { property: "og:title", content: "Taneesh Banerjee — AI Engineer & Creative Technologist" },
      { property: "og:description", content: "Building with AI. Creating with technology. Telling stories through content." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://taneeshbanerjee.lovable.app/" }],
  }),
});

const nav = ["Home", "About", "Skills", "Projects", "Content", "Writing", "Contact"];

const expertise = [
  ["01", "AI Engineering", "Building with generative AI, prompt engineering, automation and intelligent creative workflows.", ["AI-powered apps", "AI automation", "Generative AI", "Content pipelines"]],
  ["02", "Web Development", "Crafting responsive, interactive websites and modern interfaces where technology serves the idea.", ["React", "Responsive UI", "Landing pages", "AI web experiences"]],
  ["03", "Content Creation", "Developing technology and story-led content for YouTube, short-form formats and digital platforms.", ["YouTube", "Content ideation", "Scripts", "Story-led content"]],
  ["04", "Video Editing", "Shaping raw footage with rhythm, sound and visual intention to make every cut tell the story.", ["Pacing", "Sound design", "Visual effects", "Cinematic edits"]],
  ["05", "Writing & Storytelling", "Creating suspenseful worlds, character-led fiction, scripts and digital story concepts.", ["Fiction", "Scripts", "Story structure", "Digital publishing"]],
];
const skillGroups = {
  "AI & Technology": ["Artificial Intelligence", "Generative AI", "Prompt Engineering", "AI Automation", "AI-assisted Development", "Creative AI Workflows"],
  Web: ["HTML", "CSS", "JavaScript", "React", "Responsive Web Design", "UI/UX", "Modern Web Development"],
  Creative: ["Video Editing", "Content Creation", "Script Writing", "Storytelling", "Creative Direction"],
  Content: ["YouTube", "Short-form Content", "Technology Content", "Story-based Content"],
  Writing: ["Creative Writing", "Fiction", "Scripts", "Digital Publishing"],
};
const projectIcons: Record<string, typeof Bot> = {
  "ai-content-engine": Bot,
  "portfolio-web-experience": Code2,
  "gandiv-rudrapur-ka-sach": Clapperboard,
};
const projects = caseStudies.map((c) => ({
  slug: c.slug,
  cat: c.category.toUpperCase(),
  title: c.title,
  desc: c.tagline,
  cover: c.cover,
  Icon: projectIcons[c.slug] ?? PenTool,
}));

const process = [["01", "Imagine", "Start with an idea or problem."], ["02", "Explore", "Research and experiment with AI."], ["03", "Build", "Make the concept work."], ["04", "Create", "Shape its visual and narrative form."], ["05", "Refine", "Improve every meaningful detail."], ["06", "Launch", "Make it real and shareable."]];

function SectionTitle({ kicker, title, copy }: { kicker: string; title: string; copy?: string }) {
  return <div className="reveal mb-12 max-w-3xl"><p className="mb-4 font-mono text-xs uppercase tracking-[.28em] text-primary">{kicker}</p><h2 className="font-display text-4xl font-semibold leading-tight md:text-6xl">{title}</h2>{copy && <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">{copy}</p>}</div>;
}

function Index() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Home");
  useEffect(() => {
    const reveals = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("revealed")), { threshold: .12 });
    document.querySelectorAll(".reveal").forEach((el) => reveals.observe(el));
    const sections = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.getAttribute("data-label") || "Home")), { rootMargin: "-35% 0px -55%" });
    document.querySelectorAll("section[data-label]").forEach((el) => sections.observe(el));
    return () => { reveals.disconnect(); sections.disconnect(); };
  }, []);
  return (
    <div className="relative bg-background text-foreground">
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden"><div className="ambient absolute -left-40 top-20 h-[32rem] w-[32rem] rounded-full bg-primary/10 blur-[120px]"/><div className="ambient absolute -right-48 top-[40rem] h-[36rem] w-[36rem] rounded-full bg-accent/10 blur-[140px]"/><div className="absolute inset-0 opacity-[.035] [background-image:radial-gradient(var(--color-foreground)_1px,transparent_1px)] [background-size:32px_32px]"/></div>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4"><nav aria-label="Main navigation" className="glass-panel mx-auto flex h-16 max-w-6xl items-center justify-between rounded-lg border border-border px-5 shadow-2xl"><a href="#home" className="font-display text-xl font-bold">M<span className="text-primary">.</span></a><div className="hidden items-center gap-7 md:flex">{nav.map((item) => <a key={item} href={`#${item.toLowerCase()}`} className={`text-xs transition-colors ${active === item ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>{item}</a>)}</div><button type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)} className="text-foreground md:hidden">{open ? <X/> : <Menu/>}</button></nav>{open && <div className="glass-panel mx-auto mt-2 grid max-w-6xl gap-1 rounded-lg border border-border p-3 md:hidden">{nav.map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)} className="rounded-md px-4 py-3 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground">{item}</a>)}</div>}</header>

      <main className="relative z-10">
        <section id="home" data-label="Home" className="mx-auto grid min-h-[min(900px,100svh)] max-w-7xl items-center gap-14 px-6 pb-16 pt-28 lg:grid-cols-[1.12fr_.88fr] lg:px-10">
          <div className="order-2 lg:order-1"><p className="mb-6 font-mono text-xs uppercase tracking-[.24em] text-primary">AI Engineer • Creative Technologist • Creator</p><h1 className="font-display text-6xl font-semibold leading-[.94] md:text-8xl xl:text-9xl">Building the future with <span className="text-gradient shimmer">AI, code & creativity.</span></h1><p className="mt-7 max-w-xl text-base leading-8 text-muted-foreground md:text-lg">I build intelligent digital experiences, websites and creative content by combining artificial intelligence, technology, storytelling and visual craft.</p><div className="mt-9 flex flex-wrap gap-3"><a href="#projects" className="group inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-1">Explore my work <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1"/></a><a href="#contact" className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-6 py-3.5 text-sm font-bold transition-colors hover:border-primary">Let&apos;s connect <ArrowUpRight className="h-4 w-4"/></a></div></div>
          <div className="order-1 mx-auto w-full max-w-[390px] lg:order-2"><div className="photo-float relative"><div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/40 via-transparent to-accent/40 blur-2xl"/><div className="glow-border relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-primary/40 bg-card p-2"><img src={profileAsset.url} alt="Mickey, AI engineer and creative technologist" className="h-full w-full rounded-[1.35rem] object-cover object-[50%_28%]" fetchPriority="high"/></div><div className="glass-panel absolute -bottom-5 -left-5 rounded-lg border border-border px-4 py-3"><p className="font-mono text-[10px] uppercase tracking-[.2em] text-muted-foreground">Based at the intersection of</p><p className="mt-1 text-sm font-semibold">Technology × Creativity</p></div></div></div>
        </section>

        <section id="about" data-label="About" className="border-y border-border bg-card/30 px-6 py-24 md:py-32"><div className="mx-auto max-w-6xl"><SectionTitle kicker="01 / About me" title="I don't just consume technology. I build with it."/><div className="grid gap-10 md:grid-cols-[.7fr_1.3fr]"><div className="reveal font-display text-2xl leading-relaxed text-primary">Curious by nature.<br/>Technical by practice.<br/>Creative by instinct.</div><div className="reveal space-y-5 text-lg leading-9 text-muted-foreground"><p>I&apos;m Mickey—a multidisciplinary creator exploring what happens when artificial intelligence, thoughtful technology and human imagination work together.</p><p>My interests move fluidly from AI-powered workflows and modern websites to YouTube, video editing, fiction, scripts and digital storytelling. The medium changes; the intention stays the same: turn ideas into experiences people can see, feel and use.</p></div></div></div></section>

        <section className="mx-auto max-w-6xl px-6 py-24 md:py-32"><SectionTitle kicker="02 / Expertise" title="One creator. Multiple mediums." copy="Technology is strongest when it expands what creativity can do."/><div className="divide-y divide-border border-y border-border">{expertise.map(([n,title,desc,tags], i) => <article key={n as string} className="reveal group grid gap-5 py-8 transition-all hover:bg-card/40 md:grid-cols-[70px_1fr_1.1fr] md:px-5"><span className="font-mono text-xs text-primary">{n}</span><h3 className="font-display text-2xl font-semibold group-hover:text-primary">{title as string}</h3><div><p className="leading-7 text-muted-foreground">{desc as string}</p><div className="mt-4 flex flex-wrap gap-2">{(tags as string[]).map(t => <span key={t} className="rounded-full border border-border px-3 py-1 text-[11px] text-muted-foreground">{t}</span>)}</div></div></article>)}</div></section>

        <section id="skills" data-label="Skills" className="border-y border-border bg-card/30 px-6 py-24 md:py-32"><div className="mx-auto max-w-6xl"><SectionTitle kicker="03 / Skills" title="A connected creative toolkit."/><div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2 lg:grid-cols-3">{Object.entries(skillGroups).map(([group, skills]) => <div key={group} className="reveal bg-background p-7"><h3 className="mb-6 font-display text-xl text-primary">{group}</h3><div className="flex flex-wrap gap-2">{skills.map(skill => <span key={skill} className="rounded-md bg-secondary px-3 py-2 text-xs text-secondary-foreground">{skill}</span>)}</div></div>)}</div></div></section>

        <section id="projects" data-label="Projects" className="mx-auto max-w-6xl px-6 py-24 md:py-32"><SectionTitle kicker="04 / Selected work" title="Ideas, made tangible." copy="Editable spaces for real projects across AI, websites, content, video and writing."/><div className="grid gap-5 md:grid-cols-2">{projects.map(([cat,title,desc,Icon], i) => { const I = Icon as typeof Bot; return <article key={title as string} className={`reveal group overflow-hidden rounded-lg border border-border bg-card transition-all duration-500 hover:-translate-y-2 hover:border-primary ${i===0 ? "md:col-span-2" : ""}`}><div className={`relative grid place-items-center overflow-hidden bg-secondary ${i===0 ? "aspect-[2/1] md:aspect-[3/1]" : "aspect-[5/3]"}`}><I className="h-16 w-16 text-primary/60 transition-transform duration-500 group-hover:scale-110"/><div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent opacity-0 transition-opacity group-hover:opacity-100"/></div><div className="p-6"><p className="font-mono text-[10px] tracking-[.25em] text-primary">{cat as string}</p><div className="mt-3 flex items-start justify-between gap-4"><div><h3 className="font-display text-2xl font-semibold">{title as string}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{desc as string}</p></div><ArrowUpRight className="mt-1 h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"/></div><span className="mt-5 inline-block text-xs font-semibold">View project</span></div></article>})}</div></section>

        <section id="content" data-label="Content" className="overflow-hidden border-y border-border bg-card/30 px-6 py-24 md:py-32"><div className="mx-auto max-w-6xl"><SectionTitle kicker="05 / Content & film" title="Stories engineered for attention."/><div className="grid gap-8 lg:grid-cols-[1.15fr_.85fr]"><div className="reveal relative min-h-[430px] overflow-hidden rounded-lg border border-border bg-secondary p-8 md:p-12"><Clapperboard className="absolute -bottom-10 -right-8 h-64 w-64 text-primary/10"/><p className="font-mono text-xs tracking-[.22em] text-accent">SERIALIZED HINDI STORYTELLING</p><h3 className="mt-5 max-w-lg font-display text-4xl font-semibold md:text-6xl">Gandiv:<br/><span className="text-gradient">Rudrapur ka Sach</span></h3><p className="mt-6 max-w-xl leading-8 text-muted-foreground">A cinematic, serialized story concept shaped through suspense, character, visual imagination and episodic narrative.</p><button type="button" className="mt-10 inline-flex h-12 w-12 items-center justify-center rounded-full border border-primary text-primary" aria-label="Play sample placeholder"><Play className="h-4 w-4 fill-current"/></button></div><div className="grid gap-4">{[[WandSparkles,"AI + ideas","Using intelligent tools to explore concepts and accelerate creative workflows."],[FileText,"Words + voice","Turning scripts and ideas into clear narratives with a distinct point of view."],[Clapperboard,"Visuals + edit","Combining footage, music, sound and pacing into a complete experience."]].map(([Icon,title,desc]) => { const I=Icon as typeof Bot; return <div key={title as string} className="reveal glass-panel rounded-lg border border-border p-6"><I className="h-6 w-6 text-primary"/><h3 className="mt-5 font-display text-xl font-semibold">{title as string}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{desc as string}</p></div>})}</div></div></div></section>

        <section className="mx-auto max-w-6xl px-6 py-24 md:py-32"><div className="grid items-center gap-12 lg:grid-cols-2"><div className="reveal"><p className="font-mono text-xs uppercase tracking-[.25em] text-primary">06 / Video editing</p><h2 className="mt-5 font-display text-5xl font-semibold md:text-7xl">Turning raw footage into <span className="text-gradient">stories.</span></h2><p className="mt-6 max-w-xl leading-8 text-muted-foreground">Cutting, pacing, transitions, music, sound and visual effects are never isolated choices. Together, they create emotion and momentum.</p></div><div className="reveal relative aspect-video overflow-hidden rounded-lg border border-border bg-secondary"><div className="absolute inset-0 grid grid-cols-5 opacity-25">{[1,2,3,4,5].map(n=><div key={n} className="border-r border-primary/40"/>)}</div><div className="absolute inset-x-6 bottom-8 h-20 rounded-md border border-primary/40 bg-background/70 p-3"><div className="flex h-full items-end gap-1">{Array.from({length:25}).map((_,i)=><i key={i} className="w-full bg-primary/50" style={{height:`${18+(i*17)%70}%`}}/>)}</div></div><Play className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 text-primary"/></div></div></section>

        <section id="writing" data-label="Writing" className="border-y border-border bg-card/30 px-6 py-24 md:py-36"><div className="mx-auto max-w-6xl"><div className="reveal text-center"><PenTool className="mx-auto h-7 w-7 text-accent"/><p className="mt-7 font-mono text-xs uppercase tracking-[.25em] text-primary">07 / Writing</p><h2 className="mt-5 font-display text-6xl font-semibold md:text-8xl">Words can build worlds.</h2><p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">Fiction, suspense, scripts and character-driven stories—spaces to explore ideas that cannot be built with code alone.</p></div><div className="mt-14 grid gap-4 md:grid-cols-3">{["Serialized fiction","Scripts & concepts","Articles & ideas"].map((t,i)=><div key={t} className="reveal group min-h-48 rounded-lg border border-border bg-background p-7"><span className="font-mono text-xs text-primary">0{i+1}</span><h3 className="mt-16 font-display text-xl font-semibold">{t}</h3><p className="mt-2 text-xs text-muted-foreground">Add your work here</p></div>)}</div></div></section>

        <section className="mx-auto max-w-6xl px-6 py-24 md:py-36"><SectionTitle kicker="08 / Signature system" title="Where AI meets creativity."/><div className="reveal grid grid-cols-2 gap-3 md:grid-cols-6">{["IDEA","AI","CODE","DESIGN","CONTENT","OUTPUT"].map((s,i)=><div key={s} className="group relative flex aspect-square items-center justify-center rounded-lg border border-border bg-card text-center font-mono text-xs tracking-widest transition-all hover:border-primary hover:bg-secondary"><span>{s}</span>{i<5 && <ArrowUpRight className="absolute -right-3 top-1/2 z-10 hidden h-5 w-5 -translate-y-1/2 rotate-45 rounded-full bg-background text-primary md:block"/>}</div>)}</div><p className="reveal mt-10 max-w-3xl text-xl leading-9 text-muted-foreground">I use AI as more than a chatbot: it is a material for experimenting, automating, building and creating—always guided by human intent.</p></section>

        <section className="border-y border-border bg-card/30 px-6 py-24 md:py-32"><div className="mx-auto max-w-6xl"><SectionTitle kicker="09 / Process" title="From possibility to something real."/><ol className="relative grid gap-4 md:grid-cols-3 lg:grid-cols-6">{process.map(([n,t,d])=><li key={n} className="reveal min-h-48 border-t border-primary p-4"><span className="font-mono text-xs text-primary">{n}</span><h3 className="mt-10 font-display text-xl font-semibold">{t}</h3><p className="mt-3 text-xs leading-5 text-muted-foreground">{d}</p></li>)}</ol></div></section>

        <section className="flex min-h-[70vh] items-center justify-center px-6 py-28 text-center"><blockquote className="reveal max-w-5xl font-display text-5xl font-semibold leading-tight md:text-8xl">“I don&apos;t want to just use technology.<br/><span className="text-gradient">I want to build with it.</span>”</blockquote></section>

        <section id="contact" data-label="Contact" className="border-t border-border bg-card/40 px-6 py-24 md:py-32"><div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.2fr_.8fr]"><div className="reveal"><p className="font-mono text-xs uppercase tracking-[.25em] text-primary">10 / Contact</p><h2 className="mt-5 font-display text-5xl font-semibold md:text-7xl">Have an idea worth building?</h2><p className="mt-6 text-xl text-muted-foreground">Let&apos;s turn an idea into something real.</p></div><div className="reveal grid content-end gap-2">{["Email — add address","GitHub — add profile","LinkedIn — add profile","YouTube — add channel","Instagram — add profile"].map(s=><div key={s} className="flex items-center justify-between border-b border-border py-4 text-sm text-muted-foreground"><span>{s}</span><ArrowUpRight className="h-4 w-4"/></div>)}</div></div></section>
      </main>
      <footer className="relative z-10 flex flex-col items-center justify-between gap-4 border-t border-border px-6 py-8 text-xs text-muted-foreground sm:flex-row"><p>© 2026 Mickey. Built with curiosity.</p><a href="#home" className="inline-flex items-center gap-2 hover:text-primary">Back to top <ArrowDown className="h-3 w-3 rotate-180"/></a></footer>
    </div>
  );
}
