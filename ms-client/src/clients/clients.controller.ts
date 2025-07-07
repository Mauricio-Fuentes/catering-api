import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaginationDto } from 'common/dto/pagination.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @MessagePattern("create_client")
  create(@Payload() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @MessagePattern("find_all_clients")
  findAll(@Payload() clientPaginationDto: PaginationDto) {
    return this.clientsService.findAll(clientPaginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(+id, updateClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientsService.remove(+id);
  }
}
