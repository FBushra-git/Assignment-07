# KinKeeper — Friendship Tracker

> A premium SaaS-style relationship management app to keep you genuinely connected with the people who matter most.

---

##  Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite |
| Routing | React Router DOM v6 |
| Styling | Tailwind CSS |
| Charts | Recharts |
| Icons | Lucide React |
| Notifications | React Hot Toast |
| Data | Local JSON + localStorage |
| Fonts | Playfair Display + DM Sans |

---

##  Key Features

1. **Friend Dashboard** — Track all your friends with status badges (overdue / almost due / on-track), contact frequency goals, and one-click navigation to detailed profiles.

2. **Interaction Timeline** — Log calls, texts, and video chats with one click. Filter by type, sort by date, and search by friend name — all persisted to localStorage.

3. **Friendship Analytics** — Beautiful Recharts pie chart and bar chart showing your interaction distribution and friendship health metrics across your entire network.

---

##  Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

##  Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── FriendCard.jsx
│   ├── StatusBadge.jsx
│   ├── SummaryCard.jsx
│   ├── TimelineEntry.jsx
│   └── LoadingStates.jsx
├── pages/              # Route-level pages
│   ├── HomePage.jsx
│   ├── FriendDetailPage.jsx
│   ├── TimelinePage.jsx
│   ├── StatsPage.jsx
│   └── NotFoundPage.jsx
├── layouts/
│   └── MainLayout.jsx
├── hooks/
│   ├── useFriends.js
│   └── useTimeline.js
├── data/
│   └── friends.json
└── utils/
    └── helpers.js
```

---

##  Deployment

### Netlify
A `_redirects` file is included in `/public` for SPA routing:
```
/* /index.html 200
```


##  Responsive Breakpoints

| Screen | Friends Grid |
|---|---|
| Mobile (<640px) | 1 column |
| Tablet (640–1024px) | 2 columns |
| Desktop (>1024px) | 3–4 columns |

---

Made with  for better friendships.