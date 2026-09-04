import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Loader2, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
  head: () => ({
    meta: [
      { title: `Sign in — ${SITE.name}` },
      {
        name: "description",
        content: `Sign in with Google to contact ${SITE.shortName}, download the media kit and access private resources.`,
      },
      { property: "og:title", content: `Sign in — ${SITE.name}` },
      { property: "og:description", content: "Secure Google sign-in for collaborators." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
});

function GoogleMark() {
  return (
    <svg aria-hidden viewBox="0 0 48 48" className="h-5 w-5">
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.6 2.6 30.2 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.8 6.1C12.3 13.2 17.6 9.5 24 9.5Z" />
      <path fill="#4285F4" d="M46.1 24.6c0-1.6-.1-3.1-.4-4.6H24v9.1h12.4c-.5 2.9-2.1 5.3-4.6 7l7.1 5.5c4.2-3.9 6.6-9.6 6.6-17Z" />
      <path fill="#FBBC05" d="M10.4 28.7a14.5 14.5 0 0 1 0-9.4l-7.8-6.1a24 24 0 0 0 0 21.6l7.8-6.1Z" />
      <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.1-5.5c-2 1.3-4.6 2.1-8.8 2.1-6.4 0-11.7-3.7-13.6-9.1l-7.8 6.1C6.5 42.6 14.6 48 24 48Z" />
    </svg>
  );
}

function AuthPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/", replace: true });
    });
  }, [navigate]);

  const signIn = async () => {
    setLoading(true);
    setError(null);
    const redirect = typeof window !== "undefined" ? window.location.origin : undefined;
    const result = await lovable.auth.signInWithOAuth("google", redirect ? { redirect_uri: redirect } : {});
    if (result.redirected) return;
    if (result.error) {
      setError(result.error.message || "Sign-in failed. Please try again.");
      setLoading(false);
      return;
    }
    navigate({ to: "/", replace: true });
  };

  return (
    <main className="relative flex min-h-svh items-center justify-center overflow-hidden bg-background px-5 py-16 text-foreground">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-primary/15 blur-[120px]" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-accent/15 blur-[120px]" />
      </div>
      <div className="glass-panel relative z-10 w-full max-w-md rounded-2xl border border-border p-8 shadow-2xl">
        <Link to="/" className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to portfolio
        </Link>
        <ShieldCheck className="mt-7 h-8 w-8 text-primary" />
        <h1 className="mt-5 font-display text-3xl font-semibold">Sign in to continue</h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Google is the only sign-in method for this site. There is no password to create or remember, and every
          sign-in is recorded in the owner&apos;s audit log.
        </p>

        <button
          type="button"
          onClick={signIn}
          disabled={loading}
          className="mt-8 flex w-full items-center justify-center gap-3 rounded-md border border-border bg-card px-5 py-3.5 text-sm font-semibold transition-colors hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-60"
        >
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <GoogleMark />}
          {loading ? "Opening Google…" : "Continue with Google"}
        </button>

        {error && (
          <p role="alert" className="mt-4 rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-xs text-destructive-foreground">
            {error}
          </p>
        )}

        <p className="mt-6 text-[11px] leading-5 text-muted-foreground">
          Signing in stores your Google email, name and timestamp so the site owner can see who requested access.
        </p>
      </div>
    </main>
  );
}
