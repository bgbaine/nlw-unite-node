# pass.in

O pass.in é uma aplicação de **gestão de participantes em eventos presenciais**. 

A ferramenta permite que o organizador cadastre um evento e abra uma página pública de inscrição.

Os participantes inscritos podem emitir uma credencial para check-in no dia do evento.

O sistema fará um scan da credencial do participante para permitir a entrada no evento.

## Requisitos

### Requisitos funcionais

- [ ] O organizador deve poder cadastrar um novo evento;
- [ ] O organizador deve poder visualizar dados de um evento;
- [ ] O organizador deve poser visualizar a lista de participantes; 
- [ ] O participante deve poder se inscrever em um evento;
- [ ] O participante deve poder visualizar seu crachá de inscrição;
- [ ] O participante deve poder realizar check-in no evento;

### Regras de negócio

- [ ] O participante só pode se inscrever em um evento uma única vez;
- [ ] O participante só pode se inscrever em eventos com vagas disponíveis;
- [ ] O participante só pode realizar check-in em um evento uma única vez;

### Requisitos não-funcionais

- [ ] O check-in no evento será realizado através de um QRCode;


## Anotações

Pass in - REST API that uses microframework Fastify, ORM Prisma and DB SQLite

HTTP Methods (GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS...)
Request body (POST, PUT)
Search/Query parameters (GET, eg. `GET http://localhost:3333/users?name=Diego`)
Route parameters (PUT, DELETE, PATCH, eg. `http://localhost:3333/users/1`)
Headers (Context)

Connect to databases
Native driver / Query builders / Object Relational Mapping (ORM)

20x - Success
30x - Redirect
40x - Client
50x - Server
