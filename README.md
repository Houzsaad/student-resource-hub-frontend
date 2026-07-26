# Student Resource Hub

A full-stack web application where students and lecturers can upload, browse, search, and download academic resources.

**Live Demo:** https://srh-frontend.vercel.app  
**Backend API:** https://student-resource-hub-qx57.onrender.com  
**Hire me:** https://fiverr.com/s/Q78QpXP

---

## What it does

- Students and lecturers register and login with JWT authentication
- Browse and search academic resources by title
- Upload resources (PDFs, images, videos) with category and description
- Download resources with download counter
- Comment on resources
- Auth-aware navigation — guests see different links from logged-in users
- Protected routes — upload, comment and download requires authentication
- User profile page showing name, role, level and join date

---

## Tech Stack

**Frontend**
- React 18 (Vite)
- React Router v6
- Context API for global auth state
- Custom hooks
- Plain CSS

**Backend**
- Django 5.2
- Django REST Framework
- Simple JWT authentication
- PostgreSQL
- Cloudinary (file storage)
- Deployed on Render

---

## Project Structure

```text
src/
├── api.js
├── context/
│   └── AuthContext.jsx
├── hooks/
│   └── useFetch.js
└── components/
    ├── Navbar.jsx
    ├── Layout.jsx
    ├── ResourceCard.jsx
    ├── ResourceDetail.jsx
    ├── ResourceList.jsx
    ├── LoginForm.jsx
    ├── RegisterForm.jsx
    ├── UploadForm.jsx
    ├── Profile.jsx
    ├── Comments.jsx
    └── DownloadResource.jsx
```


## Login Page
<p align="center">
    <img src="images/registration.png" width="250"/>
</p>

## Upload Resource Page
<p align="center">
    <img src="Pictures/Annotation 2026-07-06 125416.png" width="250"/>
</p>


## Resources List Page
<p align="center">
    <img src="Pictures/Annotation 2026-07-06 125240.png" width="250"/>
</p>


## Profile Page
<p align="center">
    <img src="Pictures/Annotation 2026-07-06 130240.png" width="250"/>
</p>


## Resource Details Page
<p align="center">
    <img src="Pictures/Annotation 2026-07-06 125333.png" width="250"/>
</p>


![alt text](<Annotation 2026-07-05 001737.png>)

![Registration Page](<images/Annotation 2026-07-22 164159.png>)

![Login Page](<images/Annotation 2026-07-05 001737-1.png>)

![Resources Page](<images/Annotation 2026-07-06 130240.png>)

![Upload Page](<images/Annotation 2026-07-06 125240-1.png>)

![Profile Page](<images/Annotation 2026-07-06 125240-2.png>)

![Resource Detail Page](<images/Annotation 2026-07-06 125333.png>)

## Running Locally

```bash
# Install dependencies
npm install

# Create .env file
VITE_API_URL=http://127.0.0.1:8000/api

# Start development server
npm run dev

Backend Repository
Django REST Framework API → 
student-resource-hub

Features in Progress
Edit and delete own resource
Sees the list of resources you upload in your profile

Author
Huzaifa Sa'ad

Self-taught fullstack developer — Django + React

📧 houzsaad@gmail.com
🐙 github.com/Houzsaad
💼 fiverr.com/s/Q78QpXP