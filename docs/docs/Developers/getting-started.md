---
sidebar_position: 3
---

# Setting up Development Environment with Docker

Before you start contributing to the Classroom project, it's important to properly set up your development environment. Using Docker and Docker Compose will simplify the configuration process and ensure a consistent development environment for all project components. Follow these steps to configure your development environment with Docker.

### Software Requirements

Make sure you have the following software installed on your system:

- Docker
- Docker Compose

### Configuring Docker and Docker Compose

Docker and Docker Compose are key tools for running the Classroom project locally. Follow these steps to configure Docker and Docker Compose:

1. Step 1: Download and install Docker according to the specific instructions for your operating system. You can find installation instructions on the official Docker website.

2. Step 2: Download and install Docker Compose following the specific instructions for your operating system. You can find installation instructions on the official Docker Compose website.

3. Step 3: Verify that Docker and Docker Compose are installed correctly by running the following commands in your terminal:

```
docker --version
docker-compose --version
```

### Configuring the Classroom Project with Docker Compose

Once you have Docker and Docker Compose set up, you can proceed to configure the Classroom project using Docker Compose. Follow these steps:

1. Step 1: Clone the Classroom project repository from GitHub:

```
git clone https://github.com/Binaretech/classroom.git
```

2. Step 2: Navigate to the Classroom project directory:

```
cd classroom
```

3. Step 3: Copy the example environment variables file:

```
cp .env.example .env
```

4. Step 4: Open the `.env` file and configure the environment variables according to your needs. Make sure to adjust the settings based on your development environment.

5. Step 5: Run the Docker Compose command to build and run the project containers:

```
docker-compose up --build
```

This command will build and run all the services of the Classroom project, including the Auth Gateway, API Service, exams module, web frontend, and mobile app.

6. Step 6: Once the containers are built and running, you can access the Classroom project in your web browser by entering the following URL:

```
http://localhost:3000
```

That's it! Now you have your development environment configured with Docker, and the Classroom project running locally. Docker containers ensure consistency and easy replication of the development environment across different systems.

Remember, you can make modifications and contributions to the code in the respective project directories within the cloned repository.

If you want to stop the containers at any time, simply press `Ctrl + C` in the terminal where the containers are running, and then you can use the `docker-compose down` command to stop and remove the containers.

Now you're ready to start contributing to the Classroom project!