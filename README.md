# EduCat - Modern Moodle-like Course Management Platform

EduCat is a web-based learning management system inspired by Moodle, designed to help students, teachers, and administrators manage and participate in online courses efficiently.

## Features

### For Students

- **Course Enrollment:** Join courses using invite codes or links.
- **Class Dashboard:** View all enrolled classes, search, and filter.
- **Class Details:** See class information, participants, and grade structure.
- **Grade Viewing:** Check grades and feedback for each course.
- **Notifications:** Receive updates and announcements from teachers.
- **Profile Management:** Edit personal information and map student ID.

### For Teachers

- **Course Creation:** Create new classes and generate invite codes/links.
- **Participant Management:** View and manage enrolled students.
- **Grade Structure:** Define, edit, and reorder grading components.
- **Grade Board:** Upload, edit, and export student grades (CSV support).
- **Notifications:** Send announcements to students.

### For Administrators

- **User Management:** View, search, and manage all users (students/teachers), including banning users and mapping student IDs.
- **Class Management:** View, filter, and manage all classes in the system.
- **Detailed Views:** Access detailed information for any user or class.

## Technology Stack

- **Frontend:** React, Vite, React Bootstrap, Tailwind CSS
- **State Management:** React Context API
- **Routing:** React Router
- **Authentication:** Custom context with role-based guards
- **CSV Handling:** react-csv, file upload/download for grades and student lists

## Getting Started

1. Install dependencies: `npm install`
2. Start the development server: `npm run dev`
3. Access the app at `http://localhost:5173`

## Project Structure

- `src/pages/` - Main pages for students, teachers, and admins
- `src/components/` - Reusable UI components (NavBar, ClassCard, etc.)
- `src/context/` - Authentication and state management
- `src/service/` - API service functions
- `src/styles/` - CSS and Tailwind styles

---

This project is for educational purposes and demonstrates a modern, full-featured course management platform similar to Moodle, with a focus on usability and role-based access.
