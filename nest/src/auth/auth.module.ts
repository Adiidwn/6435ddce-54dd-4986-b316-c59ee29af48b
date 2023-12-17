import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaService } from "src/prisma.service";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { jwtConstants } from "./jwtConstants";

@Module({
    imports: [
        AuthModule,
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '6000000s' },
          }),
    ],
    controllers: [AuthController],
    providers: [AuthService,PrismaService],
    exports: [AuthService]
})
export class AuthModule {}