# License Management System – Microservices (Separate Repos, No Submodules)

- **One repo per backend service** (auth-service, customer-service, etc.)
- **One main repo** (license-management-system) with **shared infra only**: docker-compose, h2-server, clone script, README. **No submodules** – each service is a fully independent repo.

---

## Target structure

```
License Management System/          ← folder on your PC
├── backend/
│   ├── auth-service/               ← own repo: auth-service
│   ├── customer-service/           ← own repo: customer-service
│   ├── subscription-pack-service/  ← own repo
│   ├── subscription-service/       ← own repo
│   ├── assignment-service/        ← own repo
│   ├── h2-server/                  ← part of main repo only
│   └── docker-compose.yml          ← part of main repo only
└── frontend/                        ← your frontend repo(s)
```

**On GitHub:** 6 repos total  
- 5 service repos: auth-service, customer-service, subscription-pack-service, subscription-service, assignment-service  
- 1 main repo: license-management-system (only docker-compose, h2-server, scripts, README – no submodules)

---

## Part 1: Create repos on GitHub

Create **6 new repositories** (all empty, no README):

| Repo name                  | Purpose                              |
|----------------------------|--------------------------------------|
| auth-service               | Auth microservice                    |
| customer-service           | Customer microservice                |
| subscription-pack-service  | Subscription pack microservice       |
| subscription-service       | Subscription microservice            |
| assignment-service         | Assignment microservice              |
| license-management-system  | Main repo – shared infra only        |

Example user: **sandeepmynt-ux**.

---

## Part 2: Restructure folders

**Bash:**
```bash
cd "D:\Projects\Internal\License Management System"
chmod +x step2-restructure.sh
./step2-restructure.sh
```

**PowerShell:** `.\step2-restructure.ps1`

Result: `backend/` and `frontend/` under License Management System; `backend/` contains all 5 services + h2-server + docker-compose.yml.

---

## Part 3: Push each service to its own repo

Create the 5 service repos on GitHub first, then:

```bash
cd "D:\Projects\Internal\License Management System"
chmod +x step3-git-init-push.sh
./step3-git-init-push.sh https://github.com/sandeepmynt-ux
```

Each service (auth-service, customer-service, etc.) is pushed to its own repo.

---

## Part 4: Main repo (shared infra only – no submodules)

Create the **license-management-system** repo on GitHub (empty). Then:

```bash
cd "D:\Projects\Internal\License Management System"
chmod +x step4-main-repo-only.sh
./step4-main-repo-only.sh https://github.com/sandeepmynt-ux
```

This repo will contain **only**:
- backend/docker-compose.yml  
- backend/h2-server/  
- backend/README.md  
- frontend/ (placeholder)  
- README.md, .gitignore, GITHUB-REPOS-SETUP.md  
- clone-backend-repos.sh, step2, step3, step4 scripts  

**No** service code and **no** submodules – pure microservices layout.

---

## Getting everything on another machine

1. Clone the main repo:
   ```bash
   git clone https://github.com/sandeepmynt-ux/license-management-system.git
   cd license-management-system
   ```

2. Clone all backend service repos into backend/:
   ```bash
   ./clone-backend-repos.sh https://github.com/sandeepmynt-ux
   ```

3. Run backend:
   ```bash
   cd backend && docker compose up -d --build
   ```

---

## Summary

| Repo                      | Contains                                      |
|---------------------------|-----------------------------------------------|
| auth-service              | Auth service code only                        |
| customer-service          | Customer service code only                    |
| subscription-pack-service | Subscription pack service code only           |
| subscription-service      | Subscription service code only                |
| assignment-service        | Assignment service code only                  |
| license-management-system | docker-compose, h2-server, clone script, docs |

No submodules – each service is a separate repo; main repo is shared infra only.
