# License Management – React Frontend

Simple React app (Vite + React 18 + React Router) for the License Management backend microservices.

## Setup

```bash
cd D:\projects\internal\frontend
npm install
```

## Run

Start the backend services (auth on 8081, customer 8082, pack 8083, subscription 8084, assignment 8085), then:

```bash
npm run dev
```

Open http://localhost:5173

## Env

Optional `.env` (see `.env.example`):

- `VITE_AUTH_URL` – auth-service (default http://localhost:8081)
- `VITE_CUSTOMER_URL` – customer-service (default http://localhost:8082)
- `VITE_PACK_URL` – subscription-pack-service (default http://localhost:8083)
- `VITE_SUBSCRIPTION_URL` – subscription-service (default http://localhost:8084)
- `VITE_ASSIGNMENT_URL` – assignment-service (default http://localhost:8085)

## Pages

- **Login** – Admin login (JWT from auth-service)
- **Dashboard** – Welcome after login
- **Customers** – List, create, delete customers (customer-service)
- **Packs** – List, create, delete subscription packs (subscription-pack-service)
- **Subscriptions** – List by status, approve requested (subscription-service)

## Build

```bash
npm run build
npm run preview
```
