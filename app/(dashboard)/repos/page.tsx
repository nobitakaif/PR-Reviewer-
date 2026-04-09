"use client"
import { useState } from "react"
import Link from "next/link"
import { trpc } from "@/utils/trpc"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
 } from "@/components/ui/alert-dialog"
import { 
    CheckCircle,
    GitBranch,
    Plus,
    RefreshCcw,
    Search,
    X
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

interface GithubRepo{
    githubId : number, 
    name : string, 
    fullName : string, 
    private : boolean,
    htmlUrl : string,
    description : string | null,
    language : string | null,
    start : number,
    updatedAt : string
}

const languageColors : Record<string, string> = {
    TypeScript : "bg-blue-500",
    JavaScript : "bg-yellow-500",
    Python : "bg-green-500",
    Go : "bg-cyan-500",
    Rust : "bg-orange-500",
    Java : "bg-red-500",
    Ruby : "bg-red-400",
    PHP : "bg-purple-500",
    "C#" : "bg-green-500",
    "C++" : "bg-pink-500",
    C : "bg-gray-500",
    Swift : "bg-orange-400",
    Kotlin : "bg-purple-400",
    Dart : "bg-blue-500",
    Vue : "bg-blue-400",
    Svelte : "bg-orange-600",
}

export default function Repos(){
    const [selectedRepos, setSelectRepos] = useState<Set<number>>(new Set())
    const [showGithuRepos, setShowGithubRepos] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")

    const connectedRepos = trpc.repository.list.useQuery()
    const githubRepos = trpc.repository.fetchFromGithub.useQuery(undefined,{ enabled : showGithuRepos})

    const connectMutation = trpc.repository.connect.useMutation({
        onSuccess : () =>{
            connectedRepos.refetch(),
            setSelectRepos(new Set()),
            setShowGithubRepos(false)
        }
    })

    const disconnectMutation = trpc.repository.disconect.useMutation({
        onSuccess : () =>{
            connectedRepos.refetch()
        }
    })

    const connectedIds = new Set(
        connectedRepos.data?.map((repo) => repo.githubId) || []
    )

    const availableRepos = githubRepos.data?.filter((repo)=>{
        !connectedIds.has(repo.githubId) || []
    })
    
    const filteredAvailableRepos = availableRepos?.filter((repo) =>{
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        repo.description?.toLowerCase().includes(searchQuery.toLowerCase())
    })

    const toggleRepo = (githubId : number)=>{
        const next = new Set(selectedRepos)
        if(next.has(githubId)){
            next.delete(githubId)
        }
        else{
            next.add(githubId)
        }
        setSelectRepos(next)
    }

    const handleConnect = () =>{
        const reposToConnect = availableRepos?.filter((r)=>{
            selectedRepos.has(r.githubId)
        }).map((r)=>({
            githubId : r.githubId,
            name : r.name,
            private : r.private,
            htmlUrl : r.htmlUrl,
            fullName : r.fullName,
        }))
        if(!reposToConnect){
            console.log(`something went wrong reposToConnect undefined` )
        }
        connectMutation.mutate({repos : reposToConnect!})
    }

    const selectAll = () =>{
        setSelectRepos(new Set(filteredAvailableRepos?.map((r)=> r.githubId)))
    }

    const clearSelection = () =>{
        setSelectRepos(new Set())
    }

    console.log("here is -> ",githubRepos)
    return <div className="space-y-8">
        <div className="flex items-start justify-between gap-4">
            <div>
                <h2 className="text-2xl font-semibold tracking-tight">
                    Repository
                </h2>
                <p className="text-gray-500">
                    Select repositories to connect to your account
                </p>
            </div>
            <Button variant={"outline"} className=""
                onClick={()=>{
                    setShowGithubRepos(!showGithuRepos)
                    setSearchQuery("")
                    setSelectRepos(new Set())
                }}
            >
                {showGithuRepos ? (
                    <>
                        <X/>Cancel
                    </>
                ) : (
                    <>
                    <Plus />
                    Add Repository
                    </>
                )}
            </Button>
        </div>
        {showGithuRepos && (
            <Card className="overflow-hidden">
                <div className="border-b border-border/60 bg-muted/30 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold">
                                Import Github Repositories
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                Select repositories to import from Github 
                            </p>
                        </div>
                        <Button variant={"ghost"} size={"icon-sm"} onClick={()=>{
                            githubRepos.refetch()
                        }}
                            disabled={githubRepos.isFetching}
                        >
                            <RefreshCcw className={cn("size-4", githubRepos.isFetching && "animate-spin")} />
                            {githubRepos.isFetching && (
                                <span className="sr-only">
                                    Refreshing repositories
                                </span>
                            )}
                        </Button>
                    </div>
                </div>
                <CardContent className="p-0">
                    {githubRepos.isLoading ? (
                        <div>
                            {[...Array(4)].map((_, i) =>(
                                <Skeleton key={i} className="h-16 w-full rounded-lg"/>
                            ))}
                        </div>
                    ) : githubRepos.error ? (
                        <div>
                            {githubRepos.error.data?.code ==="PRECONDITION_FAILED" ? <Button>Connect</Button> : (
                                <div>
                                    <p>
                                        {githubRepos.error.message}
                                    </p>
                                </div>
                            )}
                        </div>
                    ) : availableRepos?.length === 0 ? (
                        <>
                        <div>
                                <div>
                                    <Search/>
                                    <Input placeholder="Search repos"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}/>
                                </div>
                                <div>
                                    <Button> Select all </Button>
                                    {selectedRepos.size > 0 && (
                                        <>
                                            <span>.</span>
                                            <Button>Clear</Button>
                                        </>
                                        
                                    )}
                                </div>
                            </div>
                            <div className="max-h-[400px] overflow-y-auto">
                                {filteredAvailableRepos?.length === 0 ? (
                                    <div className="py-12 text-center">
                                        <p>No repositories match your search.</p>
                                    </div>
                                ): ( 
                                    <div>
                                        {filteredAvailableRepos?.map((repo)=>(
                                            <div>{repo.name}</div>
                                        ))}
                                    </div>    
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                <div>
                                    <Search/>
                                    <Input placeholder="Search repos"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}/>
                                </div>
                                <div>
                                    <Button> Select all </Button>
                                    {selectedRepos.size > 0 && (
                                        <>
                                            <span>.</span>
                                            <Button>Clear</Button>
                                        </>
                                        
                                    )}
                                </div>
                            </div>
                            <div className="max-h-[400px] overflow-y-auto">
                                {filteredAvailableRepos?.length === 0 ? (
                                    <div className="py-12 text-center">
                                        <p>No repositories match your search.</p>
                                    </div>
                                ): ( 
                                    <div>
                                        {filteredAvailableRepos?.map((repo)=>(
                                            <div>{repo.name}</div>
                                        ))}
                                    </div>    
                                )}
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>
        )}
    </div>
}