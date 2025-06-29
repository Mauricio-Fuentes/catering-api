## Resetear la base de datos
npx prisma migrate reset

## Internamente ejecutar el comando para la migracion antes de levantar todo en conjunto
npx prisma migrate dev --name init -> ya no ejecutar este comando solo funciona si cada microservicio tiene una DB

# clave secrete: Estudiar -> para pushear a mi github
```
microservicio de productos con una misma base de datos para todos los servicios comunicacion con el gateway por NATS
```