# Student Job Tracker

A simple and responsive job tracking website to help you keep track of companies you've applied to, roles, statuses, application links, and more. Built using the MERN stack.

## Features

- Add, update, or delete job applications
- Sort jobs by application date (latest first)
- Responsive design for desktop and mobile
- Clean, intuitive UI


## Tech Stack

**Frontend:**
- React
- Tailwind CSS
- Axios
- Vercel (for deployment)

**Backend:**
- Node.js
- Express.js
- MongoDB Atlas(Mongoose)
- Render (for deployment)

## Local Setup Instructions

### 1. Setup Frontend

- `git clone https://github.com/EdigaVamshi/jobtracker-client.git`
- `cd jobtracker-client`
- `npm install`
- `npm run dev`

### 2. Setup Backend
- `git clone https://github.com/EdigaVamshi/jobtracker-server.git`
- `cd jobtracker-server`
- `npm install`
- Create a `.env` file in the folder

### NOTE: Use your localhost:XXXX while fetching data in the frontend in local environment i.e `await axios.method('http://localhost:XXXX/applied-jobs', formData)`
