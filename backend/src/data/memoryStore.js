// In-memory fallback store, used automatically when MONGO_URI is not set.
// Mirrors the shape of the Mongoose documents so controllers can stay
// identical regardless of which data layer is active.

function makeId() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

const users = [
  {
    _id: "u1",
    name: "Amara Otieno",
    email: "amara.otieno@finnettrust.com",
    role: "Product Designer",
    company: "Finnet Trust",
    avatarColor: "#1B3A4B",
    bio: "Designs trustworthy interfaces for financial products.",
    createdAt: new Date("2025-01-12"),
  },
  {
    _id: "u2",
    name: "David Kimani",
    email: "david.kimani@finnettrust.com",
    role: "Backend Engineer",
    company: "Finnet Trust",
    avatarColor: "#A6592B",
    bio: "Builds resilient APIs and ledgers that never lose a transaction.",
    createdAt: new Date("2025-02-03"),
  },
  {
    _id: "u3",
    name: "Lindiwe Dube",
    email: "lindiwe.dube@finnettrust.com",
    role: "Security Analyst",
    company: "Finnet Trust",
    avatarColor: "#2F6D5C",
    bio: "Keeps an eye on threats so customers don't have to.",
    createdAt: new Date("2025-03-18"),
  },
  {
    _id: "u4",
    name: "Samuel Achieng",
    email: "samuel.achieng@finnettrust.com",
    role: "Frontend Engineer",
    company: "Finnet Trust",
    avatarColor: "#5B3A8E",
    bio: "Obsessed with fast, accessible interfaces.",
    createdAt: new Date("2025-04-22"),
  },
];

const posts = [
  {
    _id: "p1",
    userId: "u1",
    title: "New onboarding flow ships next sprint",
    body: "We cut the average signup time from 6 minutes to under 2 by removing redundant verification steps and adding inline validation.",
    tag: "Product",
    createdAt: new Date("2025-05-01T09:00:00Z"),
  },
  {
    _id: "p2",
    userId: "u1",
    title: "Accessibility audit results",
    body: "Ran a full WCAG 2.1 AA pass on the dashboard. Found 4 contrast issues and 2 missing focus states, all now resolved.",
    tag: "Design",
    createdAt: new Date("2025-05-04T14:30:00Z"),
  },
  {
    _id: "p3",
    userId: "u2",
    title: "Migrated ledger service to event sourcing",
    body: "Every balance change is now an immutable event. This gives us a full audit trail and makes reconciliation trivial.",
    tag: "Engineering",
    createdAt: new Date("2025-05-06T11:15:00Z"),
  },
  {
    _id: "p4",
    userId: "u3",
    title: "Quarterly penetration test passed",
    body: "External auditors found no critical vulnerabilities. Two low-severity findings have been patched.",
    tag: "Security",
    createdAt: new Date("2025-05-09T08:45:00Z"),
  },
  {
    _id: "p5",
    userId: "u4",
    title: "Dashboard now loads 40% faster",
    body: "Split the bundle by route and lazy-loaded the charts library. Largest Contentful Paint dropped from 2.4s to 1.4s.",
    tag: "Engineering",
    createdAt: new Date("2025-05-11T16:20:00Z"),
  },
];

export const memoryStore = {
  users,
  posts,
  makeId,
};
