import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { PrismaClient } from '@prisma/client';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RecipesService extends PrismaClient implements OnModuleInit{

  private readonly logger = new Logger('RecipesService');

  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy) {
    super();
  }
  
  async onModuleInit() {
    await this.$connect();
    this.logger.log('DataBase connected');
  }

  create(createRecipeDto: CreateRecipeDto) {
    // crear la receta
    // crear el detalle de la receta
    return 'This action adds a new recipe';
  }

  findAll() {
    return `This action returns all recipes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} recipe`;
  }

  update(id: number, updateRecipeDto: UpdateRecipeDto) {
    return `This action updates a #${id} recipe`;
  }

  remove(id: number) {
    return `This action removes a #${id} recipe`;
  }
}
