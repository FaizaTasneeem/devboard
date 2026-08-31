CREATE TABLE "watchlist" (
	"id" text PRIMARY KEY NOT NULL,
	"github_id" integer NOT NULL,
	"name" text NOT NULL,
	"full_name" text NOT NULL,
	"description" text,
	"html_url" text NOT NULL,
	"stargazers_count" integer DEFAULT 0,
	"forks_count" integer DEFAULT 0,
	"watchers_count" integer DEFAULT 0,
	"open_issues_count" integer DEFAULT 0,
	"language" text,
	"owner_login" text NOT NULL,
	"owner_avatar_url" text NOT NULL,
	"license_spdx_id" text,
	"note" text DEFAULT ''
);
