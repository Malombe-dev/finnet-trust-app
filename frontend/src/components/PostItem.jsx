import { useState } from "react";

const TAG_COLORS = {
  Product: "bg-plum-500/15 text-plum-500",
  Design: "bg-brass-500/15 text-brass-400",
  Engineering: "bg-teal-500/15 text-teal-500",
  Security: "bg-brass-600/15 text-brass-600",
  General: "bg-white/10 text-parchment-100/70",
};

function timeAgo(date) {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  const ranges = [
    ["year", 31536000],
    ["month", 2592000],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
  ];
  for (const [label, secs] of ranges) {
    const value = Math.floor(seconds / secs);
    if (value >= 1) return `${value} ${label}${value > 1 ? "s" : ""} ago`;
  }
  return "just now";
}

export default function PostItem({ post, isNew = false }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = post.body.length > 180;
  const tagClass = TAG_COLORS[post.tag] || TAG_COLORS.General;

  return (
    <li
      className={`group rounded-2xl border border-white/5 bg-ink-800/60 p-5 transition hover:border-brass-400/20 ${
        isNew ? "animate-[fadeIn_0.4s_ease]" : ""
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider ${tagClass}`}>
          {post.tag}
        </span>
        <time className="font-mono text-[11px] text-parchment-100/40" dateTime={post.createdAt}>
          {timeAgo(post.createdAt)}
        </time>
      </div>

      <h3 className="mt-3 font-display text-lg text-parchment-50">{post.title}</h3>

      <p className={`mt-2 text-sm leading-relaxed text-parchment-100/70 ${!expanded && isLong ? "line-clamp-2" : ""}`}>
        {post.body}
      </p>

      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="focus-ring mt-2 text-xs font-medium text-brass-400 transition hover:text-brass-500"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
    </li>
  );
}
