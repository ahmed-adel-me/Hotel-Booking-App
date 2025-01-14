# Hotel Booking App

This project is a feature-rich hotel booking web application built with **Next.js** and **Supabase**. It empowers users to browse, book, and manage hotel reservations seamlessly. With integrated **NextAuth.js** for authentication and a modern responsive design, this app provides a smooth user experience across all devices.

---

## Demo

Explore the live demo of the project:
[Demo Link](https://hotel-6ext17aq7-ahmeds-projects-4256c8e5.vercel.app)

---

![Hotel Booking App Screenshot 1](https://github.com/user-attachments/assets/e58d8504-7133-4c47-87d0-a3c413a6f561)
![Hotel Booking App Screenshot 2](https://github.com/user-attachments/assets/e47cf412-7068-4a54-b943-a18194ec0a35)

---

## Features

- **User Authentication**: Secure sign-in using Google OAuth.
- **Browse Hotels**: Explore available hotels and rooms with detailed descriptions and images.
- **Booking System**: Real-time hotel room booking powered by Supabase.
- **Responsive Design (Future Improvement)**: Planned enhancement to optimize the app for mobile, tablet, and desktop devices.

---

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Supabase account
- Google OAuth credentials

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ahmed-adel-me/hotel-app.git
   ```

2. Navigate to the project directory:
   ```bash
   cd hotel-app
   ```

3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Environment Variables

Create a `.env.local` file in the root of the project and configure the following environment variables. Replace `<value>` with your actual credentials.

```env
SUPABASE_URL=<your-supabase-url>
SUPABASE_KEY=<your-supabase-key>
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<your-nextauth-secret>
AUTH_GOOGLE_ID=<your-google-client-id>
AUTH_GOOGLE_SECRET=<your-google-client-secret>
```
---

## Running the Project

1. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/)
- **Database**: [Supabase](https://supabase.com/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)

