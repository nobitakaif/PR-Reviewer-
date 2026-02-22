import { auth } from "@/auth"
import { toNextJsHandler } from "better-auth/next-js"

console.log("reached")
export const { GET, POST } = toNextJsHandler(auth)