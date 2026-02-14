import { Global, Module } from "@nestjs/common";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../../drizzle/schemas";
import type { Database } from "./db.types";

export const DATABASE = Symbol("DATABASE");

@Global()
@Module({
	providers: [
		{
			provide: DATABASE,
			useFactory: (): Database => {
				const client = postgres(process.env.DATABASE_URL!, {
					max: 10,
				});
				return drizzle(client, { schema });
			},
		},
	],
	exports: [DATABASE],
})
export class DbModule {}
