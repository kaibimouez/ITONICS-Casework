# 🚀 ITONICS Case Work – Angular 19+ Application

This project is a role-based user management system built with Angular 19+, Angular Material, NgRx for state management, and JSON Server as a mock backend.

It fulfills the requirements for an ITONICS front-end assignment, including secure login, role & permission-based access, and dynamic UI navigation.

---

## 📦 Features

- 🔐 **Login** with username & password
- 🧑‍💼 **User Management**
  - View users (with permission)
  - Create, edit, delete users (with role assignment)
  - Prevent edit/delete of `superadmin`
- 🛡️ **Role Management**
  - Create, update, delete roles
  - Assign permissions to roles
  - Block deletion of in-use roles
- 🧭 **Navigation & Guarding**
  - Side nav with links based on permissions
  - Route guards based on permission or role
- 🌐 **Mock Backend**
  - Powered by JSON Server (`db.json`)
- 🎨 **UI Framework**
  - Angular Material
---

## 📁 Folder Structure

```
src/
├── app/
│   ├── core/              # Shared models, services, guards, state
│   │   ├── models/        # Interfaces used across the app
│   │   ├── services/      # Reusable services
│   │   ├── guards/        # Route guards (AuthGuard, SuperAdminGuard, PermissionGuard)
│   │   ├── state/         # Global NgRx state
│   ├── features/
│   │   ├── auth/          # Login page + NgRx auth state
│   │   ├── users/         # User dialog + list
│   │   ├── roles/         # Role dialog + list
│   ├── layout/            # App layout with side nav
│   └── app.routes.ts      # Route declarations
```

---

## 🧑‍💻 Setup & Run

### ✅ 1. Clone the repo

```bash
git clone https://github.com/kaibimouez/ITONICS-Casework.git   
cd ITONICS-Casework
```

### ✅ 2. Install Angular dependencies

```bash
cd user-management
npm install
```

### ✅ 3. Install and Run mock backend (JSON Server)
### ✅ 3a. Install mock backend dependencies

install mock-server dependencies:

```bash
cd mock-server
npm install
```
### ✅ 3b. Run mock backend (JSON Server)

```bash
npm start
```

### ✅ 4. Start Angular frontend

```bash
npm start
```

Open in browser:

```
http://localhost:4200
```

---

## 👤 Default Accounts

| Role        | Username     | Password   |
|-------------|--------------|------------|
| Super Admin | superadmin   | superadmin |

🛑 Superadmin **cannot be edited or deleted**.

---

## 📄 Permissions Used

| ID | Permission Name   |
|----|--------------------|
| 1  | view_users         |
| 2  | create_users       |
| 3  | edit_users         |
| 4  | delete_users       |

Roles assign combinations of these permission IDs.

---

## 🧹 Git Best Practices Followed

- `.gitignore` excludes `node_modules`, `dist`, and `env` files
- Clean commit history
- Modular structure by feature
- README and comments for context

---

## 📄 License

MIT – Use freely for educational or professional purposes.
