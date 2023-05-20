# Arquitectura del Proyecto

El proyecto Classroom está diseñado siguiendo una arquitectura distribuida y utiliza varios servicios interconectados para brindar una experiencia de aprendizaje en línea completa y dinámica. A continuación, se describe la arquitectura general del proyecto y cómo se relacionan los diferentes componentes.

![architecture](/img/clasroom-diagram.png)

### Enrutamiento con Traefik

Todo el sistema está conectado a través de Traefik, un enrutador de nivel de aplicación y balanceador de carga inverso. Traefik se utiliza para dirigir las solicitudes entrantes a las diferentes aplicaciones y servicios del proyecto. Además, se utiliza el middleware de Traefik, "forwardAuth", para realizar la verificación de autenticación con el servicio Auth antes de redirigir las solicitudes a los servicios correspondientes.

### Servicio de Autenticación (Auth)

El servicio de autenticación se encarga de manejar la autenticación y autorización de los usuarios. Utiliza MongoDB como base de datos para almacenar información de usuarios y Redis para almacenar sesiones y tokens activos. El servicio Auth gestiona la generación y validación de tokens de acceso, permitiendo a los usuarios autenticarse en el sistema y acceder a los diferentes servicios.

### Servicio Principal (Classroom Service)

El servicio principal, también conocido como Classroom Service, es el núcleo del proyecto Classroom. Está construido utilizando el lenguaje de programación Go y utiliza una base de datos PostgreSQL para almacenar datos. Este servicio maneja la lógica principal del sistema, como la gestión de cursos, usuarios, asignaciones y seguimiento del progreso de los estudiantes. Proporciona una interfaz para que los diferentes módulos y aplicaciones accedan a los datos y realicen operaciones relevantes.

### Servicio de Exámenes

El servicio de exámenes se encarga de gestionar la creación, administración y realización de exámenes en el sistema Classroom. Utiliza MongoDB como base de datos para almacenar los datos relacionados con los exámenes, como las preguntas, las respuestas y los resultados de los estudiantes. Este servicio proporciona una interfaz para que los profesores creen exámenes, los estudiantes realicen los exámenes y se califiquen automáticamente.

### Servicio de Notificaciones

El servicio de notificaciones se encarga de gestionar y enviar notificaciones a los usuarios del sistema. Utiliza Redis como base de datos para escuchar los diferentes eventos y enviar notificaciones en tiempo real. Este servicio permite enviar mensajes, recordatorios y actualizaciones a los usuarios, manteniéndolos informados sobre las novedades y eventos relevantes en el sistema Classroom.

La arquitectura del proyecto Classroom se basa en la distribución de responsabilidades y la comunicación entre los diferentes servicios a través de protocolos estándar. Esta estructura modular permite una escalabilidad y mantenibilidad adecuadas, así como la capacidad de agregar nuevos servicios y funcionalidades en el futuro.

En las siguientes secciones, se proporcionarán más detalles sobre la configuración y el funcionamiento de cada uno de los servicios y componentes mencionados anteriormente.