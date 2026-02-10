import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import type { CreatePublicUserDto } from "./dto/create-public-user.dto";
import type { PublicUsersService } from "./public-users.service";

@Controller("users/public")
export class PublicUsersController {
	constructor(private readonly publicUsersService: PublicUsersService) {}

	/**
	 * Registro de usuarios públicos
	 * POST /users/public
	 */
	@Post()
	@HttpCode(HttpStatus.CREATED)
	async create(@Body() dto: CreatePublicUserDto) {
		return this.publicUsersService.create(dto);
	}
}
