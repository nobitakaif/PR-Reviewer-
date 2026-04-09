
import { publicProcedure, trpcRouter } from "../init"
import { respositoryRouter } from "../routers/repository"

export const appRouter = trpcRouter({
    healthCheck: publicProcedure
        .query(() => {
            return {
                status: 200,
                time: Date.now()
            }
        }),
    repository : respositoryRouter
})

export type AppRouter = typeof appRouter