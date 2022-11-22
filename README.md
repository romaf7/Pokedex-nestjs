<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar El repositorio
2. Ejecutar: ```npm install```
3. Tener Nest CLI instalado: ```npm install -g @nestjs/cli```
4. Levantar la base de datos: ```docker-compose up -d```
5. Clonar archivo ```.env.template``` y renombrar la copia a ```.env``` 
6. Llenar las variables de entorno definidas en eL ```.env```
7. Ejecutar la aplicación en dev: ```npm run start:dev``` o ```yarn start:dev```
8. Poblar la base de datos: ```http://localhost:3000/api/v2/seed```

# Production Build
1. Crear el archivo ```.env.prod```
2. Llenar las variables de entorno de producción
3. Crear la nueva imagen: ```docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build```
4. 

# Stack usado
* MongoDB
* Nest
* TablePlus
* Visual studio code
