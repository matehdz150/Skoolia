import type { JwtService } from "@nestjs/jwt";
import type { JwtPort } from "../../core/ports/jwt.port";

export class JwtAdapter implements JwtPort {
	constructor(private readonly jwtService: JwtService) {}

	async sign(payload: Record<string, any>): Promise<string> {
		return this.jwtService.signAsync(payload);
	}
}
