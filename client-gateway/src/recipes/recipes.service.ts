import { Inject, Injectable, Logger, Query } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';

@Injectable()
export class RecipesService {

  private readonly logger = new Logger(RecipesService.name);

  constructor(@Inject(NATS_SERVICE) private readonly clientNats: ClientProxy) {}

  create(createRecipeDto: CreateRecipeDto) {
    return this.clientNats.send('createRecipeComplete', createRecipeDto);
  }

  findAll(paginationDto: PaginationDto) {
    return this.clientNats.send('findAllRecipes', paginationDto);
  }

  findOne(id: number) {
    return this.clientNats.send('findRecipe', {id});
  }


}
