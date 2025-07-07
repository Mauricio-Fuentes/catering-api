import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PrismaClient } from '@prisma/client';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto } from 'common/dto/pagination.dto';

@Injectable()
export class ClientsService extends PrismaClient implements OnModuleInit {

  readonly logger = new Logger(ClientsService.name);

  constructor(@Inject('NATS_SERVICE') private readonly clientNats: ClientProxy) {
    super();
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database connected');
  }

  async create(createClientDto: CreateClientDto) {
    this.logger.log(`Creating a new client with data: ${JSON.stringify(createClientDto)}`);
    const client = await this.client.create({
      data: {
        name: createClientDto.name,
        lastname: createClientDto.lastName,
        datebirth: createClientDto.dateBirth,
        phone: createClientDto.phone,
        email: createClientDto.email,
        address: createClientDto.address,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    });
    return client
  }

  async findAll(orderPaginationDto: PaginationDto) {
    this.logger.log(`Finding all clients with pagination: ${JSON.stringify(orderPaginationDto)}`);
    const {page, limit} = orderPaginationDto;
    const totalPages = await this.recipe.count();
    const totalPage = Math.ceil(totalPages / limit);
    return {
      data: await this.client.findMany({
        skip: (page - 1) * limit,
        take: limit,
      }),
      metadata: {
        total: totalPages,
        page: page,
        totalPage: totalPage
      }
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
