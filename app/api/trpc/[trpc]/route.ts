import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from "@/trpc/app/app"
import { headers } from "next/headers"
import { createContext } from '@/trpc/init';


const handler = ((req: Request)=> {
    fetchRequestHandler({
        endpoint : '/api/trpc',
        req,
        router : appRouter,
        createContext : () =>{
            return createContext({req : req})
        }
    })
})

export { handler as POST, handler as GET}