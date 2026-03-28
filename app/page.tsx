
import { appRouter } from "@/trpc/app/app";
import { createContext } from "@/trpc/init";
import { trpc } from "@/utils/trpc";
import { headers } from "next/headers";
import Image from "next/image";

export default async   function Home() {

  const nextHeaders = await headers()
  const caller = appRouter.createCaller(
    await createContext({
      req : new Request("https://localhost",{
        headers : nextHeaders
      })
    })
  )

  // const { data, isLoading, error} = trpc.healthCheck.useQuery()



  const resposne = await caller.healthCheck()
  console.log("server response -> ", resposne)
  
  return (
    <div>
      resposne : {resposne.time}
    </div>
  );
}
