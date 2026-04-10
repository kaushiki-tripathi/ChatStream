# 💬 ChatStream

A **full-stack real-time chat application** built with the **MERN stack** (MongoDB, Express, React, Node.js) and **Socket.IO**. ChatStream supports one-on-one messaging, group chats, real-time typing indicators, user search, and notifications — all wrapped in a modern Material UI interface.

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
| Tailwind CSS 4 | Utility-first CSS framework |
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
```

| Service | URL |
|---|---|
| Frontend | `http://localhost:5173` |
| Backend API | `http://localhost:5000` |

---

## 📡 API Reference

### User Routes — `/api/user`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/user/register` | ❌ | Register a new user |
| `POST` | `/api/user/login` | ❌ | Authenticate & get token |
| `GET` | `/api/user?search=` | ✅ | Search users by name/email |

### Chat Routes — `/api/chat`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/chat` | ✅ | Access or create a one-on-one chat |
| `GET` | `/api/chat` | ✅ | Fetch all chats for logged-in user |
| `POST` | `/api/chat/group` | ✅ | Create a new group chat |
| `PUT` | `/api/chat/rename` | ✅ | Rename a group chat |
| `PUT` | `/api/chat/groupadd` | ✅ | Add a user to a group |
| `PUT` | `/api/chat/groupremove` | ✅ | Remove a user from a group |

### Message Routes — `/api/message`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/message/:chatId` | ✅ | Fetch all messages in a chat |
| `POST` | `/api/message` | ✅ | Send a new message |

### Socket.IO Events

| Event | Direction | Description |
|---|---|---|
| `setup` | Client → Server | Initialize user room on connection |
| `join chat` | Client → Server | Join a specific chat room |
| `new message` | Client → Server | Broadcast a new message to chat participants |
| `typing` | Client → Server | Notify room that a user is typing |
| `stop typing` | Client → Server | Notify room that a user stopped typing |
| `message recieved` | Server → Client | Deliver a new message to recipients |
| `connected` | Server → Client | Confirm socket connection established |

---

## 🏭 Production Build

Build and serve the frontend from the Express server:

```bash
cd backend
npm run build    # Installs deps & builds frontend
```

Set `NODE_ENV=production` in `.env`, then:

```bash
npm start
```

The app will serve the React build at `http://localhost:5000`.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 👩‍💻 Author

**Kaushiki Tripathi**

---

## 📄 License

This project is licensed under the **ISC License**.
