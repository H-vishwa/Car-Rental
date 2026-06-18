# Car Rental Platform

A professional full-stack MERN (MongoDB, Express, React, Node.js) Car Rental application featuring role-based workflows for renters (Users) and car owners (Owners).

---

## Features

### 👤 User (Renter) Features
* **Interactive Car Search**: Search and filter cars by location, pickup/return dates, brand, and type.
* **Booking Management**: Create bookings, check live availability, and view detailed booking histories.
* **User Authentication**: Secure JWT-based registration and login system.

### 💼 Owner Features
* **Role Conversion**: Switch role from a user to an owner to monetize vehicles.
* **Car Listing**: Add luxury and everyday cars with location, specifications, and pricing.
* **Dashboard Analytics**: Track listed cars, manage bookings, review statuses, and view monthly revenues.
* **Image Uploads**: Integrated image uploads powered by ImageKit.

---

## Tech Stack

### Frontend
* **Core**: React, Vite
* **Styling**: Tailwind CSS, shadcn/ui
* **Animations**: Motion (Framer Motion)
* **Icons**: Phosphor Icons

### Backend
* **Core**: Node.js, Express.js
* **Database**: MongoDB & Mongoose
* **Uploads**: ImageKit & Multer
* **Auth**: JSON Web Tokens (JWT) & Bcrypt

---

## Project Directory Structure

```text
Car-Rental/
├── backend/                     # Express.js Server
│   ├── config/                  # DB connection & ImageKit integrations
│   ├── controllers/             # Request controllers (camelCase)
│   ├── middleware/              # Authentication & multer upload filters
│   ├── models/                  # Mongoose models (PascalCase)
│   ├── routes/                  # Express Router routes
│   ├── services/                # Decoupled business and query logic
│   ├── utils/                   # Shared helpers and custom error classes
│   ├── server.js                # App entry point
│   └── vercel.json
│
├── frontend/                    # Vite + React Client
│   ├── public/                  # Static assets
│   ├── src/
│   │   ├── assets/              # Icons and image catalogs
│   │   ├── components/
│   │   │   ├── common/          # Global widgets (Loader, Banner, Title)
│   │   │   ├── layout/          # Frames (Navbar, Footer, Sidebar)
│   │   │   └── ui/              # Shadcn UI primitive elements
│   │   ├── context/             # React state context providers
│   │   ├── hooks/               # Custom reusable React hooks
│   │   ├── pages/               # Top-level views
│   │   │   ├── auth/            # Auth pages (Login, Sign-up)
│   │   │   ├── owner/           # Owner panel layouts and dashboards
│   │   │   └── user/            # Home, Cars lists, Car Details, My Bookings
│   │   ├── routes/              # Central routing & protected guards
│   │   ├── services/            # Axios API wrappers
│   │   ├── utils/               # Reusable frontend utility scripts
│   │   ├── App.jsx              # Routing setup
│   │   └── main.jsx             # React DOM mount point
│   ├── tailwind.config.js
│   └── vite.config.js
```

---

## Setup & Running Locally

### Prerequisites
* [Node.js](https://nodejs.org/) (v16.x or higher)
* [MongoDB](https://www.mongodb.com/) (Atlas or local instance)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/H-vishwa/Car-Rental.git
   cd Car-Rental
   ```

### 1. Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install server dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend/` directory:
   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
   IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
   IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
   ```
4. Start the backend server:
   ```bash
   npm run server
   ```

### 2. Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd ../frontend
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `frontend/` directory:
   ```env
   VITE_BASE_URL=http://localhost:3000
   VITE_CURRENCY=₹
   ```
4. Start the local development server:
   ```bash
   npm run dev
   ```

---

## License
This project is licensed for educational purposes.

## Contact
For questions or support, visit the [repository](https://github.com/H-vishwa/Car-Rental) or contact [H-vishwa](https://github.com/H-vishwa).
