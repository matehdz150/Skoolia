import * as bcrypt from 'bcrypt';
import type { PasswordHasher } from 'src/auth/core/services/password-hassher';

export class BcryptAdapter implements PasswordHasher {
  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}

export class BcryptPasswordHasher implements PasswordHasher {
  async hash(value: string): Promise<string> {
    return bcrypt.hash(value, 10);
  }

  async compare(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash);
  }
}
