import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';

@Injectable()
export class ClientsService {
  private readonly logger = new Logger(ClientsService.name);

  constructor(
    @Inject(NATS_SERVICE) private readonly clientNats: ClientProxy
  ){}

  create(createClientDto: CreateClientDto) {
    return this.clientNats.send("create_client", createClientDto);
  }

  findAll(clientPaginationDto: PaginationDto) {
    return this.clientNats.send("find_all_clients", clientPaginationDto);
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
