PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_tarefa` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`status` integer DEFAULT 0 NOT NULL,
	`conteudo` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_tarefa`("id", "status", "conteudo") SELECT "id", "status", "conteudo" FROM `tarefa`;--> statement-breakpoint
DROP TABLE `tarefa`;--> statement-breakpoint
ALTER TABLE `__new_tarefa` RENAME TO `tarefa`;--> statement-breakpoint
PRAGMA foreign_keys=ON;