🎨 Overview

This is a modern Angular frontend for the Flight Booking system.
It communicates with backend microservices only via API Gateway.

✨ Features
👤 User

Sign up / Sign in

Search flights

Book tickets

View booked tickets

Change password

🧑‍✈️ Admin

Add flights

Delete flights

View flight inventory

Admin-only navigation

🔐 Frontend Security

Role-based UI rendering

Admin routes hidden from users

JWT stored as HTTP-only cookie

Backend remains final authority

🧭 Routing Design
Route	Access
/	Public
/signin	Public
/signup	Public
/change-password	Authenticated
/tickets	User
/addFlights	Admin
🧰 Tech Stack (Frontend)

Angular 17+

Standalone Components

Reactive Forms

RxJS

Bootstrap 5

Material Icons

▶️ How to Run
npm install
ng serve


Open:

http://localhost:4200

🧩 Frontend Architecture
Components
   |
Services (HTTP)
   |
API Gateway (8765)
   |
Microservices

🗂 Frontend Folder Structure
src/app/
├── components
│   ├── signin
│   ├── signup
│   ├── flight-search
│   ├── ticket-booking
│   ├── change-password
│   └── admin-flight
├── services
│   ├── auth-service
│   ├── flight-service
│   └── ticket-service
├── enums
├── guards
└── app.routes.ts

🧠 Key Frontend Highlights

Standalone Angular components

Enum-based role handling

AsyncPipe + Observables

Clean navbar role logic

Graceful fallback handling

Production-style routing
