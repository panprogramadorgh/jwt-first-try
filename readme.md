# User Register/Login app system

### Proyecto de prueba de inicio de sesion con encriptacion de contraseña

#### Como iniciar la app:

Instala las dependencias y ejecuta el siguiente comando: `npm run dev`

#### Un ejemplo de como utilizar la api para registrarse/logearse:

```js
async function main({ body, url }) {
  const r = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await r.json();
  console.log(data);
}

// registrarse

main({
  body: {
    name: "Alvaro",
    email: "test500@test.com",
    password: "mypassword123",
  },
  url: "http://localhost:3000/api/auth/register",
});

// logearse (arrojara un error poruqe la contraseña no coincide)

main({
  body: { name: "Alvaro", email: "test500@test.com", password: "rancio123" },
  url: "http://localhost:3000/api/auth/login",
});
```

---

## Actualizacion de ultima hora !

### Implementacion de ruta protegida por usuario (JWT)

Viaja a la ruta `/api/profile` y comprobaras que no te dejara entrar, a no ser que agreges el header `token` con el token generado al iniciar sesion a nombre de un usuario en la ruta `/api/auth/login`. Ese token te brinda acceso a una propiedad user en el objeto request de las rutas get generadas en `/api/profile`
