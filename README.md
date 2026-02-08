# License Management System

**Microservices architecture** – each backend service is a **separate GitHub repo**. This repo holds only shared infra (docker-compose, h2-server, scripts) and docs. No submodules.

## Structure

```
license-management-system/         ← this repo (shared infra only)
├── backend/
│   ├── docker-compose.yml
│   ├── h2-server/
│   ├── auth-service/             ← clone from repo auth-service
│   ├── customer-service/         ← clone from repo customer-service
│   ├── subscription-pack-service/
│   ├── subscription-service/
│   └── assignment-service/
└── frontend/                      ← your frontend repo(s) go here
```

## First-time setup (get all backend services)

1. Clone this repo:
   ```bash
   git clone https://github.com/sandeepmynt-ux/license-management-system.git
   cd license-management-system
   ```

2. Clone each backend service into `backend/`:
   ```bash
   chmod +x clone-backend-repos.sh
   ./clone-backend-repos.sh https://github.com/sandeepmynt-ux
   ```

3. Run backend with Docker:
   ```bash
   cd backend
   docker compose up -d --build
   ```

## Backend services (separate repos)

| Service                   | Repo                         | Port |
|---------------------------|------------------------------|------|
| auth-service              | auth-service                 | 8081 |
| customer-service          | customer-service             | 8082 |
| subscription-pack-service| subscription-pack-service    | 8083 |
| subscription-service     | subscription-service         | 8084 |
| assignment-service       | assignment-service           | 8085 |

## Setup from scratch

See **[GITHUB-REPOS-SETUP.md](./GITHUB-REPOS-SETUP.md)** for creating each service repo and the main repo (no submodules).
