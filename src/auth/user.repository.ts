import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(autcredentialDto: AuthCredentialDto): Promise<void> {
    const { username, password } = autcredentialDto;
    const user = this.create({ username, password });

    await this.save(user);
  }
}
