
export type Repository = {
    id: number,
    name: string,
    description: string | null,
    topics: string[],
    stargazers_count: number,
    forks_count: number,
    watchers_count: number,
    open_issues_count: number,
    language: string | null,
    owner: {
        login: string,
        avatar_url: string
    },
    license: {
        spdx_id: string
    } | null
}
