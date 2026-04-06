import { signOut } from "@/utils/auth-client"
import { useRouter } from "next/navigation"
import { DropdownMenuTrigger, DropdownMenu } from "./ui/dropdown-menu"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

interface UserProps{
    id : string,
    name : string,
    email : string,
    image? : string | null | undefined
}

export function UserMenu({user} : {user: UserProps}){
    const router = useRouter()

    const handleSignOut = async()=>{
        await signOut()
        router.push("/")
    }

    const firstWordOfName = user.name ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0,2) : (user.email[0].toUpperCase() ?? "U")
    
    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} className="h-9 gap-2 px-2 hover:bg-muted/80">
                <Avatar>
                    <AvatarImage src={user.image ?? undefined} alt={user.name ?? "User"}/>
                    <AvatarFallback>{firstWordOfName}</AvatarFallback>
                </Avatar>
            </Button>
        </DropdownMenuTrigger>
    </DropdownMenu>
}