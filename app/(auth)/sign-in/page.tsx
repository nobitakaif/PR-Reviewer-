"use client"
import { Button } from "@/components/ui/button"
import { signIn } from "@/utils/auth-client"

export default function Signin(){

    
    
    const handleGithubSignin = async () =>{
        await signIn.social({
            provider : "github",
            callbackURL : "/repos"
        })
    }
    
    return <div>
        <Button onClick={handleGithubSignin}>github</Button>
    </div>
}