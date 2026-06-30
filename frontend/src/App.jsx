import { useEffect, useState, useCallback } from "react";
import { api } from "./api/client";
import Sidebar from "./components/Sidebar";
import ProfileCard from "./components/ProfileCard";
import PostsFeed from "./components/PostsFeed";
import PostForm from "./components/PostForm";
import ErrorState from "./components/ErrorState";
import { UserListSkeleton, ProfileCardSkeleton, PostsFeedSkeleton } from "./components/Skeletons";

export default function App() {
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [usersError, setUsersError] = useState(null);

  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userLoading, setUserLoading] = useState(false);
  const [userError, setUserError] = useState(null);

  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [postsError, setPostsError] = useState(null);

  const [submitting, setSubmitting] = useState(false);
  const [newestPostId, setNewestPostId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const loadUsers = useCallback(async () => {
    setUsersLoading(true);
    setUsersError(null);
    try {
      const data = await api.getUsers();
      setUsers(data);
      if (data.length > 0) setSelectedUserId((current) => current ?? data[0]._id);
    } catch (err) {
      setUsersError(err.message);
    } finally {
      setUsersLoading(false);
    }
  }, []);

  const loadUserDetail = useCallback(async (userId) => {
    setUserLoading(true);
    setUserError(null);
    try {
      const data = await api.getUser(userId);
      setSelectedUser(data);
    } catch (err) {
      setUserError(err.message);
    } finally {
      setUserLoading(false);
    }
  }, []);

  const loadPosts = useCallback(async (userId) => {
    setPostsLoading(true);
    setPostsError(null);
    try {
      const data = await api.getPosts(userId);
      setPosts(data);
    } catch (err) {
      setPostsError(err.message);
    } finally {
      setPostsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  useEffect(() => {
    if (!selectedUserId) return;
    loadUserDetail(selectedUserId);
    loadPosts(selectedUserId);
    setSidebarOpen(false);
  }, [selectedUserId, loadUserDetail, loadPosts]);

  async function handleCreatePost(payload) {
    setSubmitting(true);
    try {
      const newPost = await api.createPost(selectedUserId, payload);
      setPosts((prev) => [newPost, ...prev]);
      setNewestPostId(newPost._id);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen font-body text-parchment-50">
      <header className="sticky top-0 z-20 border-b border-white/5 bg-ink-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-4 sm:px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Open user list"
            className="focus-ring rounded-lg p-2 text-parchment-100/70 hover:bg-white/5 lg:hidden"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <span className="font-display text-lg tracking-tight text-parchment-50">Finnet Trust</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-brass-400/80">Dashboard</span>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl">
        {usersLoading ? (
          <div className="hidden w-72 shrink-0 border-r border-white/5 lg:block">
            <UserListSkeleton />
          </div>
        ) : usersError ? (
          <div className="hidden w-72 shrink-0 border-r border-white/5 p-4 lg:block">
            <ErrorState message={usersError} onRetry={loadUsers} compact />
          </div>
        ) : (
          <Sidebar
            users={users}
            selectedUserId={selectedUserId}
            onSelect={setSelectedUserId}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
        )}

        <main className="min-w-0 flex-1 space-y-6 px-4 py-6 sm:px-6 sm:py-8">
          {usersError && !usersLoading && (
            <div className="lg:hidden">
              <ErrorState message={usersError} onRetry={loadUsers} compact />
            </div>
          )}

          {userLoading || (usersLoading && !usersError) ? (
            <ProfileCardSkeleton />
          ) : userError ? (
            <ErrorState message={userError} onRetry={() => loadUserDetail(selectedUserId)} />
          ) : selectedUser ? (
            <ProfileCard user={selectedUser} />
          ) : null}

          {selectedUserId && (
            <>
              <PostForm onSubmit={handleCreatePost} submitting={submitting} />

              {postsLoading ? (
                <PostsFeedSkeleton />
              ) : postsError ? (
                <ErrorState message={postsError} onRetry={() => loadPosts(selectedUserId)} />
              ) : (
                <PostsFeed posts={posts} newestId={newestPostId} />
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
