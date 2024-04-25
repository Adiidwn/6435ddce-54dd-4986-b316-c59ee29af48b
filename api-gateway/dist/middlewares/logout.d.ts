import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from 'src/prisma.service';
export declare class JwtMiddleware implements NestMiddleware {
    private prisma;
    constructor(prisma: PrismaService);
    use(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
}
