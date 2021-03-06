# Peer Proyect Learning ESPOL WEB APP

## Correr la app en produccion

```sh
> git pull
```

```sh
> npm install
```

```sh
export NODE_ENV=production
```

Ir a la carpta ppl-assessment

```sh
> forever start -o out.log -e err.log server.js
```

# Instalacion y setup Development

## Primero ejecutar
npm install

## Base de datos
mongod.exe --dbpath <path> --port <port>

mongorestore.exe --db <path>

## Correr la aplicación 

### Development mode
npm run dev

### Producction mode
npm run production

# Api Documentacion
https://joelerll95.gitbooks.io/ppl_aplicacion/content/

# Comunicacion
* Apper https://appear.in/ppl_app_lab
* Discord https://discord.gg/Sjkhd6D

<!-- ## Heroku

heroku features:enable http-session-affinity -->

## TODO

* Docker
* Testing api
* Selenium testing
* Front testing
* Socketio Testing

## Documentacion TODO

* Documentacion API
* Diagrama de base de datos
* Diagrama de navegacion pagina
* Documentacion webSockets
* Documentacion Inicializar proyecto
* Fake server api para documentacion (automatico)
*


# README VERSION 2

[![Build Status](https://travis-ci.org/joelerll/ppl_app_lab.svg?branch=develop_v2)](https://travis-ci.org/joelerll/ppl_app_lab)
[![Coverage Status](https://coveralls.io/repos/github/joelerll/ppl_app_lab/badge.svg?branch=develop_v2)](https://coveralls.io/github/joelerll/ppl_app_lab?branch=develop_v2)
[![Coverage Status](https://codecov.io/gh/joelerll/ppl_app_lab/branch/develop_v2/graph/badge.svg)](https://codecov.io/gh/joelerll/ppl_app_lab/branch/develop_v2)

# PPL ESPOL LAB

Aplicacion para el manejo de las clases de ppl

## Documentacion

[PPL DOCS](https://joelerll95.gitbooks.io/ppl-lab/content/)

## Prerrequisitos

* Mysql
* Mongodb
* Redis (opcional y sera usado para realtime)
* Nodejs >= 6.9.5

## Setup

1. Anadir los submodulos del proyecto (docs y app-estudiante)

Si ya lo clonaste usar:

```sh
> git submodule update --init --recursive
```

Si no lo has clonado:
```sh
> git clone -b develop_v2 --single-branch  --recursive https://github.com/razerjon24/ppl_app_lab.git
```

```sh
> git checkout origin/develop_2
> git checkout -b develop_2
```

2. Renombrar el archivo __.env_template__ por __.env__ y cambiar los campos DATABASE_USER y DATABASE_PASSWORD por los de su base de datos

3. Instalar las dependencias de nodejs(Puede tomar mucho tiempo)

```sh
> npm install
```

Si por motivos de probar la aplicacion rapidamente se puede usar

```sh
> npm run development
```

__Tomar en cuenta que este comando borrara si existe la base de datos ppl_development__


# Development

1. Correr al app server

```sh
> npm run dev
```

2. En otra terminal correr el app cliente estudiantes

Moverse a la carpeta app_client/estudiantes

```
> npm install
> npm run dev
```

3. En otra terminal correr el app cliente profesores

Moverse a la carpeta app_client/profesores

```
> npm install
> npm run dev
```

## Testing

#### Testing server

```sh
> npm run test
```

## Production

1. Cargar el archivo __.env__ a las variables de entorno

```sh
> export $(cat .env | xargs)
```

2. Actualizar los archivos locales

```sh
> git pull
```

3. 
```sh
> npm install
```

4. Correr los scripts para produccion

(POR DESARROLLAR)
```sh
> 
```

5. Correr la aplicacion

```sh
> forever start -o out.log -e err.log server.js
```


## Documentacion

```sh
> npm run docs
```

## Ayuda

Mostar comandos posibles de npm

```sh
> npm start
```

## Comunicación

[Trello](https://trello.com/b/khhR0x5e/ppldev)

[Discord](https://discord.gg/Sjkhd6D)

[Appeir](https://appear.in/ppl_app_lab)

## Recomendado
https://github.com/rwaldron/idiomatic.js/


<!-- // usar la libreria joi para las validaciones, https://github.com/hapijs/joi
http://usejsdoc.org/-->

<!-- // @apiSchema (Body) {jsonschema=./schema/profesores.req.json} apiParam -->