import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from "@/trpc/app/app"
import { headers } from "next/headers"
import { createContext } from '@/trpc/init';


const handler = ((req: Request)=> {
    return fetchRequestHandler({
        endpoint : '/api/trpc',
        req,
        router : appRouter,
        createContext : () =>{
            return createContext({req : req})
        },
        onError : process.env.NODE_ENV === 'development' ? console.error : console.error
    })
})

export { handler as POST, handler as GET}