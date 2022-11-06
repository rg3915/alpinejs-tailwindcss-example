# Alpine.js e TailwindCSS

Alpine.js TailwindCSS Example

## Instalação


### Use [node](https://nodejs.org/en/) com [nvm](https://github.com/nvm-sh/nvm).

```
nvm use 18.3.0
```


### Instale o [TailwindCSS](https://tailwindcss.com/)

```
npm init
npm i -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.html",
    "./src/**/*.{js,ts,vue}"
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
}
```

```
touch src/tailwind.css
```

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Instalando plugins e fontes

```
npm install -D @tailwindcss/typography
```

[Poppings](https://blog.logrocket.com/how-to-use-custom-fonts-tailwind-css)

```js
/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./public/**/*.html",
    "./src/**/*.{js,ts,vue}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
        poppins: ['Poppins', 'sans-serif']
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
```

### Instalando forms

```
npm i -D @tailwindcss/forms
```

```js
// tailwind.config.js
module.exports = {
  theme: {
    // ...
  },
  plugins: [
    require('@tailwindcss/forms'),
    // ...
  ],
}
```

### Instalando aspect-ratio

```
npm i -D @tailwindcss/aspect-ratio
```

```js
// tailwind.config.js
module.exports = {
  theme: {
    // ...
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    // ...
  ],
}
```

### Instalando o [Alpine.js](https://alpinejs.dev/)

```
npm i alpinejs
```

Crie `alpine.js`

```
mkdir src
touch src/alpine.js
```

```js
// alpine.js
import Alpine from 'alpinejs'

window.Alpine = Alpine

Alpine.start()
```

### Instalando esbuild

```
npm i esbuild
```

Edite `package.json`

```json
"scripts": {
  "build-css": "npx tailwindcss -i src/tailwind.css -o public/tailwind.css --watch",
  "build-js": "npx esbuild src/alpine.js --outfile=public/alpine.js --bundle --watch",
  "build": "npx tailwindcss -i src/tailwind.css -o public/tailwind.css; npx esbuild src/alpine.js --outfile=public/alpine.js --bundle; npx prettier --write public/",
  "lint": "npx prettier --write public/"
}
```

### Rodando a aplicação com [http-server](https://www.npmjs.com/package/http-server)

```
mkdir public
touch public/main.js
touch public/index.html

npm i -g http-server

http-server
```

Veja [public/main.js](public/main.js)


### Dados com [json-server](https://www.npmjs.com/package/json-server)

```
npm i -g json-server
```

Crie `db.json`

```
touch db.json
```

```json
{
  "todos": [
    {
      "id": 1,
      "task": "One"
    },
    {
      "id": 2,
      "task": "Two"
    },
    {
      "id": 3,
      "task": "Three"
    }
  ]
}
```

Rode o json-server

```
json-server --watch db.json
```

### [Prettier](https://prettier.io/)

```
npm install --save-dev --save-exact prettier
```

```
echo {}> .prettierrc.json
```

```
cat << EOF > .prettierignore
# Ignore artifacts:
build
coverage
EOF
```

#### Rodando o Prettier

```
npx prettier --write public/
ou
npm run lint
```

### Links

https://github.com/alpine-collective/awesome

https://github.com/thecodeholic/tailwindcss-ecommerce/blob/master/src/app.js


https://youtu.be/TN0955TvodA


https://codewithhugo.com/alpine-tips/
