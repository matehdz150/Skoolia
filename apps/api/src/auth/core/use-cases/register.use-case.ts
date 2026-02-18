import { ConflictException, Inject } from '@nestjs/common';
import type * as passwordHasherPort from '../ports/password-hasher.port';
import { PASSWORD_HASHER, USER_AUTH_REPOSITORY } from '../ports/tokens';
import type * as userAuthRepository from '../ports/user-auth.repository';

export class RegisterUserUseCase {
  constructor(
    @Inject(USER_AUTH_REPOSITORY)
    private readonly userRepository: userAuthRepository.UserAuthRepository,

    @Inject(PASSWORD_HASHER)
    private readonly passwordHasher: passwordHasherPort.PasswordHasher,
  ) {}

  async execute(
    name: string,
    email: string,
    password: string,
    role: 'public' | 'private',
  ) {
    // 1️⃣ Verificar que no exista
    const existing = await this.userRepository.findByEmail(email);

    if (existing) {
      throw new ConflictException('User already exists');
    }

    // 2️⃣ Hashear contraseña
    const passwordHash = await this.passwordHasher.hash(password);

    // 3️⃣ Crear usuario
    const user = await this.userRepository.create({
      name,
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
