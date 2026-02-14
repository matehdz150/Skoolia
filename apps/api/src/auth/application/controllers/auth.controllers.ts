import {
	Body,
	Controller,
	Inject,
	Post,
	Req,
	Res,
	UnauthorizedException,
} from "@nestjs/common";

import type express from "express";

import { LoginUseCase } from "src/auth/core/use-cases/login.use-cae";
import { RefreshUseCase } from "src/auth/core/use-cases/refresh.use-case";
import { RegisterUserUseCase } from "src/auth/core/use-cases/register.use-case";

import type { LoginDto } from "../dto/login.dto";
import type { RegisterDto } from "../dto/register.dto";

@Controller("auth")
export class AuthController {
	constructor(
		@Inject(LoginUseCase)
		private readonly loginUseCase: LoginUseCase,

		@Inject(RegisterUserUseCase)
		private readonly registerUseCase: RegisterUserUseCase,

		@Inject(RefreshUseCase)
		private readonly refreshUseCase: RefreshUseCase,
	) {}

	private setAuthCookies(
		res: express.Response,
		accessToken: string,
		refreshToken: string,
	) {
		res.cookie("access_token", accessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			maxAge: 15 * 60 * 1000,
		});

		res.cookie("refresh_token", refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			maxAge: 7 * 24 * 60 * 60 * 1000,
		});
	}

	@Post("register")
	async register(@Body() dto: RegisterDto) {
		return this.registerUseCase.execute(dto.email, dto.password, dto.role);
	}

	@Post("login")
	async login(
		@Body() dto: LoginDto,
		@Res({ passthrough: true }) res: express.Response,
	) {
		const { accessToken, refreshToken } = await this.loginUseCase.execute(
			dto.email,
			dto.password,
		);

		this.setAuthCookies(res, accessToken, refreshToken);

		return { message: "Login successful" };
	}

	@Post("refresh")
	async refresh(
		@Req() req: express.Request,
		@Res({ passthrough: true }) res: express.Response,
	) {
		const cookies = req.cookies as Record<string, string> | undefined;
		const refreshToken = cookies?.refresh_token;

		if (!refreshToken) {
			throw new UnauthorizedException();
		}

		const tokens = await this.refreshUseCase.execute(refreshToken);

		this.setAuthCookies(res, tokens.accessToken, tokens.refreshToken);

		return { success: true };
	}
}
