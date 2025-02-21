PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_nota` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`status` integer DEFAULT 0 NOT NULL,
	`conteudo` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_nota`("id", "status", "conteudo") SELECT "id", "status", "conteudo" FROM `nota`;--> statement-breakpoint
DROP TABLE `nota`;--> statement-breakpoint
ALTER TABLE `__new_nota` RENAME TO `nota`;--> statement-breakpoint
PRAGMA foreign_keys=ON;