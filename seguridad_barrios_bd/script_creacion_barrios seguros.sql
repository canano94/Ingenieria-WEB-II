/*-- Database: seguridad_barrios

-- DROP DATABASE IF EXISTS seguridad_barrios;

CREATE DATABASE barrios_seguros
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Spanish_Colombia.1252'
    LC_CTYPE = 'Spanish_Colombia.1252'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;


-- Crea esquema pem del proyecto
--DROP SCHEMA IF EXISTS public;
--CREATE SCHEMA IF NOT EXISTS pem;
*/

BEGIN;

-- Creación de tablas principales (sin dependencias).
CREATE TABLE IF NOT EXISTS public.users
(
    id          serial          PRIMARY KEY,
    status      integer         NOT NULL DEFAULT 1,
    name        varchar         NOT NULL,
    email       varchar         NOT NULL UNIQUE,
    password    varchar         NOT NULL
);

CREATE TABLE IF NOT EXISTS public.barrio
(
    id          serial          PRIMARY KEY,
    ind_seg     integer         NOT NULL,
    nam_bar     varchar         NOT NULL,
    porcentaje  varchar
);

-- Creación de tablas que dependen de las anteriores.
-- Las llaves foráneas se definen directamente aquí para mayor claridad.
CREATE TABLE IF NOT EXISTS public.coordenadas
(
    id_barrio   integer         PRIMARY KEY REFERENCES public.barrio(id) ON DELETE CASCADE ON UPDATE CASCADE,
    cor_sur     numeric(10, 6)  NOT NULL,
    cor_nor     numeric(10, 6)  NOT NULL,
    cor_ori     numeric(10, 6)  NOT NULL,
    cor_occ     numeric(10, 6)  NOT NULL
);

CREATE TABLE IF NOT EXISTS public.favorite
(
    idfav       serial          PRIMARY KEY,
    idbar       integer         NOT NULL UNIQUE REFERENCES public.barrio(id) ON DELETE CASCADE ON UPDATE CASCADE,
    iduser      integer         NOT NULL REFERENCES public.users(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Finaliza y confirma la transacción.
COMMIT;