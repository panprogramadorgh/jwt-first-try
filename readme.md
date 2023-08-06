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
