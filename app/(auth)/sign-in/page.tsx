"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { motion } from "motion/react"
import { signIn } from "@/utils/auth-client"
import { useState } from "react"
import { FaGithub } from "react-icons/fa"


export default function Signin() {

    const [loading, setLoading] = useState(false)

    const handleGithubSignin = async () => {
        setLoading(true)
        await signIn.social({
            provider: "github",
            callbackURL: "/repos"
        })
        setLoading(false)
    }

    return <div className="flex justify-center items-center min-h-screen ">
        <Card className="w-full max-w-md  ring-0 shadow-xl border-2 border-gray-300">
            <CardHeader className="text-center">
                <CardTitle className="text-center font-bold text-xl">Signin</CardTitle>
                <CardDescription className="text-slate-400">Sign-in with your email or GitHub account</CardDescription>
            </CardHeader>
            <CardContent>
                <motion.button className="w-full border-gray-300 flex  items-center justify-center gap-2 border rounded-lg p-1.5" disabled={loading} onClick={handleGithubSignin} animate={{}} whileHover={{ scale: 1.03 }} initial={{}}>
                    <FaGithub />Sign in with GitHub
                </motion.button>
                <div className="relative flex items-center my-4">
                    <div className="h-px bg-gray-300 flex-1"></div>

                    <span className="mx-2 text-xs uppercase text-muted-foreground bg-background px-2 whitespace-nowrap">
                        or sign in with email
                    </span>

                    <div className="h-px bg-gray-400 flex-1"></div>
                </div>
            </CardContent>

        </Card>
    </div>
}