export type CaseStudy = {
  slug: string;
  category: string;
  title: string;
  tagline: string;
  summary: string;
  cover: string;
  year: string;
  role: string;
  stack: string[];
  problem: string[];
  approach: { step: string; title: string; body: string }[];
  screenshots: { src: string; caption: string }[];
  outcomes: { metric: string; label: string }[];
  reflection: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "ai-content-engine",
    category: "AI Engineering",
    title: "AI Content Engine",
    tagline: "An assistive pipeline that turns raw ideas into publish-ready drafts.",
    summary:
      "A generative-AI workflow that researches, structures and drafts long-form and short-form content while keeping the final voice unmistakably human.",
    cover: "/images/case-ai-cover.jpg",
    year: "2026",
    role: "AI engineering, prompt design, interface",
    stack: ["Generative AI", "Prompt engineering", "Automation", "React", "TypeScript"],
    problem: [
      "Ideas arrived faster than they could be researched, outlined and written, so most of them died in a notes app.",
      "Generic AI output sounded like everyone else's AI output — usable as raw material, never as a finished piece.",
      "Every stage lived in a different tool, so context was lost between research, outline, draft and edit.",
    ],
    approach: [
      {
        step: "01",
        title: "Map the human workflow first",
        body: "Before writing any prompts I documented how a piece actually gets made: spark, research, angle, outline, draft, edit. Automation was only applied to the stages that were mechanical.",
      },
      {
        step: "02",
        title: "Build a staged prompt chain",
        body: "Instead of one giant prompt, each stage became its own step with its own constraints and its own output contract, so a weak result could be regenerated in isolation.",
      },
      {
        step: "03",
        title: "Encode the voice",
        body: "A reusable style layer carries tone, rhythm, vocabulary and forbidden phrasing into every stage, which is what separates a draft I can edit from a draft I have to rewrite.",
      },
      {
        step: "04",
        title: "Keep a human checkpoint",
        body: "Nothing publishes automatically. Every run ends in a review view where the draft is accepted, regenerated or rewritten by hand.",
      },
    ],
    screenshots: [
      { src: "/images/case-ai-shot.jpg", caption: "The staged pipeline: each node is an isolated, re-runnable step." },
      { src: "/images/case-ai-cover.jpg", caption: "The review workspace where drafts are compared and accepted." },
    ],
    outcomes: [
      { metric: "6×", label: "Faster idea-to-draft turnaround" },
      { metric: "0", label: "Pieces published without human editing" },
      { metric: "4", label: "Formats supported from one source idea" },
    ],
    reflection:
      "The lesson was that AI is most useful as a material, not an author. The moment a human checkpoint was removed, quality dropped immediately — so the checkpoint became the product.",
  },
  {
    slug: "portfolio-web-experience",
    category: "Web Development",
    title: "Portfolio Web Experience",
    tagline: "A dark, motion-led personal site engineered for speed and clarity.",
    summary:
      "A server-rendered React portfolio built around a strict design system — glass panels, neon accents and scroll-reveal motion that never fights readability.",
    cover: "/images/case-web-cover.jpg",
    year: "2026",
    role: "Design system, frontend engineering, performance",
    stack: ["React", "TanStack Start", "TypeScript", "Tailwind CSS", "SSR"],
    problem: [
      "Template portfolios all look identical and say nothing about how someone actually thinks.",
      "Heavy animation libraries made earlier attempts beautiful on a laptop and unusable on a mid-range phone.",
      "Content spanned five very different disciplines and needed a structure that did not read as a list of unrelated jobs.",
    ],
    approach: [
      {
        step: "01",
        title: "One design system, no exceptions",
        body: "Every colour, glow and surface is a semantic token. Nothing is hardcoded, so the whole site can be re-themed from a single file.",
      },
      {
        step: "02",
        title: "Motion with a budget",
        body: "Reveals use a single IntersectionObserver and CSS transforms only — no per-element animation library, no layout-shifting effects.",
      },
      {
        step: "03",
        title: "Narrative section order",
        body: "Sections are numbered and sequenced as an argument: who, what, proof, process, invitation — so the range reads as one practice rather than five hobbies.",
      },
      {
        step: "04",
        title: "Server rendering for the first paint",
        body: "The page is rendered on the server so text and the hero image are present immediately, with hydration handling interaction afterwards.",
      },
    ],
    screenshots: [
      { src: "/images/case-web-shot.jpg", caption: "The same layout system on desktop and mobile." },
      { src: "/images/case-web-cover.jpg", caption: "Layered glass surfaces and the neon accent scale." },
    ],
    outcomes: [
      { metric: "100%", label: "Sections usable from 320px upward" },
      { metric: "1", label: "Observer driving all reveal animation" },
      { metric: "0", label: "Hardcoded colour values in components" },
    ],
    reflection:
      "Constraint made this faster to build, not slower. Deciding the token set before the first component removed almost every later styling argument with myself.",
  },
  {
    slug: "gandiv-rudrapur-ka-sach",
    category: "Content & Storytelling",
    title: "Gandiv: Rudrapur ka Sach",
    tagline: "A serialized Hindi suspense concept built for episodic attention.",
    summary:
      "A cinematic storytelling project — a small town, a buried truth and a structure designed so every episode ends somewhere you cannot stop.",
    cover: "/images/case-gandiv-cover.jpg",
    year: "2026",
    role: "Concept, writing, edit direction",
    stack: ["Story structure", "Scriptwriting", "Video editing", "Sound design"],
    problem: [
      "Short-form platforms reward hooks, but a suspense story needs patience — the two pull in opposite directions.",
      "Small-town Indian settings are usually written as backdrop rather than as a character with its own logic.",
      "Serialized concepts collapse when the mystery is invented faster than it is answered.",
    ],
    approach: [
      {
        step: "01",
        title: "Answer the ending first",
        body: "The truth of Rudrapur was written before episode one, so every clue placed earlier is a real clue rather than a retroactive patch.",
      },
      {
        step: "02",
        title: "Design the episode shape",
        body: "Each episode carries one revelation, one complication and one unanswered question — a repeatable rhythm that keeps momentum without cheap cliffhangers.",
      },
      {
        step: "03",
        title: "Let the place speak",
        body: "Weather, silence, rooms and street sound do narrative work, which keeps exposition low and atmosphere high.",
      },
      {
        step: "04",
        title: "Cut for tension, not coverage",
        body: "In the edit, pacing, sound design and held frames decide the fear. Music enters late so that quiet still has value.",
      },
    ],
    screenshots: [
      { src: "/images/case-gandiv-cover.jpg", caption: "Visual language: rain, teal night light and silhouette blocking." },
      { src: "/images/case-gandiv-shot.jpg", caption: "The edit timeline where pacing and sound design are shaped." },
    ],
    outcomes: [
      { metric: "1", label: "Fully mapped season arc" },
      { metric: "3-act", label: "Repeatable per-episode structure" },
      { metric: "100%", label: "Clues planted before they are paid off" },
    ],
    reflection:
      "Writing the ending first felt restrictive for about a day, then made every other decision obvious. Suspense is a structural problem long before it is a stylistic one.",
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
