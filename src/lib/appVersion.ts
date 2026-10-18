// neudental v1 - tells whether a newer build of the site is live than the one
// this tab is running. Firestore rules are published separately from the
// site, so a tab left open across a release (common on phones, where tabs
// sit in the background for days) can be running booking code that the
// current rules refuse. Comparing the entry script this tab loaded with the
// one in a fresh copy of index.html tells that apart from a real failure.

const ENTRY_SCRIPT = /\/assets\/index-[\w-]+\.js/;

function loadedEntryScript(): string | null {
  const script = document.querySelector<HTMLScriptElement>('script[type="module"][src*="/assets/index-"]');
  return script?.getAttribute('src')?.match(ENTRY_SCRIPT)?.[0] ?? null;
}

export async function isNewerBuildLive(timeoutMs = 4000): Promise<boolean> {
  const loaded = loadedEntryScript();
  // The dev server has no hashed bundle to compare against.
  if (!loaded) return false;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch('/', { cache: 'no-store', signal: controller.signal });
    if (!res.ok) return false;
    const live = (await res.text()).match(ENTRY_SCRIPT)?.[0];
    return !!live && live !== loaded;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}
