
export type Repository = {
    id: string,
    name: string,
    full_name: string,
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
    } | null,
    html_url: string,
    note: string
}


export type Issue = {
    id: number,
    title: string,
    number: number,
    labels: {
        id: number,
        name: string,
        color: string
    }[],
    created_at: string,
    user: {
        login: string
    }
    comments: number,
    html_url: string
}
