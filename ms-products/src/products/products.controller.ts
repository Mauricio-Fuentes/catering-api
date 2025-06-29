import { Controller} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductQuantityDto } from './dto/product.quantity.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern({cmd: 'create-product'})
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @MessagePattern({cmd: 'find-products'})
  findAll(@Payload() query: PaginationDto) {
    return this.productsService.findAll(query);
  }

  @MessagePattern({cmd: 'find-one-product'})
  findOne(@Payload('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @MessagePattern({cmd: 'update-product'})
  update(@Payload() updateProductDto: UpdateProductDto) {
    return this.productsService.update(updateProductDto);
  }

  @MessagePattern({cmd: 'delete-product'})
  remove(@Payload('id') id: string) {
    return this.productsService.remove(+id);
  }

  @MessagePattern({cmd: 'validate_products'})
  validateProduct(@Payload() ids: number[]){
    return this.productsService.validateProducts(ids);
  }

  @MessagePattern({cmd: 'update-quantity-products'})
  updateQuantityProducts(@Payload() productQuantity: ProductQuantityDto){
    return this.productsService.updateQuantityProducts(productQuantity);
  }
}