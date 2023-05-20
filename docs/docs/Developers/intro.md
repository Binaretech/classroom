---
sidebar_position: 1
---

# The Classroom Project: Introduction

Welcome to the developer's guide for the Classroom project! This guide will walk you through the process of setting up and contributing to the Classroom, a powerful platform designed to help educators create and manage online courses. Whether you're a seasoned developer or just getting started, this guide will provide you with the knowledge you need to dive into the project.

The Classroom project is structured as a monorepo, meaning that all the code is organized into a single repository. The monorepo contains several components that work together to provide a comprehensive online learning experience. These components include:

1. **Auth Gateway and Main API Service (Golang)**: This component handles the authentication and serves as the main API service for the Classroom project. It provides the necessary infrastructure for user management and course administration.

2. **Exams and Notifications Module (NestJS)**: This module focuses on handling exams and notification functionalities within the Classroom project. It allows educators to create and manage quizzes, assignments, and facilitates communication through notifications between students and instructors.

3. **Web Frontend (Next.js)**: The web frontend component is responsible for creating an intuitive and user-friendly interface for educators and students. It leverages Next.js, a popular React framework, to deliver a responsive and engaging learning environment.

4. **Mobile App (Flutter)**: The Classroom project also offers a mobile app to extend the learning experience beyond desktop browsers. Built with Flutter, a cross-platform framework, the mobile app provides a seamless way for students to access course content and interact with their peers and instructors on the go.

To streamline the development process, we highly recommend using Docker and Docker Compose. These tools provide a standardized and reproducible environment for running the Classroom project locally.

Throughout this guide, we will cover the essential steps for setting up the development environment, running the project components, and making contributions to the Classroom codebase. By the end of this guide, you will have the knowledge and resources to actively contribute to the Classroom project and help shape the future of online education.

Let's dive in and get started with setting up the development environment for the Classroom project!