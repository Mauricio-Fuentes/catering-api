import { Controller } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @MessagePattern('createRecipeComplete')
  create(@Payload() createRecipeDto: CreateRecipeDto) {
    return this.recipesService.create(createRecipeDto);
  }

  @MessagePattern('findAllRecipes')
  findAll(@Payload() query: PaginationDto) {
    return this.recipesService.findAll(query);
  }

  @MessagePattern('findRecipe')
  findOne(@Payload() id: string) {
    return this.recipesService.findOne(+id);
  }

}
