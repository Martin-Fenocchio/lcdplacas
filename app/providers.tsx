"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

// PostHog is initialised in `instrumentation-client.ts` (before hydration).
const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;

/** Manual pageview capture — the App Router is an SPA, so route changes don't
 *  trigger a full load. Wrapped in Suspense because it reads searchParams. */
function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!KEY) return;
    let url = window.location.origin + pathname;
    const qs = searchParams.toString();
    if (qs) url += `?${qs}`;
    posthog.capture("$pageview", { $current_url: url });
  }, [pathname, searchParams]);

  return null;
}

/** No-ops when the key isn't configured, so the site builds/deploys either way. */
export function Analytics({ children }: { children: React.ReactNode }) {
  if (!KEY) return <>{children}</>;

  return (
    <PostHogProvider client={posthog}>
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
      {children}
    </PostHogProvider>
  );
}
