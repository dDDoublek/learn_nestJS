import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialDto {
  @IsString()
  @MinLength(3)
  @MaxLength(8)
  username: string;

  @IsString()
  @MinLength(8)
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: '비밀번호는 8자리 이상이고, 영어와 숫자의 조합입니다.',
  })
  password: string;
}
