import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

import { AuthController } from "./application/controllers/auth.controllers";
import {
	JWT_PORT,
	PASSWORD_HASHER,
	REFRESH_TOKEN_REPOSITORY,
	USER_AUTH_REPOSITORY,
} from "./core/ports/tokens";

import { LoginUseCase } from "./core/use-cases/login.use-cae";
import { LogoutUseCase } from "./core/use-cases/logOut.use-case";
import { RefreshUseCase } from "./core/use-cases/refresh.use-case";
import { RegisterUserUseCase } from "./core/use-cases/register.use-case";
import { BcryptPasswordHasher } from "./infraestructure/adapters/bycript.adapter";
import { DrizzleRefreshTokenRepository } from "./infraestructure/adapters/drizzle-refresh-token.repository";
import { DrizzleUserAuthRepository } from "./infraestructure/adapters/drizzle-user-auth.repository";
import { JwtAdapter } from "./infraestructure/adapters/jwt.adapter";

@Module({
	imports: [
		ConfigModule,
		JwtModule.registerAsync({
			inject: [ConfigService],
			useFactory: (config: ConfigService) => ({
				secret: config.get<string>("JWT_SECRET"),
				signOptions: { expiresIn: "15m" },
			}),
		}),
	],
	controllers: [AuthController],
	providers: [
		RegisterUserUseCase,
		LoginUseCase,
		DrizzleUserAuthRepository,
		DrizzleRefreshTokenRepository,
		BcryptPasswordHasher,
		JwtAdapter,
		LogoutUseCase,
		RefreshUseCase,

		{
			provide: USER_AUTH_REPOSITORY,
			useClass: DrizzleUserAuthRepository,
		},
		{
			provide: PASSWORD_HASHER,
			useClass: BcryptPasswordHasher,
		},
		{
			provide: JWT_PORT,
			useClass: JwtAdapter,
		},
		{
			provide: REFRESH_TOKEN_REPOSITORY,
			useClass: DrizzleRefreshTokenRepository,
		},
	],
})
export class AuthModule {}
