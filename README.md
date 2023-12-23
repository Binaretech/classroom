# CLASSROOM SERVICE WITHOUT NAME FOR NOW

# Classroom Service

Welcome to Classroom Service! This project is built using the Next.js and Expo stack for the frontend, with Tamagui and Solito for UI components, and NestJS for the backend.

## Getting Started

To get started with this project, you'll need to have Node.js and Yarn installed on your machine. Once you have those installed, you can clone this repository and run the following commands:

```bash
# Install dependencies
yarn
```

## Frontend Stack

The frontend of this project is built using the Next.js and Expo stack. Next.js is a React framework that allows for server-side rendering, while Expo is a set of tools and libraries for building native iOS and Android apps with React Native. Tamagui and Solito are UI component libraries that are used to build the user interface of the application.

## Backend Stack

The backend of this project is built using NestJS, a progressive Node.js framework for building efficient, scalable, and enterprise-grade server-side applications. NestJS provides a modular architecture that allows for easy organization of code and scalability of the application.

## Contributing

If you'd like to contribute to this project, please fork the repository and create a pull request with your changes. We welcome all contributions!

## Project Setup

To set up this project, follow these steps:

1. Create a project in Firebase and download the service account JSON file. This file should be saved as `serviceAccount.json`.

2. Copy the `.env.example` files as `.env` in the `apps/backend`, `apps/next`, and `apps/expo` directories, and fill in the necessary values.

3. Create a web application in Firebase and place the values in `apps/next/.env`.

4. Create Android and iOS applications in Firebase and place the files within `apps/expo`.

5. Install the dependencies with Yarn using the command `yarn`.

6. Within `packages/ui`, run `yarn build` to compile the components.## Project Setup

To set up this project, follow these steps:

1. Create a project in Firebase and download the service account JSON file. This file should be saved as `serviceAccount.json`.

2. Copy the `.env.example` files as `.env` in the `apps/backend`, `apps/next`, and `apps/expo` directories, and fill in the necessary values.

3. Create a web application in Firebase and place the values in `apps/next/.env`.

4. Create Android and iOS applications in Firebase and place the files within `apps/expo`.

5. Install the dependencies with Yarn using the command `yarn`.

6. Within `packages/ui`, run `yarn build` to compile the components.

7. Run `docker compose up -d` to start the backend with the database.

Follow these steps to correctly set up the project.

7. Run `docker compose up -d` to start the backend with the database.

Follow these steps to correctly set up the project.
