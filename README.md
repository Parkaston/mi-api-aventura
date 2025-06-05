# 🌍 Mi API Aventura

¡Bienvenido a **mi-api-aventura**! Este proyecto es una API educativa desarrollada con Node.js, Express y MongoDB, que incluye endpoints versionados, autenticación con JWT, despliegue en múltiples plataformas y conexión con base de datos en MongoDB Atlas.

---

### 📘 Documentación Interactiva con Swagger

Hemos incorporado Swagger UI para que puedas explorar y probar los endpoints de la API directamente desde el navegador.

🔗 Accedé a la documentación desde el siguiente enlace:

https://mi-api-aventura.onrender.com/api-docs

---

🧪 Desde allí podrás:

- Ver todos los endpoints disponibles.
- Probar solicitudes GET y POST con parámetros.
- Ingresar tokens JWT para acceder a rutas protegidas.
- Consultar los modelos de datos y respuestas esperadas.


## 🚀 Enlaces en vivo

🔹 **Vercel (modo serverless):**
- [`/api/v1/hola`](https://mi-api-aventura.vercel.app/api/v1/hola)  
- [`/api/v1/saludo?nombre=Guille`](https://mi-api-aventura.vercel.app/api/v1/saludo?nombre=Guille)

🔹 **Render (modo servidor Express completo):**
- [`/`](https://mi-api-aventura.onrender.com)  
- [`/api/v1/usuarios`](https://mi-api-aventura.onrender.com/api/v1/usuarios) *(requiere token JWT)*  
- [`/api/v1/login`](https://mi-api-aventura.onrender.com/api/v1/login) *(POST con credenciales)*  
- [`/api/v1/saludo?nombre=TuNombre`](https://mi-api-aventura.onrender.com/api/v1/saludo?nombre=TuNombre)

---

## 📦 Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB Atlas + Mongoose
- JSON Web Tokens (JWT)
- Vercel (serverless functions)
- Render (Node server)
- Git + GitHub

---

## ⚙️ Cómo usar esta API

### 1. Obtener un token de acceso
Usá este endpoint con un **POST** para autenticarte:

```
POST /api/v1/login
```

#### Body:
```json
{
  "username": "admin",
  "password": "1234"
}
```

Respuesta esperada:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR..." // <- Este token se usa luego
}
```

---

### 2. Ver usuarios (requiere token)

```
GET /api/v1/usuarios
```

Enviá el token en los headers:

```
Authorization: Bearer TU_TOKEN
```

---

### 3. Crear usuario (abierto)

```
POST /api/v1/usuarios
```

#### Body:
```json
{
  "nombre": "UsuarioX",
  "email": "usuariox@example.com"
}
```

---

## 🧪 Pruebas recomendadas

1. Intentá acceder a `/api/v1/usuarios` sin token → debería darte error 401.
2. Obtené un token desde `/api/v1/login` y usalo para acceder correctamente.
3. Probá crear nuevos usuarios con `POST /usuarios`.
4. Usá `/saludo?nombre=TuNombre` para recibir un mensaje personalizado.
5. Verificá los distintos comportamientos entre Vercel y Render.

---

## 📂 Estructura del proyecto

```
mi-api-aventura/
│
├── api/
│   └── v1/
│       ├── hola.js
│       └── saludo.js
├── models/
│   └── Usuario.js
├── db.js
├── server.js
├── .env (no incluido)
├── .gitignore
├── Procfile (opcional en caso de usar otros servicios de deployment)
├── package.json
└── README.md
```

---

## 🔐 Variables de entorno necesarias en caso de usar en modo local

Asegurate de configurar:

```
MONGO_URI=...               ← Reemplazar con tu URI real
JWT_SECRET=...              ← Reemplazar con tu secreto JWT
MENSAJE_BIENVENIDA=...      ← Reemplazar con el mensaje de bienvenida
```

En nuestro archivo .env o como variable en nuestro servicio de deployment
---

## 💬 Comentario final

Este proyecto muestra cómo adaptar una misma API para diferentes entornos de despliegue, entender el comportamiento serverless frente a un servidor persistente, y cómo proteger endpoints con autenticación JWT.

---

### 📬 Autor

**Guillermo Luna Álvarez**  
[LinkedIn]((https://www.linkedin.com/in/guillermo-luna-alvarez-419782252/))
