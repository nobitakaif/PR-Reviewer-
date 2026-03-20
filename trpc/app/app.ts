
import { publicProcedure, trpcRouter } from "../init"

export const appRouter = trpcRouter({
    healthCheck : publicProcedure
        .query(()=>{
            return {
                status : 200, 
                time : Date.now()
            }
        })
})

export type AppRouter = typeof appRouter