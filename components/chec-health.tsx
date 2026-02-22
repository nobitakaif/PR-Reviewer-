import { trpc } from "@/lib/trpc/client";
import { Skeleton } from "./ui/skeleton";
import { Badge } from "./ui/badge";

export default function CheckHealth(){
    const { data, isLoading, error } = trpc.health.useQuery()

    console.log(data)
    if(isLoading){
        return <Skeleton className=" h-6 w-24"/>
    }

    if(error){
        return <Badge variant={"secondary"}/>
    }

    return <Badge variant={"secondary"}>
        API : {data?.status} {data?.timeStamp}
    </Badge>
}