import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const ADMIN_EMAIL = "mickeybanerjee29@gmail.com";

/* ------------------------------------------------------------------ */
/* Audit log                                                           */
/* ------------------------------------------------------------------ */

export const logAuthEvent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z.object({ event: z.enum(["sign_in", "sign_out"]) }).parse(data),
  )
  .handler(async ({ data, context }) => {
    const claims = context.claims as Record<string, unknown>;
    const meta = (claims["user_metadata"] ?? {}) as Record<string, unknown>;
    const { error } = await context.supabase.from("auth_audit_log").insert({
      user_id: context.userId,
      email: typeof claims["email"] === "string" ? claims["email"] : null,
      full_name: typeof meta["full_name"] === "string" ? meta["full_name"] : null,
      provider: "google",
      event: data.event,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/* ------------------------------------------------------------------ */
/* Contact (sign-in required)                                          */
/* ------------------------------------------------------------------ */

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  subject: z.string().trim().max(140).optional(),
  message: z.string().trim().min(20, "Tell me a little more").max(2000),
  website: z.string().max(0).optional(), // honeypot
  elapsedMs: z.number().int().nonnegative(),
});

export const submitContactMessage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data, context }) => {
    // Spam protection: honeypot + minimum fill time.
    if (data.website) return { ok: true, spam: true };
    if (data.elapsedMs < 3000) throw new Error("That was submitted a little too fast. Please try again.");

    const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { count } = await context.supabase
      .from("contact_messages")
      .select("id", { count: "exact", head: true })
      .eq("user_id", context.userId)
      .gte("created_at", since);
    if ((count ?? 0) >= 3) throw new Error("You've already sent a few messages this hour. Please try later.");

    const { error } = await context.supabase.from("contact_messages").insert({
      user_id: context.userId,
      name: data.name,
      email: data.email,
      subject: data.subject ?? null,
      message: data.message,
    });
    if (error) throw new Error(error.message);
    return { ok: true, spam: false };
  });

/* ------------------------------------------------------------------ */
/* Newsletter double opt-in (public)                                   */
/* ------------------------------------------------------------------ */

export const subscribeToNewsletter = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z
      .object({
        email: z.string().trim().toLowerCase().email("Enter a valid email").max(255),
        website: z.string().max(0).optional(),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    if (data.website) return { status: "pending" as const };
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: existing } = await supabaseAdmin
      .from("newsletter_subscribers")
      .select("id,status")
      .eq("email", data.email)
      .maybeSingle();

    if (existing?.status === "confirmed") return { status: "confirmed" as const };

    const token = crypto.randomUUID().replace(/-/g, "") + crypto.randomUUID().replace(/-/g, "");
    const row = {
      email: data.email,
      status: "pending",
      confirm_token: token,
      token_sent_at: new Date().toISOString(),
      source: "portfolio",
    };

    const { error } = existing
      ? await supabaseAdmin.from("newsletter_subscribers").update(row).eq("id", existing.id)
      : await supabaseAdmin.from("newsletter_subscribers").insert(row);
    if (error) throw new Error(error.message);

    return { status: "pending" as const };
  });

export const confirmNewsletter = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => z.object({ token: z.string().trim().min(16).max(128) }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row } = await supabaseAdmin
      .from("newsletter_subscribers")
      .select("id,status")
      .eq("confirm_token", data.token)
      .maybeSingle();

    if (!row) return { status: "invalid" as const };
    if (row.status === "confirmed") return { status: "confirmed" as const };

    const { error } = await supabaseAdmin
      .from("newsletter_subscribers")
      .update({ status: "confirmed", confirmed_at: new Date().toISOString(), confirm_token: null })
      .eq("id", row.id);
    if (error) throw new Error(error.message);
    return { status: "confirmed" as const };
  });

/* ------------------------------------------------------------------ */
/* Admin dashboard                                                     */
/* ------------------------------------------------------------------ */

export const getAdminOverview = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const claims = context.claims as Record<string, unknown>;
    const email = typeof claims["email"] === "string" ? claims["email"].toLowerCase() : "";

    const { data: isAdmin } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });

    if (!isAdmin || email !== ADMIN_EMAIL) {
      throw new Error("Forbidden: this dashboard is restricted to the site owner.");
    }

    const [messages, subscribers, audit] = await Promise.all([
      context.supabase
        .from("contact_messages")
        .select("id,name,email,subject,message,created_at,is_read")
        .order("created_at", { ascending: false })
        .limit(100),
      context.supabase
        .from("newsletter_subscribers")
        .select("id,email,status,created_at,confirmed_at")
        .order("created_at", { ascending: false })
        .limit(100),
      context.supabase
        .from("auth_audit_log")
        .select("id,email,full_name,event,provider,created_at")
        .order("created_at", { ascending: false })
        .limit(200),
    ]);

    return {
      messages: messages.data ?? [],
      subscribers: subscribers.data ?? [],
      audit: audit.data ?? [],
    };
  });
