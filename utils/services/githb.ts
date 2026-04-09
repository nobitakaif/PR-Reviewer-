import { db } from "@/prisma/client"
import axios from "axios"

export interface GitHubRepo{
    id  : number,
    name : string,
    full_name : string,
    private : boolean, 
    html_url : string,
    description : string | null,
    language : string | null,
    stargazers_count : number,
    updated_at : string
}

export async function getGithubAccessToken( userId : string) : Promise<string | null>{
    const account = await db.account.findFirst({
        where : {
            userId : userId,
            providerId : "github"    
        },
        select : {
            accessToken : true
        }
    }) 
    return account?.accessToken ?? null
}

export async function fetchGithubRepos(accessToken : string) : Promise<GitHubRepo[]>{

    const repos : GitHubRepo[] = []
    let page = 1 
    const perPage = 100

    while(true){
        const response = await axios.get(`https://api.github.com/user/repos?per_page=${perPage}&page=${page}&sort=updated`,
            {
                headers : {
                    Authorization : `Bearer ${accessToken}`,
                    Accept : "application/vnd.github.v3+json"
                }
            }
        )

        if(!response?.status){
            throw new Error(`Failed to fetch Github repos : ${response.status}`)
        }

        const data = (await response.data) as GitHubRepo[]
        repos.push(...data)
        if(data.length < perPage ) break;
        page++
    }
    return repos
}