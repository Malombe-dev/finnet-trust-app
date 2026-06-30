export default function ErrorState({ message, onRetry, compact = false }) {
  return (
    <div
      role="alert"
      className={`rounded-2xl border border-brass-600/30 bg-brass-600/5 ${
        compact ? "p-4" : "p-8"
      } text-center`}
    >
      <p className="font-mono text-xs uppercase tracking-wider text-brass-400">Something went wrong</p>
      <p className="mt-2 text-sm text-parchment-100/80">{message || "We couldn't load this. Please try again."}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="focus-ring mt-4 inline-flex items-center gap-2 rounded-full border border-brass-400/40 px-4 py-2 text-xs font-medium uppercase tracking-wider text-brass-400 transition hover:bg-brass-400/10 active:scale-95"
        >
          Retry
        </button>
      )}
    </div>
  );
}
