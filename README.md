
# API de Seguridad Barrial - Bogotá 

Esta es una API REST full-stack construida con Node.js, Express, TypeScript y PostgreSQL, siguiendo una **Arquitectura Hexagonal (Puertos y Adaptadores)**. La aplicación permite a los usuarios registrarse, autenticarse y gestionar una lista de sus barrios favoritos en Bogotá, además de consultar información sobre la seguridad de cualquier barrio a partir de sus coordenadas geográficas.

## Características Principales

  - **Arquitectura Limpia:** Implementación del patrón de **Puertos y Adaptadores** para un código desacoplado, mantenible y escalable.
  - **Autenticación Segura:** Sistema completo de registro y login de usuarios con contraseñas encriptadas (`bcrypt`) y autenticación basada en **Tokens JWT**.
  - **CRUD de Usuarios:** Gestión completa de usuarios (crear, leer, actualizar, borrar) con rutas protegidas.
  - **CRUD de Barrios:** Gestión completa de los barrios y sus coordenadas geográficas.
  - **CRUD de Favoritos:** Sistema seguro donde cada usuario puede gestionar su propia lista de barrios favoritos.
  - **Búsqueda Geográfica:** Endpoint para consultar un barrio a partir de un punto de latitud y longitud.
  - **Stack Moderno:** Construido con Express.js, TypeScript, PostgreSQL y TypeORM.

## 🛠️ Prerrequisitos

Asegúrate de tener instalado lo siguiente en tu sistema:

  - [Node.js](https://nodejs.org/) (versión 18 o superior)
  - [npm](https://www.npmjs.com/)
  - [PostgreSQL](https://www.postgresql.org/download/)

## Instalación y Configuración

Sigue estos pasos para levantar el proyecto en tu entorno local.

1.  **Clona el repositorio:**

    ```bash
    git clone <URL_DE_TU_REPOSITORIO>
    cd <NOMBRE_DEL_PROYECTO>
    ```

2.  **Instala las dependencias:**

    ```bash
    npm install
    ```

3.  **Configura las variables de entorno:**
    Crea un archivo llamado `.env` en la raíz del proyecto. Puedes usar esta plantilla:

    ```env
    # Puerto de la aplicación
    PORT=4000

    # Configuración de la Base de Datos PostgreSQL
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=postgres
    DB_PASSWORD=tu_contraseña_de_postgres
    DB_NAME=seguridad_barrios

    # Secreto para firmar los JSON Web Tokens
    JWT_SECRET=este_es_un_secreto_muy_seguro_cambialo
    ```

4.  **Crea y estructura la base de datos:**

      * Asegúrate de haber creado una base de datos en PostgreSQL con el nombre que especificaste en `DB_NAME`.
      * Ejecuta el script SQL que se encuentra en `/database/init.sql` (o donde lo hayas guardado) para crear todas las tablas y relaciones necesarias.

## Uso

Una vez configurado, puedes iniciar el servidor de diferentes maneras.

  - **Modo de Desarrollo (con reinicio automático):**

    ```bash
    npm run dev
    ```

  - **Construcción para Producción:**

    ```bash
    npm run build
    ```

  - **Iniciar en Modo Producción:**

    ```bash
    npm run start
    ```

## Endpoints de la API

La URL base para todas las peticiones es `http://localhost:4000/api`.

-----

### Usuarios (`/users`)

| Método | URL                  | Protección | Descripción                         |
| :----- | :------------------- | :--------- | :---------------------------------- |
| `POST` | `/register`          | Pública    | Registra un nuevo usuario.          |
| `POST` | `/login`             | Pública    | Inicia sesión y devuelve un token JWT. |
| `GET`  | `/`                  | JWT        | Obtiene la lista de todos los usuarios.   |
| `GET`  | `/:id`               | JWT        | Obtiene un usuario por su ID.       |
| `PUT`  | `/:id`               | JWT        | Actualiza un usuario (solo el propio). |
| `DELETE` | `/:id`             | JWT        | Elimina un usuario (solo el propio).  |

#### Ejemplo: Registro (`POST /register`)

**Body:**

```json
{
    "name": "Alejandro",
    "email": "alejo@test.com",
    "password": "password123"
}
```

-----

### Barrios (`/barrios`)

| Método | URL                  | Protección | Descripción                                 |
| :----- | :------------------- | :--------- | :------------------------------------------ |
| `POST` | `/`                  | JWT (Recomendado) | Crea un nuevo barrio.                  |
| `GET`  | `/`                  | Pública    | Obtiene la lista de todos los barrios.      |
| `GET`  | `/buscar`            | Pública    | Busca un barrio por coordenadas geográficas. |
| `GET`  | `/:id`               | Pública    | Obtiene un barrio por su ID.                |
| `PUT`  | `/:id`               | JWT (Recomendado) | Actualiza un barrio existente.         |
| `DELETE` | `/:id`             | JWT (Recomendado) | Elimina un barrio.                     |

#### Ejemplo: Búsqueda por Coordenadas (`GET /buscar`)

**Petición:**
`http://localhost:4000/api/barrios/buscar?cor_sn=4.69&cor_oo=-74.03`

**Respuesta Exitosa (200 OK):**

```json
{
    "id": 2,
    "nombre": "Usaquén",
    "indiceSeguridad": 8,
    "porcentaje": "80%",
    "coordenadas": {
        "sur": 4.685,
        "norte": 4.705,
        "oriente": -74.022,
        "occidente": -74.042
    }
}
```

-----

### Favoritos (`/favorites`)

**Nota:** Todas las rutas de favoritos son protegidas y requieren un token JWT.

| Método | URL      | Protección | Descripción                                |
| :----- | :------- | :--------- | :----------------------------------------- |
| `POST` | `/`      | JWT        | Añade un barrio a la lista de favoritos del usuario. |
| `GET`  | `/`      | JWT        | Obtiene la lista de favoritos del usuario logueado. |
| `DELETE` | `/:id` | JWT        | Elimina un favorito de la lista del usuario. |

#### Ejemplo: Crear un Favorito (`POST /`)

**Authorization Header:** `Bearer <TU_TOKEN_JWT>`

**Body:**

```json
{
    "barrioId": 1
}
```

**Respuesta Exitosa (201 Created):**

```json
{
    "id": 1,
    "barrio": {
        "id": 1,
        "nombre": "Chapinero"
    }
}