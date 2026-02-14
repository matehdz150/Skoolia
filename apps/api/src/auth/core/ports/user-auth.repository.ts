import type { AuthUser, CreateUserParams } from "../types/auth.types";

export interface UserAuthRepository {
	findByEmail(email: string): Promise<AuthUser | null>;
	create(data: CreateUserParams): Promise<AuthUser>;
}
