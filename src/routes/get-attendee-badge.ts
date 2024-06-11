/*
    Title: get-attendee-badge.ts
    Description: GET - Gets attendee badge
*/

import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";


export async function getAttendeeBadge(app: FastifyInstance) {
    
    // GET in /attendees/:attendeeId/badge route
    app
        .withTypeProvider<ZodTypeProvider>()
        .get('/attendees/:attendeeId/badge', {
            schema: {
                params: z.object({
                    attendeeId: z.coerce.number().int(),
                }),
                response: {},
            }
        }, async (request, reply) => {
            const { attendeeId } = request.params

            const attendee = await prisma.attendee.findUnique({
                select: {
                    name: true,
                    email: true,
                    event: {
                        select: {
                            title: true,
                        }
                    }
                },
                where: {
                    id: attendeeId,
                }
            })

            // Ensures attendee exists
            if (attendee === null) {
                throw new Error('Attendee not found.')
            }

            return reply.send({ attendee })           
        })
}