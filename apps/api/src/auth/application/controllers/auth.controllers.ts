import { Body, Controller, Post } from "@nestjs/common";
import type { LoginUseCase } from "src/auth/core/use-cases/login.use-cae";
import type { RegisterUserUseCase } from "src/auth/core/use-cases/register.use-case";
import type { LoginDto } from "../dto/login.dto";
import type { RegisterDto } from "../dto/register.dto";

@Controller("auth")
export class AuthController {
	constructor(
		private readonly registerUseCase: RegisterUserUseCase,
		private readonly loginUseCase: LoginUseCase,
	) {}

	@Post("register")
	async register(@Body() dto: RegisterDto) {
		return this.registerUseCase.execute(dto.email, dto.password, dto.role);
	}

	@Post("login")
	async login(@Body() dto: LoginDto) {
		return this.loginUseCase.execute(dto.email, dto.password);
	}
}
