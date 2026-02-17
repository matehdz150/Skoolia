import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import type * as schema from '../../drizzle/schemas';

export type Database = PostgresJsDatabase<typeof schema>;
