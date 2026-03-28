"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { signIn } from "@/utils/auth-client"
import { useState } from "react"
import { FaGithub } from "react-icons/fa"


export default function Signin(){

    const [loading, setLoading] = useState(false)
    
    const handleGithubSignin = async () =>{
        setLoading(true)
        await signIn.social({
            provider : "github",
            callbackURL : "/repos"
        })
        setLoading(false)
    }
    
    return <div className="flex justify-center items-center min-h-screen ">
        <Card className="w-full max-w-md">
            <CardHeader className="text-center">
                <CardTitle className="text-center font-bold text-xl">Signin</CardTitle>
                <CardDescription className="text-slate-400">Sign-in with your email or GitHub account</CardDescription>
            </CardHeader>
            <CardContent>
                <Button className="" variant={"outline"} disabled={loading} onClick={handleGithubSignin}>
                    <FaGithub/>Sign in with GitHub 
                </Button>
                <div>
                    <div>
                        <Separator className="w-full"/>
                    </div>
                    <div>
                        or signin with email
                    </div>
                </div>
            </CardContent>
            <form className="m-2">
                <Input placeholder="enter your email "/>
            </form>
        </Card>
    </div>
}