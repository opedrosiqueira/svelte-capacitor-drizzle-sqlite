import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const tarefa = sqliteTable('tarefa', {
  id: integer().primaryKey({ autoIncrement: true }),
  status: integer().default(0).notNull(),
  conteudo: text().notNull()
});
