import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const wallet = sqliteTable("wallet", {
	id: int().primaryKey({ autoIncrement: true }),
  address: text().notNull().unique(),
  score: int().notNull().default(0),
  txHash: text().notNull().unique(),
});

export type IWallet = typeof wallet.$inferSelect;
export type IPartialWallet = Partial<typeof wallet.$inferInsert>;
export type INewWallet = typeof wallet.$inferInsert;