export function UserListSkeleton() {
  return (
    <ul className="space-y-1 p-2" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <li key={i} className="flex items-center gap-3 rounded-lg px-3 py-3">
          <div className="skeleton h-9 w-9 rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="skeleton h-3 w-2/3 rounded" />
            <div className="skeleton h-2.5 w-1/3 rounded" />
          </div>
        </li>
      ))}
    </ul>
  );
}

export function ProfileCardSkeleton() {
  return (
    <div className="rounded-2xl border border-white/5 bg-ink-800/60 p-6" aria-hidden="true">
      <div className="flex items-center gap-4">
        <div className="skeleton h-14 w-14 rounded-full" />
        <div className="flex-1 space-y-3">
          <div className="skeleton h-4 w-1/3 rounded" />
          <div className="skeleton h-3 w-1/4 rounded" />
        </div>
      </div>
      <div className="mt-5 space-y-2">
        <div className="skeleton h-3 w-full rounded" />
        <div className="skeleton h-3 w-5/6 rounded" />
      </div>
    </div>
  );
}

export function PostsFeedSkeleton() {
  return (
    <ul className="space-y-3" aria-hidden="true">
      {Array.from({ length: 3 }).map((_, i) => (
        <li key={i} className="rounded-2xl border border-white/5 bg-ink-800/60 p-5">
          <div className="skeleton h-3 w-1/4 rounded" />
          <div className="skeleton mt-3 h-4 w-2/3 rounded" />
          <div className="skeleton mt-2 h-3 w-full rounded" />
          <div className="skeleton mt-2 h-3 w-4/5 rounded" />
        </li>
      ))}
    </ul>
  );
}
