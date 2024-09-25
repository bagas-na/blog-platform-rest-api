CREATE TABLE `posts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`createdAt` text DEFAULT (CURRENT_TIMESTAMP),
	`updatedAt` text DEFAULT (CURRENT_TIMESTAMP),
	`title` text NOT NULL,
	`content` text NOT NULL,
	`category` text NOT NULL,
	`tags` text
);
