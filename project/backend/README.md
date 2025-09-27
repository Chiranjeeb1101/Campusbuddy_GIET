# CampusBuddy Backend

## Setup

1. Install Node 18+ (LTS recommended).
2. In `project/backend/`, run:

```bash
npm install
npm run dev
```

The API will start on `http://localhost:4000`.

## Environment variables

Create a `.env` file in `project/backend/` with:

```
PORT=4000
JWT_SECRET=change_me_super_secret
```

## Routes
- POST `/auth/register`
- POST `/auth/login`
- GET `/auth/me` (Bearer token)
- GET/POST `/alumni`
- GET/POST `/events`
- GET/POST `/mentorship`
- GET/POST `/donations` (auth required)
- GET/POST `/careers`

