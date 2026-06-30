function initials(name) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function accountNumber(index) {
  return `ACC-${String(index + 1).padStart(4, "0")}`;
}

export default function Sidebar({ users, selectedUserId, onSelect, isOpen, onClose }) {
  return (
    <>
      {/* Mobile scrim */}
      {isOpen && (
        <button
          aria-label="Close user list"
          onClick={onClose}
          className="fixed inset-0 z-30 bg-ink-950/70 backdrop-blur-sm lg:hidden"
        />
      )}

      <nav
        aria-label="Users"
        className={`fixed inset-y-0 left-0 z-40 w-72 transform border-r border-white/5 bg-ink-900/95 transition-transform duration-200 ease-out lg:static lg:z-auto lg:translate-x-0 lg:bg-ink-900/40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/5 px-5 py-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brass-400/80">Ledger</p>
            <h2 className="font-display text-lg text-parchment-50">Members</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="focus-ring rounded-full p-1.5 text-parchment-100/60 hover:bg-white/5 lg:hidden"
          >
            ✕
          </button>
        </div>

        <ul className="max-h-[calc(100vh-5rem)] overflow-y-auto p-2" role="listbox" aria-label="Select a user">
          {users.map((user, index) => {
            const selected = user._id === selectedUserId;
            return (
              <li key={user._id}>
                <button
                  role="option"
                  aria-selected={selected}
                  onClick={() => onSelect(user._id)}
                  className={`focus-ring group flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition ${
                    selected ? "bg-brass-400/10 ring-1 ring-inset ring-brass-400/30" : "hover:bg-white/[0.04]"
                  }`}
                >
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-parchment-50 shadow-ledger"
                    style={{ backgroundColor: user.avatarColor }}
                  >
                    {initials(user.name)}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-parchment-50">{user.name}</span>
                    <span className="block truncate font-mono text-[11px] text-parchment-100/50">
                      {accountNumber(index)} · {user.role}
                    </span>
                  </span>
                  {selected && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brass-400" aria-hidden="true" />}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
