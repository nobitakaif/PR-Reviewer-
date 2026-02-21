import { createCallerFactory, createTRPCRotuer, publicProcedure } from "./trpc";

export const appRouter = createTRPCRotuer({
    health : publicProcedure.query(() =>{
        return {
            status : "ok",
            timeStamp : Date.now()
        }
    })
})

export type AppRouter = typeof appRouter

export const createCaller = createCallerFactory(appRouter)