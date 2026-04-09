import { z } from "zod"
import { TRPCError } from "@trpc/server"
import { protectedProcedure, trpcRouter } from "../init"
import { fetchGithubRepos, getGithubAccessToken } from "@/utils/services/githb"

export const respositoryRouter = trpcRouter({
    list : protectedProcedure.query(async ({ctx}) =>{
        const repository = await ctx.db.repository.findMany({
            where : {
                userId : ctx.user.id
            },
            orderBy : {
                createdAt : "desc"
            }
        })
        return repository
    }),
    fetchFromGithub : protectedProcedure.query(async ({ctx})=>{
        const accessToken = await getGithubAccessToken(ctx.user.id)
        if(!accessToken){
            throw new TRPCError({
                code : "PRECONDITION_FAILED",
                message : "User has not authorized Github access"
            })
        }
        const repos = await fetchGithubRepos(accessToken)
        return repos.map( (repo) =>({
            githubId : repo.id,
            name : repo.name,
            fullName : repo.full_name,
            private : repo.private,
            htmlUrl : repo.html_url,
            description : repo.description,
            language : repo.language,
            stars : repo.stargazers_count,
            updateAt : repo.updated_at
        }))
    }),
    
    connect : protectedProcedure.input(z.object({
        repos : z.array(
            z.object({
                githubId : z.number(),
                name : z.string(),
                fullName : z.string(),
                private : z.boolean(),
                htmlUrl : z.string()
            })
        )
    })).mutation(async ({ctx, input})=>{
        const result = await Promise.all(
            input.repos.map((repo) =>{
                ctx.db.repository.upsert({
                    where : {
                        githubId : repo.githubId
                    },
                    create :{
                        userId : ctx.user.id,
                        githubId : repo.githubId,
                        name : repo.name,
                        fullName : repo.fullName,
                        private : repo.private,
                        htmlUrl : repo.htmlUrl
                    },
                    update : {
                        name : repo.name,
                        fullName : repo.fullName,
                        htmlUrl : repo.htmlUrl,
                        private : repo.private,
                        updatedAt : new Date()
                    }
                })
            })
            
        )
        return { 
            connected : result.length
        }
    }),

    disconect : protectedProcedure.input(z.object({id : z.string()})).mutation(async ({ctx, input})=>{
        await ctx.db.repository.delete({
            where : {
                id : input.id,
                userId : ctx.user.id
            }
        })
        return {
            success : true
        }
    })
})