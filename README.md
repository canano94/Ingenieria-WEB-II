# API de Indice de suguridad en los Barrios de bogota

Esta es una API REST construida con Node.js, Express, TypeScript y PostgreSQL. Su función principal es permitir la consulta de información sobre barrios, incluyendo un índice de seguridad, a partir de coordenadas geográficas.

## Características

-   Framework: Express.js
-   Lenguaje: TypeScript
-   Base de Datos: PostgreSQL
-   ORM: TypeORM
-   Validación de variables de entorno con Joi.

## Prerrequisitos

Asegúrate de tener instalado lo siguiente en tu sistema:
-   [Node.js](https://nodejs.org/) (versión 18 o superior)
-   [npm](https://www.npmjs.com/)
-   [PostgreSQL](https://www.postgresql.org/download/)

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
    Crea un archivo llamado `.env` en la raíz del proyecto. Puedes copiar el archivo `.env.example` (si lo creas) o usar la siguiente plantilla:
    ```env
    # Puerto de la aplicación
    PORT=4000

    # Configuración de la Base de Datos PostgreSQL
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=postgres
    DB_PASSWORD=tu_contraseña_de_postgres
    DB_NAME=seguridad_barrios
    ```

4.  **Crea la base de datos:**
    Asegúrate de haber creado una base de datos en PostgreSQL con el nombre que especificaste en `DB_NAME`.

## Uso

Una vez configurado, puedes iniciar el servidor de diferentes maneras.

-   **Modo de Desarrollo (con reinicio automático):**
    ```bash
    npm run dev
    ```

-   **Construcción para Producción:**
    Este comando compilará tus archivos TypeScript a JavaScript en la carpeta `/dist`.
    ```bash
    npm run build
    ```

-   **Iniciar en Modo Producción:**
    Este comando ejecuta el código ya compilado desde la carpeta `/dist`.
    ```bash
    npm run start
    ```

## Endpoints de la API

### Buscar Barrio por Coordenadas

Busca un barrio y su índice de seguridad basado en un punto geográfico.

-   **URL**: `/api/barrios/buscar`
-   **Método**: `GET`
-   **Query Params**:
    -   `cor_sn` (Requerido): Coordenada Sur-Norte (Latitud). Ejemplo: `4.63`
    -   `cor_oo` (Requerido): Coordenada Occidente-Oriente (Longitud). Ejemplo: `-74.06`

-   **Ejemplo de Petición:**
    ```
    http://localhost:4000/api/barrios/buscar?cor_sn=4.63&cor_oo=-74.06
    ```

-   **Respuesta Exitosa (200 OK):**
    ```json
    {
      "nombre": "Chapinero",
      "indiceSeguridad": 6
    }
    ```

-   **Respuesta de Error (404 Not Found):**
    ```json
    {
      "error": "No se encontró ningún barrio en las coordenadas proporcionadas."
    }
    ```