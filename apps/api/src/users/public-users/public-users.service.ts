import { Inject, Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { publicUsers } from "../../../drizzle/schema/users";
import { DATABASE } from "../../db/db.module";
import type { Database } from "../../db/db.types";
import type { CreatePublicUserDto } from "./dto/create-public-user.dto";

@Injectable()
export class PublicUsersService {
	constructor(@Inject(DATABASE) private readonly db: Database) {}

	async create(dto: CreatePublicUserDto) {
		const passwordHash = await bcrypt.hash(dto.password, 12);

		const [user] = await this.db
			.insert(publicUsers)
			.values({
				email: dto.email,
				passwordHash,
			})
			.returning({
				id: publicUsers.id,
				email: publicUsers.email,
				createdAt: publicUsers.createdAt,
			});

		return user;
	}
}
