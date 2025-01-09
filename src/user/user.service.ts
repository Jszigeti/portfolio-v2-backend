import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(body: CreateUserDto) {
    return this.prismaService.user.create({
      data: { ...body, password: await bcrypt.hash(body.password, 10) },
    });
  }

  async findOne(userWhereUniqueInput: Prisma.UserWhereUniqueInput) {
    return this.prismaService.user.findUnique({ where: userWhereUniqueInput });
  }
}
