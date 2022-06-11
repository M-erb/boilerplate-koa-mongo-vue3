# client-app

Webpack + vue3 app

## Project setup
```bash
npm install
```

### Compiles and watches changes for development
```bash
npm start

# or
npm run serve

# or
npm run watch
```

### Compiles and minifies for production
```bash
npm run build
```

### Pollen.css
Uses [pollen.css](https://www.pollen.style)

Pollen is a configurable library of CSS variables. It lets you write faster, more consistent, and more maintainable styles. Use it in any stack and easily extend it as a build tool for your own custom design systems.

Read [config docs](https://www.pollen.style/basics/configuration) for how to edit the pollen generated file. Then run:

```bash
# if you dont already have it installed
npm i -g pollen-css

pollen
```

Pollen is configured to output the generated css into the src/styles directory. From there we include it in our webpack build to output in our builded css file into public directory to be served up by request.
