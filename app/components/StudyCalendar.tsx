import { CalendarDays } from "lucide-react";
import type { DayTone, Schedule } from "../lib/schedule";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const TONE_DOT: Record<DayTone, string> = {
  red: "bg-red-500",
  orange: "bg-orange-500",
  green: "bg-emerald-500",
};

const TONE_CELL: Record<DayTone, string> = {
  red: "bg-red-500/[0.05]",
  orange: "bg-orange-500/[0.05]",
  green: "bg-emerald-500/[0.05]",
};

export default function StudyCalendar({ schedule }: { schedule: Schedule }) {
  return (
    <section
      aria-labelledby="schedule-heading"
      className="mt-6 rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 dark:border-neutral-800 dark:bg-neutral-900"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2
            id="schedule-heading"
            className="inline-flex items-center gap-2 text-lg font-bold tracking-tight"
          >
            <CalendarDays size={18} aria-hidden />
            Study schedule
          </h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-neutral-400">
            {schedule.rangeLabel} · weakest subjects first
          </p>
        </div>
        <ul
          aria-label="Legend"
          className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-500 dark:text-neutral-400"
        >
          {(schedule.mode === "priority"
            ? [
                ["red", "Critical subject"],
                ["orange", "High priority"],
                ["green", "On track"],
              ]
            : [
                ["red", "Heavy day"],
                ["orange", "Medium day"],
                ["green", "Light day"],
              ]
          ).map(([tone, label]) => (
            <li key={label} className="inline-flex items-center gap-1.5">
              <span
                className={`h-2 w-2 rounded-full ${TONE_DOT[tone as DayTone]}`}
                aria-hidden
              />
              {label}
            </li>
          ))}
        </ul>
      </div>

      <div
        className="mt-3 grid grid-cols-7 gap-1 sm:gap-1.5"
        role="grid"
        aria-label="Study schedule calendar"
      >
        {WEEKDAYS.map((d) => (
          <p
            key={d}
            className="pb-0.5 text-center text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-neutral-500"
          >
            {d}
          </p>
        ))}
        {schedule.days.map((day) =>
          day.isPast ? (
            <div
              key={day.key}
              className="flex min-h-10 flex-col items-center justify-center gap-0.5 rounded-lg bg-slate-900/[0.03] p-0.5 sm:min-h-12 dark:bg-white/[0.03]"
            >
              <span className="text-xs tabular-nums text-slate-300 dark:text-neutral-600">
                {day.dayNum}
              </span>
              <span
                className="h-1.5 w-1.5 rounded-full bg-slate-200 dark:bg-neutral-700"
                aria-hidden
              />
            </div>
          ) : (
            <div
              key={day.key}
              role="gridcell"
              tabIndex={0}
              aria-label={`${day.dayNum}: ${day.subjects.map((s) => s.name).join(", ") || "rest"}`}
              className={`group relative flex min-h-10 cursor-default flex-col items-center justify-center gap-0.5 rounded-lg p-0.5 ring-1 ring-slate-200/70 sm:min-h-12 dark:ring-neutral-800 ${
                day.tone ? TONE_CELL[day.tone] : ""
              } ${
                day.isToday ? "ring-2 ring-emerald-500 dark:ring-indigo-400" : ""
              } focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:focus-visible:ring-indigo-400`}
            >
              <span
                className={`text-xs tabular-nums ${
                  day.isToday ? "font-bold" : "text-slate-600 dark:text-neutral-300"
                }`}
              >
                {day.dayNum}
              </span>
              {day.tone && (
                <span
                  className={`h-1.5 w-1.5 rounded-full ${TONE_DOT[day.tone]}`}
                  aria-hidden
                />
              )}
              <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 hidden w-max max-w-44 -translate-x-1/2 rounded-xl border border-slate-200 bg-white p-3 text-left shadow-xl group-hover:block group-focus-within:block dark:border-neutral-700 dark:bg-neutral-900">
                <p className="text-xs font-bold">
                  Day {day.dayNum}
                  {day.isToday && " · Today"}
                </p>
                {day.subjects.length > 0 ? (
                  <ul className="mt-1.5 space-y-1">
                    {day.subjects.map((s) => (
                      <li
                        key={s.slug}
                        className="whitespace-nowrap text-xs text-slate-600 dark:text-neutral-300"
                      >
                        {s.name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-1 text-xs text-slate-500 dark:text-neutral-400">
                    Rest day
                  </p>
                )}
              </div>
            </div>
          ),
        )}
      </div>
    </section>
  );
}
