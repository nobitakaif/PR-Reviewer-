import { appRouter } from "@/trpc/app/app";
import Image from "next/image";

export default async  function Home() {

  const caller = await appRouter.healthCheck
  
  
  return (
    <div>
      Alright
    </div>
  );
}
