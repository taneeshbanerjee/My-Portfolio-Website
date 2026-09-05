import { Fragment } from "react";

/** Renders the lightweight markdown used by blog posts. */
export function Prose({ body }: { body: string }) {
  const blocks = body.trim().split(/\n{2,}/);
  const nodes: React.ReactNode[] = [];
  let list: string[] = [];

  const flush = (key: string) => {
    if (!list.length) return;
    nodes.push(
      <ul key={`ul-${key}`} className="my-6 space-y-3 pl-1">
        {list.map((item) => (
          <li key={item} className="flex gap-3 text-[1.05rem] leading-9 text-muted-foreground">
            <span className="mt-4 h-1.5 w-1.5 shrink-0 rounded-full bg-primary shadow-[0_0_10px_var(--color-primary)]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>,
    );
    list = [];
  };

  blocks.forEach((block, i) => {
    const key = String(i);
    if (block.startsWith("- ")) {
      list.push(...block.split("\n").map((l) => l.replace(/^-\s*/, "")));
      return;
    }
    flush(key);
    if (block.startsWith("### ")) {
      nodes.push(
        <h3 key={key} className="mt-10 font-display text-xl font-semibold text-foreground md:text-2xl">
          {block.slice(4)}
        </h3>,
      );
    } else if (block.startsWith("## ")) {
      nodes.push(
        <h2 key={key} className="mt-14 scroll-mt-24 font-display text-2xl font-semibold text-foreground md:text-4xl">
          <span className="mr-3 text-primary">/</span>
          {block.slice(3)}
        </h2>,
      );
    } else if (block.startsWith("> ")) {
      nodes.push(
        <blockquote key={key} className="my-8 border-l-2 border-primary bg-card/40 py-4 pl-6 font-display text-xl leading-9 text-foreground md:text-2xl">
          {block.slice(2)}
        </blockquote>,
      );
    } else {
      nodes.push(
        <p key={key} className="mt-6 text-[1.05rem] leading-9 text-muted-foreground">
          {block}
        </p>,
      );
    }
  });
  flush("end");

  return <Fragment>{nodes}</Fragment>;
}
