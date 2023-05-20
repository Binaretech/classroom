---
sidebar_position: 1
---

# Classroom Project: Introducción

¡Bienvenido a la guía para desarrolladores del proyecto Classroom! Esta guía te llevará a través del proceso de configuración y contribución al Classroom, una plataforma poderosa diseñada para ayudar a los educadores a crear y gestionar cursos en línea. Ya seas un desarrollador experimentado o recién estés empezando, esta guía te proporcionará los conocimientos necesarios para sumergirte en el proyecto.

El proyecto Classroom está estructurado como un monorepo, lo que significa que todo el código está organizado en un único repositorio. El monorepo contiene varios componentes que trabajan juntos para proporcionar una experiencia de aprendizaje en línea completa. Estos componentes incluyen:

1. **Auth Gateway y Main API Service (Golang)**: Este componente se encarga de la autenticación y sirve como el servicio principal de API para el proyecto Classroom. Proporciona la infraestructura necesaria para la gestión de usuarios y la administración de cursos.

2. **Módulo de Exámenes y Notificaciones (NestJS)**: Este módulo se centra en el manejo de exámenes y funcionalidades de notificaciones dentro del proyecto Classroom. Permite a los educadores crear y gestionar cuestionarios, tareas y facilita la comunicación a través de notificaciones entre estudiantes e instructores.

3. **Frontend Web (Next.js)**: El componente de frontend web es responsable de crear una interfaz intuitiva y fácil de usar para educadores y estudiantes. Utiliza Next.js, un popular framework de React, para ofrecer un entorno de aprendizaje receptivo y atractivo.

4. **Aplicación Móvil (Flutter)**: El proyecto Classroom también ofrece una aplicación móvil para ampliar la experiencia de aprendizaje más allá de los navegadores de escritorio. Construida con Flutter, un framework multiplataforma, la aplicación móvil proporciona una forma fluida para que los estudiantes accedan al contenido del curso e interactúen con sus compañeros y instructores sobre la marcha.

Para agilizar el proceso de desarrollo, recomendamos encarecidamente el uso de Docker y Docker Compose. Estas herramientas proporcionan un entorno estandarizado y reproducible para ejecutar el proyecto Classroom localmente.

A lo largo de esta guía, cubriremos los pasos esenciales para configurar el entorno de desarrollo, ejecutar los componentes del proyecto y realizar contribuciones al código base de Classroom. Al final de esta guía, tendrás los conocimientos y recursos necesarios para contribuir activamente al proyecto Classroom y ayudar a dar forma al futuro de la educación en línea.

¡Sumergámonos y comencemos con la configuración del entorno de desarrollo para el proyecto Classroom!