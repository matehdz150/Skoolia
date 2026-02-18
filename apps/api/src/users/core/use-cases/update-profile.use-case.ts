import { Inject } from '@nestjs/common';
import { USER_REPOSITORY } from '../ports/tokens';
import * as usersRepository from '../ports/users.repository';

export class UpdateMyProfileUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly repository: usersRepository.UserRepository,
  ) {}

  async execute(
    userId: string,
    data: {
      name?: string;
    },
  ) {
    return this.repository.update(userId, data);
  }
}
