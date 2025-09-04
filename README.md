EventX Studio - Final Project Documentation

EventX Studio is a full-stack event management system designed to streamline event organization and ticketing. Built with React (frontend), Node.js/Express (backend), and MongoDB (database), it provides user authentication, event browsing, ticket booking, analytics, and admin management features.

Features

User authentication (login/register)
Browse events (upcoming, active, closed)
Event details (description, price, seats available, popularity)
Book tickets (seat selection, simulated payment)
View my tickets (with QR code for entry)
Notifications for upcoming events
Admin panel (event CRUD, analytics, ticket management)
Analytics charts (age, gender, interests, location)
Ticket management (allocate seats, generate QR codes for check-in)
Tech Stack

Frontend: React, Vite, Tailwind CSS, Chart.js
Backend: Node.js, Express, MongoDB, JWT
Database: MongoDB Atlas
Architecture

The frontend communicates with the backend via RESTful API endpoints.
The backend uses Express to handle requests and MongoDB for data storage.
Authentication is managed using JWT tokens.
Admin features are protected by role-based access control.


Setup & Deployment

Clone the repository: git clone https://github.com/KMX249/final_project_maim cd eventx-studio-starter

Install dependencies: Backend: cd api npm install Frontend: cd ../web npm install

Configure environment variables: Backend (api/.env): MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority Frontend (web/.env): VITE_API_BASE=https://your-backend-url/api

Run locally: Backend: npm run dev Frontend: npm run dev


The MongoDB Atlas database is pre-populated with sample users and events.
Connection string: mongodb+srv://instructor:1223334444@cluster0.whpbvkz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
To add more sample data, use the provided seed script (api/seed.js).
API Endpoints

/api/events - List events
/api/events/:id - Event details
/api/tickets/book - Book tickets
/api/tickets/me - My tickets
/api/analytics/summary - Analytics summary
/api/auth/login - Login
/api/auth/register - Register


Challenges & Solutions

Ensured secure authentication and role-based access for admin features.
Implemented real-time analytics and chart rendering for attendee insights.
Managed seat allocation and QR code generation for tickets.
Integrated MongoDB Atlas for scalable cloud database access.
Live Demo

Backend: <your backend demo URL>
Frontend: <your frontend demo URL>
Use provided credentials or register a new user to test the system.

Khalid
