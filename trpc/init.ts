import { db } from "@/prisma/client"
import { initTRPC } from "@trpc/server"
import { ZodError } from "zod"
import superjson from "superjson"

export const createContext = async ({ req }: { req: Request }) => {
    return {
        db,
        headers: req.headers
    }
}

const trpc = initTRPC.context<Awaited<ReturnType <typeof createContext>>>().create({
    transformer: superjson,
    errorFormatter({shape, error}){
        return {
            ...shape, 
            data : {
                ...shape.data,
                zodError : error.cause instanceof ZodError ? error.cause.flatten() : null
            }
        }
    }

})

export const createCallerFactory = trpc.createCallerFactory;
export const trpcRouter = trpc.router
export const publicProcedure = trpc.procedure