// jwt.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      const isBlacklisted = await this.prisma.blacklistedToken.findUnique({
        where: { token },
      });
      if (isBlacklisted) {
        return res.status(401).json({ message: 'Token is blacklisted' });
      }
      console.log('token', token);

      // Token is valid, continue
      next();
    } else {
      return res.status(401).json({ message: 'Token not found' });
    }
  }
}
