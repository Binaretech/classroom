---
sidebar_position: 3
---
# Setting up Development Environment

Before you start contributing to the Classroom project, it's important to properly set up your development environment. Follow these steps to configure your development environment and run the Classroom project.

## Software Requirements

Make sure you have the following software installed on your system:

- Node.js (not strictly required)
- npm (not strictly required)
- Flutter
- Docker
- Docker Compose

## Configuring the Classroom Project

1. Clone the Classroom project repository from GitHub:

```
git clone https://github.com/Binaretech/classroom.git
```

2. Navigate to the Classroom project directory:

```
cd classroom
```

3. Copy the example environment variables files located at the root of the project and in the mobile app directory:

```
cp .env.example .env
cp mobile/.env.example mobile/.env
```

4. Open the `.env` file and configure the environment variables according to your needs. Adjust the settings based on your development environment.

5. Install the required dependencies by running the following command:

```
npm install
```

If you don't have Node.js and npm installed, you can use the following Docker command to install the dependencies:

```
docker-compose run --rm docs npm install
```

6. Run the Docker Compose command to build and run the project containers:

```
docker-compose up -d --build
```

This command will build and run all the services of the Classroom project, including the Auth Gateway, Main API Service, Notifications, Exams, Docs, and Web.

7. Once the containers are built and running, you can access the Classroom project in your web browser by entering the following URL:

```
http://localhost:3000
```

## Configuring Flutter and Firebase

Before running the Flutter mobile application, you need to configure Firebase. Follow these steps to set up Firebase:

1. Install the Flutter SDK by following the specific instructions for your operating system. You can find installation instructions on the official Flutter website.

2. Set up a Firebase project and obtain the Firebase configuration details, including the Firebase project ID, API key, and other necessary credentials.

3. Configure the Flutter project with Firebase by adding the Firebase configuration details to the appropriate files. Refer to the Flutter and Firebase documentation for detailed instructions on how to configure Firebase for your Flutter project.

8. For the Flutter mobile application, configure your emulator or connected device and use the following command from the project's root directory:

```
cd mobile
flutter run
```

This will compile and run the Flutter mobile application.

## Additional Resources

For more information on working with the Classroom project, refer to the project's documentation and relevant resources. The documentation provides in-depth information on different aspects of the Classroom project and how to work with its various components.

Now you're ready to make modifications and contributions to the Classroom project!