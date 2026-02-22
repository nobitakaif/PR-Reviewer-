import { db } from "@/server/db";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma"

export const auth = betterAuth({
    database : prismaAdapter(db, {
      provider : "postgresql"
    }),
    emailAndPassword : {
      enabled : true
    },
    socialProviders : {
      github : {
        clientId : process.env.GITHUB_CLIENT_ID!,
        clientSecret : process.env.GITHUB_CLIENT_SECRET
      }
    },
    session : {
      expiresIn : 60 * 60 * 24 * 7, // for 7 days 
      updateAge : 60 * 60 * 24, // for the 24 hours,
      cookieCache : {
        enabled : true,
        maxAge : 60 * 5 // 5 minuts
      }
    },
    trustedOrigins : [
      process.env.BETTER_AUTH_URL!
    ]
});

export type Session = typeof auth.$Infer.Session