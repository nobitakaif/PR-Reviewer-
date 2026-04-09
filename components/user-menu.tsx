import { signOut } from "@/utils/auth-client"
import { useRouter } from "next/navigation"
import { DropdownMenuTrigger, DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuItem } from "./ui/dropdown-menu"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { ChevronDownCircleIcon, LogOut, Settings, User } from "lucide-react"
import { FaChevronCircleDown } from "react-icons/fa"

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
            <Button variant={"ghost"} className="h-9 gap-2 px-2 hover:bg-muted/80 hover:bg-gray-300/30 py-2 ">
                <Avatar className="size-7 ring-1 ring-border bg-gray-300/60">
                    <AvatarImage src={user.image ?? undefined} alt={user.name ?? "User"}/>
                    <AvatarFallback className="text-transform:capitalize">{firstWordOfName}</AvatarFallback>
                </Avatar>
                <span className="sm:inline-block text-sm font-medium text-transform:uppercase max-w25 truncate">{user.name ?? "User"}</span>
                <FaChevronCircleDown className="hidden sm:inline-block " />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
            <div className="px-3 py-3">
                <div className="flex items-center gap-3">
                    <Avatar className="size-10 ring-1 ring-border">
                        <AvatarImage src={user.image ?? undefined} alt={user.name ?? "User"} />
                        <AvatarFallback className="text-sm font-medium bg-gray-300/60 text-gray-800">
                            {firstWordOfName}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col min-w-9">
                            <span className="text-sm font-medium truncate">{user.name ?? "User"}</span>
                            <span className="text-xs text-gray-500 truncate">{user.email ?? "Email"}</span>
                        </div>
                </div>
            </div>
            <DropdownMenuSeparator/>
            <DropdownMenuItem className="gap-2 py-2 cursor-pointer hover:bg-gray-300/30" disabled>
                <User className="size-4"/> Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 py-2 cursor-pointer hover:bg-gray-300/30" disabled>
                <Settings className="size-4"/> Settings
            </DropdownMenuItem >
            <div className="h-px bg-gray-600 w-full"></div>
            <DropdownMenuItem onClick={handleSignOut} className="gap-2 py-2 cursor-pointer text-destructive focus:text-red-500 focus:bg-gray-100 m-1 flex items-center">
                <LogOut className="size-4 text-black"/> Log out
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
}