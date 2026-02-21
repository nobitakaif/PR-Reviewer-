"use client"
import CheckHealth from "@/components/chec-health";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
   <div className="flex min-h-screen items-center justify-center">
    <div>
      <h1>Welcome to AI code Reviewer</h1>
      <p>Start reviewing your code today </p>
    </div>
    <div className="flex gap-4">
      <Button asChild>
        <Link href={"/login"} >Login</Link>
      </Button>
      <Button asChild>
        <Link href={"/login"}>Login</Link>
      </Button>
    </div>
    <CheckHealth/>
   </div>
  );
}
