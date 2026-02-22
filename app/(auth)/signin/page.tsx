"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { signIn } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGithub } from "react-icons/fa"
import { email } from "zod";

export default function SignIn(){

    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [ password, setPassword] = useState("")
    const [error, setError ] = useState("")
    const router = useRouter()

    const handleEmailSignIn = async (e : React.FormEvent) =>{
        e.preventDefault()
        setError("")
        setLoading(true)
        console.log('before result')

        try{
            const result = await signIn.email({
                email, 
                password
            })
            console.log('after result', result)

            if(result.error){
                setError(result.error.message || "An error occurred")
                setLoading(false)
            }else{
                router.push("/repos")
            }
        }catch(e){
            console.log("the error is " + e)
        }
    }
    // const handlegithubSignIn 
    
    return <div className="min-h-screen flex justify-center items-center">
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle className="text-center text-2xl"> Sign In</CardTitle>
                <CardDescription className="text-center text-slate-600">Sign in With your amil or Github accont</CardDescription>
            </CardHeader>
            <CardContent>
                <Button className="w-full cursor-pointer" variant={"outline"} onClick={()=>{}} disabled={loading}>
                    <FaGithub className="mr-2 size-4" />
                    <span> Sign in with Github </span>
                </Button>
                <div className="relative m-2">
                    <div className="absolute inset-0 flex items-center">
                        <Separator className="w-full"/>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground"> OR CONTINUE WITH EMAIL`</span>
                    </div>
                </div>
                <form onSubmit={handleEmailSignIn} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email"> email </Label>
                        <Input id="email" type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading}/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password"> password</Label>
                        <Input id="passwod" type="password" placeholder="**********" value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading}/>
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    <Button className="w-full cursor-pointer" type="submit" disabled={loading}> 
                        {loading ? "Loading..." : "Signup"}
                    </Button>
                </form>
                <p className="text-slate-600 mt-3">Don't have an account? <Link href={"/signup"} className="hover:text-black underline">Signup</Link ></p>
            </CardContent> 
            

        </Card>
    </div>

}