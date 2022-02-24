import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcryptjs';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  async singUp(authcredentialDto: AuthCredentialDto): Promise<void> {
    return this.userRepository.createUser(authcredentialDto);
  }

  async signIn(authcredentialDto: AuthCredentialDto) {
    const { username, password } = authcredentialDto;
    const user = this.userRepository.findOne({ username });

    if (user && (await compare(password, (await user).password))) {
      return 'login success';
    } else {
      throw new UnauthorizedException('로그인 정보를 올바르게 입력해주세요.');
    }
  }
}
