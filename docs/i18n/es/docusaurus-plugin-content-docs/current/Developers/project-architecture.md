---
sidebar_position: 2
---

# Project Architecture

The Classroom project is designed following a distributed architecture and utilizes multiple interconnected services to provide a comprehensive and dynamic online learning experience. Below is an overview of the general architecture of the project and how the different components relate to each other.

### Routing with Traefik

The entire system is connected through Traefik, an application-level router and reverse proxy. Traefik is used to route incoming requests to the various applications and services of the project. Additionally, Traefik's "forwardAuth" middleware is employed to perform authentication verification with the Auth service before forwarding requests to the respective services.

### Authentication Service (Auth)

The Authentication service is responsible for handling user authentication and authorization. It utilizes MongoDB as the database for storing user information and Redis for storing sessions and active tokens. The Auth service manages token generation and validation, allowing users to authenticate within the system and access the different services.

### Main Service (API Service)

The Main service, also known as the API Service, serves as the core of the Classroom project. It is built using the Go programming language and employs a PostgreSQL database for data storage. This service handles the main logic of the system, such as course management, user management, assignments, and student progress tracking. It provides an interface for the various modules and applications to access data and perform relevant operations.

### Exams Service (Exams Module)

The Exams service is responsible for managing the creation, administration, and completion of exams within the Classroom system. It utilizes MongoDB as the database for storing exam-related data, including questions, answers, and student results. This service provides an interface for teachers to create exams, for students to take exams, and for automated grading.

### Notifications Service (Messaging Module)

The Notifications service, also known as the Messaging Module, handles the management and sending of notifications to users within the Classroom system. It utilizes Redis as the database for listening to various events and sending real-time notifications. This service enables the sending of messages, reminders, and updates to users, keeping them informed about relevant news and events within the Classroom system.

The architecture of the Classroom project is based on the distribution of responsibilities and communication between the different services using standard protocols. This modular structure allows for proper scalability, maintainability, and the ability to add new services and functionalities in the future.

In the following sections, more details will be provided about the configuration and operation of each of the aforementioned services and components.