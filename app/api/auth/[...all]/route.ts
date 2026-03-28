import { auth } from "@/utils/auth";
import { toNextJsHandler } from "better-auth/next-js"

export const { GET} = toNextJsHandler(auth)