## Microservicio Auth
El Microservicio de Autorizacion con conexion a MongoDB Atlas

## Dev

1. Clonar el repositorio `git clone ...`
2. Instalar dependencias `npm install`
3. Levantar proyecto con `npm run start:dev`

## TEST
1. Se agrego una Collecion POSTMAN para pruebas `MODULO-5_1.postman_collection.json`

## COMANDOS PARA MIGRAR CON PRISMA
npx prisma migrate dev --name init
npx prisma db pull


##NATS
docker run -d --name nats-main -p 4222:4222 -p 6222:6222 -p 8222:8222 nats

```
authenticacion con una misma base de datos para todos los servicios comunicacion con el gateway por NATS
```