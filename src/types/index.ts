
export type Repository = {
    id: number,
    name: string,
    description: string,
    topics: string[],
    stargazers_count: number,
    forks_count: number,
    open_issues_count: number,
    language: string,
    owner: {
        avatar_url: string
    }
}
