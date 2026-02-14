import { Inject } from "@nestjs/common";
import type * as passwordHasherPort from "../ports/password-hasher.port";
import { PASSWORD_HASHER, USER_AUTH_REPOSITORY } from "../ports/tokens";
import type * as userAuthRepository from "../ports/user-auth.repository";

export class RegisterUserUseCase {
	constructor(
		@Inject(USER_AUTH_REPOSITORY)
		private readonly userRepository: userAuthRepository.UserAuthRepository,

		@Inject(PASSWORD_HASHER)
		private readonly passwordHasher: passwordHasherPort.PasswordHasher,
	) {}

	async execute(email: string, password: string, role: "public" | "private") {
		// 1️⃣ Verificar que no exista
		const existing = await this.userRepository.findByEmail(email);

		if (existing) {
			throw new Error("User already exists");
		}

		// 2️⃣ Hashear contraseña
		const passwordHash = await this.passwordHasher.hash(password);

		// 3️⃣ Crear usuario
		const user = await this.userRepository.create({
			email,
			passwordHash,
			role,
		});

		return {
			id: user.id,
			email: user.email,
			role: user.role,
		};
	}
}
