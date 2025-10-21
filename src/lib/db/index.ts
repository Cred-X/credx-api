import { DbType } from "@/types/db";
import { drizzle } from "drizzle-orm/libsql";

export class DbClient {
  private instance!: DbType;

  constructor(private connection: {url: string; authToken: string}) {}

  async client() {
    if (!this.instance) {
      this.instance = drizzle({
        connection: {
          url: this.connection.url,
          authToken: this.connection.authToken,
        },
      });
    }
    return this.instance;
  }
}