/*
    Title: get-event.ts
    Description: GET - Gets an event
*/

import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";


export async function getEvent(app: FastifyInstance) {
    
    // GET in /events/:eventId route
    app
    .withTypeProvider<ZodTypeProvider>()
    .get('/events/:eventId', {
        schema: {
            params: z.object({
                eventId: z.string().uuid(),
            }),
            response: {
                200: {
                    event: z.object({
                        id: z.string().uuid(), 
                        title: z.string(),
                        slug: z.string(),
                        details: z.string().nullable(),
                        maximumAttendees: z.number().int().nullable(),
                        attendeesCount: z.number().int(),
                    })
                }
            },
        }
    }, async (request, reply) => {

        // Select data from event
        const { eventId } = request.params
        const event = await prisma.event.findUnique({
            select: {
                id: true,
                title: true,
                slug: true,
                details: true,
                maximumAttendees: true,
                _count: {
                    select: {
                        attendees: true,
                    }
                }
            },
            where: {
                id: eventId,
            }
        })
        
        // Ensure event exists
        if (event === null) {
            throw new Error('Event not found.')
        }

        // Returns data about event
        return reply.send({
            event: {
                id: event.id,
                title: event.title,
                slug: event.slug,
                details: event.details,
                maximumAttendees: event.maximumAttendees,
                attendeesCount: event._count.attendees,
            }
        })
    })
}
