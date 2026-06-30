import PostItem from "./PostItem";

export default function PostsFeed({ posts, newestId }) {
  if (posts.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center">
        <p className="font-display text-lg text-parchment-50">No entries yet</p>
        <p className="mt-1 text-sm text-parchment-100/60">Posts from this member will appear here once published.</p>
      </div>
    );
  }

  return (
    <ul className="max-h-[36rem] space-y-3 overflow-y-auto pr-1" aria-label="Posts feed">
      {posts.map((post) => (
        <PostItem key={post._id} post={post} isNew={post._id === newestId} />
      ))}
    </ul>
  );
}
