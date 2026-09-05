import Link from "next/link";
import { getSession } from "../lib/auth";
import LogoutButton from "./LogoutButton";
import NavbarFrame from "./NavbarFrame";
import ThemeToggle from "./ThemeToggle";

const VISITOR_LINKS = [
  { href: "/#why", label: "Why" },
  { href: "/#resources", label: "Resources" },
  { href: "/#how", label: "How it works" },
];

const MEMBER_LINKS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/subjects", label: "Subjects" },
];

export default async function Navbar() {
  const user = await getSession();
  const links = user ? MEMBER_LINKS : VISITOR_LINKS;

  return (
    <NavbarFrame>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="text-xl font-bold tracking-tight">
            improve<span className="text-emerald-500 dark:text-indigo-400">.</span>
          </span>
        </Link>
        <nav
          aria-label="Primary"
          className="hidden items-center gap-7 text-sm text-slate-600 sm:flex dark:text-neutral-300"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="transition hover:text-slate-950 dark:hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          {user ? (
            <>
              <span
                aria-hidden
                className="hidden h-9 w-9 items-center justify-center rounded-full bg-emerald-600/15 text-sm font-bold text-emerald-700 sm:inline-flex dark:bg-indigo-500/15 dark:text-indigo-300"
              >
                {user.name.charAt(0).toUpperCase()}
              </span>
              <span className="hidden max-w-28 truncate text-sm font-medium md:inline">
                {user.name}
              </span>
              <LogoutButton />
            </>
          ) : (
            <>
              <a
                href="/auth/login"
                className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:text-slate-950 dark:text-neutral-300 dark:hover:text-white"
              >
                Log in
              </a>
              <a
                href="/auth/sign-up"
                className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
              >
                Sign up
              </a>
            </>
          )}
        </div>
      </div>
    </NavbarFrame>
  );
}
