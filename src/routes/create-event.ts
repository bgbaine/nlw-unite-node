/*
    Title: create-event.ts
    Description: POST - Creates an event
*/

import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { generateSlug } from '../utils/generate-slug';
import { prisma } from "../lib/prisma";
import { FastifyInstance } from 'fastify';


export async function createEvent(app: FastifyInstance) {

    // POST in /events route
    app
        .withTypeProvider<ZodTypeProvider>()
        .post('/events', {
            schema: {
                body: z.object({
                    title: z.string().min(4),
                    details: z.string().nullable(),
                    maximumAttendees: z.number().int().positive().nullable()
                }),
                response: {
                    201: z.object({
                        eventId: z.string().uuid()
                    })
                }
            }
        }, async (request, reply) => {
        
            // Validates sent data
            const {
                title,
                details,
                maximumAttendees,
            } = request.body
            
            // Generates slug
            const slug = generateSlug(title)

            // Ensures slug is unique
            const eventWithSameSlug = await prisma.event.findUnique({
                where: {
                    slug,
                }
            })
            if (eventWithSameSlug != null) {
                throw new Error("Another event with same title already exists")
            }

            // Inserts event into 'Event' table
            const event = await prisma.event.create({
                data: {
                    title,
                    details,
                    maximumAttendees,
                    slug
                }
            })

            // Returns status code 'Created' and id of created event (randomly generated)
            return reply.status(201).send({ eventId: event.id })
        })
}