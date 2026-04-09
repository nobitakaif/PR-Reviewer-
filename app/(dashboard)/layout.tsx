
import Header from "@/components/header";
import { auth } from "@/utils/auth";
import { authClient } from "@/utils/auth-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";



export default async function DashboardLayout({children} : {children : ReactNode}){

    const session = await auth.api.getSession({headers : await headers()})

    if(!session?.user.id){
        console.log("user is nt logged-in")
        redirect("/sign-in")
    }

    return <div className="min-h-screen ">
        <Header user={session.user}/>
        <main className="ml-10 mr-10 mx-auto px-4 py-8">{children}</main>
        
    </div>
}