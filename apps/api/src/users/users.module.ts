import { Module } from "@nestjs/common";
import { PublicUsersController } from "./public-users/public-users.controller";
import { PublicUsersService } from "./public-users/public-users.service";

@Module({
	controllers: [PublicUsersController],
	providers: [PublicUsersService],
	exports: [PublicUsersService],
})
export class UsersModule {}
