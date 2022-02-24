import { ConflictException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import { genSalt, hash } from 'bcryptjs';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(autcredentialDto: AuthCredentialDto): Promise<void> {
    const { username, password } = autcredentialDto;

    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);

    const user = this.create({ username, password: hashedPassword });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('이미 존재하는 유저명입니다.');
      }
    }
  }
}
