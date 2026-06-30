function initials(name) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function ProfileCard({ user }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-ink-800/60 p-6 shadow-ledger transition hover:border-brass-400/20 sm:p-7">
      <div className="flex flex-wrap items-center gap-4">
        <span
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-display text-lg text-parchment-50"
          style={{ backgroundColor: user.avatarColor }}
        >
          {initials(user.name)}
        </span>
        <div className="min-w-0">
          <h1 className="font-display text-xl text-parchment-50 sm:text-2xl">{user.name}</h1>
          <p className="font-mono text-xs uppercase tracking-wider text-brass-400">{user.role}</p>
        </div>
        <span className="ml-auto rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] text-parchment-100/60">
          {user.company}
        </span>
      </div>

      {user.bio && <p className="mt-5 text-sm leading-relaxed text-parchment-100/75">{user.bio}</p>}

      <dl className="mt-5 grid grid-cols-1 gap-3 border-t border-white/5 pt-4 text-sm sm:grid-cols-2">
        <div>
          <dt className="font-mono text-[10px] uppercase tracking-wider text-parchment-100/40">Email</dt>
          <dd className="mt-0.5 truncate text-parchment-100/80">{user.email}</dd>
        </div>
        <div>
          <dt className="font-mono text-[10px] uppercase tracking-wider text-parchment-100/40">Joined</dt>
          <dd className="mt-0.5 text-parchment-100/80">
            {new Date(user.createdAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </dd>
        </div>
      </dl>
    </div>
  );
}
