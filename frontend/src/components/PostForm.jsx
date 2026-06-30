import { useState } from "react";

const TAGS = ["General", "Product", "Design", "Engineering", "Security"];
const MAX_TITLE = 140;
const MAX_BODY = 2000;

export default function PostForm({ onSubmit, submitting }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tag, setTag] = useState("General");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);

  function validate() {
    const next = {};
    if (!title.trim()) next.title = "Title is required.";
    else if (title.length > MAX_TITLE) next.title = `Title must be ${MAX_TITLE} characters or fewer.`;
    if (!body.trim()) next.body = "Post content is required.";
    else if (body.length > MAX_BODY) next.body = `Content must be ${MAX_BODY} characters or fewer.`;
    return next;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setServerError(null);
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      await onSubmit({ title: title.trim(), body: body.trim(), tag });
      setTitle("");
      setBody("");
      setTag("General");
      setErrors({});
    } catch (err) {
      setServerError(err.message || "Couldn't publish this post. Please try again.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-white/5 bg-ink-800/60 p-5 sm:p-6"
      noValidate
    >
      <h2 className="font-display text-lg text-parchment-50">New entry</h2>

      <div className="mt-4 space-y-4">
        <div>
          <label htmlFor="post-title" className="block font-mono text-[11px] uppercase tracking-wider text-parchment-100/50">
            Title
          </label>
          <input
            id="post-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? "title-error" : undefined}
            className="focus-ring mt-1.5 w-full rounded-lg border border-white/10 bg-ink-900/60 px-3.5 py-2.5 text-sm text-parchment-50 placeholder:text-parchment-100/30"
            placeholder="What happened?"
          />
          {errors.title && (
            <p id="title-error" className="mt-1 text-xs text-brass-600">
              {errors.title}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="post-body" className="block font-mono text-[11px] uppercase tracking-wider text-parchment-100/50">
            Details
          </label>
          <textarea
            id="post-body"
            rows={4}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            aria-invalid={Boolean(errors.body)}
            aria-describedby={errors.body ? "body-error" : undefined}
            className="focus-ring mt-1.5 w-full resize-none rounded-lg border border-white/10 bg-ink-900/60 px-3.5 py-2.5 text-sm text-parchment-50 placeholder:text-parchment-100/30"
            placeholder="Add the details worth recording..."
          />
          <div className="mt-1 flex items-center justify-between">
            {errors.body ? (
              <p id="body-error" className="text-xs text-brass-600">
                {errors.body}
              </p>
            ) : (
              <span />
            )}
            <span className="font-mono text-[10px] text-parchment-100/30">
              {body.length}/{MAX_BODY}
            </span>
          </div>
        </div>

        <div>
          <label htmlFor="post-tag" className="block font-mono text-[11px] uppercase tracking-wider text-parchment-100/50">
            Category
          </label>
          <select
            id="post-tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="focus-ring mt-1.5 w-full rounded-lg border border-white/10 bg-ink-900/60 px-3.5 py-2.5 text-sm text-parchment-50"
          >
            {TAGS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {serverError && (
          <p role="alert" className="rounded-lg bg-brass-600/10 px-3 py-2 text-xs text-brass-600">
            {serverError}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-full bg-brass-400 px-4 py-2.5 text-sm font-semibold text-ink-950 transition hover:bg-brass-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {submitting ? "Publishing…" : "Publish entry"}
        </button>
      </div>
    </form>
  );
}
