# License Management System – Backend

Backend microservices for the License Management System. Each service has its own GitHub repo and is included here as a **Git submodule** (or as a normal folder if you haven’t set up submodules yet).

## Services (own repos)

| Service | Repo | Port |
|---------|------|------|
| auth-service | `auth-service` | 8081 |
| customer-service | `customer-service` | 8082 |
| subscription-pack-service | `subscription-pack-service` | 8083 |
| subscription-service | `subscription-service` | 8084 |
| assignment-service | `assignment-service` | 8085 |

Shared H2 database: `h2-server/` (TCP on 9092). All services use one H2 instance defined in `docker-compose.yml`.

## Run with Docker

From this folder (`backend/`):

```bash
docker compose up -d --build
```

## Run locally (without Docker)

1. Create `D:\projects\internal\data` (for H2 file DB).
2. Start each service (e.g. `mvn spring-boot:run` in each service directory). Start auth-service first.

See parent repo’s **GITHUB-REPOS-SETUP.md** for how the main folder and per-service repos are set up.
