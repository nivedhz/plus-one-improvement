import { ExternalLink, FileText } from "lucide-react";

// Compact external-resource card shared by subject notes, chapter notes and
// PYQ lists. Fixed icon + truncate keeps 2-per-row grids tidy on all widths.
export default function ResourceCard({
  title,
  url,
  detail,
  badge,
}: {
  title: string;
  url: string;
  detail?: string;
  badge?: string;
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/80 p-3.5 backdrop-blur transition hover:-translate-y-px hover:shadow-sm dark:border-neutral-800 dark:bg-neutral-900/70"
    >
      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-600/10 text-emerald-700 dark:bg-indigo-500/10 dark:text-indigo-300">
        <FileText size={17} aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold">{title}</span>
        {detail && (
          <span className="mt-0.5 block truncate text-xs text-slate-500 dark:text-neutral-400">
            {detail}
          </span>
        )}
      </span>
      {badge && (
        <span className="shrink-0 rounded-full bg-slate-900/[0.05] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-500 dark:bg-white/[0.07] dark:text-neutral-400">
          {badge}
        </span>
      )}
      <ExternalLink
        size={15}
        aria-hidden
        className="shrink-0 text-slate-300 transition group-hover:text-slate-500 dark:group-hover:text-neutral-300"
      />
    </a>
  );
}
