/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class CreatePublicUserDto {
	@IsEmail()
	email!: string;

	@IsString()
	@MinLength(8)
	@MaxLength(64)
	password!: string;
}
