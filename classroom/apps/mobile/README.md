# Classroom Mobile App

[![Flutter CI](https://github.com/Binaretech/classroom-mobile/actions/workflows/main.yml/badge.svg)](https://github.com/Binaretech/classroom-mobile/actions/workflows/main.yml)

## Arquitecture

The full classroom is made up with three services routed by traefik, a mobile and web app, two databases and a cache store

This repository contains the mobile app build with flutter

The following image describe the full arquitecture and the tecnologies used
![arquitecture](https://github.com/Binaretech/classroom/blob/main/img/classroom-diagram.png?raw=true)

Full source is available ![here](https://github.com/Binaretech/classroom)

## Getting Started
1. Configure your environment to run flutter apps, you can find the instructions ![here](https://flutter.dev/docs/get-started/install)
2. Install dependencies with `flutter pub get`
3. Configure firebase for your app, you can find the instructions ![here](https://firebase.google.com/docs/flutter/setup)
4. Configure environment variables copying the `.env.example` file and renaming it to `.env`
5. Get started with the full backend architecture ![here](https://github.com/Binaretech/classroom)
6. Run the app with `flutter run`


