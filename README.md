# 💬 ChatStream

A **full-stack real-time chat application** built with the **MERN stack** (MongoDB, Express, React, Node.js) and **Socket.IO**. ChatStream supports one-on-one messaging, group chats, real-time typing indicators, user search, and notifications — all wrapped in a modern Material UI interface.

![image](https://github.com/kaushiki-tripathi/ChatStream/blob/c165a64f80ae728a2bf2d5dea37a1fc6ff658a51/Chat%20Interface.png)

---

## ✨ Features

| Category | Details |
|---|---|
| **Authentication** | Secure sign-up & login with JWT tokens and bcrypt password hashing |
| **Real-Time Messaging** | Instant message delivery powered by Socket.IO WebSockets |
| **One-on-One Chat** | Private conversations between any two registered users |
| **Group Chat** | Create groups, rename them, add/remove members |
| **Typing Indicators** | Live "user is typing…" feedback in real time |
| **User Search** | Search registered users by name or email |
| **Notifications** | Real-time message notifications for unread messages |
| **Profile Viewing** | View user profiles with avatar and details |
| **Responsive UI** | Fully responsive design built with Material UI (MUI) |
| **Production Ready** | Serves the React build from Express in production mode |

---

## 🏗️ Architecture

```
Client (React + Vite)  ──HTTP / WebSocket──▶  Server (Express + Socket.IO)  ──Mongoose──▶  MongoDB Atlas
```

- **Frontend** — React 19 SPA bootstrapped with Vite, styled with Material UI & Tailwind CSS  
- **Backend** — Express 5 REST API with JWT-protected routes and Socket.IO event handling  
- **Database** — MongoDB Atlas with Mongoose ODM (User, Chat, Message collections)

---

## 📁 Folder Structure

```
ChatStream/
├── backend/
│   ├── config/
│   │   ├── db.js                  # MongoDB connection
│   │   └── generateToken.js       # JWT token generation
│   ├── controller/
│   │   ├── usercontroller.js      # Register, login, search users
│   │   ├── chatcontroller.js      # Create/access chats, group management
│   │   └── messageController.js   # Send & fetch messages
│   ├── middlewares/
│   │   ├── authMiddleware.js      # JWT verification middleware
│   │   └── errorMiddlewares.js    # 404 & global error handlers
│   ├── models/
│   │   ├── usermodel.js           # User schema (name, email, password, pic)
│   │   ├── chatmodel.js           # Chat schema (users, groupAdmin, latestMessage)
│   │   └── messagemodel.js        # Message schema (sender, content, chat)
│   ├── routes/
│   │   ├── userRoutes.js          # /api/user   — register, login, search
│   │   ├── chatRoutes.js          # /api/chat   — CRUD chats & groups
│   │   └── messageRoutes.js       # /api/message — send & fetch messages
│   ├── server.js                  # Entry point — Express + Socket.IO setup
│   ├── dummydata.js               # Seed data for development
│   ├── .env                       # Environment variables (gitignored)
│   └── package.json
│
├── frontend/
│   ├── public/                    # Static assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatBox.jsx            # Active chat container
│   │   │   ├── MyChats.jsx            # Sidebar chat list
│   │   │   ├── SingleChat.jsx         # Message thread view
│   │   │   ├── ScrollableChat.jsx     # Scrollable message feed
│   │   │   ├── ChatLoading.jsx        # Skeleton loading state
│   │   │   ├── Loginpage.jsx          # Login form
│   │   │   ├── Signuppage.jsx         # Registration form
│   │   │   ├── miscellaneous/
│   │   │   │   ├── SideDrawer.jsx         # Top nav + user search drawer
│   │   │   │   ├── ProfileModal.jsx       # User profile modal
│   │   │   │   ├── GroupChatModal.jsx     # Create group chat modal
│   │   │   │   └── UpdateGroupChatModal.jsx # Edit group settings
│   │   │   └── userAvatar/
│   │   │       ├── UserListItem.jsx       # User row in search results
│   │   │       └── UserBadgeItem.jsx      # User chip/badge
│   │   ├── context/
│   │   │   └── ChatProvider.jsx       # React Context for global state
│   │   ├── config/                    # Axios & chat utility helpers
│   │   ├── pages/
│   │   │   ├── Homepage.jsx           # Landing page (Login / Sign Up tabs)
│   │   │   └── Chatpage.jsx           # Main chat interface
│   │   ├── animations/               # Lottie animation assets
│   │   ├── App.jsx                    # Root component & routes
│   │   ├── main.jsx                   # Vite entry point
│   │   └── App.css / index.css        # Global styles
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 | UI component library |
| Vite 7 | Build tool & dev server |
| Material UI (MUI) 7 | Component library & theming |
| Tailwind CSS  | Utility-first CSS framework |
| Socket.IO Client | Real-time WebSocket communication |
| Axios | HTTP client for API calls |
| React Router DOM 7 | Client-side routing |
| React Toastify | Toast notifications |
| React Lottie | Animated loading indicators |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express 5 | Web framework |
| Socket.IO 4 | Real-time bi-directional events |
| MongoDB Atlas | Cloud database |
| Mongoose 9 | MongoDB object modeling (ODM) |
| JSON Web Tokens | Stateless authentication |
| bcryptjs | Password hashing |
| dotenv | Environment variable management |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ and **npm**
- A **MongoDB Atlas** cluster (or local MongoDB instance)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ChatStream.git
cd ChatStream
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

### 3. Frontend setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend/` directory (if needed for API base URL overrides):

```env
VITE_API_URL=http://localhost:5000
```

### 4. Run in development

Open **two terminals**:

```bash
# Terminal 1 — Backend
cd backend
npm start
```

```bash
# Terminal 2 — Frontend
cd frontend
npm run dev
---
```

---

## 👩‍💻 Author

**Kaushiki Tripathi**

---
