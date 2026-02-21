import { Inject, NotFoundException } from '@nestjs/common';
import { USER_REPOSITORY } from '../ports/tokens';
import * as usersRepository from '../ports/users.repository';
import { SCHOOL_REPOSITORY } from 'src/schools/core/ports/tokens';
import * as schoolRepository from 'src/schools/core/ports/school.repository';

export class GetMyProfileUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly repository: usersRepository.UserRepository,
    @Inject(SCHOOL_REPOSITORY)
    private readonly schoolRepository: schoolRepository.SchoolRepository,
  ) {}

  async execute(userId: string) {
    const user = await this.repository.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    let onboardingRequired = false;

    if (user.role === 'private') {
      const school = await this.schoolRepository.findByOwner(user.id);
      onboardingRequired = !school;
    }

    return {
      ...user,
      onboardingRequired,
    };
  }
}
