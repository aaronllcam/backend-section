# API completa con NodeJS

## Introducción

Hemos construido una API con NOdeJS y mongoDB en el que podemos dar de alta, listar, modificar o eliminar usuarios, ideas y comentarios.

## Consideraciones.

En este ejercicio hemos realizado una API con NodeJS usando mongoDB como gestor de Base de datos y moongoose como ODM, así como el uso de express como framework principal sobre node.

También hemos usado conceptos de Clean Arquithecture, para separar por capas las diferentes lógicas de la aplicación.

Además, hemos hecho uso de awilix para poder ralizar inyección de dependencias y poder realizar la comunicación entre las diferentes capas de manera más sencilla y eficiente.

Por otra parte, hemos aplicado funcionalidad y seguridad con algunas dependencias como cors, helmet, compression, express-async-erros o el uso de jsonwebtoken para el loggin sobre la api.

En cuanto al Unit Testing, lo hemos realizado mediante JEST y mockingoose, notar que por ahora solo hemos realizado el test a la funcionalidad de users.

La documentación le hemos creado usando swagger.

Para finalizar, hemos dockerizado la API para poder hacer un deploy de manera mas sencilla en el cloud y si en un futuro debemos realizar una arquitectura de microservicios que nos sea más sencillo empezar a preparala.




