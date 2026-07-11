// Client instrumentation — runs after the HTML loads but before React
// hydration, so PostHog is ready before any component renders or fires an
// event (avoids the hydration mismatch of initialising during render).
import posthog from "posthog-js";

const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

if (KEY) {
  posthog.init(KEY, {
    api_host: HOST,
    persistence: "memory", // cookieless: no cookies, no localStorage → no consent banner
    person_profiles: "identified_only",
    capture_pageview: false, // captured manually per route change (App Router)
    capture_pageleave: true,
    autocapture: true,
    disable_session_recording: true,
  });
}
