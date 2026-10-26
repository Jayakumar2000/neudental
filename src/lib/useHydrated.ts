// neudental v1 - false while React is hydrating prerendered HTML (and on the
// server), true from the render right after. Parts of the page that depend on
// the visitor's clock or browser (the booking form's "today", Firebase) wait
// for it, so the first browser render matches the build-time HTML exactly.
import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

export function useHydrated(): boolean {
  return useSyncExternalStore(subscribe, () => true, () => false);
}
