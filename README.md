# BE-Phone-Book

## Descripción del proyecto

API backend para la gestión de contactos (agenda telefónica). Permite crear, leer, actualizar y eliminar contactos, con validaciones de número de teléfono y correo electrónico. La API está documentada con Swagger.

## Tecnologías usadas

- Node.js
- Express
- Joi (validaciones)
- Swagger (OpenAPI)


## Cómo iniciar el proyecto

1. Instala las dependencias:
   ```bash
   npm install
   ```
2. Inicia el servidor:
   ```bash
   node index.js
   ```
3. Accede a la documentación Swagger en:
   ```
   http://localhost:3000/api-docs
   ```

## Mini Frontend

Se añadió un mini frontend en la carpeta `frontend/` para probar la API de contactos de forma visual.

Estructura:
```
frontend/
  index.html   # Página principal
  styles.css   # Estilos
  app.js       # Lógica JavaScript
```

### Cómo usar el frontend

1. Asegúrate de que el servidor backend esté corriendo (`node index.js`).
2. Abre `frontend/index.html` en tu navegador.
3. Podrás crear, listar, buscar por ID, actualizar y eliminar contactos desde la interfaz.

---

## Project Description

Backend API for managing contacts (phone book). Allows you to create, read, update, and delete contacts, with phone number and email validations. The API is documented with Swagger.

## Technologies Used

- Node.js
- Express
- Joi (validation)
- Swagger (OpenAPI)

## How to Start the Project

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   node index.js
   ```
3. Access Swagger documentation at:
   ```
   http://localhost:3000/api-docs
   ```

## Mini Frontend

A mini frontend was added in the `frontend/` folder to visually test the contacts API.

Structure:
```
frontend/
  index.html   # Main page
  styles.css   # Styles
  app.js       # JavaScript logic
```

### How to use the frontend

1. Make sure the backend server is running (`node index.js`).
2. Open `frontend/index.html` in your browser.
3. You can create, list, search by ID, update, and delete contacts from the interface.