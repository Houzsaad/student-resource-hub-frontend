# STUDENT RESOURCE HUB FRONTEND

A React frontend for the SRH - a platform where students and lecturers can upload, browse, and search academic resources.

## Tech Stack 

- React (Vite)
- Plain CSS
- JWT Authentication
- Fetch API

## Features 

- Browse and search resources from the live API
- Register and login with JWT auth
- Upload resources (authenticated users only)
- Auth-aware navigation - diffirent links for guests and logged-in users
- Loadin, error, and empty states handled throughout

## Connected Backend 

Django REST Framework API - [students-resources-hub] (https://github.com/Houzsaad/students-resources-hub)

## Getting Started

```bash
npm install 
npm run dev

PROJECT STRUCTURE

src/
├── components/
│   ├── Navbar.jsx
│   ├── ResourceCard.jsx
│   └── Layout.jsx
├── pages/
│   ├── ResourceList.jsx
│   ├── LoginForm.jsx
│   ├── RegisterForm.jsx
│   └── UploadForm.jsx
└── api.js
