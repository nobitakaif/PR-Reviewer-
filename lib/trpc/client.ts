import { createTRPCReact } from "@trpc/react-query"
import type { AppRouter } from "@/server/api/roo"

export const trpc = createTRPCReact<AppRouter>()

