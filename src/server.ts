/*  

    Pass in - REST API that uses microframework Fastify, ORM Prisma and DB SQLite

    HTTP Methods (GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS...)
    Request body (POST, PUT)
    Search/Query parameters (GET, eg. `GET http://localhost:3333/users?name=Diego`)
    Route parameters (PUT, DELETE, PATCH, eg. DELETE `http://localhost:3333/users/1`)
    Headers (Context)

    Connect to databases
    Native driver / Query builders / Object Relational Mapping (ORM)

*/

import fastify from 'fastify';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';


// Creates application
const app = fastify()

// Constructs the Prisma Client
const prisma = new PrismaClient({

    // Makes every query create a log
    log: ['query']
})

// POST in events route
app.post('/events', async (request, reply) => {

    // Creates validation checks
    const createEventSchema = z.object({
        title: z.string().min(4),
        details: z.string().nullable(),
        maximumAttendees: z.number().int().positive().nullable()
    })
    
    // Validates sent data
    const data = createEventSchema.parse(request.body)

    // Inserts data into 'event' database
    const event = await prisma.event.create({
        data: {
            title: data.title,
            details: data.details,
            maximumAttendees: data.maximumAttendees,
            slug: new Date().toISOString()
        }
    })

    // Returns status code 'Created' and id of created event (randomly generated)
    return reply.status(201).send({ eventId: event.id })
})

// Runs application
app.listen({ port: 3333 }).then(() => {
    console.log('HTTP server running!')
})
