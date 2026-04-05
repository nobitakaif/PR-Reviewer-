import { db } from "@/prisma/client"
import { initTRPC, TRPCError } from "@trpc/server"
import { ZodError } from "zod"
import superjson from "superjson"
import { auth } from "@/utils/auth"

export const createContext = async ({ req }: { req: Request }) => {
    const session = await auth.api.getSession({headers : req.headers})
    return {
        db,
        session,
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

export const protectedProcedure = trpc.procedure.use(async ({ctx, next})=>{
    if(!ctx.session?.user){
        throw new TRPCError({code : "UNAUTHORIZED"})
    }
    return next({
        ctx : {
            ...ctx, 
            user : ctx.session.user,
            session : ctx.session
        }
    })
})