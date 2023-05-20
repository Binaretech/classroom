---
sidebar_position: 3
---

# Configuración del Entorno de Desarrollo con Docker

Antes de comenzar a contribuir al proyecto Classroom, es importante configurar correctamente tu entorno de desarrollo. El uso de Docker y Docker Compose simplificará la configuración y asegurará un entorno de desarrollo consistente para todos los componentes del proyecto. Sigue estos pasos para configurar tu entorno de desarrollo con Docker.

### Requisitos del Software

Asegúrate de tener instalado lo siguiente en tu sistema:

- Docker
- Docker Compose

### Configuración de Docker y Docker Compose

Docker y Docker Compose son herramientas clave para ejecutar el proyecto Classroom de manera local. Sigue estos pasos para configurar Docker y Docker Compose:

1. Paso 1: Descarga e instala Docker según las instrucciones específicas para tu sistema operativo. Puedes encontrar las instrucciones de instalación en el sitio web oficial de Docker.

2. Paso 2: Descarga e instala Docker Compose siguiendo las instrucciones específicas para tu sistema operativo. Puedes encontrar las instrucciones de instalación en el sitio web oficial de Docker Compose.

3. Paso 3: Verifica que Docker y Docker Compose estén instalados correctamente ejecutando los siguientes comandos en tu terminal:

```
docker --version
docker-compose --version
```

### Configuración del Proyecto Classroom con Docker Compose

Una vez que hayas configurado Docker y Docker Compose, puedes proceder a configurar el proyecto Classroom utilizando Docker Compose. Sigue estos pasos:

1. Paso 1: Clona el repositorio del proyecto Classroom desde GitHub:

```
git clone https://github.com/Binaretech/classroom.git
```

2. Paso 2: Navega al directorio del proyecto Classroom:

```
cd classroom
```

3. Paso 3: Copia el archivo de ejemplo de variables de entorno:

```
cp .env.example .env
```

4. Paso 4: Abre el archivo `.env` y configura las variables de entorno según tus necesidades. Asegúrate de ajustar las configuraciones según tu entorno de desarrollo.

5. Paso 5: Ejecuta el comando de Docker Compose para construir y ejecutar los contenedores del proyecto:

```
docker-compose up --build
```

Este comando construirá y ejecutará todos los servicios del proyecto Classroom, como el Auth Gateway, el API Service, el módulo de exámenes, el frontend web y la aplicación móvil.

6. Paso 6: Una vez que los contenedores se hayan construido y estén en funcionamiento, podrás acceder al proyecto Classroom en tu navegador web ingresando la siguiente URL:

```
http://localhost:3000
```

¡Y eso es todo! Ahora tienes tu entorno de desarrollo configurado con Docker y el proyecto Classroom en funcionamiento localmente. Los contenedores de Docker garantizan la consistencia y la fácil replicación del entorno de desarrollo en diferentes sistemas.

Recuerda que puedes realizar modificaciones y contribuciones al código en los respectivos directorios del proyecto dentro del repositorio clonado.

Si deseas detener los contenedores en algún momento, simplemente presiona `Ctrl + C` en la terminal donde se estén ejecutando los contenedores, y luego puedes usar el comando `docker-compose down` para detener y eliminar los contenedores.

¡Ahora estás listo para comenzar a contribuir al proyecto Classroom!