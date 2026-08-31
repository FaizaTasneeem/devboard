import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";

export const watchlist = pgTable("watchlist", {
    id: text("id").primaryKey(),
    githubId: integer("github_id").notNull(),
    name: text("name").notNull(),
    fullName: text("full_name").notNull(),
    description: text("description"),
    htmlUrl: text("html_url").notNull(),
    stargazersCount: integer("stargazers_count").default(0),
    forksCount: integer("forks_count").default(0),
    watchersCount: integer("watchers_count").default(0),
    openIssuesCount: integer("open_issues_count").default(0),
    language: text("language"),
    ownerLogin: text("owner_login").notNull(),
    ownerAvatarUrl: text("owner_avatar_url").notNull(),
    licenseSpdxId: text("license_spdx_id"),
    note: text("note").default(""),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});
