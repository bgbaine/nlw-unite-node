/*
    Title: register-for-event.ts
    Description: POST - Registers a attendee in an event
*/

import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";


export async function registerForEvent(app: FastifyInstance) {
    
    // POST in /events/:eventId/attendees route
    app
        .withTypeProvider<ZodTypeProvider>()
        .post('/events/:eventId/attendees', {
            schema: {
                body: z.object({
                    name: z.string().min(4),
                    email: z.string().email(),                    
                }),
                params: z.object({
                    eventId: z.string().uuid(),
                }),
                response: {
                    201: z.object({
                        attendeeId: z.number()
                    })
                }
            }
        }, async (request, reply) => {
            const { eventId } = request.params
            const { name, email } = request.body
            
            // Ensures email is not registered event
            const attendeeFromEmail = await prisma.attendee.findUnique({
                where: {
                    eventId_email: {
                        email,
                        eventId
                    }
                }
            })
            if (attendeeFromEmail !== null) {
                throw new Error('This email is already registered for this event.')
            }
            
            // Gets maximum and current number of attendees in event
            const [event, amountOfAttendeesForEvent] = await Promise.all([
                prisma.event.findUnique({
                    where: {
                        id: eventId,
                    }
                }),

                prisma.attendee.count({
                    where: {
                        eventId,
                    }
                })
            ])

            // Ensures there are vacancies in event
            if (event?.maximumAttendees && amountOfAttendeesForEvent >= event?.maximumAttendees) {
                throw new Error("The maximum number of attendees for this event has been reached.")
            }

            // Inserts attendee into 'Attendee' table
            const attendee = await prisma.attendee.create({
                data: {
                    name,
                    email,
                    eventId,
                }
            })
            
            // Returns status code 'Created' and id of created attendee (randomly generated)
            return reply.status(201).send({ attendeeId: attendee.id })
        })
}