/*
    Title: server.ts
    Description: Server
*/

import fastify from 'fastify';
import { serializerCompiler, validatorCompiler, ZodTypeProvider} from 'fastify-type-provider-zod';
import { createEvent } from './routes/create-event';
import { registerForEvent } from './routes/register-for-event';
import { getEvent } from './routes/get-event';
import { getAttendeeBadge } from './routes/get-attendee-badge';


// Creates application
const app = fastify()

// Adds schema validator and serializer
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

// Register routes
app.register(createEvent)
app.register(registerForEvent)
app.register(getEvent)
app.register(getAttendeeBadge)

// Runs application
app.listen({ port: 3333 }).then(() => {
    console.log('HTTP server running!')
})
