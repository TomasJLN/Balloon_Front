# Balloon App

> **Esta es una nueva versión de un proyecto de bootcamp hecho hace años, reconstruida utilizando Claude Code.**
>
> La gracia del experimento: **esta versión está hecha con prompts**. No se escribió ni una sola línea de código a mano; todo el rediseño, la modernización y los ajustes se fueron dirigiendo conversando con IA.

Balloon App es una SPA en React para descubrir, filtrar, reservar y administrar experiencias: vuelos en globo, planes de aventura, rutas y actividades pensadas para regalar o vivir algo distinto.

El proyecto nació como entrega final de bootcamp y esta versión lo revisita con una mirada actualizada.

## Por qué existe

Este repositorio no intenta esconder sus cicatrices: es un proyecto de aprendizaje convertido en una pieza viva. La idea fue tomar una aplicación creada años atrás y comprobar hasta dónde podía llevarse usando herramientas actuales de IA aplicada al desarrollo.

El resultado es una reconstrucción completa del frontend donde el trabajo humano estuvo en dirigir, revisar, decidir y afinar mediante prompts. La ejecución del código fue generada por Claude Code.

## Qué puedes hacer

- Explorar experiencias destacadas desde la home.
- Buscar por texto y filtrar por categoría, fecha, precio y valoración.
- Ver el detalle completo de una experiencia, con descripción, condiciones, plazas, precio, valoraciones y mapa.
- Reservar tickets seleccionando fecha, cantidad y método de pago.
- Consultar reservas y tickets desde la zona de usuario.
- Valorar experiencias después de reservar.
- Registrarte, iniciar sesión y recuperar contraseña.
- Editar perfil, avatar, datos personales y contraseña.
- Acceder a un dashboard para gestionar categorías, experiencias y usuarios.
- Usar un modo demo con tour guiado y acceso automático como usuario visor.

## Stack

| Área | Tecnología |
| --- | --- |
| Frontend | React 18, Create React App |
| Routing | React Router 7 |
| Estado global | React Context |
| Formularios | Formik, Yup |
| UI | CSS plano, MUI, React Icons |
| Fechas | date-fns, react-multi-date-picker |
| Mapas | Leaflet, React Leaflet |
| Carruseles | Swiper |
| Notificaciones | React Toastify |
| Tours guiados | driver.js |
| Build tooling | react-scripts |

## Arquitectura

La aplicación está organizada en capas de rutas:

- `AppRoute`: configura los providers globales, el header, el scroll-to-top y las notificaciones.
- `PublicRoute`: páginas públicas como home, login, registro, contacto, filtros, condiciones y detalle de reserva.
- `UserRoute`: zona autenticada de usuario, perfil, detalle de tickets y reviews.
- `DashboardRoute`: panel de administración y visor para CRUD de categorías, experiencias y usuarios.

El estado compartido vive en tres contextos:

- `TokenContext`: guarda el token de sesión en `sessionStorage`.
- `UserContext`: obtiene el usuario actual desde `GET /user`.
- `FilterContext`: coordina búsquedas, filtros y estado de navegación entre header, menús, filtro y resultados.

Todas las peticiones al backend pasan por helpers centralizados en `src/helpers/fetcher.js`, construyendo las URLs con `REACT_APP_BACKEND_URL`.

## Estructura principal

```txt
src/
  components/       Componentes reutilizables de UI
  contexts/         Contextos globales de token, usuario y filtros
  forms/            Formularios independientes
  helpers/          Fetching, subida de archivos, fechas y utilidades
  hooks/            Hooks de acceso a API por dominio
  pages/            Pantallas principales de la app
  routes/           Rutas públicas, privadas y dashboard
  styles/           Estilos compartidos de administración
public/
  imgs/             Assets visuales públicos
```

## Instalación

Clona el repositorio e instala dependencias:

```bash
npm install
```

Crea el archivo de entorno a partir del ejemplo:

```bash
cp .env_example .env
```

Configura la URL del backend:

```env
REACT_APP_BACKEND_URL=http://localhost:4000
```

Arranca el servidor de desarrollo:

```bash
npm start
```

La app se abre por defecto en:

```txt
http://localhost:3000
```

## Scripts disponibles

```bash
npm start
```

Arranca la aplicación en modo desarrollo.

```bash
npm run build
```

Genera una build de producción en `build/`.

```bash
npm test
```

Ejecuta Jest y React Testing Library mediante `react-scripts`.

```bash
npm run test:ci
```

Ejecuta la suite de tests en modo no interactivo y secuencial, útil para CI o para evitar problemas de workers en Windows.

## Backend

Balloon App necesita una API externa para funcionar correctamente. La URL se define con:

```env
REACT_APP_BACKEND_URL=http://localhost:4000
```

El frontend espera respuestas con esta forma general:

```json
{
  "status": "ok",
  "message": "Mensaje opcional",
  "data": {}
}
```

Los recursos multimedia se cargan desde:

```txt
{REACT_APP_BACKEND_URL}/uploads/{archivo}
```

## Demo guiada

La aplicación incluye un tour con `driver.js` que explica la home, los filtros, las tarjetas de experiencia y el acceso al panel.

El flujo demo intenta iniciar sesión con:

```txt
viewer@demo.com
123456
```

Si el backend tiene ese usuario disponible, redirige automáticamente al dashboard en modo visor.

## Rutas destacadas

| Ruta | Descripción |
| --- | --- |
| `/` | Home con filtros y experiencias destacadas |
| `/allFilter` | Resultados filtrados |
| `/booking/:id` | Detalle y reserva de una experiencia |
| `/account` | Login |
| `/register` | Registro |
| `/profile` | Perfil del usuario |
| `/bookingDetail/:ticket` | Detalle del ticket/reserva |
| `/review/:ticket` | Valoración de experiencia |
| `/dashboard` | Panel de administración/visor |
| `/dashboard/adminCategory` | Gestión de categorías |
| `/dashboard/adminExperience` | Gestión de experiencias |
| `/dashboard/adminUsers` | Gestión de usuarios |

## Lo interesante del proyecto

Este repositorio es tanto una app como una pequeña declaración de intenciones:

- rescata un proyecto real de bootcamp,
- lo moderniza sin borrar su origen,
- mantiene una arquitectura comprensible para perfiles junior,
- incorpora flujos completos de producto,
- y documenta un proceso de desarrollo dirigido enteramente por prompts.

No es solo "una app". Es una prueba de cómo un proyecto antiguo puede volver a respirar cuando se combina criterio técnico, producto y herramientas de IA.

## Estado

Proyecto frontend funcional, preparado para trabajar contra un backend compatible. La build de producción se genera con Create React App y el repositorio conserva una estructura sencilla para que pueda ser leído, explicado y ampliado con facilidad.

---

Hecho con React, prompts y una cantidad poco razonable de cariño.
