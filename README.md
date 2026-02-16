# 3uck.store (private)

Privates Projekt zum Aufbau eines eigenen Store-Systems  
für **digitale 3D-Modelle** und **physische 3D-Prints**.

Kein Marktplatz.  
Keine Abhängigkeit.  
Volle Kontrolle über User, Stores und Daten.

---

## 🧠 Projekt-Ziel

- Eigene Stores pro User
- Eigene Domain / Slug (`domain/storeName`)
- Verkauf von:
    - digitalen 3D-Modellen
    - physischen Prints
- Saubere Ownership- & Permission-Logik
- Fokus auf **Kontrolle & Verständnis**, nicht auf Magie

---

## 🧱 Tech Stack (bewusst gewählt)

- **Next.js (App Router)**
- **Auth.js / NextAuth**
    - Google OAuth
    - eigene User-Tabelle
    - eigene DB-User-ID (nicht `sub`)
- **Supabase**
    - PostgreSQL
    - Server Actions mit Service Role Key
- **Zod**
    - Server-seitige Validierung
    - Single Source of Truth
- **shadcn/ui**
    - sauberes, konsistentes UI
- **TailwindCSS**

---

## 🔐 Auth – Wichtige Design-Entscheidungen

Dieses Projekt nutzt **keinen Starter-Auth blind**.

### Prinzipien:

- **Server ist die Wahrheit**
- Client wird **niemals** vertraut
- JWT enthält **explizit**:
    - `userId` → interne DB-ID
- OAuth Provider ID wird **separat** gespeichert

### Warum?

Framework-Abstraktionen sind bequem,  
aber bei Custom-Logik (Stores, Ownership) gefährlich.

Auth ist bewusst **explizit & verständlich** gehalten.

---

## 🗂 Datenmodell (vereinfacht)

```txt
users
- id (UUID, intern)
- provider_id (Google ID)
- email
- name

stores
- id
- user_id (Owner)
- name
- slug
- type
- is_active
```
