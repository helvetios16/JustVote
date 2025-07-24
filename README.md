# JustVote

Este proyecto está desarrollado con Vue 3 y Vite, enfocado en crear una plataforma de votación moderna y eficiente.

## Tecnologías Principales

- Vue 3 con TypeScript
- Vite como bundler y servidor de desarrollo
- TailwindCSS para estilos
- Autenticación con Google OAuth2

## Características Principales

- Sistema de autenticación seguro con Google
- Dashboard interactivo para usuarios
- Creación y gestión de votaciones
- Participación en eventos de votación
- Historial de votaciones
- Interfaz moderna con animaciones y diseño responsivo

## Estructura del Proyecto

- Arquitectura modular por características (auth, create, dashboard, vote)
- Layouts separados para autenticación y dashboard
- Rutas protegidas que requieren autenticación
- Componentes reutilizables en la carpeta shared

## Funcionalidades de Usuario

- Inicio de sesión con Google
- Creación de nuevas votaciones
- Gestión de votaciones creadas
- Participación en votaciones activas
- Visualización del historial de participación

## Configuración del IDE Recomendada

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (desactivar Vetur).

## Soporte de Tipos para Importaciones `.vue` en TS

TypeScript no puede manejar la información de tipos para las importaciones `.vue` por defecto, por lo que reemplazamos el CLI `tsc` con `vue-tsc` para la verificación de tipos. En los editores, necesitamos [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) para que el servicio de lenguaje TypeScript reconozca los tipos `.vue`.

## Configuración Personalizada

Consulta la [Referencia de Configuración de Vite](https://vite.dev/config/).

## Configuración del Proyecto

```sh
bun install
```

### Compilación y Recarga en Caliente para Desarrollo

```sh
bun dev
```

### Verificación de Tipos, Compilación y Minificación para Producción

```sh
bun run build
```

### Lint con [ESLint](https://eslint.org/)

```sh
bun lint
```
