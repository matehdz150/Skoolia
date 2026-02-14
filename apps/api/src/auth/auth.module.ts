import { Module } from "@nestjs/common";

import { AuthController } from "./application/controllers/auth.controllers";
import { PASSWORD_HASHER, USER_AUTH_REPOSITORY } from "./core/ports/tokens";
import { LoginUseCase } from "./core/use-cases/login.use-cae";
import { RegisterUserUseCase } from "./core/use-cases/register.use-case";
import { BcryptPasswordHasher } from "./infraestructure/adapters/bycript.adapter";
import { DrizzleUserAuthRepository } from "./infraestructure/adapters/drizzle-user-auth.repository";

@Module({
	controllers: [AuthController],
	providers: [
		RegisterUserUseCase,
		LoginUseCase,
		DrizzleUserAuthRepository,
		BcryptPasswordHasher,
		{
			provide: USER_AUTH_REPOSITORY,
			useClass: DrizzleUserAuthRepository,
		},
		{
			provide: PASSWORD_HASHER,
			useClass: BcryptPasswordHasher,
		},
	],
})
export class AuthModule {}
