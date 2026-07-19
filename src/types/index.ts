
export type Repository = {
    id: number,
    name: string,
    description: string,
    topics: string[],
    stargazers_count: number,
    forks_count: number,
    watchers_count: number,
    open_issues_count: number,
    language: string,
    owner: {
        login: string,
        avatar_url: string
    },
    license: {
        spdx_id: string
    }
}
