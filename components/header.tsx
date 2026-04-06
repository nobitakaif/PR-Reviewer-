"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { FolderGit2, GitPullRequest, ScanSearch } from "lucide-react"
import { UserMenu } from "./user-menu"

interface User{
    id : string,
    name : string,
    email : string,
    image? : string | null | undefined
}

interface HeaderProps{
    user : User
}

const navItems = [
    {
        href : "/repos",
        label : "Repositories",
        icon : FolderGit2
    },
    {
        href : "/reviews",
        label : "Reviews",
        icon : GitPullRequest
    }
]

export default function Header({user} : HeaderProps){

    const pathname = usePathname()
    
    return <header className="sticky top-0 z-50 w-full border-b border-b-gray-300 border-border/60 bg-gray-100/80 backdrop-blur-xl supports-backdrop-filter:bg-gray-100/6">
        <div className="ml-8 mr-8 mx-auto flex h-13 items-center justify-between px-4">
            <div className="flex items-center gap-8">
                <nav className="hidden md:flex items-center gap-2">
                    {navItems.map((item)=>{
                        const isActive = pathname === item.href || pathname.startsWith(`${item.href}`) 
                        const Icon = item.icon
                        return <Link href={item.href} key={item.href} className={cn("flex items-center gap-2 px-3 py-1.5 bg-gray-300/60 rounded-md text-sm font-medium transition-colors", isActive ? "text-foreground bg-muted" : "text-muted-foreground hover:text-foreground hover:bg-muted/50")}>
                            <Icon/>
                            {item.label}
                        </Link>
                    })}
                </nav>
            </div>
            <div className="flex items-center gap-2">
                <UserMenu user={user}/>
            </div>
        </div>
    </header>
}