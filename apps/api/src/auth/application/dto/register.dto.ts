import { IsEmail, IsEnum, IsString, MinLength } from "class-validator";

export enum UserRole {
	PUBLIC = "public",
	PRIVATE = "private",
}

export class RegisterDto {
	@IsEmail()
	email!: string;

	@IsString()
	@MinLength(6)
	password!: string;

	@IsEnum(UserRole)
	role!: "public" | "private";
}
