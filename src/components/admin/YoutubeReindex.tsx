"use client";

import { Button, toast } from "@payloadcms/ui";
import { useState } from "react";

// Admin button for the YouTube block (channel mode): purges the cached channel
// feed so the site re-pulls the latest uploads. Nothing refreshes automatically.
export default function YoutubeReindex() {
  const [loading, setLoading] = useState(false);

  const run = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/youtube-reindex", { method: "POST", credentials: "include" });
      if (res.ok) toast.success("Reindexed — the site will show your latest videos.");
      else toast.error("Reindex failed. Please try again.");
    } catch {
      toast.error("Reindex failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      <Button buttonStyle="secondary" onClick={run} disabled={loading}>
        {loading ? "Reindexing…" : "↻ Reindex latest videos"}
      </Button>
      <p style={{ fontSize: 12, opacity: 0.7, marginTop: 6 }}>
        Pulls your newest uploads from the channel. Click after posting a new video.
      </p>
    </div>
  );
}
