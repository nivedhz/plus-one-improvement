"use client";

import { ExternalLink, Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type { ChapterVideo } from "../lib/videos";

// Click-to-play facade: shows the free YouTube thumbnail first and only
// loads the player iframe after a click, so chapter pages stay fast.
function formatStart(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  const mm = h > 0 ? String(m).padStart(2, "0") : String(m);
  return `${h > 0 ? `${h}:` : ""}${mm}:${String(s).padStart(2, "0")}`;
}

export default function VideoFacade({ video }: { video: ChapterVideo }) {
  const [playing, setPlaying] = useState(false);
  const startParam = video.startAt ? `&start=${video.startAt}` : "";
  const watchUrl =
    `https://www.youtube.com/watch?v=${video.youtubeId}` +
    (video.startAt ? `&t=${video.startAt}s` : "");

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/70">
      {playing ? (
        <div className="aspect-video w-full bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0${startParam}`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play ${video.title} on YouTube`}
          className="group relative block w-full"
        >
          <span className="relative block aspect-video w-full">
            <Image
              src={`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </span>
          <span
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
          />
          <span
            aria-hidden
            className="absolute inset-0 grid place-items-center"
          >
            <span className="grid h-14 w-14 place-items-center rounded-full bg-white/95 text-slate-900 shadow-xl transition group-hover:scale-105">
              <Play size={22} className="ml-0.5" fill="currentColor" />
            </span>
          </span>
          {video.recent && (
            <span className="absolute left-3 top-3 rounded-full bg-emerald-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-lg dark:bg-indigo-500">
              New
            </span>
          )}
        </button>
      )}
      <div className="flex items-start justify-between gap-3 p-4">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold">{video.title}</h3>
          <p className="mt-1 text-xs text-slate-500 dark:text-neutral-400">
            YouTube
            {video.startAt ? ` · Starts at ${formatStart(video.startAt)}` : ""}
          </p>
        </div>
        <a
          href={watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${video.title} on YouTube`}
          className="shrink-0 rounded-full border border-slate-200 p-2 text-slate-500 transition hover:border-slate-300 hover:text-slate-900 dark:border-neutral-800 dark:text-neutral-400 dark:hover:border-neutral-700 dark:hover:text-white"
        >
          <ExternalLink size={15} aria-hidden />
        </a>
      </div>
    </article>
  );
}
