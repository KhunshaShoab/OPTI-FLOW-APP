"use client";

import { useEffect } from "react";

// After a deploy, existing tabs hold stale HTML that references chunk
// hashes the new build no longer has. Reload once so the browser fetches
// fresh HTML + matching chunks. Guarded with sessionStorage so a genuine
// crash never causes an infinite reload loop.
const KEY = "optiflow_chunk_reload_v1";

function isChunkError(err: unknown): boolean {
  if (!err) return false;
  const msg = (err as { message?: string; name?: string }).message ?? "";
  const name = (err as { name?: string }).name ?? "";
  return (
    name === "ChunkLoadError" ||
    /Loading chunk [^ ]+ failed/i.test(msg) ||
    /Loading CSS chunk [^ ]+ failed/i.test(msg) ||
    /_next\/static\/chunks\/.+\.js/.test(msg)
  );
}

function reloadOnce() {
  try {
    if (sessionStorage.getItem(KEY)) return;
    sessionStorage.setItem(KEY, "1");
  } catch {
    // sessionStorage blocked — reload anyway; a loop is unlikely because
    // the fresh HTML almost always fixes it.
  }
  window.location.reload();
}

export default function ChunkErrorReloader() {
  useEffect(() => {
    const onError = (e: ErrorEvent) => {
      if (isChunkError(e.error) || isChunkError({ message: e.message, name: "" })) {
        reloadOnce();
      }
    };
    const onRejection = (e: PromiseRejectionEvent) => {
      if (isChunkError(e.reason)) reloadOnce();
    };
    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);
    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, []);
  return null;
}
