# DevTrack - Developer Portfolio & Progress Tracker

DevTrack is a comprehensive, full-stack student developer platform designed to track coding progress, manage projects, build resumes, and organize hackathon achievements. It serves as a unified developer command center.

## 🚀 Features & Modules

- **Module 1**: User Profile & Activity Hub (Profile, Developer Links, Hackathons)
- **Module 2**: Skills & Learning Tracker (Learning resources, practice problems, skill progression)
- **Module 3**: Coding Platform Integrations (Codeforces connection, manual tracking)
- **Module 4**: Project Management & Portfolio (Project tracking, task milestones, skill mapping)
- **Module 5**: Certificates & Achievements (Verified credentials, hackathon honors)
- **Module 6**: Resume Builder & Portfolio Generator (Smart recommendations, PDF export)
- **Module 7**: Placement Readiness (🔒 Coming Soon in future development)
- **Module 8**: Master Dashboard (Aggregated analytics, smart next steps, global timeline)

## 🛠️ Technology Stack & Architecture

This project is built heavily focusing on **Object-Oriented Programming (OOP) in Java**.

### Backend (Java Spring Boot)
- **Language**: Java 17+
- **Framework**: Spring Boot 3
- **Data Persistence**: Spring Data JPA & Hibernate
- **Database**: MySQL / PostgreSQL
- **Security**: JWT Authentication
- **OOP Highlights**: Extensive use of Base Entities for inheritance (`@MappedSuperclass`), polymorphic interfaces (`CodingPlatformIntegration`), strict encapsulation, and deep relational composition (`@OneToMany`, `@ManyToMany`).

### Frontend (React.js)
- **Library**: React 19 (Vite)
- **Styling**: Vanilla CSS (Global Dark Theme, index.css)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **PDF Generation**: Frontend-driven React PDF rendering

## 🏗️ Setup Instructions

### Backend Setup
1. Navigate to the `backend` directory: `cd backend`
2. Ensure you have a running MySQL instance and update `application.properties` if your credentials differ from standard root defaults.
3. Run the Spring Boot application: `mvn spring-boot:run`
   - Hibernate will automatically create the necessary schema across all 15+ OOP entities.

### Frontend Setup
1. Navigate to the `frontend` directory: `cd frontend`
2. Install dependencies (use legacy peer deps if Three.js conflicts arise): `npm install --legacy-peer-deps`
3. Start the dev server: `npm run dev`

## 🔮 Future Scope
- Implementation of the **Placement Readiness** module (Module 7).
- Full deployment of the public `devtrack/profile/{username}` route.
- Deep integration with external APIs for automatic project and repository fetching.
