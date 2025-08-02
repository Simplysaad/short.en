# Short.en

A full-stack URL shortener with analytics, user authentication, and device/geo targeting. Built with React (Vite) for the frontend and Node.js/Express/MongoDB for the backend.

## Features
- Shorten URLs with optional custom aliases
- User registration and login (session-based and API key)
- Password-protected links
- Expiry by date or click count
- Device and geo-targeting for links
- Analytics: click tracking, tags, and more
- Admin dashboard (WIP)

## Tech Stack
- **Frontend:** React, Vite, TailwindCSS, Axios
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Authentication:** express-session, connect-mongo, bcryptjs

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB instance (local or cloud)

### Environment Variables
Create a `.env` file in the `Backend/` directory with:
```
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_session_secret
BASE_URL=https://short-en.onrender.com/
```

### Installation

#### Backend
```bash
cd Backend
npm install
npm run dev
```

#### Frontend
```bash
cd Frontend
npm install
npm run dev
```

---

## API Documentation

### Authentication

#### Register
- **POST** `/auth/register`
- **Body:** `{ name, emailAddress, password }`
- **Response:** `{ success, message, data: { newUser } }`

#### Login
- **POST** `/auth/login`
- **Body:** `{ emailAddress, password }`
- **Response:** `{ success, message, data: { currentUser } }`

---

### URL Shortening

#### Create Short Link
- **POST** `/`
- **Body:**
  - `originalUrl` (string, required)
  - `preferredText` (string, optional)
  - `expiryDate` (date, optional)
  - `expiryClicks` (number, optional)
- **Response:** `{ success, message, data: { newLink } }`

#### Get All Links
- **GET** `/`
- **Response:** `{ success, message, data: { allLinks } }`

#### Redirect to Original URL
- **GET** `/:shortLinkId`
- **Response:** Redirects to the original URL

---

### Link Model
- `originalUrl`: Original URL
- `shortLinkId`: Unique short code
- `preferredText`: Custom alias
- `expiryDate`: Expiry date
- `expiryClicks`: Max allowed clicks
- `tags`: Array of tags
- `expiryType`: "never", "expiryClicks", or "expiryDate"
- `password`: (hashed) password for protected links
- `clickCount`: Number of times accessed
- `passwordProtected`: Boolean
- `geoTargeting`: `{ enabled, locations }`
- `deviceTargeting`: `{ enabled, devices }`
- `shortLink`: Virtual, full short URL

---

## Frontend Usage
- Main form: Enter original URL and (optionally) preferred text
- Displays the generated short link
- (WIP) Admin dashboard and analytics

---

## Development
- Backend: `cd Backend && npm run dev`
- Frontend: `cd Frontend && npm run dev`

---

## License
MIT

---

## Author
[saad idris](https://github.com/simplysaad)
