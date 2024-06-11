/*
    Title: prisma.ts
    Description: Constructs Prisma Client
*/

import { PrismaClient } from '@prisma/client';


// Constructs the Prisma Client
export const prisma = new PrismaClient({

    // Makes every query create a log
    log: ['query']
})