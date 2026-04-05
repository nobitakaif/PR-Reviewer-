"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useForm } from "@tanstack/react-form"
import { convertOffsetToTimes, motion } from "motion/react"
import { signIn, signUp} from "@/utils/auth-client"
import { useState } from "react"
import { FaGithub } from "react-icons/fa"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { FieldInfo } from "@/components/fieldInfo"


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

    const form = useForm({
        defaultValues: {
            email: '',
            password: ''
        },
        onSubmit: async ({ value }) => {
            console.log(value.email, "   ", value.password)
            await signUp.email({ 
                email : value.email,
                name : "Mohd Kaif", 
                password : value.password
             })
            console.log("user is logged successfully!")
            alert("alright")
            form.reset()
        }
    })



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
                <div>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        form.handleSubmit()
                    }}>
                        <div className="flex flex-col gap-3 w-full">
                            <form.Field
                                name="email"
                                validators={({
                                    onChange: ({ value }) => !value && "email must be required" 
                                })}
                                children={(field) => {
                                    return (
                                        <>
                                            <Label htmlFor={field.name}>Email</Label>
                                            <Input id={field.name} name={field.name} value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} placeholder="email@gmail.com" className="focus-visible:ring-1 focus-visible:ring-offset-0 border-gray-300" />
                                            <FieldInfo field={field}/>
                                        </>
                                    )
                                }}
                            />
                            <form.Field 
                                name="password"
                                validators={({
                                    onChange : ({value }) => !value ? "password must be required" : value.length < 7 && "password is too short" 
                                })}
                                children={(field) =>{
                                    return (
                                        <>
                                            <Label htmlFor={field.name}>Password</Label>
                                            <Input id={field.name} name={field.name} value={field.state.value} placeholder="*********" type="password" onChange={(e)=>{
                                                field.handleChange(e.target.value) 
                                            }} className="focus-visible:ring-1 border-gray-300 focus-visible:ring-offset-0"/>
                                            <FieldInfo field={field}/>
                                        </>
                                    )
                                }}
                            />
                            <form.Subscribe 
                                selector={(state)=> [state.canSubmit, state.isSubmitting]}
                                children={([cansubmit, isSubmitting])=> (
                                    <>
                                    <Button type="submit" disabled={!cansubmit} variant={"outline"}> {isSubmitting ? "..." : "SignIn"}</Button>
                                    </>
                                )}
                            />
                        </div>
                    </form>
                </div>
            </CardContent>


        </Card>
    </div>
}