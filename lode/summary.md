# Project Summary

This personal blog is built on **Next.js 15 (App Router)** with **Tailwind CSS v4**.
It includes a secure admin dashboard at `/admin` (protected via middleware and `admin_token` cookie), utilizing **shadcn/ui** and a **TipTap** rich-text editor for article CRUD. 
Articles are stored in a **SQLite** database accessed via **Prisma 7** using the `better-sqlite3` driver adapter.
The project is container-ready with a `Dockerfile` and `docker-compose.yml`, and supports local development commands via a `Makefile`.
