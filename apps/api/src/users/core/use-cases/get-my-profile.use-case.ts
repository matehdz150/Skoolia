import { Inject, NotFoundException } from '@nestjs/common';
import { USER_REPOSITORY } from '../ports/tokens';
import * as usersRepository from '../ports/users.repository';

export class GetMyProfileUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly repository: usersRepository.UserRepository,
  ) {}

  async execute(userId: string) {
    const user = await this.repository.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
