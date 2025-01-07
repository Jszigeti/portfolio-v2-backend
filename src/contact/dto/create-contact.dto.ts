import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateContactDto {
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}
