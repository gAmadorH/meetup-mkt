# meetup-mkt

una aplicacion de meetup hecha en casa in-house

## requirements

* node
* npm

## install

Clona e instala dependencias

```
$ git clone https://github.com/gAmadorH/meetup-mkt.git
$ cd meetup-mkt
$ npm i
```

## setup

Copea el archivo `.env.example` y llamalo `.env` y modifica las variables de entorno a tu consideracion

```
$ cp .env.example .env
$ hechemos un vistaso
$ cat .env

$ # environment
$ NODE_ENV=development
$ 
$ # hosting
$ HOST=0.0.0.0
$ PORT=3000
$ 
$ # jwt secret
$ JWT_SECRET=yourSuperJwtSecret
$ 
$ # database config
$ DATABASE_NAME=db
$ DATABASE_USER=user
$ DATABASE_PASSWORD=password
$ DATABASE_HOST=127.0.0.1
$ DATABASE_PORT=5432
$ DATABASE_DIALECT=postgres
```
Ahora cambia el valor de las variables para que la super aplicacion `meetup-mkt` se conecte a la **base de datos que debes crear** (con su respectivo nombre y credenciales), lo unico que debes crear es la base de datos, sin las tablas ya que se crearan con un script mas adelante

Puedes hacerlo en el motor de base de datos que gustes (y que este soportado), solo asegurate cambiarlo la variable `DATABASE_DIALECT` a uno y solo uno de estos valores 
- `mysql`
- `mariadb`
- `postgres`
- `mssql`

por ejemplo `DATABASE_DIALECT=postgres`

unas vez que escojiste tu motor de base de datos y ayas cambiado las variables adecuadamente, puedes ejecutar uno de los siguientes comandos (con respecto a el motor que escojiste)

* para mysql:

```
$ npm run db:mysql
```

* para mariadb:

```
$ npm run db:mariadb
```

* para postgres:

```
$ npm run db:postgres
```

* para mssql:

```
$ npm run db:mssql
```

para generar las tablas de la base de datos usaremos el siguiente comando:

```
$ npm run db:sync
```

y despues solo debes confirmar

## populate

Este paso es opcional, ya que solo agregaremos unos registros de prueba:

```
$ npm run db:seed:user
```

te preguntara cuandos usuarios deseas generar de forma aleatoria
con esto crearemos usuarios en la base de datos


## run

para correr la aplicacion solo debemos ejecutar el siguiente comando

```
$ npm start
```

la aplicaion estara correindo de forma local
y tambien se cuentra en:

[http://157.245.143.235:3000](http://157.245.143.235:3000)

ademas en el despliege tambien se encuentra la documentacion en:

[http://157.245.143.235:3000/docs](http://157.245.143.235:3000/docs)

la docuementacion tambien esta en estre projecto

## test

puedes usar la coleccion de postman que esta en el `postman/meetup mkt.postman_collection.js` para realizar  pruebas
